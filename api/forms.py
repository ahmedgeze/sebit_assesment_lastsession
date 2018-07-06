from django import forms


class personForm(forms.Form):
    name = forms.CharField(label="Name", max_length=100)
    city = forms.CharField(label="City", max_length=100)
    country = forms.CharField(label="Country", max_length=100)
    personData = forms.IntegerField(label="Person Data", max_value=100, min_value=0)


class queryForm(forms.Form):
    city = forms.CharField(required=False, label='Enter your city', max_length=100)
    country = forms.CharField(required=False, label='Enter your country', max_length=100)


class updateForm(forms.Form):
    old_name = forms.CharField(label="Name", max_length=100)
    old_city = forms.CharField(label="City", max_length=100)
    old_country = forms.CharField(label="Country", max_length=100)
    old_personData = forms.IntegerField(label="Person Data", max_value=100, min_value=0)
    name = forms.CharField(label="Name", max_length=100)
    city = forms.CharField(label="City", max_length=100)
    country = forms.CharField(label="Country", max_length=100)
    personData = forms.IntegerField(label="Person Data", max_value=100, min_value=0)
