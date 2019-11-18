const root = document.documentElement;
const body = document.querySelector("body");
const container = document.getElementById("con");
var msgContainer = document.getElementById("message-container");
const scoreDisplay = document.querySelector("#score");
const streakDisplay = document.querySelector("#streak");
const longestDisplay = document.querySelector("#longest");
var xOut = document.getElementById("X");
var themeChoices = document.querySelectorAll("input[name=checkbox]");
const wow = document.getElementById("wow");

var green = document.querySelector(".green");
var buttons = document.querySelectorAll("button");
var vanish = document.querySelectorAll("vanish");

let captureX = 0;
let captureY = 0;
var x, y;

// for grace period after scoring - gracePeriod is time seconds
let scoreTime, initTime, currentTime;
let timeDiff;
let gracePeriod = 0.5;
// for scoring
var score = 0;
var streak = 0;
var longest = 0;

let tutorial = false;
let numButtons = tutorial ? 150 : 250;
let dontshow = "no";
//THEMES
const modern = [
  {
    name: ["Don't Click!"],
    class: ["black"]
  },
  {
    name: ["Guard"],
    class: [
      "red1",
      "red2",
      "red3",
      "red4",
      "red5",
      "red6",
      "red7",
      "red8",
      "red9",
      "red10",
      "red11",
      "red12"
    ]
  },
  {
    name: ["Guard"],
    class: [
      "red1",
      "red2",
      "red3",
      "red4",
      "red5",
      "red6",
      "red7",
      "red8",
      "red9",
      "red10",
      "red11",
      "red12"
    ]
  },
  {
    name: ["Drone"],
    class: ["orange1", "orange1", "orange1", "orange2", "orange2", "orange2"]
  },
  {
    name: ["Security Camera"],
    class: [
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue",
      "blue"
    ]
  },
  {
    name: ["blue2"],
    class: [
      "vanish",
      "vanish",
      "vanish",
      "vanish",
      "vanish",
      "vanish",
      "vanish",
      "vanish",
      "vanish",
      "vanish"
    ]
  }
];
let theme = { ...modern };

setRedMotion();
showMessage();
setGreenButton();

function showMessage() {
  //don't show intro screen if have already seen it
  let showIt = localStorage.getItem("dontshow");
  if (showIt === "yes") {
    xOut.style.visibility = "hidden";
    msgContainer.style.visibility = "hidden";
  } else {
    xOut.style.visibility = "visible";
    msgContainer.style.visibility = "visible";
    for (let i = 0; i < themeChoices.length; i++) {
      themeChoices[i].addEventListener("change", function() {
        for (let j = 0; j < themeInt.length; j++) {
          themeInt[j].style.display = "visible";
        }
      });
    }
    xOut.addEventListener("click", function _listener() {
      xOut.style.visibility = "hidden";
      msgContainer.style.visibility = "hidden";
      localStorage.setItem("dontshow", "yes");
      xOut.removeEventListener("click", _listener);
    });
  }
}

// Get theme choices from input
function themeChecker(event) {
  var themeInt = document.getElementsByClassName("themeInt");
  var input_obj = document.getElementsByTagName("input");

  var counter = 0;
  var themeArray = [];
  console.log("input_obj", input_obj);
  for (i = 0; i < input_obj.length; i++) {
    if (input_obj[i].type === "checkbox" && input_obj[i].checked === true) {
      counter++;
      themeArray.push(input_obj[i].value);
      console.log("themeArray ", themeArray);
    }
  }
  // xOut.style.visibility = "hidden";
  // msgContainer.style.visibility = "hidden";
  // localStorage.setItem("dontshow", "yes");
  // xOut.removeEventListener("click", _listener);
}

// Detect when cursor moves out of viewport
document.addEventListener("mouseleave", function(event) {
  if (
    event.clientY <= 0 ||
    event.clientX <= 0 ||
    event.clientX >= window.innerWidth ||
    event.clientY >= window.innerHeight
  ) {
    initializeButtons();
    resetButtons();
  }
});
// End cursor viewport detection

