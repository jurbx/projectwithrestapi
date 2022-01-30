from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('about', index),
    path('sign-in', index),
    path('sigh-up', index),
    path('sigh-out', index),
    path('users/<slug:username>', index),

]