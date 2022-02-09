from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import permission_classes
from rest_framework.response import Response

from .models import PostInfo, Comment, Likes, Section
from rest_framework import generics, status
from .serializers import PostInfoSerializer, PostDetailSerializer, SectionCreateSerializer, AddCommentSerializer, \
    AddOrRemoveLikesSerializer, PostCreateSerializer
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import get_token
from django.http import HttpResponse


def get_csrf(request):
    return HttpResponse("{0}".format(get_token(request)), content_type="text/plain")


def post_info(request):
    posts = PostInfo.objects.all()
    return render(request, 'index1.html', {'posts': posts})


class PostDetail(generics.RetrieveAPIView):
    queryset = PostInfo.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = (AllowAny, )


class PostCreate(generics.CreateAPIView):
    queryset = PostInfo.objects.all()
    serializer_class = PostCreateSerializer
    permission_classes = (IsAuthenticated, )
    
    def post(self, request, *args, **kwargs):
        if sections := request.data.get('sections'):
            for item in sections:
                Section.objects.create(title=item.get('title') or None, content=item.get('desc') or None)
        return super(PostCreate, self).post(request, *args, **kwargs)


class SectionCreate(generics.CreateAPIView):
    queryset = Section.objects.all()
    serializer_class = SectionCreateSerializer
    permission_classes = (IsAuthenticated, )

    def perform_create(self, serializer):
        post = PostInfo.objects.get(id=self.kwargs.get('post_id'))
        serializer.save(post_id=post)

    def create(self, request, *args, **kwargs):
        post = PostInfo.objects.get(id=self.kwargs.get('post_id'))
        if post.author == request.user:
            return super().create(request, *args, **kwargs)
        return Response(data={'error': 'invalid user'}, status=status.HTTP_400_BAD_REQUEST)


class PostView(generics.ListAPIView):
    permission_classes = (AllowAny, )
    queryset = PostInfo.objects.all()
    serializer_class = PostInfoSerializer


class PostEdit(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PostDetailSerializer
    queryset = PostInfo.objects.all()
    permission_classes = (IsOwnerOrReadOnly, IsAuthenticated)

    def put(self, request, *args, **kwargs):
        if sections := request.data.get('sections'):
            for item in sections:
                Section.objects.filter(id=item.get('id')).update(title=item.get('title') or None, content=item.get('desc') or None)
        return super(PostEdit, self).put(request, *args, **kwargs)


class AddComment(generics.CreateAPIView):
    serializer_class = AddCommentSerializer
    queryset = Comment.objects.all()
    permission_classes(IsAuthenticated, )

    def perform_create(self, serializer):
        post = PostInfo.objects.get(id=self.kwargs.get('post_id'))
        serializer.save(post_id=post)

    # def get_queryset(self):
    #     return super().get_queryset().filter(post=self.kwargs.get('post_id'))


class AddLikes(generics.CreateAPIView, TokenAuthentication):
    serializer_class = AddOrRemoveLikesSerializer
    queryset = Likes.objects.all()
    permission_classes(IsAuthenticated, )

    def perform_create(self, serializer):
        post = PostInfo.objects.get(id=self.kwargs.get('post_id'))
        serializer.save(post_id=post)

    def post(self, request, *args, **kwargs):
        auth = super().authenticate(request)
        if like := Likes.objects.filter(author=auth[0]):
            like.delete()
            return Response(data={'delete': 'successfully'}, status=status.HTTP_200_OK)
        return super(AddLikes, self).post(request, *args, **kwargs)