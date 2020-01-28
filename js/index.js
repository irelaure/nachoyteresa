$(document).ready(function () {

  $('header').on('click', 'a.nav-link, a.dropdown-item', function (e) {
    e.preventDefault();
    var _url = $(this).attr('href');
    console.log(_url);
    var targetOffset = $(_url).offset().top - $('header').outerHeight() + 10;
    $('html,body').animate({ scrollTop: targetOffset }, 1000);
  });

});

$(function () {
  $(document).on('click', '.btn-add', function (e) {
    e.preventDefault();

    var controlForm = $('.controls form:first'),
      currentEntry = $(this).parents('.entry:first'),
      newEntry = $(currentEntry.clone()).appendTo(controlForm);

    newEntry.find('input').val('');
    controlForm.find('.entry:not(:last) .btn-add')
      .removeClass('btn-add').addClass('btn-remove')
      .removeClass('btn-success').addClass('btn-danger')
      .html('<span class="glyphicon glyphicon-minus"></span>');
  }).on('click', '.btn-remove', function (e) {
    $(this).parents('.entry:first').remove();

    e.preventDefault();
    return false;
  });
});
