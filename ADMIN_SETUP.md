# Django Admin Portal Setup

## How to Access Django Admin Portal

### Step 1: Create a Superuser
First, you need to create a superuser account to access the admin panel.

Open your terminal and navigate to the backend directory:
```bash
cd backend
```

Activate your virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

Create a superuser:
```bash
python manage.py createsuperuser
```

You will be prompted to enter:
- Username: (choose a username)
- Email address: (optional, but recommended)
- Password: (choose a strong password)
- Password (again): (confirm your password)

### Step 2: Start the Django Server
Make sure your Django server is running:
```bash
python manage.py runserver
```

The server should start at `http://127.0.0.1:8000`

### Step 3: Access Admin Portal
Open your web browser and navigate to:
```
http://127.0.0.1:8000/admin/
```

### Step 4: Login
Use the username and password you created in Step 1 to log in.

## What You Can Do in Admin Portal

Once logged in, you can:
- View and manage all users
- View and manage all todos
- Create, edit, and delete todos
- Manage user accounts
- Access Django's built-in admin features

## Creating Todos from Admin

1. Go to `http://127.0.0.1:8000/admin/`
2. Click on "Todos" under the "TODOS" section
3. Click "Add Todo" button (top right)
4. Fill in the form:
   - User: Select a user
   - Title: Enter todo title
   - Description: (optional)
   - Completed: Check if completed
   - Priority: Select priority level
   - Due date: (optional)
5. Click "Save"

## Notes

- The admin portal is only accessible when `DEBUG=True` in development
- In production, you should set `DEBUG=False` and configure proper admin access
- Make sure to keep your superuser credentials secure

