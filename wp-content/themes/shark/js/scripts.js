var isTouchDevice = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isTouchDevice.Android() || isTouchDevice.BlackBerry() || isTouchDevice.iOS() || isTouchDevice.Opera() || isTouchDevice.Windows());
    }
};


$(function(){

//------------- Globals -------------

var isMobile = $(window).width() <= 660,
	isTablet = $(window).width() > 660 && $(window).width() <= 1020,
	isDesktop = $(window).width() > 1020,
	isHiResDesktop = $(window).width() > 1650,
	$fullPageActive = false,
	$initFullPageJS = false,
	$scrollbarActive = false,
	$masonryActive = false,
	$pageCache = [],
	$loadedObjs = [],
	$loadedPages = 0,
	$totalPages = 0,
	$sliderActive = false,
	$pages=[],
	$root='http://92.60.114.159/~wlprintco',
	$singlePage=false,
	$firstLoad=true,
	$homeLoaded=false,
	$historyActive = !isMobile && Modernizr.history,
	$container,
	isIE9 = $('html').hasClass('ie9'),
	isIE8 = $('html').hasClass('ie8'),
	isHome = false,
	currentPathname = null;

	//tooltip variables
	var $mouseX, $mouseY, $tooltipX, $tooltipY,
	$tooltip  =  $('<div>', { class: "tooltip-pointer"}),
	$offsetX=0, $offsetY=0;

	//sector panel variables
	var $handles, $items, $close;


//$(window).on('scroll',function(){
	//$('#header').height($(window).height());
//});

//------------- Parallax -------------


parallaxTitle = function(){
var $title =  $('#work-single .page-title');
windowScroll = $(this).scrollTop();
$title.css({
	'margin-top' : -(windowScroll/3)+"px"//,
	//'opacity' : 1-(windowScroll/250)
	});
}

initParallax = function(){
$(window).on('scroll',function() {
	if(!isTouchDevice.any()){
		 parallaxTitle();
	}
    })
}

//------------- Google Map -------------

initMap = function(){
if($('#map').length){
	var $lat = $('#map').attr('data-lat'),
		$lng = $('#map').attr('data-lng');
$('#map').gmap({
        markers: [{'latitude': $lat,'longitude': $lng}],
        markerFile: 'http://92.60.114.159/~wlprintco/wp-content/themes/shark/images/marker.png',
        markerWidth:24,
        markerHeight:39,
        markerAnchorX:12,
        markerAnchorY:39
    });
}
}

resetTestimonials = function(){
	$('#testimonial-slider').hide();
	$('#testimonials a.close').hide();
}
initSlickSlider = function(){
 //console.log('init slick')
var _button = $('ul#testimonial-clients a.client'),
		_grid = $('ul#testimonial-clients'),
		_close = $('#testimonials a.close'),
		_slider = $('#testimonials #testimonial-slider');


$('#home-slider').slick({
	    dots: false,
	    autoplay: true,
	    autoplaySpeed: 4000,
	    speed: 600,
	    pauseOnHover: true,
	    arrows: false
	});


	$('#testimonial-slider').slick({
	    dots: true,
	    autoplay: false,
	   autoplaySpeed: 3000,
	    speed: 400,
	    pauseOnHover: false,
	    fade:false,
	    arrows: false
	});
/*		$('#testimonial-slider').on('afterChange', function(event, slick, currentSlide){
  _slider.fadeIn(100);
  $('#testimonials a.close').show();
}); */
	$('body').on('click touch-start','#testimonials a.close',function(e){
			//console.log('click')
			e.preventDefault();
			$(this).hide();
			_slider.fadeOut(100);
			})

		$('body').on('click touch-start','ul#testimonial-clients a.client',function(e){
			var _index = _button.index($(this));

		e.preventDefault();
		$('#testimonial-slider').slick('slickGoTo',_index,false);
		 _slider.fadeIn(100);
  $('#testimonials a.close').show();
		
		
		
	});
		$sliderActive = true;
}



//------------- Image Grid Sizing -------------

refreshGrid = function(){
	isMobile = $(window).width() <= 660;
	var _gridHeight = $('.banner').height(),
		_titleHeight = $('.what-we-do .page-title').height(),
		_contentHeight = $('.what-we-do .content').height(),
		_windowWidth = $(window).width(),
		_windowHeight = $(window).height(),
		_diff = (_windowHeight - _gridHeight)/2,
		_homeLinkHeight = $('#home-link').height(),
		_homeLinkTop = (_diff - _homeLinkHeight)/2,
		_diff2 = _windowHeight - _diff;
	if(!isMobile){
	
if(_windowWidth>1019){
	$('.what-we-do .page-title, .what-we-do .content, .client-resources .page-title, .client-resources .content, .contact .content, .our-work .page-title, .what-clients-say .page-title, .contact .page-title').css({
		'height':_diff+'px'
	})
	/*
			$('#home-link').not('.home #home-link').css({
	'top': _homeLinkTop+'px',
	'margin-top': 0
})
*/
	$('ul#featured-work, #testimonials').css({
		'height': _diff2+'px'
	})
	$('.client-resources .banner, .contact #map').css({
		'height': _gridHeight+'px'
	})
} else {

	$('ul#featured-work, #testimonials').css({
		'height': (_diff2-35)+'px'
	})
	$('.client-resources .banner, .contact #map').css({
		'height': _gridHeight+'px'
	})


	$('.what-we-do .page-title, .client-resources .page-title, .our-work .page-title, .what-clients-say .page-title, .contact .page-title').css({
		'height':(_diff+35)+'px'
	})
	$('.what-we-do .content, .client-resources .content, .contact .content').css({
		'height':(_diff-35)+'px'
	})
} 

} else {
	$('.page-title, .content, .banner, #map, ul#featured-work, #testimonials,#home-link').removeAttr('style');

}

}
refreshGrid();
$(window).on('resize',refreshGrid);

//------------- Video control --------------

var _video = document.getElementById("shark-video");

$("a.video-control").bind("click", function(){
	if(_video.paused){
		$(this).html('Pause').addClass('play');
		_video.play();
	} else {
		_video.pause();
		$(this).html('Play').removeClass('play');
	}
});

//------------- Masonry -------------

morePostsClick = function(e){
	e.preventDefault();
	$('a.more-posts').off('click', morePostsClick);
	var $url = $(this).attr('href'),
	$element = '#posts-container',
	$this = $(this);
	$(this).addClass('loading');

	    $.get($url).done(function(data){
	    		$('a.more-posts').on('click', morePostsClick);

	    		if(!isMobile){
	    			$('.scroll-area').on('scroll',loadNewPosts);
	    		} else {
	    			$(window).on('scroll',loadNewPosts);
	    		}
	    		
	    	$(this).removeClass('loading');
              var $obj = $(data).find($element);
              var $btn = $(data).find('.more-posts');
             // $this.replaceWith($btn);
            $this.attr('href',$btn.attr('href')); //update the paging link
             $this.attr('class',$btn.attr('class'));
           		var $items = $obj.children();
           		//console.log($items);
           		if(isMobile || isIE9){
           			$($element).append($items);
           		} else {
           //  $($element).append($items).masonry('appended',$items);
           //    $($element).masonry('reload');
           
           $($element).append($items).imagesLoaded(function(){
   				 $($element).masonry( 'appended', $items, true );
			}); 

					}
         });
}

function loadNewPosts(){

		
		
		if(!isMobile){

		var _railHeight = $('.ps-scrollbar-y-rail').css('height').replace('px','');
		var _scrollbarHeight = $('.ps-scrollbar-y').css('height').replace('px','');
		var _scrollAmount = _railHeight-_scrollbarHeight;
		var _scrollFromTop = $('.ps-scrollbar-y').css('top').replace('px','');
			if(_scrollFromTop >= _scrollAmount){
				$('a.more-posts').trigger('click');
				$('.scroll-area').off('scroll');
			}
  } else {
  	if($(window).scrollTop() + $(window).height() > $(document).height()-20) {
      	$('a.more-posts').trigger('click');
		$(window).off('scroll');
   	}
}
}

		//console.log($(this).scrollTop());
initPostLoad = function(){
	$(window).on('scroll',loadNewPosts);
}	


initMasonry = function(){
	$('.scroll-area').on('scroll',loadNewPosts);
 $container = $('#posts-container');
    
    $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector: 'div.item'//,
        //columnWidth: 100
      });
    });
   
   
}
    



