// Global variables
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var timers = document.getElementById("timers")
var ansA = document.getElementById("A");
var ansB = document.getElementById("B");
var ansC = document.getElementById("C");
var ansD = document.getElementById("D");
var counterEl = document.getElementById("timers")
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
var uppercaseLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

var questions = [
    {
        question: "Which 'loop' executes code for each item in an iterable list (such as an array or string)?",
        ansA: "For Loop",
        ansB: "Against Loop",
        ansC: "While Loop",
        ansD: "Else Loop",
        correct: "A"
    },{
        question: "Which 'loop' continues to execute as long as a given logical statement is true?",
        ansA: "Else Loop",
        ansB: "For Loop",
        ansC: "Against Loop",
        ansD: "While Loop",
        correct: "D"
    },{
        question: "Which HTML tag is used to reference an external JavaScript file?",
        ansA: "a",
        ansB: "script",
        ansC: "img",
        ansD: "ref",
        correct: "B"
    },{
        question: "Which element refers to a 'true' or 'false' value?",
        ansA: "Boolean",
        ansB: "Integer",
        ansC: "String",
        ansD: "Array",
        correct: "A"
    },{
        question: "A block of code that is 'called' to perform a specific function is?",
        ansA: "a Variable",
        ansB: "a Scope",
        ansC: "a Function",
        ansD: "a Constant",
        correct: "C"
    },{
        question: "Which describes the behavior of moving declarations to the top of the scope?",
        ansA: "Routing",
        ansB: "Hoisting",
        ansC: "Ascending",
        ansD: "Looping",
        correct: "B"
    }
]

var finalQuestionIndex = questions.length -1;
var currentQuestionIndex = 0;

//Initialize quiz
start.addEventListener("click", startQuiz);

function startQuiz (){
    start.setAttribute("style", "display: none")
    presentQuestion();
    quiz.setAttribute("style", "display: flex")
    counterEl.setAttribute("style", "display: flex")
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

//Test Complete
function endGame () {
    containerEl.setAttribute("style", "display: none")
    endEl.setAttribute("style", "display: flex")
    counterEl.setAttribute("style", "display: none")
}

submitScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var inputVal = initialsInput.value
    inputVal = inputVal.toUpperCase()
    console.log(typeof(inputVal))
    console.log(inputVal)
    if (inputVal == "") {
        alert("Please enter your initials.");
        return;
    }
    for (let i = 0; i < inputVal.length; i++) {
        if (uppercaseLetters.includes(inputVal[i]) == false) {
            alert("Please enter only alphabetical characters (a-z).")
            return;
        }
    }
    var testScore = {
        result: timeLeft,
        init: inputVal,
    }
    var existingScores = JSON.parse(localStorage.getItem("scores"));
    if(existingScores == null) existingScores = [];
    existingScores.push(testScore);
    localStorage.setItem("scores", JSON.stringify(existingScores));
    formEl.setAttribute("style", "display: none")
    createScoreboard()
})

//Show Score History
function createScoreboard () {
    scoreboardEl.setAttribute("style", "display: flex")
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

//Play again
restartBtn.addEventListener("click", function (event) {
    event.preventDefault();
    location.reload();
})

//Reset Scores
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
//add field validation for initials
//find better ways to compute score (reward correct answers?)
//number the questions using the index variable
//number the highscores using the index in the loop
