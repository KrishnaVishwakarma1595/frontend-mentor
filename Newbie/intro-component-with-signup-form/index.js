try {

    const ERROR_MESSAGES = {
        first_name: 'First Name cannot be empty',
        last_name: 'Last Name cannot be empty',
        email: 'Whoops! It looks like you forgot to add your email!',
        password: 'Password cannot be empty',
    }

    const form = document.getElementById('sign-up-form');
    const allInputs = document.querySelectorAll('.form_input');
    const closeModal = document.querySelector('.close_modal');

    allInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            if(e.target.value){
                input.classList.remove('error-field');
                document.querySelector(`.error_${e.target.name}`).textContent = '';
                document.querySelector(`.error_${e.target.name}`).style.display = "none";
            }
        })
    })

    function getAllInputs(){
        const obj = {};
        allInputs.forEach(input => {
            obj[input.name] = input.value;
        })
        return obj;
    }

    function resetInputs(){        
        allInputs.forEach(input => {
            input.value = '';
        })        
    }

    closeModal.addEventListener('click', (e) => {
        document.getElementById('success-modal').style.display = 'none';
    })
    
    form.addEventListener('submit', (event) => {
        let isSubmitted = true;
        event.preventDefault();

        const values = this.getAllInputs();
        const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        allInputs.forEach(input => {
            if(input.value === ''){
                input.classList.add('error-field');
                document.querySelector(`.error_${input.name}`).textContent = ERROR_MESSAGES[input.name];
                document.querySelector(`.error_${input.name}`).style.display = "block";
                isSubmitted = false;
            }
        })

        if(values.email && !emailValidationRegex.test(values.email.toLowerCase())){
            document.querySelector('.email_input').classList.add('error-field');
            document.querySelector(`.error_email`).textContent = 'Looks like this is not an email';
            document.querySelector(`.error_email`).style.display = "block";
            isSubmitted = false;
        }

        if(isSubmitted){
            resetInputs();
            const elem = document.getElementById('success-modal');
            elem.classList.add('animate__animated', 'animate__fadeIn')
            elem.style.display = 'flex';
        }
    })

} catch (error) {
    console.log('Error', error);
}