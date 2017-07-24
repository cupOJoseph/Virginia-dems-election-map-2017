var map = L.map('mapid').setView([37.5, -79], 7);

L.tileLayer('https://api.mapbox.com/styles/v1/schiarizzi/cj59vuej16abk2rmt34iod7pv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoaWFyaXp6aSIsImEiOiJjajE4a3NuZWowNzQ5MzNvN2xkdGh2YnVwIn0.dOZQgGCs8Fwxpy7bmRvvTg', {
    id: 'mapbox.light'
    }).addTo(map);
//{  }

//disable scroll with wheel so it fits into website nicer.
map.scrollWheelZoom.disable();
console.log("Disabled scrollWheelZoom");

map.setMinZoom(7);
console.log("set min zoom level to 7");

//set pop up on map click
function onEachFeature(feature, layer) {
  const popupTemplate = `
    <h3>District #${feature.properties.DISTRICT_N}</h3>
    <h4>Demographic Data (VAP/TP)</h4>
    <p>Asian: ${feature.properties.VAPASIAN} / ${feature.properties.ASIAN}</p>
    <p>Black: ${feature.properties.VAPBLACK} / ${feature.properties.BLACK}</p>
    <p>Hispanic: ${feature.properties.VAP_HISP} / ${feature.properties.TOT_HISP}</p>
    <p>Pacific Islander: ${feature.properties.VAPHAWPI} / ${feature.properties.HAWPI}</p>
    <p>White: ${feature.properties.VAPWHITE} / ${feature.properties.WHITE}</p>
    <p>Multi: ${feature.properties.VAPMULTI} / ${feature.properties.MULTI}</p>
    <p>Other: ${feature.properties.VAPOTHER} / ${feature.properties.OTHER}</p>
    `;
  layer.bindPopup(popupTemplate);
}


//load my new districts file
$.ajax({
  url:"https://raw.githubusercontent.com/jschiarizzi/Virginia-dems-election-map-2017/master/data/districts.geojson",
  dataType: "json",
  success: console.log("Districts data successfully loaded."),
  error: function (xhr) {
    console.error(xhr.statusText);
  }})
  .then(districts => {
    L.geoJson(districts, {
      style: style,
      onEachFeature
    }).addTo(map);
});

//testing user clicked

///================End of user click testing=============//

var geojson;

console.log("created geojson");

var replist = [4,5,6,14,15,16,19,22,24,76,78,24,61];
 //list of districts by number where democrats are not running
 //no 4,5,6,14,15,16,19,22,76,78,24,61.

//set color
function style(features) {
        if (replist.indexOf(features.properties.OBJECTID) == -1) { //if the district number is in the demlist
            return {
                fillColor: '#3a41ff', //make it blue if dem running.
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '.25',
                fillOpacity: 0.7
            };
        }else{
            return{
                fillColor: '#d8d8d8', //make it blue if dem running.
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '.25',
                fillOpacity: 0.7
            }
        }
    }

    //highlight districts on mouse over
/*
    function resetHighlight(e)
    {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        console.log("Hi.");
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }*/

    /*geojson = L.geoJson(districts, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);*/
    //=========End of highlight features ============//

    //=========info box=====//
    /*            var info = L.control();

            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                this.update();
                return this._div;
            };

            // method that we will use to update the control based on feature properties passed
            info.update = function (props) {
                this._div.innerHTML = '<h4>Total Population</h4>' +  (props ?
                    '<b>' + props.TOT_POP
                    : 'Hover over a district');
            };

            info.addTo(map);
        //=======================end info box===//
*/

    //Style the map
//L.geoJson(districts, {style: style}).addTo(map); //
