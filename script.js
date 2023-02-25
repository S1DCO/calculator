"use strict";

const buttonContainer = document.querySelector("#button-container");
const screen = document.getElementById("screen");
const btnAC = document.getElementById("btn-ac");
const btnEqual = document.getElementById("btn-equal");

let currentScreenNumber = 0;
let storedNumber = 0;
let currentScreenOperand = "";
let storedOperand = "";
let resetScreen = false;

btnAC.addEventListener("click", clear);

buttonContainer.addEventListener("click", clickOperandButton);
buttonContainer.addEventListener("click", clickNumberButton);
btnEqual.addEventListener("click", clickEqualButton);

function clickOperandButton(e) {
  if (!e.target.closest(".btn-operand")) return;
  resetScreen = true;
  currentScreenOperand = e.target.dataset.operand;

  if (storedOperand) {
    const solution = operate(storedOperand, storedNumber, currentScreenNumber);

    screen.textContent = solution;
  }

  storedNumber = Number(screen.textContent);
  storedOperand = currentScreenOperand;
}

function clickNumberButton(e) {
  if (!e.target.closest(".btn-number")) return;
  if (resetScreen || screen.textContent === "0") {
    screen.textContent = "";
    resetScreen = false;
  }

  const btnNumber = e.target.dataset.number;

  screen.textContent += btnNumber;
  currentScreenNumber = Number(screen.textContent);
}

function clickEqualButton() {
  const solution = operate(storedOperand, storedNumber, currentScreenNumber);

  screen.textContent = solution;
  currentScreenNumber = Number(screen.textContent);
}

function clear() {
  currentScreenNumber = 0;
  currentScreenOperand = "";
  resetScreen = false;
  screen.textContent = 0;
  storedNumber = 0;
  storedOperand = "";
}

function operate(operand, firstNum, secondNum) {
  if (operand === "add") {
    return firstNum + secondNum;
  }
  if (operand === "subtract") {
    return firstNum - secondNum;
  }
  if (operand === "multiply") {
    return firstNum * secondNum;
  }
  if (operand === "divide") {
    return firstNum / secondNum;
  }
  if (operand === "modulo") {
    return firstNum % secondNum;
  }
}
