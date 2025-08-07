let carrito = [];

// Cargar carrito desde localStorage si existe
document.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("carrito");
  if (guardado) {
    carrito = JSON.parse(guardado);
    actualizarCarritoDOM();
  }
});

document.getElementById("agregarBtn").addEventListener("click", () => {
  const nombre = document.getElementById("nombreProducto").value;
  const precio = parseFloat(document.getElementById("precioProducto").value);

  if (nombre.trim() === "" || isNaN(precio) || precio <= 0) return;

  const producto = { nombre, precio };
  carrito.push(producto);
  guardarEnLocalStorage();
  actualizarCarritoDOM();

  document.getElementById("nombreProducto").value = "";
  document.getElementById("precioProducto").value = "";
});

document.getElementById("vaciarBtn").addEventListener("click", () => {
  carrito = [];
  guardarEnLocalStorage();
  actualizarCarritoDOM();
});

function actualizarCarritoDOM() {
  const ul = document.getElementById("carrito");
  ul.innerHTML = "";

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio}`;
    ul.appendChild(li);
  });

  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  document.getElementById("total").textContent = total.toFixed(2);
}

function guardarEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}