var MainJsClass = function () {
	var scope = this;

	this.customDatepicker = function () {
		if($('.custom-datepicker').length){

			$(".custom-datepicker", "").datepicker({
				"format": "dd MM, yyyy",
				"weekStart": 1,
				"autoclose": true
			});
			$('.form__add-on').click(function(){
				$(this).prevAll('.datepicker').datepicker('show');
			});
			// Hide datepicker on scroll and resize

			var dtPckr = $('.custom-datepicker');
			$(window).scroll(function() {
				dtPckr.datepicker('hide');
			});

			$(".custom-datepicker").click(function(){
				$(this).css('color','#34495e')
			});

		};

        $('#date2').DatePicker({
            flat: true,
            date: [],
            datesBusy: ['2013-12-15', '2013-11-14'],
            datesFree: ['2013-12-6', '2013-12-13', '2013-12-19'],
            format: 'Y-m-d',
            calendars: 1,
            mode: 'multiple',
			onRender: function(date) {
                date = date.setHours(0,0,0,0);

                var dateClass = false;

                for (var i = 0; i < this.datesBusy.length; i++){
                    if (date == new Date(this.datesBusy[i]).setHours(0,0,0,0)){
                        dateClass = 'is-busy';
                    }
                }

                if (!dateClass){
                    for (i = 0; i < this.datesFree.length; i++){
                        if (date == new Date(this.datesFree[i]).setHours(0,0,0,0)){
                            dateClass = 'is-free';
                        }
                    }
                }

				return {
					className: dateClass
				}
			},
			starts: 0
        });
	};

	this.initWysiwyg = function () {
		if($('#wysiwyg').length){
			$('#wysiwyg').ckeditor({
				removePlugins: 'elementspath'
			});
		}
	};
    this.initStripe = function () {
        if($(".jsStripe").length){
            $(".jsStripe li:nth-child(even)").addClass('even'); //чётные строки таблицы
        }
    };

	this.initCarousel = function () {
		if($('.slider__holder').length){
			$(".slider__holder").carouFredSel({
				width: 620,
				height: "variable",
				items: {
					visible: 1,
					width: 620,
					height: "variable"
				},
				onCreate: function() {
					$(this).trigger("currentPosition", function( pos ) {
						var txt = (pos+1) + " из " + $("> *", this).length;
						$("#slider_log").html( txt );
					});
				},
				scroll: {
					pauseOnHover: true,
					onBefore : function() {
						$(this).trigger("currentPosition", function( pos ) {
							var txt = (pos+1) + " из " + $("> *", this).length;
							$("#slider_log").html( txt );
						});
					},
					onAfter : function() {
						$(this).trigger("currentPosition", function( pos ) {
							var txt = (pos+1) + " из " + $("> *", this).length;
							$("#slider_log").html( txt );
						});
					}
				},
				auto: {
					timeoutDuration: 5000,
					delay: 5000,
					progress: ".bar"
				},
				prev: ".slider__prev",
				next: ".slider__next"
			});
		};

            $('.gallery').each(function(){
                var gallery = $(".gallery__holder", $(this)),
                    next = $(".gallery__next", $(this)),
                    prev = $(".gallery__prev", $(this));

                gallery.carouFredSel({
                    circular: true,
                    infinite: false,
                    auto 	: false,
                    prev	: {
                        button	: prev,
                        key		: "left"
                    },
                    next	: {
                        button	: next,
                        key		: "right"
                    }
                });
            })

	};

	this.initChoosen = function (){
        $(".chosen-select").chosen({allow_custom_value: true});
    };
    this.hasDrop = function (){
        if ($('.nav__drop_right').length) {
            $('.nav__drop_right').parent('.nav__drop-item').addClass('has-drop');
        }
    };
    this.initAccordion = function (){
//        if ($('.accordion').length) {
//            $('.accordion__content').not('.active').hide();
//            $('.accordion__caption').click(function() {
//                $('.accordion__content').not($(this).next('.accordion__content')).removeClass('active').slideUp(600);
//                $(this).next('.accordion__content').addClass('active').slideDown(600);
//            });
//
//        }

        if ($('.accordion').length) {
            $('.accordion__content').not('.active').hide();
            $('.accordion__caption').first().addClass('active-link');
            $('.accordion__caption').click(function() {
                $(this).next($('.accordion__content')).slideToggle();
                $(this).toggleClass('active-link');
            });

        }
    };
    this.openPopup = function (){
            $('.jsOpenLink').click(function(){
                $('.jsOpenPopup').show();
            });
            $('.jsClosePopup').click(function(){
                $('.jsOpenPopup').hide();
            });
    };
    this.TopScroll = function (){
        var currentScrollTop = 0;
        if($(document).scrollTop()> currentScrollTop){
            $('.top_scroll').fadeIn(1);
        }

        $(window).scroll(function(){

            currentScrollTop = $(window).scrollTop();

            if (currentScrollTop > 0){
                $('.top_scroll').fadeIn(1);
            }else{
                $('.top_scroll').fadeOut(1);

            }

            tempScrollTop = currentScrollTop;

        });

        $('.top_scroll').click(function(){
            if($.browser.safari){
                bodyelem = $("body")
            } else{
                if($.browser.opera){
                    bodyelem = $("html")
                } else{
                    bodyelem = $("html,body")
                }
            }

            bodyelem.animate({scrollTop: 0},700);

            return false;

        });
    };
    this.RangeSlider = function (){
            var sliderRangeItem = $("#filter-slider"),
                sliderMin = $('.minCost'),
                sliderMax = $('.maxCost'),
                sliderMinStart = parseInt($('.filter__value-left').text()),
                sliderMaxStart = parseInt($('.filter__value-right').text()),
				sliderMinCur = sliderMinStart,
				sliderMaxCur = sliderMaxStart;

            sliderRangeItem.slider({
                range: true,
                min: sliderMinStart,
                max: sliderMaxStart,
				values: [ sliderMinStart, sliderMaxStart ],
				stop: updatetext,
				slide: updatetext
            });
        updatetext();
//            $('#filter-slider > .ui-slider-handle').last().addClass('filter__item_last');
//			$('#filter-slider > .ui-slider-handle').first().children('.handle_value').html('от ' + sliderMinCur + ' <span class="b-rbl">a</span>');
//			$('#filter-slider > .ui-slider-handle').last().children('.handle_value').html('до ' + sliderMaxCur + ' <span class="b-rbl">a</span>');

        function updatetext(event, ui){
            if (ui){
                sliderMin.text(sliderRangeItem.slider("values",0));
                sliderMax.text(sliderRangeItem.slider("values",1));
                sliderMinCur = sliderRangeItem.slider("values",0);
                sliderMaxCur = sliderRangeItem.slider("values",1);
            }

            $('#filter-slider-left').html('от ' + sliderMinCur + ' <span class="b-rbl">a</span>');
            $('#filter-slider-right').html('до ' + sliderMaxCur + ' <span class="b-rbl">a</span>');
        }
    };

    this.initGallery = function (){
        if ($('#carousel').length) {
            //jCarousel Plugin
            $('#carousel').jcarousel({
                vertical: true,
                scroll: 1,
                auto: false,
                wrap: 'none',
                visible: 2
//                initCallback: mycarousel_initCallback
            });

            //Front page Carousel - Initial Setup
            $('.slideshow-carousel a img').css({'opacity': '0.5'});
            $('.slideshow-carousel a img:first').css({'opacity': '1.0'});
            $('.slideshow-carousel li a:first').append('<span class="arrow"></span>');


            //Combine jCarousel with Image Display
            $('.slideshow-carousel li a').hover(
                function () {

                    if (!$(this).has('span').length) {
                        $('.slideshow-carousel li a img').stop(true, true).css({'opacity': '0.5'});
                        $(this).stop(true, true).children('img').css({'opacity': '1.0'});
                    }
                },
                function () {

                    $('.slideshow-carousel li a img').stop(true, true).css({'opacity': '0.5'});
                    $('.slideshow-carousel li a').each(function () {

                        if ($(this).has('span').length) $(this).children('img').css({'opacity': '1.0'});

                    });

                }
            ).click(function () {

                    $('span.arrow').remove();
                    $(this).append('<span class="arrow"></span>');
                    $('.slideshow-main li').removeClass('active');
                    $('.slideshow-main li.' + $(this).attr('rel')).addClass('active');

                    return false;
                });
                //Carousel Tweaking
        };
        if ($('#carousel-h').length) {
            //jCarousel Plugin
            $('#carousel-h').jcarousel({
                scroll: 1,
                auto: false,
                wrap: 'none',
                visible: 2,
                initCallback: mycarousel_initCallback
            });

            //Front page Carousel - Initial Setup
            $('.slideshow-carousel a img').css({'opacity': '0.5'});
            $('.slideshow-carousel a img:first').css({'opacity': '1.0'});
            $('.slideshow-carousel li a:first').append('<span class="arrow"></span>')


            //Combine jCarousel with Image Display
            $('.slideshow-carousel li a').hover(
                function () {

                    if (!$(this).has('span').length) {
                        $('.slideshow-carousel li a img').stop(true, true).css({'opacity': '0.5'});
                        $(this).stop(true, true).children('img').css({'opacity': '1.0'});
                    }
                },
                function () {

                    $('.slideshow-carousel li a img').stop(true, true).css({'opacity': '0.5'});
                    $('.slideshow-carousel li a').each(function () {

                        if ($(this).has('span').length) $(this).children('img').css({'opacity': '1.0'});

                    });

                }
            ).click(function () {

                    $('span.arrow').remove();
                    $(this).append('<span class="arrow"></span>');
                    $('.slideshow-main li').removeClass('active');
                    $('.slideshow-main li.' + $(this).attr('rel')).addClass('active');

                    return false;
                });
            //Carousel Tweaking

            function mycarousel_initCallback(carousel) {

                // Pause autoscrolling if the user moves with the cursor over the clip.
                carousel.clip.hover(function() {
                    carousel.stopAuto();
                }, function() {
                    carousel.startAuto();
                });
            }
        }
    };
    this.initSelect = function (){
        if ($('.filter__select').length){

            $('.filter__select').each(function(i, v){
                var topBlock = $('.filter__top', this),
                    arrow = $('.ico_type_arrow', this),
                    listBlock = $('.filter__list-block', this),
                    listItems = $('.filter__list', this);

                topBlock.click(function(e){
                    arrow.toggleClass('open');
                    listBlock.slideToggle();
                    e.stopPropagation();
                    e.preventDefault();
                });
                $(document).click(function(e){
                    listBlock.slideUp();
                    arrow.removeClass('open');
//                  e.preventDefault();
                });

                listItems.not('.filter__list_fst').click(function(e){
                    var tlist = $(this).text();
                    $(this).toggleClass('active');

                    if (listItems.hasClass('active')){
                        listItems.eq(0).text(tlist);
                        listBlock.slideUp();
                        arrow.removeClass('open');
                        $(this).toggleClass('open');
                    }
                    e.stopPropagation();
                    e.preventDefault();
                });
            });
        }
    };

	$(function(){
		scope.customDatepicker();
		scope.initWysiwyg();
		scope.initCarousel();
		scope.hasDrop();
		scope.initGallery();
		scope.initChoosen();
		scope.openPopup();
		scope.initStripe();
		scope.initAccordion();
		scope.RangeSlider();
		scope.TopScroll();
		scope.initSelect();
	});

};


var  mainJs = new MainJsClass();

function mycarousel_initCallback(carousel) {

	// Pause autoscrolling if the user moves with the cursor over the clip.
	carousel.clip.hover(function() {
		carousel.stopAuto();
	}, function() {
		carousel.startAuto();
	});
}