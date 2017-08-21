
var tick = 0;
$(function() {
	setTimeout(function() {
		$('body').removeClass('loading');
		new WOW().init();
		
		//$('#wrapper').slimscroll({ height: 'auto' });
		
		var controller = new ScrollMagic.Controller();
		
		var scene = new ScrollMagic.Scene({
									triggerHook: 'onLeave',
									triggerElement: "#intro_tagline",
									offset: 100,
									duration: 500
								})
								.setTween("#intro", 0.5, { opacity: 0 }) // trigger a TweenMax.to tween
								.addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
								.addTo(controller);
		
		
		
		
		
		
		
		/*
		$('li.dropdown > a').off('click').on('click',function(){ 
			$(this).parents('.dropdown').eq(0).toggleClass('in');
		});
		
		$('#nav_toggle').off('click').on('click',function(e) {
			e.preventDefault();
			$('#nav').toggleClass('in');
		});
		*/
		
		//initIntroScrollEffect();
		//initWorkIsotope();
  }, 1000);
	
});

function initIntroScrollEffect() {		
	$('#wrapper').on('mousewheel', function(e) {
		var dX = e.deltaX, dY = e.deltaY, factor = e.deltaFactor;

		if(dY < 0) tick++;
		if(dY > 0) tick = (tick <= 0) ? 0 : (tick-1);
		
		if($(window).scrollTop() > 200)	{
			$('#nav').addClass('opaque');
		} else {
			$('#nav').removeClass('opaque');
		}
		
		var $tagline = $('#intro_tagline');
		var taglineHeight = $tagline.outerHeight();
		var taglineTop = $tagline.position().top;
		var taglineBottom = Math.round((taglineTop + taglineHeight)/100)*100;
			if (top >= taglineBottom) return;
		
		var top = $(window).scrollTop();
		var bgImgPos = (-1 * (top / 4)) + 'px';
		$('#intro').css('background-position','50% '+bgImgPos);
		
		var $span1 = $('#intro_tagline span:nth-child(1)');			
		var span1Dist = 72;
		var span1Ori = 144;
		var span1Top = Math.round($span1.position().top*100)/100;
		var span1Height = $span1.outerHeight();
		var span1Bot = Math.round(($tagline.outerHeight() - (span1Top + span1Height))*100)/100;
		var span1New = span1Bot;
		var $span2 = $('#intro_tagline span:nth-child(2)');			
		var span2Dist = 36;
		var span2Ori = 72;
		var span2Top = Math.round($span2.position().top*100)/100;
		var span2Height = $span2.outerHeight();
		var span2Bot = Math.round(($tagline.outerHeight() - (span2Top + span2Height))*100)/100;
		var span2New = span2Bot;
		var $span3 = $('#intro_tagline span:nth-child(3)');			
		var span3Dist = 18;
		var span3Ori = 0;
		var span3Top = Math.round($span3.position().top*100)/100;
		var span3Height = $span3.outerHeight();
		var span3Bot = Math.round(($tagline.outerHeight() - (span3Top + span3Height))*100)/100;
		var span3New = span3Bot;
		
		if(dY < 0) { // MOVE DOWN
			span1New = span1Bot + span1Dist;
			span2New = span2Bot + span2Dist;
			span3New = span3Bot + span3Dist;
		} else { // MOVE UP
			span1New = (tick == 0) ? span1Ori : span1Bot - span1Dist;
			span2New = (tick == 0) ? span2Ori : span2Bot - span2Dist;
			span3New = (tick == 0) ? span3Ori : span3Bot - span3Dist;
		}
		
		$span1.css('bottom',span1New+'px');
		$span2.css('bottom',span2New+'px');
		$span3.css('bottom',span3New+'px');
	});
}

function initWorkIsotope() {
	var $grid = $('#work_list').isotope({
		itemSelector: '.work-item',
		layoutMode: 'fitRows'
	});
	
	$('#work_filters').on( 'click', 'button', function() {
		var filterValue = $( this ).attr('data-filter');
		$grid.isotope({ filter: filterValue });
	});
	
	$('.button-group').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
		});
	});
  

}

function isMobile() { return $('#mobile_detect').is(':hidden'); }

function goTo(id) {
	if(id == 0) {
		var t = 0;
	} else {
		var $item = $(id);
		if (!$item.length) return;		
		var t = $item.position().top;
	}
	$('html,body').animate({scrollTop:t}, 'slow');
	
	if(t == 0) {
		$('#gototop').fadeOut();
	} else {
		$('#gototop').fadeIn();
	}
}






















