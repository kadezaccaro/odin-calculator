const equation = document.querySelector(".equation");
const input = document.querySelector(".input");
const btns = document.querySelectorAll("button");

let num1 = "";
let num2 = "";
let operator = "";

btns.forEach((btn) => {
  btn.addEventListener("click", processBtnClick);
});

function processBtnClick(event) {
  const { className: btnClass, textContent: btnVal } = event.target;

  switch (btnClass) {
    case "number":
      handleNumber(btnVal);
      break;
    case "operator":
      handleOperator(btnVal);
      break;
    case "equals":
      handleEquals();
      break;
    case "clear":
      reset();
      break;
  }
}

function handleNumber(btnVal) {
  if (!operator) {
    updateNum(num1, btnVal, setNum1);
  } else {
    updateNum(num2, btnVal, setNum2);
  }

  const equationComplete = equation.textContent.includes("=");
  if (equationComplete) {
    reset(); // if user completes full equation, reset when the next number is pressed
    handleNumber(btnVal); // start over with pressed value
  }
}

function updateNum(num, btnVal, setNumFunc) {
  if (btnVal === "." && (!num || num === "0")) {
    num = "0."; // default to "0." instead of replacing with "."
  } else if (btnVal === "." && num.includes(".")) {
    return; // prevent multiple decimals
  } else if (num === "0") {
    num = btnVal; // prevent multiple leading zeros
  } else {
    num += btnVal;
  }

  const maxLength = 12;
  if (num.length > maxLength) {
    const cappedNum = num.slice(0, maxLength);
    num = cappedNum;
  }

  setNumFunc(num);
}

function setNum1(num) {
  num1 = num;
  updateInputDisplay(num1);
}

function setNum2(num) {
  num2 = num;
  updateInputDisplay(num2);
}

function updateInputDisplay(value) {
  input.textContent = value;

  if (value === "Cannot divide by 0") {
    setTimeout(() => {
      updateInputDisplay("0"); // clear error message back to 0 after 1 second
    }, 1000);
  }
}

function handleOperator(btnVal) {
  num1 = removeTrailingDecimal(num1);

  if (!num1) num1 = "0"; // if user presses operator without num1, assume value is 0

  if (!num2) {
    operator = btnVal;
    updateEquation(num1, operator);
  } else {
    calculateViaOperator(btnVal);
  }
}

function removeTrailingDecimal(num) {
  const lastChar = num.toString().charAt(num.length - 1);
  if (lastChar === ".") {
    const decimalRemoved = num.slice(0, -1); // remove last character from num
    updateInputDisplay(decimalRemoved);
    return decimalRemoved;
  } else {
    return num;
  }
}

function updateEquation() {
  const equationText = Array.from(arguments).join(" ");
  equation.textContent = equationText;
}

function calculateViaOperator(btnVal) {
  const result = calculate(Number(num1), operator, Number(num2));

  num1 = result; // num1 will always be set to result at this stage
  updateInputDisplay(result);

  operator = btnVal;
  updateEquation(num1, operator);

  num2 = ""; // reset to prepare for new num2
}

function handleEquals() {
  num2 = removeTrailingDecimal(num2);

  if (!operator) return; // prevent user from evaluating a single number
  if (!num2) num2 = num1; // if user presses equals without entering num2, copy value

  updateEquation(num1, operator, num2, "=");

  const result = calculate(Number(num1), operator, Number(num2));
  updateInputDisplay(result);
}

function calculate(num1, operator, num2) {
  if (operator === "/" && num2 === 0) {
    reset();
    return "Cannot divide by 0";
  }

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
  }
}

function reset() {
  num1 = "";
  num2 = "";
  operator = "";
  updateInputDisplay("0");
  updateEquation("");
}
