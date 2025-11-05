from django.contrib import admin
from .models import Todo


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'completed', 'priority', 'due_date', 'due_datetime', 'reminder_sent', 'followup_email_sent', 'created_at']
    list_filter = ['completed', 'priority', 'reminder_sent', 'followup_email_sent', 'created_at']
    search_fields = ['title', 'description']
    readonly_fields = ['created_at', 'updated_at']
