from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class PostInfo(models.Model):
    title = models.CharField(max_length=255, unique=True)
    desc = models.TextField(max_length=2000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    message = models.CharField(max_length=255)
    post_id = models.ForeignKey(PostInfo, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)


class Likes(models.Model):
    post_id = models.ForeignKey(PostInfo, on_delete=models.CASCADE)
    author = models.OneToOneField(User, on_delete=models.CASCADE)
