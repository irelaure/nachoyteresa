$(document).ready(function () {

  $.ajax({
    url: 'https://nachoyteresa-f82bd.firebaseio.com/rsvp.json?auth=qSVTlCu91v6Z0luFKkraXyqIvzVn7Z2piRhJY66J',
    success: function (respuesta) {

      var _review = getInfoPeople(respuesta);
      paintHeader(_review);

      var invitees = Object.values(respuesta);
      var partners = Object.values(respuesta).filter(g => g.partners).map(g => g.partners).flat();
      var everybody = invitees.concat(partners);
      
      paintTableSections(respuesta, _review);
      //paintTableTotal(everybody);
    },
    error: function () {
      console.log("No se ha podido obtener la información");
    }
  });

  $('#table').on('click', '.see', function () {

    if ($(this).hasClass('clicked')) {
      $('#table .card-body').removeClass('show');
      $('#table .see').removeClass('clicked');
    } else {
      $('#table .card-body').removeClass('show');
      $('#table .see').removeClass('clicked');
      var _box = $(this).closest('.asistente');
      _box.find('.card-body').addClass('show');
      $(this).addClass('clicked');
    }
  });

});

function getInfoPeople(respuesta) {

  var _review = { 'confirms': 0, 'total': 0, 'bussi': 0, 'alergies': 0 };

  _review['confirms'] = Object.keys(respuesta).length;
  _review['total'] = _review['confirms'] + Object.values(respuesta).filter(g => g.partners).map(g => g.partners.length).reduce((a, b) => a + b, 0);

  alergies_tmp = Object.values(respuesta).filter(g => g.alergies).length;
  _review['alergies'] = alergies_tmp + Object.values(respuesta).filter(g => g.partners).map(g => g.partners).flat().filter(g => g.alergies).length;

  bussi_tmp = Object.values(respuesta).filter(g => g.autobus).length;
  _review['bussi'] = bussi_tmp + Object.values(respuesta).filter(g => g.partners).map(g => g.partners).flat().filter(g => g.autobus).length;

  return _review;

}
function paintHeader(_review) {
  var _content_table = '<div class="row align-items-center">\
  <div class="col-12 col-sm-6">\
    <h1 class="text-center">Listado de asistentes</h1>\
  </div>\
  <div class="col-12 col-sm-6">\
    <table class="table w-100">\
      <tr>\
        <th id="asistentes" class="text-center">Asistentes</th>\
        <th id="totales" class="text-center">Asis. + Invitados</th>\
        <th id="bus" class="text-center">Bus sí</th>\
        <th id="alergieas" class="text-center">Alergias</th>\
      </tr>\
      <tr>\
        <td class="text-center">' + _review['confirms'] + '</td>\
        <td class="text-center">' + _review['total'] + '</td>\
        <td class="text-center">' + _review['bussi'] + '</td>\
        <td class="text-center">' + _review['alergies'] + '</td>\
      </tr>\
    </table >\
  </div>\
</div>';

  $('#tablasistentes .container').html(_content_table);
}

function paintTableSections(respuesta, _review) {

  var _content = '';
  $.each(respuesta, function (index, guest) {

    _count_partners = guest['partners'] ? guest['partners'].length : 0;
    guest_bus = guest['autobus'] ? 'Bus sí' : 'Bus no';
    guest_alergies = guest['alergies'] ? guest['alergies'] : 'Sin alergias';
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
        partner_bus = partner['autobus'] ? 'Bus sí' : 'Bus no';
        partner_alergies = partner['alergies'] ? partner['alergies'] : 'Sin alergias';
        _content += '<p class="invitado ml-3 my-2">\
                      - ' + partner['surname'] + ', ' + partner['name'] + '\
                      / ' + partner_alergies + ' / ' + partner_bus + '</p>';
      });
    } else {
      _content += '<p class="invitado ml-3 my-2">- Sin invitados';
    }
    _content += '   <div class="text-right"><a href="#" class="btn btn-danger">Eliminar</a></div>\
                  </div>\
                </div>';
  });
  
  $('#table ').html(_content);
}

function paintTableTotal(everybody) {
  $('#table').bootstrapTable({
    columns: [{
      field: 'name',
      title: 'Nombre'
    }, {
      field: 'surname',
      title: 'Apellidos'
    },
    {
      field: 'email',
      title: 'Correo electrónico'
    },
    {
      field: 'phone',
      title: 'Teléfono'
    },
    {
      field: 'alergies',
      title: 'Alergias'
    },
    {
      field: 'autobus',
      title: 'Autobús'
    }],
    data: everybody
  });
}
