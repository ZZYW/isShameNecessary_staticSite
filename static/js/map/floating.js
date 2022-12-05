
// var allImages = [];

// var imImageArray = [];
// var oscillationRange = 5;

// function setup(){

// 	$('img').css('position','relative');
// 	$('img').addClass("floating-image");
// 	allImages = getElements('floating-image');

// 	for (var i = allImages.length - 1; i >= 0; i--) {
// 		imImageArray.push(new onImage(allImages[i]));
// 	};

// }

// function draw(){
// 	for (var i = imImageArray.length - 1; i >= 0; i--) {
// 		imImageArray[i].changeValue();
// 		imImageArray[i].ele.style("top",String(imImageArray[i].topOffset)+"px");
// 	};
// }

// var onImage = function(e){
// 	this.ele = e;
// 	this.topOffset = 0;
// 	this.addValue = random(-0.3,0.3);
// }

// onImage.prototype.changeValue = function(){
// 	this.topOffset += this.addValue;
// 	if (this.topOffset >= oscillationRange || this.topOffset <= -1 * oscillationRange) {
// 		this.addValue *= -1;
// 	};
// }

