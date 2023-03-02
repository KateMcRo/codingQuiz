// Elements
const startBtnEl = document.getElementById("start");
const timeEl = document.getElementById("timer");
const questionContainerEl = document.getElementById("questionContainer");

const questionEl = document.getElementById("question")

const answerElA = document.getElementById("A")
const answerElB = document.getElementById("B")
const answerElC = document.getElementById("C")
const answerElD = document.getElementById("D")

// Variables 
var secondsLeft = 30;

var currentIndex = 0

const question1 = {
    question: "Which HTML tag is used to make text italicized?",
    answerA: "<blockquote>",
    answerB: "<a>",
    answerC: "<em>",
    answerD: "<strong>",
    correct: "<em>",
}
const question2 = {
    question: "Which element is a container that would include document title, scripts, styles, meta info, and more?",
    answerA: "<head></head>",
    answerB: "<title></title>",
    answerC: "<body></body>",
    answerD: "<br></br>",
    correct: "<head></head>",
}

const question3 = {
    question: "What is the name of the stylesheet that defines the presentation of an HTML or XML document?",
    answerA: "Java",
    answerB: "CSS",
    answerC: "PHP",
    answerD: "jQuery",
    correct: "CSS",
}

const questionsArray = [question1, question2, question3]

// Functions

function gameFlow () {
    questionContainerEl.style.display = "block"
    startBtnEl.style.display = "none"
    populateQuestions ()
    setTime ()
}

function setTime () {
    const timerInterval = setInterval (function() {
        if (secondsLeft <= 0) {
            clearInterval(timerInterval)
            endGame ()
        }
        if (currentIndex === questionsArray.length -1) {
            clearInterval(timerInterval)
            endGame ()
        }
        secondsLeft--;
        timeEl.textContent = secondsLeft;
    }, 1000);
}

function populateQuestions () {
   let currentQuestion = questionsArray[currentIndex]
    questionEl.innerText = currentQuestion.question
    answerElA.innerText = currentQuestion.answerA
    answerElB.innerText = currentQuestion.answerB
    answerElC.innerText = currentQuestion.answerC
    answerElD.innerText = currentQuestion.answerD
}

function checkAnswer (e) {
    const userSelection = e.target.innerText
    let currentQuestion = questionsArray[currentIndex]
    if (userSelection === currentQuestion.correct) {
        console.log("correct")
        checkIndex ()
    } else {
        console.log("FUCK YOU")
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
    } else return endGame ()
}

function endGame () {
    console.log("Game Over SHITBIRD")
    
}

// Event Listeners

startBtnEl.addEventListener ("click", gameFlow)
questionContainerEl.addEventListener ("click",(e)=> checkAnswer(e))