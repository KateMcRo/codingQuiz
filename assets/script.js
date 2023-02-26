// Elements
const startBtnEl = document.getElementById("start");
const timeEl = document.getElementById("timer");

var secondsLeft = 10;

// Functions
function handleStartGame() {
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

startBtnEl.addEventListener("click", handleStartGame)