var scrollDistance;
var disabledLandingPage = false; //universal flag -- !important
var WIDTH;
var HEIGHT;
var txtBoxes;
var cookieString = "seenlandingpage";
var cookieValue = 0;


    var cookie = document.cookie;
    console.log(cookie);
    var valueIndex = cookie.search(cookieString) + cookieString.length + 1;
    cookieValue = cookie.charAt(valueIndex);

$(document).ready(function() {
    
    WIDTH = $(window).width();
    HEIGHT = $(window).height();

    if (mobilecheck()) {
        $('#suggestions').fadeIn(2000);
        $('#browser-suggestion').css('display', 'none');
    } else {
        if (!Detector.webgl) {
            $('#suggestions').fadeIn(2000);
            $('#device-suggestion').css('display', 'none');
        };
    }


    txtBoxes = $('.txtbox');
    for (var i = txtBoxes.length - 1; i >= 0; i--) {
        $(txtBoxes[i]).css('left',WIDTH/2 - (WIDTH*0.4)/2);
    };


});



$(window).resize(function() {
    WIDTH = $(window).width();
    HEIGHT = $(window).height();

    txtBoxes = $('.txtbox');
    for (var i = txtBoxes.length - 1; i >= 0; i--) {
        $(txtBoxes[i]).css('left',WIDTH/2 - (WIDTH*0.4)/2);
    };

});

