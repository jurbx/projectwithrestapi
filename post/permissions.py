from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.authentication import get_authorization_header, TokenAuthentication


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user


class IsOwnerOrNoAccess(permissions.BasePermission, TokenAuthentication):
    def has_object_permission(self, request, view, obj):
        header = super().authenticate(request)
        header = header[0]
        return Token.objects.get(user=obj) == Token.objects.get(user=header)