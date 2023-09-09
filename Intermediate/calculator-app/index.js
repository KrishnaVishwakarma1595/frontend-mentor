try {
    class Calculator{
        constructor(){
            this.themeIndex = 1;
            this.userInput = "";
            this.result = "";

            this.themeSwitcherElem = document.querySelector('.calculator__switcher_circle');
            this.calculationScreen = document.querySelector('.calculator_screen');
            // this.absoluteInputElem = document.querySelector('.absolute-position-user-input');

            this.deleteButton = document.querySelector('.calculator_del_key');
            this.resetButton = document.querySelector('.calculator_reset_key');
            this.equalsButton = document.querySelector('.calculator_result_equals');

            this.allNumKeys = document.querySelectorAll('.calculator__num_key');
            this.allOperatorKeys = document.querySelectorAll('.calculator__operator_key');

        }

        reset(){
            this.result = "";
            this.userInput = "";
            this.calculationScreen.textContent = "";
        }

        onOperatorClick(operatorValue){
            if(this.userInput.length){
                this.userInput += operatorValue
                this.calculationScreen.textContent = this.userInput;            
            }
        }

        calculateResult(){
            if(this.userInput.length){            
                console.log(this.userInput);
                const expression = this.userInput.replaceAll('x', '*');
                this.result = eval(expression);
                this.calculationScreen.textContent = this.result.toFixed(2).replace(/[.,]00$/, "");            
                this.userInput = "";             
            }
        }

        init(){
            // Event listener to switch b/w themes
            if(this.themeSwitcherElem){
                this.themeSwitcherElem.addEventListener('click', () => {
                    this.themeIndex += 1;
                    if(this.themeIndex > 3){
                        this.themeIndex = 1;
                    }
                    document.body.dataset.theme = this.themeIndex;
                })
            }
            // Event listeners to get the numbers
            if(this.allNumKeys.length > 0){
                this.allNumKeys.forEach((numKey) => {
                    numKey.addEventListener('click', (event) => {
                        const { target } = event;                    
                        this.userInput += target.dataset.value;
                        this.calculationScreen.textContent = this.userInput;
                        if (this.calculationScreen.scrollLeft !== this.calculationScreen.scrollWidth) {
                            this.calculationScreen.scrollTo(this.calculationScreen.scrollLeft + 100, 0);
                        }
                    })
                })
            }
            // Event listener to reset everything
            if(this.resetButton){
                this.resetButton.addEventListener('click', (e) => {
                    this.reset();
                })
            }
            // Event listener to remove last edit number
            if(this.deleteButton){
                this.deleteButton.addEventListener('click', (e) => {
                    const userInput = this.userInput.split('');
                    userInput.pop();
                    this.userInput = userInput.join('');
                    this.calculationScreen.textContent = userInput.join('');                
                })
            }
            // Event listener for operator actions
            if(this.allOperatorKeys.length > 0){
                this.allOperatorKeys.forEach((operatorElem) => {
                    operatorElem.addEventListener('click', (event) => {
                        const { target } = event;                    
                        this.onOperatorClick(target.dataset.value);
                    })
                })
            }
            // Event listener to calcurate result on click
            if(this.equalsButton){
                this.equalsButton.addEventListener('click', (e) => {
                    this.calculateResult();
                })
            }
        }
    }

    const calculator = new Calculator();
    calculator.init();
} catch (error) {
    console.log('Error detected...', error);
}

// calculateResult(){
//     if(this.absoluteInput.length){
//         const numbers = this.absoluteInput.split(/\+|\-|\x|\//g);
//         const operators = this.absoluteInput.replace(/[0-9]|\./g, "").split("");
//         console.log(numbers, operators,this.absoluteInput);

//         if(this.operators.length === 1){
//             switch(this.operators[0]){
//                 case '/':
//                     this.result = +numbers[0] / +numbers[1];
//                     this.calculationScreen.textContent = this.result;
//                     this.absoluteInputElem.textContent = "";
//                     break;
//                 case "x":
//                     this.result = +numbers[0] * +numbers[1];
//                     this.calculationScreen.textContent = this.result;
//                     this.absoluteInputElem.textContent = "";
//                     break;
//                 case "-":
//                     this.result = +numbers[0] - +numbers[1];
//                     this.calculationScreen.textContent = this.result;
//                     this.absoluteInputElem.textContent = "";
//                     break;
//                 case "+":
//                     this.result = +numbers[0] + +numbers[1];
//                     this.calculationScreen.textContent = this.result;
//                     this.absoluteInputElem.textContent = "";
//                     break;
//                 default:
//                     break;
//             }
//             this.userInput = "";
//             this.absoluteInput = "";
//             this.operators = [];
//         }
//     }
// }