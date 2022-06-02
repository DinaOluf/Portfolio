
const profile = document.querySelector(".profile");
const projectCard = document.querySelectorAll(".project-card");

const circle1 = document.querySelector(".circle-1");
const circle2 = document.querySelector(".circle-2");

profile.addEventListener("mouseenter", function() {
    profile.style.animation = "0.2s forwards 1 maximize";
    circle1.style.animation = "0.2s forwards 1 maximize";
});

profile.addEventListener("mouseleave", function() {
    profile.style.animation = "0.2s forwards 1 minimize";
    circle1.style.animation = "0.2s forwards 1 minimize";
});

projectCard.forEach(function(card) {
    card.addEventListener("mouseenter", function(e){
        e.target.style.animation = "0.2s forwards 1 maximize";
        circle2.style.animation = "0.2s forwards 1 maximize";
    });

    card.addEventListener("mouseleave", function(e){
        e.target.style.animation = "0.2s forwards 1 minimize";
        circle2.style.animation = "0.2s forwards 1 minimize";
    });
});

