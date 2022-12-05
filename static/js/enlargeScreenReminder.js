var outTime = false;
var url  = document.URL;
$(document).ready(function(){


	if (url.search('map') != -1) {
		

		if(mobilecheck() == false && $(window).width() < 992){
			if (!outTime) {
				var notification = document.createElement("div");
				notification.id = "enlargeYourScreen";
				$(notification).html("Enlarge your browser to have a full experience");
				$(notification).css('display','none');

				window.setTimeout(function(){
					if($('#suggestions').css('display') == "block"){
						console.log("notification overlaid");
						$(notification).css('top',$('#suggestions').height()+5);
					}
				},100);

				$(notification).appendTo('body');
				$(notification).fadeIn(2000);
				fadeoutReminderAfterTime();
			}
		};
	};
})


$(window).resize(function(){
	if (url.search('map') != -1) {

		if(mobilecheck() == false && $(window).width() >= 992){
			if( $('#enlargeYourScreen').length ){
				$('#enlargeYourScreen').remove();
			}
		};

		if(mobilecheck() == false && $(window).width() < 992){
			if ($('#enlargeYourScreen').length == 0) {
				if (!outTime) {
					var notification = document.createElement("div");
					notification.id = "enlargeYourScreen";
					$(notification).html("Enlarge your browser to have a full experience");
					$(notification).css('display','none');
					$(notification).appendTo('body');
					$(notification).fadeIn();
					fadeoutReminderAfterTime();
				};
			};
		};
	}
});

function fadeoutReminderAfterTime(){
	if (url.search('map') != -1) {
		window.setTimeout(function(){
			$('#enlargeYourScreen').fadeOut(2000);
			outTime = true;
		},5000);
	}
}