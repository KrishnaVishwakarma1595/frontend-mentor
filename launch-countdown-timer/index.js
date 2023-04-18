const init = () => {
    
    var countDownDate = new Date("Dec 15, 2023 15:37:25").getTime();
    
    var countdownfunction = setInterval(function() {
    
        var now = new Date().getTime();        
        var distance = countDownDate - now;
                
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
        document.getElementById("days-remaining").innerHTML = days;
        document.getElementById("hours-remaining").innerHTML = hours;
        document.getElementById("minutes-remaining").innerHTML = minutes;
        document.getElementById("seconds-remaining").innerHTML = seconds;
                
        if (distance < 0) {
            clearInterval(countdownfunction);
            document.getElementById("status").innerHTML = "EXPIRED";
        }

    }, 1000);
}

init();