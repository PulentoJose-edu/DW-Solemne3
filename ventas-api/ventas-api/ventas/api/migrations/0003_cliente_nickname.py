# Generated by Django 4.1.12 on 2024-11-09 13:16

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_comercial_password"),
    ]

    operations = [
        migrations.AddField(
            model_name="cliente",
            name="nickname",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
