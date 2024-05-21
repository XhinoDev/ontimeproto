import {
    getDatabase,
    ref,
    get,
  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

export async function mProductivo(){
const db = getDatabase(), refItems = ref(db, "productivos"), d= document;
let datatab = [], html = "";


function renderTabMp(item, id){
   // console.log(item);
    return `
    <tr id="${id}" class="itemP" data-run="${item.status !== "PENDIENTE" ? "1" : "0"}" style="display: flex;justify-content: space-around;align-items: center;width: 100%;font-size: 10px;font-family: sans-serif;font-weight: bold; ${item.status === "PENDIENTE" ? "background-color: #e1dcc9" : item.status === "DETENIDO" || item.status === "EN ESPERA" ? "background-color: #ff000059" : "background-color: #aaced9"}">
        <td  style="width: 7%;">${item.unidad}</td>
        <td  style="width: 7%;">${item.caja}</td>
        <td style="width: 15%;">${item.operador.slice(0, 18)}</td>
        <td style="width: 10%;">${item.cliente}</td>
        <td style="width: 10%;">${item.ruta.slice(0, 6)}</td>
        <td style="width: 10%;">${item.estatusllegada}</td>
        <td style="width: 15%;">${item.status}</td>
        <td style="width: 25%;">${item.comentarios}</td>
     </tr>
       `;
}

function getFormattedDate() {
  const today = new Date();
  
  // Obtenemos el día, el mes y el año
  let day = today.getDate();
  let month = today.getMonth() + 1; // Los meses en JavaScript son 0-11
  let year = today.getFullYear();
  
  // Añadimos un cero al principio si el día o el mes tienen un solo dígito
  if (day < 10) day = '0' + day;
  if (month < 10) month = '0' + month;

  // Construimos la fecha en el formato deseado
  return `${day}/${month}/${year}`;
}

await get(refItems)
.then((snapshot) => {
    if (snapshot.exists()) {
    datatab = snapshot.val(); 
    
    for (const key in datatab) {
        if (Object.hasOwnProperty.call(datatab, key)) {
          const item = datatab[key];
          
          if(item.citastop1.slice(0,10) === getFormattedDate() && item.status === "PENDIENTE" || item.status !== "PENDIENTE"){
            d.getElementById("tabmpBody").insertAdjacentHTML("beforeend", renderTabMp(item, key));
          } 
            
        
          //html += Item(item, key);
        }
      }

      const $tr = d.querySelectorAll(".itemP");
      const newOrder = Array.from($tr);       
          

         newOrder.sort((e1, e2) => {
          if (e1.dataset.run > e2.dataset.run) {
            return -1;
          } else if (
            e1.dataset.run < e2.dataset.run) {
            return 1;
          } else {
            return 0;
          }
         });

         

        newOrder.forEach((e) => {
          d.getElementById("tabmpBody").insertAdjacentElement("beforeend", e);          
         });  
  
   } else {
     console.log("No se encontraron datos.");
   }
  })
.catch((error) => {
    console.error("Error al obtener los datos:", error);
     });

      

}

export async function mRetornable(){
    const db = getDatabase(), refItems = ref(db, "retornables"), d= document;
    let datatab = [], html = "";


    function renderTabMr(item, id){
        //console.log(item);
        return `
        <tr id="${id}" class="itemR" data-run="${item.status !== "PENDIENTE" ? "1" : "0"}" style="display: flex;justify-content: space-around;align-items: center;width: 100%;font-size: 10px;font-family: sans-serif;font-weight: bold; ${item.status === "PENDIENTE" ? "background-color: #e1dcc9" : item.status === "DETENIDO" || item.status === "EN ESPERA" ? "background-color: #ff000059" : "background-color: #aaced9"}">
        <td  style="width: 7%;">${item.unidad}</td>
        <td  style="width: 7%;">${item.caja}</td>
        <td style="width: 15%;">${item.operador.slice(0, 18)}</td>
        <td style="width: 10%;">${item.cliente}</td>
        <td style="width: 10%;">${item.ruta.slice(0, 6)}</td>
        <td style="width: 10%;">${item.estatusllegada}</td>
        <td style="width: 15%;">${item.status}</td>
        <td style="width: 25%;">${item.comentarios}</td>
         </tr>
           `;
    }

    function getFormattedDate() {
      const today = new Date();
      
      // Obtenemos el día, el mes y el año
      let day = today.getDate();
      let month = today.getMonth() + 1; // Los meses en JavaScript son 0-11
      let year = today.getFullYear();
      
      // Añadimos un cero al principio si el día o el mes tienen un solo dígito
      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;
    
      // Construimos la fecha en el formato deseado
      return `${day}/${month}/${year}`;
    }
    
    
   await get(refItems)
    .then((snapshot) => {
        if (snapshot.exists()) {
        datatab = snapshot.val(); 
        
        for (const key in datatab) {
            if (Object.hasOwnProperty.call(datatab, key)) {
              const item = datatab[key];

              if(item.citastop1.slice(0,10) === getFormattedDate() && item.status === "PENDIENTE" || item.status !== "PENDIENTE"){
                d.getElementById("tabmrBody").insertAdjacentHTML("beforeend", renderTabMr(item, key));
              }  
                
              
              //html += Item(item, key);
            }
          }
    
          const $tr = d.querySelectorAll(".itemR");
          const newOrder = Array.from($tr);       
              
    
             newOrder.sort((e1, e2) => {
              if (e1.dataset.run > e2.dataset.run) {
                return -1;
              } else if (
                e1.dataset.run < e2.dataset.run) {
                return 1;
              } else {
                return 0;
              }
             });
    
             
    
            newOrder.forEach((e) => {
              d.getElementById("tabmrBody").insertAdjacentElement("beforeend", e);          
             });  
         
      
       } else {
         console.log("No se encontraron datos.");
       }
      })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
         });
    
          
    
    }