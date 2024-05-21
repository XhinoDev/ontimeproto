import { clockToday } from "./clocktoday.js";


export function Main() {
  const d = document;
  const $main = d.createElement("main");
  $main.id = "main";
  $main.appendChild(clockToday());
 

  //console.log(localStorage.username);

  
  //console.log(location.hash);
  $main.insertAdjacentHTML("beforeend", `
      
      <div class="container-main">
        <div class="header-main">
          <div class="detail-header-main">

           
              <div class="container-table">
                  <div id="thtable">
          
            
                  </div>
               </div>
          </div>
      </div>
  </div>
`); 



  return $main;
}
