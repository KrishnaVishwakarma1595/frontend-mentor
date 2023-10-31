try {
    let isYealrlyPlan = false;
    const switchCircle= document.querySelector('.switcher_circle');
    const inputRange = document.getElementById('custom-range');
    let shortValue = 100000, totalPrice = 16;

    inputRange.addEventListener('input', (e) => {
        const rangeValue = e.target.value;

        if (rangeValue >= 1000000) {
            shortValue = (rangeValue / 1000000).toFixed(1) + "m";
        } else if (rangeValue >= 1000) {
            shortValue = (rangeValue / 1000).toFixed(0) + "k";
        } else {
            shortValue = rangeValue;
        }

        if(rangeValue >= 500000){
            totalPrice = 36;
        }else if(rangeValue > 100000 && rangeValue <= 500000){
            totalPrice = 24;
        }else if(rangeValue > 50000 && rangeValue <= 100000){
            totalPrice = 16;
        }else if(rangeValue > 10000 && rangeValue <= 50000){
            totalPrice = 12;
        }else{
            totalPrice = 8;
        }

        if(isYealrlyPlan){
            totalPrice = (totalPrice * 25) / 100;            
        }

        document.querySelector('.page_views_total').textContent = shortValue + " ";
        document.querySelector('.pricing_total').textContent = `$${totalPrice.toFixed(2)}`;
        
    })

    switchCircle.addEventListener('click', () => {
        if(switchCircle.parentElement.dataset.value === 'Monthly'){
            switchCircle.parentElement.dataset.value = "Yearly";
            isYealrlyPlan = true;
            switchCircle.style.transform = "translateX(19px)";
            document.querySelector('.pricing_per_sl').textContent = "/ year";
            totalPrice = (totalPrice * 25) / 100;
            document.querySelector('.pricing_total').textContent = `$${totalPrice.toFixed(2)}`;
        }else{
            switchCircle.parentElement.dataset.value = "Monthly";
            isYealrlyPlan = false;
            switchCircle.style.transform = "translateX(0px)";
            totalPrice = (totalPrice * 100) / 25;
            document.querySelector('.pricing_per_sl').textContent = "/ month";
            document.querySelector('.pricing_total').textContent = `$${totalPrice.toFixed(2)}`;
        }
    })

} catch (error) {
    console.log('Error detected', error);
}