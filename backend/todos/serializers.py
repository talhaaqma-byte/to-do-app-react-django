from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    is_overdue = serializers.SerializerMethodField()
    
    class Meta:
        model = Todo
        fields = ['id', 'title', 'description', 'completed', 'priority', 'due_date', 'due_datetime', 'is_overdue', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'is_overdue']
    
    def get_is_overdue(self, obj):
        return obj.is_overdue()
    
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

