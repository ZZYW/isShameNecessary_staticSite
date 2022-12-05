
	
$(document).ready(function(){



	$('#totem img').hover(
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-totem-green.jpg');
		},
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-totem.jpg');
		});

	$('#face img').hover(
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-head-green.jpg');
		},
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-head.jpg');
		});
	
	$('#gallery img').hover(
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-frames-green.jpg');
		},
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-frames.jpg');
		});

	$('#map img').hover(
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-map-green.jpg');
		},
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-map.jpg');
		});

	$('#book img').hover(
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-book-green.jpg');
		},
		function(){
			$(this).attr('src','/static/img/homepage/al-navigation/new/black-circle-book.jpg');
		});
});


$(window).resize(function(){

});

