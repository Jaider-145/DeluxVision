from django.db import models
from django.core.validators import RegexValidator
from django.utils import timezone

class cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    cedula = models.CharField(
        max_length=20,
        validators=[RegexValidator(regex='^\d+$', message='La cédula debe contener solo números')]
    )
    telefono = models.CharField(
        max_length=15,
        validators=[RegexValidator(regex='^\d+$', message='El teléfono debe contener solo números')]
    )
    fecha = models.DateField()
    formula_medica = models.CharField(max_length=200)

    def __str__(self):
        return f"Nombre: {self.nombre}"

class producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40)
    descripcion = models.CharField(max_length=200)
    tipo_producto = models.CharField(max_length=50)

    def __str__(self):
        return f"Producto: {self.nombre}"

class proveedor(models.Model):
    id_proveedor = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40)
    telefono = models.CharField(
        max_length=15,
        validators=[RegexValidator(regex='^\d+$', message='El teléfono debe contener solo números')]
    )

    def __str__(self):
        return f"Proveedor: {self.nombre}"

class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    usuario = models.CharField(max_length=30)
    contrasena = models.CharField(max_length=50)
    rol = models.CharField(max_length=20)

    def __str__(self):
        return f"Usuario: {self.usuario}, Rol: {self.rol}"

class cliente_usuario(models.Model):
    id_usuario_cliente = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    id_cliente = models.ForeignKey(cliente, on_delete=models.CASCADE)

class cliente_producto(models.Model):
    id_cliente_producto = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(cliente, on_delete=models.CASCADE)
    id_producto = models.ForeignKey(producto, on_delete=models.CASCADE)
    total_compra = models.DecimalField(max_digits=10, decimal_places=2)

class proveedor_producto(models.Model):
    id_proveedor_producto = models.AutoField(primary_key=True)
    id_proveedor = models.ForeignKey(proveedor, on_delete=models.CASCADE)
    id_producto = models.ForeignKey(producto, on_delete=models.CASCADE)
    fecha = models.DateField()
    total_compra = models.DecimalField(max_digits=10, decimal_places=2)

class clienteForm(models.Model):
    nombre = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20)
    telefono = models.CharField(max_length=20)
    fecha = models.DateField(default=timezone.now)
    formula_medica = models.TextField()

    def __str__(self):
        return self.nombre
