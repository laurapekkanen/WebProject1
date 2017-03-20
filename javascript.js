//document ready

$(function() {
$("#trump").click(function(e) {
        $("#content").load("pages/popup1.html");
    });
});

$("img.close").click(function(e) {
		$("#content").empty();
	});

function initMap() {
        var myLatLng = {lat: 62.242603, lng: 25.747257};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: myLatLng,
          gestureHandling: 'cooperative'
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      }
