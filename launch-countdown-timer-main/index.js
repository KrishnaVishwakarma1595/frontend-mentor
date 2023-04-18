const init = () => {
    // Set the date we're counting down to
    var countDownDate = new Date("Dec 15, 2023 15:37:25").getTime();

    // Update the count down every 1 second
    var countdownfunction = setInterval(function() {
        // Get todays date and time
        var now = new Date().getTime();
        
        // Find the distance between now an the count down date
        var distance = countDownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Output the result in an element with id="demo"
        document.getElementById("days-remaining").innerHTML = days;
        document.getElementById("hours-remaining").innerHTML = hours;
        document.getElementById("minutes-remaining").innerHTML = minutes;
        document.getElementById("seconds-remaining").innerHTML = seconds;
        
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(countdownfunction);
            document.getElementById("status").innerHTML = "EXPIRED";
        }
    }, 1000);
}

init();