from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import RetrieveAPIView

from post.permissions import IsOwnerOrNoAccess
from .models import User
from .serializers import RegisterSerializer, AccountSerializer, AccountViewSerializer

from rest_framework import parsers, renderers, status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.compat import coreapi, coreschema
from rest_framework.response import Response
from rest_framework.schemas import ManualSchema
from rest_framework.schemas import coreapi as coreapi_schema
from rest_framework.views import APIView


class RegisterApiView(CreateAPIView):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)


class AccountApiEditView(RetrieveUpdateAPIView, TokenAuthentication):
    queryset = User.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (IsAuthenticated, IsOwnerOrNoAccess)
    lookup_field = 'slug'

    def put(self, request, *args, **kwargs):
        data = super().authenticate(request)
        user = data[0]
        data = {}
        if request.data.get('password') and request.data.get('password2'):
            if request.data.get('password') != request.data.get('password2'):
                return Response(status=status.HTTP_400_BAD_REQUEST)
            user.set_password(request.data['password'])
        data["username"] = user.username
        data["email"] = user.email
        data["first_name"] = user.first_name
        data["last_name"] = user.last_name
        data["avatar"] = user.avatar
        return Response(data=data, status=status.HTTP_202_ACCEPTED)

    def get_queryset(self):
        return User.objects.filter(slug=self.kwargs.get('slug'))
    

class AccountView(RetrieveAPIView):
    permission_classes = (AllowAny, )
    serializer_class = AccountViewSerializer
    queryset = User.objects.all()
    lookup_field = 'slug'

    def get_queryset(self):
        return User.objects.filter(slug=self.kwargs.get('slug'))


class CustomObtainAuthToken(APIView):
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = AuthTokenSerializer

    if coreapi_schema.is_enabled():
        schema = ManualSchema(
            fields=[
                coreapi.Field(
                    name="username",
                    required=True,
                    location='form',
                    schema=coreschema.String(
                        title="Username",
                        description="Valid username for authentication",
                    ),
                ),
                coreapi.Field(
                    name="password",
                    required=True,
                    location='form',
                    schema=coreschema.String(
                        title="Password",
                        description="Valid password for authentication",
                    ),
                ),
            ],
            encoding="application/json",
        )

    def get_serializer_context(self):
        return {
            'request': self.request,
            'format': self.format_kwarg,
            'view': self
        }

    def get_serializer(self, *args, **kwargs):
        kwargs['context'] = self.get_serializer_context()
        return self.serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.id})
