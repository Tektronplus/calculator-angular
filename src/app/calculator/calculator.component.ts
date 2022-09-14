import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /* === METHODS === */
  
  /*VARIABLES*/
  arrFullCalc: string[] = []; //All the operations of the calculation
  inputNumber: string = "0"; //The current number displayed
  prevInputNumber: string = "0"; //The previus oprations of the calculation
  result: number = 0; //Result of the calculation

  isNewCalc = false; //Flag if is a new calculation
  isResult = false; //Flag if the number displayed is the result


  setInputNumber(x: string) {
    if (this.inputNumber === "0" || this.isNewCalc) {
      this.inputNumber = x;
      if (this.isNewCalc) {
        this.prevInputNumber = "0";
        this.isNewCalc = false;
        this.isResult = false;
      }
    } else {
      this.inputNumber += x;
    }
  }

  addOperation(op: string) {
    this.arrFullCalc.push(this.inputNumber);
    this.arrFullCalc.push(op);
    this.inputNumber = "0";
    this.prevInputNumber = this.arrFullCalc.join(" ")
  }


  //Single Key Functions
  cancKey() {
    this.inputNumber = "0";
  }

  delKey() {
    if (this.inputNumber.length == 1) {
      this.inputNumber = "0";
    } else {
      this.inputNumber = this.inputNumber.slice(0, -1);
    }
  }

  equalKey() {
    this.arrFullCalc.push(this.inputNumber);
    let fullCalculation: string = this.arrFullCalc.join(" ") + " =";
    this.mainCalculator(); //calculation of result 
    this.prevInputNumber = fullCalculation;


    this.arrFullCalc = [];
    this.inputNumber = this.result.toString();

    this.isNewCalc = true;
    this.isResult = true;
  }

  /*  
    Explanation:
    - mainCalculator() => Calculate the singles operations until the array "arrFullCalc" contains elements equal 
    to or greater than 3 elements.
    - findIndex() => The function finds the index of arithmetic operations, following the rules of mathematics,
      i.e. the function first takes the index of multiplications and divisions in order, then takes the sums 
      and subtractions still in order.
    - changeArr() => After take index of the arithmertic operation as argument, it takes the number before and 
    after the index,replace the 3 values [numberA, arit-oper, numberB] with the result of the operation. 
   */
  mainCalculator() {
    while(this.arrFullCalc.length >= 3){ 
      this.changeArr(this.findIndex())
    }
    this.result = parseFloat(this.arrFullCalc[0]);
  }
  findIndex(): number {
    let index: number;
    let indexMul = this.arrFullCalc.indexOf('x');
    let indexDiv = this.arrFullCalc.indexOf('/');
    let indexPlus = this.arrFullCalc.indexOf('+');
    let indexLess = this.arrFullCalc.indexOf('-');

    if (indexMul != -1 && indexDiv != -1) {
      index = indexMul > indexDiv ? indexDiv : indexMul;
    } else if (indexMul != -1 || indexDiv != -1) {
      index = indexMul == -1 ? indexDiv : indexMul;
    } else {
      if (indexPlus != -1 && indexLess != -1) {
        index = indexPlus > indexLess ? indexLess : indexPlus;
      } else if (indexPlus != -1 || indexLess != -1) {
        index = indexPlus == -1 ? indexLess : indexPlus;
      }
    }

    return index;
  }
  changeArr(indexOp: number) {
    let singleCalc = this.arrFullCalc.splice(indexOp - 1, 3);
    this.arrFullCalc.splice(indexOp - 1, 0, this.calculator(singleCalc)); //Substitute the operation with the result 
  }

  calculator(arr): string { //Pass an array of 3 elements e.g. [number-A, arithmetic-sign, number-B]
    let result;
    let numA: number = parseFloat(arr[0]);
    let numB: number = parseFloat(arr[2]);

    switch (arr[1]) {
      case 'x':
        result = numA * numB;
        break;
      case '/':
        result = numA / numB;
        break;
      case '+':
        result = numA + numB;
        break;
      case '-':
        result = numA - numB;
        break;
    }

    result = result.toFixed(6).toString(); //Set the precision of decimal digits and stringify the result for the array
    return result;
  }

  /* === CSS VARIABLES === */
  calculatorCSS: string = "container text-center border border-3 border-secondary bg-dark bg-gradient rounded-4 p-3";
  mainTextDisplayed: string = "text-displayed-01 fs-1"
  prevTextDisplayed: string = "text-displayed-02 fs-6 m-0"
}