initMorePostsClick = function(){
	$('body').on('click','a.more-posts', morePostsClick);
}

//------------- Tooltip -------------

refreshTooltipPosition = function(){
	$tooltipX = $mouseX - $offsetX;
	$tooltipY = $mouseY - $offsetY;
	$tooltip.css({
		left: $tooltipX+'px',
 		top: $tooltipY+'px'
	})
}

initTooltip = function(){
$(document).on( "mousemove", function( event ) {
	$mouseX = event.pageX;
	$mouseY = event.pageY;
	refreshTooltipPosition();
});

 $('.tooltip').on('mouseenter',function(){

 	$('body').prepend($tooltip);	
 	$('.tooltip-pointer').text($(this).attr('title'));
 	$offsetX = $tooltip.outerWidth()/2;
 	$offsetY = $tooltip.outerHeight() +20;
 	refreshTooltipPosition();
 })
$('.tooltip').on('mouseleave',function(){
	$tooltip.remove();
});
}

//------------- Sector panel -------------


resetSectorMenu = function(animate){
	var $speed = animate ? 200 : 0;
	hideSectorClose();
	var $activeIndex = $items.index($('#sectors li.item.active')),
		$move = $activeIndex*20,
		$item = $('#sectors li.item').eq($activeIndex);
		$item.removeClass('active');
		$('.main,aside',$item).animate({
			opacity:0
		},$speed,function(){
			$item.animate({
		left: $move+'%'
	},$speed,"easeOutQuad",function(){
		//done;
		$items.not($item).fadeIn(200,"easeInQuad");
		$item.removeClass('active');
		$('.handle',$item).addClass('hover');
		activateSectorClick();
	})
	})
}


