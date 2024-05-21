export function Login () {    
  const $login = document.createElement("section");
  $login.classList.add("login");

    $login.innerHTML = `
    <div id="form" class="pageLogin">
  
        
         
            <form id="form" class="loginForm">
             <div class="cardForm">

              <div class="logoLogin">
              <img src="../app/assets/logo-sample.png" alt="logo">            

              </div>

               <div class="formSection">
                <div class="titleForm">
                  <h2>ON TIME</h2>
                </div>
                <div class="inputsForm">
                  <h3 class="">Iniciar Sesión</h3>
                 <input type="text" id="typeEmailX-2" class="input" placeholder="Usuario" required/>
                 <input type="password" id="typePasswordX-2" class="input" placeholder="Contraseña" required/>
                 </div>

                  <button class="btnUser" type="submit">Entrar</button>

              </div>
             </form>
   
         

     </div>
          `;
    
   
    return $login;
}


