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
        console.log(currentIndex)
    } else currentIndex ++
}

function endGame () {
    console.log("Game Over SHITBIRD")
    questionContainerEl.style.display = "none"
    console.log({secondsLeft})
    scoreFormEl.style.display = "block"

}

function handleSubmit (event) {
    //prevents refresh
    event.preventDefault ()
    //if theres no value return error message
    if (initialsEl.value === "" ) {
        return handleError ()
    } else {
        //creates variable, gets item = [{ initials: MR, score: 7}, {initials: KR, score: 9}] from local storage
        const localJSON = localStorage.getItem("scores") // round 1 does not exist = undefined |-----| round 2: localJson = "[{initials: , score: }]"
        //if there is are stored scores, create a variable & parse the data. console log the previous scores
        if (localJSON) { // because localJson = undefined on round 1 this statement doesn't run |----| this now exsits as "[{initials: , score: }]"
            const allUserScores = JSON.parse(localJSON) // all user scores = array of objects ---> parses string back into an array = [{initials: , score: }]
            console.log("all user scores here", allUserScores)
            allUserScores.forEach(value => { // steps through each value, and gets the object at each index
                console.log("each value that was in allUserScores", value) // value = { initials: , score: }
                userScoresArray.push(value) // pushes each value into userScoresArray
                
            });
        }
        //creates new variable, adds it to array, stringifies, and saves it to local storage
        const userObject = {initials: initialsEl.value, score: secondsLeft} // user object
        userScoresArray.push (userObject) // pushes user object {initials, scores} into array
        console.log("user scores Array here", userScoresArray)
        const stringifiedData = JSON.stringify(userScoresArray) // "[{initials: , score: }]"
        localStorage.setItem("scores", stringifiedData) // localstorage = {key: "scores", value: "[{initials: , score:}]""}
    }
    scoreFormEl.style.display = "none"
    testCreateScorecard ()
}

function handleError () {
    alert("Please enter your initials.")
}
/* /* 
function renderScoreBoard () {
    scoreBoardEl.style.display = "block"
    const allScores = JSON.parse(localStorage.getItem("scores"))
    allScores.forEach((score)=> {
        const scoreCard = createScorecard(score)
        scoreBoardEl.append(scoreCard)
    })
} */

function testCreateScorecard () {
    const allScores = JSON.parse(localStorage.getItem("scores"))
    console.log(allScores)
    allScores.forEach((score)=> {
        const listItem = document.createElement("li");
        listItem.innerText = score.initials + "_________________" + score.score;
        document.getElementById("highScores").appendChild(listItem);
        
    })
  
}

// Event Listeners

startBtnEl.addEventListener ("click", gameFlow)
submitBtnEl.addEventListener ("click", (e)=> handleSubmit(e))
questionContainerEl.addEventListener ("click",(e)=> checkAnswer(e))