$('a.case-study-btn').on('click',function(e){
	e.preventDefault();
	resetSectorMenu();
url = $this.attr('href');
hideContent(function(){
	loadContent(url,true);
})
})

positionSectorClose = function(animate){
	var $speed = animate ? 100 : 0;
	if($close.hasClass('active')){
		var $height = $close.height();
		$close.animate({
		top:'-'+$height+'px'
	},$speed,"easeOutQuad",function(){
	$close.off('click');
	$close.on('click',function(e){
		e.preventDefault();
		resetSectorMenu(true);
	});	
	})

	}
}
showSectorClose = function(){
		$close.addClass('active');
		positionSectorClose(true);
}
hideSectorClose = function(){
	$close.removeClass('active');
	$close.animate({
		top:0
	},200,"easeOutQuad",function(){
	})
}

resetDesktopSectorAccordion = function(){

}
moveDesktopSectorAccordion = function(e){
	$items = $('#sectors li.item');
	$close = $('#sectors a.close');
	destroySectorClick();
	showSectorClose();
	
	var $parent = $(this).parent('li');
	var $position = $parent.position();
	////console.log($position)
	$parent.addClass('active');
	$('.handle',$parent).removeClass('hover');
	$items.not($parent).fadeOut(100,"easeOutQuad");
	$parent.animate({
		left:'0%'
	},200,"easeOutQuad",function(){
		$('.main, aside',$parent).animate({
			opacity: 1
		},200)
	})
}
activateSectorClick  = function(){
	$handles = '#sectors .handle';
	$items = $('#sectors li.item');
	$close = $('#sectors a.close');
	$items.removeAttr('style');
	$('body').off('click',$handles, moveMobileSectorAccordion);
	$('body').off('click',$handles, moveDesktopSectorAccordion).on('click',$handles, moveDesktopSectorAccordion);

	}
destroySectorClick = function(){
	$($handles).off('click');
}
moveMobileSectorAccordion = function(e){
	e.preventDefault();
		var $parent = $(this).parent('li');
		if($parent.hasClass('active')){
			$parent.removeClass('active');
			$('.main,aside',$parent).slideUp(200,"easeOutQuad")
		}else{
			$parent.addClass('active');
			$('.main,aside',$parent).slideDown(200,"easeOutQuad")
				
		}
}	

activateMobileSectorClick = function(){
	$handles = '#sectors .handle',
	$items = $('#sectors li.item'),
	$close = $('#sectors a.close');
	$items.removeAttr('style');
	$('body').off('click',$handles, moveDesktopSectorAccordion);
	$('body').off('click',$handles,moveMobileSectorAccordion).on('click',$handles,moveMobileSectorAccordion);
}

//------------- Navigation -------------

moveMenuState = function(){

	var $currentMenuItem = $('#nav ul li.current-menu-item'),
		$currentPos = $currentMenuItem.position(),
		$highlight = $('#nav .highlight');
		$highlight.animate({
		top: $currentPos.top+'px'
	},200,"easeOutQuad",function(){
		//callback
		$('#nav').html($('#nav').html());
	})
}

changeMenuState = function(index){
var $options = $('#nav li'),
	$currentMenuItem = $options.eq(index-1);

	$options.removeClass('current-menu-item');
	$currentMenuItem.addClass('current-menu-item');
	
	moveMenuState();
}

updateHashMenuState = function(){
	var currentHash = location.hash;
		_navLinks = $('#nav ul a');
		_navLinks.each(function(){
			var urlSegments = $(this).attr('href').split('/');

			if(urlSegments[urlSegments.length-1]==currentHash){
				$('#nav ul li').removeClass('current-menu-item')
				$(this).parent('li').addClass('current-menu-item');
				
			}
		})
}

desktopNavClickAction = function(e){
	$('#nav ul li').removeClass('current-menu-item');
	var _this = e.currentTarget;
	$(_this).parent('li').addClass('current-menu-item');
}

