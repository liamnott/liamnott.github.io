let container = document.querySelector(".container");
let para = document.querySelector(".para");
let time = document.getElementById("time");
let header = document.getElementById("header");
let linkButton = document.getElementsByClassName("linkButton");

function getDate() {
  var str = "";

  var days = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  var months = new Array(
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  );

  var now = new Date();
  let minutes =
    now.getMinutes() < 10 ? now.getMinutes() + "0" : now.getMinutes();
  let seconds =
    now.getSeconds() < 10 ? now.getSeconds() + "0" : now.getSeconds();
  str +=
    now.getHours() +
    ":" +
    minutes +
    ":" +
    seconds +
    ", " +
    days[now.getDay()] +
    ", " +
    months[now.getMonth()] +
    " " +
    now.getDate() +
    ", " +
    now.getFullYear() +
    " ";

  time.innerHTML = str;
}
getDate();
setInterval(getDate, 1000);

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  clock.style.display = "block";
  var daysSpan = clock.querySelector(".days");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    if (t.minutes < 5) {
      minutesSpan.style.color = "red";
      secondsSpan.style.color = "red";
    } else {
      minutesSpan.style.color = "black";
      secondsSpan.style.color = "black";
    }
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var schedule = [
  ["Nov 01 2019 06:40:00:0", "Nov 01 2019 07:40:00:0"],
  ["Nov 01 2019 07:40:00:1", "Nov 01 2019 08:30:00:0"],
  ["Nov 01 2019 08:30:00:1", "Nov 01 2019 09:15:00:0"],
  ["Nov 01 2019 09:15:00:1", "Nov 01 2019 10:00:00:0"],
  ["Nov 01 2019 10:00:00:1", "Nov 01 2019 10:45:00:0"],
  ["Nov 01 2019 10:45:00:1", "Nov 01 2019 11:30:00:0"],
  ["Nov 01 2019 11:30:00:1", "Nov 01 2019 12:11:00:0"],
  ["Nov 01 2019 12:11:00:1", "Nov 01 2019 12:56:00:0"],
  ["Nov 01 2019 12:56:00:1", "Nov 01 2019 13:41:00:0"],
  ["Nov 01 2019 13:41:00:1", "Nov 01 2019 14:30:00:0"]
];
// iterate over each element in the schedule
for (var i = 0; i < schedule.length; i++) {
  var startDate = schedule[i][0];
  var endDate = schedule[i][1];

  // put dates in milliseconds for easy comparisons
  var startMs = Date.parse(startDate);
  var endMs = Date.parse(endDate);
  var currentMs = Date.parse(new Date());

  // if current date is between start and end dates, display clock
  if (endMs > currentMs && currentMs >= startMs) {
    initializeClock("clockdiv", endDate);
    var period = document.getElementById("period");
    var periodNum = i;
    if (periodNum === 1) {
      period.innerHTML = `Time until school starts`;
    } else if (periodNum > 1 && periodNum < 9) {
      period.innerHTML = `Time until period ${periodNum}:`;
    } else if (periodNum === 9) {
      period.innerHTML = `Time until the end of the school day:`;
    }
  }
}
