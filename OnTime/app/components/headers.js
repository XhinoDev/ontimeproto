export function Headers () {
 
    const $menu = document.createElement("div");
    $menu.classList.add("container-header");
    $menu.innerHTML = ` 
    <h1>On Time Delivery</h1> 
    <ul class="head-ul">
    ${localStorage.tabViajes === "true" ? `
    <li class="head-li productivos">
    <a class="productivos">Productivos</a>
  </li>
  <li class="head-li retornables">
    <a>Retornables</a>
  </li>
  <li class="head-li historial">
    <a>Historial</a>
  </li>
    `
     : `
     
    `}
    </ul>      
    `;
    return $menu;
}

/* <h1 class="logo">INTLOGIS</h1>
      <h3 class="logo">On Time</h3>

       
      */