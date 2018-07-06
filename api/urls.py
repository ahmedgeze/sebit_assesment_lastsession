from django.conf.urls import url

from api import views

urlpatterns=[
    url(r'clearDB/$', views.clearDB, name='clearDb'),
    url(r'getAll/$', views.getAll, name='getAll'),
    url(r'addNew/$', views.addNew, name='addNew'),
    url(r'queryData/$', views.queryData, name='queryData'),
    url(r'update/$',views.updateUnique,name='update')

]