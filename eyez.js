let balls = document.querySelectorAll(".ball");

balls.forEach(ball => {
  document.addEventListener("mousemove", moveEyez, false);
  document.addEventListener("touchmove", moveEyez, false);
});

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
