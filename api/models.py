from django.db import models


# Create your models here.

class Url(models.Model):
    url_no = models.AutoField(primary_key=True)
    url = models.CharField(max_length=70)
