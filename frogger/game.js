// Your work goes here...
var score;
var level;
var frogx;
var frogy;
var progress;
var highscore;
var lives;
var image;
var ctx;
var speed;
var safeties = [];
var usedSafe = [];
var numsafe;
var GameOver;
var deadFrog;
var logs = [];
logs[0] = [];
logs[1] = [];
logs[2] = [];
logs[3] = [];
logs[4] = [];
var cars = [];
cars[0] = [];
cars[1] = [];
cars[2] = [];
cars[3] = [];
cars[4] = [];

function startGame(){
  var c = document.getElementById("game");
  if(c.getContext("2d")){
    ctx = c.getContext("2d");
  }
  else{
    alert("Canvas is not supported");
  }
  score = 0;
  level = 1;
  frogx = 185;
  frogy = 492;
  progress = 492;
  initLogPos();
  initCarPos();
  for(var i = 0; i < 5; i++){
    usedSafe[i] = false;
  }
  speed = 50;
  highscore = 0;
  numsafe = 0;
  lives = 3;
  GameOver = false;
  image = new Image();
  image.src = "assets/frogger_sprites.png";
  deadFrog = new Image();
  deadFrog.src = "assets/dead_frog.png";
  inter = setInterval(drawBoard,speed);
  document.addEventListener("keydown",moveFrogger);
}

function initLogPos(){
  logs[0][0] = 360;//medium
  logs[0][1] = 190;
  logs[0][2] = 20;
  logs[1][0] = 30; //short
  logs[1][1] = 180;
  logs[1][2] = 330;
  logs[2][0] = 30; //long
  logs[2][1] = 280;
  logs[2][2] = 530;
  logs[3][0] = 360; //short
  logs[3][1] = 210;
  logs[3][2] = 60;
  logs[4][0] = 30;  //medium
  logs[4][1] = 200;
  logs[4][2] = 370;
}

function initCarPos(){
  cars[0][0] = 360;//car1
  cars[0][1] = 250;
  cars[0][2] = 140;
  cars[1][0] = 90; //car2
  cars[1][1] = 230;
  cars[1][2] = 370;
  cars[2][0] = 340; //car3
  cars[2][1] = 190;
  cars[2][2] = 40;
  cars[3][0] = 60; //car4
  cars[3][1] = 170;
  cars[3][2] = 280;
  cars[4][0] = 340;  //car5
  cars[4][1] = 230;
  cars[4][2] = 120;
}

function safety(){
  score+=50;
  var x = frogx;
  var y = frogy;
  safeties[numsafe] = function(){
    ctx.drawImage(image,8,360,30,30,x,y,30,30);
  }
  numsafe ++;
  if(numsafe == 5){
    numsafe = 0;
    safeties = [];
    level++;
    speed *= .75
    clearInterval(inter);
    inter = setInterval(drawBoard,speed);
    score += 1000
  }
}


function moveFrogger(event){
  if (event.keyCode == 37){
    event.preventDefault();
    leftArrow();
  }
  else if (event.keyCode == 38){
    event.preventDefault();
    upArrow();
  }
  else if (event.keyCode == 39){
    event.preventDefault();
    rightArrow();
  }
  else if (event.keyCode == 40){
    event.preventDefault();
    downArrow();
  }
  else if (event.keyCode == 78){
    clearInterval(inter);
    startGame();
  }
}

function rightArrow(){
  if(frogx + 35 < 390){
    frogx+=35;
  }
}

function downArrow(){
  if(frogy+35 < 498){
    frogy+=35;
  }
}

function leftArrow(){
  if(frogx-35 > 0){
    frogx-=35;
  }
}

function upArrow(){
  frogy-=35;
  if(frogy < progress){
    progress -= 35;
    score+=10;
  }
  if(frogy <= 72){
    if(isSafe()){
    safety();
    frogx = 185;
    frogy = 492;
    progress = 492;
    }
    else {
      dead();
    }
  }
}

function isSafe(){
  if(frogx > 8 && frogx + 20 < 45 && !usedSafe[0]){
    usedSafe[0] = true;
    return true;
  }
  else if (frogx > 83 && frogx + 20 < 130 && !usedSafe[1]){
    usedSafe[1] = true;
    return true;
  }
  else if (frogx > 178 && frogx + 20 < 215 && !usedSafe[2]){
    usedSafe[2] = true;
    return true;
  }
  else if (frogx > 263 && frogx + 20 < 300 && !usedSafe[3]){
    usedSafe[3] = true;
    return true;
  }
  else if (frogx > 348 && frogx + 20 < 385 && !usedSafe[4]){
    usedSafe[4] = true;
    return true;
  }
  else {
    return false;
  }
}

function dead(){
  ctx.drawImage(deadFrog,0,0,30,30,frogx,frogy,30,30);//frog
  frogx = 185;
  frogy = 492;
  progress = 492;
  lives --;
  if(lives <= 0){
    GameOver = true;
  }
}


