function initMap() {
    // Paikannus Jyväskylään
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:  62.242603, lng: 25.747257},
        zoom: 15
    });

    var contentString = "";
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    // lataa ja näyttää markkerit
    $.ajax({
        dataType: "json",
		url: 'data/paikat.json'
    }).fail(function() {
            console.log("fail!");
    }).done(function(data) {
        console.log(data);
         console.log(data.paikat);
        //käy kaikki paikat läpi
        $.each(data.paikat, function(index,paikka) {
            // hakee paikan sille annettujen tietojen perusteella
            var paikkaLatLng = {lat: paikka.lat, lng: paikka.lng};
            console.log(paikkaLatLng);
            // marker
            var marker = new google.maps.Marker({
                position: paikkaLatLng,
                map: map,
                // näyttää tiedot
                title:  paikka.Paikka,
                kuvaus: paikka.Kuvaus,
                tyyppi: paikka.Tyyppi,
                osoite: paikka.Osoite,
                ajat:   paikka.Ajat,
                puhelin: paikka.Puh,
                web:    paikka.Webbi
            });

            // merkker kuvat paikkojen perusteella
            if (paikka.Tyyppi == "Klubi/baari")
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
            else if (paikka.Tyyppi == "Kauppa/ruokala")
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            else if (paikka.Tyyppi == "Yleiset")
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');

            // markker tapahtuma
            marker.addListener('click', function() {
                infowindow.setContent(
                    '<div id="content">'+
                    '<h1 id="heading">'+this.title+'</h1>'+
                    '<div id="bodyContent">'+
                    '<p>'+this.kuvaus+'</p>'+
                    '<p>'+
                    'Tyyppi:'+this.tyyppi+'<br/>'+
                    'Osoite:'+this.osoite+'<br/>'+
                    'Puhelin:'+this.puhelin+'<br/>'+
                    'Aukiolo:'+this.ajat+'<br/>'+
                    'Web:<a href="'+this.web+'" target="_blank">'+this.web+'<br/>'+
                    '</p>'+
                    '</div>'+
                    '</div>'
                );
                // show info window
                infowindow.open(map, this);
            });
        });
    });
}
