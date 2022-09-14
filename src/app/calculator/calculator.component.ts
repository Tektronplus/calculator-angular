import { Component, OnInit } from '@angular/core';
import { CalculatorLogic } from './calculator-logic';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() {}

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
    this.prevInputNumber = this.arrFullCalc.join(" ") + " =";

    let calculator = new CalculatorLogic();
    this.result = calculator.calculate(this.arrFullCalc)
    this.inputNumber = this.result.toString();

    //To reset variable fro a new calculation
    this.arrFullCalc = [];

    this.isNewCalc = true;
    this.isResult = true;
  }

  /* === CSS VARIABLES === */
  calculatorCSS: string = "container text-center border border-3 border-secondary bg-dark bg-gradient rounded-4 p-3";
  mainTextDisplayed: string = "text-displayed-01 fs-1"
  prevTextDisplayed: string = "text-displayed-02 fs-6 m-0"
}
