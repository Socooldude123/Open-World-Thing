let maxWoodDist = 200;
let maxStoneDist = 200;

class entity{ //im too tired to keep adding comments. its like 4 o klock in the morning
    constructor(x,y){
        this.x = x,
        this.y = y,
        this.Width = 17,
        this.Height = 37,
        this.velX = 0,
        this.velY = 0,
        this.name = names[Math.floor(Math.random() * names.length)],
        this.hovering = false,
        this.targetPosX = this.x + Math.random() * (200 - -200) -200,
        this.targetPosY = this.y + Math.random() * (200 - -200) -200,
        this.dest = undefined;
        this.AIState = 0,
        this.isTiming = false,
        this.drip = Math.floor(Math.random()* 3),
        this.job = "none",
        this.workStation = {x : undefined, y : undefined},
        this.inventory = {wood : 0, stone : 0}
    }

    updateAI(){
        let destRadius = 1;
        let hasGathered = false;
        let hasDeposited = false;

        if(this.job == "none"){
            if(this.targetPosX > this.x){
                this.velX = 1;
            }
            else if(this.targetPosX < this.x){
                this.velX = -1;
            }
            else{
                this.x = this.targetPosX;
            }

            if(this.targetPosY > this.y){
                this.velY = 1;
            }
            else if(this.targetPosY - 1 < this.y){
                this.velY = -1;
            }
            else{
                this.y = this.targetPosY;
            }

            if(this.x <= this.targetPosX + 5 &&
                this.x >= this.targetPosX -5 &&
                this.y <= this.targetPosY + 5 &&
                this.y >= this.targetPosY - 5
            ){
                this.targetPosX = this.x + Math.random() * (200 - -200) -200;
                this.targetPosY = this.y + Math.random() * (200 - -200) -200;
            }
        }
        else if(this.job == "lumberjack"){
            if(this.targetPosX > this.x){
                this.velX = 1;
            }
            else if(this.targetPosX < this.x){
                this.velX = -1;
            }
            else{
                this.x = this.targetPosX;
            }

            if(this.targetPosY > this.y){
                this.velY = 1;
            }
            else if(this.targetPosY - 1 < this.y){
                this.velY = -1;
            }
            else{
                this.y = this.targetPosY;
            }

            if(this.x <= this.workStation.x + destRadius &&
                this.x >= this.workStation.x - destRadius &&
                this.y <= this.workStation.y + destRadius &&
                this.y >= this.workStation.y - destRadius
            ){
                if(!hasDeposited){
                    for(let i = 0; i < rescourceArray.length; i++){

                        let a = rescourceArray[i].x - this.x; //distance between entity x and rescource x;
                        let b = rescourceArray[i].y - this.y; //distance between entity y and rescource y;
                        let c = Math.sqrt(a * a) + Math.sqrt(b *  b); //hypotenuse / distance between entity and rescource;

                        if(c <= maxWoodDist && rescourceArray[i].type == 38){
                            woodAmmount += this.inventory.wood;
                            this.inventory.wood = 0;
                            this.dest = i;
                            this.targetPosX = rescourceArray[i].x;
                            this.targetPosY = rescourceArray[i].y; 
                            hasGathered = false;
                            hasDeposited = true;
                            //break;
                        }
                        else if(i == rescourceArray.length - 1){
                            maxWoodDist+= 50;
                        }
                    }
                }
            }

            if(this.x <= this.targetPosX + destRadius &&
                this.x >= this.targetPosX - destRadius &&
                this.y <= this.targetPosY + destRadius &&
                this.y >= this.targetPosY - destRadius
            ){
                if(!hasGathered){
                    this.inventory.wood += Math.floor(Math.random() * (4 - 1 + 1) + 1);
                    this.targetPosX = this.workStation.x;
                    this.targetPosY = this.workStation.y;
                    rescourceArray.splice(this.dest,1);
                    addParticles(this.x + camera.x , this.y + camera.y , "#7e4700ff" , 8);
                    hasGathered = true;
                    hasDeposited = false
                }
            }
        }
        /*else if(this.job == "stoneminer"){
            if(this.targetPosX > this.x){
                this.velX = 1;
            }
            else if(this.targetPosX < this.x){
                this.velX = -1;
            }
            else{
                this.x = this.targetPosX;
            }

            if(this.targetPosY > this.y){
                this.velY = 1;
            }
            else if(this.targetPosY - 1 < this.y){
                this.velY = -1;
            }
            else{
                this.y = this.targetPosY;
            }

            if(this.x <= this.workStation.x + destRadius &&
                this.x >= this.workStation.x - destRadius &&
                this.y <= this.workStation.y + destRadius &&
                this.y >= this.workStation.y - destRadius
            ){
                if(!hasDeposited){
                    for(let i = 0; i < rescourceArray.length; i++){

                        let a = rescourceArray[i].x - this.x; //distance between entity x and rescource x;
                        let b = rescourceArray[i].y - this.y; //distance between entity y and rescource y;
                        let c = Math.sqrt(a * a) + Math.sqrt(b *  b); //hypotenuse / distance between entity and rescource;

                        if(c <= maxStoneDist && rescourceArray[i].type == 39){
                            stoneAmmount += this.inventory.stone;
                            this.inventory.stone = 0;
                            this.dest = i;
                            this.targetPosX = rescourceArray[i].x;
                            this.targetPosY = rescourceArray[i].y; 
                            hasGathered = false;
                            hasDeposited = true;
                            break;
                        }
                        else if(i == rescourceArray.length - 1){
                            maxDist+= 50;
                        }
                    }
                }
            }

            if(this.x <= this.targetPosX + destRadius &&
                this.x >= this.targetPosX - destRadius &&
                this.y <= this.targetPosY + destRadius &&
                this.y >= this.targetPosY - destRadius
            ){
                if(!hasGathered){
                    this.inventory.stone += Math.floor(Math.random() * (4 - 1 + 1) + 1);
                    this.targetPosX = this.workStation.x;
                    this.targetPosY = this.workStation.y;
                    rescourceArray.splice(this.dest,1);
                    addParticles(this.x + camera.x , this.y + camera.y , "#797979ff" , 15);
                    hasGathered = true;
                    hasDeposited = false
                }
            }
        }*/
    }

    Draw(){
        this.x += this.velX;
        this.y += this.velY;

        if(this.x >= camera.x - 17 &&
            this.x <= camera.x + board.width &&
            this.y >= camera.y - 37 &&
            this.y <= camera.y + board.height
        ){ 
            if(this.drip == 0){
                eCtx.drawImage(person1Img, this.x - camera.x,this.y - camera.y);
            }
            else if(this.drip == 1){
                eCtx.drawImage(person2Img, this.x - camera.x,this.y - camera.y);
            }
            else if(this.drip == 2){
                eCtx.drawImage(person3Img, this.x - camera.x,this.y - camera.y);
            }
        }
    }
}