closeMobileNav = function(){
	$("#header").removeClass('expanded');
	$('a#mobile-menu').removeClass('active');
	$('#nav').hide();
	//$('#contacts').hide();
}

mobileNavClickAction = function(e){
	//e.preventDefault();
	$('#nav ul li').removeClass('current-menu-item').removeClass('current_page_item');
	var _this = e.currentTarget;
	$(_this).parent('li').addClass('current-menu-item');
	closeMobileNav();
	var $hash = $(_this).attr('href').split('#');
	var $anchor = $("div[data-anchor='"+$hash[1]+"']");
	var $anchor = $('.'+$hash[1]);
	var animationSpeed = 200;
	var $offset =-70;
 



/*
	$.scrollTo( '#header', animationSpeed, {
          easing: 'easeInOutExpo',
          offset: $offset
        });
*/

}


mobileNavIconClickAction = function(e){
		e.preventDefault();
		var $header = $(this).parent('header');
		if($(this).hasClass('active')){
		$('#nav').hide();
		$header.removeClass('expanded');
		$(this).removeClass('active');
	} else {
		$header.addClass('expanded');
		$('#nav').show();
		$(this).addClass('active');
	}
}
setContentPosition = function(toggle){
	var $move = 200-$('#header').width(),
		$time = 200;
	switch(toggle){
			case 'open':
			break;
			case 'close':
			$move = 0;
			break;
			case 'reset':
			$time=0;
			//$move = $('#header').width()-1;
		}
	$('#page-wrap, #work-single .page-title').animate({
		'left':$move+'px'
	},$time,"easeOutQuad",function(){
	})
}

destroyMobileMenu = function(){
	$('a#mobile-menu').off('click',mobileNavIconClickAction);
	$('#nav ul a').not('#nav.single ul a').off('click',mobileNavClickAction);
}
activateMobileMenu = function(){
destroyMobileMenu();
destroyDesktopMenu();
	$('a#mobile-menu').off('click').on('click',mobileNavIconClickAction);
	//$('a#mobile-menu').click(mobileNavIconClickAction);
	$('#nav ul a').not('#nav.single ul a').on('click',mobileNavClickAction);


/*
if(isMobile){
$('body').on('click','.caption .button',function(e){
	//e.preventDefault();
	var $anchor = $("div[data-anchor='our-work']");
	var animationSpeed = 200;
	var $offset =-70;
	var $body     = $(document.body),
    $html     = $(document.documentElement),
    $bodhtml  = $body.add( $html ),
    top = $anchor.offset().top;

      
document.body.scrollTop = top;
             

	$.scrollTo( $anchor, animationSpeed, {
          easing: 'easeInOutExpo',
          offset: $offset
        });

})
}
*/



$(window).on('scroll',function(){
		if($('#header').hasClass('expanded')){
			$('a#mobile-menu').trigger('click');
		}
		
	})
}
activateDesktopMenu = function(){
	destroyMobileMenu();
	$('#nav ul a').not('#nav.single ul a').on('click',desktopNavClickAction);
}
destroyDesktopMenu = function(){
	$('#nav ul a').off('click',desktopNavClickAction);
}

scrollToAnchorPage = function(){
  //move page to requested anchor link
   if(location.hash){
    var $hash = location.hash.replace('#','');
    if($fullPageActive){
    $.fn.fullpage.moveTo($hash,0);
    //$.fn.fullpage.reBuild();
  }
    }
}

//------------- Load pages -------------

showOverlay = function(status){
	switch(status){
		case 'true':
		$('body').prepend('<div id="overlay" />');
		$('#overlay').css({
			'display':'block',
			'position':'fixed',
			'left':0,
			'top':0,
			'width': '100%',
			'height': $(document).height(),
			'z-index':9999,
			'opacity':0
		})
		break;
		case 'false':
		$('#overlay').remove();
		break;
	}
}

