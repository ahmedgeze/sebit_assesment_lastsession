from django.http import JsonResponse
from . import service

from . import forms


def clearDB(request):
    return JsonResponse(service.clearDB(), safe=False)


def getAll(request):
    return JsonResponse(service.getAll(), safe=False)


def addNew(request):
    form = forms.personForm(request.GET)
    if form.is_valid():
        payload = {

            "person_data": form.cleaned_data['personData'],
            "person_name": form.cleaned_data['name'],
            "city_name": form.cleaned_data['city'],
            "country_name": form.cleaned_data['country'],

        }
        return JsonResponse(service.addNew(payload), safe=False)
    else:
        status={
            "status":"error"
        }
        return JsonResponse(status,safe=False)


def queryData(request):
    form = forms.queryForm(request.GET)
    if form.is_valid():
        city = form.cleaned_data['city']
        country = form.cleaned_data['country']
        if city or country:
            resp_json = service.queryData(city, country)
        else:
            resp_json = service.getAll()
    else:
        resp_json = {"status": "Bad Request!"}

    return JsonResponse(resp_json, safe=False)


def updateUnique(request):
    form = forms.updateForm(request.GET)
    if form.is_valid():
        old_name = form.cleaned_data['old_name']
        old_city = form.cleaned_data['old_city']
        old_country = form.cleaned_data['old_country']
        old_personData = form.cleaned_data['old_personData']
        name = form.cleaned_data['name']
        city = form.cleaned_data['city']
        country = form.cleaned_data['country']
        personData = form.cleaned_data['personData']
        resp_json = service.updateUnique(old_personData, old_name, old_city, old_country, personData, name, city,
                                         country)
    else:
        resp_json = {"status": "Bad Request!",
                     "error":str(form.errors)}

    return JsonResponse(resp_json, safe=False)
