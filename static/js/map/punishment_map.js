//**********************************//
//**********map V3******************//
//**********************************//
var winWidth, winHeight, mapofActivated, carriedActivated, punishmentsActivated, zoomedIn;
var changeCaption = [];
var changeCaptionPunishments = [];
var changeCaptionCarried = [];
var viewportWidthArray = [];

//Fetch Json and stuff data into local variables
function getText() {
    $.ajax({
        url: "/static/json/map-text.json",
        dataType: "text",
        success: function(data) {
            var jsonMapText = $.parseJSON(data);
            changeCaption.push(jsonMapText.transgression);
            changeCaption.push(jsonMapText.punishments);
            changeCaption.push(jsonMapText.carriedOutBy[0]);
            changeCaptionCarried.push(jsonMapText.carriedOutBy[1]);
            changeCaptionCarried.push(jsonMapText.carriedOutBy[2]);
            changeCaptionCarried.push(jsonMapText.carriedOutBy[3]);
            changeCaption.push(jsonMapText.deprivations[0]);
            changeCaptionPunishments.push(jsonMapText.deprivations[1]);
            changeCaptionPunishments.push(jsonMapText.deprivations[2]);
            changeCaptionPunishments.push(jsonMapText.deprivations[5]);
            changeCaptionPunishments.push(jsonMapText.deprivations[4]);
            changeCaptionPunishments.push(jsonMapText.deprivations[3]);
            changeCaption.push(jsonMapText.proportional);
            changeCaption.push(jsonMapText.activePassive);
            changeCaption.push(jsonMapText.price);
            $('#tagline-container').html(jsonMapText.mapTitle);
            //for mobile version
            $('#mobile-map-title').html(jsonMapText.mapTitle);
            $('#mobile-transgression').html(jsonMapText.transgression);
            $('#mobile-punishments').html(jsonMapText.punishments);
            $('#mobile-carriedOutBy').html(String(jsonMapText.carriedOutBy[0]) + "<br><br>" + String(jsonMapText.carriedOutBy[1]) + "<br><br>" + String(jsonMapText.carriedOutBy[2]) + "<br><br>" + String(jsonMapText.carriedOutBy[3]));
            $('#mobile-deprivations').html(String(jsonMapText.deprivations[0]) + "<br><br>" + String(jsonMapText.deprivations[1]) + "<br><br>" + String(jsonMapText.deprivations[2]) + "<br><br>" + String(jsonMapText.deprivations[3]) + "<br><br>" + String(jsonMapText.deprivations[4]) + "<br><br>" + String(jsonMapText.deprivations[5]));
            $('#mobile-proportional').html(jsonMapText.proportional);
            $('#mobile-activePassive').html(jsonMapText.activePassive);
            $('#mobile-price').html(jsonMapText.price);
        }
    });
}
function reloadWhenEnlargeScreen(){
    window.setInterval(function(){
        viewportWidthArray.push(winWidth);
        if (viewportWidthArray.length > 20) {
            viewportWidthArray.shift();
        };
    },200);
}
function newMoveMap(targetElement, scale) {
    $('#backtohome').fadeOut();
    $("#mohp-container").css({
        'width': $("#mohp-container").width() * scale,
        'height': $("#mohp-container").height() * scale,
        'left': String(-1 * (targetElement.offset().left * scale - winWidth / 2 + (targetElement.width() * scale) / 2)) + "px",
        'top': String(-1 * (targetElement.offset().top * scale - winHeight / 2 + (targetElement.height() * scale) / 2)) + "px",
    });
}

function zoomInToMapIcon() {
        if(winWidth > 992){
            $('#backtohome').fadeOut();
        }
        var mohpcontainerWidth = (winWidth - winWidth * 0.12) * 4;
        var mohpcontainerHeight = (winHeight - winHeight * 0.03) * 4 - 21;
        $("#mohp-container").css({
            'width': '400%',
            'height': '400%',
            // 'left': String(-1 * (
            //     (winWidth * 0.06 + (mohpcontainerWidth - 30) * 0.06) //map icon offset().left
            //     - winWidth / 2 + (mohpcontainerWidth * 0.25 - mohpcontainerWidth * 0.07) / 2 //map icon width()/2
            // )) + "px",
            // 'top': String(winHeight / 2 - winHeight * 0.03 - mohpcontainerHeight * 0.03 - 238 / 2) + "px"
        });
        window.setTimeout(function(){
        $('#mohp-container').css({
            'left': String(-1 * ($('#map-of').offset().left * 1 - winWidth / 2 + ($('#map-of').width() * 1) / 2)) + "px",
            'top': String(-1 * ($('#map-of').offset().top * 1 - winHeight / 2 + ($('#map-of').height() * 1) / 2)) + "px",  
        })}, 2000);
    }
    // simply center the Veneer
