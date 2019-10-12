var navbar_toggle = document.getElementsByClassName('navbar-toggle')[0];
var menu = document.getElementById('menu');

if (navbar_toggle) {
    navbar_toggle.addEventListener('click', function() {
        menu.classList.toggle('collapse');
    });
}
/* (function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 100
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 50
        }
    })

    $("[data-fancybox]").fancybox({
        // Options will go here
    });

})(jQuery); // End of use strict
 */