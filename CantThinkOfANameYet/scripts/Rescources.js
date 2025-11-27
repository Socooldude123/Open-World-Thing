const tiles = document.getElementById("tiles");
const tilesCtx = tiles.getContext("2d");
tiles.height = window.innerHeight;
tiles.width = window.innerWidth;

setInterval(update, 1000/fps);

let rescourceArray = [];

let stoneAmmount = 103;
let woodAmmount = 105;

  //creates a rescource to the rescourceArray
for(let j = -mapSize/2; j <= mapSize/2; j++){
  for (let i = -mapSize/2; i <= mapSize/2; i++){
    let type = Math.floor(Math.random() * 40)
    if(type >= 38){
    rescourceArray.push( { x : i * 50 , y : j * 50 , type : type });
    }
  }
} 

/*for(let i = 0; i < rescourceArray.length; i++){
  if(rescourceArray[i].type < 38){
      rescourceArray.splice(i,1);
  }
}*/

//checks if the player pressed the right mouse button
document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); //prevents the context menu fron appearing

  //repeats fro every rescource in the array
  for(let i = 0; i <= rescourceArray.length; i++){
    //checks if the player is clicking on a rescource
    if(mouse.x == rescourceArray[i].x &&  
      mouse.y == rescourceArray[i].y){
        //checks if the rescource the player clicked on is stone
        if(rescourceArray[i].type == 39){
          rescourceArray.splice(i,1);
          i--;
          let j = Math.floor(Math.random() * (4 - 1 + 1) + 1);
          stoneAmmount+= j;
          addParticles(event.clientX + camera.x , event.clientY + camera.y , "#797979ff" , j + 1 * 3);
        }
        //checks if its wood
        else if(rescourceArray[i].type == 38){
          rescourceArray.splice(i,1);
          i--;
          let j = Math.floor(Math.random() * (4 - 1 + 1) + 1);
          woodAmmount+= j;
          addParticles(event.clientX + camera.x , event.clientY + camera.y , "#7e4700ff" , j * 2);
        }
    }
  }
}); 


function update(){
  tilesCtx.clearRect(0,0,board.width,board.height);

  //repeats for every rescource in the array
  for(let i = 0; i <= rescourceArray.length; i++){
    //checks if the tile in on the screen. if not doesnt draw it
    if(rescourceArray[i].x >= camera.x - 50 &&
      rescourceArray[i].x <= camera.x + board.width &&
      rescourceArray[i].y >= camera.y - 50 &&
      rescourceArray[i].y <= camera.y + board.height
    ){ 
      //checks if the tile is stone
      if(rescourceArray[i].type == 39){
        //draws the stone
        tilesCtx.drawImage(stoneImg,rescourceArray[i].x - camera.x, rescourceArray[i].y - camera.y);
      }
      //checks if its wood
      else if(rescourceArray[i].type == 38){
        //draws the wood
        tilesCtx.drawImage(treeImg,rescourceArray[i].x - camera.x, rescourceArray[i].y - camera.y);
      }
    }
  } 
}