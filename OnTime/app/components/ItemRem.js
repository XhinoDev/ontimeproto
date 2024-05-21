export function ItemRem(conv, keyUpdate) {
   let convId, user = localStorage.username;
   //console.log(conv);
   
   if(!keyUpdate){
      convId = conv[0];
      conv = conv[1];
   } else {
      convId = keyUpdate;
   }
   
  const alertStatus = (comit) => {
   if( comit.comentarios.match("MANTE") || comit.comentarios.match("FALLA") || comit.comentarios.match("DAÑ") || comit.comentarios.match("CORRA")){
      return `
          background: #99171787;
          color: #620606;
          font-weight: bold;

      ` ;
   }
   else {
      if( comit.comentarios.match("DISPONIBLE")){
         return  `
           background-color: #017d1a4f;
           color: #094a09;
           font-weight: bold;
           `;
           }
           else {
              return  `
              background-color: #f0e0cf;
           font-weight: bold;
           `;
           }
   }
  }

  const colorUbi = (ubi) => { 
   if(ubi.ubicacion.match("TRANSITO")){
      return `
      background-color: #badfff;
      font-weight: bold;
      `;
   }
   else {
      return `
      font-weight: bold;
      `;
   }
  }

  function diasTranscurridos(desdeFecha) {
   let partesFecha = desdeFecha.split("/");
   let dia = parseInt(partesFecha[0]);
   let mes = parseInt(partesFecha[1]) - 1; 
   let anio = parseInt(partesFecha[2]);
   let fechaRegistrada = new Date(anio, mes, dia);
   let fechaActual = new Date();
   let diferenciaEnMilisegundos = fechaActual - fechaRegistrada;
   let diasTranscurridos = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

   return diasTranscurridos;
}
  

return `
  <div id="${convId}" class="item unit" data-conv="${conv.caja}" data-circuito="${conv.circuito}" data-ubicacion="${conv.ubicacion}" style="padding-left: 1rem;gap: 1rem;">
 
  <div class=content-img-unit>

  <span class="thUnit unidad" style="font-size: 1.2rem;">
  
    <span class="td" style="font-size: 1.2rem;">Remolque  ${conv.caja.length === 3 ? "0": conv.caja.length === 2 ? "00" : ""}${conv.caja}</span>
  </span>
   
  <img class="imgUnit" src="./app/assets/fruehauf_srem.png" alt="remolque">

  </div>

  <div class="datos-unidad" style="width: 17rem;display: flex;flex-wrap: wrap;justify-content: space-between;gap: 0.5rem;">
    <h5 style="width: 100%;background-color: #001a63;color: white;height: 1rem;">DATOS DE UNIDAD</h5>
  <span class="thUnit modelo">
  Modelo
    <br />
    <span class="td">${conv.modelo}</span>
  </span>

  <span class="thUnit placa">
  Placa
    <br />
    <span class="td">${conv.placa}</span>
  </span>

  <span class="thUnit año" style="width: 3rem;">
  Año
    <br />
    <span class="td">${conv.año}</span>
  </span>

  <span class="thUnit verificacion">
    Verificación    <br />
    <span class="td">${conv.verificacion}</span>
  </span>

  <span class="thUnit verificacion">
    Vigencia    <br />
    <span class="td">13/08/2024 - 13/08/2025</span>
  </span>

  <span class="thUnit poliza">
  Poliza
  <br />
    <span class="td">${conv.poliza}</span>
  </span>

  <span class="thUnit verificacion">
    Vigencia    <br />
    <span class="td">13/08/2024 - 13/08/2025</span>
  </span>

  </div>

  <div class="kilometrajes" style="width: 17rem;display: flex;flex-wrap: wrap;justify-content: space-between;gap: 0.5rem;">
  <h5 style="width: 100%;background-color: #001a63;color: white;height: 1rem;">KILOMETRAJE</h5>

  <span class="thUnit fechaukm" style="width: 5rem;height: 2rem;">
    Fecha Ú. S.    <br />
      <span class="td">13/08/2024</span>
  </span>

  <span class="thUnit kmus" style="width: 5rem;height: 2rem;">
    KM Ú. S.    <br />
      <span class="td">7,876,666</span>
  </span>

  <span class="thUnit kmps" style="width: 5rem;height: 2rem;">
     KM P. S.    <br />
    <span class="td">7,904,666</span>
  </span>

  <span class="thUnit kmo" style="width: 5rem;height: 2rem;">
     KM O.    <br />
    <span class="td">1</span>
  </span>

  <span class="thUnit kmpss" style="width: 5rem;height: 2rem;">
     KM S. S.    <br />
    <span class="td">7,904,665</span>
  </span>

  <span class="thUnit vigkm" style="width: 5rem;height: 2rem;">
     Vigencia    <br />
    <span class="td">PROGRAMAR</span>
  </span>

  </div>

  <div class="semaforeo" style="width: 20rem;display: flex;flex-wrap: wrap;justify-content: space-between;gap: 0.5rem;">
    <h5 style="width: 100%;background-color: #001a63;color: white;height: 1rem;">SEMAFOREO LLANTAS</h5>

    <span class="thUnit fechaukm" style="width: 5rem;height: 2rem;">
    Fecha Ú. S.    <br />
      <span class="td">13/08/2024</span>
  </span>

  <span class="thUnit kmus" style="width: 5rem;height: 2rem;">
    KM Ú. S.    <br />
      <span class="td">7,876,666</span>
  </span>

  <span class="thUnit kmps" style="width: 5rem;height: 2rem;">
     KM P. S.    <br />
    <span class="td">7,904,666</span>
  </span>

  <span class="thUnit kmo" style="width: 5rem;height: 2rem;">
     KM O.    <br />
    <span class="td">1</span>
  </span>

  <span class="thUnit kmpss" style="width: 5rem;height: 2rem;">
     KM S. S.    <br />
    <span class="td">7,904,665</span>
  </span>

  <span class="thUnit vigkm" style="width: 5rem;height: 2rem;">
     Vigencia    <br />
    <span class="td">PROGRAMAR</span>
  </span>

  </div>
  
</div>

  `;

/*return  `
<tr id="${convId}" class="item text-center align-middle"  data-conv="${conv.caja}" data-circuito="${conv.circuito}" data-ubicacion="${conv.ubicacion}">


<td style="font-weight: bold;">${conv.caja}</td>
<td>${conv.tipo}</td>
<td class="modelo">${conv.modelo}</td>
<td class="placa" >${conv.placa}</td>
<td class="año" >${conv.año}</td>
<td class="verificacion" >${conv.verificacion}</td>
<td class="poliza" >${conv.poliza}</td>
<td class="inciso">${conv.inciso}</td>
<td class="contacto" style="font-weight: bold;">${conv.contacto}</td>
<td style="font-weight: bold;" >${conv.circuito}</td>
<td style="font-weight: bold;" >${conv.fecha}</td>
<td style="${diasTranscurridos(conv.fecha) > 3 ? "background-color: #99171787; color: #620606; font-weight: bold; width: 15px;" : "background-color: #017d1a4f; color: #094a09; font-weight: bold; width: 15px;"}">${diasTranscurridos(conv.fecha)}</td>
<td style="${colorUbi(conv)}" >${conv.ubicacion}</td> 
<td style="${alertStatus(conv)}" >${conv.comentarios}</td>
<td >${conv.reporte}</td> 
<td class="btn-hid" style="${user === "Public"  ? "display: none;" : ""}">
       <button id="${convId}" type="button" class="btn btn-sm btn-warning ordenServ" data-bs-toggle="" data-bs-target=""><i class="fa-solid fa-triangle-exclamation" id="${convId}"></i></button>
       <button id="${convId}" type="button" class="btn btn-sm btn-danger delete" style="${user === "CVehicular" ? "" : "display: none;"}"><i class="fa-solid fa-trash" id="${convId}"></i></button>
</td>    
</tr>
`;*/


}



//BOTON CONTROL VEHICULAR <button id="${item.unidad}" style="${item.unidad || item.caja ? "display: inherit;" : "display: none;"}" data-conveyance="${item.caja}" type="button" class="btn btn-sm btn-dark control" data-bs-toggle="modal" data-bs-target="#controlModal"><i data-conveyance="${item.caja}" class="fa-solid fa-car" id="${item.unidad}"></i></button>