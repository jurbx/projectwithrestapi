# Generated by Django 4.0.1 on 2022-03-25 09:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_alter_likes_author_alter_likes_post_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likes',
            name='post_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='post.postinfo'),
        ),
    ]
