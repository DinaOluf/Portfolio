const hopGame = document.getElementById("hopGame")
const hopper = document.getElementById("hopper");
const rock1 = document.getElementById("rock1");
const rock2 = document.getElementById("rock2");
const rock3 = document.getElementById("rock3");
const overlay = document.getElementById("overlay");
const score = document.getElementById("score");
const hiScore = document.getElementById("hiScore");
const localHiScore = localStorage.getItem("hiScore");

let spawner;

if(localHiScore > hiScore.innerHTML){
    hiScore.innerHTML = localHiScore;
}

if(overlay.className === "show-overlay"){
    document.addEventListener("keydown", function (e) {
        overlay.className = "hide-overlay"; 
        hopGame.style.animationPlayState = 'running';
        handleIntervals();
    });
}

function handleIntervals() {
    // Will execute rockSpawner every 2 seconds 
    clearInterval(spawner);
    if(overlay.className === "hide-overlay"){
        spawner = setInterval(rockSpawner, 2000);
    }
}

function rockSpawner() {
    let number = random([1, 2, 3]);

    console.log(number)
   
    if(number === 1 && rock1.className !== "slide"){
       rock1.className = "slide";
       rock1.style.animationPlayState = "running";
       setTimeout(() => {
           rock1.classList.remove("slide");
       }, 3000)
    }
   
    if(number === 2 && rock2.className !== "slide"){
       rock2.className = "slide";
       rock2.style.animationPlayState = "running";
       setTimeout(() => {
           rock2.classList.remove("slide");
       }, 3000)
    }
   
    if(number === 3 && rock3.className !== "slide"){
       rock3.className = "slide";
       rock3.style.animationPlayState = "running";
       setTimeout(() => {
           rock3.classList.remove("slide");
       }, 3000)
    }
}

function random(numbers) {
    return numbers[Math.floor(Math.random()*numbers.length)];
}

function showOverlay() {
    overlay.className = "show-overlay";
    overlay.innerHTML = "<div>THE END!</div><div>Press any key to start again</div>";
    handleIntervals();
    rock1.style.animationPlayState = "paused";
    rock1.className.remove = "slide";
    rock2.style.animationPlayState = "paused";
    rock2.className.remove = "slide";
    rock3.style.animationPlayState = "paused";
    rock3.className.remove = "slide";
    hopGame.style.animationPlayState = 'paused';

    if(hiScore.innerHTML < score.innerHTML) {
        hiScore.innerHTML = score.innerHTML;
        localStorage.setItem("hiScore", hiScore.innerHTML);
    }
}


function jump() {
    if (hopper.classList != "jump") {
    hopper.classList.add("jump");

    setTimeout(function () {
        hopper.classList.remove("jump");
    }, 1000);
    }
}

setInterval(function () {
    // get current hopper Y position
    let hopperBottom = parseInt(window.getComputedStyle(hopper).getPropertyValue("bottom")); 

    // get current rock X position
    let rock1Left = parseInt(window.getComputedStyle(rock1).getPropertyValue("left"));
    let rock2Left = parseInt(window.getComputedStyle(rock2).getPropertyValue("left"));
    let rock3Left = parseInt(window.getComputedStyle(rock3).getPropertyValue("left"));

//   console.log(hopperBottom);
//   console.log(rock1Left);

//   // detect collision
    if (rock1Left < 140 && rock1Left > 80 && hopperBottom <= 100) {
        showOverlay();
    }

    if (rock2Left < 140 && rock1Left > 80 && hopperBottom <= 80) {
        showOverlay();
    }

    if (rock3Left < 140 && rock1Left > 80 && hopperBottom <= 110) {
        showOverlay();
    }
}, 10);


document.addEventListener("keydown", function (e) {
    jump();
    handleIntervals();
});