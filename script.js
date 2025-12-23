const TOTAL = 54;

// Nombres de las cartas
const nombres = [
  "La Nelita","El Prieto","El Borracho","La Jubilada","La Fotogénica",
  "El Carpintero","El Mil Amores","La Desfigurada","La Química","El Enojón",
  "El Artesano","La Maestra","La Secretaria","El Apachito","El Chivo",
  "La Gringa","El Mentiroso","El Inge","La Chipilona","La Bailarina",
  "El Mingao","El Greñas","La Doctora","La Paulita","El Primo",
  "La Futbolista","La Fiona","La Tristeza","La Chaparrita","La Bebé",
  "La Kira","El Bruno","La Nina","La Lana","El Toby",
  "El Chiquitín","El Entierro","El Lomo","Las Lentejas","El Cantante",
  "El Patrón","Los Chiltepines","La Viejita","La Rata","El Cochi",
  "El Arbolito","Los Buñuelos","El Alacrán","El Chicote","El Cerro",
  "La Machaca","El Pozole","Los Tamales","La Falita"
];

let cartas = [];
let indice = 0;
let temporizador = null;

// Elementos del DOM
const startBtn = document.getElementById("startBtn");
const inicio = document.getElementById("inicio");
const app = document.getElementById("app");
const imagen = document.getElementById("carta");
const reiniciarBtn = document.getElementById("reiniciar");

// Mezclar cartas
function mezclar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Voz
function hablar(texto) {
  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = "es-MX";
  voz.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(voz);
}

// Iniciar lotería
function iniciar() {
  cartas = Array.from({ length: TOTAL }, (_, i) => i);
  mezclar(cartas);
  indice = 0;
  reiniciarBtn.hidden = true;

  mostrarSiguiente();
  temporizador = setInterval(mostrarSiguiente, 3000);
}

// Mostrar carta
function mostrarSiguiente() {
  if (indice >= cartas.length) {
    clearInterval(temporizador);
    reiniciarBtn.hidden = false;
    return;
  }

  const n = cartas[indice++];
  imagen.src = cartas/carta${String(n + 1).padStart(2, "0")}.png;
  hablar("Corre y se va con " + nombres[n]);
}

// Eventos
startBtn.addEventListener("click", () => {
  inicio.style.display = "none";
  app.style.display = "flex";
  iniciar();
});

reiniciarBtn.addEventListener("click", iniciar);
