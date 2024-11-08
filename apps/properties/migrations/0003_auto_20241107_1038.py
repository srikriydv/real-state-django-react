# Generated by Django 3.2.7 on 2024-11-07 04:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('properties', '0002_auto_20241106_2327'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='agent_buyer', to=settings.AUTH_USER_MODEL, verbose_name='Agent,Seller or Buyer'),
        ),
        migrations.AlterField(
            model_name='property',
            name='city',
            field=models.CharField(default='Nairobi', max_length=180, verbose_name='City'),
        ),
        migrations.AlterField(
            model_name='property',
            name='country',
            field=django_countries.fields.CountryField(default='KE', max_length=2, verbose_name='Country'),
        ),
        migrations.AlterField(
            model_name='property',
            name='postal_code',
            field=models.CharField(default='140', max_length=100, verbose_name='Postal Code'),
        ),
        migrations.AlterField(
            model_name='property',
            name='street_address',
            field=models.CharField(default='KG8 Avenue', max_length=150, verbose_name='Street Address'),
        ),
    ]
