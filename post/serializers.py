from .models import PostInfo, Comment, Likes
from rest_framework import serializers


class PostCreateSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = PostInfo
        fields = ('title', 'desc', 'author')


class PostDetailSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    comments = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()

    class Meta:
        model = PostInfo
        fields = ('id', 'title', 'desc', 'author', 'post_author_username', 'comments', 'likes')

    def get_comments(self, obj):
        obj_id = obj.id
        c_qs = Comment.objects.filter(post_id=obj_id)
        comments = CommentViewSerializer(c_qs, many=True).data
        return comments

    def get_likes(self, obj):
        obj_id = obj.id
        c_qs = Likes.objects.filter(post_id=obj_id)
        likes = ViewLikesSerializer(c_qs, many=True).data
        return likes


class AddCommentSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = ('message', 'author', 'post_id')
        extra_kwargs = {
            'post_id': {'required': False}
        }


class CommentViewSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'


class PostInfoSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = PostInfo
        fields = ('id', 'title', 'desc', 'author', 'post_author_username')


class ViewLikesSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username')

    class Meta:
        model = Likes
        fields = ('author_username', )


class AddOrRemoveLikesSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Likes
        fields = ('author', 'post_id')
        extra_kwargs = {
            'post_id': {'required': False}
        }