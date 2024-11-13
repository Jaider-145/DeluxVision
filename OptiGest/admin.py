from django.contrib import admin
from .models import cliente, cliente_producto, cliente_usuario, producto, proveedor_producto, proveedor, Usuario, clienteForm

# Registro de los modelos en el admin
admin.site.register(Usuario)
admin.site.register(proveedor)
admin.site.register(proveedor_producto)
admin.site.register(producto)
admin.site.register(cliente_usuario)
admin.site.register(cliente)
admin.site.register(cliente_producto)
admin.site.register(clienteForm)