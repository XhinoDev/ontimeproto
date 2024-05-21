import {
  getDatabase,
  ref,
  onValue,
  get,
  set,
  push,
  update,
  remove,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import { generar_xls } from "../helpers/generar_xls.js";
import { renderTableHistory } from "./renderTableHistory.js";
import dropAreaLabel from "../helpers/dropArea.js";
import { generatePDF } from "../helpers/generatePDF.js";

import { cargarVistaHistorial } from "./vistas/vistaHistorial.js";
import { cargarVistaProductiva } from "./vistas/vistaProductivos.js";
import { cargarVistaRemolques } from "./vistas/vistaRemolques.js";
import { cargarVistaEquipoV } from "./vistas/vistaRetornables.js";
import { cargarVistaUnidades } from "./vistas/vistaUnidades.js";

import { cargarVistaHistorialCajas } from "./vistas/vistahistorialCajas.js";
import { cargarVistaHistorialUnidades } from "./vistas/vistaHistorialUnidades.js";
import { cargarVistaCargaMasiva } from "./vistas/vistaCargaMasiva.js";
import { cargarVistaOperadores } from "./vistas/vistaOperadores.js";
import { mProductivo, mRetornable } from "./reporteturno.js";

export async function Router() {
  const d = document,
    db = getDatabase();
  let span = document.getElementsByClassName("close")[0],
    date = new Date();

  let clockTempo, datatab = null;

  function cambiarVista(user, hash) {
    switch (hash) {
      case "#/":
        localStorage.clear();
        location.reload();
        break;
      case "#/tablero/productivo":
        d.querySelector(".tablero").classList.add("active");
        cargarVistaProductiva(user);
        break;
      case "#/tablero/retornables":
        cargarVistaEquipoV(user);
        break;
      case "#/tablero/historial":
        cargarVistaHistorial(user);
        break;
        case "#/cargadeviajes/masiva":
          d.querySelector(".carga").classList.add("active");
          cargarVistaCargaMasiva(user);
        break;
        case "#/operadores/lista":
          d.querySelector(".operadores").classList.add("active");
          cargarVistaOperadores(user);
        break;
        case "#/mantenimiento/unidades":
          d.querySelector(".cv").classList.add("active");
        cargarVistaUnidades(user);
        break;
        case "#/mantenimiento/hUnidades":
          cargarVistaHistorialUnidades(user);
          break;
      case "#/mantenimiento/cajas":
        cargarVistaRemolques(user);
        break;
      case "#/mantenimiento/hCajas":
        cargarVistaHistorialCajas(user);
        break;

      default:
        // Vista no válida
        console.error("Vista no válida");
        localStorage.clear();
        location.reload();
    }
  }

  function reghistoryUnits() {
    const $tr = d.querySelectorAll(".item");
    const lisTr = Array.from($tr);
    //console.log(lisTr);

    lisTr.forEach(async (e) => {
      // console.log(e);
      let body = {
        verificacion: e.cells[4].textContent,
        poliza: e.cells[5].textContent,
        inciso: e.cells[6].textContent,
        placa: e.cells[2].textContent,
        modelo: e.cells[1].textContent,
        año: e.cells[3].textContent,
        unidad: e.cells[0].textContent,
        kmuservicio: e.cells[8].textContent,
        kmpservicio: e.cells[9].textContent,
        kmodometro: e.cells[10].textContent,
        kmsigservicio: e.cells[11].textContent,
        mttoprev: e.cells[12].textContent,
        circuito: e.cells[13].textContent,
        fechaUServicio: e.cells[7].textContent,
        fechainv: e.cells[14].textContent,
        ubicacion: e.cells[15].textContent,
        comentarios: e.cells[16].textContent,
        fecharegistro: date.toLocaleDateString(),
      };
      await push(ref(db, "history-units"), body);
    });
  }

  function sugerencias(id) {
    const operadores = [
      "ANTONIO GLENN VASQUEZ LOPEZ",
      "JOSE TRINIDAD ANGELES VELAZQUEZ",
      "FERNANDO MENDOZA GUTIERREZ",
      "SERGIO RUBEN CAMACHO SEGOVIANO",
      "CARLOS MARTIN MARTINEZ LOZA",
      "JESUS EDUARDO VARGAS CRUZ",
      "JOSE JUAN CHAVEZ GOMEZ",
      "CRISTIAN ANGEL CLETO CRUZ",
      "GONZALO ARMANDO RASGADO SOMBRA",
      "EDUARDO OSVALDO CHAVEZ RODRIGUEZ",
      "DYLAN ROGELIO JUAREZ SANCHEZ",
      "VICTOR GONZALEZ JUAREZ",
      "FELIPE MEJIA NOVO",
      "MIGUEL ANGEL BOLANOS ALCANTARA",
      "ALEJANDRO ESPINOZA SANTAMARIA",
      "ANGEL REMIGIO JUAREZ ALVAREZ",
      "MIGUEL ANGEL SOLIS VEGA",
      "EFRAIN BARRETO DONIZ",
      "FRANCISCO JULIAN TAPIA CASASOLA",
      "ROGELIO JUAREZ PEREZ",
      "EDGAR RENE LOPEZ CRUZ",
      "OSCAR RIOS ESPINOSA",
      "JUAN GARCIA GUTIERREZ",
      "ERIC VAZQUEZ ARRATIA",
      "FERNANDO BECERRIL ALCANTARA",
      "ROBERTO ANGELES LAGUNAS",
      "JOSUE ARMANDO JIMENEZ ANGELES",
      "MIGUEL ANGEL JUAREZ ALVAREZ",
      "ARMANDO FLORES VILLAFANA",
      "DAVID ALEJANDRO MENDEZ MATA",
      "MARCO URIEL HERNANDEZ FLORES",
      "GUSTAVO HERNANDEZ FLORES",
      "TITO AGUSTIN CARRANZA ROMERO",
      "ROBERTO CARLOS JIMENEZ VELAZQUEZ",
      "VICTOR MANUEL TOVAR PEREZ",
      "ANGEL VASQUEZ LOPEZ",
      "MARTIN SERRANO CERVANTES",
      "JUAN MANUEL LOPEZ RAMIREZ",
      "ABRAHAM ESPINOSA RODRIGUEZ",
      "JUAN BECERRIL ALCANTARA",
      "CHRISTIAN UBALDO SOLIS SANCHEZ",
      "JESUS FRANCISCO SANCHEZ BECERRA",
      "FERNANDO GONZALO GIL TREJO",
      "MARGARITO GARCIA ROSAS",
      "ENRIQUE CALVILLO HERNANDEZ",
      "FERNANDO GARCIA ACOSTA",
      "ISAC BARRETO CUANDON",
      "MARCOS QUIJADA QUIJADA",
      "CESAR BERNAL GOMEZTAGLE",
      "LORENZO MERCADO MALDONADO",
      "MIGUEL ANGEL CALVILLO ESQUIVEL",
      "JAVIER RAFAEL ISLAS",
      "GUILLERMO CRUZ FRAGOSO",
      "SAMUEL FRAGOSO GARCIA",
      "ANGEL FRANCISCO MENDEZ LOPEZ",
      "ARMANDO SOMBRA LAZCANO",
      "ARTURO GARCIA DAVILA",
      "SANTOS JULIAN SANCHEZ BECERRA",
      "HECTOR DONOVAN CASAS COYOI",
      "DIEGO RUEDA VARGAS",
    ];
    let inputAsignacion = d.querySelector(`.${id}`);
    let sugerenciasDatalist = d.getElementById("sugerencias");
    
       
    inputAsignacion.addEventListener("input", function () {
        let valorInput = this.value.toUpperCase();
        let sugerenciasHTML = "";
  
        if (valorInput) {
          let sugerencias = operadores.filter(function (operador) {
            return operador.toUpperCase().includes(valorInput);
          });
  
          sugerenciasHTML = sugerencias
            .map(function (op) {
              return `<option value="${op}">${op}</option>`;
            })
            .join("");
        }
  
        sugerenciasDatalist.innerHTML = "";
        sugerenciasDatalist.insertAdjacentHTML("beforeend", sugerenciasHTML);
      });
   
    
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
  

  let user = localStorage.user,
    hash = window.location.hash;

  cambiarVista(user, hash);

  
  d.addEventListener("click", async (e) => {
    let modal = document.getElementById("myModal"); 
    if (e.target.matches(".fa-bars") || e.target.matches(".menu")) {
      d.getElementById("nav").classList.toggle("actionnav");
      d.querySelector(".item-tablero").classList.toggle("none");
      d.querySelector(".item-carga").classList.toggle("none");
      d.querySelector(".item-op").classList.toggle("none");
      d.querySelector(".item-cv").classList.toggle("none");
      d.querySelector(".session").classList.toggle("none");
      d.querySelector(".perfil").classList.toggle("none");
      d.querySelector(".container-nav").classList.toggle("padnav");
      d.querySelector(".header").classList.toggle("action-header");
      d.getElementById("main").classList.toggle("action-main");
      d.querySelector(".menu").classList.toggle("navLi");
      d.querySelectorAll(".nav-li").forEach((e) => {
        e.classList.toggle("navLi");
      });
    } else if (e.target.matches(".modal_xls")) {
      if (localStorage.tabViajes === "true") {
        d.querySelector(".export-modal-body").innerHTML = `
    <section id="thtable" class="thtable">
    <table class="table table-hover table-sm" id="table_xls">
    <thead class="table-dark text-center align-middle">
    <tr style="background-color:black; color:white;">
    <td colspan="" scope="row" style="font-weight: bold;" class="tableDate">${date.toLocaleDateString(
      "es-MX",
      { weekday: "long", year: "numeric", month: "short", day: "numeric" }
    )}</td>  
    </tr>
    <tr style="background-color:black; color:white;">
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
    <th scope="col">ETA</th>
    <th scope="col">LLEGADA A DESTINO</th>
    <th scope="col">SALIDA A DESTINO</th>
    <th scope="col">LLEGADA</th>
    <th scope="col">ESTATUS</th>
    <th scope="col">COMENTARIOS</th>  
    </tr>
    </thead>
    <tbody id="table_bodyX" class="body_table">
    </tbody>     
    </table>
    </section>
    `;

        //Helper de acceso a los items
        const $tr = d.querySelectorAll(".item");
        const lisTr = Array.from($tr);

        lisTr.forEach((e) => {
          if (e.classList[5] === "filter") {
            return;
          }
          d.getElementById("table_bodyX").insertAdjacentElement("beforeend", e);
        });

        d.querySelectorAll(".btn-hid").forEach(
          (e) => (e.style.display = "none")
        );
      } else if (localStorage.tabConveyance === "true") {
        d.querySelector(".export-modal-body").innerHTML = `
      <section id="thtable" class="thtable">
      <table class="table table-hover table-sm" id="table_xls">
      <thead class="table-dark text-center align-middle">
      <tr style="background-color:black; color:white;">
      <td colspan="" scope="row" style="font-weight: bold;" class="tableDate">${date.toLocaleDateString(
        "es-MX",
        { weekday: "long", year: "numeric", month: "short", day: "numeric" }
      )}</td>  
      </tr>
      <tr style="background-color:black; color:white;">
      <th id="cajas" scope="col">CAJA</th>
      <th scope="col">TIPO</th>
      <th scope="col">MODELO</th>
      <th scope="col">PLACA</th>
      <th scope="col">AÑO</th>
      <th scope="col">VERIFICACION</th>
      <th scope="col">NO. POLIZA</th>
      <th scope="col">INCISO</th>
      <th scope="col">MARCHAMO</th>
      <th scope="col">CIRCUITO</th>
      <th scope="col">FECHA</th>
      <th scope="col">DIAS DETENIDO</th>
      <th scope="col">UBICACION</th> 
      <th scope="col">ESTATUS</th>  
      <th scope="col">REPORTE</th> 
      </tr>
      </thead>
      <tbody id="table_bodyX" class="body_table">
      </tbody>     
      </table>
      </section>
      `;

        //Helper de acceso a los items
        const $tr = d.querySelectorAll(".item");
        const lisTr = Array.from($tr);

        lisTr.forEach((e) => {
          if (e.classList[5] === "filter") {
            return;
          }
          d.getElementById("table_bodyX").insertAdjacentElement("beforeend", e);
        });

        d.querySelectorAll(".btn-hid").forEach(
          (e) => (e.style.display = "none")
        );
      } else if (localStorage.tabUnit === "true") {
        d.querySelector(".export-modal-body").innerHTML = `
        <section id="thtable" class="thtable">
        <table class="table table-hover table-sm" id="table_xls">
        <thead class="table-dark text-center align-middle">
        <tr style="background-color:black; color:white;">
        <td colspan="" scope="row" style="font-weight: bold;" class="tableDate">${date.toLocaleDateString(
          "es-MX",
          { weekday: "long", year: "numeric", month: "short", day: "numeric" }
        )}</td>  
        </tr>
        <tr style="background-color:black; color:white;">
        <th scope="col">UNIDAD</th>
        <th scope="col">MARCA</th>
        <th scope="col">PLACA</th>
        <th scope="col">AÑO</th>
        <th scope="col">NO. SERIE</th>
        <th scope="col">NO. POLIZA</th>
        <th scope="col">INCISO</th>
        <th scope="col">FECHA ÚLTIMO SERVICIO</th>
        <th scope="col">KM ÚLTIMO SERVICIO</th>
        <th scope="col">KM PRÓXIMO SERVICIO</th>
        <th scope="col">KM ODOMETRO</th>
        <th scope="col">KM PARA SERVICIO</th>
        <th scope="col">MTTO PREVENTIVO</th>
        <th scope="col">CIRCUITO</th>
        <th scope="col">FECHA</th>
        <th scope="col">UBICACION</th> 
        <th scope="col">ESTATUS</th>   
        </tr>
        </thead>
        <tbody id="table_bodyX" class="body_table">
        </tbody>     
        </table>
        </section>
        `;

        //Helper de acceso a los items
        const $tr = d.querySelectorAll(".item");
        const lisTr = Array.from($tr);

        lisTr.forEach((e) => {
          if (e.classList[5] === "filter") {
            return;
          }
          d.getElementById("table_bodyX").insertAdjacentElement("beforeend", e);
        });

        d.querySelectorAll(".btn-hid").forEach(
          (e) => (e.style.display = "none")
        );
      }
    } else if (e.target.matches(".cancelar")) {
      const node = document.getElementById("myModal");
      if (node.parentNode) {
      node.parentNode.removeChild(node);
        }
    } else if (e.target.matches(".fa-bell")) {

      if (localStorage.tabViajes === "true") {
        const db = getDatabase(); let refItem = null;
        refItem = await ref(db, `productivos/${e.target.id}`);

        if(d.getElementById(`${e.target.id}`).dataset.tipo === "MR"){
         refItem = await ref(db, `retornables/${e.target.id}`);
        } 

        //d.querySelector(".hidden").style.display = "block";
         onValue(refItem, (snapshot) => {
          let item = snapshot.val();
          //console.log(item);
          d.querySelector("#root").insertAdjacentHTML("beforeend", 
          `
          <div id="myModal" class="container-fluid font">
        <form class="alert35">
        <table class="tableAlarm">
          
          <thead>
          <tr class="trhead"><th>ALARMA 3.5</th></tr>
         </thead>

          <tbody class="tbody-alarm">          
          <tr>
          <th>Coordinador en turno:</th>
          <td><input id="coordinador" name="coordinador" type="text"  value="${user}"></td>
          </tr>
          <tr>
          <th>Nomenclatura Ruta:</th>
          <td><input id="ruta" name="ruta" type="text"  value="${item.ruta}"></td>
          </tr>
          <tr>
          <th>Load ID:</th>
          <td><input id="load" name="tracking" type="text"  value="${item.tracking}" ></td>
          </tr>
          <tr>
          <th>Fecha/Hora recolección:</th>
          <td><input id="citaprogramada" name="citaprogramada" type="text"  value="${item.citastop1}"></td>
          </tr>
          <tr>
          <th>Carrier SCAC:</th>
          <td><input id="scac" name="scac" type="text"  value="${item.cliente.match("FORD") ? "ILOG" : "IVEY"}"></td>
          </tr>
          <tr>
          <th>Trailer #:</th>
          <td><input id="rem" name="unidad" type="text"  value="${item.caja}" ></td>
          </tr>
          <tr><th>Ubicación actual:</th><td><input id="ubicacion" name="ubicacion" type="text"  value=""></td></tr>
          <tr><th>Razón del retraso:</th><td><input id="razon" name="razon" type="text"  value="" ></td></tr>
          <tr><th>Código - Coordenadas:</th><td><input id="coordenadas" name="coordenadas" type="text"  value="" ></td></tr>
          <tr>
          <th>Recolección Dia/Hora:</th>
          <td><input id="recoleccion" name="recoleccion" type="text"  value="${item.citastop1}" ></td>
          </tr>
          <tr>
          <th>Descarga Dia/Hora:</th>
          <td><input id="descarga" name="descarga" type="text"  value="${item.citastop2}" ></td>
          </tr>
          <tr><th>Nuevo ETA a Destino:</th><td><input id="etadestino" name="etadestino" type="text"  value="" ></td></tr>
          <tr><th>Plan de recuperación:</th><td><input id="planrecuperacion" name="planrecuperacion" type="text"  value="" ></td></tr>
          <tr><th>Distancia (KMS) a Destino:</th><td><input id="distanciakm" name="distanciakm" type="text"  value=""></td></tr>
          <tr>
          <th>Proveedor/Ciudad de origen:</th>
          <td><input id="proveedor" name="proveedor" type="text"  value="${item.stop1}"></td>
          </tr>
          <tr>
          <th>Numero de planta/Nombre:</th>
          <td><input id="cliente" name="cliente" type="text"  value="${item.stop2.slice(0, 19)}"></td>
          </tr>
          <tr><th>DOCK de Descarga:</th><td><input id="descargadock" name="descargadock" type="text"></td></tr>
            <tr id="imageDropArea"><td colspan="2" id="dropArea"></td></tr>
        </tbody>

        <div class="botonesAlert">
        <th><button type="submit" class="gAlarm">Generar Alarma</button></th>
        <th><button type="button" class="gAlarm cancelar">Cancelar</button></th>
        </div>
          
        </table>
        </form>
        </div>         
          `
        );

        },{
          onlyOnce: true
        });
        dropAreaLabel();
      } else return;
    } else if (e.target.matches(".ordenServ") || e.target.matches(".fa-triangle-exclamation")) {
      if (localStorage.tabConveyance === "true") {
        const db = getDatabase(),
          refItem = await ref(db, `subitem1/${e.target.id}`);

        d.querySelector(".hidden").style.display = "block";

        onValue(refItem, (snapshot) => {
          let item = snapshot.val();

          d.querySelector(".modal").style.height = "90vh";
          d.querySelector(".modal").style.margin = "2%";
          d.getElementById("bt-save").innerHTML = `Generar Orden`;
          d.getElementById("formulario").classList.add("ordenS");
          d.getElementById("formulario").classList.remove("register");
          d.getElementById("exampleModalLabel").innerHTML = `Orden de Trabajo`;
          d.querySelector(".modal-body").style.width = "100%";
          d.querySelector(".modal-body").innerHTML = `
          <div class="container-fluid font" style="padding: 1rem 30rem 0rem 30rem;"> 
          <table class="tableAlarm">

          <thead>
          <tr class="trhead" style="font-size: 12px"><th>REPORTE DE CAJA DAÑADA</th><th style="text-align: end;">INTLOGIS MÉXICO</th></tr>
          </thead>
 
          <tbody class="tbody-alarm">          
             
          <tr>
          <th>FOLIO:</th>
          <td><input id="folio" name="folio" type="text"  value=""></td>
          </tr>

          <tr>
          <th>FECHA:</th>
          <td><input id="fecha" name="fecha" type="text"  value="${date.toLocaleDateString(
            "es-MX",
            { weekday: "long", year: "numeric", month: "short", day: "numeric" }
          )}"></td>
          </tr>

          <tr>
          <th>CIRCUITO:</th>
          <td><input id="circuito" name="circuito" type="text"  value="${
            item.circuito
          }"></td>
          </tr>

          <tr>
          <th>REMOLQUE:</th>
          <td><input id="remolque" name="remolque" type="text"  value="${
            item.caja
          }" ></td>
          </tr>

          
          <tr>
          <th>CONTENIDO:</th>
          <td><input id="contenido" name="remolque" type="text"  value="${
            item.comentarios
          }" ></td>
          </tr>

          <tr>
          <th>SERVICIO A EFECTUAR:</th>
          <td><input id="servicio" name="servicio" type="text"  value="" ></td>
          </tr>

          <tr>
          <th>PERSONAL EN TURNO:</th>
          <td><input id="personal" name="personal" type="text"  value="" ></td>
          </tr>
         
          <tr>
          <th>RESPONSABLE.:</th>
          <td><input id="resMtto" name="resmtto" type="text" value="Andres Loperena"></td>
          </tr>

          <tr id="imageDropArea">
          <td colspan="2" id="dropArea">Arrastra y suelta imagen aquí</td>
          </tr>
        
          </tbody>

          </table>
           </div>
           `;
        });
        dropAreaLabel();
      } else if (localStorage.tabUnit === "true") {
        const db = getDatabase(),
          refItem = await ref(db, `subitem/${e.target.id}`);

        d.querySelector(".hidden").style.display = "block";

        onValue(refItem, (snapshot) => {
          let item = snapshot.val();

          d.querySelector(".modal").style.height = "90vh";
          d.querySelector(".modal").style.margin = "2%";
          d.getElementById("bt-save").innerHTML = `Generar Orden`;
          d.getElementById("formulario").classList.add("ordenSU");
          d.getElementById("formulario").classList.remove("register");
          d.getElementById("exampleModalLabel").innerHTML = `Orden de Trabajo`;
          d.querySelector(".modal-body").style.width = "100%";
          d.querySelector(".modal-body").innerHTML = `
          <div class="container-fluid font" style="padding: 1rem 30rem 0rem 30rem;"> 
          <table class="tableAlarm">

          <thead>
          <tr class="trhead"><th>Orden de Trabajo</th><th></th></tr>
          </thead>
 
          <tbody class="tbody-alarm">          
             
          <tr>
          <th>Folio:</th>
          <td><input id="folio" name="folio" type="text"  value=""></td>
          </tr>

          <tr>
          <th>Fecha:</th>
          <td><input id="fecha" name="fecha" type="text"  value="${date.toLocaleDateString(
            "es-MX",
            { weekday: "long", year: "numeric", month: "short", day: "numeric" }
          )}"></td>
          </tr>

          <tr>
          <th>Unidad:</th>
          <td><input id="unidad" name="unidad" type="text"  value="${
            item.unidad
          }"></td>
          </tr>

          <tr>
          <th>Servicio a Efectuar:</th>
          <td><input id="servicio" name="servicio" type="text"  value="" ></td>
          </tr>

          <tr>
          <th>Operador:</th>
          <td><input id="operador" name="operador" type="text"  value="" ></td>
          </tr>
         
          <tr>
          <th>Responsable de Mtto.:</th>
          <td><input id="resMtto" name="resmtto" type="text" value="Andres Loperena"></td>
          </tr>

          <tr id="imageDropArea">
          <td colspan="2" id="dropArea">Arrastra y suelta una imagen aquí</td>
          </tr>
        
          </tbody>

          </table>
           </div>
           `;
        });
        dropAreaLabel();
      } else return;
    } else if (e.target.matches(".tablero")) {
      d.querySelector(".cv").classList.remove("active");
      d.querySelector(".carga").classList.remove("active");
      d.querySelector(".operadores").classList.remove("active");
      window.location.hash = "/tablero/productivo";
    } else if (e.target.matches(".carga")) {
      d.querySelector(".head-ul").innerHTML = `
      <li class="head-li cargam">
      <a class="cargam">Carga Masiva</a>
      </li>
      `;
      d.querySelector(".tablero").classList.remove("active");
      d.querySelector(".operadores").classList.remove("active");
      d.querySelector(".cv").classList.remove("active");
      window.location.hash = "/cargadeviajes/masiva";
    } else if (e.target.matches(".operadores")) {
      d.querySelector(".head-ul").innerHTML = `
      <li class="head-li operadores-li">
      <a class="operadores-li">Lista de Operadores</a>
      </li>
      `;
      d.querySelector(".cv").classList.remove("active");
      d.querySelector(".carga").classList.remove("active");
      d.querySelector(".tablero").classList.remove("active");
      window.location.hash = "/operadores/lista";
    } else if (e.target.matches(".cv")) {
      d.querySelector(".head-ul").innerHTML = `
      <li class="head-li controlv">
      <a class="controlv">Control Vehicular</a>
      </li>
      `;
      d.querySelector(".tablero").classList.remove("active");
      d.querySelector(".carga").classList.remove("active");
      d.querySelector(".operadores").classList.remove("active");
      window.location.hash = "/mantenimiento/unidades";
    } else if (e.target.matches(".productivos")) {
      window.location.hash = "/tablero/productivo";
    } else if (e.target.matches(".retornables")) {
      window.location.hash = "/tablero/retornables";
    } else if (e.target.matches(".historial")) {
      window.location.hash = "/tablero/historial";
    } else if (e.target.matches(".cajas")) {
      window.location.hash = "/mantenimiento/cajas";
    } else if (e.target.matches(".historialCajas")) {
      window.location.hash = "/mantenimiento/hCajas";
    } else if (e.target.matches(".unidades")) {
      window.location.hash = "/mantenimiento/unidades";
    } else if (e.target.matches(".historialUnidades")) {
      window.location.hash = "/mantenimiento/hUnidades";
    } else if (e.target.matches(".remolque")) {
      //  console.log(e.target);

      const tabConv = () => {
        //MODAL
        d.querySelector(".hidden").style.display = "block";
        d.getElementById("formulario").classList.add("register");
        d.getElementById("formulario").classList.remove("edit");
        d.getElementById("exampleModalLabel").innerHTML = `Registrar Remolque`;
        d.getElementById("exampleModalLabel").classList.add("convoy");
        d.getElementById("exampleModalLabel").classList.remove("convoy");
        d.querySelector(".modal-body").innerHTML = `
          <div class="container-fluid"> 
          <table class="table table-sm" >
      <thead class="table-dark text-center">
      <tr class="text-wrap">
      <th scope="col">CAJA</th>
      <th scope="col">TIPO</th>
      <th scope="col">MODELO</th>
      <th scope="col">PLACA</th>
      <th scope="col">AÑO</th>
       <th scope="col">VERIFICACION</th>
       <th scope="col">NO. POLIZA</th>
      <th scope="col">INCISO</th>
      <th scope="col">MARCHAMO</th>
      <th scope="col">CIRCUITO</th>
      <th scope="col">FECHA</th>
      <th scope="col">UBICACION</th> 
      <th scope="col">ESTATUS</th>
  
      </tr>
    </thead>
    <tbody class="text-center text-wrap">
    <td><input name="caja" style="width: 35px;" type="text"></td>
    <td><input name="tipo" style="width: 60px;" type="text"></td>
    <td><input name="modelo" style="width: 130px;" type="text"></td>
    <td><input name="placa" style="width: 70px;" type="text"></td>
    <td><input name="año" style="width: 80px;" type="text"></td>
    <td><input name="verificacion" style="width: 75px;" type="text"></td>
    <td><input name="poliza" style="width: 75px;" type="text"></td>
    <td><input name="inciso" style="width: 95px;" type="text"></td>
    <td><input name="contacto" type="text" style="width: 80px;"></input></td>
    <td><input name="circuito" type="text"></td>
    <td><input name="fecha" type="date"></td>
    <td><input name="ubicacion" type="text"></td>
    <td><input name="comentarios" type="text"></td>  
    </tbody>
      
    </table>
    </div>
          `;
      };

      tabConv();
    } else if (e.target.matches(".unidad")) {
      const tabUnit = () => {
        //MODAL
        d.querySelector(".hidden").style.display = "block";
        d.getElementById("formulario").classList.add("register");
        d.getElementById("formulario").classList.remove("edit");
        d.getElementById("exampleModalLabel").innerHTML = `Registrar Unidad`;
        d.getElementById("exampleModalLabel").classList.add("unit");
        d.getElementById("exampleModalLabel").classList.remove("convoy");
        d.querySelector(".modal-body").innerHTML = `
          <div class="container-fluid"> 
          <table class="table table-sm" >
      <thead class="table-dark text-center">
      <tr class="text-wrap">
      <th scope="col">UNIDAD</th>
      <th scope="col">OPERADOR</th>
      <th scope="col">MODELO</th>
      <th scope="col">PLACA</th>
      <th scope="col">AÑO</th>
       <th scope="col">VERIFICACION</th>
       <th scope="col">NO. POLIZA</th>
      <th scope="col">INCISO</th>
      <th scope="col">CIRCUITO</th>
      <th scope="col">FECHA</th>
      <th scope="col">UBICACION</th> 
      <th scope="col">ESTATUS</th>
  
      </tr>
    </thead>
    <tbody class="text-center text-wrap">
    <td><input name="unidad" style="width: 35px;" type="text"></td>
    <td><input name="operador" style="width: 60px;" type="text"></td>
    <td><input name="modelo" style="width: 130px;" type="text"></td>
    <td><input name="placa" style="width: 70px;" type="text"></td>
    <td><input name="año" style="width: 80px;" type="text"></td>
    <td><input name="verificacion" style="width: 75px;" type="text"></td>
    <td><input name="poliza" style="width: 75px;" type="text"></td>
    <td><input name="inciso" style="width: 95px;" type="text"></td>
    <td><input name="circuito" type="text"></td>
    <td><input name="fecha" type="date"></td>
    <td><input name="ubicacion" type="text"></td>
    <td><input name="comentarios" type="text"></td>  
    </tbody>
      
    </table>
    </div>
          `;
      };

      tabUnit();
    } else if (e.target.matches(".reg")) {
      //  console.log(e.target);
      //MODAL REGISTRO DE VIAJES

      d.querySelector("#root").insertAdjacentHTML("beforeend", 
      `
      <div id="myModal" class="container-fluid font">
    <form class="register">
    <table class="tableAlarm" style="height: 25rem;width: 86%;margin-left: 6%;margin-right: 1%;">
      
      <thead>
      <th class="trhead">VIAJE ADICIONAL</th>
     </thead>

      <tbody class="tbody-alarm" style="display: flex;justify-content: start; align-items: start;gap: 1rem;flex-wrap: wrap;padding: 1rem;">          
      <tr class="tr-item">
      <th>Cliente:</th>
      <td>
      <select name="cliente" id="cliente" style="width: ;width: 200px;background: #bacef4;border-radius: 5px;border: 1px solid #7ca9e3;">
     <option value="FORD">FORD</option>
     <option value="MULTILOG">MULTILOG</option>
     <option value="GM">GM</option>
     <option value="STELLANTIS">STELLANTIS</option>
     <option value="SENDENGO">SENDENGO</option>
     <option value="ACTIVE">ACTIVE</option>
     <option value="BRP">BRP</option>
     <option value="AMAZON">AMAZON</option>
      </td>
      </tr>
      <tr class="tr-item">
      <th>Tracking/Load:</th>
      <td><input id="tracking" name="tracking" type="text"  value=""></td>
      </tr>
      <tr class="tr-item">
      <th>Ruta:</th>
      <td><input id="ruta" name="ruta" type="text"  value=""></td>
      </tr>
      <tr class="tr-item">
      <th>Tipo de material:</th>
      <td>
      <select name="tipo" id="tipo" style="width: ;width: 200px;background: #bacef4;border-radius: 5px;border: 1px solid #7ca9e3;">
       <option value="MP">MP - Material Productivo</option>
       <option value="MR">MR - Material Retornable</option>
      </td>
      </tr>
      <tr class="tr-item">
      <th>Stop 1 (PU - Cliente ó Proveedor):</th>
      <td><input id="stop1" name="stop1" type="text"  value=""></td>
      </tr>
      <tr class="tr-item" >
      <th>Stop 1 - Fecha/Hora de Recolección:</th>
      <td><input id="citastop1" name="citastop1" type="text" style="margin-right: 0.5rem;"  value=""><i class="fa-solid fa-stopwatch"></i></td>
      </tr>

      <tr class="tr-item">
      <th>Stop 2 ((DL/PU) - Cliente ó Proveedor):</th>
      <td><input id="stop2" name="stop2" type="text"  value="" ></td>
      </tr>
      <tr class="tr-item" >
      <th>Sitio 2 - Fecha/Hora de Recolección:</th>
      <td><input id="citastop2" name="citastop2" type="text" style="margin-right: 0.5rem;"  value="" ><i class="fa-solid fa-stopwatch"></i></td>
      </tr>

      <tr class="tr-item">
      <th>Sitio 3 ((DL/PU) - Cliente ó Proveedor):</th>
      <td><input id="stop3" name="stop3" type="text"  value="" ></td>
      </tr>
      <tr class="tr-item" >
      <th>Sitio 3 - Fecha/Hora de Recolección:</th>
      <td><input id="citastop3" name="citastop3" type="text" style="margin-right: 0.5rem;" value="" ><i class="fa-solid fa-stopwatch"></i></td>
      </tr>
      
    </tbody>

    <div class="botonesAlert">
    <th><button type="submit" class="gAlarm">Agregar Viaje</button></th>
    <th><button type="button" class="gAlarm cancelar">Cancelar</button></th>
    </div>
      
    </table>
    </form>
    </div>         
      `
    );


    } else if (e.target.matches(".entregaturno")) {
      //  console.log(e.target);
      //MODAL REGISTRO DE VIAJES
      
      d.querySelector("#root").insertAdjacentHTML("beforeend", 
      `
      <div id="myModal" class="container-fluid font">
    <form class="entregaturno">

    <div class="tableAlarm" style="height: 95vh;width: 96%;display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-around;align-items: center;text-align: center;margin: 1rem;margin-left: 2%;">
      
    <div class="head-report" style="width: 100%;font-family: sans-serif;">
    <h2 class="trhead" style="padding: 0;">RESUMEN DEL DIA</h2>
    <h5>${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}</h5>
    </div>
    

    <div style="width: 49%;height: 80vh;background: #5b729f99;border-radius: 10px;overflow: hidden;">

      <div style="background-color: #021e44;color: white;"><span>Material productivo</span></div>

      <table id="tabmp" style="width: 100%;">
      <thead class="table-dark" style="background: black;color: white;">
      <tr style="display: flex;font-size: 12px;text-align: center;justify-content: space-around;">
      <th scope="col" style="width: 7%;">UNIDAD</th>
      <th scope="col" style="width: 7%;">CAJA</th>
      <th scope="col" style="width: 15%;">OPERADOR</th>
      <th scope="col" style="width: 10%;">CLIENTE</th>
      <th scope="col" style="width: 10%;">RUTA</th>
      <th scope="col" style="width: 10%;">LLEGADA</th>
      <th scope="col" style="width: 15%;">ESTATUS</th>
      <th scope="col" style="width: 25%;">COMENTARIOS</th>
      </tr>
      </thead>
 
      <tbody id="tabmpBody" style="display: flex;width: 100%;font-size: 10px;flex-direction: column;overflow: scroll;height: 75vh;gap: 3px;">
      </tbody>
    
  </table>
    </div>

    <div style="width: 49%;height: 80vh;background: #5b729f99;border-radius: 10px;overflow: hidden;">
    
      <div style="background-color: #021e44;color: white;"><span>Material retornable</span></div>

        <table id="tabmr" style="width: 100%;">
        <thead class="table-dark" style="background: black;color: white;">
        <tr style="display: flex;font-size: 12px;text-align: center;justify-content: space-around;">
        <th scope="col" style="width: 7%;">UNIDAD</th>
        <th scope="col" style="width: 7%;">CAJA</th>
        <th scope="col" style="width: 15%;">OPERADOR</th>
        <th scope="col" style="width: 10%;">CLIENTE</th>
        <th scope="col" style="width: 10%;">RUTA</th>
        <th scope="col" style="width: 10%;">LLEGADA</th>
        <th scope="col" style="width: 15%;">ESTATUS</th>
        <th scope="col" style="width: 25%;">COMENTARIOS</th>
         </tr>
        </thead>
 
        <tbody id="tabmrBody" style="display: flex;width: 100%;font-size: 10px;flex-direction: column;overflow: scroll;height: 75vh;gap: 3px;">
        </tbody>
    
        </table>
     </div>
    
      <div class="botonesAlert" style="width: 100%;">
          <th><button type="button" class="gAlarm cancelar">Cancelar</button></th>
      </div>

     </div>
     </form>
 </div>         
      `
    );

    mProductivo();
    mRetornable();

       

    } else if (e.target.matches(".generar_xls")) {
      //let $dataTable = d.getElementById("table_xls");
      generar_xls("table_xls", "Reporte");
    } else if (e.target.matches(".delete") || e.target.matches(".fa-trash")) {
      if (localStorage.tabViajes === "true") {
        let keyDelete = `/items/${e.target.id}`,
          isConfirm = confirm("¿Eliminar Registro?");

        if (isConfirm) {
          await remove(ref(db, keyDelete))
            .then(() => {
              const refItems = ref(db, "items");
              onValue(refItems, (snapshot) => {
                let res = snapshot.val();
                renderTableHistory(res);
                keyDelete = ``;
              });
            })
            .catch((error) => {
              console.error("Error al intentar eliminar:", error);
            });
        }
      } else if (localStorage.tabConveyance === "true") {
        let keyDelete = `/subitem1/${e.target.id}`,
          isConfirm = confirm("¿Eliminar Registro?");

        if (isConfirm) {
          await remove(ref(db, `/subitem1/${e.target.id}`))
            .then(() => {
              const refItems = ref(db, keyDelete);
              onValue(refItems, (snapshot) => {
                let res = snapshot.val();
                renderTableCV(res);
                keyDelete = ``;
              });
            })
            .catch((error) => {
              console.error("Error al intentar eliminar:", error);
            });
        }
      } else if (localStorage.tabUnit === "true") {
        let keyDelete = `/subitem/${e.target.id}`,
          isConfirm = confirm("¿Eliminar Registro?");

        if (isConfirm) {
          await remove(ref(db, keyDelete))
            .then(() => {
              const refItems = ref(db, keyDelete);
              onValue(refItems, (snapshot) => {
                let res = snapshot.val();
                renderTableCV(res);
                keyDelete = ``;
              });
            })
            .catch((error) => {
              console.error("Error al intentar eliminar:", error);
            });
        }
      }
    } else if (e.target.matches(".fa-stopwatch")){
      let fukm = e.target.parentElement.classList[1];
      let date = new Date();

      if(fukm.includes("fechaukm")){
        e.target.previousElementSibling.value = `${getFormattedDate()}`;
      } else if(!fukm.includes("fechaukm")){
        if(e.target.previousElementSibling){
          e.target.previousElementSibling.value = `${getFormattedDate()} ${date.toLocaleString().slice(11, 16)}`;
        }
      }
     
    
    } else if (e.target.matches(".logout")) {
      let isConfirm = confirm("¿Desea Cerrar Sesión?");

      if (isConfirm) {
        localStorage.clear();
        location.reload();
      }
    }
    return;
  });
  d.addEventListener("submit", async (e) => {
    e.preventDefault();
     //console.log(e.target);

    if (e.target.matches(".search-form") && localStorage.tabViajes === "true") {
      //console.log(e.target);
      let html = null;
      

    //  console.log(query);

      let item = d.querySelectorAll(".item");
      let query = localStorage.getItem("apiSearch").toUpperCase();
      item.forEach((e) => {
        if (!query) {
          e.classList.remove("filter");
          return false;
        } else if (
          e.dataset.unit.includes(query) ||
          e.dataset.box.includes(query) ||
          e.dataset.operador.includes(query) ||
          e.dataset.cporte.includes(query) ||
          e.dataset.track.includes(query) ||
          e.dataset.ruta.includes(query) ||
          e.dataset.cliente.includes(query) ||
          e.dataset.proveedor.includes(query) ||
          e.dataset.citastop1.includes(query) ||
          e.dataset.status.includes(query)
        ) {
          e.classList.remove("filter");
         // console.log(e);
        } else {
          e.classList.add("filter");
         
        }
      });

      if (localStorage.tabViajes === "true") {
        let items = d.querySelectorAll(".item");
        d.getElementById("table_body").innerHTML ="";
        items.forEach(item => {
          d.getElementById("table_body").insertAdjacentElement("beforeend", item);
        });      
      }
    } else if (e.target.matches(".search-form") && localStorage.tabConveyance === "true") {
      //   console.log(e.target);
      let query = localStorage.getItem("apiSearch").toUpperCase();

      //  console.log(query);

      let item = d.querySelectorAll(".item");
      item.forEach((e) => {
        //  console.log(e.dataset.unit, e.dataset.box, e.dataset.track);
        if (!query) {
          e.classList.remove("filter");
          return false;
        } else if (
          e.dataset.conv.includes(query) ||
          e.dataset.circuito.includes(query) ||
          e.dataset.ubicacion.includes(query)
        ) {
          e.classList.remove("filter");
        } else {
          e.classList.add("filter");
        }
      });
    } else if (e.target.matches(".search-form") && localStorage.tabUnit === "true") {
      // console.log(e.target);
      let query = localStorage.getItem("apiSearch").toUpperCase();

      //console.log(query);

      let item = d.querySelectorAll(".item");
      item.forEach((e) => {
        //  console.log(e.dataset.unit, e.dataset.box, e.dataset.track);
        if (!query) {
          e.classList.remove("filter");
          return false;
        } else if (
          e.dataset.unit.includes(query) ||
          e.dataset.circuito.includes(query) ||
          e.dataset.ubicacion.includes(query)
        ) {
          e.classList.remove("filter");
        } else {
          e.classList.add("filter");
        }
      });
    } else if (e.target.matches(".register")) {
      let body = {}, reg = {};
      //Create Register
      if (localStorage.tabViajes == "true") {
        if (!e.target.id.value) {
  
          if(e.target.stop3.value){
             body = {
              unidad: "",
              caja: "",
              cporte: "",
              tracking: e.target.tracking.value.toUpperCase(),
              bol: "",
              ruta: e.target.ruta.value.toUpperCase(),
              operador: "",
              cliente: e.target.cliente.value.toUpperCase(),
              stop1: e.target.stop1.value.toUpperCase(),
              citastop1: e.target.citastop1.value.toUpperCase(),
              stop2: e.target.stop2.value.toUpperCase(),
              citastop2: e.target.citastop2.value.toUpperCase(),
              stop3: e.target.stop3.value.toUpperCase(),
              citastop3: e.target.citastop3.value.toUpperCase(),
              llegadareal1: "--/--/--  --:--",
              salidareal1: "--/--/--  --:--",
              llegadareal2: "--/--/--  --:--",
              salidareal2: "--/--/--  --:--",
              eta: "--/--/--  --:--",
              llegadareal3: "--/--/--  --:--",
              salidareal3: "--/--/--  --:--",
              eta2: "--/--/--  --:--",
              estatusllegada: "A TIEMPO",
              status: "PENDIENTE",
              comentarios: "",
              tipo: e.target.tipo.value.toUpperCase()
            },
            reg = {
             date: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
             user: user,
             body: body
           };
          }else{
             body = {
              unidad: "",
              caja: "",
              cporte: "",
              tracking: e.target.tracking.value.toUpperCase(),
              bol: "",
              ruta: e.target.ruta.value.toUpperCase(),
              operador: "",
              cliente: e.target.cliente.value.toUpperCase(),
              stop1: e.target.stop1.value.toUpperCase(),
              citastop1: e.target.citastop1.value.toUpperCase(),
              stop2: e.target.stop2.value.toUpperCase(),
              citastop2: e.target.citastop2.value.toUpperCase(),
              llegadareal1: "--/--/--  --:--",
              salidareal1: "--/--/--  --:--",
              llegadareal2: "--/--/--  --:--",
              salidareal2: "--/--/--  --:--",
              eta: "--/--/--  --:--",
              estatusllegada: "A TIEMPO",
              status: "PENDIENTE",
              comentarios: "",
              tipo: e.target.tipo.value.toUpperCase()
            },
            reg = {
             date: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
             user: user,
             body: body
           };
          }
          

          if(body.tipo === "MP") {
           await push(ref(db, "productivos"), body);
           await push(ref(db, "registros"), reg);

          const node = document.getElementById("myModal");
           if (node.parentNode) {
            node.parentNode.removeChild(node);
         }
           } else if(body.tipo === "MR"){
            await push(ref(db, "retornables"), body);
            await push(ref(db, "registros"), reg);

           const node = document.getElementById("myModal");
            if (node.parentNode) {
              node.parentNode.removeChild(node);
              }
          }
         
        }

      }

      if (localStorage.tabUnit == "true") {
        if (!e.target.id.value) {
          let body = {
            verificacion: e.target.verificacion.value.toUpperCase(),
            poliza: e.target.poliza.value.toUpperCase(),
            inciso: e.target.inciso.value.toUpperCase(),
            placa: e.target.placa.value.toUpperCase(),
            operador: e.target.operador.value.toUpperCase(),
            modelo: e.target.modelo.value.toUpperCase(),
            año: e.target.año.value.toUpperCase(),
            unidad: e.target.unidad.value.toUpperCase(),
            contacto: "1",
            uservicio: "1",
            linker: "1",
            circuito: e.target.circuito.value.toUpperCase(),
            fecha: e.target.fecha.value.toUpperCase(),
            ubicacion: e.target.ubicacion.value.toUpperCase(),
            comentarios: e.target.comentarios.value.toUpperCase(),
          };
          await push(ref(db, "subitem"), body);
          
          /* await ajax({
        url: `${api.ITEMS}.json`,
        options,
        cbSuccess: (res) => {
          json = res.json();
        },
       });*/
        }
      }
      
      if (localStorage.tabConveyance === "true") {
        if (!e.target.id.value) {
          let body = {
            tipo: e.target.tipo.value.toUpperCase(),
            poliza: e.target.poliza.value.toUpperCase(),
            placa: e.target.placa.value.toUpperCase(),
            inciso: e.target.inciso.value.toUpperCase(),
            modelo: e.target.modelo.value.toUpperCase(),
            año: e.target.año.value.toUpperCase(),
            caja: e.target.caja.value.toUpperCase(),
            contacto: e.target.contacto.value.toUpperCase(),
            circuito: e.target.circuito.value.toUpperCase(),
            fecha: e.target.fecha.value.toUpperCase(),
            ubicacion: e.target.ubicacion.value.toUpperCase(),
            verificacion: e.target.verificacion.value.toUpperCase(),
            comentarios: e.target.comentarios.value.toUpperCase(),
            reporte: "SIN REPORTE",
          };
          await push(ref(db, "subitem1"), body);
        }
      }

      // console.log(e.target);
    } else if (e.target.matches(".alert35")) {
     console.log(e.target);
      const dataAlert = {
        $ruta: document.getElementById("ruta").value.toUpperCase(),
        $load: document.getElementById("load").value.toUpperCase(),
        $citaprogramada: document.getElementById("citaprogramada").value,
        $scac: document.getElementById("scac").value.toUpperCase(),
        $rem: document.getElementById("rem").value,
        $ubicacion: document.getElementById("ubicacion").value.toUpperCase(),
        $razon: document.getElementById("razon").value.toUpperCase(),
        $coordenadas: document.getElementById("coordenadas").value,
        $recoleccion: document.getElementById("recoleccion").value,
        $descarga: document.getElementById("descarga").value,
        $etadestino: document.getElementById("etadestino").value,
        $planrecuperacion: document.getElementById("planrecuperacion").value.toUpperCase(),
        $distanciakm: document.getElementById("distanciakm").value,
        $proveedor: document.getElementById("proveedor").value.toUpperCase(),
        $cliente: document.getElementById("cliente").value.toUpperCase(),
        $descargadock: document.getElementById("descargadock").value.toUpperCase(),
        $coordinador: document.getElementById("coordinador").value.toUpperCase(),
      };

     await generatePDF(
        dataAlert,
        "/app/assets/Alert35.jpg",
        date.toLocaleDateString("es-MX", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
      const node = document.getElementById("myModal");
      if (node.parentNode) {
      node.parentNode.removeChild(node);
        }
    } else if (e.target.matches(".ordenS")) {
      // console.log(e.target);
      // Obtener los valores de los campos de entrada
      const folio = d.getElementById("folio").value;
      const fecha = d.getElementById("fecha").value;
      const remolque = d.getElementById("remolque").value;
      const servicio = d.getElementById("servicio").value;
      const personal = d.getElementById("personal").value;
      const resMtto = d.getElementById("resMtto").value;
      const circuito = d.getElementById("circuito").value;
      const contenido = d.getElementById("contenido").value;
      const coordinador = d.getElementById("coordinador").value;

      // Definir los datos de la tabla
      const data = [
        [`REMOLQUE: ${remolque}`, `CIRCUITO:`, `${circuito}`],
        [`CONTENIDO:`, `${contenido}`, ""],
        [`PERSONAL EN TURNO: ${personal}`, `MANTENIMIENTO: ${resMtto}`],
        [`SERVICIO A REALIZAR: ${servicio}`],
      ];

      const margen = 10; // Ajusta el margen según sea necesario
      const grosorBorde = 1;

      // Agregar el margen al PDF
      const pdfWidth = 210; // Ancho del PDF
      const pdfHeight = 297; // Alto del PDF
      const contenidoWidth = pdfWidth - margen * 2; // Ancho del área de contenido dentro del margen
      const contenidoHeight = pdfHeight - margen * 2; // Alto del área de contenido dentro del margen
      const pdf = new jsPDF();

      // Agregar el título sobre la tabla
      const tituloX = margen + 50; // Ajusta la posición X del título según sea necesario
      const tituloY = margen + 10; // Ajusta la posición Y del título según sea necesario
      const titulo = "REPORTE DE CAJA DAÑADA"; // Establece el texto del título según sea necesario
      pdf.text(titulo, tituloX, tituloY);
      // Agregar la tabla al PDF con margen
      pdf.autoTable({
        head: [["INTLOGIS MÉXICO", `${fecha}`, `FOLIO: ${folio}`]],
        body: data,
        startY: margen + 15, // Comenzar la tabla desde el margen superior
        margin: { top: margen }, // Establecer el margen superior de la tabla
        styles: {
          lineColor: [10, 10, 10], // Color de las líneas (RGB)
          lineWidth: 0.25, // Ancho de las líneas
        },
        headStyles: {
          lineWidth: 0, // Eliminar el borde del encabezado
          lineColor: [255, 255, 255], // Establecer el color de borde del encabezado como blanco para ocultarlo
          fontColor: [0, 0, 0], // Establecer el color de fuente del encabezado
        },
        didDrawPage: function (data) {
          // console.log(dropArea);
          // Agregar la primera imagen al PDF si está presente
          if (dropArea.childNodes[1] instanceof HTMLImageElement) {
            const imgData = dropArea.childNodes[1].src;
            const imgX = margen + 5; // Comenzar la imagen desde el margen izquierdo
            const imgY = data.cursor.y + margen; // Posicionar la imagen debajo de la tabla con un margen
            const imgWidth = 90; // Ancho de la imagen dentro del margen
            const imgHeight = 70; // Alto de la imagen dentro del margen

            // Agregar la primera imagen
            pdf.addImage(imgData, "JPEG", imgX, imgY, imgWidth, imgHeight);
          }

          // Agregar la segunda imagen al PDF si está presente
          if (dropArea.childNodes[2] instanceof HTMLImageElement) {
            const segundaImgData = dropArea.childNodes[2].src;
            const segundaImgX = margen + 95; // Comenzar la segunda imagen desde el margen izquierdo
            const segundaImgY = data.cursor.y + margen; // Posicionar la segunda imagen debajo de la primera con un margen
            const segundaImgWidth = 90; // Ancho de la segunda imagen dentro del margen
            const segundaImgHeight = 70; // Alto de la segunda imagen dentro del margen

            // Agregar la segunda imagen
            pdf.addImage(
              segundaImgData,
              "JPEG",
              segundaImgX,
              segundaImgY,
              segundaImgWidth,
              segundaImgHeight
            );
          }

          // Dibujar el borde alrededor del área de contenido con margen
          pdf.setLineWidth(grosorBorde);
          pdf.rect(margen, margen, contenidoWidth, contenidoHeight, "stroke");
        },
      });

      // Guardar el PDF
      pdf.save("Orden_de_Trabajo.pdf");
    } else if (e.target.matches(".ordenSU")) {
      // console.log(e.target);
      // Obtener los valores de los campos de entrada
      const folio = d.getElementById("folio").value;
      const fecha = d.getElementById("fecha").value;
      const unidad = d.getElementById("unidad").value;
      const servicio = d.getElementById("servicio").value;
      const operador = d.getElementById("operador").value;
      const resMtto = d.getElementById("resMtto").value;

      // Definir los datos de la tabla
      const data = [
        ["Folio:", folio],
        ["Fecha:", fecha],
        ["Unidad:", unidad],
        ["Servicio a Efectuar:", servicio],
        ["Operador:", operador],
        ["Responsable de Mtto.:", resMtto],
      ];

      const margen = 10; // Ajusta el margen según sea necesario
      const grosorBorde = 2;

      // Agregar el margen al PDF
      const pdfWidth = 210; // Ancho del PDF
      const pdfHeight = 297; // Alto del PDF
      const contenidoWidth = pdfWidth - margen * 2; // Ancho del área de contenido dentro del margen
      const contenidoHeight = pdfHeight - margen * 2; // Alto del área de contenido dentro del margen
      const pdf = new jsPDF();
      // Agregar la tabla al PDF con margen
      pdf.autoTable({
        head: [["ORDEN DE TRABAJO", ``, "INTLOGIS MÉXICO"]],
        body: data,
        startY: margen + 5, // Comenzar la tabla desde el margen superior
        margin: { top: margen }, // Establecer el margen superior de la tabla
        styles: {
          lineColor: [0, 0, 0], // Color de las líneas (RGB)
          lineWidth: 0.25, // Ancho de las líneas
        },
        headStyles: {
          lineWidth: 0, // Eliminar el borde del encabezado
          lineColor: [255, 255, 255], // Establecer el color de borde del encabezado como blanco para ocultarlo
          fontColor: [0, 0, 0], // Establecer el color de fuente del encabezado
        },
        didDrawPage: function (data) {
          // console.log(dropArea);
          // Agregar la primera imagen al PDF si está presente
          if (dropArea.childNodes[1] instanceof HTMLImageElement) {
            const imgData = dropArea.childNodes[1].src;
            const imgX = margen + 5; // Comenzar la imagen desde el margen izquierdo
            const imgY = data.cursor.y + margen; // Posicionar la imagen debajo de la tabla con un margen
            const imgWidth = 90; // Ancho de la imagen dentro del margen
            const imgHeight = 70; // Alto de la imagen dentro del margen

            // Agregar la primera imagen
            pdf.addImage(imgData, "JPEG", imgX, imgY, imgWidth, imgHeight);
          }

          // Agregar la segunda imagen al PDF si está presente
          if (dropArea.childNodes[2] instanceof HTMLImageElement) {
            const segundaImgData = dropArea.childNodes[2].src;
            const segundaImgX = margen + 95; // Comenzar la segunda imagen desde el margen izquierdo
            const segundaImgY = data.cursor.y + margen; // Posicionar la segunda imagen debajo de la primera con un margen
            const segundaImgWidth = 90; // Ancho de la segunda imagen dentro del margen
            const segundaImgHeight = 70; // Alto de la segunda imagen dentro del margen

            // Agregar la segunda imagen
            pdf.addImage(
              segundaImgData,
              "JPEG",
              segundaImgX,
              segundaImgY,
              segundaImgWidth,
              segundaImgHeight
            );
          }

          // Dibujar el borde alrededor del área de contenido con margen
          pdf.setLineWidth(grosorBorde);
          pdf.rect(margen, margen, contenidoWidth, contenidoHeight, "stroke");
        },
      });

      // Guardar el PDF
      pdf.save("Orden_de_Trabajo.pdf");
      //generar datos a la BD para el seguimiento a los servicion por medio de mantenimiento
    } else if (e.target.matches(".edit-tr")) {
      if (localStorage.tabViajes === "true") {
        if (e.target.dataset.value) {
          let keyValue = e.target.dataset.value;
          const db = getDatabase();
          const dateConvert = (date) => {
            let hora = date.slice(11, 17),
              arrF = date.slice(0, 10).split("-"),
              concatF = "";

            return concatF.concat(
              arrF[2],
              "/",
              arrF[1],
              "/",
              arrF[0],
              " ",
              hora
            );
          };

          let body = {
            unidad: e.target.unidad.value.toUpperCase(),
            caja: e.target.caja.value.toUpperCase(),
            cporte: e.target.cporte.value.toUpperCase(),
            tracking: e.target.tracking.value.toUpperCase(),
            bol: e.target.bol.value.toUpperCase(),
            ruta: e.target.ruta.value.toUpperCase(),
            operador: e.target.operador.value.toUpperCase(),
            cliente: e.target.cliente.value.toUpperCase(),
            proveedor: e.target.proveedor.value.toUpperCase(),
            citaprogramada: e.target.llegadaprogramada.value,
            llegadareal: dateConvert(e.target.llegadareal.value),
            salidareal: dateConvert(e.target.salidareal.value),
            eta: dateConvert(e.target.eta.value),
            llegadadestino: dateConvert(e.target.llegadadestino.value),
            salidadestino: dateConvert(e.target.salidadestino.value),
            llegada: e.target.llegada.value.toUpperCase(),
            status: e.target.status.value.toUpperCase(),
            comentarios: e.target.comentarios.value.toUpperCase(),
          };

          if (
            body.status === "COMPLETO" ||
            body.status === "EXPEDITADO COMPLETO"
          ) {
            if (!body.bol || !body.cporte) {
              alert("Ingresar BOL / CPORTE");
              return;
            } else update(ref(db), { ["/items/" + keyValue]: body });
          }
          update(ref(db), { ["/items/" + keyValue]: body });
          modal.style.display = "none";
        }
      } else if (localStorage.tabConveyance === "true") {
        if (e.target.dataset.value) {
          let keyValue = e.target.dataset.value;
          const db = getDatabase();
          let body = {
            tipo: e.target.tipo.value.toUpperCase(),
            poliza: e.target.poliza.value.toUpperCase(),
            placa: e.target.placa.value.toUpperCase(),
            inciso: e.target.inciso.value.toUpperCase(),
            modelo: e.target.modelo.value.toUpperCase(),
            año: e.target.año.value.toUpperCase(),
            caja: e.target.caja.value.toUpperCase(),
            contacto: e.target.contacto.value.toUpperCase(),
            circuito: e.target.circuito.value.toUpperCase(),
            fecha: e.target.fecha.value.toUpperCase(),
            ubicacion: e.target.ubicacion.value.toUpperCase(),
            verificacion: e.target.verificacion.value.toUpperCase(),
            comentarios: e.target.comentarios.value.toUpperCase(),
            reporte: e.target.reporte.value.toUpperCase(),
          };

          update(ref(db), { ["/subitem1/" + keyValue]: body });
        }
        modal.style.display = "none";
      } else if (localStorage.tabUnit == "true") {
        if (e.target.dataset.value) {
          let keyValue = e.target.dataset.value;

          let body = {
            verificacion: e.target.verificacion.value.toUpperCase(),
            poliza: e.target.poliza.value.toUpperCase(),
            inciso: e.target.inciso.value.toUpperCase(),
            placa: e.target.placa.value.toUpperCase(),
            operador: e.target.operador.value.toUpperCase(),
            modelo: e.target.modelo.value.toUpperCase(),
            año: e.target.año.value.toUpperCase(),
            unidad: e.target.unidad.value.toUpperCase(),
            contacto: e.target.contacto.value.toUpperCase(),
            uservicio: e.target.uservicio.value.toUpperCase(),
            linker: e.target.linker.value.toUpperCase(),
            circuito: e.target.circuito.value.toUpperCase(),
            fecha: e.target.fecha.value.toUpperCase(),
            ubicacion: e.target.ubicacion.value.toUpperCase(),
            comentarios: e.target.comentarios.value.toUpperCase(),
          };

          update(ref(db), { ["/subitem/" + keyValue]: body });
          modal.style.display = "none";
        }
      }
    }
  });

  d.addEventListener("keyup", (e) => {
    //  console.log(d.getElementById("ruta"));
    //limpiar busqueda
    let query = localStorage.getItem("apiSearch");
    if (e.key === "Escape") localStorage.removeItem("apiSearch");
    let item = d.querySelectorAll(".item");
    item.forEach((e) => {
      if (!query) {
        e.classList.remove("filter");
        return false;
      }
    });
  });

  const disabledInputs = (e)=>{
    d.querySelector(`#${e.target.id} #cporte-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #bol-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #operador-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #inputUnidad-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #inputCaja-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #status-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #estatusllegada-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #inputComentarios-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #inputLlegadaPU-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #inputSalidaPU-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #inputEta-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #inputLlegadaDL-${e.target.id}`).disabled = false;
        d.querySelector(`#${e.target.id} #inputSalidaDL-${e.target.id}`).disabled = false;
  }
  const enableInputs = (e) => {
    d.querySelector(`#${e.target.id} #cporte-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #bol-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #operador-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #inputUnidad-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #inputCaja-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #status-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #estatusllegada-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #inputComentarios-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #inputLlegadaPU-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #inputSalidaPU-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #inputEta-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #inputLlegadaDL-${e.target.id}`).disabled = true;
        d.querySelector(`#${e.target.id} #inputSalidaDL-${e.target.id}`).disabled = true;
  }

  d.addEventListener("dblclick", async (e) => {

    if (e.target.matches(".unit")){
      if (localStorage.tabUnit === "true") {
        d.getElementById(`${e.target.id}`).classList.toggle("active-select");
        d.getElementById(`${e.target.id}`).classList.toggle("active-unit");
        d.getElementById(`clockF-${e.target.id}`).classList.toggle("none");
        d.getElementById(`clockI-${e.target.id}`).classList.toggle("none");
        let itemDB = null, bodyUpdate = {}, refItem = null;

        if(d.querySelector(`#${e.target.id} #inputFechaUS-${e.target.id}`).disabled){
          d.querySelector(`#${e.target.id} #inputFechaUS-${e.target.id}`).disabled = false;
          d.querySelector(`#${e.target.id} #inputUS-${e.target.id}`).disabled = false;
          d.querySelector(`#${e.target.id} #inputKMA-${e.target.id}`).disabled = false;
          d.querySelector(`#${e.target.id} #inputFechaInv-${e.target.id}`).disabled = false;
          d.querySelector(`#${e.target.id} #inputCTO-${e.target.id}`).disabled = false;
          d.querySelector(`#${e.target.id} #inputUBI-${e.target.id}`).disabled = false;
          d.querySelector(`#${e.target.id} #inputEDO-${e.target.id}`).disabled = false;
        } else {
          d.querySelector(`#${e.target.id} #inputFechaUS-${e.target.id}`).disabled = true;
          d.querySelector(`#${e.target.id} #inputUS-${e.target.id}`).disabled = true;
          d.querySelector(`#${e.target.id} #inputKMA-${e.target.id}`).disabled = true;
          d.querySelector(`#${e.target.id} #inputFechaInv-${e.target.id}`).disabled = true;
          d.querySelector(`#${e.target.id} #inputCTO-${e.target.id}`).disabled = true;
          d.querySelector(`#${e.target.id} #inputUBI-${e.target.id}`).disabled = true;
          d.querySelector(`#${e.target.id} #inputEDO-${e.target.id}`).disabled = true;
        }

      }



      
    } else if (e.target.matches(".item")) {
    d.getElementById(`${e.target.id}`).classList.toggle("active-select");
    sugerencias(e.target.id)
    let itemDB = null, bodyUpdate = {}, refItem = null;
       
    if (localStorage.tabViajes === "true") {
      
      const db = getDatabase();
       
      if(d.getElementById(`${e.target.id}`).dataset.status === "COMPLETO" || d.getElementById(`${e.target.id}`).dataset.status === "CANCELADO" || d.getElementById(`${e.target.id}`).dataset.status === "DRY RUN" || d.getElementById(`${e.target.id}`).dataset.status === "TONU"){
        refItem = ref(db, `historialviajes/${e.target.id}`);
        onValue(refItem, (snapshot) => {
          itemDB = snapshot.val();
        },{
          onlyOnce: true
        });
      }  else{
        if(d.getElementById(`${e.target.id}`).dataset.tipo === "MR"){
          refItem = ref(db, `retornables/${e.target.id}`);
          onValue(refItem, (snapshot) => {
            itemDB = snapshot.val();
          },{
            onlyOnce: true
          });
  
        } else if(d.getElementById(`${e.target.id}`).dataset.tipo === "MP") {
          refItem = ref(db, `productivos/${e.target.id}`);
          onValue(refItem, (snapshot) => {
            itemDB = snapshot.val();
          },{
            onlyOnce: true
          });
  
        }
      }
      
     
       // console.log(item);   
        
        if(d.querySelector(`#${e.target.id} #cporte-${e.target.id}`).disabled){
          disabledInputs(e);        
          if(d.querySelector(`#${e.target.id} #inputLlegadaPU2-${e.target.id}`)){
            d.querySelector(`#${e.target.id} #inputLlegadaPU2-${e.target.id}`).disabled = false;
            d.querySelector(`#${e.target.id} #inputSalidaPU2-${e.target.id}`).disabled = false;
            d.querySelector(`#${e.target.id} #inputEta2-${e.target.id}`).disabled = false;
          }
        } else {
          enableInputs(e); 
          if(d.querySelector(`#${e.target.id} #inputLlegadaPU2-${e.target.id}`)){
            d.querySelector(`#${e.target.id} #inputLlegadaPU2-${e.target.id}`).disabled = true;
            d.querySelector(`#${e.target.id} #inputSalidaPU2-${e.target.id}`).disabled = true;
            d.querySelector(`#${e.target.id} #inputEta2-${e.target.id}`).disabled = true;
          }
        }

        if(e.target.dataset.itemlength < 25){
            d.getElementById(`${e.target.id}`).classList.toggle("active-item2");

             bodyUpdate = {
              cporte : d.getElementById(`cporte-${e.target.id}`).value.toUpperCase(),
              bol: d.getElementById(`bol-${e.target.id}`).value.toUpperCase(),
              operador: d.getElementById(`operador-${e.target.id}`).value.toUpperCase(),
              inputUnidad: d.getElementById(`inputUnidad-${e.target.id}`).value.toUpperCase(),
              inputCaja: d.getElementById(`inputCaja-${e.target.id}`).value.toUpperCase(),
              status: d.getElementById(`status-${e.target.id}`).value.toUpperCase(),
              statusLlegada: d.getElementById(`estatusllegada-${e.target.id}`).value.toUpperCase(),
              inputComentarios: d.getElementById(`inputComentarios-${e.target.id}`).value.toUpperCase(),
              inputLlegadaPU: d.getElementById(`inputLlegadaPU-${e.target.id}`).value.toUpperCase(),
              inputSalidaPU: d.getElementById(`inputSalidaPU-${e.target.id}`).value.toUpperCase(),
              inputEta: d.getElementById(`inputEta-${e.target.id}`).value.toUpperCase(),
              inputLlegadaDL: d.getElementById(`inputLlegadaDL-${e.target.id}`).value.toUpperCase(),
              inputSalidaDL: d.getElementById(`inputSalidaDL-${e.target.id}`).value.toUpperCase(),
            };

            

            if(itemDB.cporte !== bodyUpdate.cporte ||
              itemDB.bol !== bodyUpdate.bol ||
              itemDB.operador !== bodyUpdate.operador ||
              itemDB.unidad !== bodyUpdate.inputUnidad ||
              itemDB.caja !== bodyUpdate.inputCaja ||
              itemDB.status !== bodyUpdate.status ||
              itemDB.estatusllegada !== bodyUpdate.statusLlegada ||
              itemDB.llegadareal1 !== bodyUpdate.inputLlegadaPU ||
              itemDB.salidareal1 !== bodyUpdate.inputSalidaPU ||
              itemDB.eta !== bodyUpdate.inputEta ||
              itemDB.llegadareal2 !== bodyUpdate.inputLlegadaDL ||
              itemDB.salidareal2 !== bodyUpdate.inputSalidaDL ||
              itemDB.comentarios !== bodyUpdate.inputComentarios
            ){
           
              let body = {
                unidad: bodyUpdate.inputUnidad,
                caja: bodyUpdate.inputCaja,
                cporte: bodyUpdate.cporte,
                tracking: itemDB.tracking,
                cliente: itemDB.cliente,
                bol: bodyUpdate.bol,
                ruta:itemDB.ruta,
                operador: bodyUpdate.operador,
                stop1: itemDB.stop1,
                citastop1: itemDB.citastop1,
                llegadareal1: bodyUpdate.inputLlegadaPU,
                salidareal1: bodyUpdate.inputSalidaPU,
                eta: bodyUpdate.inputEta,
                stop2: itemDB.stop2,
                citastop2: itemDB.citastop2,
                llegadareal2: bodyUpdate.inputLlegadaDL,
                salidareal2: bodyUpdate.inputSalidaDL,
                estatusllegada: bodyUpdate.statusLlegada,
                status: bodyUpdate.status,
                estatusllegada: bodyUpdate.statusLlegada,
                comentarios: bodyUpdate.inputComentarios,
                tipo: itemDB.tipo,
                
             },
             reg = {
              date: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
              user: user,
              body: body
            };

            if(bodyUpdate.status === "CANCELADO" || bodyUpdate.status === "DRY RUN" || bodyUpdate.status === "TONU"){
              console.log(bodyUpdate.status, e.target.id, body);

              if(localStorage.histrack === "false"){
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MP"){
                  let keyDelete = `/productivos/${e.target.id}`, $trstatus = d.querySelector(`#${e.target.id} #status-${e.target.id}`);
                             
                    let isConfirm = confirm("Cancelar Viaje?");
                    if (isConfirm) {
                      d.getElementById(`${e.target.id}`).style.display = "none";
                      await push(ref(db, "historialviajes"), body);
                      await remove(ref(db, keyDelete));
                      await push(ref(db, "registros"), reg);
                    } else{
                      $trstatus.value = "EN ESPERA";
                      return;
                    };
    
                } 
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MR"){
                  let keyDelete = `/retornables/${e.target.id}`, $trstatus = d.querySelector(`#${e.target.id} #status-${e.target.id}`);
                 
                    let isConfirm = confirm("¿Cancelar Viaje?");
                    if (isConfirm) {
                      d.getElementById(`${e.target.id}`).style.display = "none";
                      await push(ref(db, "historialviajes"), body);
                      await remove(ref(db, keyDelete));
                      await push(ref(db, "registros"), reg);
                    } else{
                      $trstatus.value = "EN ESPERA";
                    };
                  
                  } 
              } else {
                await push(ref(db, "registros"), reg);
              await update(ref(db), { ["/historialviajes/" + e.target.id]: body })
              }                            
            } 
            else if(bodyUpdate.status === "COMPLETO"){
              console.log(bodyUpdate.status, e.target.id, body);

              if(localStorage.histrack === "false"){
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MP"){
                  let keyDelete = `/productivos/${e.target.id}`, $trstatus = d.querySelector(`#${e.target.id} #status-${e.target.id}`);
                             
                  if(
                    bodyUpdate.cporte === "" ||
                    bodyUpdate.bol === "" ||
                    bodyUpdate.operador === "" ||
                    bodyUpdate.inputUnidad === "" ||
                    bodyUpdate.inputCaja === "" ||
                    bodyUpdate.inputLlegadaPU === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaPU === "--/--/--  --:--" ||
                    bodyUpdate.inputEta === "--/--/--  --:--" ||
                    bodyUpdate.inputLlegadaDL === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaDL === "--/--/--  --:--"
                  ){
                    $trstatus.value = "EN ESPERA";
  
                    console.log($trstatus);
                    alert("Falta Captura de datos");
                  } else {
                    let isConfirm = confirm("¿Finalizar Viaje?");
                    if (isConfirm) {
                      d.getElementById(`${e.target.id}`).style.display = "none";
                      await push(ref(db, "historialviajes"), body);
                      await remove(ref(db, keyDelete));
                      await push(ref(db, "registros"), reg);
                    };
                  }
                  
                } 
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MR"){
                  let keyDelete = `/retornables/${e.target.id}`, $trstatus = d.querySelector(`#${e.target.id} #status-${e.target.id}`);
                 
                  if(
                    bodyUpdate.cporte === "" ||
                    bodyUpdate.bol === "" ||
                    bodyUpdate.operador === "" ||
                    bodyUpdate.inputUnidad === "" ||
                    bodyUpdate.inputCaja === "" ||
                    bodyUpdate.inputLlegadaPU === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaPU === "--/--/--  --:--" ||
                    bodyUpdate.inputEta === "--/--/--  --:--" ||
                    bodyUpdate.inputLlegadaDL === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaDL === "--/--/--  --:--"
                  ){
                    $trstatus.value = "EN ESPERA";
  
                    console.log($trstatus);
                    alert("Falta Captura de datos");
                  } else {
                    let isConfirm = confirm("¿Finalizar Viaje?");
                    if (isConfirm) {
                      d.getElementById(`${e.target.id}`).style.display = "none";
                      await push(ref(db, "historialviajes"), body);
                      await remove(ref(db, keyDelete));
                      await push(ref(db, "registros"), reg);
                    };
                  }
                  } 
              } else {
                await push(ref(db, "registros"), reg);
              await update(ref(db), { ["/historialviajes/" + e.target.id]: body })
              }


                            
            } else {
              await push(ref(db, "registros"), reg);
              if(d.getElementById(`${e.target.id}`).dataset.tipo === "MP") await update(ref(db), { ["/productivos/" + e.target.id]: body })
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MR") await update(ref(db), { ["/retornables/" + e.target.id]: body }) 
            }              
            }
        } else if(e.target.dataset.itemlength > 25){
            d.getElementById(`${e.target.id}`).classList.toggle("active-item");

            bodyUpdate = {
              cporte : d.getElementById(`cporte-${e.target.id}`).value.toUpperCase(),
              bol: d.getElementById(`bol-${e.target.id}`).value.toUpperCase(),
              operador: d.getElementById(`operador-${e.target.id}`).value.toUpperCase(),
              inputUnidad: d.getElementById(`inputUnidad-${e.target.id}`).value.toUpperCase(),
              inputCaja: d.getElementById(`inputCaja-${e.target.id}`).value.toUpperCase(),
              status: d.getElementById(`status-${e.target.id}`).value.toUpperCase(),
              statusLlegada: d.getElementById(`estatusllegada-${e.target.id}`).value.toUpperCase(),
              inputComentarios: d.getElementById(`inputComentarios-${e.target.id}`).value.toUpperCase(),
              inputLlegadaPU: d.getElementById(`inputLlegadaPU-${e.target.id}`).value.toUpperCase(),
              inputSalidaPU: d.getElementById(`inputSalidaPU-${e.target.id}`).value.toUpperCase(),
              inputEta: d.getElementById(`inputEta-${e.target.id}`).value.toUpperCase(),
              inputLlegadaDL: d.getElementById(`inputLlegadaDL-${e.target.id}`).value.toUpperCase(),
              inputSalidaDL: d.getElementById(`inputSalidaDL-${e.target.id}`).value.toUpperCase(),
              inputEta2: d.getElementById(`inputEta-${e.target.id}`).value.toUpperCase(),
              inputLlegadaPU2: d.getElementById(`inputLlegadaPU2-${e.target.id}`).value.toUpperCase(),
              inputSalidaPU2: d.getElementById(`inputSalidaPU2-${e.target.id}`).value.toUpperCase(),
            };

            if(itemDB.cporte !== bodyUpdate.cporte ||
              itemDB.bol !== bodyUpdate.bol ||
              itemDB.operador !== bodyUpdate.operador ||
              itemDB.unidad !== bodyUpdate.inputUnidad ||
              itemDB.caja !== bodyUpdate.inputCaja ||
              itemDB.status !== bodyUpdate.status ||
              itemDB.estatusllegada !== bodyUpdate.statusLlegada ||
              itemDB.llegadareal1 !== bodyUpdate.inputLlegadaPU ||
              itemDB.salidareal1 !== bodyUpdate.inputSalidaPU ||
              itemDB.eta !== bodyUpdate.inputEta ||
              itemDB.llegadareal2 !== bodyUpdate.inputLlegadaDL ||
              itemDB.salidareal2 !== bodyUpdate.inputSalidaDL ||
              itemDB.eta2 !== bodyUpdate.inputEta2 ||
              itemDB.comentarios !== bodyUpdate.inputComentarios ||
              itemDB.llegadareal3 !== bodyUpdate.inputLlegadaPU2 ||
              itemDB.salidareal3 !== bodyUpdate.inputSalidaPU2
            ){
           
              let body = {
                unidad: bodyUpdate.inputUnidad,
                caja: bodyUpdate.inputCaja,
                cporte: bodyUpdate.cporte,
                tracking: itemDB.tracking,
                cliente: itemDB.cliente,
                bol: bodyUpdate.bol,
                ruta:itemDB.ruta,
                operador: bodyUpdate.operador,
                stop1: itemDB.stop1,
                citastop1: itemDB.citastop1,
                llegadareal1: bodyUpdate.inputLlegadaPU,
                salidareal1: bodyUpdate.inputSalidaPU,
                eta: bodyUpdate.inputEta,
                stop2: itemDB.stop2,
                citastop2: itemDB.citastop2,
                llegadareal2: bodyUpdate.inputLlegadaDL,
                salidareal2: bodyUpdate.inputSalidaDL,
                status: bodyUpdate.status,
                estatusllegada: bodyUpdate.statusLlegada,
                comentarios: bodyUpdate.inputComentarios,
                tipo: itemDB.tipo,
                eta2: bodyUpdate.inputEta2,
                stop3: itemDB.stop3,
                citastop3: itemDB.citastop3,
                llegadareal3: bodyUpdate.inputLlegadaPU2,
                salidareal3: bodyUpdate.inputSalidaPU2
                
             },
             reg = {
              date: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
              user: user,
              body: body
            };

            if(bodyUpdate.status === "CANCELADO" || bodyUpdate.status === "DRY RUN" || bodyUpdate.status === "TONU"){
              console.log(bodyUpdate.status, e.target.id, body);

              if(localStorage.histrack === "false"){
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MP"){
                  let keyDelete = `/productivos/${e.target.id}`, $trstatus = d.querySelector(`#${e.target.id} #status-${e.target.id}`);
                             
                    let isConfirm = confirm("Cancelar Viaje?");
                    if (isConfirm) {
                      d.getElementById(`${e.target.id}`).style.display = "none";
                      await push(ref(db, "historialviajes"), body);
                      await remove(ref(db, keyDelete));
                      await push(ref(db, "registros"), reg);
                    } else{
                      $trstatus.value = "EN ESPERA";
                      return;
                    };
    
                } 
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MR"){
                  let keyDelete = `/retornables/${e.target.id}`, $trstatus = d.querySelector(`#${e.target.id} #status-${e.target.id}`);
                 
                    let isConfirm = confirm("¿Cancelar Viaje?");
                    if (isConfirm) {
                      d.getElementById(`${e.target.id}`).style.display = "none";
                      await push(ref(db, "historialviajes"), body);
                      await remove(ref(db, keyDelete));
                      await push(ref(db, "registros"), reg);
                    } else{
                      $trstatus.value = "EN ESPERA";
                    };
                  
                  } 
              } else {
                await push(ref(db, "registros"), reg);
              await update(ref(db), { ["/historialviajes/" + e.target.id]: body })
              }                            
            } 
            else if(bodyUpdate.status === "COMPLETO"){
              console.log(bodyUpdate.status, e.target.id, body);

              if(localStorage.histrack === "false"){
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MP"){
                  let keyDelete = `/productivos/${e.target.id}`, $trstatus = d.querySelector(`#${e.target.id} #status-${e.target.id}`);
                             
                  if(
                    bodyUpdate.cporte === "" ||
                    bodyUpdate.bol === "" ||
                    bodyUpdate.operador === "" ||
                    bodyUpdate.inputUnidad === "" ||
                    bodyUpdate.inputCaja === "" ||
                    bodyUpdate.inputLlegadaPU === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaPU === "--/--/--  --:--" ||
                    bodyUpdate.inputEta === "--/--/--  --:--" ||
                    bodyUpdate.inputLlegadaDL === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaDL === "--/--/--  --:--" ||
                    bodyUpdate.inputEta2 === "--/--/--  --:--" ||
                    bodyUpdate.inputLlegadaPU2 === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaPU2 === "--/--/--  --:--"
  
                  ){
                    $trstatus.value = "EN ESPERA";
                    alert("Falta Captura de datos");
                    return;
                  } else {
                    let isConfirm = confirm("¿Finalizar Viaje?");
                    if (isConfirm) {
                      d.getElementById(`${e.target.id}`).style.display = "none";
                      await push(ref(db, "historialviajes"), body);
                      await remove(ref(db, keyDelete));
                      await push(ref(db, "registros"), reg);
                    };
                  }
                  
                } 
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MR"){
                  let keyDelete = `/retornables/${e.target.id}`, $trstatus = d.querySelector(`#${e.target.id} #status-${e.target.id}`);
                 
                  if(
                    bodyUpdate.cporte === "" ||
                    bodyUpdate.bol === "" ||
                    bodyUpdate.operador === "" ||
                    bodyUpdate.inputUnidad === "" ||
                    bodyUpdate.inputCaja === "" ||
                    bodyUpdate.inputLlegadaPU === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaPU === "--/--/--  --:--" ||
                    bodyUpdate.inputEta === "--/--/--  --:--" ||
                    bodyUpdate.inputLlegadaDL === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaDL === "--/--/--  --:--" ||
                    bodyUpdate.inputEta2 === "--/--/--  --:--" ||
                    bodyUpdate.inputLlegadaPU2 === "--/--/--  --:--" ||
                    bodyUpdate.inputSalidaPU2 === "--/--/--  --:--"
                  ){
                    $trstatus.value = "EN ESPERA";
                    alert("Falta Captura de datos");
                    return;
                  } else {
                    let isConfirm = confirm("¿Finalizar Viaje?");
                    if (isConfirm) {
                      d.getElementById(`${e.target.id}`).style.display = "none";
                      await push(ref(db, "historialviajes"), body);
                      await remove(ref(db, keyDelete));
                      await push(ref(db, "registros"), reg);
                    };
                  }
                  } 
              } else {
                await push(ref(db, "registros"), reg);
              await update(ref(db), { ["/historialviajes/" + e.target.id]: body })
              }


            
            } else {
              await push(ref(db, "registros"), reg);
              if(d.getElementById(`${e.target.id}`).dataset.tipo === "MP") await update(ref(db), { ["/productivos/" + e.target.id]: body })
                if(d.getElementById(`${e.target.id}`).dataset.tipo === "MR") await update(ref(db), { ["/retornables/" + e.target.id]: body }) 
            } 

            }
           
        }    

          
          
      }

     /* const input = document.getElementById(`cporte-${e.target.id}`);

            
          input.addEventListener('blur', function() {
            // Obtener el valor del input
           const valor = input.value;

                // Hacer algo con el valor (por ejemplo, mostrarlo en la consola)
            console.log('Valor ingresado:', valor);
           });*/

    }

  
  });
  
  window.addEventListener("hashchange", () => {
    let user = localStorage.username,
      hash = window.location.hash;
    cambiarVista(user, hash);
  });

  clockTempo = setInterval(() => {
    let clockHour = new Date().toLocaleTimeString();
    document.querySelector(".clock").innerHTML = `${clockHour}`;
  }, 1000);


}