loadContent = function(url,push){

if(push && $historyActive){
	history.pushState({}, '', url); //push the url
	 currentPathname = location.pathname;
	// updateHashMenuState();
	}
showOverlay('true');
	if(location.pathname=='/' || location.pathname=='/~wlprintco/') url=null

	$singlePage=false;
	isHome = false;

	if(url==null){ //on homepage
		isHome = true;
		$('#home-link').fadeIn(200,"easeInQuad");
		$('#nav ul li:first').addClass('current-menu-item');
		$('#nav').removeClass("single");
		if($homeLoaded){
			//console.log('home loaded');
		//homepage already been loaded so grab HTML from cache
		$.each($pageCache, function( key, obj) {
			if(obj.home==1)  $loadedObjs.push(obj.html);
		})
		renderPages();
		} else {
			//get homepage content with AJAX
	  $.ajax({
    url:"?action=ajax_get_pages",
    dataType: 'json',
    cache: false,
    data: { firstLoad: $firstLoad} ,
    timeout: 10000,
    success: function(data) {
    //loadPages(data);
    $homeLoaded=true;
	loadedObjs = [];
	$pages = data;
	$totalPages = data.length;
    $loadedPages = 0;

    //$pages = pages;
    loadPage(0,$pages[0],true); //load the first page
	},
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('main').removeClass('loading');
        $('#overlay').remove();
        loader('hide');
    },
    complete: function(xhr, textStatus) {
    } 
    }); 
	}
	 } else {
	 	$('#nav').addClass('single');
	 	//load only the requested url (not homepage)
	 	//if(console) console.log('single page')
	 	$('#home-link').fadeOut(200,"easeOutQuad");
	 	$singlePage=true;
	 	if(!$firstLoad){  //if single page and not first load, get page
	 	$totalPages=1;
	 	loadPage(0,url,false);
	 } else { //single page and first load, do nothing but init scripts and preload images
	 	initPageScripts();
	 	
	 	toggleControls();
	 	preloadImages(showContent);
	 	//showContent();
	 	//$firstLoad=false;
	 }
	 }
	 //end


//})


	

}

loadPage = function(index,url,home){

	var $ajaxLoad=true;
	////console.log('load '+url);

if($pageCache.length>0){ 
$.each($pageCache, function( key, obj) {
	if(obj.url == url){ //page is in cache, get the HTML
	
        $ajaxLoad=false;
		$loadedObjs.push(obj.html);
		$loadedPages++;
		  if(!isMobile){
		if($loadedPages< $totalPages){
             var $url = $pages[$loadedPages];
             loadPage($loadedPages,$url,home);
             } else {
                 renderPages();
             }
         } else {
         	if($loadedPages==1) $('main').empty();
         	$('main').append(obj.html);
         	if($loadedPages==3) showContent(); //number of pages to load before showing page
         	   var $url = $pages[$loadedPages];
         	   if($loadedPages < $totalPages){
         	loadPage($loadedPages,$url,home);
         	}
         }

        }
    })
}	
//page isnt in cache, so make AJAX call
		if($ajaxLoad){
     		$.get(url).done(function(data){
     		
			var $page = $(data).find('.section');
			if(!isMobile && $page.attr('id')!="work-single" && $page.attr('id')!="enlightenment-page") $page.removeAttr('id');
			
			if(index==0){ //if first page, change the page title

				 $homelink = $(data).find('#home-link');
				 $('#home-link').attr('style',$homelink.attr('style'));


//update elements outside of the updatable area

			}
              $loadedObjs.push($page);
              $pageCache.push({home: home, url: url, html: $page}); //push page data to cache
              $loadedPages++;

              if(!isMobile){ //if not mobile, preload each page
              if($loadedPages < $totalPages){
              	////console.log('load '+$loadedPages)
             var $url = $pages[$loadedPages];
             loadPage($loadedPages,$url,home);
             } else {
                 renderPages();
             }
               } else {

               	//if mobile, just show each page as it loads
               	if($loadedPages==1) $('main').empty();
               		$('main').append($page);
               		if($loadedPages==2) showMobileContent(); //number of pages to load before showing page
               		
               		   var $url = $pages[$loadedPages];
               		if($loadedPages < $totalPages){
               		loadPage($loadedPages,$url,home);
               	}  else {
               		initPageScripts();
               	}
               }
        	 });
     }

	}

renderPages = function(){
	destroyFullPage();
	if(!isMobile) $('.scroll-area').perfectScrollbar('destroy');
	//$('.scroll-area').slimscroll({destroy:true});

	var $start=0;
    	if(!$firstLoad){
    		//console.log('empty main')
    		$('main').empty();

    	} else {
    		$start=1;
    	}
    	for(i=$start;i<$loadedObjs.length;i++){
            $('main').append($loadedObjs[i])
        }
    
         
 	var $title = $loadedObjs[0].attr('data-title');
				  document.title = $title;

	if($loadedObjs.length>1){ //if homepage, activate fullpage js before showing content
		if(!isMobile){
			activateFullPage(true);
			toggleControls();
		} else {
			initPageScripts();
         	scrollToAnchorPage();
         	
         	$('#overlay').remove();
         	preloadImages(showContent);
         	//showContent();
         	 // $firstLoad = false;
		}
		
   		
} else {


toggleControls();
preloadImages(showContent);
//showContent();

/*$('main').animate({
         			opacity:1
         		},500,function(){

         		})
*/


	//activateFullPage(false);
	//$.fn.fullpage.setAutoScrolling(false);
}

//rebuildFullPage();
   	$loadedObjs = [];

}

