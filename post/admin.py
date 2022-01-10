from django.contrib import admin
from .models import PostInfo, Comment, Likes

admin.site.register(PostInfo)
admin.site.register(Comment)
admin.site.register(Likes)
