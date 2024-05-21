export function Item(item, id, keyUpdate) {
   let itemLength = Object.keys(item).length;

  let itemId = id,
  user = localStorage.username;
  let date = new Date();

  const travelStatus = (item) => {
    if (item.status.match("COMPLET")) {
      return "active-complete";
    }
    if (item.status.match("CANCEL")) {
      return "active-error";
    }
    if (item.status.match("")) {
      return "active-pending";
    }
  };

  const alertColor = (item) => {
    if (item.status.match("PENDIENTE")) {
      return "background-color: #f2aa0036;";
    }
    if (item.status.match("TRANSITO")) {
      return "background-color: #6ec0e83d;";
    }
    if (
      item.status.match("PROVEEDOR") ||
      item.status.match("PLANT") ||
      item.status.match("CARGANDO")
    ) {
      return "background-color: #00508d59;";
    }
    if (item.status.match("DET") || item.status.match("ESP")) {
      return "background-color: #791d1d4f;";
    }
  };

  const alertLlegada = (item) => {
    if (item.estatusllegada.match("A TIEMPO")) {
      return "background-color: #c2dffa;";
    }
    if (item.estatusllegada.match("DESFASADA")) {
      return "background-color: #e1dcc9;";
    }
    if (item.estatusllegada.match("TARDE") || item.estatusllegada.match("CRITICA")) {
      return "background-color: #bdaab9;";
    }
  }

  const alertStatus = (item) => {
    if (
      item.status.match("TRANSITO") ||
      item.status.match("ESPERA") ||
      item.status.match("DETENIDO") ||
      item.status.match("CARGANDO") ||
      item.status.match("DESCARGANDO")
    ) {
      return "1";
    } else if (item.status.match("PENDIENTE") || item.status.match("ACTIVA")) {
      return "2";
    } else if (item.status.match("COMPLET")) {
      return "4";
    }
    if (
      item.status.match("CANCEL") ||
      item.status.match("DRY") ||
      item.status.match("TONU") ||
      item.status.match("BROKE")
    ) {
      return "5";
    } else {
      return "";
    }
  };

  const filterUser = (item) => {
    if (user === "InhouseMX") {
      if (!item.ruta.match("232") && !item.ruta.match("23K")) {
        return "display: none;";
      }
    }
    if (user === "InhouseHMO" || user === "TrafficH") {
      if (!item.ruta.match("242") && !item.ruta.match("24K")) {
        return "display: none;";
      }
    }
    if (user === "InhouseTOL") {
      if (!item.ruta.match("STE") && !item.ruta.match("BRP")) {
        return "display: none;";
      }
    }
    if (item.status.includes("COMPLET")) {
      return;
    } else {
      return;
    }
  };


  if (!keyUpdate) {
    itemId = id;
  } else {
    itemId = keyUpdate;
  }
  
   
   return `
    <div id="${itemId}" class="item" data-itemlength="${itemLength}" data-unit="${item.unidad}" data-box="${item.caja}" data-operador="${item.operador}" data-cporte="${item.cporte}" data-track="${item.tracking}" data-ruta="${item.ruta}" data-tipo="${item.tipo}" data-cliente="${item.cliente}" data-proveedor="${item.stop1}" data-citastop1="${item.citastop1}" data-status="${item.status}">
    <span class="th tracking">
    Tracking
      <br />
      <span class="td">${item.tracking}</span>
    </span>

    <span class="th cporte">
    C. Porte
      <br />
      <input id="cporte-${itemId}" class="td inputAsignacion cporteinput" value="${item.cporte}" type="text" name="cporte" disabled>
    </span>

    <span class="th bol">
    Shipper/BOL
      <br />
      <input id="bol-${itemId}" class="td inputAsignacion bol" value="${item.bol}" name="bol" disabled>
    </span>

    <span class="th cliente">
    Cliente
      <br />
      <span class="td">${item.cliente.slice(0, 12)}</span>
    </span>

    <span class="th ruta">
    Ruta
      <br />
      <span class="td">${item.ruta.slice(0, 12)}</span>
    </span>

    <span class="th origen">
    Origen
    <br />
      <div class="pu">
      <span class="td">${item.stop1.slice(0, 20)}</span>
      <span class="td">Horario: ${item.citastop1}</span>
      </div>
    </span>
    

    <div class="th asignacion">
          <span class="th">Asignación</span>
      <br />
      <span class="td">Op:</span>
      <input id="operador-${itemId}" class="td inputAsignacion ${itemId} operadorinput" value="${item.operador}" type="search" name="operador" list="sugerencias" disabled>
      <datalist id="sugerencias"></datalist>
      <br />
      <span class="td">Int:</span>
      <input id="inputUnidad-${itemId}" class="td inputAsignacion inputUnidad" value="${item.unidad}" type="text" name="unidad" disabled>
      <span class="td">Rem:</span>
      <input id="inputCaja-${itemId}" class="td inputAsignacion inputCaja" value="${item.caja}" type="text" name="caja" disabled>
    </div>

    <div class="th indllegada" style="${alertLlegada(item)}">
       <span class="th">Llegada</span>
      <br/>      
     <select id="estatusllegada-${itemId}" class="td inputAsignacion inputLlegada" name="llegada" disabled>
        <option value="${item.estatusllegada}">${item.estatusllegada}</option> 
         <option value="A TIEMPO">A TIEMPO</option>  
         <option value="TARDE">TARDE</option>
         <option value="DESFASADA">DESFASADA</option>
         <option value="CRITICA">CRITICA</option>  
    </select>       
    </div>

    <div class="th estatus" style="${alertColor(item)}">
       <span class="th">Estatus</span>
      <br/>      
     <select id="status-${itemId}" class="td inputAsignacion inputStatus" name="status" disabled>
     <option value="${item.status}">${item.status}</option>
         <option value="PENDIENTE">PENDIENTE</option>
         <option value="COMPLETO">COMPLETO</option>
         <option value="CANCELADO">CANCELADO</option>
         <option value="DETENIDO">DETENIDO</option>
         <option value="CARGANDO">CARGANDO</option>
         <option value="DESCARGANDO">DESCARGANDO</option>
         <option value="EN ESPERA">EN ESPERA</option>
         <option value="DRY RUN">DRY RUN</option>
         <option value="BROKEREADO">BROKEREADO</option>
         <option value="TONU">TONU</option>
         <option value="TRANSITO A PROVEEDOR">TRANSITO A PROVEEDOR</option>
         <option value="TRANSITO A FORD HMO">TRANSITO A FORD HMO</option>
         <option value="TRANSITO A FORD CSAP">TRANSITO A FORD CSAP</option>
         <option value="TRANSITO A FORD SUPPLIER CITY">TRANSITO A SUPPLIER CITY</option>
         <option value="TRANSITO A FORD DHL">TRANSITO A FORD DHL</option>
         <option value="TRANSITO A FCA TOL">TRANSITO A FCA TOL</option>
         <option value="TRANSITO A FCA SAL">TRANSITO A FCA SAL</option>
         <option value="TRANSITO A FEMSA">TRANSITO A FEMSA</option>
         <option value="TRANSITO A GM">TRANSITO A GM</option>
         <option value="TRANSITO A BRP">TRANSITO A BRP</option>
         <option value="EXPEDITADO EN TRANSITO">EXPEDITADO EN TRANSITO</option>
         <option value="EXPEDITADO CARGANDO">EXPEDITADO CARGANDO</option>
         <option value="EXPEDITADO DESCARGANDO">EXPEDITADO DESCARGANDO</option>
         <option value="EXPEDITADO COMPLETO">EXPEDITADO COMPLETO</option>  
    </select>       
    </div>

   <div class="th comentarios">
       <span class="th">Comentarios</span>
     
      <textarea id="inputComentarios-${itemId}" class="td inputAsignacion" name="comentarios" rows="2" cols="20" spellcheck="false" disabled>${item.comentarios}</textarea>
                
   </div>

   <div class="th alarma35">
       <span class="th">Alarma</span>
       <div id="list-alarmas">
          <div class="alarma td">
          <i id="${itemId}" class="fa-solid fa-bell"></i>
          <span class="td"></span>
          </div>
       </div>
   </div>

   <div class="th proveedor" style="${itemLength === 25 ? `width: 80rem; height: 4rem;`: ""}">
      <span class="th">Sitios</span>
      </br>
     <div class="sitios">
      <div class="pu">
      <span class="td">${item.stop1.slice(0, 20)}</span>
      <span class="td">Horario: ${item.citastop1}</span>

      <div id="tiempo_origen" class="th">                                                                                         
      <span class="td">Llegada Real: </span>
      <input id="inputLlegadaPU-${itemId}"  type="text" class="td inputAsignacion inputLlegadaPU" value="${item.llegadareal1 === "--/--/--  --:--" ? item.llegadareal1 : item.llegadareal1}" disabled>
      ${item.llegadareal1 === "--/--/--  --:--" ? `<i class="fa-solid fa-stopwatch"></i>` : ""}
      <span class="td">Salida Real: </span>
      <input id="inputSalidaPU-${itemId}"  type="text" class="td inputAsignacion inputSalidaPU" value="${item.salidareal1 === "--/--/--  --:--" ? item.salidareal1 : item.salidareal1}" disabled>
      ${item.salidareal1 === "--/--/--  --:--"  ? `<i class="fa-solid fa-stopwatch"></i>` : ""} 
    </div> 

      </div>
      <div class="eta">
      <i class="fa fa-arrow-right" aria-hidden="true"></i>
      <span class="td">ETA: </span>
      <input id="inputEta-${itemId}"  type="text" class="td inputAsignacion inputEta" value="${item.eta}" disabled>
      ${item.eta === "--/--/--  --:--" ? `<i class="fa-solid fa-stopwatch"></i>` : ""}
      </div>
      

      <div class="dl">
      <span class="td">${item.stop2.slice(0, 20)}</span>
      <span class="td">Horario: ${item.citastop2}</span>

      <div id="tiempo_destino" class="th">
      <span class="td">Llegada Real: </span>
        <input id="inputLlegadaDL-${itemId}"  type="text" class="td inputAsignacion inputLlegadaDL" value="${item.llegadareal2 === "--/--/--  --:--" ? item.llegadareal2 : item.llegadareal2}" disabled>
        ${item.llegadareal2 === "--/--/--  --:--" ? `<i class="fa-solid fa-stopwatch"></i>` : ""}
        <span class="td">Salida Real: </span>
        <input id="inputSalidaDL-${itemId}"  type="text" class="td inputAsignacion inputSalidaDL" value="${item.salidareal2 === "--/--/--  --:--" ? item.salidareal2 : item.salidareal2}" disabled>
        ${item.salidareal2 === "--/--/--  --:--" ? `<i class="fa-solid fa-stopwatch"></i>` : ""}
    </div> 

      </div>

      ${itemLength > 25 ? `
     
      <div class="eta">
      <i class="fa fa-arrow-right" aria-hidden="true"></i>
      <span class="td">ETA: </span>
      <input id="inputEta2-${itemId}"  type="text" class="td inputAsignacion inputEta" value="${item.eta2}" disabled>
      ${item.eta2 === "--/--/--  --:--" ? `<i class="fa-solid fa-stopwatch"></i>` : ""}
      </div>

      <div class="stop3 pu" data-stop="true">
      <span class="td">${item.stop3.slice(0, 20)}</span>
      <span class="td">Horario: ${item.citastop3}</span>


      <div id="tiempo_destino" class="th">
      <span class="td">Llegada Real: </span>
        <input id="inputLlegadaPU2-${itemId}"  type="text" class="td inputAsignacion inputLlegadaPU2" value="${item.llegadareal3 === "--/--/--  --:--" ? item.llegadareal3 : item.llegadareal3}" disabled>
        ${item.llegadareal3 === "--/--/--  --:--" ? `<i class="fa-solid fa-stopwatch"></i>` : ""}
        <span class="td">Salida Real: </span>
        <input id="inputSalidaPU2-${itemId}"  type="text" class="td inputAsignacion inputSalidaPU2" value="${item.salidareal3 === "--/--/--  --:--" ? item.salidareal3 : item.salidareal3}" disabled>
        ${item.salidareal3 === "--/--/--  --:--" ? `<i class="fa-solid fa-stopwatch"></i>` : ""}
       </div> 
   
      </div>
      `:""}

     </div>
    </div>    

  </div>

    `;

    /*return `
<tr id="${itemId}" class="item active-run text-center align-middle" data-bs-toggle="" data-bs-target="#exampleModal" data-run="${alertStatus(item)}" data-unit="${item.unidad}" data-box="${item.caja}" data-operador="${item.operador}" data-cporte="${item.cporte}" data-track="${item.tracking}" data-ruta="${item.ruta}" data-cliente="${item.cliente}" data-proveedor="${item.proveedor}" data-status="${item.status}" data-citaprogramada="${item.citaprogramada}" style="${filterUser(item)}">
    <td class="Unit">${item.unidad}</td>
    <td>${item.caja}</td>
    <td>${item.operador}</td>
    <td style="${item.cporte === "" ? "background-color: #ff6767;" : ""}" >${item.cporte}</td>
    <td style="${item.tracking === "" ? "background-color: #ff6767;" : ""}" >${item.tracking}</td>
    <td style="${item.bol === "" ? "background-color: #ff6767;" : ""}" >${item.bol}</td>
    <td>${item.ruta}</td>
    <td class="table-active">${item.cliente}</td>
    <td class="table-active" >${item.proveedor}</td>
    <td class="">${item.citaprogramada}</td>
    <td class="">${item.llegadareal.match("01/01/0001 00:00") ? "--/--/-- --:--" : item.llegadareal}</td>
    <td class="">${item.salidareal.match("01/01/0001 00:00") ? "--/--/-- --:--" : item.salidareal}</td>
    <td class="">${item.eta.match("01/01/0001 00:00") ? "--/--/-- --:--" : item.eta}</td>
    <td class="">${item.llegadadestino.match("01/01/0001 00:00") ? "--/--/-- --:--" : item.llegadadestino}</td>
    <td class="">${item.salidadestino.match("01/01/0001 00:00") ? "--/--/-- --:--" : item.salidadestino}</td>
    <td style="${item.llegada.match("DESFASADA") || item.llegada.match("TARDE") || item.llegada.match("CRITICA") ? "background-color: rgb(245, 183, 124);" : ""}">${item.llegada}</td>
    <td style="${alertColor(item)}" >${item.status}</td>
    <td>${item.comentarios}</td>
    <td class="btn-hid" <td class="btn-hid" style="${user === "Public" || user === "CVehicular" || user === "Mtto"  ? "display: none;" : ""}">
       <button id="${itemId}" type="button" class="btn btn-sm btn-warning alert3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-bell" id="${itemId}"></i></button>
    </td>
 </tr>
          `;*/
  
}