// // simulate click every second to prevent cursor camping
setInterval(function() {
  let mouseX = getMouseX();
  let mouseY = getMouseY();
  simulate(con, "click", { pointerX: mouseX, pointerY: mouseY });
}, 500);

// get mouse coordinates
document.addEventListener("mousemove", onMouseUpdate, false);
document.addEventListener("mouseenter", onMouseUpdate, false);

green = document.querySelector(".green");
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
  greenX = getRandomInteger(30, window.innerWidth - 150);
  greenY = getRandomInteger(25, window.innerHeight - 50);
  (green.style.left = `${greenX}px`), (green.style.top = `${greenY}px`);
  green.blur();
  initializeButtons();
  resetButtons();
}

initialize();

window.onresize = initialize;
window.onblur = initialize;
window.onfocus = initialize;

function initialize() {
  initializeButtons();
  resetButtons();
}

buttons = document.querySelectorAll("button");
for (let i = 1; i < buttons.length; i++) {
  buttons[i].addEventListener("mousemove", buttonOver);
}

function setGreenButton() {
  greenX = getRandomInteger(30, window.innerWidth - 150);
  greenY = getRandomInteger(25, window.innerHeight - 50);
  var button = document.createElement("button");
  button.setAttribute("id", "bigGreen");
  button.innerHTML = "Click Here!";
  button.className += "green";
  container.appendChild(button);
  green = document.querySelector(".green");
  (green.style.left = `${greenX}px`), (green.style.top = `${greenY}px`);
  greenID = document.getElementById("bigGreen");
}

function buttonOver() {
  if (window.getComputedStyle(this).getPropertyValue("opacity") > 0.9) {
    streak = 0;
    streakDisplay.innerHTML = `${streak}`;
    captureX = getMouseX();
    captureY = getMouseY();
    initializeButtons();
    resetButtons();
  } else console.log("not opacity 1 yet");
}
function initializeButtons() {
  buttons = document.querySelectorAll("button");
  if (buttons) {
    for (let i = 1; i < buttons.length; i++) {
      buttons[i].removeEventListener("mouseover", buttonOver);
      buttons[i].removeEventListener("mouseenter", buttonOver);
      buttons[i].removeEventListener("mouseleave", buttonOver);

      container.removeChild(buttons[i]);
    }
  }
}

