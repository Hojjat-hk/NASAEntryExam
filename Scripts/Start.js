"use strict";

// [+] Defining Variables
const countdownBox    = $.querySelector(".cont-down");
const countdownValue  = $.querySelector(".cont-down__value");
const startBox        = $.querySelector(".start");
const startBoxButton  = $.querySelector(".start__button");
const targetCount     = 5;

// [+] Functions
function countdownHandler (targetCountx) { 
    countdownValue.innerHTML = targetCountx.toString();

    let intervalCountdown = setInterval(() => {
        if(targetCountx === 0){
            clearInterval(intervalCountdown);
            countdownBox.classList.remove("section--active");
            countdownValue.classList.remove("cont-down__value--active");
            startExam();
        }
        targetCountx -= 1;
        countdownValue.innerHTML = targetCountx.toString();
    }, 1200);
}

function renderCountdown(){
    startBox.classList.contains("section--active") && startBox.classList.remove("section--active");
    countdownBox.classList.contains("section--active") || countdownBox.classList.add("section--active");
    countdownValue.classList.add("cont-down__value--active");

    countdownHandler(targetCount);
}

// [+] Event Handeling
startBoxButton.addEventListener("click", renderCountdown);