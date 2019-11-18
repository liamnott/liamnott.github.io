let silly = document.getElementById("sillyButton");
let container = document.querySelector(".container");
let para = document.querySelector(".para");
let time = document.getElementById("time");
var header = document.getElementById("header");
let linkButton = document.getElementsByClassName("linkButton");
const body = document.querySelector("body");

window.onload = function() {
  // a couple of fonts require double parentheses for some reason
  let fontType = [
    "'Libre Barcode 39 Text'",
    "Bungee Shade",
    "Aldrich",
    "Roboto Mono",
    "Arial",
    "Metal Mania",
    "Electrolize",
    "Caesar Dressing",
    "Caveat",
    "Cinzel Decorative",
    "Finger Paint",
    "EB Garamond",
    "MedievalSharp",
    "Oswald",
    "IM Fell English SC",
    "Overpass Mono",
    "'Press Start 2P'",
    "Happy Monkey",
    "Playfair Display",
    "Rock Salt",
    "Sancreek",
    "Special Elite",
    "VT323",
    "New Rocker",
    "Cedarville Cursive",
    "Audiowide",
    "Asar",
    "Fascinate",
    "Kelly Slab",
    "Lora",
    "Megrim",
    "Metamorphous",
    "Quintessential",
    "Russo One",
    "Walter Turncoat",
    "Atomic Age",
    "Syncopate",
    "Julee",
    "Monofett",
    "Spectral",
    "Notable",
    "Monoton",
    "UnifrakturMaguntia",
    "Mr Dafoe",
    "Orbitron",
    "Bangers",
    "Philosopher",
    "Geostar Fill",
    "Times New Roman",
    "Georgia",
    "Trebuchet",
    "Palatino Linotype"
  ];
  header.style.opacity = "0";
  pickFont(fontType);
};

function pickFont(fonts) {
  let num = Math.floor(Math.random() * fonts.length);
  //let num = 19;
  header.style.fontFamily = fonts[num];
  //header.style.fontFamily = fonts[1];
  if (num === 1 || num === 19) {
    header.style.marginTop = "25vh";
  } else {
    header.style.marginTop = "35vh";
  }
  if (num === 0 || num === 1) {
    header.style.fontWeight = "700";
  }

  header.style.opacity = "1";
}

window.addEventListener("wheel", function(e) {
  body.style.overflow = "auto";
  let x = window.pageYOffset;
  if (x > 400) {
    setBackgroundColor();
  } else {
    body.style.background = "white";
  }
});

function setBackgroundColor() {
  body.style.backgroundColor = `rgb(
                ${Math.floor(Math.random() * 50) + 206},
                ${Math.floor(Math.random() * 50) + 206},
                ${Math.floor(Math.random() * 50) + 206}
              )`;
}

// function scrollFunction() {
//   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//     header.style.fontSize = "3rem";
//     header.style.background = "url('images/scroll-white.png')";
//   } else {
//     header.style.fontSize = "6rem";
//     header.style.background = "url('images/scroll-transparent.png')";
//   }
// }
