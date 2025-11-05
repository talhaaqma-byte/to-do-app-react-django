# Comprehensive Prompt for Building a To-Do App with Login (React + Django)

## Project Overview

Build a complete, production-ready To-Do Application with user authentication using React (frontend) and Django REST Framework (backend). The application must be fully responsive, feature-rich, and have a modern, animated UI with beautiful components throughout.

## Technical Stack Requirements

### Backend (Django)

- Django 4.2+ with Django REST Framework
- Django REST Framework SimpleJWT for authentication
- PostgreSQL or SQLite database
- CORS headers configured for React frontend
- User model with registration and login endpoints
- Password hashing and validation
- API endpoints for CRUD operations on todos

### Frontend (React)

- React 18+ with functional components and hooks
- React Router v6 for navigation
- Axios for API calls
- State management (Context API or Redux Toolkit)
- Form validation and error handling
- Responsive design with mobile-first approach

### UI/UX Requirements

- **Design System**: Use a modern design system (Material-UI, Tailwind CSS, or Chakra UI)
- **Animations**: Implement smooth animations using Framer Motion or CSS animations for:
  - Page transitions
  - Component entrance/exit animations
  - Hover effects on buttons and cards
  - Loading states and spinners
  - Success/error notifications with slide-in effects
- **Color Scheme**: Choose a professional, modern color palette with:
  - Primary, secondary, and accent colors
  - Dark mode support (optional but preferred)
  - Proper contrast ratios for accessibility
- **Typography**: Use a modern font stack (Google Fonts recommended)
- **Icons**: Use a consistent icon library (React Icons, Material Icons, or Heroicons)

## Application Structure

### Backend Structure (Django)

```
backend/
├── manage.py
├── requirements.txt
├── backend/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── accounts/
│   ├── models.py (User model if custom)
│   ├── serializers.py
│   ├── views.py (Registration, Login, Logout)
│   └── urls.py
├── todos/
│   ├── models.py (Todo model with fields: title, description, completed, created_at, updated_at, user)
│   ├── serializers.py
│   ├── views.py (List, Create, Update, Delete, Toggle Complete)
│   ├── permissions.py (User can only access their own todos)
│   └── urls.py
└── .env (for environment variables)
```

