# Generated by Django 2.0.7 on 2018-07-04 21:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Url',
            fields=[
                ('url_no', models.AutoField(primary_key=True, serialize=False)),
                ('url', models.CharField(max_length=70)),
            ],
        ),
    ]
