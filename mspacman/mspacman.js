function start_game(){
var c = document.getElementById("game");
var ctx = c.getContext("2d");
var image = new Image();
image.src = "pacman10-hp-sprite.png";
ctx.drawImage(image,320,0,466,138,0,0,466,138);
ctx.drawImage(image,80,20,20,20,100,4,20,20);
ctx.drawImage(image,20,80,20,20,116,50,20,20);
}