### Frontend Structure (React)

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── todos/
│   │   │   ├── TodoList.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── TodoForm.jsx (Create/Edit)
│   │   │   ├── TodoCard.jsx (Animated card component)
│   │   │   └── TodoFilter.jsx (Filter by status, date, etc.)
│   │   ├── common/
│   │   │   ├── Navbar.jsx (Beautiful, animated navbar)
│   │   │   ├── Sidebar.jsx (If needed for dashboard)
│   │   │   ├── Button.jsx (Reusable animated button)
│   │   │   ├── Input.jsx (Styled input component)
│   │   │   ├── Modal.jsx (For edit/delete confirmations)
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Toast.jsx (Notification component)
│   │   └── layout/
│   │       ├── Dashboard.jsx (Main dashboard with stats and todos)
│   │       └── Layout.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   ├── AuthContext.jsx (Authentication state management)
│   │   └── TodoContext.jsx (Todo state management)
│   ├── services/
│   │   ├── api.js (Axios instance with interceptors)
│   │   ├── authService.js
│   │   └── todoService.js
│   ├── utils/
│   │   ├── validators.js (Form validation)
│   │   └── helpers.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── animations.css
│   ├── App.jsx
│   └── index.js
├── package.json
└── .env
```

## Feature Requirements

### Authentication Features

1. **User Registration**

   - Form with fields: username, email, password, confirm password
   - Real-time validation with error messages
   - Password strength indicator
   - Animated success message after registration
   - Auto-redirect to login after successful registration

2. **User Login**

   - Form with username/email and password
   - "Remember me" checkbox
   - "Forgot password" link (optional)
   - Loading state during authentication
   - Error handling with user-friendly messages
   - JWT token storage in localStorage/httpOnly cookies

3. **User Logout**

   - Logout button in navbar
   - Clear tokens and user data
   - Redirect to login page

4. **Protected Routes**
   - All todo-related pages must require authentication
   - Redirect to login if not authenticated
   - Show loading state while checking authentication

### Todo Features

1. **Create Todo**

   - Modal or inline form with:
     - Title (required, max 200 characters)
     - Description (optional, textarea)
     - Due date (optional, date picker)
     - Priority level (Low, Medium, High) with color coding
     - Tags/Categories (optional)
   - Animated form submission
   - Success notification
   - Auto-close modal and refresh list

2. **View Todos**

   - Beautiful card-based layout or list view (toggle option)
   - Display: title, description, completion status, due date, priority
   - Color-coded priority indicators
   - Animated card entrance on load
   - Empty state with illustration when no todos

3. **Edit Todo**

   - Edit button on each todo card
   - Pre-filled form with existing data
   - Same validation as create
   - Animated update confirmation

4. **Delete Todo**

   - Delete button with confirmation modal
   - Smooth fade-out animation on deletion
   - Undo functionality (optional but recommended)

5. **Toggle Completion**

   - Checkbox or toggle switch
   - Smooth animation when toggling
   - Visual distinction for completed todos (strikethrough, opacity)

6. **Filter & Search**

   - Filter by: All, Active, Completed
   - Search by title/description
   - Sort by: Date created, Due date, Priority
   - Animated filter transitions

7. **Statistics Dashboard**
   - Total todos count
   - Completed vs Pending ratio (with progress bar or pie chart)
   - Todos by priority breakdown
   - Recent activity feed
   - Beautiful charts (using Chart.js or Recharts)

### UI/UX Requirements

#### Navbar

- Sticky/fixed navbar with smooth scroll behavior
- Logo/brand name on the left
- Navigation links (Home, Dashboard, Todos)
- User profile dropdown with:
  - User avatar/initial
  - Username
  - Logout option
- Mobile hamburger menu with slide animation
- Active link highlighting with animation

#### Dashboard

- Welcome message with user's name
- Statistics cards with hover effects
- Quick actions section
- Recent todos preview
- Beautiful gradient backgrounds or glassmorphism effects
- Responsive grid layout

#### Forms

- Floating labels or modern input design
- Smooth focus transitions
- Error messages below inputs with fade-in animation
- Success checkmarks
- Loading states on submit buttons
- Disable form during submission

#### Animations to Implement

- Page transitions (fade, slide)
- Card hover effects (lift, shadow, scale)
- Button press animations
- Modal entrance/exit (fade + scale)
- Loading spinners (smooth rotation)
- Progress bars (smooth fill animation)
- Toast notifications (slide in from top/bottom)
- List item animations (stagger effect)
- Smooth scrolling

#### Responsive Design

- Mobile (320px+): Single column, stacked layout
- Tablet (768px+): 2-column grid where appropriate
- Desktop (1024px+): Full layout with sidebar if needed
- Large screens (1440px+): Centered content with max-width

## API Endpoints Required

### Authentication Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login (returns JWT tokens)
- `POST /api/auth/logout/` - User logout (optional, token refresh)
- `POST /api/auth/refresh/` - Refresh JWT token
- `GET /api/auth/user/` - Get current user info

### Todo Endpoints

- `GET /api/todos/` - List all todos for authenticated user (with filters)
- `POST /api/todos/` - Create new todo
- `GET /api/todos/:id/` - Get single todo detail
- `PUT /api/todos/:id/` - Update todo
- `PATCH /api/todos/:id/` - Partial update (for toggle complete)
- `DELETE /api/todos/:id/` - Delete todo
- `GET /api/todos/stats/` - Get statistics for dashboard

## Implementation Guidelines

### Backend Implementation

1. Set up Django project with proper settings
2. Create custom user model or use default with extensions
3. Implement JWT authentication
4. Create Todo model with all required fields
5. Set up serializers with validation
6. Create viewsets or API views with proper permissions
7. Configure CORS for React frontend
8. Add API documentation (Swagger/OpenAPI optional)
9. Environment variables for sensitive data
10. Error handling with appropriate HTTP status codes

### Frontend Implementation

1. Set up React project with Vite or Create React App
2. Install and configure routing
3. Set up Axios with base URL and interceptors
4. Create authentication context for global state
5. Implement protected route wrapper
6. Build reusable UI components with animations
7. Create API service functions
8. Implement form validation
9. Add loading states and error boundaries
10. Implement responsive design with CSS/SCSS or Tailwind
11. Add animations using Framer Motion or CSS
12. Optimize performance (lazy loading, memoization)

### Code Quality

- Clean, readable, and well-commented code
- Consistent naming conventions
- Proper error handling throughout
- Loading states for all async operations
- Form validation on both frontend and backend
- Security best practices (XSS protection, CSRF tokens)
- Proper HTTP status codes
- RESTful API design

## Testing Requirements (Optional but Recommended)

- Backend: Unit tests for models, views, serializers
- Frontend: Component tests for critical components
- Integration tests for API endpoints

## Deployment Preparation

- Environment configuration files (.env.example)
- README.md with setup instructions
- Requirements.txt for Python dependencies
- Package.json with all npm dependencies
- .gitignore files for both frontend and backend
- Docker configuration (optional)

## Final Checklist

- [ ] User can register and login
- [ ] JWT authentication works correctly
- [ ] User can create, read, update, and delete todos
- [ ] Todos are filtered by authenticated user
- [ ] All animations work smoothly
- [ ] UI is fully responsive on all devices
- [ ] Forms have proper validation
- [ ] Error messages are user-friendly
- [ ] Loading states are implemented
- [ ] Dashboard shows statistics
- [ ] Search and filter functionality works
- [ ] Code is clean and well-organized
- [ ] README includes setup instructions
- [ ] Application is ready for GitHub push

## Additional Notes

- Prioritize user experience and smooth interactions
- Ensure all animations are performant (60fps)
- Use semantic HTML for accessibility
- Implement proper error boundaries
- Add loading skeletons for better UX
- Consider adding dark mode toggle
- Add keyboard shortcuts for power users (optional)
- Implement drag-and-drop for reordering todos (optional bonus)

---

**Instructions for AI Assistant:**
Build this application step by step, starting with the backend Django setup, then the frontend React setup, and finally connecting them together. Ensure all features are fully functional and the UI is polished with animations. Create comprehensive documentation and ensure the codebase is ready to be pushed to GitHub.
