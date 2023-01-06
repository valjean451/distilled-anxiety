var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var timers = document.getElementById("timers")
var ansA = document.getElementById("A");
var ansB = document.getElementById("B");
var ansC = document.getElementById("C");
var ansD = document.getElementById("D");
var counterEl = document.getElementById("counter")
var feedbackEl = document.getElementById("feedback")
var timeLeft = 60
var timerInterval
var containerEl = document.getElementById("container")
var endEl = document.getElementById("end")
var submitScoreBtn = document.getElementById("submit")
var initialsInput = document.getElementById("initials")
var scoreboardEl = document.getElementById("scoreboard")
var restartBtn = document.getElementById("playagain")
var formEl = document.getElementById("endform")
var endBtnEl = document.getElementById("endbutton")
var clearBtnEl = document.getElementById("clear")


var questions = [
    {
        question: "How do you find the area of a square?",
        ansA: "L x W",
        ansB: "Pray",
        ansC: "Ask your teacher",
        ansD: "b x h / 2",
        correct: "A"
    },{
        question: "How do you find the area of a triangle?",
        ansA: "L x W",
        ansB: "Pray",
        ansC: "Ask your teacher",
        ansD: "b x h / 2",
        correct: "D"
    },{
        question: "What should you do if you don't understand something?",
        ansA: "L x W",
        ansB: "Pray",
        ansC: "Ask your teacher",
        ansD: "b x h / 2",
        correct: "C"
    }
]

var finalQuestionIndex = questions.length -1;
var currentQuestionIndex = 0;

start.addEventListener("click", startQuiz);

function startQuiz (){
    start.setAttribute("style", "display: none")
    presentQuestion();
    quiz.setAttribute("style", "display: block")
    counterEl.innerHTML = "<p>Time:<br>" + timeLeft + "</p>";
    goTime()
}

function presentQuestion (){
    let currentQ = questions[currentQuestionIndex];
    question.innerHTML = "<p>" + currentQ.question + "</p>";
    ansA.innerHTML = currentQ.ansA;
    ansB.innerHTML = currentQ.ansB;
    ansC.innerHTML = currentQ.ansC;
    ansD.innerHTML = currentQ.ansD;
}

function checkAnswer(answer) {
    if(questions[currentQuestionIndex].correct == answer){
        feedbackEl.innerText = "Correct!"
    }else{
        feedbackEl.innerText = "Incorrect..."
        if(timeLeft < 10){
            timeLeft = 0
            counterEl.innerHTML = "<p>Time:<br>" + timeLeft + "</p>";
            clearInterval(timerInterval)
            endGame();
        }else{
            timeLeft = timeLeft - 10
            counterEl.innerHTML = "<p>Time:<br>" + timeLeft + "</p>";
        }
    }

    if(currentQuestionIndex < finalQuestionIndex){
        currentQuestionIndex++;
        presentQuestion();
    }else{
        clearInterval(timerInterval);
        endGame();
    }
    console.log(currentQuestionIndex)
}

function goTime () {
    timerInterval = setInterval(function() {
    timeLeft--;
    counterEl.innerHTML = "<p>Time:<br>" + timeLeft + "</p>";
    if(timeLeft === 0){
        clearInterval(timerInterval);
        endGame();
    }
    },1000)
}

function endGame () {
    containerEl.setAttribute("style", "display: none")
    endEl.setAttribute("style", "display: block")
}

submitScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var testScore = {
        result: timeLeft,
        init: initialsInput.value,
    }
    var existingScores = JSON.parse(localStorage.getItem("scores"));
    if(existingScores == null) existingScores = [];
    existingScores.push(testScore);
    localStorage.setItem("scores", JSON.stringify(existingScores));
    formEl.setAttribute("style", "display: none")
    createScoreboard()
})

function createScoreboard () {
    scoreboardEl.setAttribute("style", "display: block")
    endBtnEl.setAttribute("style", "display: block")
    var scoreHistory = JSON.parse(localStorage.getItem("scores"));
    console.log(scoreHistory)
    console.log(typeof(scoreHistory))
    if (scoreHistory !== null) {
        var sortedScores = scoreHistory.sort((s1, s2) => (s1.result > s2.result) ? -1 : (s1.result < s2.result) ? 1 : 0)
        console.log(sortedScores)
        for (let index = 0; index < sortedScores.length; index++) {
            var pEl = document.createElement("p")
            pEl.setAttribute("class", "scoreline")
            pEl.innerText = sortedScores[index].init + " - " + sortedScores[index].result
            scoreboardEl.append(pEl)
}}}

restartBtn.addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
})

clearBtnEl.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();
    var childP = document.querySelectorAll(".scoreline")
    console.log(childP)
    childP.forEach(scoreline =>{
        scoreline.remove()
    })
})


//ideas on how to improve this later: 
//render questions in a random order, but only once
