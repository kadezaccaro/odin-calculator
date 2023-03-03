const equation = document.querySelector(".equation");
const input = document.querySelector(".input");
const btns = document.querySelectorAll("button");

// * when user clicks number buttons, populate the display
// replace default value of 0 with whatever is clicked
// allow user to chain numbers
// * store first number in a variable when operator is pressed
// TODO: convert to numbers to prevent string concatenation
// TODO: fix zeros not being added

let num1;
let num2;
let operator;

btns.forEach((btn) => {
  btn.addEventListener("click", handleBtns);
});

function handleBtns(e) {
  const { className: btnClass, textContent: btnVal } = e.target;

  switch (btnClass) {
    case "number":
      // chain numbers in display
      input.textContent += btnVal;
      // replace 0
      if (input.textContent.startsWith("0")) {
        const zeroThenNum = /0[0-9]/g;
        input.textContent = input.textContent.replace(zeroThenNum, btnVal);
      }
      // if num1 is set, update input with new num
      if (num1) {
        input.textContent = btnVal;
      }
      break;
    case "operator":
      operator = btnVal;
      num1 = input.textContent;
      equation.textContent = `${num1} ${operator}`;
      break;
    case "equals":
      // set num2 equal to new input
      num2 = input.textContent;
      // update equation
      equation.textContent = `${num1} ${operator} ${num2} =`;
      // set input equal to result
      input.textContent = calculate(num1, operator, num2);
      break;
    case "clear":
      reset();
      break;
  }
}

function reset() {
  equation.textContent = "";
  input.textContent = "0";
}

function calculate(a, operator, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}
