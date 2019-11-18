let root = document.documentElement;
let body = document.querySelector("body");
let container = document.getElementById("con");
var elements = document.querySelectorAll(":hover");

const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * max + min);
};

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

setInterval(function() {
  let mouseX = getMouseX();
  let mouseY = getMouseY();
  console.log(mouseX, mouseY);
  simulate(con, "click", { pointerX: mouseX, pointerY: mouseY });
}, 500);

// Detect when cursor moves out of viewport
document.addEventListener("mouseleave", function(event) {
  if (
    event.clientY <= 0 ||
    event.clientX <= 0 ||
    event.clientX >= window.innerWidth ||
    event.clientY >= window.innerHeight
  ) {
    console.log("out of bounds");
  }
});
// End cursor viewport detection

for (i = 0; i < 3; i++) {
  //let buttonX = getRandomInteger(0, 95);
  //let buttonY = getRandomInteger(0, 95);
  let button = document.createElement("button");
  button.setAttribute("id", `button${i}`);
  button.innerHTML = `button${i}`;
  button.className += "buttons";
  button.style.left = "50vw";
  button.style.top = "50vh";
  container.appendChild(button);
  //let id1 = document.querySelector("1");
}
let id2 = document.querySelector("#button2");
id2.style.left = "25vw";
id2.style.top = "25vw";
id2.style.left = "50vw";
id2.style.top = "50vw";
//CHECK FOR OVERLAP WITH MOUSE
document.addEventListener("mousemove", function _listener() {
  elements = document.querySelectorAll(":hover");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = "hidden";
    console.log(elements);
  }
  document.removeEventListener("mousemove", _listener);
});

//
//
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
