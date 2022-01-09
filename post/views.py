from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes

from .models import PostInfo, Comment
from rest_framework import generics, status
from .serializers import PostInfoSerializer, PostDetailSerializer, PostCreateSerializer, AddCommentSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import get_token
from django.http import HttpResponse


def get_csrf(request):
    return HttpResponse("{0}".format(get_token(request)), content_type="text/plain")


def post_info(request):
    posts = PostInfo.objects.all()
    return render(request, 'index.html', {'posts': posts})


class PostDetail(generics.RetrieveAPIView):
    queryset = PostInfo.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = (AllowAny, )


class PostCreate(generics.CreateAPIView):
    queryset = PostInfo.objects.all()
    serializer_class = PostCreateSerializer
    permission_classes = (IsAuthenticated, )


class PostView(generics.ListAPIView):
    permission_classes = (AllowAny, )
    queryset = PostInfo.objects.all()
    serializer_class = PostInfoSerializer


class PostEdit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostDetailSerializer
    queryset = PostInfo.objects.all()
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticated)


class AddComment(generics.CreateAPIView):
    serializer_class = AddCommentSerializer
    queryset = Comment.objects.all()
    permission_classes(IsAuthenticated, )

    def perform_create(self, serializer):
        post = PostInfo.objects.get(id=self.kwargs.get('post_id'))
        serializer.save(post_id=post)

    # def get_queryset(self):
    #     return super().get_queryset().filter(post=self.kwargs.get('post_id'))
