from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('flight_app.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt'))
]
