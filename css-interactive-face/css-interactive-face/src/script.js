let face = document.querySelector(".face");
let body = document.querySelector("body");

face.addEventListener('mouseover', function() {
  face.classList.add("class", "red");
  face.classList.add("class", "grow");
})
face.addEventListener('mouseout', function() {
  face.classList.remove("class", "red");
  face.classList.remove("class", "grow");
})
