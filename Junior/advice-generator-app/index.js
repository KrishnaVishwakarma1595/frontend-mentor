try {
    class AdviceGenerator{

        constructor(){
            this.adviceContainer = document.querySelector('.advice__container');
            this.adviceIdContainer = document.querySelector('.advice__id');
            this.generateButton = document.querySelector('.dice');
        }

        generateRandomAdvice = async () => {
            const response = await fetch('https://api.adviceslip.com/advice');
            if(response && response.status === 200){           
                const advice = await response.json();
                this.adviceContainer.textContent = "“" + advice.slip.advice + "”";
                this.adviceIdContainer.textContent = advice.slip.id;
            }else{
                alert('Please, try again later!');
            }
            this.generateButton.children[0].classList.remove('animate__infinite');
        }

        init(){
            this.generateRandomAdvice();

            this.generateButton.addEventListener('click', () => {
                setTimeout(() => { this.generateRandomAdvice(); }, 1000)
                this.generateButton.children[0].classList.add('animate__infinite');
            })
        }
    }

    const advicer = new AdviceGenerator();
    advicer.init();
    
} catch (error) {
    console.log('Error detected', error);
}