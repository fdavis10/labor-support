from django.db import models


class Lead(models.Model):
    """Заявка с сайта (имя, телефон, комментарий)."""
    name = models.CharField('Имя', max_length=255)
    phone = models.CharField('Телефон', max_length=64)
    comment = models.TextField('Комментарий', blank=True)
    created_at = models.DateTimeField('Создано', auto_now_add=True)

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.phone}'
