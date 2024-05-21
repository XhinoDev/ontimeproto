

export function Aside () {
    const $aside = document.createElement("div");
    $aside.setAttribute("id", "nav");
    $aside.classList.add("nav");

    

     $aside.innerHTML = `
    
      <div class="container-nav">
        <div class="perfil">
        <img src="../app/assets/logoBcTR.png" alt="logo">
          <h3>INTLOGIS S.A. de C.V.</h3>
        </div>

        <ul class="nav-ul">
        <li class="menu">
        <i class="fa-solid fa-bars" style="color: white; aling-self"></i>
        </li>
          <li class="nav-li tablero">
          <span class="item-tablero">Tablero de viajes</span>
          <i class="fa-solid fa-calendar-days" style="color: white;  font-size: 1.2rem;"></i> 
          </li>
          <li class="nav-li carga"> 
          <span class="item-carga">Carga de viajes</span>
          <i class="fa-solid fa-file-import" style="color: white; font-size: 1.2rem;"></i>
          </li>
          <li class="nav-li operadores">
          <span class="item-op">Operadores</span>
          <i class="fa-solid fa-users-viewfinder" style="color: white; font-size: 1.2rem;"></i>
          </li>
          <li class="nav-li cv">
          <span class="item-cv">Control Vehicular</span>
          <i class="fa-solid fa-truck-front" style="color: white; font-size: 1.2rem;"></i>
          </li>
        </ul>

        <div class="session">
        <div class="username">
        <i class="fa-solid fa-user-tie" style="color: white; font-size: 5rem;"></i>
        <h2>${localStorage.user}</h2>
        <span>${localStorage.puesto}</span>
        </div>

        <div class="logout">Cerrar Sesión</div>
        </div>
      </div>
   
      
    `;
    return $aside;
}

//<span>Perfil de Usuario</span>