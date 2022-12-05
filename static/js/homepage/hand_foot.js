//class Hand
var Hand = function(handspos) {

	var positionOk = false;
	while (!positionOk) {
		var availableSpace = windowWidth * windowHeight - (windowHeight/2.4 * 1.3629)*(windowHeight/2.4);
		var benchmark = Math.sqrt(availableSpace / handsAmount) * 0.5;
		var tempPos;
		var randomQuad = random(0, 4);
		if (randomQuad >= 0 && randomQuad < 1) {
			tempPos = createVector(random(50, windowWidth - 50), random(50, titleTopBorder - 50));
		} else if (randomQuad >= 1 && randomQuad < 2) {
			tempPos = createVector(random(titleRightBorder + 50, windowWidth - 50), random(titleTopBorder, titleBottomBorder));

		} else if (randomQuad >= 2 && randomQuad < 3) {
			tempPos = createVector(random(50, windowWidth - 50), random(titleBottomBorder + 40, windowHeight - 50));

		} else if (randomQuad >= 3 && randomQuad <= 4) {
			tempPos = createVector(random(50, titleLeftBorder - 40), random(titleTopBorder, titleBottomBorder));
		};

		if (handspos.length != 0) {

			var counter = 0;
			for (var i = 0; i < handspos.length; i++) {
				if (p5.Vector.dist(tempPos, handspos[i]) > benchmark) {
					counter++;
				}

				if (counter == handspos.length) {
					positionOk = true;

					break;

				}
			}
		} else {
			positionOk = true;
		}
	}

	this.position = tempPos;
	this.rotateAngle = 0;
	this.image = loadImage("static/img/homepage/hand.png");
}

Hand.prototype.rotateTowardsMouse = function(mousePos) {
	var direction = p5.Vector.sub(mousePos, this.position);
	direction.normalize();
	this.rotateAngle = direction.heading();
}

//Class: Foot
//---------
var Foot = function(which, _position, _rotateAngle) {
	if (which == 'left') {
		this.image = loadImage("static/img/homepage/blacksuitcase.png");
	} else if (which == 'right') {
		this.image = loadImage("static/img/homepage/blacksuitcase.png");
	} else {
		console.log(which + "doesn't match anything");
	}

	this.position = _position;
	this.rotateAngle = _rotateAngle;
	this.birthday = millis();
	this.width = footWidth;
	this.height = footHeight;
	this.opacity = 255;
}

Foot.prototype.display = function() {
	push();
	translate(this.position.x, this.position.y);
	rotate(this.rotateAngle);
	tint(255, this.opacity);
	image(this.image, 0, 0, this.width, this.height);
	noStroke();
	// fill('rgb');
	ellipse(0, 0, 10, 10);
	pop();
}