initPageScripts = function(){

	initMap(); //init map
	if(!$sliderActive && isMobile) initSlickSlider();
	if(isMobile && location.hash){ //if mobile, scroll to hash if in URL
	var _hash = location.hash;
	var animationSpeed = 200;
		var $offset =-70;
		var $anchor = _hash;
		$.scrollTo( $anchor, animationSpeed, {
          easing: 'easeInOutExpo',
          offset: $offset
        });
	}

	if($('#enlightenment-page').length){
	if(!isMobile && !isIE9){
	initMasonry(); //init masonry
} else {
	initPostLoad();
}
}
	initMorePostsClick();
	initTooltip(); //init tooltip
	if(!isTouchDevice.any()) initParallax(); //init parallax
}

showMobileContent = function(){
	$('main').css({opacity:1});
	$('#page-wrap').animate({
		opacity:1
	},400,'easeInOutQuart',function(){
		if($firstLoad) $('#preloader-screen').hide();
		$firstLoad = false;
	})
	showOverlay('false');
	//initPageScripts();
}

showContent = function(){

	var _target = $firstLoad  ? '#page-wrap' : 'main';
	if($firstLoad)$('main').css({opacity:1});
	$(_target).animate({
		opacity:1
	},400,'easeInOutQuart',function(){
		if($firstLoad) $('#preloader-screen').hide();
		$firstLoad = false;
	})
	showOverlay('false');
	 var animationSpeed = 500;
var $anchor = '#top';
 var $offset = $height * -1;
	if(location.hash ){
		var $hash= location.hash.replace('#','');
		$anchor = $("div[data-anchor='"+$hash+"']");
		$offset=-70;
	} 


 var $height = $('.page-title').height();
	

        $.scrollTo( $anchor, animationSpeed, {
          easing: 'easeInOutExpo',
          offset: $offset
        });
if($('#work-single').length){
	//$('main').attr('id','single-page');
	$.fn.fullpage.destroy();
	$('#fullpage').css({bottom:0})
//	destroyFullPage();
	//$.fn.fullpage.destroy();
} else {
	$.fn.fullpage.reBuild();
}
}

hideContent = function(callback){
	$('main').animate({
		opacity:0
	},400,'easeInOutQuart',function(){
		callback()
	})
}

toggleControls = function(){
	
	if($('main .controls').length){
	
	$('.controls.duplicate').html($('main .controls').html()).fadeIn(200,"easeInQuad");
} else {
	$('.controls.duplicate').fadeOut(200,"easeOutQuad")
}
}


//------------- fullpage js -------------



activateFullPage = function($scrolling){
	
//full page scroll

if($('#fullpage').length && !$fullPageActive && !isMobile){


	 var $sections = $('.section'),
       $anchors = [];

      	$sections.each(function(){
        $anchors.push($(this).attr('data-anchor'));
        });

$('main').attr('id','fullpage');
        
	$('#fullpage').fullpage({
		
		verticalCentered: false,
		resize : false,
		scrollingSpeed: 900,
		//easing: 'easeInOutQuart',
		easing: 'easeInOutExpo',
		navigation: false,
		slidesNavigation: true,
		slidesNavPosition: 'bottom',
		loopBottom: false,
		loopTop: false,
		loopHorizontal: false,
		scrollBar:false,
		autoScrolling: true,
		scrollOverflow: false,
		paddingTop: '0',
		paddingBottom: '0',
		//normalScrollElements: '#header',
		fixedElements: '#header,#featured-work,#sectors',
		normalScrollElementTouchThreshold: 10,
		keyboardScrolling: true,
		touchSensitivity: 10,
		continuousVertical: false,
		animateAnchor: true,
		anchors: $anchors,
    		onLeave: function(index, nextIndex, direction){
         	changeMenuState(nextIndex);
         	
         	setTimeout(function(){
  					resetTestimonials();
				}, 500);

         	if(index!=3) resetSectorMenu(false);
         	if(index==1 && nextIndex>1 ){
         		setTimeout(function(){
  					$('#home-link').fadeIn(100)
				}, 500);
         	
         	}
         	if(index>1 && nextIndex==1){
         		//$('#home-link').fadeOut(100);
         	}
         	
         	},
         	 afterResize: function(){
            	//var pluginContainer = $(this);
            	$.fn.fullpage.setScrollingSpeed(900);
            	//$.fn.fullpage.reBuild();
            	//if(console) console.log("The sections have finished resizing");
        },
         	afterRender: function(){
         		refreshGrid();
         		 if(!$sliderActive) initSlickSlider();
         		initPageScripts();
         		rebuildFullPage();
         		$fullPageActive = true;
         		scrollToAnchorPage();
         		$('#overlay').remove();
         		if(location.hash && location.hash!='#home'){
         			$('#home-link').show();
         		}
         		preloadImages(showContent);
         		//showContent();
         		/*
         		$('main').animate({
         			opacity:1
         		},500,function(){
         			//finished
         		})
*/
         		//	var $h = $('.enlightenment').attr('style').replace(';','').split(' ');
         			initScrollPanel();
					
         	}
         
    	});	
}
}

