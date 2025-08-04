# Generated migration for adding image_url and product_url fields

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('components', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='component',
            name='image_url',
            field=models.URLField(blank=True, help_text='URL de l\'image du produit', null=True),
        ),
        migrations.AddField(
            model_name='component',
            name='product_url',
            field=models.URLField(blank=True, help_text='URL de la fiche produit officielle', null=True),
        ),
    ]
