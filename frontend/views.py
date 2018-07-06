from django.shortcuts import render
from api.forms import personForm

# Create your views here.

def addUser(request):
    userForm=personForm
    return render(request,'adduser.html')


def homePage(request):
    return render(request, 'home.html')