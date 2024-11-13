# forms.py
from django import forms
from .models import cliente

class clienteForm(forms.ModelForm):
    class Meta:
        model = cliente
        fields = ['nombre', 'cedula', 'telefono', 'fecha', 'formula_medica']
