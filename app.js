let silly = document.getElementById("silly");
let container = document.querySelector(".container");
let para = document.querySelector(".para");

container.addEventListener("click", function() {
  para.style.display = "none";
});

silly.addEventListener("mouseover", function() {
  (silly.style.left = Math.random() * 95 + "vw"),
    (silly.style.top = Math.random() * 100 + "vh");
});
