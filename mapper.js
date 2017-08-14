var map = L.map('mapid').setView([38.2, -79.5], 7);

L.tileLayer('https://api.mapbox.com/styles/v1/schiarizzi/cj59vuej16abk2rmt34iod7pv/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoaWFyaXp6aSIsImEiOiJjajE4a3NuZWowNzQ5MzNvN2xkdGh2YnVwIn0.dOZQgGCs8Fwxpy7bmRvvTg', {
    id: 'mapbox.light'
    }).addTo(map);
//{  }

//disable scroll with wheel so it fits into website nicer.
map.scrollWheelZoom.disable();
console.log("Disabled scrollWheelZoom");

map.setMinZoom(7);
console.log("set min zoom level to 7");

var p1 = L.point(-83.7652, 36.5425),
p2 = L.point(-74.9268, 39.5440),
bounds = L.bounds(p1, p2);

map.setMaxBounds(bounds);
console.log("max bounds set.");

//districts I dont have info for rn
var dem_uncontested_list = [11,34,35,36,37,38,39,41,43,44,45,46,47,48,49,52,53,57,63,69,70,71,74,75,77,79,80,86,87,90,92,93,95]; //dark blue
 //list of districts by number where democrats are not running
var replist = [4,5,6,14,15,16,19,22,76,78,24,61]; //uncontested

//loaded candidates as  var = candidates [{candidate},{candidate}] from index


//================== get candidate profile ==============//
function getProfile(num) {
    var twitterlink = "https://twitter.com/" + candidates[num]["Twitter"];
    var sitelink = candidates[num]["Website"];
    var facebooklink = candidates[num]["Facebook"];
    var first = candidates[num]["First"];
    var last = candidates[num]["Last"];
    var img_link = candidates[num]["Photo"];

    var challenger;

    if(candidates[num]["chal"] == "c"){
        challenger = "(Challenger)";
    }else{
        challenger = "(Incumbent)";
    }

    var candidate_template = `
    <div id="candidate" class="col">
    <h3> District ${num}</h3>

         <div >
             <img id="candidate_img" src="${img_link}" alt="No image.">
        </div>
        <h1 ><span id="our_candidate_is">${first} ${last} ${challenger}</span></h1>

            <div class="candidate-info"> <span  class="candidate-website"><a href="${sitelink}" target="_blank" class="prim">Website</a></span> | <span class="candidate-facebook"><a href="${facebooklink}" target="_blank" class="prim">Facebook</a></span> | <span class="candidate-twitter">           <a href="${twitterlink}" target="_blank" class="prim">Twitter</a></span>
       </div>
       <br>
       <br>
   </div>`

   //$("#candidate").html(candidate_template);
   //$("#candidate").show(); // bring up bottom lower right candidate info

   return candidate_template;
}


//set pop up on map click
function onEachFeature(feature, layer) {
    if (replist.indexOf(parseInt(feature.properties.NAME)) == -1) {
        //create pop up for districts dems are running in



          //testing feature.properties.DISTRICT_N
          //console.log("checking" + feature.properties.NAME);
          //console.log("candidate " + feature.properties.NAME + " = " + candidates[feature.properties.NAME]["First"] + " " +  candidates[feature.properties.NAME]["Last"] + " " + candidates[feature.properties.NAME]["Twitter"]);

          var twitterlink = "https://twitter.com/" + candidates[feature.properties.NAME]["Twitter"];
          var sitelink = candidates[feature.properties.NAME]["Website"];
          var facebooklink = candidates[feature.properties.NAME]["Facebook"];
          var first = candidates[feature.properties.NAME]["First"];
          var last = candidates[feature.properties.NAME]["Last"];
          var img_link = candidates[feature.properties.NAME]["Photo"];

          //decide if Incumbent or Challenger
           var challenger;

           if(candidates[feature.properties.NAME]["chal"] == "c"){
               challenger = "Challenger";
           }else{
               challenger = "Incumbent";
           }
          //add above elements to popup dynamically

          var popupTemplate = `
          <div id="" class="col">
           <p align="center"><strong>${first} ${last}</strong> (D-${challenger})</p>
           <p align="center">District ${feature.properties.NAME}</p>
          </div>`;

          layer.bindPopup(popupTemplate);
    }else{
        var popupTemplate = `<p><strong>Uncontested.</strong></p>
                            <p>District ${feature.properties.NAME}</p>   `;
        layer.bindPopup(popupTemplate);
    }

    //On each feature
    layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
            click: getCandidate,
		});
}


var geoJson;

console.log("created geoJson");



//set color
function style(feature) {
        if (replist.indexOf(parseInt(feature.properties.NAME)) == -1) { //if the district number is in the demlist
            if(dem_uncontested_list.indexOf(parseInt(feature.properties.NAME)) == -1){
                //contested, make it light blue
                return {
                    fillColor: '#91b0ff', //make it light blue if dem running and contested
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '.25',
                    fillOpacity: 0.7
                };
            }else{
                //un contested, make it dark blue
                return {
                    fillColor: '#3a41ff', //make it blue if dem running and not contested
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '.25',
                    fillOpacity: 0.7
                };
            }
        }else{
            return{
                fillColor: '#d8d8d8', //make it grey if no dem running.
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

        console.log();

        console.log("hover event.");

        layer.setStyle({
            weight: 5,
            color: '#ffffff',
            dashArray: '',
            fillOpacity: 0.7
        });



        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }

        //tell the user what district is selected
        info.update = function (props) {
            this._div.innerHTML =  'District #' + layer.feature.properties.NAME;
        };
        info.addTo(map);

        //test getting feature from layer
        //console.log("layer -> feat num: " + layer.feature.properties.NAME);
    }

    //put highlight on hover back to normal when you leave that district
    function resetHighlight(e) {
        geoJson.resetStyle(e.target);
        info.update = function (props) {
            this._div.innerHTML =  'Click on your district.';
        };

        info.addTo(map);
    }

    //jquery to create element in paage for the candidate of the district that was clicked on
    //this function called on mouse click.
    function getCandidate(e){
        console.log("Click event logged at district: " + e.target.feature.properties.NAME);
        var layer = e.target;
        var feature = e.target.feature;

        if(replist.indexOf(parseInt(feature.properties.NAME)) == -1){ //if a democrat is running in this area

            getProfile(feature.properties.NAME);
        }

    }

    //create legend for colors
    var legend = L.control({position: 'topleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');

        div.innerHTML = '<i style="background:' + '#91b0ff' + '"></i> ' +
        ' - Democratic Challenger' + '<br>' + '<i style="background:' + '#3a41ff' + '"></i> ' +
        ' - Democratic Incumbent';


    return div;
};

legend.addTo(map); // add legend to the map

    //load my new districts file
geoJson = L.geoJson(districts, {
          style: style,
          onEachFeature
        }).addTo(map);

    //Use drop down info to select a state and bring up the profile.
    $("#candidate_dropdown ").change(function () { //when the drop down changes, do a thing
        var choice = $(this).find("option:selected").val(); //get selected value

        getProfile(choice);
    });
