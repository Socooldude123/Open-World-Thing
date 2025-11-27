const buildings = document.getElementById("buildings");
const bCtx = buildings.getContext("2d");
buildings.height = window.innerHeight; 
buildings.width = window.innerWidth;

setInterval(update, 1000/fps);

let buildingsArray = [];

//variables to check if you can afford to place a tile and the cost
let canAfford = true;
let cost = {wood : undefined, stone : undefined};

document.addEventListener("keydown", (event) => {
    let occupied = false;

    for(let i = 0; i < buildingsArray.length; i++){
        if(buildingsArray[i].x == mouse.x &&
            buildingsArray[i].y == mouse.y
        ){
            occupied = true;
            break;
        }
        else{
            occupied = false;
        }
    }

    for(let i = 0; i < rescourceArray.length; i++){
        if(rescourceArray[i].x == mouse.x &&
            rescourceArray[i].y == mouse.y
        ){
            occupied = true;
            break;
        }
        else{
            occupied = false;
        }
    }

    if(!occupied){
        switch(event.key){
            //checks if you are pressing the "1" key
            case "1" : 
                //checks if you can afford to place the tile
                if(woodAmmount >= 5 && stoneAmmount >= 3){
                    //pushes a tile with the id 0 (house) to the array
                    buildingsArray.push({x : mouse.x, y : mouse.y, type : 0});
                    //takes away the cost of the building
                    stoneAmmount -= 3;
                    woodAmmount -= 5;
                    //creates an npc
                    entetiesArray.push(new entity(mouse.x,mouse.y));
                }
                else{
                    //if you cant afford the tile, then it tells the UI script to display that you cant
                    //afford it and tells the script what it costs
                    canAfford = false;
                    cost.wood = 5;
                    cost.stone = 3;
                    //sets a timeout so that the UI script only shows the text for 1 second
                    setTimeout(ts,1000);
                }       
            break;

            //checks if you are pressing the "2" key
            case "2" : 
                    //checks if you can afford a lumberjack station
                    if(woodAmmount >= 100 && stoneAmmount >= 0){
                        //creates a tile with the id "1" (jumberjack station)
                        buildingsArray.push({x : mouse.x, y : mouse.y, type : 1});
                        //takes away the cost of the tile
                        stoneAmmount -= 0;
                        woodAmmount -= 100;
                        //repeats for every entity in the array
                        for(i = 0; i <= entetiesArray.length; i++){
                            //sets a 1-ammount of entities chance
                            let chance = Math.floor(Math.random() * entetiesArray.length);
                            //checks if the entity has been selected
                            if(chance == 0 && entetiesArray[i].job == "none"){
                                //sets the entities job to "lumberjack", teleports it to the work station, 
                                // and sets the location of the work station
                                entetiesArray[i].job = "lumberjack";
                                entetiesArray[i].x = mouse.x;
                                entetiesArray[i].y = mouse.y;
                                entetiesArray[i].workStation.x = mouse.x;
                                entetiesArray[i].workStation.y = mouse.y;
                                //breaks so that it doesnt pick mor than one lumberjack
                                break;
                            }
                            else {
                                continue;
                            }
                        }
                    }
                    else{
                        //if you cant afford the tile, then it tells the UI script to display that you cant afford
                        //it and tells the script what it costs
                        canAfford = false;
                        cost.wood = 100;
                        cost.stone = 0;
                        //sets a timeout so that the UI script only shows the text for 1 second
                        setTimeout(ts,1000);
                    } 
            break;

            case "3" : 
                    //checks if you can afford a lumberjack station
                    if(woodAmmount >= 0 && stoneAmmount >= 100){
                        //creates a tile with the id "1" (jumberjack station)
                        buildingsArray.push({x : mouse.x, y : mouse.y, type : 2});
                        //takes away the cost of the tile
                        stoneAmmount -= 100;
                        woodAmmount -= 0;
                        //repeats for every entity in the array
                        for(i = 0; i <= entetiesArray.length; i++){
                            //sets a 1-ammount of entities chance
                            let chance = Math.floor(Math.random() * entetiesArray.length);
                            //checks if the entity has been selected
                            if(chance == 0 && entetiesArray[i].job == "none"){
                                //sets the entities job to "lumberjack", teleports it to the work station, 
                                // and sets the location of the work station
                                entetiesArray[i].job = "stoneminer";
                                entetiesArray[i].x = mouse.x;
                                entetiesArray[i].y = mouse.y;
                                entetiesArray[i].workStation.x = mouse.x;
                                entetiesArray[i].workStation.y = mouse.y;
                                //breaks so that it doesnt pick more than one lumberjack
                                break;
                            }
                            else {
                                continue;
                            }
                        }
                    }
                    else{
                        //if you cant afford the tile, then it tells the UI script to display that you cant afford
                        //it and tells the script what it costs
                        canAfford = false;
                        cost.wood = 0;
                        cost.stone = 100;
                        //sets a timeout so that the UI script only shows the text for 1 second
                        setTimeout(ts,1000);
                    } 
            break;
        }
    }

    //repeats for every tile in the buildings array
    for(let i = 0; i <= buildingsArray.length;i++){
        //checks if you are pressing the "0" key and if you are hovering over a tile
        if(event.key == "0" &&
            mouse.x == buildingsArray[i].x &&
            mouse.y == buildingsArray[i].y
        ){
            //deletes the tile
            buildingsArray.splice(i,1);
        }
    }
});

function update(){
    //clears the layer/canvas
    bCtx.clearRect(0,0,buildings.width,buildings.height);

    //repeats for every tile in the building array
    for(let i = 0; i <= buildingsArray.length;i++){
        //checks the buildings id and draws an image according to the id
        if(buildingsArray[i].type == 0){
            bCtx.drawImage(house1Img, buildingsArray[i].x - camera.x,buildingsArray[i].y - camera.y);
        }
        else if(buildingsArray[i].type == 1){
            bCtx.drawImage(woodWorkImg, buildingsArray[i].x - camera.x,buildingsArray[i].y - camera.y);
        }
        else if(buildingsArray[i].type == 2){
            bCtx.drawImage(stoneWorkImg, buildingsArray[i].x - camera.x,buildingsArray[i].y - camera.y);
        }
    }

}

//after the timeout ends, tells the UI script to stop drawing the "You can't afford that" text
function ts(){
    canAfford = true;
}