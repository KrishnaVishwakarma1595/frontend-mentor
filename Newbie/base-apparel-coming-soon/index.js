try {
    const input = document.querySelector('input[type="email"]');

    const validateEmail = (email) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const clearInputErrorState = ({ target }) => {
        if(target.value){
            document.querySelector('.error-msg').textContent = "";
            document.querySelector('.error-icon').style.display = 'none';
            input.classList.remove('error-input-state');                
        }
    }

    input.addEventListener('change', clearInputErrorState);

    const handleSubmit = () => {
        const form = document.getElementById('base-apparel-form');

        form.addEventListener('submit', (e) => {
            let isSubmited = true;
            e.preventDefault();

            if(input.value === ''){
                document.querySelector('.error-msg').textContent = "The field is required";
                document.querySelector('.error-icon').style.display = 'block';
                input.classList.add('error-input-state');                
                isSubmited = false;
            }
            
            if(input.value && !validateEmail(input.value)){
                document.querySelector('.error-msg').textContent = "Please provide a valid email";
                document.querySelector('.error-icon').style.display = 'block';
                input.classList.add('error-input-state');                
                isSubmited = false;
            }
            
            if(isSubmited){                
                input.value = "";
                input.style.display = 'none';
                document.querySelector('.submit-btn').style.display = 'none';
                document.querySelector('.thanks-message').style.display = 'block';
            }

        })
    }
    
    handleSubmit();

} catch (error) {
    console.log("Error statement:", error);
}