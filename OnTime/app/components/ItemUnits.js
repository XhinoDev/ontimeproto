export function ItemUnit(unit, keyUpdate) {
  let unitId, user = localStorage.username;

  if(!keyUpdate){
    unitId = unit[0];
    unit = unit[1];
 } else {
    unitId = keyUpdate;
 }
  
  const alertStatus = (comit) => {
    if (
      comit.comentarios.match("MANTE") ||
      comit.comentarios.match("FALLA") ||
      comit.comentarios.match("DAÑ") ||
      comit.comentarios.match("SINIES") ||
      comit.comentarios.match("CORRA")
    ) {
      return `
          background: #99171787;
          color: #620606;
         font-weight: bold;
      `;
    } else {
      if (comit.comentarios.match("DISPONIBLE")) {
        return `
           background-color: #017d1a4f;
           color: #094a09;
           font-weight: bold;
           `;
      } else {
        return ` 
        background-color: #f0e0cf;
        font-weight: bold;
           `;
      }
    }
  };

  const compareKM = (unit) => {
    // console.log((parseInt(unit[1].uservicio, 10) + 28000).toLocaleString());
    if (
      parseInt(unit.unidad, 10) >= 1 &&
      parseInt(unit.unidad, 10) <= 31
    ) {
      return {
        pservice: (parseInt(unit.uservicio, 10) + 28000),
        km: 28000,
        marca: "volvo"
      };
    } else if (
      parseInt(unit.unidad, 10) >= 33 &&
      parseInt(unit.unidad, 10) <= 258
    ) {
      return {
        pservice: (parseInt(unit.uservicio, 10) + 45000),
        km: 45000,
        marca: "volvo"
      };
    } else if (
      parseInt(unit.unidad, 10) >= 300 &&
      parseInt(unit.unidad, 10) <= 350
    ) {
      return {
        pservice: (parseInt(unit.uservicio, 10) + 60000),
        km: 60000,
        marca: "freightliner"
      };
    } else if (
      parseInt(unit.unidad, 10) >= 400 &&
      parseInt(unit.unidad, 10) <= 450
    ) {
      return {
        pservice: (parseInt(unit.uservicio, 10) + 45000),
        km: 45000,
        marca: "scania"
      };
    } else {
      return
    }
  };

  const alertService = (uservice, odometro) => {
  // console.log(uservice.pservice, odometro);
    if (uservice.km === 28000) {
      //console.log(uservice);
      if (uservice.pservice - odometro >= 2000) {
         return `
         background: #017d1a4f;
         font-weight: bold;
         color: #094a09;
         `;
       } else if (uservice.pservice - odometro < 2000 && uservice.pservice - odometro >= 0) {
         return `
         background: #ee8e2875;
         font-weight: bold;
         color: #913c0af7;
         `;
       }
       if (uservice.pservice - odometro < 0) {
         return `
         background: #99171787;
         font-weight: bold;
         color: #620606;
         `;
       }
    } else
    if (uservice.km === 45000) {
      if (uservice.pservice - odometro >= 2000) {
         return `
         background: #017d1a4f;
         font-weight: bold;
         color: #094a09;
         `;
       } else if (uservice.pservice - odometro < 2000 && uservice.pservice - odometro > 0) {
         return `
         background: #ee8e2875;
         font-weight: bold;
         color: #913c0af7;;
         `;
       }
       if (uservice.pservice - odometro <= 0) {
         return `
         background: #99171787;
         font-weight: bold;
         color: #620606;
         `;
       }
    } else
    if (uservice.km === 60000) {
      if (uservice.pservice - odometro >= 2000) {
         return `
         background: #017d1a4f;
         font-weight: bold;
         color: #094a09;
         `;
       } else if (uservice.pservice - odometro < 2000 && uservice.pservice - odometro > 0) {
         return `
         background: #ee8e2875;
         font-weight: bold;
         color: #913c0af7;
         `;
       }
       if (uservice.pservice - odometro <= 0) {
         return `
         background: #99171787;
         font-weight: bold;
         color: #620606;
         `;
       }
    }
    

  };

  const mttoPreventive = (uservice, odometro) => {
   if (uservice.km === 28000) {
      //console.log(uservice);
      if (uservice.pservice - odometro >= 2000) {
         return `
         SERVICIO VIGENTE
         `;
       } else if (uservice.pservice - odometro < 2000 && uservice.pservice - odometro >= 0) {
         return `
         PROGRAMAR SERVICIO
         `;
       }
       if (uservice.pservice - odometro < 0) {
         return `
         RELIZAR SERVICIO
         `;
       }
    } else
    if (uservice.km === 45000) {
      if (uservice.pservice - odometro >= 2000) {
         return `
         SERVICIO VIGENTE
         `;
       } else if (uservice.pservice - odometro < 2000 && uservice.pservice - odometro > 0) {
         return `
         PROGRAMAR SERVICIO
         `;
       }
       if (uservice.pservice - odometro <= 0) {
         return `
         RELIZAR SERVICIO
         `;
       }
    } else
    if (uservice.km === 60000) {
      if (uservice.pservice - odometro >= 2000) {
         return `
         SERVICIO VIGENTE
         `;
       } else if (uservice.pservice - odometro < 2000 && uservice.pservice - odometro > 0) {
         return `
         PROGRAMAR SERVICIO
         `;
       }
       if (uservice.pservice - odometro <= 0) {
         return `
         RELIZAR SERVICIO
         `;
       }
    }
  };


  //console.log(unit);  <img src="../assets/volvo5ta.png" alt="volvo">
   // <img src="../assets/scania5ta" alt="scania">
   // <img src="../assets/freightlinerta.png" alt="freightliner">

  return `
  <div id="${unitId}" class="item unit" data-unit="${unit.unidad}" data-circuito="${unit.circuito}" data-cliente="${unit.cliente}" data-status="${unit.status}" data-ubicacion="${unit.ubicacion}" style="padding-left: 1rem;gap: 1rem;">
 
  <div class=content-img-unit>

  <span class="thUnit unidad" style="font-size: 1.2rem;">
  
    <span class="td" style="font-size: 1.2rem;">Unidad  ${unit.unidad.length === 2 ? "0": unit.unidad.length === 1 ? "00" : ""}${unit.unidad}</span>
  </span>
   
  <img class="imgUnit" src="${compareKM(unit).marca === "volvo" ? `./app/assets/volvo5ta.png" alt="volvo"` : compareKM(unit).marca === "freightliner" ? `./app/assets/freightliner5ta.png" alt="freightliner"`: compareKM(unit).marca === "scania" ? `./app/assets/scania5ta.png" alt="scania"` : ""}">

  </div>

  <div class="datos-unidad" style="width: 17rem;display: flex;flex-wrap: wrap;justify-content: space-between;gap: 0.5rem;">
    <h5 style="width: 100%;background-color: #001a63;color: white;height: 1rem;">DATOS DE LA UNIDAD</h5>

   <div class="content-datosunit" style="width: 17rem;display: flex;flex-wrap: wrap;justify-content: space-between;gap: 0.5rem;height: 7rem;overflow: scroll;">
   <span class="thUnit modelo">
  Modelo
    <br />
    <span class="td">${unit.modelo}</span>
  </span>

  <span class="thUnit placa">
  Placa
    <br />
    <span class="td">${unit.placa}</span>
  </span>

  <span class="thUnit año" style="width: 3rem;">
  Año
    <br />
    <span class="td">${unit.año}</span>
  </span>

  <span class="thUnit verificacion">
    Verificación    <br />
    <span class="td">${unit.verificacion}</span>
  </span>

  <span class="thUnit verificacion">
    Vigencia    <br />
    <span class="td">13/08/2024 - 13/08/2025</span>
  </span>

  <span class="thUnit poliza">
  Poliza
  <br />
    <span class="td">${unit.poliza}</span>
  </span>

  <span class="thUnit poliza">
    Vigencia    <br />
    <span class="td">13/08/2024 - 13/08/2025</span>
  </span>

  <span class="thUnit tcirculacion">
  T. Circulación
  <br />
    <span class="td">WE4D78R</span>
  </span>

  <span class="thUnit tcirculacion">
    Vigencia    <br />
    <span class="td">13/08/2024 - 13/08/2025</span>
  </span>   

  <span class="thUnit ifisicomecanica">
  Ins. Fisicomecanica
  <br />
    <span class="td">WE4D78R</span>
  </span>

  <span class="thUnit ifisicomecanica">
    Vigencia    <br />
    <span class="td">13/08/2024 - 13/08/2025</span>
  </span> 

  <span class="thUnit ihumos">
  Ins. Humos
  <br />
    <span class="td">WE4D78R</span>
  </span>

  <span class="thUnit ihumos">
    Vigencia    <br />
    <span class="td">13/08/2024 - 13/08/2025</span>
  </span>   

   </div>
  </div>

  <div class="kilometrajes">
  <h5 style="width: 100%;background-color: #001a63;color: white;height: 1rem;">KILOMETRAJE</h5>

  <div class="thUnit fechaukm" style="width: 7rem;height: 2rem;">
    Fecha Ú. S.    <br />
      <input id="inputFechaUS-${unitId}"  type="text" class="td inputUnits inputFechaUS" value="${unit.fecha}" disabled>
      <i id="clockF-${unitId}" class="fa-solid fa-stopwatch none"></i>
  </div>

  <span class="thUnit kmus" style="width: 5rem;height: 2rem;">
    KM Ú. S.    <br />
      <input id="inputUS-${unitId}"  type="text" class="td inputUnits inputUServicio" value="${parseInt(unit.uservicio, 10).toLocaleString()}" disabled>
  </span>

  <span class="thUnit kmo" style="width: 5rem;height: 2rem;">
     KM Actual    <br />
    <input id="inputKMA-${unitId}"  type="text" class="td inputUnits inputUServicio" value="${parseInt(unit.contacto, 10).toLocaleString()}" disabled>
  </span>

  <span class="thUnit kmps" style="width: 5rem;height: 2rem;">
     KM Próx. S.   <br />
    <span class="td">${compareKM(unit).pservice.toLocaleString()}</span>
  </span>

  <span class="thUnit kmpss" style="width: 6rem;height: 2.5rem;text-align: center !important; ${alertService(compareKM(unit), parseInt(unit.contacto, 10))}">
     KM Restante    <br />
    <span class="td">${(compareKM(unit).pservice - parseInt(unit.contacto, 10)).toLocaleString()}</span>
  </span>

  <span class="thUnit vigkm" style="width: 7rem;height: 2.5rem;text-align: center !important;display: flex;justify-content: center;align-items: center; ${alertService(compareKM(unit), parseInt(unit.contacto, 10))}" >
    <span class="td">${mttoPreventive(compareKM(unit), parseInt(unit.contacto, 10))}</span>
  </span>

  </div>

  <div class="estatus-unidad">
  <h5 style="width: 100%;background-color: #001a63;color: white;height: 1rem;">INVENTARIO</h5>

  <div class="thUnit fechaInv" style="width: 7rem;height: 2rem;text-align:start;">
    Fecha Inventario    <br />
      <input id="inputFechaInv-${unitId}"  type="text" class="td inputUnits inputFechaInv" value="${unit.linker}" disabled>
      <i id="clockI-${unitId}" class="fa-solid fa-stopwatch none"></i>
  </div>

  <span class="thUnit circuito" style="width: 10rem;height: 2rem;text-align:start;">
    Cincuito    <br />
      <input id="inputCTO-${unitId}"  type="text" class="td inputUnits inputUServicio" style="width: 100% !important;" value="${unit.circuito}" disabled>
  </span>

  <span class="thUnit ubicacion" style="width: 10rem;height: 2rem;text-align:start;">
     Ubicación    <br />
    <input id="inputUBI-${unitId}"  type="text" class="td inputUnits inputUServicio" style="width: 100% !important;" value="${unit.ubicacion}" disabled>
  </span>

  <span class="thUnit estado" style="width: 10rem;height: 2rem;text-align:start;">
     Estatus    <br />
    <input id="inputEDO-${unitId}"  type="text" class="td inputUnits inputUServicio" style="width: 100% !important;" value="${unit.comentarios}" disabled>
  </span>

  </div>

  <div class="estatus-unidad">
  <h5 style="width: 100%;background-color: #001a63;color: white;height: 1rem;">REPORTES</h5>

  <span class="thUnit ihumos">
  O. de Trabajo     <br />
    <span class="td">F-0045</span>
  </span> 

  <span class="thUnit circuito" style="width: 10rem;height: 2rem;text-align:start;">
    Estatus de servicio    <br />
      <input id="inputCTO-${unitId}"  type="text" class="td inputUnits inputUServicio" style="width: 100% !important;background-color: green;" value="EN PROCESO" disabled>
  </span>

  <span class="thUnit ubicacion" style="width: 10rem;height: 2rem;text-align:start;">
     Accidente    <br />
    <input id="inputUBI-${unitId}"  type="text" class="td inputUnits inputUServicio" style="width: 100% !important;" value="${unit.ubicacion}" disabled>
  </span>

  </div>

  <div class="semaforeo">
    <h5 style="width: 100%;background-color: #001a63;color: white;height: 1rem;">SEMAFOREO DE LLANTAS</h5>

    <div class="content-semaforeo">
    <div class="thead-sem">
      <div class="td-sem" style="width: 115px;">Semaforó Llantas</div>
      <div class="td-sem">Pos 1</div>
      <div class="td-sem">Pos 2</div>
      <div class="td-sem">Pos 3</div>
      <div class="td-sem">Pos 4</div>
      <div class="td-sem">Pos 5</div>
      <div class="td-sem">Pos 6</div>
      <div class="td-sem">Pos 7</div>
      <div class="td-sem">Pos 8</div>
      <div class="td-sem">Pos 9</div>
      <div class="td-sem">Pos 10</div>
    </div>

    <div class="tmm-sem">
      <div class="td-sem tcol">Milimetraje</div>
      <div class="td-sem" style="background-color: #ee8e2875;">7</div>
      <div class="td-sem" style="background-color: #ee8e2875;">7</div>
      <div class="td-sem" style="background-color: #99171787;">5</div>
      <div class="td-sem" style="background-color: #017d1a4f;">12</div>
      <div class="td-sem" style="background-color: #017d1a4f;">18</div>
      <div class="td-sem" style="background-color: #99171787;">5</div>
      <div class="td-sem" style="background-color: #017d1a4f;">20</div>
      <div class="td-sem" style="background-color: #ee8e2875;">7</div>
      <div class="td-sem" style="background-color: #017d1a4f;">15</div>
      <div class="td-sem" style="background-color: #99171787;">5</div>
    </div>
    
    <div class="tmarca-sem">
      <div class="td-sem tcol">Marca</div>
      <div class="td-sem">GoodYear</div>
      <div class="td-sem">GoodYear</div>
      <div class="td-sem">GoodYear</div>
      <div class="td-sem">GoodYear</div>
      <div class="td-sem">GoodYear</div>
      <div class="td-sem">GoodYear</div>
      <div class="td-sem">GoodYear</div>
      <div class="td-sem">GoodYear</div>
      <div class="td-sem">GoodYear</div>
      <div class="td-sem">GoodYear</div>
    </div>

    <div class="tfolio-sem">
      <div class="td-sem tcol">Folio</div>
      <div class="td-sem">56248</div>
      <div class="td-sem">56248</div>
      <div class="td-sem">56248</div>
      <div class="td-sem">56248</div>
      <div class="td-sem">56248</div>
      <div class="td-sem">56248</div>
      <div class="td-sem">56248</div>
      <div class="td-sem">56248</div>
      <div class="td-sem">56248</div>
      <div class="td-sem">56248</div>
    </div>

    <div class="tdot-sem">
      <div class="td-sem tcol">DOT</div>
      <div class="td-sem">12256248</div>
      <div class="td-sem">12256248</div>
      <div class="td-sem">12256248</div>
      <div class="td-sem">12256248</div>
      <div class="td-sem">12256248</div>
      <div class="td-sem">12256248</div>
      <div class="td-sem">12256248</div>
      <div class="td-sem">12256248</div>
      <div class="td-sem">12256248</div>
      <div class="td-sem">12256248</div>
    </div>

 </div>
  
   
  </div>
  
</div>

  `;


 /* return `
<tr id="${unitId}" class="unit text-center align-middle" data-unit="${unit.unidad}" data-circuito="${unit.circuito}" data-ubicacion="${unit.ubicacion}">


<td style="font-weight: bold;">${unit.unidad}</td>
<td class="modelo">${unit.modelo}</td>
<td class="placa" >${unit.placa}</td>
<td class="año" >${unit.año}</td>
<td class="verificacion" >${unit.verificacion}</td>
<td class="poliza" >${unit.poliza}</td>
<td class="inciso">${unit.inciso}</td>
<td class="fechauserv" style="font-weight: bold;">${unit.linker}</td>
<td class="contacto" style="font-weight: bold;">${parseInt(unit.uservicio, 10).toLocaleString()}</td>
<td class="contacto" style="font-weight: bold;">${compareKM(unit).pservice.toLocaleString()}</td>
<td class="contacto" style="font-weight: bold;">${parseInt(unit.contacto, 10).toLocaleString()}</td>
<td class="contacto" style="${alertService(compareKM(unit), parseInt(unit.contacto, 10))}">${(compareKM(unit).pservice - parseInt(unit.contacto, 10))}</td>
<td class="contacto" style="${alertService(compareKM(unit), parseInt(unit.contacto, 10))}">${mttoPreventive(compareKM(unit), parseInt(unit.contacto, 10))}</td>
<td style="font-weight: bold;">${unit.circuito}</td>
<td style="font-weight: bold;">${unit.fecha}</td>
<td style="font-weight: bold; ${unit.ubicacion.match("TRANSITO") ? "background-color: #badfff;" : ""}" >${unit.ubicacion}</td> 
<td style="${alertStatus(unit)}" >${unit.comentarios}</td> 
<td class="btn-hid" style="${user === "Public" ? "display: none;" : ""}">
<button id="${unitId}" type="button" class="btn btn-sm btn-warning ordenServ" data-bs-toggle="" data-bs-target=""><i class="fa-solid fa-triangle-exclamation" id="${unitId}"></i></button>
<button id="${unitId}" type="button" class="btn btn-sm btn-danger delete" style="${user === "CVehicular" ? "" : "display: none;"}"><i class="fa-solid fa-trash" id="${unitId}"></i></button>  
</td>

</tr>
`;*/
}

//BOTON CONTROL VEHICULAR <button id="${item.unidad}" style="${item.unidad || item.caja ? "display: inherit;" : "display: none;"}" data-uniteyance="${item.caja}" type="button" class="btn btn-sm btn-dark control" data-bs-toggle="modal" data-bs-target="#controlModal"><i data-uniteyance="${item.caja}" class="fa-solid fa-car" id="${item.unidad}"></i></button>
// <button id="${unit[0]}" type="button" class="btn btn-sm btn-primary edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pencil" id="${unit[0]}"></i></button>