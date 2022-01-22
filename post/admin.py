from django.contrib import admin
from .models import PostInfo, Comment, Likes, Section

admin.site.register(PostInfo)
admin.site.register(Section)
admin.site.register(Comment)
admin.site.register(Likes)
