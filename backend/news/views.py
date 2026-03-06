from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView
from rest_framework.viewsets import ModelViewSet

from .models import News
from .serializers import (
    NewsPublicSerializer,
    NewsAdminSerializer,
    UserSerializer,
    UserCreateSerializer,
    ProfileSerializer,
)

User = get_user_model()


# Публичный API — без авторизации, только опубликованные новости
class NewsListAPIView(ListAPIView):
    queryset = News.objects.filter(is_published=True).order_by('-published_at')
    serializer_class = NewsPublicSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        return {'request': self.request}


class NewsDetailAPIView(RetrieveAPIView):
    queryset = News.objects.filter(is_published=True)
    serializer_class = NewsPublicSerializer
    permission_classes = [AllowAny]


# Админ-API — по скрытому пути, с токеном
class NewsAdminViewSet(ModelViewSet):
    queryset = News.objects.all().order_by('-published_at')
    serializer_class = NewsAdminSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# Логин по скрытому пути: POST username, password -> { "token": "..." }
class AdminObtainTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        if not username or not password:
            return Response(
                {'detail': 'Укажите username и password'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = authenticate(request, username=username, password=password)
        if user is None:
            return Response(
                {'detail': 'Неверные учётные данные'},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        if not user.is_active:
            return Response(
                {'detail': 'Учётная запись отключена'},
                status=status.HTTP_403_FORBIDDEN,
            )
        from rest_framework.authtoken.models import Token
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


# --- Пользователи: только суперюзер ---

class UserListCreateView(ListCreateAPIView):
    """Список пользователей и создание нового (только суперюзер)."""
    queryset = User.objects.all().order_by('id')
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return UserCreateSerializer
        return UserSerializer

    def get_serializer(self, *args, **kwargs):
        if self.request.method == 'POST':
            return UserCreateSerializer(*args, **kwargs)
        return UserSerializer(*args, **kwargs)


# --- Профиль: любой авторизованный может менять логин и пароль ---

class CurrentUserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(instance=request.user)
        return Response(serializer.data)

    def patch(self, request):
        user = request.user
        data = request.data.copy()
        new_password = data.get('new_password', '').strip()
        if new_password:
            current = data.get('current_password') or ''
            if not user.check_password(current):
                return Response(
                    {'detail': 'Неверный текущий пароль'},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        serializer = ProfileSerializer(instance=user, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(UserSerializer(instance=user).data)
