$(document).ready(function () {

  $('#header').on('click', 'a.nav-link', function (e) {
    e.preventDefault();
    var _url = $(this).attr('href');
    var targetOffset = $(_url).offset().top - $('#header').outerHeight() + 10;
    $('html,body').animate({ scrollTop: targetOffset }, 1000);
  });

  $(document).on('click', '.btn-add', function (e) {
    e.preventDefault();
    var item = $("<div class='guest form-row px-3 pb-3 pt-4 mt-2 align-items-center'>\
                <div class='form-group col-6 col-sm-6 mb-1'>\
                  <input type='text' class='form-control rounded-0 property required' placeholder='Nombre Acompañante*'>\
                </div>\
                <div class='form-group col-6 col-sm-6 mb-1'>\
                  <input type='text' class='form-control rounded-0 property required' placeholder='Apellidos Acompañante*'>\
                </div>\
                <i class='fa fa-times btn-remove' aria-hidden='true'></i>\
                <div class='col-12 col-sm-6 mb-0'>\
                  <div class='form-check text-left'>\
                    <input class='form-check-input property' type='checkbox' value='' id='defaultCheck1'>\
                      <label class='form-check-label' for='defaultCheck1'>Servicio de traslado en autobús</label>\
                        </div>\
                  </div>\
                </div>").hide();

    $('#guests').append(item);
    item.show('slow');
  });
  
  $(document).on('click', '.btn-remove', function (e) {
    e.preventDefault();
    $(this).closest('.guest').remove();
    return false;
  });
});
