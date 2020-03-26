const timerEl = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen")
const startBtn = document.getElementById("start-btn");
const aButton = document.getElementById("a");
const bButton = document.getElementById("b");
const cButton = document.getElementById("c");
const dButton = document.getElementById("d");
const questionEl = document.getElementById("question-el")
var time = 5

var questions = {
    q1: {
        question: "How much USD does a NASA space suit cost?",
        answerA: "100000",
        answerB: "100000",
        answerC: "100000",
        answerD: "100000"
    }
}

startBtn.addEventListener("click", function () {
    startScreen.classList.add("hide");
    startTime();
    showQuestion();
});

aButton.addEventListener("click", function (event) {
});


function startTime() {
    timerEl.textContent = "Time: " + time + "s"
    var timer = setInterval(() => {
        time--
        console.log(time);
        if (time === 0) {
            clearInterval(timer)
            clearTimer();
        }
    }, 1000);
}

function showQuestion () {
        quizScreen.classList.toggle("hide");

}

clearTimer = () => {
    timerEl.textContent = "Time: "
}