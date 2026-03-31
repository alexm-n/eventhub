from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Event, Participant, Registration
from .serializers import EventSerializer, ParticipantSerializer, RegistrationSerializer
from django_filters.rest_framework import DjangoFilterBackend

def is_admin(user):
    return user.is_staff

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'date']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        return [IsAuthenticated()] if is_admin(self.request.user) else [IsAuthenticated()]

    def check_permissions(self, request):
        super().check_permissions(request)
        if self.action not in ['list', 'retrieve'] and not is_admin(request.user):
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Vous n'avez pas les droits pour effectuer cette action.")

class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer

    def check_permissions(self, request):
        super().check_permissions(request)
        if self.action not in ['list', 'retrieve'] and not is_admin(request.user):
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Vous n'avez pas les droits pour effectuer cette action.")

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer

    def check_permissions(self, request):
        super().check_permissions(request)
        if self.action not in ['list', 'retrieve'] and not is_admin(request.user):
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Vous n'avez pas les droits pour effectuer cette action.")