function centerVeneer(highlightSize) {
    var afterScaled = String(highlightSize * 250) + "%";
    $('#veneer-div').css({
        'background-size': afterScaled,
    });
}

function displayText(myWidth, myHeight, myTop, myLeft, myCaption) {
    $("#caption").html(changeCaption[myCaption]);
    $("#text-container").css({
        // 'top': window.innerHeight/2 - $("#text-container").height()/2 - 50,
        // 'bottom': '30px',
        // 'left':winWidth/2 - $("#text-container").width()/2,
    });
    $(function() {
        $("#text-container").fadeIn(1000);
    });
}

function displayTextTagline(myWidth, myHeight, myTop, myLeft) {
    $("#tagline-container").css({
        'top': myTop,
        'left': myLeft,
        'width': myWidth,
        'height': myHeight,
    });
    $(function() {
        $("#tagline-container").delay(1000).fadeIn(1000);
    });
}

function displayTextCarried(myCaption) {
    $("#caption-sub").html(changeCaptionCarried[myCaption]);
    $("#text-container-sub").css({
        // 'top': window.innerHeight/2 - $("#text-container-sub").height()/2 - 50,
    });
    $(function() {
        $("#text-container-sub").fadeIn(1000);
    });
    $(this).css('cursor', 'help');
}

function displayDeprivationsSubCaption(myCaption) {
    $("#caption-sub").html(changeCaptionPunishments[myCaption]);
    $("#text-container-sub").css({
        // 'top': window.innerHeight/2 - $("#text-container-sub").height()/2 - 50,
    });
    $(function() {
        $("#text-container-sub").fadeIn(1000);
    });
    $(this).css('cursor', 'help');
}

function recover() {
    veneerCentered = false;
    zoomedIn = false;
    carriedActivated = false;
    punishmentsActivated = false;
    $('#backtohome').fadeIn();
    //recover map 
    $("#mohp-container").css({
        'width': '100%',
        'height' : 'auto',
        'left': '-3%',
        'top': '0'
    });
    //recover black veneer
    $('#veneer-div').css({
        'background-size': '700%'
    });
    //hide text
    $(function() {
        $("#text-container").fadeOut(1000);
    });
    $(function() {
        $("#text-container-sub").fadeOut(1000);
    });
}

function zoominCarried() {
    // moveMap('150%', '150%', '0%', '-55%'); //map's width, height, top, left
    newMoveMap($('#carried_container'), 1.5);
    // moveVeneer('250%', '340%', '-125%', '-55%'); //veneer's width, height, top, left
    centerVeneer(1);
    displayText('1000px', 'auto', '75%', '20%', 2); //text area's width, height, top, left, paragraph
    zoomedIn = true;
    carriedActivated = true;
}

function zoominPunishments() {
    // moveMap('120%', '120%', '-33%', '-33%'); //map's width, height, top, left
    newMoveMap($('#punishments_container'), 1.3);
    // moveVeneer('190%', '310%', '-97%', '-34%'); //veneer's width, height, top, left
    centerVeneer(1);
    displayText('600px', 'auto', '4%', '20%', 3); //text area's width, height, top, left, paragraph
    zoomedIn = true;
    punishmentsActivated = true;
}

