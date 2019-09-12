let balls = document.querySelectorAll(".ball");
let mouth = document.querySelector(".mouth");
let eye = document.querySelector(".eye");
let container = document.querySelector(".container");

balls.forEach(ball => {
  document.addEventListener("mousemove", moveEyez, false);
});

/* container.addEventListener("click", mouthEffect); */

function moveEyez() {
  balls.forEach(ball => {
    let x = (event.clientX * 100) / window.innerWidth + "%";
    let y = (event.clientY * 100) / window.innerHeight + "%";
    console.log(x, y);
    console.log(window.innerWidth, window.innerHeight);
    ball.style.left = x;
    ball.style.top = y;
    ball.style.transform = "translate(-" + x + ",-" + y + ")";
  });
}
container.addEventListener("mousedown", function(e) {
  setTimeout(function() {
    mouth.classList.toggle("mouthAppears");
  }, 500);
});
/* function mouthEffect() {
  console.log("click");
  mouth.classList.toggle("mouthAppears");
} */

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
  "lightsalmon"
];
document.body.onkeyup = function(e) {
  switch (e.keyCode) {
    case 75:
      if (eye.style.background === "red") {
        eye.style.background = "white";
      } else {
        eye.style.background = "red";
      }
      console.log("case 75");
      break;
    case 8:
      let randomIndex = Math.floor(Math.random() * colorArray.length);
      balls.forEach(ball => {
        ball.style.borderColor = colorArray[randomIndex];
      });
      console.log("case 8");
  }
};
/* document.body.onkeyup = function(e) {
  if (e.keyCode == 32) {
    ball.style.borderColor = "red";
  }
}; */
