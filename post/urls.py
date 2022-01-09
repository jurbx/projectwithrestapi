from django.urls import path, include
from .views import PostCreate, PostView, PostDetail, get_csrf, PostEdit, AddComment

app_name = 'post'

# router = routers.DefaultRouter()
# router.register('', PostInfoViewSet)

urlpatterns = [
    # Post actions
    path('create/', PostCreate.as_view(), name='create'),
    path('list/', PostView.as_view(), name='list'),
    path('detail/<int:pk>/', PostDetail.as_view(), name='post_detail'),
    path('edit/<int:pk>/', PostEdit.as_view(), name='post_edit'),

    # Comment actions
    path('add/comment/<int:post_id>', AddComment.as_view(), name='add_comment'),

    path('get_csrf/', get_csrf, name="get_csrf"),
]