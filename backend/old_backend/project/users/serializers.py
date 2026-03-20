from rest_framework import serializers
from users.models import Thing
from django.contrib.auth.models import User

class ThingSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Thing
        fields=['url', 'id', 'name', 'owner']
    
class UserSerialzer(serializers.HyperlinkedModelSerializer):
    things = serializers.PrimaryKeyRelatedField(many = True, queryset=Thing.objects.all())
    
    def create(self, validated_date):
        user = User.objects.create_user(
            username=validated_date['username'],
            password=validated_date['password']
        )
        return user

    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'password', 'things']