from django.db.models import Q
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Todo
from .serializers import TodoSerializer, TodoStatsSerializer
from .permissions import IsOwner


class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'toggle_complete']:
            return [IsAuthenticated(), IsOwner()]
        return [IsAuthenticated()]
    
    def get_queryset(self):
        user = self.request.user
        queryset = Todo.objects.filter(user=user)
        
        # Filter by completed status
        completed = self.request.query_params.get('completed', None)
        if completed is not None:
            completed = completed.lower() == 'true'
            queryset = queryset.filter(completed=completed)
        
        # Filter by priority
        priority = self.request.query_params.get('priority', None)
        if priority:
            queryset = queryset.filter(priority=priority)
        
        # Search by title or description
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(description__icontains=search)
            )
        
        # Sort by
        sort_by = self.request.query_params.get('sort_by', '-created_at')
        if sort_by in ['created_at', '-created_at', 'due_date', '-due_date', 'priority', '-priority']:
            queryset = queryset.order_by(sort_by)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['patch'])
    def toggle_complete(self, request, pk=None):
        todo = self.get_object()
        todo.completed = not todo.completed
        todo.save()
        serializer = self.get_serializer(todo)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        todos = Todo.objects.filter(user=request.user)
        total = todos.count()
        completed = todos.filter(completed=True).count()
        pending = todos.filter(completed=False).count()
        high_priority = todos.filter(priority='high').count()
        medium_priority = todos.filter(priority='medium').count()
        low_priority = todos.filter(priority='low').count()
        
        stats = {
            'total': total,
            'completed': completed,
            'pending': pending,
            'high_priority': high_priority,
            'medium_priority': medium_priority,
            'low_priority': low_priority,
        }
        
        serializer = TodoStatsSerializer(stats)
        return Response(serializer.data)
