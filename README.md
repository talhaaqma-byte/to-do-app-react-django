# To-Do App with Login - React + Django

A beautiful, fully responsive To-Do application with user authentication, built with React (frontend) and Django REST Framework (backend). Features smooth animations, modern UI components, and a comprehensive dashboard with statistics.

## Features

### Authentication
- ✅ User registration with validation
- ✅ User login with JWT authentication
- ✅ Protected routes
- ✅ Auto token refresh
- ✅ Secure logout

### Todo Management
- ✅ Create, read, update, and delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Set priority levels (Low, Medium, High)
- ✅ Add due dates
- ✅ Search todos by title or description
- ✅ Filter by status (All, Active, Completed)
- ✅ Filter by priority
- ✅ Sort by date, priority, etc.
- ✅ User-specific todos (each user sees only their todos)

### Dashboard
- ✅ Statistics overview (Total, Completed, Pending)
- ✅ Completion rate calculation
- ✅ Beautiful charts (Pie chart for completion status, Bar chart for priority distribution)
- ✅ Recent todos preview
- ✅ Quick actions

### UI/UX
- ✅ Fully responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth animations using Framer Motion
- ✅ Modern, beautiful UI components
- ✅ Loading states and spinners
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Beautiful gradient backgrounds
- ✅ Professional color scheme

## Tech Stack

### Backend
- Django 5.2.8
- Django REST Framework 3.16.1
- Django REST Framework SimpleJWT 5.5.1
- Django CORS Headers 4.9.0
- Python Decouple 3.8
- SQLite (default, can be changed to PostgreSQL)

### Frontend
- React 18+
- Vite
- React Router v6
- Axios
- Framer Motion (animations)
- React Icons
- Recharts (charts)
- date-fns (date formatting)

## Project Structure

```
.
├── backend/                 # Django backend
│   ├── backend/            # Django project settings
│   ├── accounts/           # Authentication app
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   ├── todos/              # Todos app
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── permissions.py
│   ├── manage.py
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── common/    # Common UI components
│   │   │   └── todos/     # Todo components
│   │   ├── context/        # React Context providers
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ and npm installed
- Git installed

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser (optional, for admin access):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults are set):
```env
VITE_API_URL=http://localhost:8000/api
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port shown in terminal)

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `GET /api/auth/user/` - Get current user info
- `POST /api/auth/refresh/` - Refresh JWT token

### Todos
- `GET /api/todos/` - List all todos (with filters)
  - Query params: `completed`, `priority`, `search`, `sort_by`
- `POST /api/todos/` - Create new todo
- `GET /api/todos/:id/` - Get single todo
- `PUT /api/todos/:id/` - Update todo
- `PATCH /api/todos/:id/` - Partial update
- `DELETE /api/todos/:id/` - Delete todo
- `PATCH /api/todos/:id/toggle_complete/` - Toggle completion status
- `GET /api/todos/stats/` - Get statistics

## Usage

1. **Register/Login**: Create a new account or login with existing credentials
2. **Dashboard**: View your statistics and recent todos
3. **Todos Page**: 
   - Click "Create Todo" to add a new todo
   - Use filters to search and filter todos
   - Click on a todo card to edit
   - Toggle completion status with the checkbox
   - Delete todos with the delete button

## Features in Detail

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px (mobile), 768px (tablet), 1024px (desktop), 1440px+ (large screens)
- Hamburger menu for mobile navigation
- Responsive grid layouts

### Animations
- Page transitions
- Component entrance/exit animations
- Hover effects on buttons and cards
- Loading spinners
- Toast notifications with slide-in effects
- Smooth modal transitions

### Security
- JWT token-based authentication
- Token refresh mechanism
- User-specific data isolation
- CORS configuration
- Password validation

## Deployment

### Backend
For production deployment:
1. Set `DEBUG=False` in settings
2. Use a production database (PostgreSQL recommended)
3. Set proper `ALLOWED_HOSTS`
4. Use environment variables for sensitive data
5. Configure static files serving

### Frontend
Build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ using React and Django**

