     // --- Selección de elementos generales ---
     const cloud = document.getElementById("cloud");
     const barraLateral = document.querySelector(".barra-lateral");
     const spans = document.querySelectorAll("span");
     const menu = document.querySelector(".menu");
     const main = document.querySelector("main");
     const darkModeToggle = document.getElementById("darkModeToggle");
     
     // --- Modal de clientes ---
     const newClientButton = document.getElementById('newClientButton');
     const clientModal = document.getElementById("clientModal");
     const closeClientButton = clientModal.querySelector(".close");
     const agregarClienteBtn = clientModal.querySelector('.boton-agregar');
     const formularioAgregarCliente = document.getElementById('form-agregar-cliente');
     const clienteContainer = document.querySelector('.contenedor-clientes');
     
     // --- Modal de proveedores ---
     const newProviderButton = document.getElementById('newProviderButton');
     const providerModal = document.getElementById("providerModal");
     const closeProviderButton = providerModal.querySelector(".close");
     const formAgregarProveedor = document.getElementById('form-agregar-proveedor');
     const contenedorProveedores = document.getElementById('contenedorClientes'); // Cambia el id a 'contenedorProveedores' si es necesario
     
     // --- Variables de datos ---
     let clientes = [];  // Almacena los clientes
     let proveedores = []; // Almacena los proveedores
     
     // --- Funciones de Clientes ---
     function renderClientes() {
         clienteContainer.innerHTML = '';
         clientes.forEach((cliente, index) => {
             const clienteHTML = `
             <div class="cliente">
                 <div class="informacion-cliente">
                     <h2>${cliente.nombre}</h2>
                     <p>Cédula: ${cliente.cedula}</p>
                     <p>Teléfono: ${cliente.telefono}</p>
                     <p>Fecha de Registro: ${cliente.fecha}</p>
                     <p>Fórmula Médica: ${cliente.formulaMedica}</p>
                 </div>
                 <div class="acciones-cliente">
                     <button class="boton boton-editar" data-index="${index}">Editar</button>
                     <button class="boton boton-eliminar" data-index="${index}">Eliminar</button>
                 </div>
             </div>`;
             clienteContainer.insertAdjacentHTML('beforeend', clienteHTML);
         });
         addClientEventListeners();
     }
     
     function addClientEventListeners() {
         document.querySelectorAll('.boton-editar').forEach(boton => boton.addEventListener('click', editarCliente));
         document.querySelectorAll('.boton-eliminar').forEach(boton => boton.addEventListener('click', eliminarCliente));
     }
     
     function agregarCliente(e) {
         e.preventDefault();
         
         const nuevoCliente = {
             nombre: document.querySelector('#nombre-cliente').value,
             cedula: document.querySelector('#cedula-cliente').value,
             telefono: document.querySelector('#telefono-cliente').value,
             fecha: document.querySelector('#fecha-cliente').value,
             formulaMedica: document.querySelector('#formula-medica').value
         };
     
         if (Object.values(nuevoCliente).every(campo => campo)) {
             clientes.push(nuevoCliente);
             renderClientes();
             formularioAgregarCliente.reset();
             clientModal.style.display = "none";
         } else {
             alert('Por favor, completa todos los campos.');
         }
     }
     
     // --- Funciones de Proveedores ---
     function renderProveedores() {
         contenedorProveedores.innerHTML = '';
         proveedores.forEach((proveedor, index) => {
             const proveedorHTML = `
             <div class="proveedor">
                 <div class="informacion-proveedor">
                     <h2>${proveedor.nombre}</h2>
                     <p>Teléfono: ${proveedor.telefono}</p>
                     <p>Producto: ${proveedor.producto}</p>
                 </div>
                 <div class="acciones-proveedor">
                     <button class="boton boton-editar" data-index="${index}">Editar</button>
                     <button class="boton boton-eliminar" data-index="${index}">Eliminar</button>
                 </div>
             </div>`;
             contenedorProveedores.insertAdjacentHTML('beforeend', proveedorHTML);
         });
         addProviderEventListeners();
     }
     
     function addProviderEventListeners() {
         document.querySelectorAll('.boton-editar').forEach(boton => boton.addEventListener('click', editarProveedor));
         document.querySelectorAll('.boton-eliminar').forEach(boton => boton.addEventListener('click', eliminarProveedor));
     }
     
     function agregarProveedor(e) {
         e.preventDefault();
     
         const nuevoProveedor = {
             nombre: document.getElementById('nombre-proveedor').value,
             telefono: document.getElementById('telefono-proveedor').value,
             producto: document.getElementById('producto-proveedor').value
         };
     
         if (Object.values(nuevoProveedor).every(campo => campo)) {
             proveedores.push(nuevoProveedor);
             renderProveedores();
             formAgregarProveedor.reset();
             providerModal.style.display = "none";
         } else {
             alert('Por favor, completa todos los campos.');
         }
     }
     
     // --- Eventos de interfaz y modo oscuro ---
     darkModeToggle.onchange = () => document.body.classList.toggle("dark-mode", darkModeToggle.checked);
     
     menu.addEventListener("click", () => {
         barraLateral.classList.toggle("max-barra-lateral");
         menu.children[0].style.display = barraLateral.classList.contains("max-barra-lateral") ? "none" : "block";
         menu.children[1].style.display = barraLateral.classList.contains("max-barra-lateral") ? "block" : "none";
     });
     
     cloud.addEventListener("click", () => {
         barraLateral.classList.toggle("mini-barra-lateral");
         main.classList.toggle("min-main");
         spans.forEach(span => span.classList.toggle("oculto"));
     });
     
     // --- Eventos para abrir y cerrar modales ---
     newClientButton.addEventListener('click', () => {
         formularioAgregarCliente.reset();
         agregarClienteBtn.textContent = 'Agregar Cliente';
         clientModal.style.display = 'block';
     });
     
     closeClientButton.addEventListener('click', () => clientModal.style.display = 'none');
     newProviderButton.addEventListener('click', () => providerModal.style.display = 'block');
     closeProviderButton.addEventListener('click', () => providerModal.style.display = 'none');
     
     window.addEventListener('click', (event) => {
         if (event.target === clientModal) clientModal.style.display = "none";
         if (event.target === providerModal) providerModal.style.display = "none";
     });
     
     // --- Inicialización ---
     renderClientes();
     renderProveedores();
     
     agregarClienteBtn.addEventListener('click', agregarCliente);
     formAgregarProveedor.addEventListener('submit', agregarProveedor);
     
     document.getElementById('darkModeToggle').addEventListener('change', function() {
         document.body.classList.toggle('dark-mode');
     });
     