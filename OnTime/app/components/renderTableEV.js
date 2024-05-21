import { itemEV } from "./ItemEV.js";


const d = document;

export function renderTableEV(items){
      let html = "";
      let itemsArray;
      //html += Item(item)
    
      //console.log(items);
      
        for (const key in items) {
          if (Object.hasOwnProperty.call(items, key)) {
            const item = items[key];
            html += itemEV(item, key);
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