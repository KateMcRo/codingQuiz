// Elements
const startBtnEl = document.getElementById("start");
const submitBtnEl = document.getElementById("submit");
const timeEl = document.getElementById("timer");
const questionContainerEl = document.getElementById("questionContainer");
const scoreFormEl = document.getElementById("scoreForm");
const initialsEl = document.getElementById("initials");
const scoreBoardListEl = document.getElementById("highScores");
const scoreBoardEl = document.getElementById("scoreBoard");

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
var userScoresArray = []

let sortHighToLowScores = (array) => {
    return array.sort((a, b) => {
        return b.score - a.score;
    });
}

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
            return endGame ()
        }
        if (currentIndex > questionsArray.length -1) {
            clearInterval(timerInterval)
            return endGame ()
        }
  
        secondsLeft--;
        timeEl.textContent = secondsLeft;
    }, 1000);
}

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
    questionContainerEl.style.display = "none"
    scoreFormEl.style.display = "block"
}

function handleSubmit (event) {
    //prevents refresh
    event.preventDefault ()
    if (initialsEl.value === "" ) {
        return handleError ()
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
    scoreFormEl.style.display = "none"
    testCreateScorecard ()
}

function handleError () {
    alert("Please enter your initials.")
}


function testCreateScorecard () {
    const allScores = JSON.parse(localStorage.getItem("scores"))
    sortHighToLowScores (allScores)
    allScores.forEach((score, i)=> {
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

// Event Listeners

startBtnEl.addEventListener ("click", gameFlow)
submitBtnEl.addEventListener ("click", (e)=> handleSubmit(e))
questionContainerEl.addEventListener ("click",(e)=> checkAnswer(e))
