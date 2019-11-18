let root = document.documentElement;
let body = document.querySelector("body");
let container = document.getElementById("con");
let wow = document.getElementById("wow");
let scoreDisplay = document.querySelector("#score");
let streakDisplay = document.querySelector("#streak");
let longestDisplay = document.querySelector("#longest");
let green = document.querySelector(".green");
let buttons = document.querySelectorAll("button");
let tutorial = false;
let numButtons = 250;
let moveXButtons = document.querySelectorAll(".moveX");
let x = null;
let y = null;
let greenX = 0;
let greenY = 0;
let timeout;
var greenID;
var coords;

if (tutorial) {
  numButtons = 150;
}
const setBackgroundColor = () => {
  body.style.backgroundColor = `rgb(
          ${Math.floor(Math.random() * 50) + 206},
          ${Math.floor(Math.random() * 50) + 206},
          ${Math.floor(Math.random() * 50) + 206}
        )`;
};

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * max + min);
};

// // simulate click every second to prevent cursor camping
// setInterval(function() {
//   document.elementFromPoint(0, 0).click();
//   console.log("click");
// }, 500);
setInterval(function() {
  let mouseX = getMouseX();
  let mouseY = getMouseY();
  simulate(con, "click", { pointerX: mouseX, pointerY: mouseY });
}, 500);

// for grace period after scoring - gracePeriod is time seconds
let scoreTime, initTime, currentTime;
let timeDiff;
let gracePeriod = 0.5;
// for scoring
let score = 0;
let streak = 0;
var longest = 0;

// get mouse coordinates
document.addEventListener("mousemove", onMouseUpdate, false);
document.addEventListener("mouseenter", onMouseUpdate, false);

function onMouseUpdate(e) {
  x = e.clientX;
  y = e.clientY;
}
function getMouseX() {
  return x;
}
function getMouseY() {
  return y;
}
//end mouse coordinates
setGreenButton();
green = document.querySelector(".green");
initializeButtons();

// Detect when cursor moves out of viewport
document.addEventListener("mouseleave", function(event) {
  if (
    event.clientY <= 0 ||
    event.clientX <= 0 ||
    event.clientX >= window.innerWidth ||
    event.clientY >= window.innerHeight
  ) {
    initializeButtons();
    streak = 0;
    streakDisplay.innerHTML = `${streak}`;
  }
});
// End cursor viewport detection
green.addEventListener("click", greenListener);

function greenListener() {
  scoreTime = new Date();
  score += 1;
  streak += 1;
  if (streak > longest) {
    longest = streak;
  }
  scoreDisplay.innerHTML = `${score}`;
  streakDisplay.innerHTML = `${streak}`;
  longestDisplay.innerHTML = `${longest}`;
  greenX = getRandomInteger(0, 95);
  greenY = getRandomInteger(0, 95);
  (green.style.left = `${greenX}vw`), (green.style.top = `${greenY}vh`);
  initializeButtons();
}

function buttonOver() {
  //ALLOW A GRACE PERIOD AFTER SCORING or initialization
  currentTime = new Date();
  timeDiff = (currentTime - scoreTime) / 750;
  timeDiff2 = (currentTime - initTime) / 750;
  if (timeDiff < gracePeriod || timeDiff2 < gracePeriod) {
    wow.classList.toggle("transition");
    setTimeout(function() {
      wow.classList.toggle("transition");
    }, 10);
  } else {
    // RE-INITIALIZE BUTTONS
    initializeButtons(numButtons);
    buttons = document.querySelectorAll("button");
    if (streak > longest) {
      longest = streak;
    }

    streakDisplay.innerHTML = `${streak}`;
    longestDisplay.innerHTML = `${longest}`;
  }
  initTime = new Date();
}
function initializeButtons() {
  // REMOVE EXISTING BUTTONS that are not green
  let buttons = document.querySelectorAll("button");
  if (buttons) {
    for (let i = 1; i < buttons.length; i++) {
      buttons[i].removeEventListener("mouseover", buttonOver);
      buttons[i].removeEventListener("click", buttonOver);
      container.removeChild(buttons[i]);
    }
  }
  // SET BACKGROUND COLOR
  setBackgroundColor();
  // SET CLICK ME BUTTON

  setOtherButtons(tutorial);
  // CHANGE GREEN BUTTON POSITION
  greenX = getRandomInteger(0, 95);
  greenY = getRandomInteger(0, 95);
  (green.style.left = `${greenX}vw`), (green.style.top = `${greenY}vh`);
}

