// set the variables
var score = 0;
var currentQuestion = -1;
var secondsLeft = 0;
var timer;

// start function call to action
function start() {
    // display timer
    secondsLeft = 75;
    document.getElementById("timer").innerHTML = secondsLeft;
    // end game when time runs out
    timer = setInterval(function() {
    secondsLeft--;
    document.getElementById("timer").innerHTML = secondsLeft;
    if (secondsLeft <= 0) {
        clearInterval(timer);
        endGame(); 
     }
}, 1000);
// run function to generate questions
next();
}
// function to change questions
function next() {
    // end game when out of questions
    currentQuestion++;
    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }
    // display questions in h2
    var quizCont = "<h2>" + questions[currentQuestion].title + "</h2>"
// loop though questions 
// if correct button is clicked run correct()
// else incorrect()
    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizCont += buttonCode
    }
    document.getElementById("quizBody").innerHTML = quizCont;
}
// score correct answers
function correct() {
    score += 20;
    next();
}
// deduct time from incorrect answers
function incorrect() {
    secondsLeft -= 15; 
    next();
}
// end game function
function endGame() {
    clearInterval(timer);
// dislpay game over screen
    var quizCont = `
    <h2>Game over!</h2>
    <h3>You got a score of ` + score +  ` /100!</h3>
    <input type="text" id="name" placeholder="Your Initials Here"> 
    <button onclick="setScore()">Save Score!</button>`;
    document.getElementById("quizBody").innerHTML = quizCont;
}
// save intials and score to local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    viewScore();
}
// view high scores and initials
function viewScore() {
    var quizCont = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br><button onclick="clearScore()">Clear Score!</button><button onclick="newGame()">Play Again!</button>`;
    document.getElementById("quizBody").innerHTML = quizCont;
}
// clear score and input from local storage
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    // run function after clear to rest and change screen
    newGame();
}
// new game function 
function newGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    secondsLeft = 0;
    timer =null;
    document.getElementById("timer").innerHTML = secondsLeft;
// display new game screen
    var quizCont = 
    `<h1>
        Click below to play again!
    </h1>
    <button onclick="start()">Start!</button>`;
    document.getElementById("quizBody").innerHTML = quizCont;
}