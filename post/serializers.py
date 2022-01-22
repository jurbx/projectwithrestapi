from .models import PostInfo, Comment, Likes, Section
from rest_framework import serializers

from authentification.models import User
from authentification.serializers import AccountViewSerializer


class PostInfoSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()
    sections = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = PostInfo
        fields = ('id', 'title', 'sections', 'author', 'comments', 'likes')

    def get_sections(self, obj):
        c_qs = Section.objects.filter(post_id=obj.id).order_by('id')
        section = []
        if c_qs:
            c_qs = c_qs[0]
            section = SectionDetailSerializer(c_qs, many=False).data
        return section

    def get_author(self, obj):
        c_qs = User.objects.get(id=obj.author.id)
        author = AccountViewSerializer(c_qs, many=False).data
        return author

    def get_comments(self, obj):
        c_qs = Comment.objects.filter(post_id=obj.id)
        comments = CommentViewSerializer(c_qs, many=True).data
        return comments

    def get_likes(self, obj):
        c_qs = Likes.objects.filter(post_id=obj.id)
        likes = ViewLikesSerializer(c_qs, many=True).data
        return likes


class PostDetailSerializer(PostInfoSerializer):
    class Meta:
        model = PostInfo
        fields = '__all__'

    def get_sections(self, obj):
        c_qs = Section.objects.filter(post_id=obj.id)
        sections = SectionDetailSerializer(c_qs, many=True).data
        return sections


class PostCreateSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = PostInfo
        fields = '__all__'


class SectionCreateSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Section
        fields = ('title', 'content', 'post_id', 'author')
        extra_kwargs = {
            'post_id': {'required': False}
        }


class SectionDetailSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(source='author.username', default='usertest')

    class Meta:
        model = Section
        fields = '__all__'
        extra_kwargs = {
            'post_id': {'required': False},
        }


class SectionEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'
        extra_kwargs = {
            'post_id': {'required': False},
            'author': {'required': False},
        }


class AddCommentSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('message', 'author', 'post_id')
        extra_kwargs = {
            'post_id': {'required': False}
        }


class CommentViewSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = '__all__'

    def get_author(self, obj):
        c_qs = User.objects.get(id=obj.author.id)
        author = AccountViewSerializer(c_qs, many=False).data
        return author


class ViewLikesSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username')

    class Meta:
        model = Likes
        fields = ('author', )


class AddOrRemoveLikesSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Likes
        fields = ('author', 'post_id')
        extra_kwargs = {
            'post_id': {'required': False}
        }