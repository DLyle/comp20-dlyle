
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
var WCpos = {};
var EARTH_RAD = 3963.1676;

function init(){
  drawMap();
  waldoCarmen();
  getMyLocation();
  }

//gets the locations of waldo and carmen
//creates markers and windows that will display their note when clicked
function waldoCarmen(){
  var request = xmlReq();
  request.open("GET",
      "http://messagehub.herokuapp.com/a3.json",
      true);
  request.send();
  request.onreadystatechange = function(){
  if(request.readyState === 4 && request.status === 200){
    var locs = JSON.parse(request.responseText);
    for(var i = 0; i < 2; i++){
    if(typeof locs[i] != 'undefined'){
      var name = locs[i]["name"];
      WCpos[name] = new google.maps.LatLng(
          locs[i]["loc"]["latitude"],locs[i]["loc"]["longitude"]);
      var marker = new google.maps.Marker({
                  position:WCpos[name],
                  map:map});
      marker.setIcon("carmen.png");
      marker.setTitle(name);
      if(name == "Waldo"){
        marker.setIcon("waldo.png");
      }
      marker.setVisible(true);
      createWindow(marker,name);
      windows[name].setContent(locs[i]["loc"]["note"]);
    }
    }
  }
  }
}

//finds the distance between you and waldo and carmen
//displays the distances in an InfoWindow at your location upon click
function WCdist(myPos){
  //var WCinfo = new google.maps.InfoWindow({position:myPos, map:map});
  var WCinfo = windows["me"];
  if(typeof WCpos["Waldo"] != 'undefined'){
    var cont = WCinfo.getContent();
    var waldist = google.maps.geometry.spherical.computeDistanceBetween(
                myPos,WCpos["Waldo"],EARTH_RAD); 
    WCinfo.setContent(cont.concat("You are ",waldist," miles from Waldo!<br>"));
  }
  if(typeof WCpos["Carmen Sandiego"] != 'undefined'){
    var cardist = google.maps.geometry.spherical.computeDistanceBetween(
                myPos,WCpos["Carmen Sandiego"],EARTH_RAD);
    var cont = WCinfo.getContent();
    WCinfo.setContent(
      cont.concat("You are ",cardist," miles from Carmen Sandiego!<br>"));
  }
}

function closestStat(myPos){
  var closest = 0;
  var mindist = google.maps.geometry.spherical.computeDistanceBetween(
                myPos,rootline[0],EARTH_RAD);  
  var isRoot = true;
  for(var i = 1; i < rootline.length; i++){
    var dist = google.maps.geometry.spherical.computeDistanceBetween(
               myPos,rootline[i],EARTH_RAD);
    if( dist < mindist){
      mindist = dist;
      closest = i;
    }
  }
  for(var j = 0; j < ashline.length; j++){
    var dist = google.maps.geometry.spherical.computeDistanceBetween(
               myPos,ashline[j],EARTH_RAD);
    if(dist < mindist){
      mindist = dist;
      closest = j;
      isRoot = false;
    }
  }
  var name = aleToBt[closest]["station"];
  if(!isRoot){
    name = jfkToAsh[closest]["station"];
  }
  var cont = windows["me"].getContent();
  windows["me"].setContent(
    name.concat(" is closest!<br> It is ",mindist," miles away!<br>"));
}


function drawMap(){
  latlng = new google.maps.LatLng(42.35,-71);
  var mapDiv = document.getElementById("map_div");
  myOptions = {zoom:13, mapTypeId:"roadmap", center:latlng};
  map = new google.maps.Map(mapDiv, myOptions);
  drawRedline();
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
        myPos.setTitle("You");
        createWindow(myPos,"me");
        closestStat(latlng);
        WCdist(latlng);
        },handleError);

  }
  else{
    alert("Geolocation Not Available");
  }
}

function xmlReq(){
try {
  var request = new XMLHttpRequest();
}
catch (ms1) { 
  try {
    request = new ActiveXObject("Msxml2.XMLHTTP");
  }
  catch (ms2) {
    try {
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    catch (ex) {
      request = null;
    }
  }
}
return request;
}


function fillSched(){
  var request = xmlReq();
  request.open("GET",
      "http://mbtamap-cedar.herokuapp.com/mapper/redline.json",
      true);
  request.send();

  request.onreadystatechange = function(){
    if(request.readyState === 4 && request.status === 200){
      sched = JSON.parse(request.responseText);
      for(i = 0; i < sched.length; i++){
        var key = sched[i]["PlatformKey"];
        var n_or_s = key[key.length-1];
        var dir = "Northbound";
        if (n_or_s == "S"){
          dir = "Southbound";
        }
        var time = sched[i]["Time"].split(' ')[1];
        console.log(n_or_s);
        console.log(dir);
        key = key.substring(1,key.length-1);
        var cont = windows[key].getContent();
        windows[key].setContent(cont.concat("<br>",time," ",dir));
      }
    }
  }
}

