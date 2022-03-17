from django.urls import path
from .views import PostCreate, PostView, PostDetail, get_csrf, PostEdit, AddComment, AddLikes, SectionCreate, \
    post_info, DeleteComment

app_name = 'api'

# router = routers.DefaultRouter()
# router.register('', PostInfoViewSet)

urlpatterns = [
    # Post actions
    path('create/', PostCreate.as_view(), name='create'),
    path('list/', PostView.as_view(), name='list'),
    path('detail/<int:pk>/', PostDetail.as_view(), name='post_detail'),
    path('edit/<int:pk>/', PostEdit.as_view(), name='post_edit'),

    # Section action
    path('create/section/<int:post_id>/', SectionCreate.as_view(), name='create_section'),

    # Likes actions
    path('like/<int:post_id>/', AddLikes.as_view(), name='add_like'),

    # Comment actions
    path('add/comment/<int:comment_id>/', AddComment.as_view(), name='add_comment'),
    path('delete/comment/<int:comment_id>/', DeleteComment.as_view(), name='delete_comment'),

    # generate csrf token
    path('get_csrf/', get_csrf, name="get_csrf"),

    path('', post_info),
]