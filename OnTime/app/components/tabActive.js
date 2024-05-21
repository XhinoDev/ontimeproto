export function tabActive(tab) {
  let d = document;
  let productivos = d.querySelector(".productivos"),
    retornables = d.querySelector(".retornables"),
    historial = d.querySelector(".historial"),
    cajas = d.querySelector(".cajas"),
    cargam = d.querySelector(".cargam"),
    operadores = d.querySelector(".operadores-li"),
    unidades = d.querySelector(".unidades"),
    historialUnidades = d.querySelector(".historialUnidades"),
    historialCajas = d.querySelector(".historialCajas");

  
  if (tab === "productivos") {
    localStorage.tabConveyance = false;
    localStorage.tabViajes = true;
    localStorage.tabUnit = false;
    localStorage.tabCarga = false;
    localStorage.tabOperadores = false;
    localStorage.histrack = false;
    historial.style.color = "";
    historial.style.backgroundColor = "";
    historial.style.fontWeight = "";

    retornables.style.color = ""; 
    retornables.style.backgroundColor = "";
    retornables.style.fontWeight = "";

    productivos.style.color = "rgb(4, 40, 71)";
    productivos.style.backgroundColor = "#a1bde7";
    productivos.style.fontWeight = "bold";

    
    /*
    cajas.style.color = "";
    cajas.style.backgroundColor = "";
    cajas.style.borderColor = "";

    unidades.style.color = "";
    unidades.style.backgroundColor = "";
    unidades.style.borderColor = "";

    historialUnidades.style.color = "";
    historialUnidades.style.backgroundColor = "cadetblue";
    historialUnidades.style.borderColor = "";

    historialCajas.style.color = "";
    historialCajas.style.backgroundColor = "cadetblue";
    historialCajas.style.borderColor = "";*/
  } else if (tab === "retornables") {
    localStorage.tabConveyance = false;
    localStorage.tabViajes = true;
    localStorage.tabUnit = false;
    localStorage.histrack = false;

    productivos.style.color = "";
    productivos.style.backgroundColor = "";
    productivos.style.fontWeight = "";

    historial.style.color = "";
    historial.style.backgroundColor = "";
    historial.style.fontWeight = "";

    retornables.style.color = "rgb(4, 40, 71)"; 
    retornables.style.backgroundColor = "#a1bde7";
    retornables.style.fontWeight = "bold";

   /* d.getElementById("cajas").style.color = "";
    d.getElementById("cajas").style.backgroundColor = "";
    d.getElementById("cajas").style.borderColor = "";

    d.getElementById("unidades").style.color = "";
    d.getElementById("unidades").style.backgroundColor = "";
    d.getElementById("unidades").style.borderColor = "";

    d.getElementById("historialUnidades").style.color = "";
    d.getElementById("historialUnidades").style.backgroundColor = "cadetblue";
    d.getElementById("historialUnidades").style.borderColor = "";

    d.getElementById("historialCajas").style.color = "";
    d.getElementById("historialCajas").style.backgroundColor = "cadetblue";
    d.getElementById("historialCajas").style.borderColor = "";*/

  } else if (tab === "historial") {
    localStorage.tabConveyance = false;
    localStorage.tabViajes = true;
    localStorage.tabUnit = false;
    localStorage.histrack = true;

    productivos.style.color = "";
    productivos.style.backgroundColor = "";
    productivos.style.fontWeight = "";

    retornables.style.color = ""; 
    retornables.style.backgroundColor = "";
    retornables.style.fontWeight = "";

    historial.style.color = "rgb(4, 40, 71)";
    historial.style.backgroundColor = "#a1bde7";
    historial.style.fontWeight = "bold";
/*
    d.getElementById("cajas").style.color = "";
    d.getElementById("cajas").style.backgroundColor = "";
    d.getElementById("cajas").style.borderColor = "";

    d.getElementById("unidades").style.color = "";
    d.getElementById("unidades").style.backgroundColor = "";
    d.getElementById("unidades").style.borderColor = "";

    d.getElementById("historialUnidades").style.color = "";
    d.getElementById("historialUnidades").style.backgroundColor = "cadetblue";
    d.getElementById("historialUnidades").style.borderColor = "";

    d.getElementById("historialCajas").style.color = "";
    d.getElementById("historialCajas").style.backgroundColor = "cadetblue";
    d.getElementById("historialCajas").style.borderColor = "";*/
  } else if (tab === "cajas") {
    localStorage.tabConveyance = true;
    localStorage.tabViajes = false;
    localStorage.tabUnit = false;

    unidades.style.color = "";
    unidades.style.backgroundColor = "";
    unidades.style.fontWeight = "";

    cajas.style.color = "rgb(4, 40, 71)";
    cajas.style.backgroundColor = "#a1bde7";
    cajas.style.fontWeight = "bold";

    historialUnidades.style.color = "";
    historialUnidades.style.backgroundColor = "";
    historialUnidades.style.fontWeight = "";

    historialCajas.style.color = "";
    historialCajas.style.backgroundColor = "";
    historialCajas.style.fontWeight = "";
  } else if (tab === "unidades") {
    localStorage.tabViajes = false;
    localStorage.tabCarga = false;
    localStorage.tabOperadores = false;
    localStorage.tabUnit = true;
    localStorage.tabUnitH = false;
    localStorage.tabRem = false;
    localStorage.tabRemH = false;
    localStorage.histrack = false;
    

    unidades.style.color = "rgb(4, 40, 71)";
    unidades.style.backgroundColor = "#a1bde7";
    unidades.style.fontWeight = "bold";

    cajas.style.color = "";
    cajas.style.backgroundColor = "";
    cajas.style.fontWeight = "";

    historialUnidades.style.color = "";
    historialUnidades.style.backgroundColor = "";
    historialUnidades.style.fontWeight = "";

    historialCajas.style.color = "";
    historialCajas.style.backgroundColor = "";
    historialCajas.style.fontWeight = "";
  } else if (tab === "hCajas") {
    localStorage.tabUnit = false;
    localStorage.tabUnitH = false;
    localStorage.tabRem = false;
    localStorage.tabRemH = true;

    unidades.style.color = "";
    unidades.style.backgroundColor = "";
    unidades.style.fontWeight = "";

    cajas.style.color = "";
    cajas.style.backgroundColor = "";
    cajas.style.fontWeight = "";

    historialUnidades.style.color = "";
    historialUnidades.style.backgroundColor = "";
    historialUnidades.style.fontWeight = "";

    historialCajas.style.color = "rgb(4, 40, 71)";
    historialCajas.style.backgroundColor = "#a1bde7";
    historialCajas.style.fontWeight = "bold";
  } else if (tab === "hUnidades") {
     localStorage.tabUnit = false;
    localStorage.tabUnitH = true;
    localStorage.tabRem = false;
    localStorage.tabRemH = false;

    unidades.style.color = "";
    unidades.style.backgroundColor = "";
    unidades.style.fontWeight = "";

    cajas.style.color = "";
    cajas.style.backgroundColor = "";
    cajas.style.fontWeight = "";

    historialUnidades.style.color = "rgb(4, 40, 71)";
    historialUnidades.style.backgroundColor = "#a1bde7";
    historialUnidades.style.fontWeight = "bold";

    historialCajas.style.color = "";
    historialCajas.style.backgroundColor = "";
    historialCajas.style.fontWeight = "";
  } else if (tab === "cargam") {
    localStorage.tabConveyance = false;
    localStorage.tabViajes = false;
    localStorage.tabUnit = false;
    localStorage.tabCarga = true; 
    localStorage.tabOperadores = false;
    localStorage.tabUnit = false;
    localStorage.tabUnitH = false;
    localStorage.tabRem = false;
    localStorage.tabRemH = false;

    cargam.style.color = "rgb(4, 40, 71)";
    cargam.style.backgroundColor = "#a1bde7";
    cargam.style.fontWeight = "bold";
  } else if (tab === "operadores") {
    localStorage.tabConveyance = false;
    localStorage.tabViajes = false;
    localStorage.tabUnit = false;
    localStorage.tabCarga = false;
    localStorage.tabOperadores = true;
    localStorage.tabUnit = false;
    localStorage.tabUnitH = false;
    localStorage.tabRem = false;
    localStorage.tabRemH = false;

    operadores.style.color = "rgb(4, 40, 71)";
    operadores.style.backgroundColor = "#a1bde7";
    operadores.style.fontWeight = "bold";
  }
}
