const txtProducto = document.getElementById("txtProducto");
const tblProductos = document.getElementById("tblProductos");

let Productos = (localStorage.getItem("Productos")) ? JSON.parse(localStorage.getItem("Productos")) : [];


mostrarProductos();

function guardar() {
    const Producto = txtProducto.value;
    Productos.push(Producto);
    EditarProducto();
    txtProducto.value = "";
}

function EditarProducto() {
    localStorage.setItem("Productos", JSON.stringify(Productos));
    mostrarProductos();
}

function mostrarProductos() {
    if (Productos.length === 0) {
        tblProductos.innerHTML = `<tr><td colspan="2" class="text-center">No hay registros</td></tr>`;
    } else {
        tblProductos.innerHTML = "";
        for (const Producto of Productos) {
            const tr = document.createElement("tr");
            tr.classList.add("text-center");

            const tdProductotxtProducto = document.createElement("td");
            tdProductotxtProducto.innerText = Producto;
            tr.appendChild(tdProductotxtProducto);

            const tdAcciones = document.createElement("td");

            const btnEditar = document.createElement("button");
            btnEditar.classList.add("btn-dark", "ml-2");
            btnEditar.innerText = "EDITAR";
            btnEditar.onclick = () => Editar(Producto);
            tdAcciones.appendChild(btnEditar);
            tr.appendChild(tdAcciones);

            const btnELIMINAR = document.createElement("button");
            btnELIMINAR.classList.add("btn-light");
            btnELIMINAR.innerText = "ELIMINAR";
            btnELIMINAR.onclick = () => limpiarStorage(Producto);
            tdAcciones.appendChild(btnELIMINAR);

            tblProductos.appendChild(tr);
        }
    }

}

function limpiarStorage(Producto) {
    const index = Productos.indexOf(Producto);
    Productos.splice(index, 1);
    EditarProducto();
}

function Editar(Producto) {
    const index = Productos.indexOf(Producto);
    const nuevo_nombre_ProductotxtProducto = prompt(`Escribe el nuevo nombre para ${Producto}`);
    Productos[index] = nuevo_nombre_ProductotxtProducto;
    EditarProducto();
}


txtProducto.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        guardar();
    }
});