rebuildFullPage = function(){
	if($fullPageActive  && !isMobile){
$.fn.fullpage.reBuild()
}
}
destroyFullPage = function(){
$('.section').css("height", "auto");
		$('#fullpage').css({'height': 'auto'})
	if($fullPageActive){
		$.fn.fullpage.destroy('all');
		$fullPageActive=false;
		//$('.section').attr("style", {height: "auto"})
		//$('#fullpage').attr("style", {height: "auto"})
		
		
	}
}

destroyScrollPanel = function(){
if($('#enlightenment-page').length){
	$('.scroll-area').perfectScrollbar('destroy').removeAttr('style');
	$scrollbarActive = false;
}
}

initScrollPanel = function(){

	if($('#enlightenment-page').length){
		destroyScrollPanel();
		var obj = document.getElementById("enlightenment-page"),
		$height = obj.style.height;

	$('.scroll-area').css({ height: $height})
	if(!$scrollbarActive) $('.scroll-area').perfectScrollbar();
	$scrollbarActive = true;
	refreshScrollPanel();
	}
//if($scrollbarActive) refreshScrollPanel();
}
refreshScrollPanel = function(){
	if($('#enlightenment-page').length){
		if($('#enlightenment-page').attr('style')){
	
	
	setTimeout(function() {
		var obj = document.getElementById("enlightenment-page");
		var $height = obj.style.height;
      $('.scroll-area').css({ height: $height})
      $('.scroll-area').perfectScrollbar('update');
}, 1000);
	
}
	
	}
	
}


//------------- History -------------

activateHistoryActions = function(){
	initPopState();
	initHistoryLinks();
	initHistoryNavLinks();
	//loadContent(location.href, true);
}

destroyHistoryActions = function(){
	$('body').off('click','.push-link',sendPushLink);
	//*************************reverse hash links to normal links here********************************
}


convertNavLinksToHash = function(){
  var $links = $('#nav a').not('#nav a:first').not('#nav a.download-link');
    $links.each(function(){
    var $href = $(this).attr('href');
    //remove trailing slash
    $href =  $href.replace(/\/$/,"");
    $url = $href.split("/");
    if($url.length>2){
        $url[$url.length-1] = '#'+$url[$url.length-1];
    }
    $url = $url.join('/');
    $(this).attr('href',$url);
    })
    $('#nav a:first').attr('href', $('#nav a:first').attr('href')+'#home');
  }


sendPushLink = function(e){

  e.preventDefault()
 // 	//console.log('push link');
  $this = $(e.currentTarget);
  url = $this.attr('href');
////console.log(url);
hideContent(function(){
	loadContent(url,true);
})
  
}
initHistoryNavLinks = function(){
	$('body').on('click','#nav.single ul a',function(e){
		e.preventDefault();
		var $index = $('#nav.single ul a').index($(this));
		changeMenuState($index+1);
		 url = $(this).attr('href');
  	//loadContent(url,true);
  	hideContent(function(){
	loadContent(url,true);
})
	});
}
initHistoryLinks = function(){
	$('body').on('click','.push-link',sendPushLink);
}

initPopState = function(){
 window.onpopstate = function (event){ 
    if(location.pathname != currentPathname){
 	 if ($firstLoad){
		//$firstLoad = false;
	} else {
	if (event.state != null){
	//console.log('not null')
// there is something in the history state for this entry, so we go ahead and load it
// but we pass in false so that it doesn't write another entry over it...
loadContent(location.href,false);
}else{
	//console.log('null')
// if there is nothing in the state (either first load or returning to a page that was a first load)
// then we tell it not to load the ajax, but instead just load the default content
loadContent(null,false);
}
} 
}
}
}
/*
window.onpopstate = function(event) {
  if(event.state==null){
	} else {
    var $url = location.href.replace(location.hash,'');
    if($url==$home_url){
         $url = $home_url;
    }
    getPages($url);
	}
};
}
*/


//------------- Image preloading -------------

