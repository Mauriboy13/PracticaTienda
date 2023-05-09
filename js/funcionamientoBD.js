
//Base de datos para Categorias
var bdCategoria = new PouchDB("tiendita_Categoria");
var bdProductos = new PouchDB("tiendita_Productos");
var bdLista =  new PouchDB("tiendita_listas")

function btnAltaCategoria() {
    var categoria = document.getElementById('nombreCategoria').value;
       if (categoria) {
        bdCategoria.post({categoria: categoria}).then(function(respuesta) {
          if (respuesta.ok) {
            swal({
              title: "Categoria guardada",
              icon: "../img/faviAlert.gif",
            });
            limpiarcampos('nueva-categoria');
          }
        });
       }
       else {
        swal({
          title: "Error",
          text:"Ocurrio un Error",
          icon: "error"
        });
        console.log('Error');
      }
  }

//Dar de alta un nuevo producto
function btnAltaProducto() {
  var nombreA = document.getElementById('nombreProducto').value;
  var cantidadA = document.getElementById('cantidad').value;
  var precioA = document.getElementById('precio').value;
  var categoriaA = document.getElementById('categoria').value;
  var notaA = document.getElementById('nota').value;
  var imagenA = document.getElementById('imgFile').src;
  if (nombreA && precioA && cantidadA && categoriaA && notaA) {
    bdProductos.post({
      nombreA: nombreA,
      precioA: precioA,
      cantidadA: cantidadA,
      categoriaA: categoriaA,
      notaA: notaA,
      imagenA: imagenA
    }).then(function(respuesta) {
      if (respuesta.ok) {
        swal({
          title: "Producto guardado",
          icon: "../img/icono/faviAlert.ico",
        });
        limpiarcampos('nuevo-producto');
      }
    });
  }
  else{
    swal({
      title: "Error",
      text:"Ocurrio un Error",
      icon: "error"
    });
    console.log('Error');
  }
};
/////////////






///////////
//Mostrar productos
function vistaProductos(){
  bdProductos.allDocs({
    include_docs: true
  }).then(function(documentos) {
    var htmlProductos = "";
    for (var i = 0; i < documentos.rows.length; i++) {
      var producto = documentos.rows[i].doc;
      htmlProductos += "<div style='display: flex; margin-bottom: 20px; margin-top: 10px; background:#D4F974;'>";

      htmlProductos += "<div style='margin-right: 20px; margin-left:10px; margin-top: 30px;'>";
      htmlProductos += "<img src = '" + producto.imagenA + "' alt='Imagen' style='width: 100px;'>";
      htmlProductos += "</div>";
      htmlProductos += "<div>";
      htmlProductos += "<p><strong id>Nombre:</strong> " + producto.nombreA+ "</p>";
      htmlProductos += "<p><strong>Categoría:</strong> " + producto.categoriaA+"</p>";
      htmlProductos += "<p><strong>Nota:</strong> " + producto.notaA + "</p>";
      htmlProductos += "<div>";
      htmlProductos += "<label><input type='checkbox' class='producto-checkbox' data-id-producto='" + producto._id + "'>Agregar</label>";
      htmlProductos += "</div>";
      htmlProductos += "<button onclick='editarProducto(\"" + producto._id + "\")'>Editar</button>";

 
      htmlProductos += "</div>";
      htmlProductos += "</div>";
    }
    document.getElementById("productosContainer").innerHTML = htmlProductos;
    document.getElementById("agregarCarrito").addEventListener("click", agregarAlCarrito);
  });
};
///
//

// Agregar productos al carrito
function agregarAlCarrito() {
  var checkboxes = document.getElementsByClassName("producto-checkbox");
  var productosSeleccionados = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      var idProducto = checkboxes[i].getAttribute("data-id-producto");
      productosSeleccionados.push(idProducto);
    }
  }
  localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));
  window.location.href = "../index.html";
}

