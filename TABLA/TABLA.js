

const urlBase = "https://api.yumserver.com/16960/products";
const idSecciones = ['aviso-carga', 'lista', 'nuevo-producto', 'editar-producto'];

function mostrarSeccion(idSeccion) {
  for (let index = 0; index < idSecciones.length; index++) {
    document.getElementById(idSecciones[index]).setAttribute('style', 'display:none');
  }
  document.getElementById(idSeccion).removeAttribute('style');
}

function mostrarSeccionListado() {
  mostrarSeccion('aviso-carga');

  fetch(urlBase)
    .then(response => response.json())
    .then(productos => {
      cargarListaProductos(productos);
      mostrarSeccion('lista');
    })
    .catch(error => console.error('Error:', error));
}

function mostrarSeccionCrear() {
  
  document.getElementById('new-titulo').value = null;
  document.getElementById('new-precioPeso').value = null;
  document.getElementById('new-precioDolar').value = null;
  document.getElementById('new-fecha').value = null;

  mostrarSeccion('nuevo-producto');
}

// Función para mostrar los productos en la tabla
function cargarListaProductos(productos) {
  let html = '';
  for (let index = 0; index < productos.length; index++) {
    html += `
      <tr>
        <td>${productos[index].idcod}</td>
        <td>${productos[index].titulo}</td>
        <td>${productos[index].precioPeso}</td>
        <td>${productos[index].precioDolar}</td>
        <td>${productos[index].fecha}</td>
        <td>
          <button class="btn" onclick="editarProducto('${productos[index].idcod}')">Editar</button>
          <button class="btn" onclick="borrarProducto('${productos[index].idcod}')">Borrar</button>
        </td>
      </tr>`;
  };
  document.getElementById('cuerpo-tabla').innerHTML = html;
}

// Función para crear un nuevo producto
function crearNuevoProducto() {
  const producto = {
    titulo: document.getElementById('new-titulo').value,
    precioPeso: document.getElementById('new-precioPeso').value,
    precioDolar: document.getElementById('new-precioDolar').value,
    fecha: document.getElementById('new-fecha').value
  };

  fetch(urlBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  })
    .then(response => response.text())
    .then(result => {
      if (result.trim() == 'OK') {
        alert('Producto creado exitosamente');
        mostrarSeccionListado();
      } else {
        throw new Error(result);
      }
    })
    .catch(error =>
      alert(`Error al crear el producto: ${error.message}`)
    );
}

function borrarProducto(idcod) {
  if (window.confirm(`¿Estás seguro de que deseas eliminar el producto con el idcod ${idcod}?`)) {
    fetch(urlBase, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idcod })
    })
      .then(response => response.text())
      .then(result => {
        if (result.trim() == 'OK') {
          alert('Producto eliminado correctamente.');
          mostrarSeccionListado();
        } else {
          throw new Error(result);
        }
      })
      .catch(error => {
        console.error(error);

        alert('Error al eliminar el producto');
        mostrarSeccionListado();
      });
  }
}

function editarProducto(idcod) {
  mostrarSeccion('aviso-carga');

  // Obtener los datos del producto a editar
  fetch(`${urlBase}/${idcod}`)
    .then(response => response.json())
    .then(producto => {
      
      document.getElementById('edit-id').value = producto.idcod;
      document.getElementById('edit-titulo').value = producto.titulo;
      document.getElementById('edit-precioPESO').value = producto.precioPeso;
      document.getElementById('edit-precioDOLAR').value = producto.precioDolar;
      document.getElementById('edit-fecha').value = producto.fecha;

      mostrarSeccion('editar-producto');
    })
    .catch(error => console.error('Error:', error));
}

function actualizarProducto() {
  const data = {
    idcod: document.getElementById('edit-id').value,
    titulo: document.getElementById('edit-titulo').value,
    precioPeso: document.getElementById('edit-precioPESO').value,
    precioDolar: document.getElementById('edit-precioDOLAR').value,
    fecha: document.getElementById('edit-fecha').value
  };

  fetch(`${urlBase}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(response => response.text())
    .then(result => {
      if (result.trim() == 'OK') {
        mostrarSeccionListado();
      } else {
        throw new Error(result);
      }
    })
    .catch(error =>
      alert(`Error al actualizar el producto: ${error.message}`)
    );
}
