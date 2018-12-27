var countDownDate = new Date("Dec 30, 2018 15:10").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;
  
  if (distance < 0) {
	  countDownDate = new Date("May 13, 2019 1:00").getTime();
	  distance = countDownDate - now;
  }

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="decompte"
  document.getElementById("decompte").innerHTML = days + " Jours " + hours + "H" +
    minutes + ":" + seconds + "";

  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("decompte").innerHTML = "EXPIRED";
  }
}, 1000);

