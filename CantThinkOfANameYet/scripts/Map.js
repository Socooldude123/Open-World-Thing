const board = document.getElementById("map"); //gets the HTML canvas element
const ctx = board.getContext("2d"); //gets context for the canvas element
//sets width and height of the HTML canvas element
board.height = window.innerHeight; 
board.width = window.innerWidth;

let fps = 60; //sets the framerate of the game

let mapSize = 400; //sets the map size

setInterval(update, 1000/fps); //calls the updates function every frame 

let mapArray = [];

//creates a grid of grass tiles
for(let j = -mapSize/2; j <= mapSize/2; j++){
  for (let i = -mapSize/2; i <= mapSize/2; i++){
    mapArray.push( { x : i * 50 , y : j * 50 , type : Math.floor(Math.random() * 4) });
}} 

let currentTile = mapArray.filter(obj => obj.x == camera.x && obj.y == camera.y);

function update(){

  //draws a grey background
  ctx.fillStyle = "#a0a0a0ff";
  ctx.fillRect(0,0,board.width,board.height);

  //repeats for every tile on the mapArray
  for(let i = 0; i <= mapArray.length; i++){
    //checks if the tile is on screen, if not it doesnt draw it to reduce lag
    if(mapArray[i].x >= camera.x - 50 &&
      mapArray[i].x <= camera.x + board.width &&
      mapArray[i].y >= camera.y - 50 &&
      mapArray[i].y <= camera.y + board.height
    ){ 
      //checks the type of grass and draws a different image for each type to add variation to the ground
      if(mapArray[i].type == 0){
        ctx.drawImage(grass1Img,mapArray[i].x - camera.x, mapArray[i].y - camera.y);
      }
      else if(mapArray[i].type == 1){
        ctx.drawImage(grass2Img,mapArray[i].x - camera.x, mapArray[i].y - camera.y);
      }
      else if(mapArray[i].type == 2){
        ctx.drawImage(grass3Img,mapArray[i].x - camera.x, mapArray[i].y - camera.y);
      }
      else if(mapArray[i].type == 3){
        ctx.drawImage(grass4Img,mapArray[i].x - camera.x, mapArray[i].y - camera.y);
      }
    }
  } 
}