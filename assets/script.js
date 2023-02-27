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
var secondsLeft = 90;
var questionIndex = 0;
var timerInterval; 

const question1 = {
    question: "What is my favorite color?",
    answerA: "blue",
    answerB: "red",
    answerC: "yellow",
    answerD: "green",
    correct: "yellow",
}
const question2 = {
    question: "What is someone else's favorite color?",
    answerA: "blue",
    answerB: "red",
    answerC: "yellow",
    answerD: "green",
    correct: "red",
}

const question3 = {
    question: "What is someone else's favorite oaweijf?",
    answerA: "blue",
    answerB: "red",
    answerC: "yellow",
    answerD: "green",
    correct: "red",
}

const questionsArray = [question1, question2, question3]
const firstQuestion = questionsArray[questionIndex]

// Functions
function handleStartGame() {
    handleUpdateDisplay()
    handleUpdateStartBtn()
    handleFirstQuestion()
    handleTimer()
}

function handleTimer() {
  timerInterval = setInterval(()=>handleCountdown(timerInterval), 1000) 
}

function handleCountdown(interval) {
    timeEl.textContent = `Time Left: ${secondsLeft}`
    if (secondsLeft <= 0) {
        clearInterval(interval);
    }
    return secondsLeft--;
}

function handleUpdateDisplay() {
    questionContainerEl.style.display="block"
}

function handleUpdateStartBtn() {
    startBtnEl.style.display="none"
}

function handleFirstQuestion() {
    questionEl.innerText = firstQuestion.question
    answerElA.innerText = firstQuestion.answerA
    answerElB.innerText = firstQuestion.answerB
    answerElC.innerText = firstQuestion.answerC
    answerElD.innerText = firstQuestion.answerD
}

function handleUpdateQuestion(event) {
    if (questionIndex === 0){
        handleCheckAnswers(event.target.innerText, firstQuestion.correct)
        getNextQuestion()
    }
    const answerClick = event.target.innerText
    if (questionIndex < questionsArray.length && questionIndex !== 0) {
        const currentQuestion = getNextQuestion ()
        handleCheckAnswers(answerClick, currentQuestion.correct)
    } else handleEndGame (timerInterval)
}

function getNextQuestion() {
    const nextQuestion = questionsArray[questionIndex]
    questionEl.innerText = nextQuestion.question
    answerElA.innerText = nextQuestion.answerA
    answerElB.innerText = nextQuestion.answerB
    answerElC.innerText = nextQuestion.answerC
    answerElD.innerText = nextQuestion.answerD
    return nextQuestion
}

function handleCheckAnswers(userAnswer, correctAnswer) {
    if (userAnswer !== correctAnswer && secondsLeft >= 5) {
        secondsLeft = secondsLeft -5
        questionIndex += 1
    } else if (userAnswer !== correctAnswer && secondsLeft <= 5) {
        secondsLeft = 0
        handleEndGame ()
    } else if (userAnswer === correctAnswer) {
        questionIndex += 1
    } else handleEndGame ()
}

function handleEndGame (interval) {
    console.log("Game Over")
    clearInterval(interval)
}

startBtnEl.addEventListener("click", handleStartGame)
questionContainerEl.addEventListener("click", (e)=>handleUpdateQuestion(e))