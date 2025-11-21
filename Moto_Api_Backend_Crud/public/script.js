let editMode = false;
let motoIdEdit = null;

// =========================
// OBTENER MOTOS Y MOSTRARLAS
// =========================
async function obtenerMotos() {
  const response = await fetch('/Motocicleta/motos');
  const data = await response.json();
  const lista = document.getElementById('moto-lista');
  lista.innerHTML = '';

  data.motos.forEach(moto => {
    lista.innerHTML += `
      <div class="col-md-4">
        <div class="card moto-card shadow-sm">
          <div class="card-body moto-card-body">
            <h5 class="fw-bold">${moto.marca} ${moto.modelo}</h5>
            <p class="mb-1"><strong>Año:</strong> ${moto.año}</p>
            <p class="mb-1"><strong>Precio:</strong> $${moto.precio}</p>
            <p class="mb-2"><strong>Kilometraje:</strong> ${moto.kilometraje} km</p>
            <p class="text-muted">${moto.descripcion || "Sin descripción"}</p>

            <button class="btn btn-warning btn-sm me-2" onclick="editarMoto('${moto._id}')">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarMoto('${moto._id}')">Eliminar</button>
          </div>
        </div>
      </div>
    `;
  });
}

// =========================
// GUARDAR O EDITAR MOTO
// =========================
document.getElementById('moto-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const motoData = {
    marca: document.getElementById('marca').value,
    modelo: document.getElementById('modelo').value,
    año: document.getElementById('año').value,
    precio: document.getElementById('precio').value,
    kilometraje: document.getElementById('kilometraje').value,
    descripcion: document.getElementById('descripcion').value
  };

  try {
    let response;

    if (editMode) {
      response = await fetch(`/Motocicleta/motos/${motoIdEdit}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(motoData)
      });
    } else {
      response = await fetch('/Motocicleta/motos', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(motoData)
      });
    }

    const result = await response.json();
    alert(result.msg || "Operación exitosa");

    resetForm();
    obtenerMotos();
  } catch (error) {
    alert("Error al guardar la moto");
  }
});

// =========================
// ELIMINAR MOTO
// =========================
async function eliminarMoto(id) {
  if (confirm("¿Seguro que deseas eliminar esta moto?")) {
    const res = await fetch(`/Motocicleta/motos/${id}`, {
      method: "DELETE"
    });

    const result = await res.json();
    alert(result.msg || "Moto eliminada");
    obtenerMotos();
  }
}

// =========================
// EDITAR MOTO
// =========================
function editarMoto(id) {
  fetch(`/Motocicleta/motos/${id}`)
    .then(res => res.json())
    .then(data => {
      const m = data.moto;

      document.getElementById('marca').value = m.marca;
      document.getElementById('modelo').value = m.modelo;
      document.getElementById('año').value = m.año;
      document.getElementById('precio').value = m.precio;
      document.getElementById('kilometraje').value = m.kilometraje;
      document.getElementById('descripcion').value = m.descripcion;

      document.getElementById('form-title').textContent = "Editar Moto";

      editMode = true;
      motoIdEdit = id;
    });
}

// =========================
// CANCELAR EDICIÓN
// =========================
function cancelarEdicion() {
  resetForm();
}

// =========================
// RESET DEL FORMULARIO
// =========================
function resetForm() {
  document.getElementById('moto-form').reset();
  document.getElementById('form-title').textContent = "Solicitar Moto";
  editMode = false;
}

// =========================
// SCROLL SUAVE DEL NAVBAR
// =========================
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Inicializar lista
obtenerMotos();
