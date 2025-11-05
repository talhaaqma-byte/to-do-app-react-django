from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Todo(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    due_date = models.DateField(blank=True, null=True)
    due_datetime = models.DateTimeField(blank=True, null=True)
    reminder_sent = models.BooleanField(default=False)
    followup_email_sent = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    def is_overdue(self):
        if self.completed:
            return False
        if self.due_datetime:
            return timezone.now() > self.due_datetime
        if self.due_date:
            return timezone.now().date() > self.due_date
        return False
