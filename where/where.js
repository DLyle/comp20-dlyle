aleToBt =[
{"station":"Alewife","latitude":42.395428, "longitude": -71.142483,
  "key":"ALE"},
{"station":"Davis", "latitude":42.39674 , "longitude": -71.121815, 
  "key":"DAV"},
{"station":"Porter", "latitude":42.3884 , "longitude": -71.119149,
  "key":"POR"},
{"station":"Harvard", "latitude":42.373362 , "longitude": -71.118956,
  "key":"HAR"},
{"station":"Central", "latitude":42.365486 , "longitude": -71.103802,
  "key":"CEN"},
{"station":"Kendall", "latitude":42.36249079 , "longitude":-71.08617653,
  "key":"KEN"},
{"station":"Charles MGH", "latitude":42.361166 , "longitude":-71.070628,
  "key":"MGH"},
{"station":"Park", "latitude":42.35639457 , "longitude":-71.0624242,
  "key":"PRK"},
{"station":"Downtown Crossing", "latitude":42.355518 , "longitude":-71.060225,
  "key":"DTC"},
{"station":"South Station", "latitude":42.352271 , "longitude":-71.055242,
  "key":"SOU"},
{"station":"Broadway", "latitude":42.342622 , "longitude":-71.056967,
  "key":"BRO"},
{"station":"Andrew", "latitude":42.330154 , "longitude":-71.057655,
  "key":"AND"},
{"station":"JFK", "latitude":42.320685 , "longitude":-71.052391,
  "key":"JFK"},
{"station":"North Quincy", "latitude":42.275275 , "longitude":-71.029583,
  "key":"NQU"},
{"station":"Wollaston", "latitude":42.2665139 , "longitude":-71.0203369,
  "key":"WOL"},
{"station":"Quincy Center", "latitude":42.251809 , "longitude":-71.005409,
  "key":"QUC"},
{"station":"Quincy Adams", "latitude":42.233391 , "longitude":-71.007153,
  "key":"QUA"},
{"station":"Braintree", "latitude":42.2078543 , "longitude":-71.0011385,
  "key":"BRA"}];      

jfkToAsh = [{"station":"JFK", "latitude":42.320685 , "longitude":-71.052391,
  "key":"JFK"},
{"station":"Savin Hill", "latitude":42.31129 , "longitude":-71.053331,
  "key":"SAV"},
{"station":"Fields Corner", "latitude":42.300093 , "longitude":-71.061667,
  "key":"FIE"},
{"station":"Shawmut", "latitude":42.29312583 , "longitude":-71.06573796,
  "key":"SHA"},
{"station":"Ashmont", "latitude":42.284652 , "longitude":-71.064489,
  "key":"ASH"}];

var stations = [];
var map;
var rootline = [];
var ashline = [];
var windows = {};

function init(){
  console.log("in init");
  drawMap();
  getMyLocation();
  console.log("map drawn");
  }

function drawMap(){
  console.log("in drawMap");
  latlng = new google.maps.LatLng(42.35,-71);
  var mapDiv = document.getElementById("map_div");
  myOptions = {zoom:13, mapTypeId:"roadmap", center:latlng};
  map = new google.maps.Map(mapDiv, myOptions);
  drawRedline();
  console.log("out");
  }

function handleError(position){
  alert("Failed to find position");
}
function createWindow(marker,key){
    windows[key] = new google.maps.InfoWindow();
    windows[key].setContent(marker.getTitle());
    google.maps.event.addListener(marker, 'click',function(){
        windows[key].open(map,marker);
        });
}

function drawPolyLines(){
  redline1 = new google.maps.Polyline({
            path:rootline,
            map:map,
            strokeColor:"FF0000"});
  redline2 = new google.maps.Polyline({
            path:ashline,
            map:map,
            strokeColor:"FF0000"});
}

function drawRedline(){
  for(i=0;i<aleToBt.length;i++){
    rootline[i] = 
     new google.maps.LatLng(aleToBt[i]["latitude"],aleToBt[i]["longitude"]);
    var marker = new google.maps.Marker({
                      position:rootline[i],
                      map:map,icon:'Tstop.png'});
    marker.setTitle(aleToBt[i]["station"]);
    createWindow(marker,aleToBt[i]["key"]);
  }
  for(j=0;j < jfkToAsh.length;j++){
    ashline[j] = 
     new google.maps.LatLng(jfkToAsh[j]["latitude"],jfkToAsh[j]["longitude"]);
    var marker = new google.maps.Marker({
        position:ashline[j],
        map:map,icon:'Tstop.png'});
    marker.setTitle(jfkToAsh[j]["station"]);
    createWindow(marker,jfkToAsh[j]["key"]);
  }
  drawPolyLines();
  fillSched();
}

function getMyLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        latlng = new google.maps.LatLng(position.coords.latitude,
          position.coords.longitude);
        map.setCenter(latlng);
        myPos = new google.maps.Marker({position:latlng,map:map});
        },handleError);

  }
  else{
    alert("Geolocation Not Available");
  }
}

function fillSched(){
  try{
    request = new XMLHttpRequest();
    request.open("GET",
        "http://mbtamap-cedar.herokuapp.com/mapper/redline.json",
        true);
    request.send();
  }
  catch(error){
    alert("Error: "+error);
  }
  request.onreadystatechange = function(){
    if(request.readyState === 4 && request.status === 200){
      sched = JSON.parse(request.responseText);
      for(i = 0; i < sched.length; i++){
        var key = sched[i]["PlatformKey"];
        key = key.substring(1,key.length-1);
        var cont = windows[key].getContent();
        windows[key].setContent(cont.concat("<br>",sched[i]["Time"]));
      }
    }
  }
}

