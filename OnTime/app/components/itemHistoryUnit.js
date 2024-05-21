export function itemHistoryUnit(unit, keyUpdate) {
    let unitId, user = localStorage.username;
  
    if(!keyUpdate){
      unitId = unit[0];
      unit = unit[1];
   } else {
      unitId = keyUpdate;
   }
    

  
    //console.log(unit);
  
    return `
  <tr id="${unitId}" class="item text-center align-middle" data-unit="${unit.unidad}" data-circuito="${unit.circuito}" data-ubicacion="${unit.ubicacion}">
  
  
  <td style="font-weight: bold;">${unit.unidad}</td>
  <td class="modelo">${unit.modelo}</td>
  <td class="placa" >${unit.placa}</td>
  <td class="año" >${unit.año}</td>
  <td class="verificacion" >${unit.verificacion}</td>
  <td class="poliza" >${unit.poliza}</td>
  <td class="inciso">${unit.inciso}</td>
  <td class="fechauserv" style="font-weight: bold;">${unit.fechaUServicio}</td>
  <td class="kmuservicio" style="font-weight: bold;">${unit.kmuservicio}</td>
  <td class="kmpservicio" style="font-weight: bold;">${unit.kmpservicio}</td>
  <td class="kmodometro" style="font-weight: bold;">${unit.kmodometro}</td>
  <td class="kmsigservicio" >${unit.kmsigservicio}</td>
  <td class="mttoprev">${unit.mttoprev}</td>
  <td style="font-weight: bold;">${unit.circuito}</td>
  <td style="font-weight: bold;">${unit.fechainv}</td>
  <td style="font-weight: bold;">${unit.ubicacion}</td> 
  <td >${unit.comentarios}</td> 
  <td class="datetoday" style="font-weight: bold;">${unit.fecharegistro}</td>
  
  </tr>
  `;
  }
  
  //BOTON CONTROL VEHICULAR <button id="${item.unidad}" style="${item.unidad || item.caja ? "display: inherit;" : "display: none;"}" data-uniteyance="${item.caja}" type="button" class="btn btn-sm btn-dark control" data-bs-toggle="modal" data-bs-target="#controlModal"><i data-uniteyance="${item.caja}" class="fa-solid fa-car" id="${item.unidad}"></i></button>
  // <button id="${unit[0]}" type="button" class="btn btn-sm btn-primary edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pencil" id="${unit[0]}"></i></button>