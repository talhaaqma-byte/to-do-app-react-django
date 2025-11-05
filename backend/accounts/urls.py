from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, login_view, get_user

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),
    path('user/', get_user, name='get_user'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

