import { itemHistoryConv } from "./itemHistoryConv.js";

const d = document;

export function renderTableHistoryConv(items){    
      let itemsArray = Object.entries(items);

    //  console.log(itemsArray);

      // Ubication Order
      let orderItems = itemsArray.sort((o1, o2) => {
        if (o1[1].caja < o2[1].caja || o1[1].caja < o2[1].caja) {
          return -1;
        } else if (o1[1].caja > o2[1].caja || o1[1].caja > o2[1].caja) {
          return 1;
        } else {
          return 0;
        }
      });

    //console.log(orderItems);

      let html = "";
      

      orderItems.forEach((item) => (html += itemHistoryConv(item)));
     
    
 

 d.getElementById("thtable").innerHTML =  `
         <table class="table table-hover table-sm  table-striped" id="table_xls">
      <thead class="table-dark text-center align-middle">
      <tr>
     
      <th scope="col">CAJA</th>
      <th scope="col">TIPO</th>
      <th class="modelo" scope="col">MARCA</th>
      <th class="placa" scope="col">PLACA</th>
      <th class="año" scope="col">AÑO</th>
       <th class="verificacion" scope="col">NO. SERIE</th>
       <th class="poliza" scope="col">NO. POLIZA</th>
      <th class="inciso" scope="col">INCISO</th>
      <th class="contacto" scope="col">MARCHAMO</th>
      <th scope="col">CIRCUITO</th>
      <th scope="col">FECHA</th>
      <th scope="col">DIAS DETENIDO</th>
      <th scope="col">UBICACION</th> 
      <th scope="col">ESTATUS</th>
      <th scope="col">REPORTE</th>
      <th scope="col">FECHA REGISTRO</th>             
 
                 
      </tr>
    </thead>
 
    <tbody id="table_body" class="body_table">
    </tbody>
    
  </table>
</section>`;

d.getElementById("table_body").insertAdjacentHTML("beforeend", html);
     
   //Helper de acceso a los items
  const $tr = d.querySelectorAll(".item");
  const newOrder = Array.from($tr);

//  console.log($tr);
  // Orden Run Complete
 
  newOrder.sort((a, b) => a.dataset.unit - b.dataset.unit);
      //console.log(newOrder);

      newOrder.forEach((e) => {
        d.getElementById("table_body").insertAdjacentElement("beforeend", e);          
       }); 


}