from .models import PostInfo, Comment
from rest_framework import serializers


class PostCreateSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = PostInfo
        fields = ('title', 'desc', 'author')


class PostDetailSerializer(serializers.ModelSerializer):
    post_author_username = serializers.CharField(source='author.username', read_only=True)
    comments = serializers.SerializerMethodField()

    class Meta:
        model = PostInfo
        fields = ('id', 'title', 'desc', 'author', 'post_author_username', 'comments')

    def get_comments(self, obj):
        obj_id = obj.id
        c_qs = Comment.objects.filter(post_id=obj_id)
        comments = CommentViewSerializer(c_qs, many=True).data
        return comments


class AddCommentSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = ('message', 'author', 'post_id')
        extra_kwargs = {
            'post_id': {'required': False}
        }


class CommentViewSerializer(serializers.ModelSerializer):
    comment_author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'


class PostInfoSerializer(serializers.ModelSerializer):
    post_author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = PostInfo
        fields = ('id', 'title', 'desc', 'author', 'post_author_username')


