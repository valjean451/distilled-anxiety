var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var timers = document.getElementById("timers")
var ansA = document.getElementById("A");
var ansB = document.getElementById("B");
var ansC = document.getElementById("C");
var ansD = document.getElementById("D");
var counterEl = document.getElementById("counter")
var scoreEl = document.getElementById("score")
var feedbackEl = document.getElementById("feedback")
var timeLeft = 60
var score = 0
var timerInterval
var containerEl = document.getElementById("container")
var endEl = document.getElementById("end")
var submitScoreBtn = document.getElementById("submit")
var initialsInput = document.getElementById("initials")
var scoreboardEl = document.getElementById("score")
var scoreHistory = {}

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
        score = score + 5
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
        result: score,
        init: initialsInput.value,
    }
    appendToStorage("lastResult", JSON.stringify(testScore));
    createScoreboard();

})



function appendToStorage(name, data){
    var old = localStorage.getItem(name);
    if(old === null) old = "";
    localStorage.setItem(name, old + data);
}


function createScoreboard () {
    // scoreboardEl.innerHTML("Initials:   Score:")
    scoreHistory = JSON.parse(localStorage.getItem("lastResult"));
    console.log(scoreHistory)
    console.log(typeof(scoreHistory))
    if (scoreHistory !== null) {
        for (let index = 0; index < scoreHistory.length; index++) {
            scoreboardEl.innerHTML("hello")
            
        }
    }
}

// need to find a way to sort the scores before they get appended 
// need to find out why items are not appending to the score element