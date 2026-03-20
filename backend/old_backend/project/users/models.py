from django.db import models

# Create your models here.

class Thing(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, default="")
    owner = models.ForeignKey('auth.User', related_name='things', on_delete=models.CASCADE)
