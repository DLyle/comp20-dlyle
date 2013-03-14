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
var longx = [];
var medx = [];
var shortx = [];
var time;
var loglvl = [];
var whichLog = [];

function startGame(){
  var c = document.getElementById("game");
  ctx = c.getContext("2d");
  time = new Date();
  score = 0;
  level = 1;
  frogx = 185;
  frogy = 492;
  longx[0] = 30;
  longx[1] = 280;
  longx[2] = 530;
  shortx[0] = 30;
  shortx[1] = 180;
  shortx[2] = 330;
  medx[0] = 30;
  medx[1] = 180;
  medx[2] = 330;
  speed = 50;
  highscore = 0;
  lives = 3;
  whichLog[0] = Short;
  whichLog[1] = Med;
  whichLog[2] = Long;
  image = new Image();
  image.src = "assets/frogger_sprites.png";
  setInterval(drawBoard,speed);
  document.addEventListener("keydown",function(event){
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
  });
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

function drawCars(){
  ctx.drawImage(image,76,260,40,30,100,457,40,30); //car 
  ctx.drawImage(image,8,296,30,30,100,422,30,30); //car 
  ctx.drawImage(image,0,260,40,30,100,387,40,30); //car 
  ctx.drawImage(image,42,260,38,30,100,352,38,30);//car
  ctx.drawImage(image,100,296,55,30,100,317,55,30);//car
}

function Long(){
  ctx.drawImage(image,0,160,200,30,longx[0],178,200,30);//log
  longx[0]+=3;
  if(longx[0] > 600){
    longx[0] = -200;
  }
  ctx.drawImage(image,0,160,200,30,longx[1],178,200,30);//log
  longx[1]+=3;
  if(longx[1] > 600){
    longx[1] = -200;
  }
  ctx.drawImage(image,0,160,200,30,longx[2],178,200,30);//log
  longx[2]+=3;
  if(longx[2] > 600){
    longx[2] = -200;
  }
}

function Med(){
  ctx.drawImage(image,0,190,130,30,medx[0],107,130,30);
  medx[0] += 2;
  if(medx[0] > 400){
    medx[0] = -130;
  }
  ctx.drawImage(image,0,190,130,30,medx[1],107,130,30);
  medx[1] += 2;
  if(medx[1] > 400){
    medx[1] = -130;
  }
  ctx.drawImage(image,0,190,130,30,medx[2],107,130,30);
  medx[2] += 2;
  if(medx[2] > 400){
    medx[2] = -130;
  }
}

function Short(){
  ctx.drawImage(image,0,220,100,30,shortx[0],209,100,30);
  shortx[0] ++;
  if(shortx[0] > 400){
    shortx[0] = -100;
  }
  ctx.drawImage(image,0,220,100,30,shortx[1],209,100,30);
  shortx[1] ++;
  if(shortx[1] > 400){
    shortx[1] = -100;
  }
  ctx.drawImage(image,0,220,100,30,shortx[2],209,100,30);
  shortx[2] ++;
  if(shortx[2] > 400){
    shortx[2] = -100;
  }
}

function drawLogs(){
  whichLog[0]();
  whichLog[1]();
  whichLog[2]();
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
