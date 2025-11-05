# Email Configuration Setup

## For Development (Console Output)

By default, emails will be printed to the console. This is useful for development.

## For Production (SMTP)

To send actual emails, configure the following environment variables in your `.env` file:

```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@todoapp.com
```

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_HOST_PASSWORD`

### Running the Reminder Command

To send reminders, you need to run the management command periodically. You can:

1. **Manual Testing:**
```bash
cd backend
python manage.py send_todo_reminders
```

2. **Using Cron (Linux/Mac):**
Add to crontab to run every minute:
```bash
* * * * * cd /path/to/backend && python manage.py send_todo_reminders
```

3. **Using Task Scheduler (Windows):**
Create a scheduled task to run:
```bash
cd C:\Projects\backend && venv\Scripts\python.exe manage.py send_todo_reminders
```

4. **Using Celery (Recommended for Production):**
Install Celery and set up periodic tasks for automated reminders.

## Email Reminder Logic

1. **Reminder Email:** Sent when `due_datetime` is reached (within 1 minute window)
2. **Follow-up Email:** Sent 24 hours after the due time if task is still incomplete

## Note

For development, emails are printed to console. For production, configure SMTP settings.

