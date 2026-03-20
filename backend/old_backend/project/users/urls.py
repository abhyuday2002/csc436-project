from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from users import views

urlpatterns = [
    path('', views.api_root),
    path('things/', views.ThingList.as_view(), name='thing-list'),
    path('things/<int:pk>/', views.ThingDetail.as_view(), name='thing-detail'),
    path('users/', views.UserList.as_view(), name="user-list"),
    path('users/<int:pk>/', views.UserDetail.as_view(), name="user-detail"),
    path('users/create', views.UserAdd.as_view(), name="user-add")
]

urlpatterns = format_suffix_patterns(urlpatterns)