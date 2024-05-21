import {
  getDatabase,
  ref,
  get,
  onValue,
  onChildChanged,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { tabActive } from "../tabActive.js";

// Función para cargar la vista productiva para el usuario dado
export function cargarVistaOperadores(user) {
  document.querySelector(".head-ul").innerHTML = `
  <li class="head-li operadores-li">
  <a class="operadoreS">Operadores</a>
  </li>
  `;

document.querySelector(".container-main").innerHTML = `

<div class="cargamasiva">
<br/>
<br/>
<br/>
<br/>
<h2>Lista de Operadores</h2>
<div class="container-listaop">

</div>
</div>

`;


tabActive("operadores");
}
