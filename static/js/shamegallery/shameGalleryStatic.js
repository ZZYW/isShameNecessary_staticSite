var winWidth, winHeight;
var inti_zPos = -400;
var f_images = [];
var maxspeed = 0.8;
var minspeed = 0.5

$(window).resize(function() {
	//give winWidth&winHeight value at THIS function
	winWidth = $(window).width();
	winHeight = $(window).height();

	$('#highlighted').css({
						'left':window.innerWidth/2 - $('#highlighted').width()/2,
						'top':window.innerHeight/2 - $('#highlighted').height()/2
	});
})

$(document).ready(function() {
	//get all img elements
	allImages = $('#css-transform-container').children();
	//give each img a random translateZ value
	for (var i = allImages.length - 1; i >= 0; i--) {
		f_images.push({
			DOM: allImages[i],
			z: Math.random() * 400 - 200,
			acc: p5.prototype.random(minspeed,maxspeed),
			hoverOn: false,
		});
	};
});

function draw() {
	for (var i = f_images.length - 1; i >= 0; i--) {

		f_images[i].z += f_images[i].acc;

		(function(i) {
			$(f_images[i].DOM).unbind().click(function() {
				//mouseenter
				var src = $(f_images[i].DOM).attr('src');
				$('#highlighted').attr('src',src);

				setTimeout(function(){
					$('#highlighted').css({
						'left':window.innerWidth/2 - $('#highlighted').width()/2,
						'top':window.innerHeight/2 - $('#highlighted').height()/2
					});
				},100);

				$('#highlighted').fadeIn();
				noLoop();
			});
		}(i));

		$('#highlighted').unbind().click(function(){
			$('#highlighted').fadeOut();
			$(this).attr('src','');
			loop();
		})

		$(f_images[i].DOM).css('transform','translateZ('+ String(f_images[i].z) +'px)');
		$(f_images[i].DOM).css('-webkit-transform','translateZ('+ String(f_images[i].z) +'px)');
		$(f_images[i].DOM).css('-o-transform','translateZ('+ String(f_images[i].z) +'px)');
		$(f_images[i].DOM).css('-moz-transform','translateZ('+ String(f_images[i].z) +'px)');
		$(f_images[i].DOM).css('-ms-transform','translateZ('+ String(f_images[i].z) +'px)');


		//if it's too close, push it far
		if (f_images[i].z > 150) {
			f_images[i].z = inti_zPos;
			f_images[i].acc = p5.prototype.random(minspeed,maxspeed);
		};
	};
}