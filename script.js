"use strict";

const buttonContainer = document.querySelector("#button-container");
const screen = document.getElementById("screen");
const btnAC = document.getElementById("btn-ac");
const btnEqual = document.getElementById("btn-equal");
const btnChangeSign = document.getElementById("btn-sign");

let currentScreenNumber = 0;
let storedNumber = 0;
let currentScreenOperator = "";
let storedOperator = "";
let resetScreen = false; //clicking a number will append it to the screen if false
let firstCalculation = true;
let firstOpEqSign = true; //to prevent pressing operator multiple times without a number;

btnAC.addEventListener("click", clear);
buttonContainer.addEventListener("click", clickOperatorButton);
buttonContainer.addEventListener("click", clickNumberButton);
btnEqual.addEventListener("click", clickEqualButton);
btnChangeSign.addEventListener("click", changeSign);

function clickOperatorButton(e) {
  //clicked button must be an operator: +. -. x, /
  if (!e.target.closest(".btn-operator")) return;
  //if(!firstOpEqSign)return;
  resetScreen = true;
  currentScreenOperator = e.target.dataset.operator;
  //are you chaining an operation?
  if (!firstCalculation && firstOpEqSign) {
    const solution = Number(
      operate(storedOperator, storedNumber, currentScreenNumber)
    );
    screen.textContent = toNDecimalPlaces(solution, 2);
  }
  firstOpEqSign = false;
  firstCalculation = false;
  storedNumber = Number(screen.textContent);
  storedOperator = currentScreenOperator;
}
function toNDecimalPlaces(num, places = 2) {
  return Math.round(num * 10 ** places) / 10 ** places;
}

function clickNumberButton(e) {
  //clicked button must be a number button including decimal places;
  if (!e.target.closest(".btn-number")) return;
  if (e.target.closest("[data-number='.']") && screen.textContent.includes("."))
    return; //return if you select dot but there is dot already in the display

  //if block below makes sure there are no leading zeros
  if (resetScreen || screen.textContent === "0") {
    screen.textContent = "";
    resetScreen = false;
  }

  //Number selected
  const btnNumber = e.target.dataset.number;
  //appendNumber
  screen.textContent += btnNumber;
  currentScreenNumber = Number(screen.textContent);

  firstOpEqSign = true;
}

function clickEqualButton() {
  if (!firstOpEqSign) return;
  const solution = Number(
    operate(storedOperator, storedNumber, currentScreenNumber)
  );
  if (!solution) return;
  screen.textContent = toNDecimalPlaces(solution, 2);
  currentScreenNumber = Number(screen.textContent);

  resetScreen = true;
  firstCalculation = true;
  firstOpEqSign = false;
}

function changeSign() {
  screen.textContent = Number(screen.textContent) * -1;
  currentScreenNumber = screen.textContent;
}

function clear() {
  currentScreenNumber = 0;
  currentScreenOperator = "";
  resetScreen = false;
  screen.textContent = 0;
  storedNumber = 0;
  storedOperator = "";
  firstCalculation = true;
  firstOpEqSign = true;
}

function operate(operator, firstNum, secondNum) {
  if (operator === "add") {
    return firstNum + secondNum;
  }
  if (operator === "subtract") {
    return firstNum - secondNum;
  }
  if (operator === "multiply") {
    return firstNum * secondNum;
  }
  if (operator === "divide") {
    return firstNum / secondNum;
  }
  if (operator === "modulo") {
    return firstNum % secondNum;
  }
}
