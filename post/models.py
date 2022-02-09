from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class PostInfo(models.Model):
    title = models.CharField(max_length=255, unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Section(models.Model):
    post_id = models.ForeignKey(PostInfo, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=False)
    content = models.TextField(max_length=5000)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Comment(models.Model):
    message = models.CharField(max_length=255)
    post_id = models.ForeignKey(PostInfo, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)


class Likes(models.Model):
    post_id = models.ForeignKey(PostInfo, on_delete=models.CASCADE)
    author = models.OneToOneField(User, on_delete=models.CASCADE)
