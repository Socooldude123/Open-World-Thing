const enteties = document.getElementById("enteties");
const eCtx = enteties.getContext("2d");
enteties.height = window.innerHeight; 
enteties.width = window.innerWidth;

setInterval(update, 1000/fps);

let entetiesArray = [];
let names = [ "Freaky Fred", "Zesty Zack", "Kurt Cobain", "Jorkin Joe", "Joe FARTalozi", "Domer", "khaby Lame Mechanism",
    "Jimi Hendrix", "Wobbly Wilbur", "Goofy Gus", "Spicy Spencer", "Nuttin Norris", "Quirky Quincy", "Wacky Winston", 
    "Silly Sam", "Funky Felix", "Perc Pete", "Acid Aaron", "Heroin Hank", "Weed Bilbur", "Lean Linda", "Fent Felix",
    "Black Tar Terry", "Femboy Frank", "Joey Jordison", "David Bowie", "John Lennon", "Freddie Mercury", "Ozzy Osbourne",
    "Fred The Pred", "Homosexual Hank", "Sexy Sean", "Evil Eric", "Ngl This Game Kinda Sucks Fr", "Neck Hurt",
    "Knee Guard" 
];

//checks if you are clicking the right mouse
document.addEventListener("contextmenu", (event) => {
    //prevents the default right click menu
    event.preventDefault();

    //repeats for every entity in the array
    for(let i = 0; i <= entetiesArray.length - 1;i++){
        //checks if the mouse is above the entiy
        if(event.clientX + camera.x >= entetiesArray[i].x &&
            event.clientX + camera.x <= entetiesArray[i].x + 17 &&
            event.clientY + camera.y <= entetiesArray[i].y + 37 &&
            event.clientY + camera.y >= entetiesArray[i].y
        ){
            //deletes the entiy and creates particles
            entetiesArray.splice(i,1);
            addParticles(event.clientX + camera.x,event.clientY + camera.y,"#c20000ff",10);
        }
    }
});

//checks if the mouse moved
document.addEventListener("mousemove", (event) =>{
    //repeats for every entiy in the array
    for(let i = 0; i <= entetiesArray.length - 1;i++){
        if(event.clientX + camera.x >= entetiesArray[i].x &&
            event.clientX + camera.x <= entetiesArray[i].x + 17 &&
            event.clientY + camera.y <= entetiesArray[i].y + 37 &&
            event.clientY + camera.y >= entetiesArray[i].y
        ){
            //if the mouse is hovering over the entiy, then tell the UI script to display the name and job
            entetiesArray[i].hovering = true;
        }
        else{
            //if not, tell the UI script to not display the name and job
            entetiesArray[i].hovering = false;
        }
    }
});


//repeats every frame
function update(){
    //clears the frame
    eCtx.clearRect(0,0,buildings.width,buildings.height);

    //repeats for every entity in the array
    for(var i = 0; i <= entetiesArray.length;i++){
        //calls the updateAI and Draw functions from the Entity Class
        entetiesArray[i].updateAI();
        entetiesArray[i].Draw();
    }
}