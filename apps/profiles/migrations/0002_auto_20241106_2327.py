# Generated by Django 3.2.7 on 2024-11-06 17:42

from django.db import migrations, models
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='city',
            field=models.CharField(default='Kathmandu', max_length=180, verbose_name='City'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='country',
            field=django_countries.fields.CountryField(default='NP', max_length=2, verbose_name='Country'),
        ),
    ]