function preloadImages(callback) {

var $images = [],
	$loaded = 0,
	//$preload_bgs = $('.preload').not('img.preload'),
	//$preload_imgs = $('img.preload');
	$preload_bgs = $('.preload-home').not('img.preload-home'),
	$preload_imgs = $('img.preload-home');
	$preload_bgs.each(function(index) { //get inline background images src
	  $images.push(this.style.backgroundImage.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''));
	});
	$preload_imgs.each(function(index){ //get img src
	  $images.push($(this).attr('src'));
	 });

var $imageCount = $images.length,
$loaded=0;
for (var i = 0; i < $imageCount; i++) {
var $image = new Image();
$image.onload = function(){ 
   if(++$loaded==$imageCount){
    		callback();
    	}
	}
$image.src = $images[i];  
}
//
}




//------------- Init Site -------------

resetMenus = function(){
	$('#nav').removeAttr('style');
	$('#header #contacts').removeAttr('style');
	if($('a#mobile-menu').hasClass('active')) $('a#mobile-menu').removeClass('active');
	$('#page-wrap, #work-single .page-title').css({
		left:0
	});
}

switchMenu = function(){
	//setContentPosition('reset');

if(isMobile || isTablet){
	$('#header').css({
		'width':'100%'
	})
	resetMenus();
	activateMobileMenu();
}
if(isDesktop){
	$('#header').css({ 
		'width':'200px'
	})
	resetMenus();
	activateDesktopMenu();
}
if(isHiResDesktop){
	$('#header').css({
		'width':'240px'
	})
}
	
}

switchAccordion = function(){
	if(!isMobile){ //what we do accordion panel
		activateSectorClick();
	} else {
		activateMobileSectorClick();
	}
}

scrollTo = function(e){
	e.preventDefault();
		var _this = e.currentTarget;
		var _urlSegments = $(_this).attr('href').split('/');
		var _hash = _urlSegments[_urlSegments.length-1];
		var animationSpeed = 200;
		var $offset =-70;
		var $anchor = _hash;
		$.scrollTo( $anchor, animationSpeed, {
          easing: 'easeInOutExpo',
          offset: $offset
        });
}

initScrollTo = function(){
		//e.preventDefault();
	//console.log('init scroll to');
	$('body').on('click','#nav a, .caption a',scrollTo);
}
destroyScrollTo = function(){
	//console.log('destroy scroll to');
	$('body').off('click','#nav a, .caption a', scrollTo);
}

initPage = function(){

	loadContent(location.href, true); 

	if(!isMobile && Modernizr.history){
		activateHistoryActions(); //browser history supported, activate js
	}
	if(!isMobile){ //what we do panel
		activateSectorClick();
		destroyScrollTo();
	} else {
		activateMobileSectorClick();
		initScrollTo();
		
	}
	switchMenu();
	switchAccordion();
	convertNavLinksToHash();
}
setSectionAnchors = function(state){
	var _sections = $('.section');
	_sections.each(function(){
		if(state){
		$(this).attr('id',$(this).data('anchor'));
	} else {
		if($(this).attr('id')!='work-single') $(this).removeAttr('id');
	}
	})
	
}


refreshPage = function(){
	isMobile = $(window).width() <= 660;
	isTablet = $(window).width() > 660 && $(window).width() <= 1020;
	isDesktop = $(window).width() > 1020;
	isHiResDesktop = $(window).width() > 1650;
	$historyActive = !isMobile && Modernizr.history;

	$.fn.fullpage.setScrollingSpeed(0);


	switchMenu();
	switchAccordion();
	refreshScrollPanel();
	moveMenuState();
	positionSectorClose(false);
	//toggle fullscreen
	if(!isMobile){
		initScrollPanel();
		destroyScrollTo();
	//	destroyFullPage();
	if(!$fullPageActive) activateFullPage();
	//	activateFullPage(true);
		resetSectorMenu(false);
		setSectionAnchors(false);
	} else {
		destroyFullPage();
		destroyScrollPanel();
		destroyHistoryActions();
		setSectionAnchors(true);
		initScrollTo();

	}

}

initVideoOverlay = function() {
   var _mediaPlayer = document.getElementById('wl-video'),
   	   _btn = $('a#video-btn'),
   	   _closeBtn = $('#video-close'),
   	   _overlay = $('#video-overlay');
   
   	   $('body').on('click','#video-btn',function(e){

   	   	e.preventDefault();
   	   _overlay.show();
   	   	_mediaPlayer.play();
   	   })

   	    $('body').on('click','#video-close',function(e){
   	   	e.preventDefault();
   	   	_mediaPlayer.pause();
   		 _mediaPlayer.currentTime = '0';
   		 _overlay.hide();
   	   })
   	}
initVideoOverlay();

initPage();
$(window).on('resize',refreshPage);




}) 	//end on document load

$(window).on('load',function(){



})