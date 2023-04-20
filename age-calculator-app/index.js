const ERROR_STATE_CLASS = {
    "day": '.day-error-msg',
    "month": '.month-error-msg',
    "year": '.year-error-msg',
}

const LABELS_ERROR_STATE = {
    "day": 'day-label',
    "month": 'month-label',
    "year": 'year-label',
}

const MONTH_DAYS = {
    "1": 31,
    "2": 28,
    "3": 31,
    "4": 30,
    "5": 31,
    "6": 30,
    "7": 31,
    "8": 31,
    "9": 30,
    "10": 31,
    "11": 30,
    "12": 31,
}

try {

    const inputs = document.querySelectorAll('input[type="text"]')
    const day = document.getElementById('day');
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    
    const now = new Date();
    const currentYear = new Date().getFullYear();

    const allowOnlyNumbers = (evt) => {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode < 48 || charCode > 57) {
            evt.preventDefault();
        }
    }

    const clearInputStates = (target) => {
        document.querySelector(ERROR_STATE_CLASS[target.name]).textContent = "";
        target.previousElementSibling.classList.remove(LABELS_ERROR_STATE[target.name]);
        target.classList.remove('error-input');
    }

    const handleChange = (evt) => {
        // console.log(evt);
        const { target } = evt;        

        if(evt.type === 'change' && target.value){
            clearInputStates(target)
        }
       
    };

    inputs.forEach((input) => {
        input.addEventListener('keypress', allowOnlyNumbers);
        input.addEventListener('change', handleChange);
    });

    const handleSubmit = () => {
        const form = document.getElementById('age-calculator-form');

        form.addEventListener('submit', (e) => {
            let isSubmited = true;
            e.preventDefault();
            
            for (let index = 0; index < inputs.length; index++) {
                
                const element = inputs[index];
                const numberOfDaysInMonth = element.value ? MONTH_DAYS[parseInt(month.value).toString()] : 0;
                // console.log(numberOfDaysInMonth)
                if(element.value === ''){                
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "The field is required";
                    element.previousElementSibling.classList.add(LABELS_ERROR_STATE[element.name]);
                    element.classList.add('error-input');
                    isSubmited = false;
                }

                if((element.value > 32 || element.value === 0) && element.name === 'day'){
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Must be a valid day";
                    element.previousElementSibling.classList.add(LABELS_ERROR_STATE[element.name]);
                    element.classList.add('error-input');
                    isSubmited = false;
                }     
                
                if((element.value > numberOfDaysInMonth) && element.name === 'day'){
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Must be a valid day";
                    element.previousElementSibling.classList.add(LABELS_ERROR_STATE[element.name]);
                    element.classList.add('error-input');
                    isSubmited = false;
                }   

                if((element.value > 12 || element.value === 0) && element.name === 'month'){
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Must be a valid month";
                    element.previousElementSibling.classList.add(LABELS_ERROR_STATE[element.name]);
                    element.classList.add('error-input');
                    isSubmited = false;
                }             

                if((element.value > currentYear || element.value.toString().length < 3) && element.name === 'year'){
                    document.querySelector(ERROR_STATE_CLASS[element.name]).textContent = "Must be in the past";
                    element.previousElementSibling.classList.add(LABELS_ERROR_STATE[element.name]);
                    element.classList.add('error-input');
                    isSubmited = false;
                }
            }

            if(isSubmited){
                const userBirthDate = new Date(`${year.value}-${month.value}-${day.value}`)
                const yearsElem = document.getElementById('result-years');
                const monthsElem = document.getElementById('result-months');
                const daysElem = document.getElementById('result-days');

                // Find the difference between now an the user birthdate
                var difference = now - userBirthDate;
                
                // Age calculations for years, months & days
                const _year = currentYear - userBirthDate.getFullYear();
                const months = (month.value > now.getMonth()) ? (_year - 1) * 12 : _year * 12;
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                
                yearsElem.textContent = (month.value > now.getMonth()) ? _year - 1 : _year;
                monthsElem.textContent = months + now.getMonth() + 1;
                daysElem.textContent = days;

                inputs.forEach(input => clearInputStates(input))                
            }
        })
    }

    handleSubmit();

} catch (error) {
    console.log('Error statement:', error);
}