$(document).ready(function () {

  $('header').on('click', 'a.nav-link, a.dropdown-item', function (e) {
    e.preventDefault();
    var _url = $(this).attr('href');
    console.log(_url);
    var targetOffset = $(_url).offset().top - $('header').outerHeight() + 10;
    $('html,body').animate({ scrollTop: targetOffset }, 1000);
  });

});