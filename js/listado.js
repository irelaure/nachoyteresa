$(document).ready(function () {

  $.ajax({
    url: 'https://nachoyteresa-f82bd.firebaseio.com/rsvp.json?auth=qSVTlCu91v6Z0luFKkraXyqIvzVn7Z2piRhJY66J',
    success: function (respuesta) {

      var _content = '';
      var _review = { 'confirms': 0, 'total': 0, 'bussi': 0 };

      $.each(respuesta, function( index, guest ) {

        if (guest['partners']) { var _count_partners = guest['partners'].length; }
        else { var _count_partners = 0; }
        if (guest['autobus']) { var guest_bus = 'Bus sí'; _review['bussi']++; }
        else { var guest_bus = 'Bus no'; }
        if (guest['alergies']) { var guest_alergies = guest['alergies']; }
        else { var guest_alergies = 'Sin alergias'; }
        
        _review['confirms'] += 1;
        _review['total'] += 1 + _count_partners;
        _content += '<div class="card my-3 asistente">\
                      <h5 class="card-header">\
                        <div class="row">\
                          <div class="col-4">' + guest['surname'] + ', ' + guest['name'] + '</div>\
                          <div class="col-4 text-center">' + guest['phone'] + '</div>\
                          <div class="col-4 text-center">' + _count_partners + ' inv. <i class="fa fa-plus see" aria-hidden="true"></i></div>\
                        </div>\
                      </h5>\
                      <div class="card-body">\
                        <h5 class="card-title">guidoperalta26@gmail.com</h5>\
                        <h5 class="card-title">' + guest_bus + '</h5>\
                        <p class="card-text"><strong>ALERGIAS:</strong></p>\
                        <p class="card-text ml-3">' + guest_alergies + '</p>\
                        <p class="card-text"><strong>INVITADOS:</strong></p>';

        if (guest['partners']) {
          $.each(guest['partners'], function (index, partner) {

            if (partner['autobus']) { var partner_bus = 'Bus sí'; _review['bussi']++; }
            else { var partner_bus = 'Bus no'; }
            if (partner['alergies']) { var partner_alergies = partner['alergies']; }
            else { var partner_alergies = 'Sin alergias'; }

            _content += '<p class="invitado ml-3 my-2">\
                          - ' + partner['surname'] + ', ' + partner['name'] + '\
                          / ' + partner_alergies + ' / ' + partner_bus + '</p>';
          });
        } else { _content += '<p class="invitado ml-3 my-2">- Sin invitados'; }
        
        _content += '   <div class="text-right"><a href="#" class="btn btn-danger">Eliminar</a></div>\
                      </div>\
                    </div>';
      });

      var _content_table = '<div class="row align-items-center">\
                              <div class="col-12 col-sm-6">\
                                <h1 class="text-center">Listado de asistentes</h1>\
                              </div>\
                              <div class="col-12 col-sm-6">\
                                <table class="table w-100">\
                                  <tr>\
                                    <th class="text-center">Asistentes</th>\
                                    <th class="text-center">Asis. + Invitados</th>\
                                    <th class="text-center">Bus sí</th>\
                                  </tr>\
                                  <tr>\
                                    <td class="text-center">' + _review['confirms'] + '</td>\
                                    <td class="text-center">' + _review['total'] + '</td>\
                                    <td class="text-center">' + _review['bussi'] + '</td>\
                                  </tr>\
                                </table >\
                              </div>\
                            </div>';

      $('#tablasistentes .container').html(_content_table + _content);
    },
    error: function () {
      console.log("No se ha podido obtener la información");
    }
  });

  $('#tablasistentes').on('click', '.see', function() {
    
    if($(this).hasClass('clicked')) {
      $('#tablasistentes .card-body').removeClass('show');
      $('#tablasistentes .see').removeClass('clicked');
    } else {
      $('#tablasistentes .card-body').removeClass('show');
      $('#tablasistentes .see').removeClass('clicked');
      var _box = $(this).closest('.asistente');
      _box.find('.card-body').addClass('show');
      $(this).addClass('clicked');
    }
  });

});
