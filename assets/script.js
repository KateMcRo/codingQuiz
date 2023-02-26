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
var secondsLeft = 10;
var questionIndex = 0;

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

const questionsArray = [question1, question2]
const firstQuestion = questionsArray[questionIndex]

// Functions
function handleStartGame() {
    handleUpdateDisplay()
    handleUpdateStartBtn()
    handleFirstQuestion()
    handleTimer()
}

function handleTimer() {
    const timerInterval = setInterval(()=>handleCountdown(timerInterval), 1000) 
}

function handleCountdown(interval) {
    timeEl.textContent = `Time Left: ${secondsLeft}`
    if (secondsLeft === 0) {
        clearInterval(interval);
    }
    return secondsLeft--;
}

function handleUpdateDisplay() {
    console.log("aiwoefj")
    questionContainerEl.style.display="block"
}

function handleUpdateStartBtn() {
    console.log("selkfj")
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
    questionIndex += 1
    const nextQuestion = questionsArray[questionIndex]
    questionEl.innerText = nextQuestion.question
    answerElA.innerText = nextQuestion.answerA
    answerElB.innerText = nextQuestion.answerB
    answerElC.innerText = nextQuestion.answerC
    answerElD.innerText = nextQuestion.answerD
    const answerClick = event.target.innerText
    console.log(questionIndex)
}

startBtnEl.addEventListener("click", handleStartGame)
questionContainerEl.addEventListener("click", (e)=>handleUpdateQuestion(e))