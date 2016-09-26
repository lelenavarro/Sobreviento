jQuery(function($) {

    var MAIN = window.MAIN || {};

    /* ==================================================
       Mobile Navigation
    ================================================== */
    var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

    MAIN.mobileNav = function() {
        var windowWidth = $(window).width();

        if (windowWidth <= 979) {
            if ($('#mobile-nav').length > 0) {
                mobileMenuClone.insertAfter('#menu');
                $('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
            }
        } else {
            $('#navigation-mobile').css('display', 'none');
            if ($('#mobile-nav').hasClass('open')) {
                $('#mobile-nav').removeClass('open');
            }
        }
    };

    MAIN.listenerMenu = function() {
        $('#mobile-nav').on('click', function(e) {
            $(this).toggleClass('open');

            if ($('#mobile-nav').hasClass('open')) {
                $('#navigation-mobile').slideDown(500, 'easeOutExpo');
            } else {
                $('#navigation-mobile').slideUp(500, 'easeOutExpo');
            }
            e.preventDefault();
        });

        $('#mobile-nav').on('click', function(e) {
            $(this).toggleClass('open');

            if ($('#mobile-nav').hasClass('open')) {
                $('#navigation-mobile').slideDown(500, 'easeOutExpo');
            } else {
                $('#navigation-mobile').slideUp(500, 'easeOutExpo');
            }
            e.preventDefault();
        });

        $('#menu-nav-mobile a').on('click', function() {
            $('#mobile-nav').removeClass('open');
            $('#navigation-mobile').slideUp(350, 'easeOutExpo');
        });
    };

    /* ==================================================
    Animate
    ================================================== */
    MAIN.animate = function() {
        'use strict';
        $('.animated').appear(
            function() {
                var element = $(this),
                    animation = element
                    .data('animation'),
                    animationDelay = element
                    .data('animation-delay');
                if (animationDelay) {

                    setTimeout(function() {
                        element.addClass(animation + " visible");
                    }, animationDelay);

                } else {
                    element.addClass(animation + " visible");
                }
            });
    };

    /* ==================================================
       Slider Options
    ================================================== */

    MAIN.slider = function() {
        $.supersized({
            // Functionality
            slideshow: 1, // Slideshow on/off
            autoplay: 1, // Slideshow starts playing automatically
            start_slide: 1, // Start slide (0 is random)
            stop_loop: 0, // Pauses slideshow on last slide
            random: 0, // Randomize slide order (Ignores start slide)
            slide_interval: 12000, // Length between transitions
            transition: 1, // 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
            transition_speed: 300, // Speed of transition
            new_window: 1, // Image links open in new window/tab
            pause_hover: 0, // Pause slideshow on hover
            keyboard_nav: 1, // Keyboard navigation on/off
            performance: 1, // 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
            image_protect: 1, // Disables image dragging and right click with Javascript

            // Size & Position						   
            min_width: 0, // Min width allowed (in pixels)
            min_height: 0, // Min height allowed (in pixels)
            vertical_center: 1, // Vertically center background
            horizontal_center: 1, // Horizontally center background
            fit_always: 0, // Image will never exceed browser width or height (Ignores min. dimensions)
            fit_portrait: 1, // Portrait images will not exceed browser height
            fit_landscape: 0, // Landscape images will not exceed browser width

            // Components							
            slide_links: 'blank', // Individual links for each slide (Options: false, 'num', 'name', 'blank')
            thumb_links: 0, // Individual thumb links for each slide
            thumbnail_navigation: 0, // Thumbnail navigation
            slides: [ // Slideshow Images
                {
                    image: 'img/slider-images/playing_flor.jpg',
                    thumb: '',
                    url: ''
                }, {
                    image: 'img/slider-images/playing_pablo.jpg',
                    thumb: '',
                    url: ''
                }, {
                    image: 'img/slider-images/playing_seba.jpg',
                    thumb: '',
                    url: ''
                }, {
                    image: 'img/slider-images/playing_cho.jpg',
                    thumb: '',
                    url: ''
                }
            ],

            // Theme Options			   
            progress_bar: 0, // Timer for each slide							
            mouse_scrub: 0

        });

    };


    /* ==================================================
       Navigation Fix
    ================================================== */

    MAIN.nav = function() {
        $('.sticky-nav').waypoint('sticky');
    };

    /* ==================================================
    About Filter
 ================================================== */

    MAIN.aboutFilter = function() {

        var $container = $('.about-filter-container');

        $container.imagesLoaded(function() {
            $container.isotope({
                // options
                animationEngine: 'best-available',
                itemSelector: '.item-thumbs',
                layoutMode: 'masonry',
                filter: '.band'
            });
        });


        // filter items when filter link is clicked
        var $optionSets = $('.about-option-set'),
            $optionLinks = $optionSets.find('a');

        $optionLinks.click(function() {
            var $this = $(this);
            // don't proceed if already active
            if ($this.hasClass('active')) {
                return false;
            }
            var $optionSet = $this.parents('.about-option-set');
            $optionSet.find('.active').removeClass('active');
            $this.addClass('active');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[key] = value;
            if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                // changes in layout modes need extra logic
                changeLayoutMode($this, options);
            } else {
                // otherwise, apply new options
                $container.isotope(options);
            }

            return false;
        });

    };

    /* ==================================================
       Works Filter
    ================================================== */

    MAIN.worksFilter = function() {

        var $container = $('.work-filter-container');

        $container.imagesLoaded(function() {
            $container.isotope({
                // options
                animationEngine: 'best-available',
                itemSelector: '.item-thumbs',
                layoutMode: 'masonry',
                filter: '.disc'
            });
        });


        // filter items when filter link is clicked
        var $optionSets = $('.work-option-set'),
            $optionLinks = $optionSets.find('a');

        $optionLinks.click(function() {
            var $this = $(this);
            // don't proceed if already active
            if ($this.hasClass('active')) {
                return false;
            }
            var $optionSet = $this.parents('.work-option-set');
            $optionSet.find('.active').removeClass('active');
            $this.addClass('active');

            // make option object dynamically, i.e. { filter: '.my-filter-class' }
            var options = {},
                key = $optionSet.attr('data-option-key'),
                value = $this.attr('data-option-value');
            // parse 'false' as false boolean
            value = value === 'false' ? false : value;
            options[key] = value;
            if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                // changes in layout modes need extra logic
                changeLayoutMode($this, options);
            } else {
                // otherwise, apply new options
                $container.isotope(options);
            }

            return false;
        });

    };


    /* ==================================================
       FancyBox
    ================================================== */

    MAIN.fancyBox = function() {
        if ($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0) {

            $(".hover-wrap.fancybox.bancamp").fancybox({
                padding: 0,
                centerOnScroll: true,
                maxWidth: "600px",
                beforeShow: function() {
                    this.title = $(this.element).attr('title');
                    this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
                },
                helpers: {
                    title: {
                        type: 'inside'
                    },
                }
            });

            $('.hover-wrap.fancybox.video').fancybox({
                padding: 0,
                beforeShow: function() {
                    this.title = $(this.element).attr('title');
                    this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
                },
                helpers: {
                    title: {
                        type: 'inside'
                    },
                }
            });

            $('.hover-wrap.fancybox.photo').fancybox({
                openEffect: 'none',
                closeEffect: 'none',
                helpers: {
                    media: {}
                }
            });
        }
    };

    /* ==================================================
    Owl-carousel
 ================================================== */

    MAIN.owlCarousel = function() {
        var owl = $(".owl-carousel");

        owl.owlCarousel({

            items: 3, //10 items above 1000px browser width
            itemsDesktop: [1000, 2], //5 items between 1000px and 901px
            itemsDesktopSmall: [900, 2], // betweem 900px and 601px
            itemsTablet: [700, 1], //2 items between 600 and 0
            pagination: false

        });

        // Custom Navigation Events
        $(".owl.next").click(function() {
            owl.trigger('owl.next');
        });
        $(".owl.prev").click(function() {
            owl.trigger('owl.prev');
        });
    };


    /* ==================================================
       Contact Form
    ================================================== */

    MAIN.contactForm = function() {
        $("#contact-submit").on('click', function() {
            $contact_form = $('#contact-form');

            var fields = $contact_form.serialize();

            $.ajax({
                type: "POST",
                url: "contact/contact.php",
                data: fields,
                dataType: 'json',
                success: function(response) {

                    if (response.status) {
                        $('#contact-form input').val('');
                        $('#contact-form textarea').val('');
                    }

                    $('#response').empty().html(response.html);
                }
            });
            return false;
        });
    };


    /* ==================================================
       Social Wall
    ================================================== */

    MAIN.socialwall = function() {

        $('.socialwall').socialTimeLine({

            //enabled needs to have the same value which occurs in available
            height: 400,
            width: 900,
            available: ['facebook', 'twitter', 'instagram'],
            enabled: 'facebook',
            facebook: {
                account: 'sobreviento',
                token: '123975213079|nqKWO89vVW4QH_bNmKH-Wiy3W0w', //app
                limit: 10,
                disable: ['thumbnail', 'date', 'name']
            },
            twitter: {
                account: 'Sobreviento_sv',
                consumer_key: 'aAgHjWIu5n6zESaUBxGfCIBi9',
                consumer_secret: 'xvg9peYRNcHi7kPUOsurNeb6lkBCqVYSLWw6il9EOJ93JsX7Lu',
                limit: 10,
                disable: ['thumbnail', 'date', 'name']
            },
            instagram: {
                account: 'sobreviento',
                client_id: '8ff3cd78c2e548a8bd85dbe479b8e721',
                disable: ['thumbnail', 'date', 'name'],
                limit: 10
            }
        });

        $(".socialMedia-content-inner").mCustomScrollbar({
            theme: "dark-thin"
        });
    };


    /* ==================================================
       Menu Highlight
    ================================================== */

    MAIN.menu = function() {
        $('#blur-menu, #menu-nav, #menu-nav-mobile').onePageNav({
            currentClass: 'current',
            changeHash: false,
            scrollSpeed: 550,
            scrollOffset: 30,
            scrollThreshold: 0.5,
            easing: 'easeOutExpo',
            filter: ':not(.external)'
        });
    };

    /* ==================================================
       GoUp
    ================================================== */

    MAIN.goUp = function() {
        $('#goUp').on('click', function() {
            $target = $($(this).attr('href')).offset().top - 30;

            $('body, html').animate({
                scrollTop: $target
            }, 750, 'easeOutExpo');
            return false;
        });
    };


    /* ==================================================
    	Scroll to Top
    ================================================== */

    MAIN.scrollToTop = function() {
        var windowWidth = $(window).width(),
            didScroll = false;

        var $arrow = $('#back-to-top');

        $arrow.click(function(e) {
            $('body,html').animate({
                scrollTop: "0"
            }, 750, 'easeOutExpo');
            e.preventDefault();
        });

        $(window).scroll(function() {
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                didScroll = false;

                if ($(window).scrollTop() > 1000) {
                    $arrow.css('display', 'block');
                } else {
                    $arrow.css('display', 'none');
                }
            }
        }, 250);
    };

    /* ==================================================
       Thumbs / Social Effects
    ================================================== */

    MAIN.utils = function() {

        $('.item-thumbs').bind('touchstart', function() {
            $(".active").removeClass("active");
            $(this).addClass('active');
        });

        $('.image-wrap').bind('touchstart', function() {
            $(".active").removeClass("active");
            $(this).addClass('active');
        });

        $('#social ul li').bind('touchstart', function() {
            $(".active").removeClass("active");
            $(this).addClass('active');
        });

    };

    /* ==================================================
       Accordion
    ================================================== */

    MAIN.accordion = function() {
        var accordion_trigger = $('.accordion-heading.accordionize');

        accordion_trigger.delegate('.accordion-toggle', 'click', function(event) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).addClass('inactive');
            } else {
                accordion_trigger.find('.active').addClass('inactive');
                accordion_trigger.find('.active').removeClass('active');
                $(this).removeClass('inactive');
                $(this).addClass('active');
            }
            event.preventDefault();
        });
    };

    /* ==================================================
       Toggle
    ================================================== */

    MAIN.toggle = function() {
        var accordion_trigger_toggle = $('.accordion-heading.togglize');

        accordion_trigger_toggle.delegate('.accordion-toggle', 'click', function(event) {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).addClass('inactive');
            } else {
                $(this).removeClass('inactive');
                $(this).addClass('active');
            }
            event.preventDefault();
        });
    };

    /* ==================================================
       Tooltip
    ================================================== */

    MAIN.toolTip = function() {
        $('a[data-toggle=tooltip]').tooltip();
    };


    /* ==================================================
    Modernizr
    ================================================== */

    MAIN.modernizr = function() {
        Modernizr.load([{
            test: Modernizr.placeholder,
            nope: 'js/placeholder.js',
            complete: function() {
                if (!Modernizr.placeholder) {
                    Placeholders.init({
                        live: true,
                        hideOnFocus: false,
                        className: "yourClass",
                        textColor: "#999"
                    });
                }
            }
        }]);
    };

    /* ==================================================
    JpreLoader
    ================================================== */

    MAIN.jpreLoader = function() {
        $('body').jpreLoader({
            splashID: "#jSplash",
            showSplash: true,
            showPercentage: false,
            autoClose: true
        });
    };


    /* ==================================================
    	Init
    ================================================== */

    MAIN.slider();

    $(document).ready(function() {

        MAIN.modernizr();
        MAIN.jpreLoader();
        MAIN.nav();
        MAIN.mobileNav();
        MAIN.animate();
        MAIN.listenerMenu();
        MAIN.menu();
        MAIN.goUp();
        MAIN.aboutFilter();
        MAIN.worksFilter();
        MAIN.fancyBox();
        MAIN.owlCarousel();
        MAIN.contactForm();
        MAIN.socialwall();
        MAIN.scrollToTop();
        MAIN.utils();
        MAIN.accordion();
        MAIN.toggle();
        MAIN.toolTip();

    });

    $(window).resize(function() {
        MAIN.mobileNav();
    });

});