function resetButtons() {
  scoreDisplay.innerHTML = `${score}`;
  streakDisplay.innerHTML = `${streak}`;
  longestDisplay.innerHTML = `${longest}`;
  setBackgroundColor();
  //MOVE GREEN BUTTON
  greenX = getRandomInteger(30, window.innerWidth - 175);
  greenY = getRandomInteger(25, window.innerHeight - 50);
  (green.style.left = `${greenX}px`), (green.style.top = `${greenY}px`);

  //SET RANDOM NUMBERS OF THE DIFFERENT BUTTONS WITHIN RANGES INTO AN ARRAY
  const ranNums = setRandoms();
  const range = getRanges(ranNums);

  // randomize classes within theme names, for example blue2 or blue1 for cw spin or ccw spin
  const themeClasses = setMotionClasses(ranNums, theme);
  // only want one class or the other for blue
  const blueOne = Math.random() < 0.5 ? "blue" : "blue2";

  for (i = 1; i < numButtons; i++) {
    let left = getRandomInteger(30, window.innerWidth - 175);
    let top = getRandomInteger(25, window.innerHeight - 50);
    //BEFORE CREATING BUTTON CHECK APPROX COORDS
    let rectX1 = left;
    let rectY1 = top;
    let rectX2 = rectX1 + 75;
    let rectY2 = top + 20;
    let coordCheck = checkBoundary(
      rectX1,
      rectY1,
      rectX2,
      rectY2,
      captureX,
      captureY
    );
    let greenCheck = checkBoundary(
      rectX1,
      rectY1,
      rectX2,
      rectY2,
      greenX,
      greenY
    );
    if (coordCheck) {
      if (Math.random() < 0.5) {
        left = left + 80 > window.innerWidth ? (left -= 80) : (left += 80);
        top = top + 35 > window.innerHeight ? (top -= 35) : (top += 35);
      } else {
        left = left - 80 < 0 ? (left += 80) : (left -= 80);
        top = top - 35 < 0 ? (top += 35) : (top -= 35);
      }
    }
    if (greenCheck) {
      if (Math.random() < 0.5) {
        left = left + 75 > window.innerWidth ? (left -= 75) : (left += 75);
        top = top + 50 > window.innerHeight ? (top -= 50) : (top += 50);
      } else {
        left = left - 75 < 0 ? (left += 75) : (left -= 75);
        top = top - 50 < 0 ? (top += 50) : (top -= 50);
      }
    }
    // KEEP BUTTONS AWAY FROM SCOREBOARD
    if (top < 50 && left < 75) {
      top = top + 50;
      left = left + 75;
    }
    let button = document.createElement("button");
    button.setAttribute("id", `button${i}`);
    button.style.left = `${left}px`;
    button.style.top = `${top}px`;
    if (i < range[0]) {
      button.innerHTML = `${theme[0].name[0]}`;
      button.className += `${theme[0].class[0]}`;
    } else if (i >= range[0] && i < range[1]) {
      button.innerHTML = `${theme[1].name[0]}`;
      button.className += `${themeClasses[0][0]}`;
      themeClasses[0].shift();
    } else if (i >= range[1] && i < range[2]) {
      button.innerHTML = `${theme[2].name[0]}`;
      button.className += `${themeClasses[1][0]}`;

      themeClasses[1].shift();
    } else if (i >= range[2] && i < range[3]) {
      button.innerHTML = `${theme[3].name[0]}`;
      button.className += `${themeClasses[2][0]}`;
      themeClasses[2].shift();
    } else if (i >= range[3] && i < range[4]) {
      button.innerHTML = `${theme[4].name[0]}`;
      button.className += `${blueOne}`;
    } else {
      button.innerHTML = `${theme[5].name[0]}`;
      button.className += `${themeClasses[4][0]}`;
      themeClasses[4].shift();
    }

    container.appendChild(button);
    button.addEventListener("mouseover", buttonOver);
    button.addEventListener("mouseenter", buttonOver);
    button.addEventListener("mouseleave", buttonOver);
  }
}

// GET MOUSE POSITION
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

