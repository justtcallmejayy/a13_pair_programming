let maxNum = 50;
let difficulty = "easy";

let questions = [];

let questionNum = 0;
let score = 0;

// code for the script.js file that will reflect the html logic for our assign.html page
// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior, you know our basics from Client side course.
}

// Now we need to create a function to display the question in the HTML filebased on our logic
// Function to display the question could be displayed in the HTML file using the innerHTML property of the element where we want to display the question, such as div or just our textarea. */

function checkAnswer() {
  userAnswer = document.getElementById("answerInput").value;

  if (userAnswer == "") {
    document.getElementById("error").innerHTML = "You must enter an answer";
    return;
  } 
  
  document.getElementById("error").innerHTML = "";
  console.log(`The Question is ${questions[questionNum][0]}`);
  console.log(`The correct answer is: ${questions[questionNum][1]}`);
  console.log(`The User answer is: ${userAnswer}`);

  document.getElementById("lastAnswer").innerHTML = `Correct answer to previous question: ${questions[questionNum][1]}`;

  if (userAnswer == questions[questionNum][1]) {
    score++;
    document.getElementById("scoreText").innerHTML = `${score}/10`;
  }

  questionNum += 1;

  displayQuestion();

  document.getElementById("answerInput").value = "";
}

// Function to display the questions
function displayQuestion() {
 

  if (questionNum == 0) {
    event.preventDefault();
    questions = getMathQuestions();

    document.getElementById("questionText").innerHTML = `Question # ${questionNum + 1}`;
    document.getElementById("questionDisplay").innerHTML = `${questions[questionNum][0]}`;

    document.getElementById("easy").disabled = true;
    document.getElementById("medium").disabled = true;
    document.getElementById("hard").disabled = true;
    document.getElementById("start").disabled = true;

  } else if (questionNum >= 10) {
    document.getElementById("questionText").innerHTML = "Quiz Complete";
    document.getElementById("submitAnswer").disabled = true;
  
  } else {
    document.getElementById("questionText").innerHTML = `Question # ${questionNum  + 1}`;
    document.getElementById("questionDisplay").innerHTML = `${questions[questionNum][0]}`;
  }
}

// starting the quiz
// create a function to get the difficulty level from the form
// and store it in the variable difficulty

function getDifficulty() {
  const formQuizDiff = document.querySelector(
    'input[name="RBdiff"]:checked'
  ).id;

  const formQuizValue = document.querySelector(
    'input[name="RBdiff"]:checked'
  ).value;

  difficulty = formQuizDiff;

  console.log(`The difficulty is: ${formQuizDiff}`);
  console.log(`The stored difficulty is: ${difficulty}`);

  if (formQuizValue == "50") {
    maxNum = 50;
    document.getElementById("H2diff").innerHTML = "Chosen Difficulty: Easy";
  } else if (formQuizValue == "1000") {
    maxNum = 1000;
    document.getElementById("H2diff").innerHTML = "Chosen Difficulty: Medium";
  } else if (formQuizValue == "10000") {
    maxNum = 10000;
    document.getElementById("H2diff").innerHTML = "Chosen Difficulty: Hard";
  }

  console.log(`The maximum number is: ${maxNum}`);
}

function reset() {
  document.getElementById("H2diff").innerHTML = "Chosen Difficulty: Easy";
  document.getElementById("questionText").innerHTML = "Question";
  document.getElementById("questionDisplay").innerHTML = "";
  document.getElementById("lastAnswer").innerHTML = "";
  document.getElementById("scoreText").innerHTML = "0/10";
  document.getElementById("error").innerHTML = "";

  document.getElementById("submitAnswer").disabled = false;
  document.getElementById("start").disabled = false;

  document.getElementById("answerInput").value = "";

  RBeasy = document.getElementById("easy");
  RBeasy.disabled = false;
  RBeasy.checked = true;

  RBMedium = document.getElementById("medium");
  RBMedium.disabled = false;
  RBMedium.checked = false;

  RBhard = document.getElementById("hard");
  RBhard.disabled = false;
  RBhard.checked = false;

  

  score = 0;
  questionNum = 0;
  maxNum = 50;
  difficulty = "easy";
}

window.addEventListener("load", function (event) {
  document.getElementById("easy").addEventListener("click", function (event) {
    getDifficulty();
  });

  document.getElementById("medium").addEventListener("click", function (event) {
    getDifficulty();
  });

  document.getElementById("hard").addEventListener("click", function (event) {
    getDifficulty();
  });

  document
    .getElementById("resetButton")
    .addEventListener("click", function (event) {
      reset();
    });

  document.getElementById("start").addEventListener("click", function (event) {
    displayQuestion();
  });

  document
    .getElementById("submitAnswer")
    .addEventListener("click", function (event) {
      checkAnswer();
    });
});

/**
 * Creates an 2D array consisting of a question string and an answer int.eith
 */
function getMathQuestions() {
  let numLimit = maxNum;
  let operands = ["/", "*", "+", "-"];
  let numberOfQuestions = 10;

  for (let i = 0; i < numberOfQuestions; i++) {
    num1 = Math.floor(Math.random() * numLimit); //first number
    num2 = Math.floor(Math.random() * numLimit); // second number

    operator = Math.floor(Math.random() * operands.length); // operator

    if (num1 == 0 || (num2 == 0 && operator == 0)) continue; // if the either number is 0 and the operator is division,
    // the loop should skip the expression entirely

    let operatorSymbol = operands[operator]; // This will give you a random operator from the array

    let questionString = `${num1} ${operatorSymbol} ${num2} = ?`; // the question

    let answer = getAnswer(num1, num2, operator); // calls get answer function to get the answer to the question

    questions[i] = [questionString, answer];

    console.log(questions[i][0]);
    console.log(questions[i][1]);
  }

  return questions;
}

function getAnswer(number1, number2, operator) {
  let answer;

  switch (operator) {
    case 0:
      answer = number1 / number2;
      break;
    case 1:
      answer = number1 * number2;
      break;
    case 2:
      answer = number1 + number2;
      break;
    case 3:
      answer = number1 - number2;
  }
  return answer;
}

// next question functionlity
function nextQuestion() {
  let questionNum = 0;
  let score = 0;
  let question = questions[questionNum];
  document.getElementById("questionBox").innerHTML = question[0];
  document.getElementById("answerBox").value = "";
  document.getElementById("score").innerHTML = `Score: ${score}`;
  document.getElementById("scoreText").innerHTML = `${score}/10`;
  questionNum++

  if (questionNum == 10) {
    alert("Quiz completed!")
    reset();
  }
        

  }

// display the result
function displayResult() {
  let result = document.getElementById("result");
  result.innerHTML = `Your score is: ${score}/10`;
  result.style.display = "block";
}
