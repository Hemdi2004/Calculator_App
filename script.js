
class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement) {
      this.prevOperandTextElement = prevOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
  
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '/':
          computation = current !== 0 ? prev / current : 'Error';
          break;
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.currentOperand;
      if (this.operation != null) {
        this.prevOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
      } else {
        this.prevOperandTextElement.innerText = '';
      }
    }
  }
  
  // --- DOM Selection ---
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operator]');
  const equalsButton = document.querySelector('[data-equal]');
  const deleteButton = document.querySelector('[data-del]');
  const allClearButton = document.querySelector('[data-ac]');
  const prevOperandTextElement = document.querySelector('[data-prev-operand]');
  const currentOperandTextElement = document.querySelector('[data-current-operand]');
  
  // --- Instantiate Calculator ---
  const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement);
  
  // --- Event Listeners ---
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  });
  