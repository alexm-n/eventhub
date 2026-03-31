from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import EventViewSet, ParticipantViewSet, RegistrationViewSet

router = DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'participants', ParticipantViewSet)
router.register(r'registrations', RegistrationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]