function getRandomInteger(min, max) {
  // Returns a random integer between min (inclusive) and max (inclusive).
  // The value is no lower than min (or the next integer greater than min
  // if min isn't an integer) and no greater than max (or the next integer
  // lower than max if max isn't an integer).
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkBoundary(a, b, c, d, x, y) {
  if ((x > a && x < c) || (y > b && y < d)) {
    return true;
  } else {
    return false;
  }
}

function setBackgroundColor() {
  body.style.backgroundColor = `rgb(
                ${Math.floor(Math.random() * 50) + 206},
                ${Math.floor(Math.random() * 50) + 206},
                ${Math.floor(Math.random() * 50) + 206}
              )`;
}
//SET RANDOM NUMBERS OF DIFFERENT BUTTONS WITHIN RANGES
function setRandoms() {
  let numRed, numBlue, numRed2, numBlue2, numOrange;
  if (!tutorial) {
    numRed = getRandomInteger(2, 4);
    numBlue = getRandomInteger(2, 4);
    numRed2 = 1;
    numBlue2 = getRandomInteger(6, 10);
    numOrange = getRandomInteger(1, 2);
  } else {
    numRed = getRandomInteger(2, 4);
    numBlue = getRandomInteger(2, 5);
    numBlue2 = getRandomInteger(1, 2);
    numRed2 = 1;
    numOrange = getRandomInteger(1, 2);
  }
  const numBlack =
    numButtons - numRed - numBlue - numRed2 - numOrange - numBlue2;
  return [numBlack, numRed, numRed2, numOrange, numBlue, numBlue2];
}
function getRanges(nums) {
  for (let i = 0; i < nums.length; i++) {
    const num1 = nums[0] + 1;
    const num2 = num1 + nums[1];
    const num3 = num2 + nums[2];
    const num4 = num3 + nums[3];
    const num5 = num4 + nums[4];
    return [num1, num2, num3, num4, num5];
  }
}

function setMotionClasses(nums, obj) {
  // do black class separately since only one class (no motion)
  let result = [];
  for (i = 1; i < Object.keys(obj).length; i++) {
    let n1 = obj[i].class.length;
    let n2 = nums[i];
    let pool = Array.from(obj[i].class);
    let eachArray = [];

    //do Fisher-Yates shuffle to randomize the class array for button i from the available classes in theme[i].class
    //n1 is the number of possible classes, n2 is the number of buttons, pool is the array of possible classes
    while (eachArray.length < n2) {
      let index = Math.floor(Math.random() * pool.length);
      eachArray = eachArray.concat(pool.splice(index, 1));
    }
    result.push(eachArray);
  }
  return result;
}

function setRedMotion() {
  // This will set the coordinates for the keyframes in the css (keyframes.css)
  //first one
  root.style.setProperty("--button-x", getRandomInteger(0, 95) + "vw");
  root.style.setProperty("--range-x", getRandomInteger(0, 95) + "vw");

  //second one
  root.style.setProperty("--button-x1", getRandomInteger(0, 95) + "vw");
  root.style.setProperty("--range-x1", getRandomInteger(0, 95) + "vw");

  root.style.setProperty("--button-x2", getRandomInteger(0, 95) + "vw");
  root.style.setProperty("--range-x2", getRandomInteger(0, 95) + "vw");
  //third one
  root.style.setProperty("--button-x3", getRandomInteger(0, 95) + "vw");
  root.style.setProperty("--range-x3", getRandomInteger(0, 95) + "vw");
  //fourth one
  root.style.setProperty("--button-x4", getRandomInteger(0, 95) + "vw");
  root.style.setProperty("--range-x4", getRandomInteger(0, 95) + "vw");
  //fifth one
  root.style.setProperty("--button-x5", getRandomInteger(0, 95) + "vw");
  root.style.setProperty("--range-x5", getRandomInteger(0, 95) + 15 + "vw");
  //sixth one
  root.style.setProperty("--button-x6", getRandomInteger(0, 95) + "vw");
  root.style.setProperty("--range-x6", getRandomInteger(0, 95) + "vw");
  //seventh one
  root.style.setProperty("--button-x7", getRandomInteger(0, 95) + "vw");
  root.style.setProperty("--range-x7", getRandomInteger(0, 95) + "vw");

  //eighth one
  root.style.setProperty("--button-x8", getRandomInteger(0, 95) + "vw");
  root.style.setProperty("--range-x8", getRandomInteger(0, 95) + "vw");
  //ninth one
  root.style.setProperty("--button-y1", getRandomInteger(0, 95) + "vh");
  root.style.setProperty("--range-y1", getRandomInteger(0, 95) + "vh");
  //tenth one
  root.style.setProperty("--button-y2", getRandomInteger(0, 95) + "vh");
  root.style.setProperty("--range-y2", getRandomInteger(0, 95) + "vh");
  //eleventh one
  root.style.setProperty("--button-y3", getRandomInteger(0, 95) + "vh");
  root.style.setProperty("--range-y3", getRandomInteger(0, 95) + "vh");
  //twelfth one
  root.style.setProperty("--button-y4", getRandomInteger(0, 95) + "vh");
  root.style.setProperty("--range-y4", getRandomInteger(0, 95) + 15 + "vh");
}

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
