/*  
    EXPLANATION:
    - calculate() => Calculate the singles operations until the array "arrFullCalc" contains elements equal 
    to or greater than 3 elements.

    - singleCalculation() => After take index of the arithmertic operation as argument, it takes the number before and 
    after the index,replace the 3 values [numberA, arit-oper, numberB] with the result of the operation. 

    - findArithmeticSign() => The function finds the index of arithmetic operations, following the rules of mathematics,
      i.e. the function first takes the index of multiplications and divisions in order, then takes the sums 
      and subtractions still in order.
*/

export class CalculatorLogic {
    /* VARIABLES */
    private arrayAllOperations: string[];
    private finalResult: number;

    constructor() { }

    calculate(arrayOfOperations: string[]): number {
        this.arrayAllOperations = arrayOfOperations;

        while (this.arrayAllOperations.length >= 3) {
            this.singleCalculation();
        }

        this.finalResult = parseFloat(this.arrayAllOperations[0]);
        return this.finalResult;
    }

    private singleCalculation() {
        let indexArithmeticSign: number = this.findArithmeticSign();
        let pieceOfSingleCalc = this.arrayAllOperations.splice(indexArithmeticSign - 1, 3);
        let resultOfSingleOperation = this.calculateSingleOperation(pieceOfSingleCalc);
        this.arrayAllOperations.splice(indexArithmeticSign - 1, 0, resultOfSingleOperation); //Substitute the operation with the result
    }

    private findArithmeticSign(): number {
        let index: number;
        let indexMul = this.arrayAllOperations.indexOf('x');
        let indexDiv = this.arrayAllOperations.indexOf('/');
        let indexPlus = this.arrayAllOperations.indexOf('+');
        let indexLess = this.arrayAllOperations.indexOf('-');

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

    private calculateSingleOperation(operation: string[]): string { //Pass an array of 3 elements e.g. [number-A, arithmetic-sign, number-B]
        let resultOfSingleOperation;
        let numA: number = parseFloat(operation[0]);
        let numB: number = parseFloat(operation[2]);

        switch (operation[1]) {
            case 'x':
                resultOfSingleOperation = numA * numB;
                break;
            case '/':
                resultOfSingleOperation = numA / numB;
                break;
            case '+':
                resultOfSingleOperation = numA + numB;
                break;
            case '-':
                resultOfSingleOperation = numA - numB;
                break;
        }

        resultOfSingleOperation = resultOfSingleOperation.toFixed(6).toString(); //Set the precision of decimal digits and stringify the result for the array
        return resultOfSingleOperation;
    }
}