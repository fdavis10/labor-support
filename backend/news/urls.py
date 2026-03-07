from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings

from .views import (
    NewsListAPIView,
    NewsDetailAPIView,
    NewsAdminViewSet,
    AdminObtainTokenView,
    UserListCreateView,
    CurrentUserView,
)
from leads.views import LeadAdminListView

# Скрытый префикс админ-API (не индексировать, не светить в интерфейсе)
ADMIN_PREFIX = getattr(settings, 'ADMIN_API_PREFIX', 'c8k2m9p5')

router = DefaultRouter()
router.register(r'news', NewsAdminViewSet, basename='admin-news')

urlpatterns = [
    path('news/', NewsListAPIView.as_view(), name='news-list'),
    path('news/<int:pk>/', NewsDetailAPIView.as_view(), name='news-detail'),
    path(f'{ADMIN_PREFIX}/auth/login/', AdminObtainTokenView.as_view(), name='admin-login'),
    path(f'{ADMIN_PREFIX}/users/', UserListCreateView.as_view(), name='admin-users'),
    path(f'{ADMIN_PREFIX}/users/me/', CurrentUserView.as_view(), name='admin-profile'),
    path(f'{ADMIN_PREFIX}/leads/', LeadAdminListView.as_view(), name='admin-leads'),
    path(f'{ADMIN_PREFIX}/', include(router.urls)),
]
