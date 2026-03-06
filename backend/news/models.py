from django.db import models


class News(models.Model):
    """Новость для блока на главной."""
    title = models.CharField('Заголовок', max_length=255)
    excerpt = models.CharField('Краткое описание (анонс)', max_length=64, help_text='До 64 символов, показывается в карточке на сайте')
    image = models.ImageField('Изображение', upload_to='news/', blank=True, null=True)
    published_at = models.DateTimeField('Дата публикации')
    is_published = models.BooleanField('Опубликовано', default=True)
    created_at = models.DateTimeField('Создано', auto_now_add=True)
    updated_at = models.DateTimeField('Обновлено', auto_now=True)

    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'
        ordering = ['-published_at']

    def __str__(self):
        return self.title
