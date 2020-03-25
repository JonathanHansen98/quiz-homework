const timerEl = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen")
const startBtn = document.getElementById("start-btn");
var time = 5

startBtn.addEventListener("click", function () {
    startScreen.classList.add("hide");
    quizScreen.classList.toggle("hide");
    startTime();
});


function startTime(params) {
   var timer = setInterval(() => {
        timerEl.textContent = "Time: " + time +"s"
        time--   
        if (time === 0) {
        clearInterval(timer)
        clearTimer();
    }
    }, 1000); 
}

clearTimer = () => {
    timerEl.textContent = "Time: "
}