function setGreenButton() {
  greenX = getRandomInteger(0, 95);
  greenY = getRandomInteger(0, 95);
  var button = document.createElement("button");
  button.setAttribute("id", "bigGreen");
  button.innerHTML = "Click Here!";
  button.className += "green";
  container.appendChild(button);
  green = document.querySelector(".green");
  (green.style.left = `${greenX}vw`), (green.style.top = `${greenY}vh`);
  greenID = document.getElementById("bigGreen");
}

function setOtherButtons(tut) {
  if (!tut) {
    var numRedButtons = getRandomInteger(2, 4);
    var numBlueButtons = getRandomInteger(4, 8);
    var numRed2Buttons = 1;
    var numOrangeButtons = getRandomInteger(1, 2);
    var numBlue2Buttons = getRandomInteger(1, 3);
  } else {
    var numRedButtons = getRandomInteger(2, 4);
    var numBlueButtons = getRandomInteger(4, 8);
    var numRed2Buttons = 1;
    var numOrangeButtons = getRandomInteger(1, 2);
    var numBlue2Buttons = getRandomInteger(1, 3);
  }
  var numBlackButtons =
    numButtons -
    numRedButtons -
    numBlueButtons -
    numRed2Buttons -
    numOrangeButtons -
    numBlue2Buttons;
  //CREATE RED BUTTONS
  for (let i = 1; i < numRedButtons + 1; i++) {
    let button = document.createElement("button");
    button.className = "red";
    button.innerHTML = "Guard";
    button.style.color = "red";
    coords = setCoords();
    button.style.left = coords[0] + "vw";
    button.style.top = coords[1] + "vh";
    if (Math.random() >= 0.5) {
      button.className += " moveX";
    } else {
      button.className += " moveY";
    }
    button.style.display = "none";
    document.getElementById("con").appendChild(button);
    rectangle = button.getBoundingClientRect();
    rectX1 = rectangle.left;
    rectY1 = rectangle.top;
    rectX2 = rectangle.right;
    rectY2 = rectangle.bottom;
    xMouse = getMouseX();
    yMouse = getMouseY();
    if (!checkBoundary(rectX1, rectY1, rectX2, rectY2, xMouse, yMouse)) {
      button.style.display = "block";
    }
  }
  setRedMotion();
  // maximum of 6 moveXButtons
  moveXButtons = document.querySelectorAll(".moveX");
  for (i = 1; i < moveXButtons.length; i++) {
    moveXButtons[i].className += `${i}`;
  }
  //CREATE BLUE BUTTONS
  for (let i = 1; i < numBlueButtons + 1; i++) {
    let button = document.createElement("button");
    button.className = "blue";
    button.innerHTML = "Security Camera";
    button.style.color = "blue";
    coords = setCoords();

    button.style.left = coords[0] + "vw";
    button.style.top = coords[1] + "vh";
    if (Math.random() < 0.5) {
      button.className += " rotateReverse";
    } else {
      button.className += " rotate";
    }
    button.left = button.style.left - 5;
    button.style.display = "none";
    document.getElementById("con").appendChild(button);
    rectangle = button.getBoundingClientRect();
    rectX1 = rectangle.left;
    rectY1 = rectangle.top;
    rectX2 = rectangle.right;
    rectY2 = rectangle.bottom;
    xMouse = getMouseX();
    yMouse = getMouseY();
    if (!checkBoundary(rectX1, rectY1, rectX2, rectY2, xMouse, yMouse)) {
      button.style.display = "block";
    }
  }
  //CREATE RED2 BUTTONS
  for (let i = 1; i < numRed2Buttons + 1; i++) {
    let button = document.createElement("button");
    button.className = "red2";
    button.innerHTML = "Guard";
    button.style.color = "red";
    coords = setCoords();

    button.style.left = coords[0] + "vw";
    button.style.top = coords[1] + "vh";
    button.style.display = "none";
    document.getElementById("con").appendChild(button);
    rectangle = button.getBoundingClientRect();
    rectX1 = rectangle.left;
    rectY1 = rectangle.top;
    rectX2 = rectangle.right;
    rectY2 = rectangle.bottom;
    xMouse = getMouseX();
    yMouse = getMouseY();
    if (!checkBoundary(rectX1, rectY1, rectX2, rectY2, xMouse, yMouse)) {
      button.style.display = "block";
    }
  }
  //CREATE ORANGE BUTTONS
  for (let i = 1; i < numOrangeButtons + 1; i++) {
    let button = document.createElement("button");
    button.className = "orange";
    button.innerHTML = "orange";
    button.style.color = "orange";
    coords = setCoords();

    button.style.left = coords[0] + "vw";
    button.style.top = coords[1] + "vh";
    button.style.display = "none";
    document.getElementById("con").appendChild(button);
    rectangle = button.getBoundingClientRect();
    rectX1 = rectangle.left;
    rectY1 = rectangle.top;
    rectX2 = rectangle.right;
    rectY2 = rectangle.bottom;
    xMouse = getMouseX();
    yMouse = getMouseY();
    if (!checkBoundary(rectX1, rectY1, rectX2, rectY2, xMouse, yMouse)) {
      button.style.display = "block";
    }
  }
  //CREATE BLUE2 BUTTONS
  for (let i = 1; i < numBlue2Buttons + 1; i++) {
    let button = document.createElement("button");
    button.className = "blue2";
    button.innerHTML = "blue2";
    button.style.color = "blue";
    coords = setCoords();

    button.style.left = coords[0] + "vw";
    button.style.top = coords[1] + "vh";
    button.className += " rotate";
    button.left = button.style.left - 5;
    button.style.display = "none";
    document.getElementById("con").appendChild(button);
    rectangle = button.getBoundingClientRect();
    rectX1 = rectangle.left;
    rectY1 = rectangle.top;
    rectX2 = rectangle.right;
    rectY2 = rectangle.bottom;
    xMouse = getMouseX();
    yMouse = getMouseY();
    if (!checkBoundary(rectX1, rectY1, rectX2, rectY2, xMouse, yMouse)) {
      button.style.display = "block";
    }
  }
  //CREATE BLACK BUTTONS
  for (let i = 1; i < numBlackButtons + 1; i++) {
    let button = document.createElement("button");
    button.className = "black";
    button.innerHTML = "Don't Click!";
    button.style.color = "black";
    coords = setCoords();
    button.style.left = coords[0] + "vw";
    button.style.top = coords[1] + "vh";
    button.style.display = "block";
    document.getElementById("con").appendChild(button);
  }
  buttons = document.querySelectorAll("button");
  for (let i = 1; i < numButtons; i++) {
    rectangle = buttons[i].getBoundingClientRect();
    rectX1 = rectangle.left;
    rectY1 = rectangle.top;
    rectX2 = rectangle.right;
    rectY2 = rectangle.bottom;
    xMouse = getMouseX();
    yMouse = getMouseY();
    if (checkBoundary(rectX1, rectY1, rectX2, rectY2, xMouse, yMouse)) {
      buttons[i].style.left = rectX1 + 5 + "vw";
      buttons[i].style.top = rectY1 + 5 + "vh";
      buttons[i].style.background = "green";
    }
    buttons[i].addEventListener("mouseover", buttonOver);
    buttons[i].addEventListener("click", buttonOver);
  }
}

