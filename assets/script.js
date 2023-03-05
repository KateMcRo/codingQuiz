// Button Elements
const startBtnEl = document.getElementById("start");
const submitBtnEl = document.getElementById("submit");
const restartBtnEl = document.getElementById("restart");
const viewScoresBtnEl = document.getElementById("viewScores")

// Timer Element
const timeEl = document.getElementById("timer");

// Question Elements
const questionContainerEl = document.getElementById("questionContainer");
const questionEl = document.getElementById("question")

// Answer Elements
const answerElA = document.getElementById("A")
const answerElB = document.getElementById("B")
const answerElC = document.getElementById("C")
const answerElD = document.getElementById("D")

// Scoreboard Elements
const scoreFormEl = document.getElementById("scoreForm");
const initialsEl = document.getElementById("initials");
const scoreBoardListEl = document.getElementById("highScores");
const scoreBoardEl = document.getElementById("scoreBoard");
const restartContainerEl = document.getElementById("restartContainer");

// Variables 
var secondsLeft = 30;

// Tracks question array index
var currentIndex = 0

const question1 = {
    question: "Inside which HTML element do we put the JavaScript?",
    answerA: "<js>",
    answerB: "<javascript>",
    answerC: "<script>",
    answerD: "<scripting>",
    correct: "<script>",
}
const question2 = {
    question: "How would you write `Hello` in an alert box?",
    answerA: "alert(`Hello`)",
    answerB: "alertBox(`Hello`)",
    answerC: "popUp(`Hello`)",
    answerD: "msg(`Hello`)",
    correct: "alert(`Hello`)",
}

const question3 = {
    question: "How do you call a function named `myFunction`?",
    answerA: "= myFunction()",
    answerB: "myFunction()",
    answerC: "call myFunction()",
    answerD: "call = myFunction()",
    correct: "myFunction()",
}

const questionsArray = [question1, question2, question3]
var userScoresArray = []

// Functions

function gameFlow () {
    showElement(questionContainerEl, "column")
    hideElement(startBtnEl)
    hideElement(viewScoresBtnEl)
    populateQuestions ()
    setTime ()
}

// Timer Functions

function setTime () {
    showElement(timeEl, "column")
    const timerInterval = setInterval (function() {
        if (secondsLeft <= 0) {
            clearInterval(timerInterval)
            return endGame ()
        }
        if (currentIndex > questionsArray.length -1) {
            clearInterval(timerInterval)
            timeEl.textContent = "Time Left: " + secondsLeft;
            return endGame ()
        }
        secondsLeft--;
        timeEl.textContent = "Time Left: " + secondsLeft;
    }, 1000);
}

// Question Functions

function populateQuestions () {
    let currentQuestion = questionsArray[currentIndex]
    if (currentQuestion) {
        questionEl.innerText = currentQuestion.question
        answerElA.innerText = currentQuestion.answerA
        answerElB.innerText = currentQuestion.answerB
        answerElC.innerText = currentQuestion.answerC
        answerElD.innerText = currentQuestion.answerD
    } else return endGame()
 }

 function checkAnswer (e) {
    const userSelection = e.target.innerText
    let currentQuestion = questionsArray[currentIndex]
    if (userSelection === currentQuestion.correct) {
        checkIndex ()
    } else {
        if (secondsLeft > 10) {
            secondsLeft = secondsLeft -10
        } else if (secondsLeft <= 10) {
            secondsLeft = 0
            timeEl.textContent = secondsLeft;
        }
        checkIndex ()
    }
}

function checkIndex () {
    if (currentIndex < questionsArray.length -1) {
        currentIndex ++
        populateQuestions ()
    } else currentIndex ++
}

function endGame () {
    hideElement(questionContainerEl)
    showElement(scoreFormEl)
}

// Scoreboard Functions

function handleSubmit (event) {
    //prevents refresh
    event.preventDefault ()
    if (initialsEl.value === "" ) {
        return handleError ("Please enter your initials.")
    } else {
        const localJSON = localStorage.getItem("scores")
        if (localJSON) {
            const allUserScores = JSON.parse(localJSON) 
            allUserScores.forEach(value => { 
                userScoresArray.push(value)
            });
        }
        const userObject = {initials: initialsEl.value, score: secondsLeft}
        userScoresArray.push (userObject)
        const stringifiedData = JSON.stringify(userScoresArray)
        localStorage.setItem("scores", stringifiedData)
    }
    hideElement(scoreFormEl)
    viewScores()
}

function testCreateScorecard () {
    const allScores = JSON.parse(localStorage.getItem("scores"))
    sortHighToLowScores (allScores)
    allScores?.forEach((score, i)=> {
        const scoreCardBody = document.createElement("li");
        scoreCardBody.setAttribute("class", "cardBody")
        const scoreCardInitials = document.createElement("p");
        const scoreCardScore = document.createElement("p");
        scoreCardInitials.innerText = `${i +1}. ${score.initials}`
        scoreCardScore.innerText = score.score;
        scoreCardBody.appendChild(scoreCardInitials);
        scoreCardBody.appendChild(scoreCardScore);
        document.getElementById("highScores").appendChild(scoreCardBody);
    }) 
}

function sortHighToLowScores (array) {
    return array?.sort((a, b) => {
        return b.score - a.score;
    });
}

// Error Functions

function handleError (message) {
    alert(message)
}

function handleValidation() {
    const allScores = JSON.parse(localStorage.getItem("scores"))
    if (!allScores) {
        return alert("No Scores Saved.")
        }
}

// Click Functions

function refresh () {
    return location.reload();
}

function viewScores () {
    const allScores = JSON.parse(localStorage.getItem("scores"))
    if (!allScores) {
        return handleError("No scores saved.")
        }
    hideElement(startBtnEl)
    hideElement(viewScoresBtnEl)
    showElement(scoreBoardEl, "column")
    showElement(restartContainerEl)
    testCreateScorecard ()

}

// Show/Hide Functions

function hideElement(element) {
    return element.style.display = "none"
}

function showElement(element, direction) {
    if (direction === "column") {
        element.style.display = "flex"
        return element.style.flexDirection = "column"
    } else {
        return element.style.display = "flex"
    }
}

// Event Listeners

startBtnEl.addEventListener ("click", gameFlow)
submitBtnEl.addEventListener ("click", (e)=> handleSubmit(e))
questionContainerEl.addEventListener ("click",(e)=> checkAnswer(e))
restartBtnEl.addEventListener ("click", refresh)
viewScoresBtnEl.addEventListener ("click", viewScores)
