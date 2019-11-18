//let silly = document.querySelectorAll(".silly");
let container = document.querySelector(".container");
let body = document.querySelector("body");

let colorArray = [
  "red",
  "blue",
  "black",
  "green",
  "yellow",
  "aquamarine",
  "beige",
  "white",
  "coral",
  "gold",
  "lightsalmon",
  "teal",
  "crimson",
  "olive"
];

for (let i = 0; i < 250; i++) {
  let button = document.createElement("button");
  button.innerHTML = "Don't Click";
  button.className += "silly";
  document.getElementById("con").appendChild(button);
}
let silly = document.querySelectorAll(".silly");
for (let i = 0; i < silly.length; i++) {
  silly[i].addEventListener("mouseover", function() {
    for (let j = 0; j < silly.length; j++) {
      for (let k = 0; k < 5; k++) {
        silly[k].style.color = "blue";
        silly[k].style.fontWeight = "bold";
        silly[i].style.color = "red";
      }
      (silly[j].style.left = Math.random() * 95 + "vw"),
        (silly[j].style.top = Math.random() * 100 + "vh");
    }
    let randomChance = Math.floor(Math.random() * 10);
    if (randomChance === 3) {
      let randomIndex = Math.floor(Math.random() * colorArray.length);
      body.style.backgroundColor = colorArray[randomIndex];
    }
  });
}