function drawBoard(){
  if(!GameOver){
    drawBackground();
    drawFooter();
    drawLogs();
    drawFrogger();
    drawCars();
    for(var i =0; i< numsafe;i++){
      safeties[i]();
    }
  }
  else{
    clearInterval(inter);
    drawBackground();
    drawFooter();
    var thescore = score;
    var data = {};
    data["game_title"] = "mines";
    data["username"] = "David";
    data["score"] = score;
    $.post("http://agile-cliffs-3152.herokuapp.com/submit.json",data);
    ctx.font="30px Arial Green";
    ctx.fillText("Game Over",120,200);
    ctx.font="20px Arial Green";
    ctx.fillText("Press n for New Game",105,225);
  }
}

function drawFrogger(){
  ctx.drawImage(image,8,360,30,30,frogx,frogy,30,30);//frog
}

function car1(pos){
  ctx.drawImage(image,76,260,40,30,pos,457,40,30);  
}

function car2(pos){
  ctx.drawImage(image,8,296,30,30,pos,422,30,30);  
}

function car3(pos){
  ctx.drawImage(image,0,260,40,30,pos,387,40,30); 
}

function car4(pos){
  ctx.drawImage(image,42,260,38,30,pos,352,38,30);
}

function car5(pos){
  ctx.drawImage(image,100,296,55,30,pos,317,55,30);
}

function hitByCar(x,y){
  var width = 30;
  if(y == 317) width = 50;
  if(frogy == y && frogx+20 > x && frogx < x+width){
    dead();
  }
}

function mvCars(carfun,car,right,h){
  for(var i=0; i < 5; i++){
    hitByCar(car[i],h);
    carfun(car[i]);
    if(right){
      car[i]+=2;
      if(car[i] > 400)
        car[i] = -80;
    }
    else{
      car[i]-=2.5;
      if(car[i] < -60)
        car[i]=460;
    }
  }
}


function drawCars(){
  mvCars(car1,cars[0],false,457);
  mvCars(car2,cars[1],true,422);
  mvCars(car3,cars[2],false,387);
  mvCars(car4,cars[3],true,352);
  mvCars(car5,cars[4],false,317);
}

function frogOnLog(logpos,w,h){
  return (frogy == h && frogx >= logpos && frogx < logpos+w-20)
}

function Long(x,y){
    ctx.drawImage(image,0,160,200,30,x,y,200,30);//log
}

function Med(x,y){
    ctx.drawImage(image,0,190,130,30,x,y,130,30);
}

function Short(x,y){
    ctx.drawImage(image,0,220,100,30,x,y,100,30);
}

function mvLogs(logtype,log,right,h){
  var logfun = Short;
  var step = 1.5;
  var width = 92;
  var startpos = frogx;
  var ubound = 400;
  var lbound = 0;
  switch(logtype){
    case "med":
      logfun = Med;
      step = 2;
      width = 124;
      ubound = 500;
      lbound = -100;
      break; 
    case "long":
      logfun = Long;
      step = 3;
      width = 184;
      ubound = 600;
      lbound = -200;
      break;
  }
  for(var i = 0; i < 3; i++){
    logfun(log[i],h);
    if(right){
      if(frogOnLog(log[i],width,h)) frogx+=step;
      log[i] += step;
      if (log[i] > ubound){
        log[i] = -1*width;
      }
    }
    else{
      if(frogOnLog(log[i],width,h)) frogx-=step;
      log[i] -= step;
      if (log[i]+width < lbound){
        log[i] = 400;
      }
    }
  }
  if(h==frogy && startpos==frogx){
    dead();
  }
}

function drawLogs(){
  mvLogs("short",logs[1],true,212);
  mvLogs("short",logs[3],false,142);
  mvLogs("med",logs[4],true,107);
  mvLogs("med",logs[0],false,247);
  mvLogs("long",logs[2],true,177);
}

function drawBackground(){
  ctx.fillStyle = "#191970";
  ctx.fillRect(2,2,396,290);
  ctx.fillStyle = "#000000";
  ctx.fillRect(2,285,396,279);

  ctx.drawImage(image,0,0,396,50,2,2,396,50); //FROGGER
  ctx.drawImage(image,0,50,396,60,2,50,396,60); //Grass
  ctx.drawImage(image,0,115,396,45,2,280,396,45);//upper roadside
  ctx.drawImage(image,0,115,396,45,2,490,396,45);//lower roadside
}

function drawFooter(){
  ctx.fillStyle="#00ff00";
  ctx.font= "Bold 18pt Arial";
  ctx.fillText("Level " + level,70,548);
  ctx.font= "Bold 10pt Arial";
  ctx.fillText("Score: " + score,2,560);
  ctx.fillText("Highscore: " + highscore,80,560);
  for(var i = 0; i < lives;i++){
    ctx.drawImage(image,8,330,30,30,20*i,523,30,30); //lives
  }
}
