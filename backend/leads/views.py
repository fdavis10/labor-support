import logging

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Lead
from .serializers import LeadSerializer

logger = logging.getLogger(__name__)


@method_decorator(csrf_exempt, name='dispatch')
class LeadCreateView(APIView):
    """Принимает заявку (name, phone, comment), сохраняет и по возможности отправляет письмо на LEADS_NOTIFICATION_EMAIL."""

    def post(self, request):
        serializer = LeadSerializer(data=request.data)
        if not serializer.is_valid():
            errors = serializer.errors
            detail = '; '.join(
                f'{k}: {" ".join(str(v) for v in vlist)}'
                for k, vlist in (errors.items() if isinstance(errors, dict) else [])
            ) or 'Неверные данные формы'
            return Response({'detail': detail, 'errors': errors}, status=status.HTTP_400_BAD_REQUEST)

        lead = serializer.save()

        recipient = getattr(settings, 'LEADS_NOTIFICATION_EMAIL', None)
        if recipient:
            subject = 'Новая заявка с сайта'
            body_text = (
                f"Имя: {lead.name}\n"
                f"Телефон: {lead.phone}\n"
                f"Комментарий:\n{lead.comment or '(не указан)'}\n\n"
                f"Заявка получена {lead.created_at.strftime('%d.%m.%Y')} в {lead.created_at.strftime('%H:%M')}"
            )
            body_html = render_to_string('leads/email_lead_notification.html', {
                'name': lead.name,
                'phone': lead.phone,
                'comment': lead.comment,
                'created_at': lead.created_at,
            })
            try:
                send_mail(
                    subject=subject,
                    message=body_text,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[recipient],
                    html_message=body_html,
                    fail_silently=True,
                )
            except Exception as e:
                logger.exception("Не удалось отправить уведомление о заявке на %s: %s", recipient, e)

        return Response(
            LeadSerializer(lead).data,
            status=status.HTTP_201_CREATED,
        )
