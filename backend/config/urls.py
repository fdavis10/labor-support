from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('leads.urls')),
    path('api/', include('news.urls')),
]
if settings.DEBUG and getattr(settings, 'MEDIA_ROOT', None):
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
