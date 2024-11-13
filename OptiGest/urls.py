from django.urls import path
from . import views

urlpatterns = [
    path('', views.vista_sesion, name='vista_sesion'),
    path('inicio/', views.vista_inicio, name='inicio'),
    path('registro/', views.vista_registro, name='vista_registro'),
    path('menu/', views.vista_menu, name='vista_menu'),
    path('clientes/', views.vista_cliente, name='vista_cliente'),  # Se recomienda pluralizar para consistencia
    path('proveedores/', views.vista_proveedor, name='vista_proveedor'),  # Pluralización para uniformidad
    path('papelera/', views.vista_papelera, name='vista_papelera'),
    path('agregar_cliente/', views.agregar_cliente, name='agregar_cliente')
]