function vistaCarrito() {
  var productosSeleccionados = JSON.parse(localStorage.getItem("productosSeleccionados"));
  var promesas = []; // Array de promesas para cada producto seleccionado
  var htmlProductos = "";
  var total = 0; // Variable para acumular el total de todos los precios
  for (var i = 0; i < productosSeleccionados.length; i++) {
    // document.getElementById("cantidadProductos").innerHTML = productosSeleccionados.length;
    var idProducto = productosSeleccionados[i];
    var promesa = bdProductos.get(idProducto);
    promesas.push(promesa); // Añadir la promesa al array
  }
  // Esperar a que se completen todas las promesas
  Promise.all(promesas).then(function(productos) {
    for (var i = 0; i < productos.length; i++) {
      var producto = productos[i];
      htmlProductos += "<div style='display: flex; margin-bottom: 20px; margin-top: 10px; background:#D4F974;'>";

      htmlProductos += "<div style='margin-right: 20px; margin-left:10px; margin-top: 30px;'>";
      htmlProductos += "<img src = '" + producto.imagenA + "' alt='Imagen' style='width: 100px;'>";
      htmlProductos += "</div>";
      htmlProductos += "<div>";
      htmlProductos += "<p><strong>Nombre:</strong> " + producto.nombreA+ "</p>";
      htmlProductos += "<p><strong>Categoría:</strong> " + producto.categoriaA+"</p>";
      htmlProductos += "<p><strong>Precio:</strong> " + producto.precioA + "</p>";
      htmlProductos += "<p><strong>Cantidad:</strong> " + producto.cantidadA + "</p>";
      var precioTotal =  producto.cantidadA*producto.precioA;
      htmlProductos += "<p><strong>Total: </strong> " + precioTotal+ "</p>";
      htmlProductos += "<div>";
      // htmlProductos += "<label><input type='checkbox' class='producto-checkbox' data-id-producto='" + producto._id + "'>Comprar</label>";
      htmlProductos += "</div>";
      
      total += precioTotal; // Acumular el precio total en la variable 'total'

      htmlProductos += "</div>";
      htmlProductos += "</div>";
    }
    // Agregar el total de todos los precios al final del carrito
    htmlProductos += "<p><strong>Productos agregados: </strong>" + productosSeleccionados.length + "</p>";
    htmlProductos += "<p><strong>Total de todos los productos: $</strong>" + total + "</p>";

    document.getElementById("productosSeleccionados").innerHTML = htmlProductos;
  });
}

document.addEventListener("DOMContentLoaded", function(event) {
  vistaCarrito();
});



// Dar de alta una nueva lista
function btnAltaLista() {
  var nombreLista = document.getElementById('nombreLista').value;
  if (nombreLista) {
    bdLista.post({nombreLista: nombreLista}).then(function(respuesta) {
      if (respuesta.ok) {
        swal({
          title: "Lista guardada",
          icon: "../img/icono/faviAlert.ico",
        });
        limpiarcampos('nueva-lista');
      }
    });
  }
  else {
    swal({
      title: "Error",
      text:"Ocurrio un Error",
      icon: "error"
    });
    console.log('Error');
  }
}

// Obtener todas las listas de la base de datos
bdLista.allDocs({include_docs: true}).then(function(respuesta) {
  respuesta.rows.forEach(function(row) {
    var lista = row.doc;
    // Crear elemento <a> con la información de la lista y agregarlo al div con id="listas"
    var link = document.createElement('a');
    link.setAttribute('class', 'dropdown-item');
    link.setAttribute('href', 'verLista.html?id=' + lista._id);
    link.innerText = lista.nombreLista;
    document.getElementById('listas').appendChild(link);
  });
}).catch(function(error) {
  console.log('Error al obtener las listas', error);
});
function cargarListas() {
  bdListas.allDocs({
    include_docs: true
  }).then(function (documentos) {
    var htmlListas = "";
    for (var i = 0; i < documentos.rows.length; i++) {
      var lista = documentos.rows[i].doc;
      htmlListas += "<option value='" + lista._id + "'>" + lista.nombre + "</option>";
    }
    document.getElementById("listaSeleccionada").innerHTML += htmlListas;
  });
}



// Funcion para limipiar los inputs
function limpiarcampos(valor){
  if(valor == 'nueva-categoria'){
    document.getElementById('nombreCategoria').value = '';
  }
  else if (valor == 'nuevo-producto'){
    document.getElementById('nombreProducto').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('categoria').value ='';
    document.getElementById('cantidad').value = '';
    document.getElementById('nota').value = '';
    document.getElementById('imgFile').src = '../img/imgSubir.png';
  }
  else if (valor == 'nueva-lista'){
    document.getElementById('nombreLista').value = '';
  }
}


///
function editarProducto(idProducto) {
  localStorage.setItem("productoEditado", idProducto);
  window.location.href = "editarProductos.html";
}
