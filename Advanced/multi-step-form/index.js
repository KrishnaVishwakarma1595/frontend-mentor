try {

    const STEPS_DATA = {
        "step 1": { title: 'Personal info', description: 'Please provide your name, email address, and phone number.' },
        "step 2": { title: 'Select your plan', description: 'You have the option of monthly or yearly billing.' },
        "step 3": { title: 'Pick add-ons', description: 'Add-ons help enhance your gaming experience.' },
        "step 4": { title: 'Finishing up', description: 'Double-check everything looks OK before confirming.' },
    }

    const ADD_ONS = {
        "1": { title: 'Online service', price: '$1/mo', actual_price: 1 }, 
        "2": { title: 'Larger storage', price: '$2/mo', actual_price: 2 }, 
        "3": { title: 'Customizable profile', price: '$2/mo', actual_price: 2 }, 
    }

    const PLAN_COSTS = {
        "Arcade": 9,
        "Advanced": 12,
        "Pro": 15
    }

    const ERROR_MESSAGES = {
        name: 'This field is required',        
        email: 'This field is required',
        phone: 'This field is required',
    }

    const MultiStepForm = class{

        constructor(){
            this.step = 1;
            this.plan = 'Monthly';
            this.selectedPlan = '';
            this.addOns = [];
            this.formHeading = document.querySelector('.form_heading');
            this.formDescription = document.querySelector('.form_step_description');
            this.goBackBtn = document.querySelector('.step_go_back');
            this.nextStepBtn = document.querySelector('.step_next');
            this.allInputs = document.querySelectorAll('.form_input');
            this.switchCircle = document.querySelector('.switch_circle');
            this.planCards = document.querySelectorAll('.plan_card');
        }

        getAllInputs(){
            const obj = {};
            this.allInputs.forEach(input => {
                obj[input.name] = input.value;
            })
            return obj;
        }

        setHeadingAndDescription(step){
            this.formHeading.textContent = STEPS_DATA[`step ${step}`]['title'];
            this.formDescription.textContent = STEPS_DATA[`step ${step}`]['description'];
        }
    
        resetInputs(){        
            this.allInputs.forEach(input => {
                input.value = '';
            })        
        }

        handleStep1Form(){
            let isSubmitted = true;
            const values = this.getAllInputs();
            const regex = /^[+]?[0-9]*$/;
            const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            this.allInputs.forEach(input => {
                if(input.value === ''){
                    input.classList.add('error-field');
                    document.querySelector(`.error_${input.name}`).textContent = "This field is required";
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

            if (!regex.test(values.phone)) {
                document.querySelector('.phone_input').classList.add('error-field');
                document.querySelector(`.error_phone`).textContent = 'Please enter a valid phone number.';
                document.querySelector(`.error_phone`).style.display = "block";
                isSubmitted = false;
            }

            if(isSubmitted){
                this.step = 2;
                document.querySelector('.form_step_1').style.display = 'none';
                document.querySelector('.form_step_2').style.display = 'flex';
                this.setHeadingAndDescription(this.step);
                document.querySelector('.sidebar__list').dataset.active = 2;
                this.goBackBtn.style.visibility = "visible";                
            }
        }

        init(){
            this.nextStepBtn.addEventListener('click',(e) => {
                switch(this.step){
                    case 1:
                        this.handleStep1Form();
                        break;
                    case 2:
                        if(this.selectedPlan){
                            this.step = 3;
                            document.querySelector('.form_step_2').style.display = 'none';
                            document.querySelector('.form_step_3').style.display = 'flex';
                            this.setHeadingAndDescription(this.step);
                            document.querySelector('.sidebar__list').dataset.active = 3;
                        }else{
                            document.querySelector('.error_plan').style.display = 'block';
                        }
                        break;
                    case 3:
                        this.step = 4;
                        let planPrice = 0;
                        const addOnSummaryList = document.querySelector('.add_on_summary')
                        
                        const allCheckedBoxes = document.querySelectorAll(`input[type="checkbox"]:checked`);
                        allCheckedBoxes.forEach((checkbox) => {
                            this.addOns.push(ADD_ONS[checkbox.dataset.value])
                        })

                        planPrice = PLAN_COSTS[this.selectedPlan] * (this.plan === 'Monthly' ? 1 : 10);
                        console.log(`${this.selectedPlan}(${this.plan}`)
                        document.querySelector('.selected_plan').textContent = `${this.selectedPlan}(${this.plan})`;
                        document.querySelector('.final_plan_price').textContent = `$${PLAN_COSTS[this.selectedPlan] * (this.plan === 'Monthly' ? 1 : 10)}/${this.plan === 'Monthly' ? 'mo' : 'yr'}`

                        this.addOns.forEach((addOn) => {
                            const li = document.createElement("li");
                            li.classList.add('add_on_summary_list_item');

                            const firstChild = document.createElement("span");
                            firstChild.classList.add('added_service')
                            firstChild.textContent = addOn.title;

                            const lastChild = document.createElement("span");
                            lastChild.classList.add('added_service_price');
                            lastChild.textContent = `+$${addOn.actual_price * (this.plan === 'Monthly' ? 1 : 10)}/${this.plan === 'Monthly' ? 'mo' : 'yr'}`;

                            li.appendChild(firstChild);
                            li.appendChild(lastChild);

                            addOnSummaryList.appendChild(li);
                            planPrice += addOn.actual_price * (this.plan === 'Monthly' ? 1 : 10);
                        })

                        document.querySelector('.total_price').textContent = `$${planPrice}/${this.plan === 'Monthly' ? 'mo' : 'yr'}`

                        document.querySelector('.form_step_3').style.display = 'none';
                        document.querySelector('.form_step_4').style.display = 'flex';
                        this.setHeadingAndDescription(this.step);
                        document.querySelector('.sidebar__list').dataset.active = 4;

                        this.nextStepBtn.textContent = 'Confirm';
                        this.nextStepBtn.classList.add('finalCall');

                        break;
                    case 4:                        
                        document.getElementById('step-1').style.display = 'none';
                        document.querySelector('.form_action_container').style.display = "none";
                        document.querySelector('.thanks_container').style.display = 'flex';
                        break;
                    default:
                        break;
                }
            })

            this.goBackBtn.addEventListener('click', () => {
                this.step -= this.step > 1 ? 1 : 0;
                switch(this.step){
                    case 3:
                        const addOnSummaryList = document.querySelector('.add_on_summary')
                        addOnSummaryList.textContent = '';                 
                        this.addOns = [];
                        document.querySelector('.form_step_4').style.display = 'none';
                        document.querySelector('.form_step_3').style.display = 'flex';
                        break;
                    case 2:
                        document.querySelector('.form_step_3').style.display = 'none';
                        document.querySelector('.form_step_2').style.display = 'flex';
                        break;
                    case 1:
                        document.querySelector('.form_step_2').style.display = 'none';
                        document.querySelector('.form_step_1').style.display = 'flex';
                        this.goBackBtn.style.visibility = "hidden";                
                        break;
                    default:
                        break;
                }
                this.setHeadingAndDescription(this.step);
                document.querySelector('.sidebar__list').dataset.active = this.step;
                this.nextStepBtn.textContent = 'Next Step';
                this.nextStepBtn.classList.remove('finalCall');
            })

            this.allInputs.forEach(input => {
                input.addEventListener('change', (e) => {
                    if(e.target.value){
                        input.classList.remove('error-field');
                        document.querySelector(`.error_${e.target.name}`).textContent = '';
                        document.querySelector(`.error_${e.target.name}`).style.display = "none";
                    }
                })
            })

            this.switchCircle.addEventListener('click', () => {
                if(this.plan === 'Monthly'){
                    this.switchCircle.parentElement.parentElement.dataset.plan = "Yearly";
                    this.switchCircle.style.transform = 'translateX(17px)';
                    this.plan = "Yearly";
                    document.querySelectorAll('.plan_yearly').forEach(item => item.style.display = 'block');
                    document.querySelectorAll('.plan_price').forEach(item => {
                        item.textContent = `$${PLAN_COSTS[item.parentElement.parentElement.dataset.value] * 10}/yr`
                    })
                }else{
                    this.switchCircle.parentElement.parentElement.dataset.plan = "Monthly";
                    this.switchCircle.style.transform = 'translateX(0px)';
                    this.plan = "Monthly";
                    document.querySelectorAll('.plan_yearly').forEach(item => item.style.display = 'none');
                    document.querySelectorAll('.plan_price').forEach(item => {
                        item.textContent = `$${PLAN_COSTS[item.parentElement.parentElement.dataset.value] * 1}/mo`
                    })
                }
            })

            this.planCards.forEach((item) => {
                item.addEventListener('click', () => {
                    this.planCards.forEach(card => card.classList.remove('activePlanCard'))
                    item.classList.toggle('activePlanCard');
                    this.selectedPlan = item.dataset.value;
                    document.querySelector('.error_plan').style.display = 'none';
                })
            })

            document.querySelector('.plan_change').addEventListener('click', () => {
                const addOnSummaryList = document.querySelector('.add_on_summary')
                addOnSummaryList.textContent = '';                 
                this.addOns = [];
                this.step = 2;
                this.setHeadingAndDescription(this.step);
                document.querySelector('.form_step_4').style.display = 'none';
                document.querySelector('.form_step_2').style.display = 'flex';

                this.nextStepBtn.textContent = 'Next Step';
                this.nextStepBtn.classList.remove('finalCall');
            })

        }

    }

    const multiStepForm = new MultiStepForm();
    multiStepForm.init();
    multiStepForm.setHeadingAndDescription(1);
} catch (error) {
    console.log('error detected', error)
}