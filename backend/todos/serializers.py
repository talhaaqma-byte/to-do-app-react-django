from rest_framework import serializers
from django.utils import timezone
from datetime import datetime
import pytz
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    is_overdue = serializers.SerializerMethodField()
    
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed', 'priority', 'due_date', 'due_datetime', 'is_overdue', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_overdue']
    
    def get_is_overdue(self, obj):
        return obj.is_overdue()
    
    def validate_due_datetime(self, value):
        if value and isinstance(value, str):
            try:
                # Parse the datetime string
                if 'T' in value:
                    # Check if it has timezone info
                    has_tz = False
                    if value.endswith('Z'):
                        has_tz = True
                    elif len(value) > 6 and value[-6] in ['+', '-']:
                        # Check if the last 6 chars are timezone offset (e.g., +05:00)
                        try:
                            offset_part = value[-6:]
                            if ':' in offset_part and offset_part[0] in ['+', '-']:
                                int(offset_part[1:3])  # Try to parse hours
                                int(offset_part[4:6])  # Try to parse minutes
                                has_tz = True
                        except:
                            pass
                    elif '+' in value or (value.count('-') > 2):
                        # Might have timezone, check more carefully
                        parts = value.split('T')
                        if len(parts) == 2:
                            time_part = parts[1]
                            if '+' in time_part or (time_part.count('-') > 0 and ':' in time_part[-6:]):
                                has_tz = True
                    
                    if has_tz:
                        # Has timezone info - parse it correctly
                        if value.endswith('Z'):
                            dt = datetime.fromisoformat(value.replace('Z', '+00:00'))
                        else:
                            dt = datetime.fromisoformat(value)
                        # Ensure it's timezone-aware
                        if timezone.is_naive(dt):
                            dt = timezone.make_aware(dt)
                    else:
                        # No timezone info - treat the naive datetime as UTC
                        # This preserves the exact time the user entered (2:35 PM stays 2:35 PM)
                        dt = datetime.fromisoformat(value)
                        # Make it timezone-aware as UTC (so 2:35 PM entered = 2:35 PM UTC stored)
                        dt = timezone.make_aware(dt, pytz.UTC)
                    return dt
            except (ValueError, AttributeError) as e:
                # If parsing fails, return as-is and let Django handle it
                pass
        return value
    
    def validate_title(self, value):
        if len(value) < 1:
            raise serializers.ValidationError("Title cannot be empty.")
        if len(value) > 200:
            raise serializers.ValidationError("Title cannot exceed 200 characters.")
        return value


class TodoStatsSerializer(serializers.Serializer):
    total = serializers.IntegerField()
    completed = serializers.IntegerField()
    pending = serializers.IntegerField()
    high_priority = serializers.IntegerField()
    medium_priority = serializers.IntegerField()
    low_priority = serializers.IntegerField()
