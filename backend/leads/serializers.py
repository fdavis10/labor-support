from rest_framework import serializers
from .models import Lead


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ('name', 'phone', 'comment')


class LeadAdminSerializer(serializers.ModelSerializer):
    """Для админ-API: список заявок (только чтение)."""
    created_at = serializers.DateTimeField(format='%d.%m.%Y %H:%M', read_only=True)

    class Meta:
        model = Lead
        fields = ('id', 'name', 'phone', 'comment', 'created_at')
        read_only_fields = fields
