// Selección de elementos generales
const cloud = document.getElementById("cloud");
const barraLateral = document.querySelector(".barra-lateral");
const spans = document.querySelectorAll("span");
const menu = document.querySelector(".menu");
const main = document.querySelector("main");
const darkModeToggle = document.getElementById("darkModeToggle");

// Modal de clientes
const newClientButton = document.getElementById('newClientButton');
const clientModal = document.getElementById("clientModal");
const closeClientButton = clientModal.querySelector(".close");
const agregarClienteBtn = clientModal.querySelector('.boton-agregar');
const formularioAgregarCliente = document.getElementById('form-agregar-cliente');
const clienteContainer = document.querySelector('.contenedor-clientes');

// Modal de proveedores
const newProviderButton = document.getElementById('newProviderButton');
const providerModal = document.getElementById("providerModal");
const closeProviderButton = providerModal.querySelector(".close");
const formularioAgregarProveedor = document.getElementById('form-agregar-proveedor');

// Variables de datos
let clientes = [];  // Array para almacenar los clientes
let editingClient = null;  // Variable para rastrear si se está editando un cliente

// Renderización y eventos de clientes
function renderClientes() {
    clienteContainer.innerHTML = ''; // Limpiar contenedor antes de renderizar
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
    addEventListeners();  // Añadir eventos a botones de editar y eliminar
}

function addEventListeners() {
    document.querySelectorAll('.boton-editar').forEach(boton => boton.addEventListener('click', editarCliente));
    document.querySelectorAll('.boton-eliminar').forEach(boton => boton.addEventListener('click', eliminarCliente));
}

function agregarCliente(e) {
    e.preventDefault();
    const nombre = document.querySelector('#nombre-cliente').value;
    const cedula = document.querySelector('#cedula-cliente').value;
    const telefono = document.querySelector('#telefono-cliente').value;
    const fecha = document.querySelector('#fecha-cliente').value;
    const formulaMedica = document.querySelector('#formula-medica').value;

    if (nombre && cedula && telefono && fecha && formulaMedica) {
        const nuevoCliente = { nombre, cedula, telefono, fecha, formulaMedica };
        clientes.push(nuevoCliente);
        renderClientes();
        formularioAgregarCliente.reset();
        clientModal.style.display = "none";
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function editarCliente(event) {
    const index = event.target.getAttribute('data-index');
    const cliente = clientes[index];

    document.querySelector('#nombre-cliente').value = cliente.nombre;
    document.querySelector('#cedula-cliente').value = cliente.cedula;
    document.querySelector('#telefono-cliente').value = cliente.telefono;
    document.querySelector('#fecha-cliente').value = cliente.fecha;
    document.querySelector('#formula-medica').value = cliente.formulaMedica;

    agregarClienteBtn.textContent = 'Guardar Cambios';
    agregarClienteBtn.onclick = function guardarCambios(e) {
        e.preventDefault();

        cliente.nombre = document.querySelector('#nombre-cliente').value;
        cliente.cedula = document.querySelector('#cedula-cliente').value;
        cliente.telefono = document.querySelector('#telefono-cliente').value;
        cliente.fecha = document.querySelector('#fecha-cliente').value;
        cliente.formulaMedica = document.querySelector('#formula-medica').value;

        renderClientes();
        agregarClienteBtn.textContent = 'Agregar Cliente';
        formularioAgregarCliente.reset();
        agregarClienteBtn.onclick = agregarCliente;  // Restaurar función de agregar
        clientModal.style.display = "none";
    };

    clientModal.style.display = "block";
}

function eliminarCliente(event) {
    const index = event.target.getAttribute('data-index');
    if (confirm('¿Estás seguro de que deseas eliminar a este cliente?')) {
        clientes.splice(index, 1);  // Eliminar cliente
        renderClientes();
    }
}

// Funciones para el modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
}
darkModeToggle.addEventListener('change', toggleDarkMode);

// Eventos de menú y barra lateral
function toggleBarraLateral() {
    barraLateral.classList.toggle("max-barra-lateral");
    const isMaximized = barraLateral.classList.contains("max-barra-lateral");
    menu.children[0].style.display = isMaximized ? "none" : "block";
    menu.children[1].style.display = isMaximized ? "block" : "none";

    if (window.innerWidth <= 320) {
        barraLateral.classList.add("mini-barra-lateral");
        main.classList.add("min-main");
        spans.forEach(span => span.classList.add("oculto"));
    }
}
menu.addEventListener("click", toggleBarraLateral);

function toggleMiniBarraLateral() {
    barraLateral.classList.toggle("mini-barra-lateral");
    main.classList.toggle("min-main");
    spans.forEach(span => span.classList.toggle("oculto"));
}
cloud.addEventListener("click", toggleMiniBarraLateral);

// Funciones de modales
function openClientModal() {
    formularioAgregarCliente.reset();
    agregarClienteBtn.textContent = 'Agregar Cliente';
    clientModal.style.display = 'block';
}
newClientButton.addEventListener('click', openClientModal);
closeClientButton.addEventListener('click', () => clientModal.style.display = 'none');

function openProviderModal() {
    providerModal.style.display = 'block';
}
newProviderButton.addEventListener('click', openProviderModal);
closeProviderButton.addEventListener('click', () => providerModal.style.display = 'none');

function closeModalOnOutsideClick(event) {
    if (event.target === clientModal) clientModal.style.display = "none";
    if (event.target === providerModal) providerModal.style.display = "none";
}
window.addEventListener('click', closeModalOnOutsideClick);

// Funciones para modal de organización
function abrirModalOrganizar() {
    document.getElementById("organizarModal").style.display = "flex";
}

function cerrarModalOrganizar() {
    document.getElementById("organizarModal").style.display = "none";
}

function ordenarPor(criterio) {
    alert(`Ordenando por ${criterio}`); // Implementar lógica de ordenación aquí
    cerrarModalOrganizar();
}

// Función para buscar clientes
function buscarClientes() {
    const input = document.getElementById("buscarNombre").value.toLowerCase();
    const clientesList = document.querySelectorAll(".cliente");
    clientesList.forEach(cliente => {
        const nombre = cliente.querySelector("h2").innerText.toLowerCase();
        cliente.style.display = nombre.includes(input) ? "block" : "none";
    });
}

// Inicialización
renderClientes();
agregarClienteBtn.addEventListener('click', agregarCliente);