function setCoords() {
  let x = getRandomInteger(0, 95);
  let y = getRandomInteger(0, 95);
  let mouseX = getMouseX();
  let mouseY = getMouseY();
  let xMouse = (mouseX / window.innerWidth) * 100;
  let yMouse = (mouseY / window.innerHeight) * 100;
  if (
    (Math.abs(x - xMouse) < 7 && Math.abs(y - yMouse) < 7) ||
    (Math.abs(x - greenX) < 6 && Math.abs(y - greenY) < 6)
  ) {
    coords = setCoords();
  }
  return [x, y];
}

function setRedMotion() {
  //first one
  root.style.setProperty("--button-x", Math.floor(Math.random() * 95) + "vw");
  root.style.setProperty(
    "--range-x",
    Math.floor(Math.random() * 20 + 15) + "vw"
  );

  //second one
  root.style.setProperty("--button-x1", Math.floor(Math.random() * 95) + "vw");
  root.style.setProperty(
    "--range-x1",
    Math.floor(Math.random() * 20 + 15) + "vw"
  );

  root.style.setProperty("--button-x2", Math.floor(Math.random() * 95) + "vw");
  root.style.setProperty(
    "--range-x2",
    Math.floor(Math.random() * 20 + 15) + "vw"
  );
  //third one
  root.style.setProperty("--button-x3", Math.floor(Math.random() * 95) + "vw");
  root.style.setProperty(
    "--range-x3",
    Math.floor(Math.random() * 20) + 15 + "vw"
  );
  //fourth one
  root.style.setProperty("--button-x4", Math.floor(Math.random() * 95) + "vw");
  root.style.setProperty(
    "--range-x4",
    Math.floor(Math.random() * 20) + 15 + "vw"
  );
  //fifth one
  root.style.setProperty("--button-x5", Math.floor(Math.random() * 95) + "vw");
  root.style.setProperty(
    "--range-x5",
    Math.floor(Math.random() * 20) + 15 + "vw"
  );
  //sixth one
  root.style.setProperty("--button-x6", Math.floor(Math.random() * 95) + "vw");
  root.style.setProperty(
    "--range-x6",
    Math.floor(Math.random() * 20) + 15 + "vw"
  );
}
function setRectCoords(x1, y1, x2, y2, coords) {
  xMouse = getMouseX();
  yMouse = getMouseY();
  if (
    checkBoundary(x1, y1, x2, y2, xMouse, yMouse)
    // ||
    //checkBoundary(x1, y1, x2, y2, greenX, greenY)
  ) {
    coords[0] = coords[0] + 10;
    coords[1] = coords[1] + 10;
    return coords;
  } else {
    return coords;
  }
}
function checkBoundary(a, b, c, d, x, y) {
  if ((x > a && x < c) || (y > b && y < d)) {
    return true;
  } else {
    return false;
  }
}
// Simulate a click event every 2 seconds to avoid cursor camping

