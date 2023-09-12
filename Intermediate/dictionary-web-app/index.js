try {
    class Dictionary{
        constructor(){
            this.searchTerm = "";
            this.searchInput = document.querySelector('.dictonary__search_bar');

            this.switcher = document.querySelector('.theme-switcher');
            this.dropdownButton = document.querySelector('.dictionary__dropdown_button_text');
            this.listItems = document.querySelectorAll('.list-item');
            this.searchIcon = document.querySelector('.dictionary_search_icon');
            this.errorMessage = document.querySelector('.error-message');

            this.termResult = document.querySelector('.dictionary_result_term_phonetic');
            this.playIcon = document.querySelector('.dictionary__play_icon');
            this.nounMeaningList = document.querySelector('.dictionary__noun_definitions');
            this.nounSynonymsTags = document.querySelector('.dictionary__term_synonyms');
            this.verbMeaningList = document.querySelector('.dictionary__verb_definitions');
            this.sourceLink = document.querySelector('.sourceLink');

            this.resultContainer = document.querySelector('.dictionary__results_container');
            this.resultNotFoundContainer = document.querySelector('.dictionary__result_not_found');
            this.loader = document.querySelector('.loader');
            this.audioLink = '';

            this.verbContainer = document.querySelector('.dictionary__verb_container');
            this.synonymContainer = document.querySelector('.synonym_container');
            this.crossIcon = document.querySelector('.cross_icon');
        }

        async getDefinationOfWord(){
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.searchTerm}`);
            const response = await res.json();
            if(res.status === 200){
                console.log('response', response);
                const result = response[0];
                const meanings = result.meanings;

                // Render searched term and its phonetic
                this.termResult.firstElementChild.textContent = result.word;
                this.termResult.lastElementChild.textContent = result.phonetic;
                
                // Render source link                
                if(result.sourceUrls && result.sourceUrls.length){
                    this.sourceLink.textContent = result.sourceUrls[0]
                }

                // get searched term phonetic audio link if exist
                if(result.phonetics && result.phonetics.length){
                    const phonetics = result.phonetics.filter((item) => item.audio);
                    this.audioLink = phonetics.length ? phonetics[0]['audio'] : '';
                }

                // render noun & verb meanings
                if(meanings.length){
                    const noun = meanings.filter((item) => item.partOfSpeech === 'noun');
                    const verb = meanings.filter((item) => item.partOfSpeech === 'verb');

                    // render noun meanings
                    if(noun.length &&noun[0].definitions && noun[0].definitions.length){
                        noun[0].definitions.forEach((definition) => {
                            const nounMeaninglistItem = document.createElement('li');
                            nounMeaninglistItem.classList.add('dictionany__noun_meaning_item');
                            nounMeaninglistItem.textContent = definition.definition;
                            this.nounMeaningList.appendChild(nounMeaninglistItem);
                        })
                    }

                    // render noun synonyms
                    if(noun[0].synonyms.length){
                        this.nounSynonymsTags.textContent = noun[0].synonyms.join(',');
                    }else{
                        this.synonymContainer.style.display = 'none';
                    }

                    // render verb meanings
                    if(verb.length && verb[0].definitions && verb[0].definitions.length){
                        verb[0].definitions.forEach((definition) => {
                            const verbMeaninglistItem = document.createElement('li');
                            verbMeaninglistItem.classList.add('dictionany__noun_meaning_item');

                            const firstChild = document.createElement('p')
                            firstChild.textContent = definition.definition;
                            verbMeaninglistItem.appendChild(firstChild);

                            if(definition.example){
                                const lastChild = document.createElement('p')
                                lastChild.textContent = "“" + definition.example + "”";
                                lastChild.classList.add('subtexts', 'dictionary__verb_definitions_example')
                                verbMeaninglistItem.appendChild(lastChild);
                            }

                            this.verbMeaningList.appendChild(verbMeaninglistItem);
                        })
                    }else{
                        this.verbContainer.style.display = 'none';
                    }
                }
                this.loader.style.display = 'none';                
                this.resultNotFoundContainer.style.display = 'none';
                this.resultContainer.style.display = 'block';
                document.body.dataset.result = "true"
                this.searchIcon.style.display = 'none';
                this.crossIcon.style.display = 'block';
            }

            if(res.status === 404){
                console.log('no data found');
                this.loader.style.display = 'none';                
                this.resultContainer.style.display = 'none';
                this.resultNotFoundContainer.style.display = 'grid';
                document.body.dataset.result = "false"
            }
        }

        resetStates(){
            this.resultContainer.style.display = 'none';
            this.resultNotFoundContainer.style.display = 'none';
            this.termResult.firstElementChild.textContent = ''
            this.termResult.lastElementChild.textContent = '';
            this.sourceLink.textContent = '';
            this.audioLink = '';
            this.nounSynonymsTags.textContent = '';
            this.nounMeaningList.innerHTML = '';
            this.verbMeaningList.innerHTML = '';
            document.body.dataset.result = "false";
            this.verbContainer.style.display = 'flex';
            this.synonymContainer.style.display = 'flex';
            this.searchIcon.style.display = 'block';
            this.crossIcon.style.display = 'none';
        }

        handleInputChange(e){
            this.searchTerm = e.target.value;

            if(e.key === 'Enter' && e.keyCode === 13){
                e.preventDefault();
                if(this.searchTerm === ''){
                    this.errorMessage.style.display = 'block';
                    this.searchInput.classList.add('dictonary__search_bar_error')
                }else{
                    this.loader.style.display = 'flex';
                    this.resetStates();

                    setTimeout(() => {
                        this.getDefinationOfWord()
                    }, 500)
                }
            }
        }

        init(){
            // setUser prefered theme or font style
            const theme = localStorage.getItem('theme');
            const fontStyle = localStorage.getItem('theme-font');

            if(theme){
                document.body.dataset.theme = theme;
            }else{
                const a = window.matchMedia("(prefers-color-scheme: dark)");
                if(a.matches){
                    document.body.dataset.theme = 'dark';
                    localStorage.setItem('theme', 'dark');
                }else{
                    localStorage.setItem('theme', 'light');
                }
            }

            if(fontStyle){
                document.body.dataset.themeFont = fontStyle;
                this.dropdownButton.textContent = fontStyle
            }else{
                localStorage.setItem('theme-font', "Sans Serif")
                this.dropdownButton.textContent = document.body.dataset.themeFont = "Sans Serif";
            }

            if(this.switcher){
                this.switcher.addEventListener('click', () => {
                    document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
                    localStorage.setItem('theme', document.body.dataset.theme);
                })
            }

            if(this.listItems.length){
                this.listItems.forEach((listItem) => {
                    listItem.addEventListener('click', () => {
                        this.dropdownButton.textContent = listItem.dataset.value;
                        document.body.dataset.themeFont = listItem.dataset.value;
                        localStorage.setItem('theme-font', listItem.dataset.value);
                    })
                })
            }

            if(this.searchInput){
                this.searchInput.addEventListener('change', (e) => {
                    this.searchTerm = e.target.value;
                })

                this.searchInput.addEventListener('keypress', (e) => {
                    this.errorMessage.style.display = 'none';
                    this.searchInput.classList.remove('dictonary__search_bar_error')
                    this.handleInputChange(e);
                })
            }

            if(this.searchIcon){
                this.searchIcon.addEventListener('click', () => {
                    if(this.searchTerm === ''){
                        this.errorMessage.style.display = 'block';
                        this.searchInput.classList.add('dictonary__search_bar_error')
                    }else{
                        console.log(this.searchTerm)
                        this.loader.style.display = 'flex';
                        this.resetStates();
                        setTimeout(() => {
                            this.getDefinationOfWord()
                        }, 500)
                    }
                })
            }

            if(this.playIcon){
                this.playIcon.addEventListener('click', (e) => {
                    if(this.audioLink){
                        const audio = new Audio(this.audioLink);
                        audio.play();
                    }else{
                        alert('No sound file!')
                    }
                })
            }

            if(this.crossIcon){
                this.crossIcon.addEventListener('click', () => {
                    this.resetStates();
                    this.searchInput.value = ''
                })
            }

        }
    }

    const dictionaryApp = new Dictionary();
    dictionaryApp.init();

} catch (error) {
    console.log('Error detected', error);
}