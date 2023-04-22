const init = () => {
    try {
        let userRating = 0;
        const ratingItems = document.querySelectorAll('.rating-item');
        const ratingCTABtn = document.querySelector('.rating-submit');

        const onRatingClick = ({ target }) => {            
            userRating = target.dataset.rating;
            ratingItems.forEach((_ratingItem) => {
                if(_ratingItem.classList.contains('rating-item-active')){
                    _ratingItem.classList.remove('rating-item-active')
                }
            })
            target.classList.add('rating-item-active');
        }

        // click event listener for rating
        ratingItems.forEach((_ratingItem) => {
            _ratingItem.addEventListener('click', onRatingClick);
        })

        // submit button click event listener
        ratingCTABtn.addEventListener('click', () => {

            if(userRating){
                const ratingState = document.querySelector('.rating-start-state');
                ratingState.style.display = 'none';
                const thanksState = document.querySelector('.thank-you-state');
                thanksState.style.display = 'grid';
                const ratingSpan = document.querySelector('.user-rating');
                console.log(ratingSpan)
                ratingSpan.innerHTML = userRating;
                // setTimeout(() => {
                // }, 500)
            }else{
                alert('Please provide the rating first!')
            }


        })
        
    } catch (error) {
        console.log(error)
    }
}

init();