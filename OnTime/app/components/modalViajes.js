const dateConvert = (date) => {
    let hora = date.slice(11, 17),
      arrF = date.slice(0, 10).split("/"),
      concatF = "";

    return concatF.concat(
      arrF[2],
      "-",
      arrF[1],
      "-",
      arrF[0],
      "T",
      hora
    );
  };
  

export function modalViajes(item, user){
    document.querySelector(".modal-body-tr").innerHTML = `
             <div class="container-fluid font" style="padding: 0;"> 
             <table class="table table-sm" >
         <thead class="table-dark text-center">
           <tr class="text-wrap">
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
           <th scope="col">ETA A DESTINO</th>
           <th scope="col">LLEGADA A DESTINO</th>
           <th scope="col">SALIDA A DESTINO</th>
           <th scope="col">LLEGADA</th>
           <th scope="col">ESTATUS</th>
           <th scope="col">COMENTARIOS</th>
           
       
           </tr>
         </thead>
         <tbody class="text-center text-wrap">
         <td><input name="unidad" style="width: 35px; ${user === "Traffic" || user === "TrafficH" ? "background-color: #b9e1ff;" : ""}" type="text" value="${item.unidad}"></td>
         <td><input name="caja" style="width: 60px; ${user === "Traffic" || user === "TrafficH" ? "background-color: #b9e1ff;" : ""}" type="text"   value="${item.caja}"></td>
         <td>
         <input id="operador" name="operador" list="sugerencias" type="search" style="height: 24px; width: 130px; font-size: 12px; ${user === "Traffic" || user === "TrafficH" ? "background-color: #b9e1ff;" : ""}" value="${item.operador}">
         <datalist id="sugerencias"></datalist>
         </td>
         <td><input name="cporte" style="width: 70px; ${user === "Traffic" || user === "TrafficH" ? "background-color: #b9e1ff;" : ""}" type="text"  value="${item.cporte}"></td>
         <td><input name="tracking" style="width: 90px;" type="text"  value="${item.tracking}" disabled></td>
         <td><input name="bol" style="width: 75px; ${user === "Traffic" || user === "TrafficH" ? "background-color: #b9e1ff;" : ""}" type="text"  value="${item.bol}"></td>
         <td><input name="ruta" style="width: 75px;" type="text"  value="${item.ruta}" ${user === "Traffic" || user === "TrafficH" ? "disabled" : ""} required></td>
         <td><input name="cliente" style="width: 150px;" type="text"  value="${item.cliente}" disabled></td>
         <td><input name="proveedor" type="text" style="width: 150px;"  value="${item.proveedor}" ${user === "Traffic" ? "disabled" : ""}></td>
         <td><input name="llegadaprogramada" style="width: 150px;" type="text" name="hour" id="hour" ${user === "Traffic" ? "disabled" : ""} value="${item.citaprogramada}"></td>
         <td><input name="llegadareal" style="width: 150px; ${user === "TrafficH" || user === "Traffic" ? "background-color: #b9e1ff;" : ""}"   name="hour" type="datetime-local" id="hour"  value="${dateConvert(item.llegadareal)}"></td>
         <td><input name="salidareal" style="width: 150px; ${user === "TrafficH" || user === "Traffic" ? "background-color: #b9e1ff;" : ""}" type="datetime-local" name="hour" id="hour"  value="${dateConvert(item.salidareal)}"></td>
         <td><input name="eta" style="width: 150px; ${user === "TrafficH" || user === "Traffic" ? "background-color: #b9e1ff;" : ""}" type="datetime-local" name="hour" id="hour"  value="${dateConvert(item.eta)}"></td>
         <td><input name="llegadadestino" style="width: 150px; ${user === "TrafficH" || user === "Traffic" ? "background-color: #b9e1ff;" : ""}" type="datetime-local" name="hour" id="hour"  value="${dateConvert(item.llegadadestino)}"></td>
         <td><input name="salidadestino" style="width: 150px; ${user === "TrafficH" || user === "Traffic" ? "background-color: #b9e1ff;" : ""}" type="datetime-local" name="hour" id="hour"  value="${dateConvert(item.salidadestino)}"></td>
         <td>
         <select class="form-select form-select-sm" style="height: 24px; width: 120px; font-size: 12px; ${user === "Traffic" || user === "TrafficH" ? "background-color: #b9e1ff;" : ""}" name="llegada" id="arribo">
         <option value="${item.llegada}">${item.llegada}</option> 
         <option value="A TIEMPO">A TIEMPO</option>  
         <option value="TARDE">TARDE</option>
         <option value="DESFASADA">DESFASADA</option>
         <option value="CRITICA">CRITICA</option>
         </select>
         </td>
         <td>
         <select class="form-select form-select-sm" style="height: 24px; width: 230px; font-size: 12px; ${
           user === "Traffic" || user === "TrafficH"
             ? "background-color: #b9e1ff;"
             : ""
         }" name="status" id="status">
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
         </td>
         <td>
         <input name="comentarios" style="width: 150px; ${
           user === "Traffic" || user === "TrafficH"
             ? "background-color: #b9e1ff;"
             : ""
         }" type="text"  value="${item.comentarios}">
         </td>    
         </tbody>
         
       </table>
       </div>
             `;
}