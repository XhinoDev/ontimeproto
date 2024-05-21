import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

import { Loader } from "./components/Loader.js";
import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { Router } from "./components/Router.js";
import { Login } from "./components/Login.js";
import wp_api from "./helpers/wp_api.js";
import { Aside } from "./components/aside.js";

const firebaseConfig = {
  apiKey: wp_api.API_KEY,
  authDomain: wp_api.AUTH_DOMAIN,
  databaseURL: wp_api.DB_URL,
  projectId: wp_api.PROJECT_ID,
  storageBucket: wp_api.STORAGE_BUCKET,
  messagingSenderId: wp_api.MESSAGIN_SENDERING_ID,
  appId: wp_api.APP_ID,
};

const d = document;

export function App() {
  const $root = d.getElementById("root");
  $root.innerHTML = null;

  const app = initializeApp(firebaseConfig);

  const auth = getAuth();

  signInWithEmailAndPassword(auth, wp_api.USER, wp_api.PASS)
    .then((userCredential) => {
      // Signed in
      //const user = userCredential.user;
      //console.log(user);

      const db = getDatabase(app),
        refUsers = ref(db, "users");
        if (!localStorage.login) {  
        window.location.hash = "#/login";
        localStorage.clear();
        $root.style= "background-color: #98bbff00;";
        $root.appendChild(Login());

        const $form = d.querySelector("#form");

        $form.addEventListener("submit", async (e) => {
          e.preventDefault();

          const username = d.querySelector("#typeEmailX-2").value,
            password = d.querySelector("#typePasswordX-2").value;

          const data = {
            username: username,
            password: password,
          };

          if (e.target.id === "form") {
            get(refUsers).then((snapshot) => {
              let res = snapshot.val();

              res.forEach((e) => {
                if (
                  e.username === `${data.username}` &&
                  e.pass === `${data.password}`
                ) {
                  //console.log("Acceso Completo");
                  localStorage.login = true;
                  localStorage.username = data.username;
                  localStorage.user = e.name;
                  localStorage.area = e.area;
                  localStorage.puesto = e.puesto;
                  document.querySelector(".login").style = "display: none;";
                  $root.style= "background-color: #b5d4ffe0;";
                  $root.appendChild(Header());
                  $root.appendChild(Aside());
                  $root.appendChild(Main());
                  document.getElementById("thtable").appendChild(Loader());
                  if(e.area === "Operaciones") {
                    window.location.hash = "#/tablero/productivo"                 
                  } else  if(e.area === "Calidad") {
                    window.location.hash = "#/tablero/productivo"                 
                  } else if(e.area === "Mantenimiento") {
                    window.location.hash = "#/mantenimiento/unidades"
                  } else if(e.area === "Control Vehicular"){  
                    window.location.hash = "#/mantenimiento/unidades"
                  };
                  Router();
                    
                }
              });
              if(!localStorage.login) return alert("Usuario y/o Contraseña Incorrecto");
            });
          }
          
        });
      } else
      if (localStorage.login) {
        
       // window.location.hash = "#/tablero/productivo";
        
        $root.appendChild(Header());
        $root.appendChild(Aside());
        $root.appendChild(Main());
        document.getElementById("thtable").appendChild(Loader());
        Router();
        document.querySelector(".login").style = "display: none;";
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  // console.log(db);
  // console.log(refItems);
}
