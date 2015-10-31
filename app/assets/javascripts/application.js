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
  $(document).on('click', '#search', function(event) {
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

          initResultsMap(results);
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
  });

  function initResultsMap(results) {
    GMapz.pins = {
      'default': {
        pin: {
          img: 'assets/gmapz/pin-cluster.png',
          size: [48.0, 48.0],
          anchor: [24.0, 48.0]
        }
      }
    };

    var results_map_options = {
      mapTypeId: 'ROADMAP',
      center: [results[0]['lat'], results[0]['lng']],
      zoom: 14
    };

    results_map = new GMapz.map(
      $('#results-map'),
      results_map_options,
      results
    );

    var marker_cluster_style = [{
      textColor: 'white',
      url: 'assets/gmapz/pin-cluster.png',
      height: 48,
      width: 48,
      textSize: '17',
      backgroundPosition: '0 0'
    }];

    results_map.onReady = function() {
      markers_array = $.map(this.markers, function(val, idx){
        return [val];
      });
      this.marker_cluster = new MarkerClusterer(
        this.map,
        markers_array, {
          gridSize: 100,
          maxZoom: 15,
          styles: marker_cluster_style
        }
      );
    };
  }
});
