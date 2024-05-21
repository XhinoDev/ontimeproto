export function clockToday() {
  let date = new Date();
  const $clock = document.createElement("div");
  $clock.classList.add("dateToday");
  $clock.innerHTML = `
    
    <span class="date">${date.toLocaleDateString('es-MX', { weekday:"long", year:"numeric", month:"short", day:"numeric"}).toUpperCase()}</span>
    <span class="clock"></span>
    `;

    return $clock;
}
