from django.contrib import admin
from .models import Url

# Register your models here.
class UrlAdmin(admin.ModelAdmin):
    list_display=('url_no','url')

admin.site.register(Url,UrlAdmin)
