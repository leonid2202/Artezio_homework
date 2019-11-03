const maxNumberLength = 15;

//Используем паттерн "модуль"
const calculator = (function() {
  let _previousOperand = "";
  let _currentOperand = "";
  let _operation = undefined;

  return {
    setPreviousOperand(value) { _previousOperand = value; },
    setCurrentOperand(value) { _currentOperand = value; },
    setOperation(value) { _operation = value; },
    getPreviousOperand() { return _previousOperand; },
    getCurrentOperand() { return _currentOperand; },
    getOperation() { return _operation; }
  }
})();

function clear() {
  this.setPreviousOperand("");
  this.setCurrentOperand("");
  this.setOperation(undefined);
}

function inputDigit(digit) {
  let currentOperand = this.getCurrentOperand();
  if (digit === "." && currentOperand.includes(".")) {
    return;
  }
  if (currentOperand.length > maxNumberLength) {
    alert("Number is too long!");
    return;
  }
  if (currentOperand === "0" && digit !== ".") {
    this.setCurrentOperand(digit);
  } else {
    this.setCurrentOperand(this.getCurrentOperand() + digit);
  }
}

function inputOperation(operation) {
  if (this.getCurrentOperand() === "") {
    return;
  }
  if (this.getPreviousOperand() !== "") {
    calculate.call(this);
  }
  this.setOperation(operation);
  this.setPreviousOperand(this.getCurrentOperand());
  this.setCurrentOperand("");
}

function calculate() {
  let result;
  const a = parseFloat(this.getPreviousOperand());
  const b = parseFloat(this.getCurrentOperand());
  if (isNaN(a) || isNaN(b)) {
    return;
  }
  switch (this.getOperation()) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
  }
  result = parseFloat(result.toFixed(12));
  if (result.toString().length > maxNumberLength) {
    alert("Result is too long!");
    clear.call(this);
    return;
  }
  this.setCurrentOperand(result.toString());
  this.setOperation(undefined);
  this.setPreviousOperand("");
}

function updateResult(result, previousResult) {
  result.innerText = this.getCurrentOperand();
  if (this.getOperation() == undefined) {
    previousResult.innerText = this.getPreviousOperand();
  } else {
    previousResult.innerText = this.getPreviousOperand() + " " + this.getOperation();
  }
}

//Используем bind для привязки функций к объекту calculator
//Функцию updateResult привязываем с параметрами
const calculatorClear = clear.bind(calculator);
const calculatorInputDigit = inputDigit.bind(calculator);
const calculatorInputOperation = inputOperation.bind(calculator);
const calculatorCalculate = calculate.bind(calculator);
const calculatorUpdateResult = updateResult.bind(
  calculator,  
  document.querySelector("#resultText"), 
  document.querySelector("#previousResultText")
);

//Вешаем обработчики событий
const digitButtons = document.querySelectorAll(".digitButton");
const operationButtons = document.querySelectorAll(".operationButton");
const clearButton = document.querySelector(".clearButton");
const equalsButton = document.querySelector(".equalsButton");

digitButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculatorInputDigit(button.innerText);
    calculatorUpdateResult();
  })
})
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculatorInputOperation(button.innerText);
    calculatorUpdateResult();
  })
})
clearButton.addEventListener("click", () => {
  calculatorClear();
  calculatorUpdateResult();
})
equalsButton.addEventListener("click", () => {
  calculatorCalculate();
  calculatorUpdateResult();
})

