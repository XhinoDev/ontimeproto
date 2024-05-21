import {
  getDatabase,
  push,
  ref,
  get,
  onValue,
  onChildChanged,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { tabActive } from "../tabActive.js";

// Función para cargar la vista productiva para el usuario dado
export function cargarVistaCargaMasiva(user) {
  const d = document;
  let dbXlsx = null, db = getDatabase(),
      repetidos = {};
      

  function agruparRepetidos(objeto) {
    for (var key in objeto) {
      var valor = objeto[key][0];
      if (!repetidos[valor]) {
        repetidos[valor] = [objeto[key]];
      } else {
        repetidos[valor].push(objeto[key]);
      }
    }
  }

  function handleFile(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Puedes acceder a las hojas del libro de trabajo
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convertir el contenido de la hoja a un objeto JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

         //console.log(jsonData);
        dbXlsx = jsonData;
      };

      reader.readAsArrayBuffer(file);
    }
  }


  d.querySelector(".head-ul").innerHTML = `
      <li class="head-li cargam">
      <a class="cargam">Carga Masiva</a>
      </li>
      `;

  d.querySelector(".container-main").innerHTML = `
  
  <div class="cargamasiva">
  <div class="container-cargamasiva">
  <h2>IMPORTAR ARCHIVO XLSX</h2>
  <label name="cliente">Selecciona Cliente y Tipo de Carga:</label>
  <select class="form-select-carga form-select-sm" name="cliente" id="cliente">
     <option value="FORD">FORD</option>
     <option value="GM">GM</option>
     <option value="BRP">BRP</option>
     <option value="AMAZON">AMAZON</option>
  </select>
  <select class="form-select-carga form-select-sm" style="width: 16rem;" name="tipo" id="tipoviaje">
     <option value="MP">MP - MATERIAL PRODUCTIVO</option>
     <option value="MR">MR - MATERIAL RETORNABLE</option>
     </select>
     
  <input id="excelFileInput" class="impxlsx" name="" type="file" >
  <button class="importXlsx">Aceptar</button>
  </div>
  </div>
  
  `;

  d.getElementById("excelFileInput").addEventListener("change", (e) => {
    if (e.target.matches("#excelFileInput")) {
      //  console.log(e.target);
      handleFile(e);
    }
  });

  let botonImport = d.querySelector(".importXlsx");
  
  botonImport.addEventListener("click", async (e)=>{

      //console.log(dbXlsx);
      agruparRepetidos(dbXlsx);
      let $cliente = d.getElementById("cliente").value;
      let $tipo = d.getElementById("tipoviaje").value;
      let isConfirm = confirm(`¿Está seguro de cargar Viajes de "${$cliente}"?`);
      if(isConfirm){
        for (var clave in repetidos) {
          if (repetidos.hasOwnProperty(clave) && repetidos[clave].length > 1) {
       // console.log("Ruta Lechera:", repetidos[clave]);
             let lechera = repetidos[clave], children = [], bodyItem = {}; 
             
        //  console.log(lechera);
   
   
            for (let i = 0; i < lechera.length; i++) {
                  const e = lechera[i];
                  children.push(e[0],e[1],e[3],e[4],e[5],e[6]);
              }
       //  console.log(children);
         
         // await set(ref(db, "productivos/" + clave), lechera);
   
              // console.log(item);
              const convert = (fecha)=>{
                let hora = fecha.slice(11, 17),
                arrF = fecha.slice(1, -6).split("/"),
                concatF = "";
              return  fecha = concatF.concat(arrF[1], "/0", arrF[0], "/", arrF[2], " ",  hora);             
            };
   
             
              
              for (let i = 0; i < children.length; i++) {
               const e = children[i];
                 bodyItem[i] = e;
              }
   
              if(bodyItem[11] && !bodyItem[17]){
                let  body = {
                    unidad: "",
                    caja: "",
                    cporte: "",
                    tracking: bodyItem[0],
                    cliente: $cliente,
                    bol: "",
                    ruta: bodyItem[1],
                    operador: "",
                    stop1: bodyItem[3],
                    citastop1: convert(bodyItem[4]),
                    llegadareal1: "--/--/--  --:--",
                    salidareal1: "--/--/--  --:--",
                    eta: "--/--/--  --:--",
                    stop2: bodyItem[9],
                    citastop2: convert(bodyItem[10]),
                    llegadareal2: "--/--/--  --:--",
                    salidareal2: "--/--/--  --:--",
                    estatusllegada: "A TIEMPO",
                    status: "PENDIENTE",
                    comentarios: "",
                    tipo: $tipo
                 };
                 if(body.stop2 === "Sitio") return;
                 if(body.tipo === "MP") await push(ref(db, `productivos/`), body);
                 if(body.tipo === "MR") await push(ref(db, `retornables/`), body);
                 }  
              else if(bodyItem[17]){
                  let body = {
                 unidad: "",
                 caja: "",
                 cporte: "",
                 tracking: bodyItem[0],
                 cliente: $cliente,
                 bol: "",
                 ruta: bodyItem[1],
                 operador: "",
                 stop1: bodyItem[3],
                 citastop1: convert(bodyItem[4]),
                 llegadareal1: "--/--/--  --:--",
                 salidareal1: "--/--/--  --:--",
                 eta: "--/--/--  --:--",
                 stop2: bodyItem[9],
                 citastop2: convert(bodyItem[10]),
                 llegadareal2: "--/--/--  --:--",
                 salidareal2: "--/--/--  --:--",
                 estatusllegada: "A TIEMPO",
                 status: "PENDIENTE",
                 comentarios: "",
                 tipo: $tipo,
                 eta2: "--/--/--  --:--",
                 stop3: bodyItem[15],
                 citastop3: convert(bodyItem[16]),
                 llegadareal3: "--/--/--  --:--",
                 salidareal3: "--/--/--  --:--"
              };
   
              if(body.stop2 === "Sitio") return;
              if(body.tipo === "MP") await push(ref(db, `productivos/`), body);
              if(body.tipo === "MR") await push(ref(db, `retornables/`), body);
              }
                 
        } else {
          //console.log(sencilla);
          }
   
           
       }
      }
      repetidos = {};
   
  })

  tabActive("cargam");
}


//let sencilla = repetidos[clave][0];
      
            
// console.log(item);
/*   let hora = sencilla[5].slice(11, 17),
  arrF = sencilla[5].slice(1, -6).split("/"),
  concatF = "";
sencilla[5] = concatF.concat(
  arrF[1],
  "/0",
  arrF[0],
  "/",
  arrF[2],
  " ",
  hora
);


let body = {
unidad: "",
caja: "",
cporte: "",
tracking: `${sencilla[0]}`,
bol: "",
ruta: `${sencilla[1]}`,
operador: "",
cliente: "BRP",
proveedor: `${sencilla[4]}`,
citaprogramada: `${sencilla[5]}`,
llegadareal: "01/01/0001 00:00",
salidareal: "01/01/0001 00:00",
eta: "01/01/0001 00:00",
llegadadestino: "01/01/0001 00:00",
salidadestino: "01/01/0001 00:00",
llegada: "A TIEMPO",
status: "PENDIENTE",
comentarios: "SIN COMENTARIOS",
};*/
//console.log(body);
// await push(ref(db, `viajes/${clave}`), body);
// console.log(sencilla);