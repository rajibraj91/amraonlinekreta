(function($){
    "use strict";
	
	

    document.addEventListener('readystatechange', event => {
        if (event.target.readyState === "complete") {
          var clockdiv = document.getElementsByClassName("offer-date");
          var countDownDate = new Array();
          for (var i = 0; i < clockdiv.length; i++) {
            countDownDate[i] = new Array();
            countDownDate[i]['el'] = clockdiv[i];
            countDownDate[i]['time'] = new Date(clockdiv[i].getAttribute('data-date')).getTime();
            countDownDate[i]['days'] = 0;
            countDownDate[i]['hours'] = 0;
            countDownDate[i]['seconds'] = 0;
            countDownDate[i]['minutes'] = 0;
          }
    
          var countdownfunction = setInterval(function () {
            for (var i = 0; i < countDownDate.length; i++) {
              var now = new Date().getTime();
              var distance = countDownDate[i]['time'] - now;
              countDownDate[i]['days'] = Math.floor(distance / (1000 * 60 * 60 * 24));
              countDownDate[i]['hours'] = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              countDownDate[i]['minutes'] = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              countDownDate[i]['seconds'] = Math.floor((distance % (1000 * 60)) / 1000);
    
              if (distance < 0) {
                countDownDate[i]['el'].querySelector('.days').innerHTML = 0;
                countDownDate[i]['el'].querySelector('.hours').innerHTML = 0;
                countDownDate[i]['el'].querySelector('.minutes').innerHTML = 0;
                countDownDate[i]['el'].querySelector('.seconds').innerHTML = 0;
              } else {
                countDownDate[i]['el'].querySelector('.days').innerHTML = countDownDate[i]['days'];
                countDownDate[i]['el'].querySelector('.hours').innerHTML = countDownDate[i]['hours'];
                countDownDate[i]['el'].querySelector('.minutes').innerHTML = countDownDate[i]['minutes'];
                countDownDate[i]['el'].querySelector('.seconds').innerHTML = countDownDate[i]['seconds'];
              }
            }
          }, 1000);
        }
	});


	$(window).on('load', function(){
        $('.preloader').fadeOut(1000);
    })

	// fixed menu on scroll for desktop
	if ($(window).width() > 992) {
	  $(window).scroll(function(){  
	    if ($(this).scrollTop() > 117) {
	        $('.header-bottom').addClass("fixed-top");
	        // add padding top to show content behind navbar
	        $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
	      }else{
	        $('.header-bottom').removeClass("fixed-top");
	        // remove padding top from body
	        $('body').css('padding-top', '0');
	      }   
	  });
	} // end if



	$(document).ready(function(){
		//mobile drodown menu display
		$('.shop-menu li a, .amb-area ul li a').on('click', function(e) {
			var element = $(this).parent('li');
			if (element.hasClass('open')) {
				element.removeClass('open');
				element.find('li').removeClass('open');
				element.find('ul').slideUp(1000,"swing");
			}
			else {
				element.addClass('open');
				element.children('ul').slideDown(1000,"swing");
				element.siblings('li').children('ul').slideUp(500,"swing");
				element.siblings('li').removeClass('open');
				element.siblings('li').find('li').removeClass('open');
				element.siblings('li').find('ul').slideUp(500,"swing");
			}
		});
		$(".shop-menu>li .shop-submenu").parent("li").children("a").addClass("dd-icon-right");
		$("ul>li>ul, .amb-area ul>li>ul").parent("li").addClass("dd-icon-down");

		$('ul').parent().hover (function() {
			var menu = $(this).find("ul");
			var menupos = $(menu).offset();
			if (menupos.left + menu.width() > $(window).width()) {
				var newpos = -$(menu).width();
				menu.css({ left: newpos });    
			}
		});

		
		//Header Bar
		$('.overlay').on('click', function () {
			$(this).removeClass('active');
			$('.header-bar').removeClass('active');
			$('.menu').removeClass('active');
			$('.cart-sidebar-area').removeClass('active');
		})
		$('.remove-cart').on('click', function (e) {
			e.preventDefault();
			$(this).parent().parent().hide(300);
		});

        $('.swiper-filter').on( 'click', 'a', function() {
          var filter = $(this).attr('data-filter');
          
          $('.swiper-product .swiper-slide').css('display', 'none')
          $('.swiper-product .swiper-slide' + filter).css('display', '')
          $( '.swiper-filter a' ).removeClass( 'swiper-active' );
          $( this ).addClass( 'swiper-active' );
          
          productSwiper.updateSize();
          productSwiper.updateSlides();
          productSwiper.updateProgress();
          productSwiper.updateSlidesClasses();
          productSwiper.slideTo(0);
          productSwiper.scrollbar.updateSize();
          
          return false;
        });
      
        var filterSwiper = new Swiper ('.swiper-filter', {
            slidesPerView: 3,
            spaceBetween: 30,
		})
        
        var productSwiper = new Swiper ('.swiper-product', {
            observer: true,
            slidesPerView: 4,
            autoplay: {
              delay: 10000,
              disableOnInteraction: false,
            },
            breakpoints: {
				480: {
					slidesPerView: 1,
				},
				992: {
					slidesPerView: 2,
				}
			},
            pagination: {
              el: '.swiper-pagination',
              clickable : true,
            }
		})

		var galleryThumbs = new Swiper(".gallery-thumbs", {
			centeredSlides: true,
			centeredSlidesBounds: true,
			slidesPerView: 5,
			watchOverflow: true,
			loop: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: 'vertical',
			navigation: {
			  nextEl: '.product-next',
			  prevEl: '.product-prev',
			},
			// Responsive breakpoints   
			breakpoints: {  
			
			  // // when window width is <= 320px     
			  // 320: {       
			  //   slidesPerView: 1,
			  //   spaceBetween: 10     
			  // },     
			  // // when window width is <= 480px     
			  // 480: {       
			  //   slidesPerView: 2,       
			  //   spaceBetween: 20     
			  // },   
		
			  // when window width is <= 640px     
			  640: {       
				slidesPerView: 3,       
				// spaceBetween: 30     
			  } 
		
			}
		});
		  
		var galleryMain = new Swiper(".gallery-main", {
			watchOverflow: true,
			loop: true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			preventInteractionOnTransition: true,
			effect: 'fade',
			  fadeEffect: {
			  crossFade: true
			},
			thumbs: {
			  swiper: galleryThumbs
			}
		});
		  
		galleryMain.on('slideChangeTransitionStart', function() {
			galleryThumbs.slideTo(galleryMain.activeIndex);
		});
		  
		galleryThumbs.on('transitionStart', function(){
			galleryMain.slideTo(galleryThumbs.activeIndex);
		});
	
	
		// shop cart + - start here
		var CartPlusMinus = $('.cart-plus-minus');
		CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
		CartPlusMinus.append('<div class="inc qtybutton">+</div>');
		$(".qtybutton").on("click", function() {
			var $button = $(this);
			var oldValue = $button.parent().find("input").val();
			if ($button.text() === "+") {
				var newVal = parseFloat(oldValue) + 1;
			} else {
				if (oldValue > 0) {
					var newVal = parseFloat(oldValue) - 1;
				} else {
					newVal = 1;
				}
			}
			$button.parent().find("input").val(newVal);
		});
	
		// product view mode change js
		$(function() {
			$('.product-view-mode').on('click', 'a', function (e) {
				e.preventDefault();
				var shopProductWrap = $('.shop-product-wrap');
				var viewMode = $(this).data('target');
				$('.product-view-mode a').removeClass('active');
				$(this).addClass('active');
				shopProductWrap.removeClass('grid list').addClass(viewMode);
			});
		});
	
		// counterup
		setTimeout(function(){
			odometer.innerHTML = 123456789;
		}, 1000);
	
		//Cart Button
		$('.cart-button, .side-sidebar-close-btn').on('click', function () {
			$(this).toggleClass('active');
			$('.overlay').toggleClass('active');
			$('.cart-sidebar-area').toggleClass('active');
		})
	
		//  testimonial style one
		var swiper = new Swiper('.testimonial-slider', {
			navigation: {
			  nextEl: '.testimonial-button-next',
			  prevEl: '.testimonial-button-prev',
			},
			loop: true,
			autoplay: {
				delay: 3200,
				disableOnInteraction: false,
			},
		});
	
		// post-thumb-slider section
		var swiper = new Swiper('.post-thumb-slider', {
			slidesPerView: 1,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.post-thumb-slider-next',
				prevEl: '.post-thumb-slider-prev',
			},
			loop: true,
		});

		// scroll up start here
		$(function() {
			//Check to see if the window is top if not then display button
			$(window).scroll(function(){
				if ($(this).scrollTop() > 300) {
					$('.scrollToTop').css({'bottom':'2%', 'opacity':'1','transition':'all .5s ease'});
				} else {
					$('.scrollToTop').css({'bottom':'-30%', 'opacity':'0','transition':'all .5s ease'})
				}
			});
			//Click event to scroll to top
			$('.scrollToTop').on('click',function(){
				$('html, body').animate({scrollTop : 0},500);
				return false;
			});
		});
	

	});
}(jQuery));
