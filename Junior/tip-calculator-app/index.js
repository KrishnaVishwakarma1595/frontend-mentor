try {
    const TipCalculator = class {
        constructor(){        
            this.isCustomTip = false;
            this.tipValue = 0;
            this.data = { 'bill': '', 'custom_tip': '', 'number_of_people': '' };
            this.allInputs = document.querySelectorAll('.form-field-input');
            this.allTips = document.querySelectorAll('.spl_dflt__tip');
            this.customTipButton = document.querySelector('.spl_dflt__tip_custom');
            this.form = document.querySelector('.form_container');
            this.errMessageBill = document.querySelector('.error-bill');
            this.errMessageNOP = document.querySelector('.error-nop');
        }

        resetActiveTip(){
            this.allTips.forEach(button => button.classList.remove('activeTip'));
            this.customTipButton.style.display = 'flex';
            document.querySelector('.custom-tip-input').style.display = 'none';
        }

        calculateResults(){
            
            const tip = this.isCustomTip ? parseFloat(document.querySelector('.custom-tip-input').value) : this.tipValue;
            if(this.data.bill && this.data.number_of_people){               
                const tipPerPerson = ((this.data.bill * tip) / 100) / this.data.number_of_people;
                const billPerPerson = (this.data.bill / this.data.number_of_people) + tipPerPerson;
                
                document.querySelector('.tip-amount-per-person').textContent = '$' + tipPerPerson.toFixed(2);
                document.querySelector('.total-amount-per-person').textContent = '$' + billPerPerson.toFixed(2);
            }else{
                console.log('not all values available...');
            }
        }

        init(){

            this.allInputs.forEach((input) => {
                input.addEventListener('change', (e) => {
                    this.data[e.target.name] = e.target.value;
                    if(e.target.value){
                        if(e.target.name === 'bill'){
                            this.errMessageBill.textContent = '';
                            this.errMessageBill.style.display = 'none';
                            document.getElementById('bill-amount').classList.remove('error-field');
                        }
        
                        if(e.target.name === 'number_of_people'){
                            this.errMessageNOP.textContent = '';
                            this.errMessageNOP.style.display = 'none';      
                            document.getElementById('nop').classList.remove('error-field');
                        }                        
                    }                
                })
            })

            this.allTips.forEach((tipButton) => {
                tipButton.addEventListener('click', () => {
                    this.resetActiveTip();
                    tipButton.classList.add('activeTip');
                    this.isCustomTip = false;
                    this.tipValue = tipButton.dataset.tipValue;                    
                })
            })

            this.customTipButton.addEventListener('click', () => {
                this.customTipButton.style.display = 'none';
                document.querySelector('.custom-tip-input').style.display = 'block';
                this.isCustomTip = true;
            })

            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                let isSubmitted = true;

                if(this.data.bill === ''){
                    this.errMessageBill.textContent = 'Required';
                    this.errMessageBill.style.display = 'block';
                    document.getElementById('bill-amount').classList.add('error-field');
                    isSubmitted = false;
                }

                if(this.data.number_of_people === ''){
                    this.errMessageNOP.textContent = 'Required';
                    this.errMessageNOP.style.display = 'block';
                    document.getElementById('nop').classList.add('error-field');
                    isSubmitted = false;
                }

                if(this.data.bill === '0'){
                    this.errMessageBill.textContent = 'Can’t be zero';
                    this.errMessageBill.style.display = 'block';
                    document.getElementById('bill-amount').classList.add('error-field');
                    isSubmitted = false;
                }

                if(this.data.number_of_people === '0'){
                    this.errMessageNOP.textContent = 'Can’t be zero';
                    this.errMessageNOP.style.display = 'block';      
                    document.getElementById('nop').classList.add('error-field');
                    isSubmitted = false;
                }   
    
                if(isSubmitted){
                    this.calculateResults();
                }
            })

            this.form.addEventListener('reset', (e) => {
                e.preventDefault();
                this.resetActiveTip();
                document.querySelector('.tip-amount-per-person').textContent = '$0.00';
                document.querySelector('.total-amount-per-person').textContent = '$0.00';
                document.getElementById('bill-amount').value = '';
                document.getElementById('nop').value = '';
                document.querySelector('.custom-tip-input').value = '';

                this.errMessageBill.textContent = '';
                this.errMessageBill.style.display = 'none';
                document.getElementById('bill-amount').classList.remove('error-field');

                this.errMessageNOP.textContent = '';
                this.errMessageNOP.style.display = 'none';      
                document.getElementById('nop').classList.remove('error-field');
                
                this.data = { 'bill': '', 'custom_tip': '', 'number_of_people': '' };
            })
            
        }
    }

    const tipCalculator = new TipCalculator();
    tipCalculator.init();
} catch (error) {
    console.log('Error detected:', error);
}