//BOTON CONTROL VEHICULAR <button id="${item.unidad}" data-conveyance="${item.caja}" type="button" class="btn btn-sm btn-dark control" data-bs-toggle="modal" data-bs-target="#controlModal"><i data-conveyance="${item.caja}" class="fa-solid fa-car" id="${item.unidad}"></i></button> <button id="${item.unidad}" style="${item.unidad || item.caja ? "display: inherit;" : "display: none;"}" data-conveyance="${item.caja}" type="button" class="btn btn-sm btn-dark control" data-bs-toggle="modal" data-bs-target="#controlModal"><i data-conveyance="${item.caja}" class="fa-solid fa-car" id="${item.unidad}"></i></button>

/*
 <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox1" ${item.x3 ? "checked disabled" : "disabled"}>
      <label class="form-check-label" for="inlineCheckbox1">X3</label>
     </div>
     <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox2" ${item.af ? "checked disabled" : "disabled"}>
      <label class="form-check-label" for="inlineCheckbox2">AF</label>
     </div>
     <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox3" ${item.ag ? "checked disabled" : "disabled"}>
      <label class="form-check-label" for="inlineCheckbox3">AG</label>
     </div>
     <div class="form-check form-check-inline">
      <input class="form-check-input" type="checkbox" id="inlineCheckbox4" ${item.x1 ? "checked disabled" : "disabled"}>
      <label class="form-check-label" for="inlineCheckbox4">X1</label>
     </div>
     */
