var direction = 'DOWN';
var tick = 0;
var hash = null;
$(function() {
	setTimeout(function() {
		$('body').removeClass('loading');
		new WOW().init();
		
		$('#totalYears').html(	(new Date().getFullYear() - 2007)	);
		$('#careerYears').html(	(new Date().getFullYear() - 2010)	);
		
		initMenu();
		initScrollEffect();
		initProfileItem();
		
		hash = window.location.hash;
		if($.trim(hash.replace('#','')) !== "") jumpTo(	hash.replace('#','')	);
  }, 1000);
	
});

function initMenu() {	
	$('#nav #nav_toggle').off('click').on('click',function(e) {
		e.preventDefault();
		$('#nav').toggleClass('in');
	});
}

function initScrollEffect() {		
	$('html:not(.profile-content)').on('mousewheel', function(e) {
		var sbHeight = Math.round(	(window.innerHeight * (window.innerHeight / document.body.offsetHeight))	);
		var totalHeight = Math.round(	($('#height_detect').position().top + $('#height_detect').outerHeight() - sbHeight)	);
		var dX = e.deltaX, dY = e.deltaY, factor = e.deltaFactor;
		var maxTick = Math.round(	(totalHeight / factor)	);
		
		if(dY < 0) tick = tick + 1;	//(tick >= maxTick) ? maxTick : (tick+1);
		if(dY > 0) tick = (tick <= 0) ? 0 : (tick-1);
		direction = (dY < 0) ? 'DOWN' : 'UP';
		
		animate();
	});
}

function animate() {
	console.log(tick, direction);
		
	if(tick > 5) {
		$('#nav').addClass('opaque');
	} else {
		$('#nav').removeClass('opaque');
	}
		
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
		
		// START PROFILE
		if(tick >= 3 && tick <= 50) {
			if(tick <= 9) {
				var percent = (Math.floor(((tick-3) / 6)*100)/100);		
				$('#profile').css({
					'top' : (((1-percent) * 100)+5)+'vh',
					'opacity' : percent
				});
			}
			
			if(tick > 6 && tick <= 12) {
				var percent = (Math.floor(((tick-6) / 6)*100)/100);		
				$('#profile .profile-item:nth-child(2)').css({
					'margin-top' : ((100 - (percent * 100))+5)+'vh',
					'opacity' : percent
				});
			}
			
			if(tick > 9 && tick <= 15) {
				var percent = (Math.floor(((tick-9) / 6)*100)/100);		
				$('#profile .profile-item:nth-child(3)').css({
					'margin-top' : ((100 - (percent * 100))+5)+'vh',
					'opacity' : percent
				});
			}
			
			if(tick > 12 && tick <= 18) {
				var percent = (Math.floor(((tick-12) / 6)*100)/100);		
				$('#profile .profile-item:nth-child(4)').css({
					'margin-top' : ((100 - (percent * 100))+5)+'vh',
					'opacity' : percent
				});
			}
			
			if(tick == 19) $('#profile').css('height','100%');
			
			// ENDING
			if(tick >= 20 && tick <= 30) {
				var percent = (Math.floor(((tick-20) / 10)*100)/100);
				$('#profile').css({
					'transform' : 'rotateZ('+(-1 * (percent * 90))+'deg)',
					'opacity' : (1-percent)
				});
			}
		}
		
		// START WORK
		if(tick >= 20 && tick <= (40+getMaxWorkRows())) {	//(40+(getMaxWorkRows() * 32))) {
			// STARTING
			if(tick >= 20 && tick <= 30) {
				var percent = (Math.floor(((tick-20) / 10)*100)/100);
				$('#work').css({
					'transform' : 'rotateZ('+((1-percent) * 90)+'deg)',
					'opacity' : percent
				});
				
				$('#work .work-column').css({
					'transform' : 'scale('+(percent)+')',
					'opacity' : percent
				});
			}
			
			// LISTING
			if(tick >= 30 && tick < (30+(5*getMaxWorkRows()))) {
				$('.work-column').each(function(i,e) {
					var d = tick-30;
					var r = $(e).find('.work-wrapper').length;
					
					if(d%5 > 0) return;
					if(r <= (d/5)) return;
					
					var percent = -1*(d/5)*100;
					
					setTimeout(function() {
						$(e).find('.work-wrapper').animate({
							top : percent+'%'
						},125);
					},125 + ( i * 125 ));
					
				});
			}
			/*
			if(tick >= 30 && tick <= (30+(getMaxWorkRows() * 4))) {				
				for(var i = 1; i <= (tick-30)+1; i++) {
					var s = Math.ceil(	(i/4)	) + 1;
					var n = i - ((s-2)*4);
					var $column = $('#work .work-column:nth-child('+n+')');
					var r = $column.find('.work-wrapper').length;
					
					if(r >= s) {
						var percent = -1 * (s-1) * 25 * ((tick-30)-n+1);
						var x = Math.ceil((-1*percent)/100);
						if(x < r) $column.find('.work-wrapper').css('top', percent+'%');
					}
				}
			}
			*/
			
			// ENDING
			/*
			if(tick >= (30+(getMaxWorkRows() * 4)) && tick <= (40+(getMaxWorkRows() * 4))) {
				var percent = (Math.floor(((tick-(30+(getMaxWorkRows() * 4))) / 10)*100)/100);
				$('#work').css({
					'transform' : 'rotateZ('+(-1 * (percent * 90))+'deg)',
					'opacity' : (1-percent)
				});
			}
			*/
		}
	}
}

function getMaxWorkRows() {
	var m = 0;
	$('#work .work-column').each(function() {
		var r = $(this).find('.work-wrapper').length;
		
		if(r > m) m = r;
	});
	return m;
}

function initProfileItem() {
	$('.profile-item h1').off('click').on('click',function(e) {		
		var $item = $(this).parents('.profile-item').eq(0);
		
		if(!$item.hasClass('in')) {
			$('.profile-item').removeClass('in');
			$item.addClass('in');
		}
	});
	
	//$('.profile-item .profile-content').slimscroll({ height: '72vh', width: '360px' });
  $(".profile-item .profile-content").mCustomScrollbar();
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
			'profile' : { 'start' : 3, 'end' : 20 },
			'work' : { 'start' : 20, 'end' : 30 }	//(30+(getMaxWorkRows() * 10))/2 }
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






















