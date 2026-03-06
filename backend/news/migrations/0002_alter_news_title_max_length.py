# Generated migration: limit excerpt (анонс) to 64 chars

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='excerpt',
            field=models.CharField(help_text='До 64 символов, показывается в карточке на сайте', max_length=64, verbose_name='Краткое описание (анонс)'),
        ),
    ]
