var stations = {};
var map;

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

function drawRedline(){
  try{
    request = new XMLHttpRequest();
    request.open("GET",
      "RealTimeHeavyRailKeys.csv",
      true);
    request.send();
  }
  catch(error){
    alert("Error: "+error);
  }
  request.onreadystatechange = function(){
    if(request.readyState === 4 && request.status === 200){
      var str = request.responseText;
      str = str.split('\n');
      rootline = [];
      ashline = [];
      brainline = [];
      for(i=0;i<25;i++){
          rl=str[i+1].split(',');
          rootline[i] = new google.maps.LatLng(rl[13],rl[14]);
          stations[rl[1]] = new google.maps.Marker({
                            position:rootline[i],
                            map:map,icon:'Tstop.png'});
          stations[rl[1]].setTitle(rl[3]);
      }
      for(i=24;i<32;i++){
        rl=str[i+1].split(',');
        ashline[i-24] = new google.maps.LatLng(rl[13],rl[14]);
        stations[rl[1]] = new google.maps.Marker({
                          position:ashline[i-24],
                          map:map,icon:'Tstop.png'});
          stations[rl[1]].setTitle(rl[3]);
      }
      brainline[0] = rootline[24];
      for(i=32;i<41;i++){
        rl = str[i+1].split(',');
        brainline[i-31] = new google.maps.LatLng(rl[13],rl[14]);
        stations[rl[1]] = new google.maps.Marker({
                          position:brainline[i-31],
                          map:map,icon:'Tstop.png'});
        stations[rl[1]].setTitle(rl[3]);
      }
      redline1 = new google.maps.Polyline({
                      path:rootline,
                      map:map,
                      strokeColor:"FF0000"});
      redline2 = new google.maps.Polyline({
                      path:ashline,
                      map:map,
                      strokeColor:"FF0000"});
      redline3 = new google.maps.Polyline({
                      path:brainline,
                      map:map,
                      strokeColor:"FF0000"});
      fillMarkers()
    }
  }
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

function fillMarkers(){
  console.log(stations[0].getTitle());
  for(i = 0; i < stations.length; i++){
    console.log(stations[i].getTitle());
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(stations[i], 'click',function(){
        infowindow.setContent(stations[i].getTitle());
        infowindow.open(map,stations[i]);
        });
  }
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
        var marker = stations[sched[i]["PlatformKey"]]; 
        
      }
    }
  }
}
