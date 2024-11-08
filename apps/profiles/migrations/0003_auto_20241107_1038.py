# Generated by Django 3.2.7 on 2024-11-07 04:53

from django.db import migrations, models
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_auto_20241106_2327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='city',
            field=models.CharField(default='Nairobi', max_length=180, verbose_name='City'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='country',
            field=django_countries.fields.CountryField(default='KE', max_length=2, verbose_name='Country'),
        ),
    ]
