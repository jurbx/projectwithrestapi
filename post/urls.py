from django.urls import path, include
from .views import PostCreate, PostView, PostDetail, get_csrf, PostEdit, AddComment, AddLikes

app_name = 'post'

# router = routers.DefaultRouter()
# router.register('', PostInfoViewSet)

urlpatterns = [
    # Post actions
    path('create/', PostCreate.as_view(), name='create'),
    path('list/', PostView.as_view(), name='list'),
    path('detail/<int:pk>/', PostDetail.as_view(), name='post_detail'),
    path('edit/<int:pk>/', PostEdit.as_view(), name='post_edit'),

    # Likes actions
    path('like/<int:post_id>/', AddLikes.as_view(), name='add_like'),

    # Comment actions
    path('add/comment/<int:post_id>/', AddComment.as_view(), name='add_comment'),

    # generate csrf token
    path('get_csrf/', get_csrf, name="get_csrf"),
]