// function timeOut() {
//   clearTimeout(timeout);
//   timeout = setTimeout(function() {
//     document.elementFromPoint(0, 0).click();
//   }, 500);
//   console.log("click");
// }

//Simulate a click event function
// https://stackoverflow.com/questions/6157929/how-to-simulate-a-mouse-click-using-javascript
function simulate(element, eventName) {
  var options = extend(defaultOptions, arguments[2] || {});
  var oEvent,
    eventType = null;

  for (var name in eventMatchers) {
    if (eventMatchers[name].test(eventName)) {
      eventType = name;
      break;
    }
  }

  if (!eventType)
    throw new SyntaxError(
      "Only HTMLEvents and MouseEvents interfaces are supported"
    );

  if (document.createEvent) {
    oEvent = document.createEvent(eventType);
    if (eventType == "HTMLEvents") {
      oEvent.initEvent(eventName, options.bubbles, options.cancelable);
    } else {
      oEvent.initMouseEvent(
        eventName,
        options.bubbles,
        options.cancelable,
        document.defaultView,
        options.button,
        options.pointerX,
        options.pointerY,
        options.pointerX,
        options.pointerY,
        options.ctrlKey,
        options.altKey,
        options.shiftKey,
        options.metaKey,
        options.button,
        element
      );
    }
    element.dispatchEvent(oEvent);
  } else {
    options.clientX = options.pointerX;
    options.clientY = options.pointerY;
    var evt = document.createEventObject();
    oEvent = extend(evt, options);
    element.fireEvent("on" + eventName, oEvent);
  }
  return element;
}

function extend(destination, source) {
  for (var property in source) destination[property] = source[property];
  return destination;
}

var eventMatchers = {
  HTMLEvents: /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
  MouseEvents: /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
};
var defaultOptions = {
  pointerX: 0,
  pointerY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true
};
