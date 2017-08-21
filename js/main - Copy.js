var direction = 'DOWN';
var tick = 0;
$(function() {
	setTimeout(function() {
		$('body').removeClass('loading');
		new WOW().init();
		
		initMenu();
		initScrollEffect();
		//initWorkIsotope();
  }, 1000);
	
});

function initMenu() {	
	$('#nav #nav_toggle').off('click').on('click',function(e) {
		e.preventDefault();
		$('#nav').toggleClass('in');
	});
}

function initScrollEffect() {		
	$('html').on('mousewheel', function(e) {
		var sbHeight = Math.round(	(window.innerHeight * (window.innerHeight / document.body.offsetHeight))	);
		var totalHeight = Math.round(	($('#height_detect').position().top + $('#height_detect').outerHeight() - sbHeight)	);
		var dX = e.deltaX, dY = e.deltaY, factor = e.deltaFactor;
		var maxTick = Math.round(	(totalHeight / factor)	);
		
		if(dY < 0) tick = tick + 1;	//(tick >= maxTick) ? maxTick : (tick+1);
		if(dY > 0) tick = (tick <= 0) ? 0 : (tick-1);
		direction = (dY < 0) ? 'DOWN' : 'UP';
		
		if(tick > 5) {
			$('#nav').addClass('opaque');
		} else {
			$('#nav').removeClass('opaque');
		}
		
		animate();
	});
}

function animate() {
	//console.log(tick, direction);
		
	if(tick >= 0) {
		// START INTRO
		if(tick <= 6) {				
			var percent = 1 - (Math.floor((tick / 6)*100)/100);				
			$('#intro').css({
				'background-position' : '50% '+((1-percent)*100)+'%',
				'opacity' : percent
			});
			
			var $tagline = $('#intro_tagline');				
			var $spanElems = [ $('#intro_tagline span:nth-child(1)'), $('#intro_tagline span:nth-child(2)'), $('#intro_tagline span:nth-child(3)') ];
			var spanProps = [{},{},{}];				
			for(var i = 0; i < $spanElems.length; i++) {
				var j = (i == 0) ? 72 : j*0.5;
				var k = (i == 0) ? 144 : (k-72);
				var b = Math.round(($tagline.outerHeight() - ((Math.round($spanElems[i].position().top*100)/100) + $spanElems[i].outerHeight()))*100)/100;
						b = (direction == 'DOWN') ? (b+j) : ((tick == 0) ? k : (b-j));
						
				$spanElems[i].css('bottom',b+'px');
			}
		}
		
		// START GREET
		if(tick > 3 && tick <= 50) {
			if(tick <= 9) {
				var percent = (Math.floor(((tick-3) / 6)*100)/100);		
				$('#greet').css({
					'top' : (((1-percent) * 100)+5)+'vh',
					'opacity' : percent
				});
			}
			
			if(tick > 6 && tick <= 12) {
				var percent = (Math.floor(((tick-6) / 6)*100)/100);		
				$('#greet #greet_content p:nth-child(1)').css({
					'margin-top' : ((100 - (percent * 100))+5)+'vh',
					'opacity' : percent
				});
			}
			
			if(tick > 9 && tick <= 15) {
				var percent = (Math.floor(((tick-9) / 6)*100)/100);		
				$('#greet #greet_content p:nth-child(2)').css({
					'margin-top' : ((100 - (percent * 100))+5)+'vh',
					'opacity' : percent
				});
			}
			
			if(tick > 12 && tick <= 18) {
				var percent = (Math.floor(((tick-12) / 6)*100)/100);		
				$('#greet #greet_menu').css({
					'margin-top' : ((100 - (percent * 100))+5)+'vh',
					'opacity' : percent
				});
			}
			
			if(tick == 19) $('#greet').css('height','100%');
			
			if(tick >= 20 && tick <= 30) {
				var percent = (Math.floor(((tick-20) / 10)*100)/100);
				$('#greet').css({
					'transform' : 'rotateZ('+(-1 * (percent * 90))+'deg)',
					'opacity' : (1-percent)
				});
			}
		}
		
		// START WORK
		if(tick >= 20 && tick <= 60) {
			if(tick >= 20 && tick <= 30) {
				var percent = (Math.floor(((tick-20) / 10)*100)/100);
				$('#work').css({
					'transform' : 'rotateZ('+((1-percent) * 90)+'deg)',
					'opacity' : percent
				});
			}
			/*
			if(tick <= 40) {
				var percent = (Math.floor(((tick-30) / 10)*100)/100);		
				$('#work').css({
					'left' : ((1-percent) * 100)+'vw',
					'opacity' : percent
				});
			}
			
			if(tick >= 35 && tick <= 45) {
				var percent = (Math.floor(((tick-35) / 10)*100)/100);		
				$('#work #work_filters').css({
					'margin-left' : ((1-percent) * 100)+'vw',
					'opacity' : percent
				});
			}
			
			if(tick >= 40) {
				var numWorkItem = $('#work .work-item').length;
				for(var i = 0; i < numWorkItem; i++) {
					if(tick >= (40+i) && tick <= (45+i)) {
						var percent = (Math.floor(((tick-(40+i)) / 6)*100)/100);		
						
						var $item = $('.work-item:nth-child('+(i+1)+')');
						$item.css({
							'transform' : 'scale('+percent+')',
							'opacity' : percent
						});
					}
				}
			}
			*/
		}
	}
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

function jumpTo(id) {
	if(typeof id === 'undefined' || id === null) {
		return false;
	} else {
		var $item = $('#'+id);
		if (!$item.length) return false;		
		$('#nav').removeClass('in');
		
		var tickprop = {
			'intro' : { 'start' : 0, 'end' : 6 },
			'greet' : { 'start' : 3, 'end' : 20 }
		}
		
		if(tick >= tickprop[id]['end']) {
			for(var i = tick; i >= tickprop[id]['start']; i--) {
				tick = i;
				direction = 'UP';
				animate();
			}
		} else if(tick <= tickprop[id]['start']) {
			for(var i = tick; i <= tickprop[id]['end']; i++) {
				tick = i;
				direction = 'DOWN';
				animate();
			}
		}
		return true;
	}
}






















