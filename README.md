# leaflet-challenge
attached a png showing the code in action
"picture of map loaded with data"

in this module, i started by tapping into the usgs geojson feed to fetch real-time earthquake data. the primary task was to represent each earthquake on a map based on its latitude and longitude. i wanted to enhance the visualization by making the markers' sizes reflect the magnitude of the earthquakes and their colors represent the depths. i also integrated popups to provide additional information about each earthquake, and i added a legend to show the depth-color relationship.

this challenge was quite tricky. it required a integration of multiple libraries and tools, especially leaflet for map rendering and d3 for data fetching and manipulation. 

resources:

https://www.usgs.gov/programs/earthquake-hazards : usgs earthquake hazards program 
(https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) 7 days data
https://leafletjs.com/index.html leaflet documentation : helped with the inital map
https://docs.mapbox.com/api/overview/ mapbox api documentation : helped with getting the api set up

