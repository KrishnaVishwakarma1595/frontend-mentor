try {
    const ContactForm = class {
        constructor(){            
            this.form = document.querySelector('.formElement');
            this.radioButtonValue = null;
            this.radioButtons = document.getElementsByName('radio');
            this.checkBox = document.getElementById('checkbox');
            this.textArea = document.querySelector('.fieldArea');
            this.allInput = document.querySelectorAll('.field');
        }

        getInputFieldData() {
            const data = {};             
            this.allInput.forEach((input) => {
                data[input.name] = input.value;
            });
            return data;
        }

        resetInputs(){        
            this.allInput.forEach(input => {
                input.value = '';
            })
            this.radioButtons.forEach(rButton => {
                // rButton.value = '';
                rButton.checked = false;
            })      
            this.checkBox.checked = false;
            this.textArea.value = '';  
        }

        init(){

            this.allInput.forEach((input) => {
                input.addEventListener('change', (e) => {
                    if(e.target.value){
                        e.target.classList.remove('errorField');                        
                        document.querySelector(`.error_${e.target.name}`).style.display = "none";
                    }
                })
            })

            document.querySelector('.fieldArea').addEventListener('change', (e) => {
                if(e.target.value){
                    document.querySelector('.fieldArea').classList.remove('errorField');                    
                    document.querySelector(`.error_message`).style.display = "none";
                }
            })

            this.checkBox.addEventListener('change', (e) => {
                if(e.target.checked){
                    document.querySelector(`.error_checkbox`).style.display = "none";
                }
            })

            this.radioButtons.forEach((rButton) => {
                rButton.addEventListener('change', (e) => {
                    if(e.target.checked){
                        document.querySelector(`.error_radio`).style.display = "none";
                        this.radioButtonValue = e.target.value;
                    }
                })
            })

            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                let isSubmitted = true;
                const values = this.getInputFieldData();
                const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                this.allInput.forEach((input) => {
                    if(input.value === ''){
                        input.classList.add('errorField');                        
                        document.querySelector(`.error_${input.name}`).textContent = "This field is required";
                        document.querySelector(`.error_${input.name}`).style.display = "block";
                        isSubmitted = false;
                    }
                })

                if(values.email && !emailValidationRegex.test(values.email.toLowerCase())){
                    document.getElementById('email').classList.add('errorField');
                    document.querySelector(`.error_email`).textContent = 'Please enter a valid email address';
                    document.querySelector(`.error_email`).style.display = "block";
                    isSubmitted = false;
                }

                if(this.textArea.value === ''){
                    document.querySelector('.fieldArea').classList.add('errorField');                    
                    document.querySelector(`.error_message`).style.display = "block";
                    isSubmitted = false;
                }
                
                if(!this.radioButtonValue){                                          
                    document.querySelector(`.error_radio`).style.display = "block";
                    isSubmitted = false;
                }

                if(!this.checkBox.checked){
                    document.querySelector(`.error_checkbox`).style.display = "block";
                    isSubmitted = false;
                }

                if(isSubmitted){
                    this.resetInputs();
                    document.querySelector('.successToast').style.display = 'flex';
                    setTimeout(() => {
                        document.querySelector('.successToast').style.display = 'none';
                    }, 2000)
                }
            })
        }
    }

    const form = new ContactForm();
    form.init();
} catch (error) {
    console.log('Error occurred', error);
}