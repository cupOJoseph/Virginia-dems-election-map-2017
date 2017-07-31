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

//districts I dont have info for rn
var replist = [4,5,6,11,14,15,16,19,22,24,34,35,36,37,38,39,41,43,44,45,46,47,48,49,52,53,57,61,63,69,70,71,74,75,76,77,78,79,80,86,87,90,92,93,95];
 //list of districts by number where democrats are not running
  //no 4,5,6,14,15,16,19,22,76,78,24,61.

//loaded candidates as  var = candidates [{candidate},{candidate}] from index

//set pop up on map click
function onEachFeature(feature, layer) {
    if (replist.indexOf(parseInt(feature.properties.NAME)) == -1) {
        //create pop up for districts dems are running in

        var popupTemplate = `<h3>District #${feature.properties.NAME}</h3>`;
          var id_num = parseInt(feature.properties.NAME);
          var dis_info = $('#candidate').html();

          //testing feature.properties.DISTRICT_N
          console.log("checking" + feature.properties.NAME);
          console.log("candidate " + feature.properties.NAME + " = " + candidates[feature.properties.NAME]["First"] + " " +  candidates[feature.properties.NAME]["Last"] + " " + candidates[feature.properties.NAME]["Twitter"]);
          //var twitterlink = "https://twitter.com/" + candidates[" " + feature.properties.OBJECTID]["Twitter"];
          //var sitelink = candidates["" + feature.properties.OBJECTID]["Website"];
          //var facebook = candidates["" + feature.properties.OBJECTID]["Facebook"];

          //TODO
          //add above elements to popup dynamically

          popupTemplate = popupTemplate + dis_info;

        //layer.bindPopup(popupTemplate);
    }else{
        //do nothing... for now
    }


}


//load my new districts file
    L.geoJson(districts, {
      style: style,
      onEachFeature
    }).addTo(map);


var geojson;

console.log("created geojson");



//set color
function style(feature) {
        if (replist.indexOf(parseInt(feature.properties.NAME)) == -1) { //if the district number is in the demlist
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

        //=========hover animation=========//
        function highlightFeature(e) {
        var layer = e.target;

        console.log("hover event.");

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }
