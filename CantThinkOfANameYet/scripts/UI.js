const UI = document.getElementById("UI");
const UIctx = UI.getContext("2d");
UI.height = window.innerHeight;
UI.width = window.innerWidth; 

setInterval(update, 1000/fps);

//runs every frame
function update(){
    UIctx.clearRect(0,0,board.width,board.height); //clears the canvas

    for(var i = 0; i <= entetiesArray.length - 1; i++){
        if(entetiesArray[i].hovering){
            UIctx.fillStyle = "black";
            UIctx.fillText(entetiesArray[i].name,(entetiesArray[i].x - 20) - camera.x,(entetiesArray[i].y - 12) - camera.y);
            UIctx.fillText(entetiesArray[i].job,(entetiesArray[i].x - 20) - camera.x,(entetiesArray[i].y - 30) - camera.y);
        }
    }

    if(!canAfford){
    UIctx.font = "40px sans-serif";
    UIctx.fillStyle = "#8b0000ff";
    UIctx.fillText("You need " + cost.wood + " Wood and " + cost.stone + " Stone to place this!",10,UI.height - 50);
    }

    UIctx.fillStyle = "rgba(48, 48, 48, 0.87)";
    UIctx.fillRect(0,0,200,100);

    UIctx.fillStyle = "#000000ff"; //sets the font color to black

    UIctx.font = "40px sans-serif"; //sets the font size and type
    UIctx.fillText("Stone: " + stoneAmmount, 10 , 40); //draws text

    UIctx.fillText("Wood: " + woodAmmount, 10 , 80); //draws text

    UIctx.font = "20px sans-serif"; //sets font size to 20 and keeps the same font family
    //draws the instructions at the bottom of the screen
    UIctx.fillText("drag to move camera/veiw. right click to break/kill. press 1 to spawn a house with a person in it. (game version: a LONG way from finished) " + "World coordinates: (" + mouse.x/50 + "," + mouse.y/50 + ")", 20,UI.height - 10,window.innerWidth - 50);
}
