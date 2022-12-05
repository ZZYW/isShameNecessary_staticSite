var handImages = [];
var hands = [];
var trails = [];
var mousePosA;
var MaxTrailLength = 20;
var MaxTrailSize = 13;
var handsAmount = 30;
var handWidth;
var handHeight;
var theTitle;
var timeOne, timeTwo;
var footWidth = 50;
var footHeight = 40;
var footGap = 40;
var footInternalGap = 40;
var rightFoot; //flag
var handsPosition = [];
var backgroundColorG;
var titleRightBorder, titleLeftBorder, titleTopBorder, titleBottomBorder;

function setup() {

    timeOne = millis();
    rightFoot = false;
    // noCursor();
    theTitle = loadImage("static/img/homepage/homepage_title_block.png");
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('landing-page');

    titleRightBorder = windowWidth / 2 + (windowHeight / 2 * 1.3629) / 2;
    titleLeftBorder = windowWidth / 2 - (windowHeight / 2 * 1.3629) / 2;
    titleTopBorder = windowHeight / 2 - (windowHeight / 2) / 2;
    titleBottomBorder = windowHeight / 2 + (windowHeight / 2) / 2;


    handsAmount = map(windowWidth, 0, 1400, 0, 50);
    for (var i = 0; i < handsAmount; i++) {
        hands.push(new Hand(handsPosition));
        handsPosition.push(hands[i].position);
    };
    
}

function draw() {

    background(0,250,0);
    imageMode(CENTER);

    var mousePos;
    if (mobilecheck()) {
        mousePos = createVector(touchX, touchY);
    } else {
        mousePos = createVector(mouseX, mouseY);
    };

    //--------
    //HANDS
    for (var i = hands.length - 1; i >= 0; i--) {
        hands[i].rotateTowardsMouse(mousePos);
        //draw
        push();
        translate(hands[i].position.x, hands[i].position.y);
        rotate(hands[i].rotateAngle + radians(90));
        //image ratio is  87 * 144
        handHeight = windowHeight / 7.5;
        handWidth = handHeight * 0.6041;
        image(hands[i].image, 0, 0, handWidth, handHeight);
        pop();
    };

    if (titleOnHover() == true) {
        $('#landing-page').css('cursor', 'pointer');
        tint(255, 160);
    } else {
        $('#landing-page').css('cursor', 'crosshair');
    }

    image(theTitle, windowWidth / 2, windowHeight / 2, windowHeight / 2.4 * 1.3629, windowHeight / 2.4);

};

$(window).resize(function() {
    resizeCanvas(windowWidth, windowHeight);
});

function mouseClicked() {
    if (titleOnHover()) {
        if (!disabledLandingPage) {
            disabledLandingPage = true;
            theTransition(1000);
        };
    } else {
        //nothing
    }
}


function titleOnHover() {
    var mousePos = createVector(mouseX, mouseY);
    if (mousePos.x > titleLeftBorder && mousePos.x < titleRightBorder && mousePos.y > titleTopBorder && mousePos.y < titleBottomBorder) {
        return true;
    } else {
        return false;
    }

}


function theTransition(slideSpeed) {

    noLoop();

    $('#landing-page').animate({
        top: '-900'
    }, slideSpeed, function() {
        $('#landing-page').remove();
    });

    // if (Detector.webgl && !mobilecheck()) {

    //     console.log("webgl supported & is NOT mobile");
    //     $('#navigation').css('display', 'block');
    //     $('#alternative-navigation').remove();

    // } else if (Detector.webgl && mobilecheck()) {

    //     console.log("webgl supported & is mobile");
    //     $('#navigation').remove();
    //     $('#alternative-navigation').css('display', 'block');

    // } else if (!Detector.webgl && mobilecheck()) {

    //     console.log("webgl NOT supported & is mobile");
    //     $('#alternative-navigation').css('display', 'block');
    //     $('#navigation').remove();

    // } else if (!Detector.webgl && !mobilecheck()) {
    //     console.log("webgl NOT supported & is NOT mobile");
    //     $('#alternative-navigation').css('display', 'block');
    //     $('#navigation').remove();

    // };
}