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

function updateInputDisplay(num) {
  input.textContent = num;
}

function handleOperator(btnVal) {
  if (!num2) {
    operator = btnVal;
    equation.textContent = `${num1} ${operator}`;
  } else {
    calculateViaOperator(btnVal);
  }
}

function calculateViaOperator(btnVal) {
  const result = calculate(Number(num1), operator, Number(num2));
  num1 = result; // num1 will always be set to result
  operator = btnVal;
  equation.textContent = `${num1} ${operator}`; // update equation
  updateInputDisplay(result);
  num2 = ""; // reset num2 to prepare for new num2
}

function handleEquals() {
  equation.textContent = `${num1} ${operator} ${num2} =`;
  const result = calculate(Number(num1), operator, Number(num2));
  updateInputDisplay(result);
}

function calculate(num1, operator, num2) {
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
