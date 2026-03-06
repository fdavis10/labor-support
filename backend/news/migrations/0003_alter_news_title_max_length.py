# Ensure title stays 255 (in case 0002 was previously applied with title=64)

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_alter_news_title_max_length'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='title',
            field=models.CharField(max_length=255, verbose_name='Заголовок'),
        ),
    ]
