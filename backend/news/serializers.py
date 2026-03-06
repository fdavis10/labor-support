from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import News

User = get_user_model()


class NewsPublicSerializer(serializers.ModelSerializer):
    """Для публичного API: только опубликованные, ограниченные поля."""
    date = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ('id', 'title', 'excerpt', 'image_url', 'date')

    def get_date(self, obj):
        return obj.published_at.strftime('%d.%m.%Y')

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class NewsAdminSerializer(serializers.ModelSerializer):
    """Для админ-API: все поля, запись."""
    date = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = (
            'id', 'title', 'excerpt', 'image', 'image_url',
            'published_at', 'date', 'is_published',
            'created_at', 'updated_at',
        )
        read_only_fields = ('created_at', 'updated_at')

    def get_date(self, obj):
        return obj.published_at.strftime('%d.%m.%Y') if obj.published_at else None

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


# --- Пользователи админки ---

class UserSerializer(serializers.ModelSerializer):
    """Список пользователей (только для суперюзера)."""
    class Meta:
        model = User
        fields = ('id', 'username', 'is_staff', 'is_superuser', 'is_active')
        read_only_fields = fields


class UserCreateSerializer(serializers.ModelSerializer):
    """Создание пользователя (суперюзер)."""
    class Meta:
        model = User
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user


class ProfileSerializer(serializers.Serializer):
    """Текущий пользователь: чтение и смена логина/пароля."""
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=150)
    is_staff = serializers.BooleanField(read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)

    current_password = serializers.CharField(required=False, write_only=True)
    new_password = serializers.CharField(required=False, write_only=True)

    def update(self, instance, validated_data):
        if 'username' in validated_data:
            instance.username = validated_data['username']
        if 'new_password' in validated_data:
            instance.set_password(validated_data['new_password'])
        instance.save()
        return instance
