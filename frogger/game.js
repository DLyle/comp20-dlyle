// Your work goes here...

function start_game(){
  var c = document.getElementById("game");
  var ctx = c.getContext("2d");
  
  ctx.fillStyle = "#191970";
  ctx.fillRect(2,2,396,280);
  ctx.fillStyle = "#000000";
  ctx.fillRect(2,285,396,279);
  
  var image = new Image();
  image.src = "assets/frogger_sprites.png";
  ctx.drawImage(image,0,0,396,50,2,2,396,50);
  ctx.drawImage(image,0,50,396,60,2,50,396,60);
  ctx.drawImage(image,0,115,396,45,2,270,396,45);
  ctx.drawImage(image,0,115,396,45,2,490,396,45);
  ctx.drawImage(image,0,160,200,30,30,210,200,30);
  ctx.drawImage(image,0,260,40,30,100,380,40,30);
  ctx.drawImage(image,42,260,38,30,300,420,38,30);
  ctx.drawImage(image,8,360,30,30,185,492,30,30);
  ctx.fillStyle="#00ff00";
  ctx.font= "Bold 18pt Arial";
  ctx.fillText("Level",50,548);
  ctx.font= "Bold 10pt Arial";
  ctx.fillText("Score: ",2,560);
  ctx.fillText("Highscore: ",70,560);
}
