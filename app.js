const equation = document.querySelector(".equation");
const input = document.querySelector(".input");
const btns = document.querySelectorAll("button");

let num1 = "";
let num2 = "";
let operator = "";

btns.forEach((btn) => {
  btn.addEventListener("click", control);
});

function control(e) {
  const { className: btnClass, textContent: btnVal } = e.target;
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
}

function updateNum(num, btnVal, setNumFunc) {
  num += btnVal;
  num = replaceBeginningZero(num, btnVal);
  setNumFunc(num);
}

function replaceBeginningZero(num, btnVal) {
  const zeroThenNum = /^0[0-9]/g;
  const replacedVal = num.replace(zeroThenNum, btnVal);
  return replacedVal;
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
  if (!num1) num1 = "0"; // if user presses operator without num1, assume value is 0
  if (!num2) {
    operator = btnVal;
    equation.textContent = `${num1} ${operator}`;
  } else {
    calculateViaOperator(btnVal);
  }
}

function calculateViaOperator(btnVal) {
  const result = calculate(Number(num1), operator, Number(num2));
  num1 = result; // num1 will always be set to result at this stage
  updateInputDisplay(result);
  operator = btnVal;
  equation.textContent = `${num1} ${operator}`;
  num2 = ""; // reset to prepare for new num2
}

function handleEquals() {
  if (!operator) return; // prevent user from evaluating a single number
  if (!num2) num2 = num1; // when user hits equals without entering num2, copy value
  equation.textContent = `${num1} ${operator} ${num2} =`;
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
  input.textContent = "0";
  equation.textContent = "";
}
