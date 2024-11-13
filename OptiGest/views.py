from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib import messages
from .models import cliente as ClienteModel  # Renombramos para evitar conflictos
from .forms import clienteForm

def vista_inicio(request):
    return render(request, 'inicio.html')

def vista_menu(request):
    return render(request, 'inicio.html')

def vista_cliente(request):
    return render(request, 'cliente.html')

def vista_proveedor(request):
    return render(request, 'proveedor.html')

def vista_papelera(request):
    return render(request, 'papelera.html')

def vista_sesion(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        
        # Autenticación del usuario
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('inicio')  # Redirige al inicio después de iniciar sesión
        else:
            messages.error(request, 'Credenciales inválidas')
            return redirect('vista_sesion')  # Vuelve a mostrar el formulario de inicio de sesión

    return render(request, 'inicio_sesion.html')

def vista_registro(request):
    if request.method == 'POST':
        nombre = request.POST['nombre']
        email = request.POST['email']
        password = request.POST['password']
        
        # Verifica si el usuario ya existe
        if User.objects.filter(username=email).exists():
            messages.error(request, 'El usuario ya existe')
            return redirect('vista_registro')  # Redirige de nuevo al formulario de registro
        else:
            # Crear nuevo usuario
            usuario = User.objects.create_user(username=email, email=email, password=password, first_name=nombre)
            usuario.save()
            messages.success(request, 'Usuario registrado exitosamente')
            return redirect('vista_sesion')  # Redirige al inicio de sesión

    return render(request, 'registro.html')

def agregar_cliente(request):
    if request.method == 'POST':
        form = clienteForm(request.POST)
        if form.is_valid():
            form.save()  # Esto guarda el cliente en la base de datos
            return redirect('vista_cliente')  # Cambia a tu vista deseada
    else:
        form = clienteForm()

    return render(request, 'cliente.html', {'form': form})

