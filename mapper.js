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

var replist = [4,5,6,14,15,16,19,22,24,76,78,24,61];
 //list of districts by number where democrats are not running

//loaded candidates as  var = candidates [{candidate},{candidate}] from index

//set pop up on map click
function onEachFeature(feature, layer) {
    if (replist.indexOf(feature.properties.OBJECTID) == -1) {
        //create pop up for districts dems are running in

        var popupTemplate = `<h3>District #${feature.properties.DISTRICT_N}</h3>`;
          var id_num = feature.properties.DISTRICT_N;
          var dis_info = $('#candidate').html();

          //testing
          console.log("candidate 1: " +  candidates[feature.properties.DISTRICT_N]["First"] + " " +  candidates["1"]["Last"] + candidates["1"]["Twitter"] + " objectid = " + feature.properties.OBJECTID);
          //var twitterlink = "https://twitter.com/" + candidates[" " + feature.properties.OBJECTID]["Twitter"];
          //var sitelink = candidates["" + feature.properties.OBJECTID]["Website"];
          //var facebook = candidates["" + feature.properties.OBJECTID]["Facebook"];

          //TODO
          //add above elements to popup dynamically

          popupTemplate = popupTemplate + dis_info;

        layer.bindPopup(popupTemplate);
    }else{
        //do nothing... for now
    }


}


//load my new districts file
$.ajax({
  url:"https://github.com/jschiarizzi/Virginia-dems-election-map-2017/raw/master/data/district_no_water.geojson",
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


var geojson;

console.log("created geojson");


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

    //=========info box=====//
            var info = L.control();

            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                this.update();
                return this._div;
            };

            // method that we will use to update the control based on feature properties passed
            info.update = function (props) {
                this._div.innerHTML =  'Click on your district.';
            };

            info.addTo(map);
        //=======================end info box===//


    //Style the map
//L.geoJson(districts, {style: style}).addTo(map); //