/*span.addEventListener("click", function () {
    modal.style.display = "none";
  });*/





  /*if (e.target.parentNode.tagName === "TR") {
      if (localStorage.tabViajes === "true") {
        if (
          localStorage.username === "CVehicular" ||
          localStorage.username === "Public"
        )
          return null;

        const db = getDatabase(),
          refItem = ref(db, `items/${e.target.parentNode.id}`);
        modal.style.display = "block";

        onValue(refItem, (snapshot) => {
          let item = snapshot.val();

          d.getElementById(
            "formulario-tr"
          ).dataset.value = `${e.target.parentNode.id}`;
          modalViajes(item, user);
        });

        sugerencias();
      } else if (localStorage.tabConveyance === "true") {
        if (localStorage.username === "Public") return null;
        const db = getDatabase(),
          refRem = ref(db, `subitem1/${e.target.parentNode.id}`);
        modal.style.display = "block";
        onValue(refRem, (snapshot) => {
          let item = snapshot.val();
          d.getElementById(
            "formulario-tr"
          ).dataset.value = `${e.target.parentNode.id}`;
          modalRem(item, user);
        });
      } else if (localStorage.tabUnit === "true") {
        if (localStorage.username === "Public") return null;
        const db = getDatabase(),
          refUnit = ref(db, `subitem/${e.target.parentNode.id}`);
        modal.style.display = "block";
        onValue(refUnit, (snapshot) => {
          let item = snapshot.val();
          d.getElementById(
            "formulario-tr"
          ).dataset.value = `${e.target.parentNode.id}`;
          modalUnit(item, user);
        });
      }
    }*/