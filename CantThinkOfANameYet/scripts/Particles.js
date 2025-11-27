const particles = document.getElementById("particles");
const pCtx = particles.getContext("2d");
particles.height = window.innerHeight;
particles.width = window.innerWidth; 

setInterval(update, 1000/fps);

let particleArray = [];

function update(){
    pCtx.clearRect(0,0,board.width,board.height); //clears the canvas.

    //repeats for every particle in the particleArray
    for(let i = 0; i <= particleArray.length; i++){
        //checks if the particle is on screen, if not doesnt draw it
        if(particleArray[i].x >= camera.x - particleArray[i].size &&
          particleArray[i].x <= camera.x + board.width &&
          particleArray[i].y >= camera.y - particleArray[i].size &&
         particleArray[i].y <= camera.y + board.height
        ){ 
         //sets the velocity if the particle
         particleArray[i].x += particleArray[i].velX;
         particleArray[i].y += particleArray[i].velY;
         //sets the color of the particle
         pCtx.fillStyle = particleArray[i].color;
         //draws the particle
         pCtx.fillRect(particleArray[i].x - camera.x, particleArray[i].y - camera.y, particleArray[i].size, particleArray[i].size);
         //decreases the particles size by 1
         particleArray[i].size -= Math.random() * (1 - 0.05 + 1) + 0.05;
         //checks if the particle size is less than or equal to 0
         if(particleArray[i].size <= 0){
            //slimes the particle out
            particleArray.splice(i,1);
         }
        }
    }

}

//function to create particles
function addParticles(x,y,color, ammount){
    //repeats for every particle created
    for(let i = 0; i <= ammount-1; i++){
        //creates a new particle to the particleArray
        particleArray.push({
            x : x + Math.random() * (25 - -25 + 1) + -25 ,
            y : y + Math.random() * (25 - -25 + 1) + -25,
            velY : Math.random() * (1 - -1 + 1) -1,
            velX : Math.random() * (1 - -1 + 1) -1 ,
            size : 15,
            color : color 
        });
    }
}