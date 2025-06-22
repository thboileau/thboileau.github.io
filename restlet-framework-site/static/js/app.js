var RESTLET = window.RESTLET || {};
var RESTLET = (function ($) {
  return {
    base : {
      //initialize base object @function init
      init : function () {

      },
    }
  }
})(jQuery);

$(document).ready(function () {
  RESTLET.base.init();
});


/***************************
 event handlers
 ****************************/

$(function () {

  // Mobi nav trigger
  $('#j-navigation-trigger').on('click', function () {
    $(this).toggleClass('collapse');
  });

  function mobiNav() {
    if ($(window).width() <= 992) {
      $('.navigation__link').on('click', function (e) {
        if ($(this).siblings().length) {
          $(this).siblings().toggle();
          e.preventDefault();
        }
      });
    }
  }

  mobiNav();

  // Window resize events
  $(window).on('resize', function () {
    $('#j-navigation-trigger').removeClass('collapse');

    if ($(window).width() <= 992) {
      mobiNav();
    }
  });

  // SVG Generator
  if($('img.svg').length){
    $('img.svg').each(function(){
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
        // Get the SVG tag, ignore the rest
        var $svg = $(data).find('svg');

        // Add replaced image's classes to the new SVG
        if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');

    });
  }

  // Documentation sidebar submenu click handler
  //when a group is shown, save it as the active accordion group
  if ($('.documentation-sidebar #accordion').length) {
    $('a[class="active"]').closest('ul').parents('ul').addClass('in');
    $('a[class="active"]').closest('ul').addClass('in');
  }

  // Documentation sidebar affix
  if ($('.documentation-sidebar').length) {
    $('.documentation-sidebar').affix({
      offset: {
        top: 70,
        bottom: function () {
          return (this.bottom = $('footer').outerHeight(true) + 50)
        }
      }
    });
  }

  if ($('.documentation-wrapper .inner-nav').length) {
    $('.documentation-wrapper .inner-nav').affix({
      offset: {
        top: 155,
        bottom: function () {
          return (this.bottom = $('footer').outerHeight(true) + 100)
        }
      }
    });
  }

  // Fix affix scrolling when .documentation-content is shorter than .inner-nav
  if ( $('.documentation-content').outerHeight() < $('.inner-nav').outerHeight() ) {
    $('.documentation-content').css('height', '2610');
  }

  // Anchor link scroll to section
  if (window.location.hash) {
    var target = $(window.location.hash);

    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 190
      }, 1000);
      return false;
    }
  }

});
