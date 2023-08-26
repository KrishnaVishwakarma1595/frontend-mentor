try {
    let inputEmailValue = '';
    const inputEmail = document.getElementById('newsletter-signup-email');
    const mainContainer = document.getElementById('newsletter-main-container');
    const userEmail = document.querySelector('.user-email');
    const errorStateMessage = document.querySelector('.error-state-message');
    const dismissMessageButton = document.querySelector('.newsletter-dismiss-message');

    inputEmail.addEventListener('change', (e) => {
        const { target } = e;
        inputEmailValue = target.value;
    })

    dismissMessageButton.addEventListener('click', (e) => {
        userEmail.textContent = '';
        mainContainer.classList.remove('with-thanks-state');
        mainContainer.firstElementChild.style.display = "flex";
        mainContainer.lastElementChild.style.display = 'none';
        errorStateMessage.textContent = "";
        inputEmail.value = "";
        inputEmail.classList.remove('error-state');
    })

    const handleFormSubmit = () => {
        const form = document.getElementById('newsletter-form');

        form.addEventListener('submit', (e) => {
            let isSubmited = true;
            e.preventDefault();

            const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(emailValidationRegex.test(inputEmailValue.toLowerCase())){
                userEmail.textContent = inputEmailValue;
                mainContainer.classList.add('with-thanks-state');
                mainContainer.firstElementChild.style.display = "none";
                mainContainer.lastElementChild.style.display = 'flex';
            }else{
                errorStateMessage.textContent = "Valid email required";
                inputEmail.classList.add('error-state');
            }

        })
    }

    handleFormSubmit();

} catch (error) {
    console.log('Error state...', error);
}