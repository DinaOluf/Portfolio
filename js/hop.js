const hopGame = document.getElementById("hopGame")
const hopper = document.getElementById("hopper");
const hopperImg = document.getElementById("hopperImg");
const rock1 = document.getElementById("rock1");
const rock2 = document.getElementById("rock2");
const rock3 = document.getElementById("rock3");
const overlay = document.getElementById("overlay");
const score = document.getElementById("score");
const hiScore = document.getElementById("hiScore");
const localHiScore = localStorage.getItem("hiScore");

let spawner;
let isPaused = true;
let timeScore = 0;

if(localHiScore > hiScore.innerHTML){
    hiScore.innerHTML = localHiScore;
}

if(overlay.className === "show-overlay"){
    document.addEventListener("keydown", function (e) {
        overlay.className = "hide-overlay"; 
        hopGame.style.animationPlayState = 'running';
        isPaused = false;
    });
}

const rockSpawner = setInterval(function()  {
    if(!isPaused){
        let number = random([1, 2, 3]);
       
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
}, 2000);

const setScore = setInterval(function() {
    if(!isPaused) {
        timeScore++;
        score.innerHTML = timeScore;
    }
}, 100);

function random(numbers) {
    return numbers[Math.floor(Math.random()*numbers.length)];
}

function pauseGame() {
    isPaused = true;
    overlay.className = "show-overlay";
    overlay.innerHTML = `<div>GAME OVER!</div><div>Score: ${score.innerHTML}</div><div>Press any key to start again</div>`;
    hopGame.style.animationPlayState = 'paused';
    rock1.style.animationPlayState = "paused";
    rock2.style.animationPlayState = "paused";
    rock3.style.animationPlayState = "paused";
    rock1.className.remove = "slide";
    rock2.className.remove = "slide";
    rock3.className.remove = "slide";

    if(Number(hiScore.innerHTML) < Number(score.innerHTML)) {
        hiScore.innerHTML = score.innerHTML;
    } 
    if (Number(hiScore.innerHTML) > Number(localHiScore)) {
        localStorage.setItem("hiScore", hiScore.innerHTML);
    }

    timeScore = 0;
}


function jump() {
    if (hopper.classList != "jump") {
    hopper.classList.add("jump");
    hopperImg.src = "../images/hop/hopper2.png";

    setTimeout(function () {
        hopper.classList.remove("jump");
        hopperImg.src = "../images/hop/hopper1.png";
    }, 1000);
    }
}

const watchCollision = setInterval(function () {
    let hopperBottom = parseInt(window.getComputedStyle(hopper).getPropertyValue("bottom")); 
    let rock1Left = parseInt(window.getComputedStyle(rock1).getPropertyValue("left"));
    let rock2Left = parseInt(window.getComputedStyle(rock2).getPropertyValue("left"));
    let rock3Left = parseInt(window.getComputedStyle(rock3).getPropertyValue("left"));

    if (rock1Left < 140 && rock1Left > 100 && hopperBottom <= 90) {
        isPaused = true;
        pauseGame();
    }

    if (rock2Left < 130 && rock1Left > 100 && hopperBottom <= 70) {
        isPaused = true;
        pauseGame();
    }

    if (rock3Left < 150 && rock1Left > 100 && hopperBottom <= 100) {
        isPaused = true;
        pauseGame();
    }
}, 10);

const runningAnimation = setInterval(function () {
    if(!isPaused && hopper.className !== "jump"){
        hopperImg.src = "../images/hop/hopper2.png";
        setTimeout(() => {
            hopperImg.src = "../images/hop/hopper1.png";
        }, 500)
    }
}, 1000)


document.addEventListener("keydown", function (e) {
    jump();
});