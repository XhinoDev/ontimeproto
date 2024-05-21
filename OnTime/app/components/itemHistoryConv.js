export function itemHistoryConv(conv, keyUpdate) {
    let convId, user = localStorage.username;
  
    if(!keyUpdate){
      convId = conv[0];
      conv = conv[1];
   } else {
      convId = keyUpdate;
   }
    

  
    //console.log(conv);
  
    return `
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
    <td class="diasT" ></td>
    <td class="Ubi">${conv.ubicacion}</td> 
    <td class="" >${conv.comentarios}</td>
    <td >${conv.reporte}</td> 
    <td class="btn-hid">04/04/2024</td>    
    </tr>
  `;
  }
  
  //BOTON CONTROL VEHICULAR <button id="${item.unidad}" style="${item.unidad || item.caja ? "display: inherit;" : "display: none;"}" data-conveyance="${item.caja}" type="button" class="btn btn-sm btn-dark control" data-bs-toggle="modal" data-bs-target="#controlModal"><i data-conveyance="${item.caja}" class="fa-solid fa-car" id="${item.unidad}"></i></button>
  // <button id="${conv[0]}" type="button" class="btn btn-sm btn-primary edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pencil" id="${conv[0]}"></i></button>