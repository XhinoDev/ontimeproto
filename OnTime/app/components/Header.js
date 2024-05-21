import { Headers } from "./headers.js";

export function Header (){
    const $header = document.createElement("header");
    $header.classList.add("header");
    $header.appendChild(Headers());
    return $header;
}
