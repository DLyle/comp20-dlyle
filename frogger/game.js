// Your work goes here...
var score;
var level;
var frogx;
var frogy;
var highscore;
var lives;
var image;
var ctx;
var speed;
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
var time;
var loglvl = [];
var whichLog = [];
function startGame(){
  var c = document.getElementById("game");
  if(c.getContext("2d")){
    ctx = c.getContext("2d");
  }
  else{
    alert("Canvas is not supported");
  }
  time = new Date();
  score = 0;
  level = 1;
  frogx = 185;
  frogy = 492;
  initLogPos();
  initCarPos();
  speed = 50;
  highscore = 0;
  lives = 3;
  whichLog[0] = Short;
  whichLog[1] = Med;
  whichLog[2] = Long;
  image = new Image();
  image.src = "assets/frogger_sprites.png";
  setInterval(drawBoard,speed);
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
  cars[1][0] = 30; //car2
  cars[1][1] = 140;
  cars[1][2] = 250;
  cars[2][0] = 300; //car3
  cars[2][1] = 190;
  cars[2][2] = 80;
  cars[3][0] = 60; //car4
  cars[3][1] = 170;
  cars[3][2] = 280;
  cars[4][0] = 340;  //car5
  cars[4][1] = 230;
  cars[4][2] = 120;
}
function moveFrogger(event){
  if (event.keyCode == 37){
    frogx-=35;
    //leftArrow();
  }
  else if (event.keyCode == 38){
    frogy-=35;
    console.log(frogy);
    //upArrow();
  }
  else if (event.keyCode == 39){
    frogx += 35;
    //rightArrow();
  }
  else if (event.keyCode == 40){
    frogy+=35;
    //downArrow():
  }
}

function dead(){

}


function playGame(){
  console.log(time.getSeconds());
  if(logx < 500){
    logx++;
    drawBoard();
    window.setTimeout(playGame,100);
  }
}

function drawBoard(){
  drawBackground();
  drawFooter();
  drawLogs();
  drawFrogger();
  drawCars();
}

function drawFrogger(){
  ctx.drawImage(image,8,360,30,30,frogx,frogy,30,30);//frog
}

function car1(pos){
  ctx.drawImage(image,76,260,40,30,pos,457,40,30); //car 
}

function car2(pos){
  ctx.drawImage(image,8,296,30,30,pos,422,30,30); //car 
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
function car3(pos){
  ctx.drawImage(image,0,260,40,30,pos,387,40,30); //car 
}

function car4(pos){
  ctx.drawImage(image,42,260,38,30,pos,352,38,30);//car
}

function car5(pos){
  ctx.drawImage(image,100,296,55,30,pos,317,55,30);//car
}

function mvCars(carfun,car,right){
  for(var i=0; i < 5; i++){
    carfun(car[i]);
    if(right){
      car[i]+=2;
      if(car[i] > 400)
        car[i] = -80;
    }
    else{
      car[i]-=2;
      if(car[i] < -60)
        car[i]=460;
    }
  }
}


function drawCars(){
  mvCars(car1,cars[0],false);
  mvCars(car2,cars[1],true);
  mvCars(car3,cars[2],false);
  mvCars(car4,cars[3],true);
  mvCars(car5,cars[4],false);
}

function frogOnLog(logpos,w,h){
  return (frogy == h && frogx >= logpos && frogx < logpos+w-20)
}

function Long(log,right,h){
  var startpos = frogx;
  ctx.drawImage(image,0,160,200,30,log[0],h,200,30);//log

  ctx.drawImage(image,0,160,200,30,log[1],h,200,30);//log

  ctx.drawImage(image,0,160,200,30,log[2],h,200,30);//log

  for(var i = 0; i < 3; i++){
    if(right){
      if(frogOnLog(log[i],176,h)) frogx+=3;
      log[i] += 3;
      if (log[i] > 600){
        log[i] = -200;
      }
    }
    else{
      if(frogOnLog(log[i],176,h)) frogx-=3;
      log[i] -= 3;
      if (log[i]+200 < -200){
        log[i] = 400;
      }
    }
  }
  if(h==frogy && startpos==frogx){
    dead();
  }

}

function Med(log,right,h){
  ctx.drawImage(image,0,190,130,30,log[0],h,130,30);
  
  ctx.drawImage(image,0,190,130,30,log[1],h,130,30);

  ctx.drawImage(image,0,190,130,30,log[2],h,130,30);

  for(var i = 0; i < 3; i++){
    if(right){
      if(frogOnLog(log[i],115,h)) frogx+=2;
      log[i] += 2;
      if (log[i] > 400){
        log[i] = -130;
      }
    }
    else{
      if(frogOnLog(log[i],115,h)) frogx-=2;
      log[i] -= 2;
      if (log[i]+130 < 0){
        log[i] = 400;
      }
    }
  }
}

function Short(log,right,h){
  ctx.drawImage(image,0,220,100,30,log[0],h,100,30);

  ctx.drawImage(image,0,220,100,30,log[1],h,100,30);

  ctx.drawImage(image,0,220,100,30,log[2],h,100,30);

  for(var i = 0; i < 3; i++){
    if(right){
      if(frogOnLog(log[i],84,h)) frogx++;
      log[i] ++;
      if (log[i] > 400){
        log[i] = -100;
      }
    }
    else{
      if(frogOnLog(log[i],84,h)) frogx--;
      log[i] --;
      if (log[i]+130 < 0){
        log[i] = 400;
      }
    }
  }

}

function drawLogs(){
  Short(logs[1],true,212);
  Short(logs[3],false,142);
  Med(logs[4],true,107);
  Med(logs[0],false,247);
  Long(logs[2],true,177);
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
