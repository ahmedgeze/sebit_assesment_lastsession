from django.conf.urls import url

from . import views


urlpatterns=[
    url(r'adduser/$',views.addUser,name='addUser'),
    url(r'^$',views.homePage,name='home'),
]