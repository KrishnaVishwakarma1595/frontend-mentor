try {

    const CHOICES = {
        'uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'lowercase': 'abcdefghijklmnopqrstuvwxyz',
        'numbers': '0123456789',
        'symbols': '!@#$%^&*()'
    }

    const STRENTH_SCORE ={
        '1': 'too weak!',
        '2': 'weak',
        '3': 'medium',
        '4': 'strong',
    }

    const PasswordGenerator = class{
        constructor(){
            this.passwordIncludes = [];
            this.copyToClipboard = document.querySelector('.copy_to_clipboard');
            this.password = document.querySelector('.ps_generated_password');
            this.passwordStrength = document.querySelector('.ps_strength');
            this.inputRange = document.getElementById('customRange');
            this.charLength = document.querySelector('.char__length');
            this.checkboxes = document.querySelectorAll('.ps__checkbox');
            this.generateButton = document.querySelector('.generate__password');
        }

        randomChars() {
            let string = "";
            const choices = [];
            this.passwordIncludes.forEach(item => choices.push(CHOICES[item]));
            console.log('choices', choices.join(''))
            for (let i = 0; i < parseInt(this.charLength.textContent); i++) {
                string += choices.join('').charAt(Math.floor(Math.random() * choices.join('').length));
            }
            return string;
        }

        calculatePasswordStrenth(){
            const charLength = parseInt(this.charLength.textContent);
            if(charLength <= 5) return '1';
            if(charLength > 5 && charLength <= 10) return '2';
            if(charLength > 10 && charLength <= 15) return '3';
            if(charLength > 15 && charLength <= 20) return '4';
        }

        init(){
            this.checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', (e) => {
                    document.querySelector('.copiedText').style.display = 'none';
                    document.querySelector('.strength__level').textContent = '';
                    if(e.target.checked){
                        this.passwordIncludes.push(e.target.dataset.value);
                    }else{
                        const index = this.passwordIncludes.indexOf(e.target.dataset.value);
                        if(index !== -1){
                            this.passwordIncludes.splice(index, 1);
                        }
                    } 
                })
            })
            
            this.inputRange.addEventListener('input', (e) => {
                this.charLength.textContent = e.target.value;
                document.querySelector('.copiedText').style.display = 'none';
                document.querySelector('.strength__level').textContent = '';
            })

            this.generateButton.addEventListener('click', () => {                
                document.querySelector('.strength__level').textContent = '';
                document.querySelector('.copiedText').style.display = 'none';

                if(this.passwordIncludes.length > 0){
                    const password = this.randomChars();
                    const strengthScore = this.calculatePasswordStrenth();
                    this.password.value = password;
                    this.passwordStrength.dataset.value = strengthScore;
                    document.querySelector('.strength__level').textContent = STRENTH_SCORE[strengthScore]
                }else{
                    alert('Please select any option first!');
                }
            })

            this.copyToClipboard.addEventListener('click', () => {
                if(this.password.value){
                    navigator.clipboard.writeText(this.password.value);
                    document.querySelector('.copiedText').style.display = 'block';
                }else{
                    alert('Please generate password first to copy!');
                }
            })
        }
    }

    const generator = new PasswordGenerator();
    generator.init();
} catch (error) {
    console.log('Error detected...', error);
}