(function($) {


  (function(a) {
    (jQuery.browser = jQuery.browser || {})
    .mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
  })(navigator.userAgent || navigator.vendor || window.opera);


  var hite = $('.start-scene')
    .outerHeight();

  if (!$.browser.mobile) {

    var controller = new ScrollMagic.Controller({
      globalSceneOptions: {
        triggerHook: 'onLeave',
      }
    });
    //pin the navigation
    var pin = new ScrollMagic.Scene({
        triggerElement: '.start-scene',
        offset: '-100px',
        duration: '0',
        duration: hite - 530
      })
      .setPin('#map', { pushFollowers: false })
      .addTo(controller);

  }

  if (listings.length > 0) {
    initMap();
  }

  if (singleProp) {
    propMap();
  }

  var map;


  // Initialize and add the map
  function propMap() {
    console.log('map fired')
    console.log(singleProp)
    var smap = new google.maps.Map(
      document.getElementById('propMap'), { zoom: 15, center: singleProp });
    var marker = new google.maps.Marker({ position: singleProp, map: smap });
  }

  function initMap() {


    var contentString = function(data) {


      var template = '<div id="infoBox">' +
        '<a href="' + data.url + '">' +
        '<div id="img-wrap">' +
        '<img src="' + data.img + '">' +
        '</div>' +
        '<div id="bodyContent">' +
        '<h4 id="firstHeading" class="firstHeading">' + data.title + '</h4>' +
        '<div class="unit-price">' +
        '<span class="price">$' + data.price + ' per tenant</span>' +
        '</div>' +
        '<div class="unit-details">' +
        '<span class="bed">' + data.bed + '<i class="icon-bed"></i></span> ' +
        '<span class="bath">' + data.bath + '<i class="icon-bath"></i></span>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</div>';

      return template;
    }


    console.log('map fired')
    // Map
    map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 12
    });

    var center = new google.maps.LatLng(36.8843217, -76.3080673);

    // Odu Placement
    var oduCoords = [
    new google.maps.LatLng(36.881315, -76.302162),
      new google.maps.LatLng(36.881453, -76.298171),
      new google.maps.LatLng(36.885229, -76.298385),
      new google.maps.LatLng(36.888009, -76.29787),
      new google.maps.LatLng(36.887837, -76.302548),
      new google.maps.LatLng(36.89151, -76.304093),
      new google.maps.LatLng(36.892025, -76.30405),
      new google.maps.LatLng(36.892025, -76.305123),
      new google.maps.LatLng(36.890446, -76.305037),
      new google.maps.LatLng(36.888627, -76.306239),
      new google.maps.LatLng(36.8877, -76.306153),
      new google.maps.LatLng(36.887391, -76.316195),
      new google.maps.LatLng(36.88135, -76.316024),
      new google.maps.LatLng(36.880801, -76.314221),
      new google.maps.LatLng(36.879393, -76.312977),
      new google.maps.LatLng(36.879393, -76.312333),
      new google.maps.LatLng(36.883135, -76.312633),
      new google.maps.LatLng(36.883409, -76.302291),

        ];


    // Odu Style
    var oduMap = new google.maps.Polygon({
      paths: oduCoords,
      strokeColor: '#003768',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#003768',
      fillOpacity: 0.35
    });
    // Odu Image  
    var oduImage = localInfo.template_directory + 'img/odu.png';
    oduMap.setMap(map);

    //create empty LatLngBounds object
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      position: center,
      icon: oduImage,
      map: map
    });

    var markers = [];
    // foreach property listing
    for (i = 0; i < listings.length; i++) {

      var marker = new google.maps.Marker({
        position: listings[i].pos,
        map: map,
        title: listings[i].title,
        img: listings[i].img,
        bed: listings[i].bed,
        bath: listings[i].bath,
        price: listings[i].price,
        id: listings[i].id,
        animation: google.maps.Animation.DROP
      });

      bounds.extend(marker.position);


      (function(marker, i) {
        // add click event

        google.maps.event.addListener(marker, 'click', function() {
          infowindow = new google.maps.InfoWindow({
            content: contentString(listings[i])
          });
          // hideAllInfoWindows(map);
          infowindow.open(map, marker);
        });


      })(marker, i);


      markers.push(marker);

    } // end foreach  

    function hideAllInfoWindows(map) {
      markers.forEach(function(marker) {
        marker.infowindow.close(map, marker);
      });
    }

    $('.card-property')
      .hover(
        function() {
          var t = $(this);
          var id = t.data("id");
          google.maps.event.trigger(markers[id], 'click');
          console.log(id);
        },
        function() {
          var t = $(this);
          var id = t.data("id");
          infowindow.close(map, markers[id]);

        }
      );


    google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
      this.setZoom(map.getZoom());

      if (this.getZoom() > 15) {
        this.setZoom(15);
      }
    });
    map.fitBounds(bounds);
  }


})(jQuery);
