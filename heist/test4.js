const modern = [
  {
    name: ["Don't Click!"],
    class: ["black"]
  },
  {
    name: ["Guard"],
    class: ["red", "red1", "red2", "red3", "red4", "red5"]
  },
  {
    name: ["Guard1"],
    class: ["red2"]
  },
  {
    name: ["Dog"],
    class: ["orange", "orange", "orange"]
  },
  {
    name: ["Security Camera"],
    class: [
      "blue1",
      "blue2",
      "blue3",
      "blue4",
      "blue5",
      "blue6",
      "blue7",
      "blue8",
      "blue9",
      "blue10",
      "blue11",
      "blue12"
    ]
  },
  {
    name: ["Security Camera"],
    class: ["blue3", "blue3", "blue3", "blue3"]
  }
];
const numButtons = 250;
var theme = { ...modern };

let numbers = setRandoms();
let ranges = getRanges(numbers);
var tutorial = false;
setMotionClasses(numbers, theme);

function setRandoms() {
  let numRed, numBlue, numRed2, numBlue2, numOrange;
  if (!tutorial) {
    numRed = getRandomInteger(2, 4);
    numBlue = getRandomInteger(4, 8);
    numRed2 = 1;
    numBlue2 = getRandomInteger(1, 3);
    numOrange = getRandomInteger(1, 2);
  } else {
    numRed = getRandomInteger(2, 4);
    numBlue = getRandomInteger(4, 8);
    numBlue2 = getRandomInteger(1, 3);
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
    const num2 = num1 + nums[2];
    const num3 = num2 + nums[3];
    const num4 = num3 + nums[4];
    const num5 = num4 + nums[5];
    return [num1, num2, num3, num4, num5];
  }
}
function setMotionClasses(nums, obj) {
  // do black class separately since only one class (no motion)
  for (i = 1; i < Object.keys(obj).length; i++) {
    let n1 = obj[i].class.length;
    let n2 = nums[i];
    let pool = obj[i].class;
    let result = [];
    //do Fisher-Yates shuffle to randomize the class array for button i from the available classes in theme[i].class
    //n1 is the number of possible classes, n2 is the number of buttons, pool is the array of possible classes
    while (result.length < n2) {
      let index = Math.floor(Math.random() * pool.length);
      result = result.concat(pool.splice(index, 1));
    }
    console.log("result ", result);
  }
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * max + min);
}
