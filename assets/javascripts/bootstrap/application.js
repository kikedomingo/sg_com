$(document).ready(function() {

    // TOGGLE NAVIGATION IN RESPONSIVE
    $("#togglenav").click(function () {
        $('#nav').toggleClass('appear');
        $('input[type="text"]').focus();
    });

    // REMOVES THE CLASS .in IN THE BRANDS OF THE FOOTER SO THE TOGGLE WORKS CORRECTLY
    if ($("#togglenav").is(":visible")) {
       $('#brands .collapse').removeClass('in');
    }


    // OPEN AND CLOSE + scroll
    var clickhandlers = [
        // on first click, open section
        function(e) {
            e.preventDefault();
           

            var target = $(e.target).attr('href');
            var form = target.replace('#', '');

            $(this).addClass('active');
            $(".side_nav").addClass('single');
            $(target).slideToggle( "slow" , function() {
                
            });          

            var offset;
            var speed;
            var scrollTarget;
            if ($("#togglenav").is(":visible")) {
                offset = -45;
                speed = 600;
                scrollTarget = $('#sidenavigation_wrapper');
            } else {
                offset = -80;
                speed = 600;
                scrollTarget = $(target);
            }

            var top = scrollTarget.position().top + offset;
            $('html, body').animate({scrollTop: top}, speed, 'swing');
            
            
            $('.insert_form[data-form=' + form + ']').show();
            
        },
        // on second click, close section
        function(f) {
            f.preventDefault();
            

            var target = f.target.getAttribute('href');
            var form = target.replace('#', '');
            var self = this;

            var offset;
            var speed;
            var scrollTarget;
            offset = 0;
            speed = 600;
            scrollTarget = $('#topbar');
            
            var top = scrollTarget.position().top;
            $('html, body').animate({scrollTop: top}, speed, 'swing');
            
            
            $(target).slideToggle( "slow" );
            $('.insert_form[data-form=' + form + ']').slideToggle();
            window.setTimeout(removeSingle, 500);            
            
            function removeSingle(){
                
                $(".side_nav").removeClass('single');               
                $(self).removeClass('active');
            };
       }
    ];
    
            
    var clickcounter = 0;
    $(".side_nav li").click(function() {
        // call the appropriate function preserving this and any arguments
        clickhandlers[clickcounter++].apply(this, Array.prototype.slice.apply(arguments));
        // "wrap around" when all clickhandlers have been called
        clickcounter %= clickhandlers.length;
    });


    // MORE INFO CAROUSEL 
    $(".hero a.opens-more").click(function(e) {
        e.preventDefault();
        var destination = e.target.getAttribute('href');
        var moreinfo = destination.replace('#', '');
        
        $('.boxed-cover-inside').addClass('info');
        $(this).parent().fadeOut();
        $('.hero.caption-more[data-info=' + moreinfo + ']').delay( 200 ).fadeIn();
        
        $('.carousel').carousel('pause');
    });

    // closes everything for the next slide on X click
    $(".close-caption-more").click(function(e) {
        e.preventDefault();
        returnToOriginal();
    });

    // closes everything for the next slide on indicators click
    $(".carousel-indicators li").click(function(e) {
        e.preventDefault();
        returnToOriginal();
    });


    var header = $("header");
    var side_nav = $(".side_nav");
    var strapline = $("#strapline");

    $(window).scroll(function() { KikeParallax() });

    function KikeParallax() {

        // opacity for the carousel captions (but not on smartphones)
        if ($("#togglenav").is(":hidden")) {
            scrollPos = $(this).scrollTop();
            $('.fadeonscroll').css({
                'opacity': 1-(scrollPos/180)
            });
        };

        
        var scroll = $(window).scrollTop();

        // CHANGE strapline APPEARANCE ON SCROLL
        // but only desktop
        if ($("#togglenav").is(":hidden")) {
            if (scroll >= 30) {
                strapline.addClass("remove");
                header.addClass("addbg");
            } else {
                strapline.removeClass("remove");
                header.removeClass("addbg");
            }

        };


        // AFFIX the navigation
        if (scroll < 171) {
            side_nav.removeClass("deattach");
            side_nav.removeClass("deattach_bottom");
        } else if (scroll >= 171 && scroll <= 580) {
            side_nav.addClass("deattach");
            side_nav.removeClass("deattach_bottom");
        } else if (scroll > 580) {
            side_nav.addClass("deattach_bottom");
            side_nav.removeClass("deattach");
        } else {
            side_nav.removeClass("deattach");
            side_nav.removeClass("deattach_bottom");
        }


    };
});


// ACTIVATING PARALLAX

$(function () {
    if ($("#togglenav").is(":hidden")) {
        $(".parallax").parallax({speed:-2});
    };
});




// PARALLAX
(function($) {

    $.parallax = function(element, options) {

        var defaults = {
            speed: 10
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),
             element = element,
             $win = $(window);

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
                                   
            $element.css({
                'background-position-y': -$win.scrollTop() / plugin.settings.speed
            });

            $win.scroll(function() {
                $element.css({
                    'background-position-y': -$win.scrollTop() / plugin.settings.speed
                });
            })
        }

        plugin.init();

    }

    $.fn.parallax = function(options) {

        return this.each(function() {
            if (undefined == $(this).data('parallax')) {
                var plugin = new $.parallax(this, options);
                $(this).data('parallax', plugin);
            }
        });

    }

})(jQuery);



// Functions for the sections opening and closing

function returnToOriginal() {
    // resume carousel
    $('.carousel').carousel('cycle');
    delayedslideCloseMoreInfo();
    $('.hero.caption-more').fadeOut();
    $('.hero.caption-simple').fadeIn();
}


var timeoutID;

function delayedslideCloseMoreInfo() {
    timeoutID = window.setTimeout(slideCloseMoreInfo, 250);
}

function slideCloseMoreInfo() {
    $('.boxed-cover-inside').removeClass('info');
}


// FOCUS ON THE BEGINNING FOR MOBILE ---
function moveCaretToStart(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = 0;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(true);
        range.select();
    }
}
