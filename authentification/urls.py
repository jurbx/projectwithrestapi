from .views import RegisterApiView, CustomObtainAuthToken, AccountApiEditView
from django.urls import path


app_name = 'authenticate'

urlpatterns = [
    path('register/', RegisterApiView.as_view(), name='registration'),
    path('login/', CustomObtainAuthToken.as_view(), name='login'),
    path('account/<int:pk>/', AccountApiEditView.as_view(), name='account')
]