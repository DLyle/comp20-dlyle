// Your work goes here...
var score;
var level;
var frogx;
var frogy;
var highscore;
var lives;

function start_game(){
  var c = document.getElementById("game");
  var ctx = c.getContext("2d");

  score = 0;
  level = 1;
  frogx = 185;
  frogy = 492;
  highscore = 0;
  lives = 3;
  
  ctx.fillStyle = "#191970";
  ctx.fillRect(2,2,396,280);
  ctx.fillStyle = "#000000";
  ctx.fillRect(2,285,396,279);
  
  var image = new Image();
  image.src = "assets/frogger_sprites.png";
  ctx.drawImage(image,0,0,396,50,2,2,396,50); //FROGGER
  ctx.drawImage(image,0,50,396,60,2,50,396,60); //Grass
  ctx.drawImage(image,0,115,396,45,2,270,396,45);//upper roadside
  ctx.drawImage(image,0,115,396,45,2,490,396,45);//lower roadside
  ctx.drawImage(image,0,160,200,30,30,210,200,30);//log
  ctx.drawImage(image,0,260,40,30,100,380,40,30); //car 
  ctx.drawImage(image,42,260,38,30,300,420,38,30);//car
  ctx.drawImage(image,8,360,30,30,frogx,frogy,30,30);//frog
  ctx.drawImage(image,8,330,30,30,0,523,30,30); //lives
  ctx.drawImage(image,8,330,30,30,20,523,30,30);
  ctx.drawImage(image,8,330,30,30,40,523,30,30);

  ctx.fillStyle="#00ff00";
  ctx.font= "Bold 18pt Arial";
  ctx.fillText("Level " + level,70,548);
  ctx.font= "Bold 10pt Arial";
  ctx.fillText("Score: " + score,2,560);
  ctx.fillText("Highscore: " + highscore,80,560);
}