$(document).ready(function() {
    $(this).scrollTop(0);
    getText();
    //initial set up starts here
    mapofActivated = false;
    zoomedIn = false;
    carriedActivated = false;
    punishmentsActivated = false;
    reloadWhenEnlargeScreen();
    winWidth = $(window).width();
    winHeight = $(window).height();
    zoomInToMapIcon();
    // moveVeneer('310%', '310%', '-95%', '-100%'); //width height top left
    centerVeneer(1);
    displayTextTagline('30%', 'auto', '2em', '2em'); //width height top left
    $("#black-veneer").css({
        'opacity': '0.96'
    });

    window.setTimeout(function(){$("#map-of").css({
        'opacity': '1',
        '-webkit-filter': 'blur(0px)',
        '-moz-filter': 'blur(0px)',
        '-ms-filter': 'blur(0px)',
        '-o-filter': 'blur(0px)',
        'filter': 'blur(0px)',
    })},2000);
    
    //initial set up finishes here
    //black cross animation starts here
    $("#black-cross").bind('click hover', function() {
        if (zoomedIn) {
            recover();
        } else {}
    });
    $("#black-cross").hover(function() {
        if (zoomedIn) {
            $(this).css('cursor', 'pointer');
        } else {}
    });
    //black cross animation starts here
    //mapof starts here
    $("#map-of").bind('click hover', function() {
        if (mapofActivated == false) {
            recover();
            $(function() {
                $("#tagline-container").fadeOut(1000);
            });
            mapofActivated = true;
            $(this).attr('id', 'map-of-actived');
            // $(this).css(
            //     '-webkit-filter', 'blur(0px) grayscale(100%) brightness(0)'
            // );
        } else {}
    });
    $("#map-of").mouseenter(function() {
        if (mapofActivated == false) {
            $(this).css({
                'cursor': 'zoom-in',
                // '-webkit-filter': 'blur(0px) grayscale(0) brightness(100%)'
            });
        } else {
            $(this).css('cursor', 'default');
        }
    });
    $("#map-of").mouseleave(function() {
        if (mapofActivated == false) {
            $(this).css({
                'cursor': 'default',
                // '-webkit-filter': 'blur(0px) grayscale(100%) brightness(0)'
            });
        } else {}
    });
    //mapof ends here
    //transgression starts here
    $("#transgression").bind('click hover', function() {
        if (zoomedIn == false && mapofActivated) {
            // moveMap('150%', '150%', '5%', '-25%');
            newMoveMap($('#transgression'), 2);
            // moveVeneer('200%', '220%', '-72%', '-64%');
            centerVeneer(1);
            displayText('1000px', 'auto', '60%', '6%', 0);
            zoomedIn = true;
        } else {}
    });
    $("#transgression").hover(function() {
        if (zoomedIn == false && mapofActivated) {
            $(this).css('cursor', 'zoom-in');
        } else {
            $(this).css('cursor', 'default');
        }
    });
    //transgression ends here
    $("#punishment").bind('click hover', function() {
        if (zoomedIn == false) {
            // moveMap('150%', '150%', '1%', '-40%'); //map's width, height, top, left
            newMoveMap($("#punishment"), 1.6);
            // moveVeneer('150%', '300%', '-110%', '-22%'); //veneer's width, height, top, left
            centerVeneer(1);
            displayText('800px', 'auto', '70%', '28%', 1); //text area's width, height, top, left, paragraph
            zoomedIn = true;
        } else {}
    });
    $("#punishment").hover(function() {
        if (zoomedIn == false) {
            $(this).css('cursor', 'zoom-in');
        } else {
            $(this).css('cursor', 'default');
        }
    });
    //carrried section starts here
    $("#self").bind('click hover', function() {
        if (zoomedIn == false) {
            zoominCarried();
        } else {}
    });
    $("#self").hover(function() {
        if (zoomedIn & carriedActivated) {
            displayTextCarried(0); //"Punishments" text area's width, height, top, left, paragraph
        } else {
            $(this).css('cursor', 'zoom-in');
        }
    });
    $("#secondParty").bind('click hover', function() {
        if (zoomedIn == false) {
            zoominCarried();
        }
    });
    $("#secondParty").hover(function() {
        if (zoomedIn & carriedActivated) {
            displayTextCarried(1); // text area's width, height, top, left, paragraph
        } else {
            $(this).css('cursor', 'zoom-in');
        }
    });
    $("#thirdParty").bind('click hover', function() {
        if (zoomedIn == false) {
            zoominCarried();
        } else {}
    });
    $("#thirdParty").hover(function() {
        if (zoomedIn & carriedActivated) {
            displayTextCarried(2); // text area's width, height, top, left, paragraph
        } else {
            $(this).css('cursor', 'zoom-in');
        }
    });
    //carried section ends here
    //punishments section starts here
    $("#punishments_container #title").bind('click hover', function() {
        if (zoomedIn == false) {
            zoominPunishments();
        } else {}
    });
    $("#punishments_container #title").hover(function() {
        if (zoomedIn & punishmentsActivated) {
            $("#text-container-sub").fadeOut(1000);
        } else {
            $(this).css('cursor', 'zoom-in');
        }
    });
    $("#bodily-safety").bind('click hover', function() {
        if (zoomedIn == false) {
            zoominPunishments();
        } else {}
    });
    $("#bodily-safety").hover(function() {
        if (zoomedIn & punishmentsActivated) {
            displayDeprivationsSubCaption(0); //"Punishments" text area's width, height, top, left, paragraph
        } else {
            $(this).css('cursor', 'zoom-in');
        }
    });
    $("#life").bind('click hover', function() {
        if (zoomedIn == false) {
            zoominPunishments();
        } else {}
    });
    $("#life").hover(function() {
        if (zoomedIn & punishmentsActivated) {
            displayDeprivationsSubCaption(1); //"Punishments" text area's width, height, top, left, paragraph
        } else {
            $(this).css('cursor', 'zoom-in');
        }
    });
    $("#reputation").bind('click hover', function() {
        if (zoomedIn == false) {
            zoominPunishments();
        } else {}
    });
    $("#reputation").hover(function() {
        if (zoomedIn & punishmentsActivated) {
            displayDeprivationsSubCaption(2); //"Punishments" text area's width, height, top, left, paragraph
        } else {
            $(this).css('cursor', 'zoom-in');
        }
    });
    $("#resources").bind('click hover', function() {
        if (zoomedIn == false) {
            zoominPunishments();
        } else {}
    });
    $("#resources").hover(function() {
        if (zoomedIn & punishmentsActivated) {
            displayDeprivationsSubCaption(3); //"Punishments" text area's width, height, top, left, paragraph
        } else {
            $(this).css('cursor', 'zoom-in');
        }
    });
    $("#liberty").bind('click hover', function() {
        if (zoomedIn == false) {
            zoominPunishments();
        } else {}
    });
    $("#liberty").hover(function() {
        if (zoomedIn & punishmentsActivated) {
            displayDeprivationsSubCaption(4); //"Punishments" text area's width, height, top, left, paragraph
        } else {
            $(this).css('cursor', 'zoom-in');
        }
    });
    //punishments section ends here
    $("#proportional").bind('click hover', function() {
        if (zoomedIn == false) {
            // moveMap('150%', '150%', '-45%', '-32%'); //map's width, height, top, left
            newMoveMap($("#proportional"), 1.6);
            // moveVeneer('170%', '240%', '-60%', '-30%'); //veneer's width, height, top, left
            centerVeneer(1);
            displayText('550px', 'auto', '19%', '38%', 4); //text area's width, height, top, left, paragraph
            zoomedIn = true;
        } else {}
    });
    $("#proportional").hover(function() {
        if (zoomedIn == false) {
            $(this).css('cursor', 'zoom-in');
        } else {
            $(this).css('cursor', 'default');
        }
    });
    $("#active").bind('click hover', function() {
        if (zoomedIn == false) {
            newMoveMap($('#active'), 1.2);
            // moveMap('140%', '150%', '-45%', '-14%'); //map's width, height, top, left
            // moveVeneer('180%', '370%', '-130%', '-50%'); //veneer's width, height, top, left
            centerVeneer(1);
            displayText('320px', 'auto', '16%', '60%', 5); //text area's width, height, top, left, paragraph
            zoomedIn = true;
        } else {}
    });
    $("#active").hover(function() {
        if (zoomedIn == false) {
            $(this).css('cursor', 'zoom-in');
        } else {
            $(this).css('cursor', 'default');
        }
    });
    $("#cheap").bind('click hover', function() {
        if (zoomedIn == false && mapofActivated) {
            // moveMap('135%', '150%', '-40%', '1%'); //map's width, height, top, left
            newMoveMap($("#cheap"), 1.1);
            // moveVeneer('190%', '380%', '-130%', '-68%'); //veneer's width, height, top, left
            centerVeneer(1);
            displayText('600px', 'auto', '10%', '48%', 6); //text area's width, height, top, left, paragraph
            zoomedIn = true;
        } else {}
    });
    $("#cheap").hover(function() {
        if (zoomedIn == false && mapofActivated) {
            $(this).css('cursor', 'zoom-in');
        } else {
            $(this).css('cursor', 'default');
        }
    });
    // sound
    // $('.map-section').mouseenter(function(){
    //     if (!zoomedIn) {
    //         document.getElementById('ding-sound').play();
    //     };
    //  });
    $(this).scrollTop(0);
}); //end of jquery document.ready function
$(window).resize(function() {
    winWidth = $(window).width();
    winHeight = $(window).height();
    if (zoomedIn) {
        recover();
    } else {}
})