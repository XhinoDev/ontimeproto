import { Item } from "./Item.js";


const d = document;

export function renderTable(items){
  
  let html = "";
  let itemsArray;
  //html += Item(item)

  //console.log(items);
  
    for (const key in items) {
      if (Object.hasOwnProperty.call(items, key)) {
        const item = items[key];
        html += Item(item, key);
      }
    }
      
   
     
    
      d.getElementById("thtable").innerHTML =  `
         <table class="table" id="table_xls">
      
 
        <tbody id="table_body" class="body_table">
        </tbody>
    
         </table> `;

      d.getElementById("table_body").insertAdjacentHTML("beforeend", html);
     
      //Helper de acceso a los items
      const $tr = d.querySelectorAll(".item");
      const newOrder = Array.from($tr);       
    
    /*  // Función para convertir las fechas a objetos Date
      function convertirAFecha(fechaString) {
        let partes = fechaString.split(" ");
         let fecha = partes[0].split("/");
             let hora = partes[1].split(":");
         return new Date(fecha[2], fecha[1] - 1, fecha[0], hora[0], hora[1]);
        }
      
     //Run Order 
        // Ordenar las fechas
      newOrder.sort(function(a, b) {
        return convertirAFecha(a.dataset.citaprogramada) - convertirAFecha(b.dataset.citaprogramada);
         });   */

     newOrder.sort((e1, e2) => {
      if (e1.dataset.citastop1 < e2.dataset.citastop1 || e1.dataset.citastop1 < e2.dataset.citastop1) {
        return -1;
      } else if (
        e1.dataset.citastop1 > e2.dataset.citastop1 || e1.dataset.citastop1 > e2.dataset.citastop1) {
        return 1;
      } else {
        return 0;
      }
     });
     

     

        newOrder.forEach((e) => {
          d.getElementById("table_body").insertAdjacentElement("beforeend", e);          
         });  

         

}

/*<thead class="table-dark text-center align-middle">
      <tr>
        <th scope="col">UNIDAD</th>
        <th scope="col">CAJA</th>
        <th scope="col">OPERADOR</th>
        <th scope="col">C.PORTE</th>
        <th scope="col">TRACKING</th>
        <th scope="col">BOL / SHIPPER</th>
        <th scope="col">RUTA</th>
        <th scope="col">CLIENTE</th>
        <th scope="col">PROVEEDOR</th>
        <th scope="col">CITA PROGRAMADA</th>
        <th scope="col">LLEGADA REAL</th>
        <th scope="col">SALIDA REAL</th>
        <th scope="col">ETA DESTINO</th>
        <th scope="col">LLEGADA DESTINO</th>
        <th scope="col">SALIDA DESTINO</th>
        <th scope="col">LLEGADA</th>
        <th scope="col">ESTATUS</th>
        <th scope="col">COMENTARIOS</th>
        <th scope="col" class="btn-hid" style="${localStorage.username === "Public" || localStorage.username === "CVehicular" || localStorage.username === "Mtto" ? "display: none;" : ""}">OPCIONES</th>
  
      </tr>
    </thead>
    */