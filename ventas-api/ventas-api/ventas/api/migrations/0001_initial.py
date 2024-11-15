# Generated by Django 5.1.2 on 2024-10-14 14:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Cliente",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.CharField(max_length=100)),
                ("apellido1", models.CharField(max_length=100)),
                ("apellido2", models.CharField(blank=True, max_length=100, null=True)),
                ("ciudad", models.CharField(blank=True, max_length=100, null=True)),
                ("categoria", models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Comercial",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.CharField(max_length=100)),
                ("apellido1", models.CharField(max_length=100)),
                ("apellido2", models.CharField(blank=True, max_length=100, null=True)),
                ("comision", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="Pedido",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("total", models.FloatField()),
                ("fecha", models.DateField()),
                (
                    "cliente",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.cliente"
                    ),
                ),
                (
                    "comercial",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.comercial"
                    ),
                ),
            ],
        ),
    ]
