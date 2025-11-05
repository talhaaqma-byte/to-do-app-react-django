from django.core.management.base import BaseCommand
from django.utils import timezone
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from todos.models import Todo
from datetime import timedelta


class Command(BaseCommand):
    help = 'Send email reminders for todos'

    def handle(self, *args, **options):
        now = timezone.now()
        
        # Send reminders for tasks due now (within 1 minute window)
        due_now = Todo.objects.filter(
            due_datetime__isnull=False,
            completed=False,
            reminder_sent=False,
            due_datetime__lte=now,
            due_datetime__gte=now - timedelta(minutes=1)
        )
        
        for todo in due_now:
            try:
                self.send_reminder_email(todo)
                todo.reminder_sent = True
                todo.save()
                self.stdout.write(
                    self.style.SUCCESS(f'Reminder sent for todo: {todo.title}')
                )
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'Error sending reminder for {todo.title}: {str(e)}')
                )
        
        # Send follow-up emails for overdue tasks (next day after due time)
        tomorrow = now + timedelta(days=1)
        overdue_todos = Todo.objects.filter(
            due_datetime__isnull=False,
            completed=False,
            reminder_sent=True,
            followup_email_sent=False,
            due_datetime__lt=now,
            due_datetime__gte=tomorrow - timedelta(days=1)
        )
        
        for todo in overdue_todos:
            # Check if it's been more than 24 hours since due time
            if now - todo.due_datetime >= timedelta(days=1):
                try:
                    self.send_followup_email(todo)
                    todo.followup_email_sent = True
                    todo.save()
                    self.stdout.write(
                        self.style.SUCCESS(f'Follow-up email sent for todo: {todo.title}')
                    )
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(f'Error sending follow-up for {todo.title}: {str(e)}')
                    )
    
    def send_reminder_email(self, todo):
        subject = f'Reminder: {todo.title}'
        message = f'''
Hello {todo.user.username},

This is a reminder that your todo task is due now:

Title: {todo.title}
Priority: {todo.priority.capitalize()}
Due Date & Time: {todo.due_datetime.strftime('%B %d, %Y at %I:%M %p')}
{f'Description: {todo.description}' if todo.description else ''}

Please complete this task as soon as possible.

Best regards,
TodoApp Team
        '''
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [todo.user.email],
            fail_silently=False,
        )
    
    def send_followup_email(self, todo):
        subject = f'Action Required: Overdue Task - {todo.title}'
        message = f'''
Hello {todo.user.username},

Your todo task is overdue and still not completed:

Title: {todo.title}
Priority: {todo.priority.capitalize()}
Due Date & Time: {todo.due_datetime.strftime('%B %d, %Y at %I:%M %p')}
{f'Description: {todo.description}' if todo.description else ''}

Please mark this task as complete if you have finished it, or update the due date if you need more time.

Best regards,
TodoApp Team
        '''
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [todo.user.email],
            fail_silently=False,
        )

