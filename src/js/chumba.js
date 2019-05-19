//START UTILITIES///////////////////////////////////////////////////////////////
function getCookieObject(cookieName) {
  const pattern = RegExp(cookieName + "=.[^;]*");
  const matched = document.cookie.match(pattern);
  if (matched) {
    var cookie = matched[0].split('=')
    return (JSON.parse(decodeURIComponent(cookie[1])));
  }
  return '';
}

function setCookie(name, value, days, hours = 1, mins = 1, seconds = 1) {
  var date = new Date();
  date.setTime(date.getTime() + ((days * 24) * (60 * hours) * (60 * mins) * (1000 * seconds)));
  var expires = " expires=" + date.toGMTString();
  document.cookie =
    name + '=' + value + '; Path=/; ' + expires;
}

//Sets the value of the cookie to expire so it will be deleted.
function deleteCookie(name) {
  document.cookie =
    name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//currently mutating state @todo fix
function appendAll(params, paramsToAppend) {
  for (var pair of paramsToAppend.entries()) {
    params.set(pair[0], pair[1]);
  }
}
//END UTILITIES///////////////////////////////////////////////////////////////

//START UTM_PARAMS///////////////////////////////////////////////////////////////
function configureUTMParams() {
  const cookieURLSearchParams = getUTMCookieSearchParams();
  appendCookieParamOnHrefUTMLinks(cookieURLSearchParams);
  adjustWindowStateFromCookieObject(cookieURLSearchParams);
}

function getUTMCookieSearchParams() {
  let cookie = getCookieObject(getQueryCookieName());
  if (cookie == "" && window.location.search) {
    var params = [...new URLSearchParams(window.location.search).entries()].reduce((prev, [key, val]) => {
      prev[key] = val;
      return prev
    }, {})
    const stringified = JSON.stringify(params);
    setCookie(getQueryCookieName(), encodeURIComponent(stringified), 1);
    cookie = getCookieObject(getQueryCookieName());
  }
  return new URLSearchParams(cookie);
}

function appendCookieParamOnHrefUTMLinks(cookieURLSearchParams) {
  $('a.trackingLink').each(function () {
    const existingHref = $(this).attr('href');
    if (existingHref) {
      const split = existingHref.split('?');
      const hrefParams = split[1];
      const originalLocation = split[0];
      let appendedParams = hrefParams ? new URLSearchParams(hrefParams) : new URLSearchParams();
      appendAll(appendedParams, cookieURLSearchParams);
      const newHref = originalLocation + (appendedParams.toString().length > 0 ? "?" + appendedParams.toString() : "");
      $(this).attr('href', newHref);
    }
  });
}

function adjustWindowStateFromCookieObject(cookieURLSearchParams) {
  let slimBrowserParams = new URLSearchParams();
  appendAll(slimBrowserParams, cookieURLSearchParams);
  if (Array.from(slimBrowserParams).length > 0) {
    history.replaceState({
        id: '',
      },
      '',
      '?' + slimBrowserParams.toString()
    );
  }
}

function getQueryCookieName() {
  return 'query_cookie';
}

$('.trackingLink').on('click', function (event) {
  deleteCookie(getQueryCookieName());
});
//END UTM_PARAMS///////////////////////////////////////////////////////////////

(function ($) {
  'use strict'; // Start of use strict
  $(document).ready(function () {
    configureUTMParams();

    $('.lds-ellipsis').fadeOut();
    $('.loader')
      .delay(350)
      .fadeOut('slow');
    $('.copyright-date').html(new Date().getFullYear());
  });

  $(':file').filestyle({
    buttonBefore: true,
    size: 'md'
  });

  var carouselTime = 250;
  var current = 0;
  $($('.hero-game-content')[0]).addClass('active');
  $('#hero-games').on('slide.bs.carousel', function (data) {
    var from = $('.hero-game-content[data-content=' + data.from + ']').data(
      'content'
    );
    var to = $('.hero-game-content[data-content=' + data.to + ']').data(
      'content'
    );

    $($('.hero-game-content')[from]).removeClass('active');
    $($('.hero-game-content')[to]).addClass('active');
  });



  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, '') ==
      this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - 70,
          },
          1000,
          'easeInOutExpo'
        );
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80,
  });

  // Collapse Navbar
  var navbarCollapse = function () {
    if ($('#mainNav').offset().top > 100) {
      $('#mainNav').addClass('navbar-shrink');
    } else {
      $('#mainNav').removeClass('navbar-shrink');
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Floating label headings for the contact form
  $(function () {
    $('body')
      .on('input propertychange', '.floating-label-form-group', function (e) {
        $(this).toggleClass(
          'floating-label-form-group-with-value',
          !!$(e.target).val()
        );
      })
      .on('focus', '.floating-label-form-group', function () {
        $(this).addClass('floating-label-form-group-with-focus');
      })
      .on('blur', '.floating-label-form-group', function () {
        $(this).removeClass('floating-label-form-group-with-focus');
      });
  });

  var chumbaServerLink = window.chumbaServerLink;
})(jQuery); // End of use strict