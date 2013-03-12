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
var logx;
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
  logx = 30;
  highscore = 0;
  lives = 3;
  for(var i = 0; i < 5; i++){ 
    loglvl[i] = 110+30*i;
    console.log(loglvl[i]);
  }
  whichLog[0] = Short;
  whichLog[1] = Med;
  whichLog[2] = Long;
  image = new Image();
  image.src = "assets/frogger_sprites.png";
  drawBoard();
  playGame();
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
  ctx.drawImage(image,0,260,40,30,100,380,40,30); //car 
  ctx.drawImage(image,42,260,38,30,300,420,38,30);//car
}

function Long(lvl){
  ctx.drawImage(image,0,160,200,30,30,loglvl[lvl],200,30);//log
}

function Med(lvl){
  ctx.drawImage(image,0,190,130,30,30,loglvl[lvl],130,30);
}

function Short(lvl){
  ctx.drawImage(image,0,220,100,30,30,loglvl[lvl],100,30);
}

function drawLogs(){
  whichLog[2](0);
  ctx.drawImage(image,0,220,100,30,logx,loglvl[3],100,30);
  ctx.drawImage(image,0,220,100,30,logx,loglvl[4],100,30);
}

function drawBackground(){
  ctx.fillStyle = "#191970";
  ctx.fillRect(2,2,396,280);
  ctx.fillStyle = "#000000";
  ctx.fillRect(2,285,396,279);

  ctx.drawImage(image,0,0,396,50,2,2,396,50); //FROGGER
  ctx.drawImage(image,0,50,396,60,2,50,396,60); //Grass
  ctx.drawImage(image,0,115,396,45,2,270,396,45);//upper roadside
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
