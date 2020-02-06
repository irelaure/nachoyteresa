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
                      <input type='text' class='form-control rounded-0 property required' name='name' placeholder='Nombre Acompañante*'>\
                    </div>\
                    <div class='form-group col-6 col-sm-6 mb-1'>\
                      <input type='text' class='form-control rounded-0 property required' name='surname' placeholder='Apellidos Acompañante*'>\
                    </div>\
                    <i class='fa fa-times btn-remove' aria-hidden='true'></i>\
                    <div class='col-12 col-sm-6 mb-0'>\
                      <div class='form-check text-left'>\
                        <input class='form-check-input property' type='checkbox' value='' name='autobus' id='defaultCheck1'>\
                        <label class='form-check-label' for='defaultCheck1'>Servicio de traslado en autobús</label>\
                      </div>\
                    </div>\
                    <div class='form-group col-12'>\
                      <label for='textAlergias'>Escríbenos aquí si tienes alguna alergia o necesidad de un menú especial</label>\
                      <textarea class='form-control rounded-0' id='textAlergias' name='alergies'></textarea>\
                    </div>").hide();

    $('#guests').append(item);
    item.show('slow');
  });
  
  $(document).on('click', '.btn-remove', function (e) {
    e.preventDefault();
    $(this).closest('.guest').remove();
    return false;
  });

  $.fn.getObject = function () {

    var _object = {},
        _ok = true,
        caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    $(this).find('.property').each(function () {

      if ($(this).is('div'))
        return;

      var _name = $(this).attr('name'),
        _value = $(this).val();

      if ($(this).attr('type') == 'checkbox') { var _box = $(this).closest('.form-check'); }
      else { var _box = $(this).closest('.form-group'); }

      _box.removeClass('has-error');

      if ($(this).attr('type') == 'checkbox')
        _value = $(this).is(':checked') ? 1 : 0;

      if ($(this).attr('type') == 'radio')
        _value = $(this).is(':checked') ? $(this).val() : null;

      if ($(this).attr('type') == 'email') // if(!caract.test(_value) || _value.replace(" ", "")=="") 
        if (_value.replace(" ", "") == "")
          _value = null;

      if ($(this).is('.required')) {
        if (!(_value && ($.trim(_value) !== ''))) {
          _ok = false;
          _box.addClass('has-error');
        }
      }

      if (_ok)
        _object[_name] = _value;
    });

    return _ok ? _object : false;
  }

  $('#send').on('click', function (e) {
    
    try {
      
      e.preventDefault();
      var primary_guest = $('#primary_guest').getObject();
      if (!primary_guest )
        throw "Rellene los campos obligatorios";

      var guests = new Array();
      $('#guests').find('.guest').each(function () {
        var guest = $(this).getObject();
        if (!guest)
          throw "Rellene los campos obligatorios";
        guests.push(guest);
      });

      primary_guest['partners'] = guests;
      console.log(primary_guest);

      $.ajax({
        url: "https://nachoyteresa-f82bd.firebaseio.com/rsvp.json?auth=qSVTlCu91v6Z0luFKkraXyqIvzVn7Z2piRhJY66J",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(primary_guest),
        success: function (data) {
          $(this).html('Enviado');
          console.log(data);
        },
        error: function () {
          alert("Cannot get data");
        }
      });
    } catch (err) {
      alert(err);
      $(this).html('Reintentar');
    }
  });
});
