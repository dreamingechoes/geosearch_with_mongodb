// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require gmapz_rails
//= require_tree .

$(document).ready(function(){

  function ask_for_shops() {
    $.ajax({
      url: '/search_shops',
      type: 'json',
      method: 'get',
      data: { query: $('#address').val(), distance: $('#distance').val(), limit: $('#limit').val() },
      success: function(data) {
        if(data['response'].length == 0) {
          $('#bs-callout-error').removeClass('hide');
          $('#message-error').html('No shops found with the data of the request. Try again with other address. Clue: try "Calle Uria, Oviedo"');
        } else {
          var results = {};
          var i = 0;
          $('#bs-callout-error').addClass('hide');
          $.each(data['response'], function(index, element) {
            results[i] = { lat: element.coordinates[1],
                           lng: element.coordinates[0],
                           iw: element.description };
            i += 1;
          });
          results_map.addLocations(results).centerToMarker(0, 14);
          $('#distance').val('');
          $('#limit').val('');
          $('#address').val('');
        }
      },
      error: function() {
        $('#bs-callout-error').removeClass('hide');
        $('#message-error').html('There has been some error to process the request. Please complete all data.');
      }
    });
  }

  GMapz.debug = true;
  
  GMapz.pins = {
    'default': {
      pin: {
        img: 'http://maps.google.com/mapfiles/ms/micons/purple.png',
        size: [32.0, 32.0],
        anchor: [16.0, 32.0]
      }
    }
  };

  var results_map_options = {
    mapTypeId: 'ROADMAP',
    center: [40.337977, -3.709757],
    zoom: 5
  };

  var marker_cluster_style = [{
    textColor: 'white',
    url: 'http://maps.google.com/mapfiles/ms/micons/purple.png',
    height: 32,
    width: 32,
    textSize: '12',
    backgroundPosition: '0 0'
  }];

  var results_map = new GMapz.map(
    $('#results-map'),
    results_map_options
  );

  results_map.onReady = function() {
    $(document).on('click', '#search', function(event) {
      ask_for_shops();
    });

    markers_array = $.map(this.markers, function(val, idx){
      return [val];
    });
  };

});
