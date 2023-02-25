"use strict";

const buttonContainer = document.querySelector("#button-container");
const screen = document.getElementById("screen");
const btnAC = document.getElementById("btn-ac");
const btnEqual = document.getElementById("btn-equal");
const btnChangeSign = document.getElementById("btn-sign");

let currentScreenNumber = 0;
let storedNumber = 0;
let currentScreenOperand = "";
let storedOperand = "";
let resetScreen = false;

btnAC.addEventListener("click", clear);

buttonContainer.addEventListener("click", clickOperandButton);
buttonContainer.addEventListener("click", clickNumberButton);
btnEqual.addEventListener("click", clickEqualButton);
btnChangeSign.addEventListener("click", changeSign);

function clickOperandButton(e) {
  if (!e.target.closest(".btn-operand")) return;
  resetScreen = true;
  currentScreenOperand = e.target.dataset.operand;

  if (storedOperand) {
    const solution = Number(
      operate(storedOperand, storedNumber, currentScreenNumber)
    );
    screen.textContent = toNDecimalPlaces(solution, 2);
  }

  storedNumber = Number(screen.textContent);
  storedOperand = currentScreenOperand;
}
function toNDecimalPlaces(num, places = 2) {
  return Math.round(num * 10 ** places) / 10 ** places;
}

function clickNumberButton(e) {
  if (!e.target.closest(".btn-number")) return;
  if (e.target.closest("[data-number='.']") && screen.textContent.includes("."))
    return; //return if you select dot but there is dot already in the display

  //if block below make sure there are no leading zeros
  if (resetScreen || screen.textContent === "0") {
    screen.textContent = "";
    resetScreen = false;
  }

  const btnNumber = e.target.dataset.number;

  screen.textContent += btnNumber;
  currentScreenNumber = Number(screen.textContent);
}

function clickEqualButton() {
  resetScreen = true;
  const solution = Number(
    operate(storedOperand, storedNumber, currentScreenNumber)
  );

  screen.textContent = toNDecimalPlaces(solution, 2);
  currentScreenNumber = Number(screen.textContent);
  storedOperand = null;
}

function changeSign() {
  screen.textContent = Number(screen.textContent) * -1;
  currentScreenNumber = screen.textContent;
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
