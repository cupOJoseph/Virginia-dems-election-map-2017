# Virginia-dems-election-map-2017
An embeddable map for the districts in VA where democrats are running for house of delegates in 2017.

This map was map with mapbox and leaflet. Check out http://winVirginia.org for more.


File Descriptions:
/va_houseplan :
    - a bunch of shape files

va_houseplan : a zipped shape file, because that's how mapbox likes it.

data/districts : a compressed geojson file.  You can get a larger, more precise file, but this runs faster.
```javascript
{a bunch of stuff{properties[],{a bunch of coordinates}}}
```
This is the same as the shape files, but quicker and dirtier to use as embedded in a webpage.

index.html - a very simple webpage.  The <map> tag turns into a map. pretty straight forward.  The order of the imports is pretty important though... worth mentioning.

mapper.js - A leaflet applet that creates the map and boarders using districts.js.

stylesheet.css - use to define how big the map is and style the popup in the corner.
