const timerEl = document.getElementById("time");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const scoreScreen = document.getElementById("score-screen");
const scoreLabel = document.getElementById("score-label")
const highscoreBtn = document.getElementById("highscore-btn")
const leaderboardEl = document.getElementById("leaderboard")
const scoreEl = document.getElementById("scores")
const codeBtn = document.getElementById("code-btn")
const startBtn = document.getElementById("start-btn");
const form = document.getElementById("form")
const submitBtn = document.getElementById("submit-btn")
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
var time = 30;
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

startBtn.addEventListener("click", function () {
    startScreen.classList.add("hide");
    quizScreen.classList.toggle("hide");
    startTime();
    showQuestion();
});

highscoreBtn.addEventListener("click", function () {
    if (quizScreen.className !== "hide") {
        alert("Finish your quiz!")
    }

    else if (leaderboardEl.className !== "hide") {
        leaderboardEl.classList.toggle("hide")
        startScreen.classList.toggle("hide")
    }

    else {
        startScreen.classList.add("hide")
        let checkedSCore = JSON.parse(localStorage.getItem("Scores"))
        if (checkedSCore === null) {
            scoreEl.innerHTML = "Take the quiz to get your first score!"
        }
        else {
            addScore();
        }
        leaderboardEl.classList.toggle("hide")
    }
})

function startTime() {
    let timer = setInterval(() => {
        timerEl.innerHTML = "Time: " + time + "s";
        if (time <= 0 || questionIndex > questions.length - 1) {
            endGame();
            clearInterval(timer)
            return time
        }
        time--;
    }, 1000);
};

function showQuestion() {
    if (questionIndex > questions.length) {
        endGame();
    }
    if (questionIndex <= questions.length - 1) {
        questionEl.innerHTML = questions[questionIndex].question
        answerAel.innerHTML = questions[questionIndex].answerA
        answerBel.innerHTML = questions[questionIndex].answerB
        answerCel.innerHTML = questions[questionIndex].answerC
        answerDel.innerHTML = questions[questionIndex].answerD
        aButton.setAttribute("data-value", questions[questionIndex].answerA)
        bButton.setAttribute("data-value", questions[questionIndex].answerB)
        cButton.setAttribute("data-value", questions[questionIndex].answerC)
        dButton.setAttribute("data-value", questions[questionIndex].answerD)
    }
}

// Add event listeners to buttons
for (let index = 0; index < answerButtons.length; index++) {
    answerButtons[index].addEventListener('click', function (event) {
        checkAnswer(event);
    })
}

// Check click event and change button classes accordingly
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
        questionIndex++;
        showQuestion();
    }, 500)
}

function endGame() {
    quizScreen.classList.toggle("hide")
    scoreScreen.classList.toggle("hide")
    if (time < 5) {
        scoreLabel.innerHTML = "You could you better than that! Your score: " + time + "s"
    }
    else {
        scoreLabel.innerHTML = "Out of this world! Your score: " + time + "s"
    }
}

function resetButtons() {
    for (let index = 0; index < answerButtons.length; index++) {
        answerButtons[index].disabled = false
        answerButtons[index].classList.remove("correct")
        answerButtons[index].classList.remove("wrong")
        answerButtons[index].classList.add("nuetral")
    }
}

submitBtn.addEventListener("click", function checkScore(event) {
    event.preventDefault();
    var initials = document.getElementById("initials").value
    var checkedScore = JSON.parse(localStorage.getItem("Scores"))
    if (checkedScore === null) {
        var scores = []
        var playerScore = {}
        playerScore.name = initials
        playerScore.score = time
        scores.push(playerScore)
        localStorage.setItem("Scores", JSON.stringify(scores))
    }
    else {
        var scores = []
        var playerScore = {}
        playerScore.name = initials
        playerScore.score = time
        console.log(checkedScore)
        checkedScore.push(playerScore)
        localStorage.setItem("Scores", JSON.stringify(checkedScore))
    }
    form.reset();
    addScore();
    leaderboardEl.classList.toggle("hide")
})

function addScore() {
    let leaderboard = JSON.parse(localStorage.getItem("Scores"))
    console.log(leaderboard)
    for (let index = 0; index < leaderboard.length; index++) {
        var pScore = document.createElement("p")
        pScore.classList.add("score")
        pScore.innerHTML = leaderboard[index].name + ": " + leaderboard[index].score
        var scoreRow = document.createElement("div")
        var scoreCol = document.createElement("div")
        scoreRow.classList.add("row")
        scoreCol.classList.add("col-12")
        scoreEl.prepend(scoreRow)
        scoreRow.appendChild(scoreCol)
        // scoreCol.appendChild(pName)
        scoreCol.appendChild(pScore)
    }
}