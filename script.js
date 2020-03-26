const timerEl = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const scoreScreen = document.getElementById("score-screen");
const scoreLabel = document.getElementById("score-label")
const scoreEl = document.getElementById("score")
const codeBtn = document.getElementById("code-btn")
const startBtn = document.getElementById("start-btn");
const aButton = document.getElementById("a");
const bButton = document.getElementById("b");
const cButton = document.getElementById("c");
const dButton = document.getElementById("d");
const questionEl = document.getElementById("question-el");
const answerAel = document.getElementById("answerA-el");
const answerBel = document.getElementById("answerB-el");
const answerCel = document.getElementById("answerC-el");
const answerDel = document.getElementById("answerD-el");
const answerButtons = document.getElementsByClassName("ansr-btns");
window.localStorage.getItem("score")
var time = 90;
var questionIndex = 0;

var questions = [
    {
        question: "How much USD does a NASA space suit cost?",
        answerA: "A. $500,000",
        answerB: "B. $1,500,000",
        answerC: "C. $12,000,000",
        answerD: "D. $10,000,000",
        correct: "C. $12,000,000"
    },
    {
        question: "How many earth years does it take for Saturn to orbit the Sun?",
        answerA: "A. 29.4 years",
        answerB: "B. 10.9 years",
        answerC: "C. 25 years",
        answerD: "D. 5 years",
        correct: "A. 29.4 years"
    },
    {
        question: "With the exception of Earth, which of these planets would be most hospitable to life?",
        answerA: "A. Mercury",
        answerB: "B. Saturn",
        answerC: "C. Venus",
        answerD: "D. Mars",
        correct: "D. Mars"
    },
    {
        question: "The Golden Record is travelling through space on what spacecraft in hopes of contact with extraterrestrial life?",
        answerA: "A. Orion",
        answerB: "B. Voyager",
        answerC: "C. Viking",
        answerD: "D. Keppler Space Telescope",
        correct: "B. Voyager"
    },
    {
        question: "A _____ is a cloud of dust and gas in outer space.",
        answerA: "A. Galaxy",
        answerB: "B. Planet",
        answerC: "C. Nebula",
        answerD: "D. Black Hole",
        correct: "C. Nebula"
    }
];


var scores = [];

startBtn.addEventListener("click", function () {
    startScreen.classList.add("hide");
    quizScreen.classList.toggle("hide");
    showQuestion();
    startTime();
});

// codeBtn.addEventListener("click")

for (let index = 0; index < answerButtons.length; index++) {
    answerButtons[index].addEventListener('click', function (event) {
        checkAnswer(event);
    })
}

function startTime() {
    let timer = setInterval(() => {
        timerEl.textContent = "Time: " + time + "s";
        if (questionIndex > questions.length - 1 || time === 0) {
            clearInterval(timer)
        };
        time--;
    }, 1000);
};

function showQuestion() {
    if (questionIndex <= questions.length - 1) {
        questionEl.textContent = questions[questionIndex].question
        answerAel.textContent = questions[questionIndex].answerA
        answerBel.textContent = questions[questionIndex].answerB
        answerCel.textContent = questions[questionIndex].answerC
        answerDel.textContent = questions[questionIndex].answerD
        aButton.setAttribute("data-value", questions[questionIndex].answerA)
        bButton.setAttribute("data-value", questions[questionIndex].answerB)
        cButton.setAttribute("data-value", questions[questionIndex].answerC)
        dButton.setAttribute("data-value", questions[questionIndex].answerD)
    }
}

function checkAnswer(event) {
    if (event.target.dataset.value === questions[questionIndex].correct) {
        console.log("correct")
        event.target.classList.toggle("correct")
    }
    else {
        event.target.classList.toggle("wrong")
        time -= 5;
    }
    for (let index = 0; index < answerButtons.length; index++) {
        answerButtons[index].disabled = true
    }
    setTimeout(function () {
        resetButtons();
        questionIndex++
        if (questionIndex > questions.length - 1) {
            endGame();
        }
        showQuestion();
    }, 500)
}

function resetButtons() {
    for (let index = 0; index < answerButtons.length; index++) {
        answerButtons[index].disabled = false
        answerButtons[index].classList.remove("correct")
        answerButtons[index].classList.remove("wrong")
        answerButtons[index].classList.add("nuetral")
    }
}

function endGame() {
    quizScreen.classList.toggle("hide")
    scoreScreen.classList.toggle("hide")
    // scores.push(time)
}