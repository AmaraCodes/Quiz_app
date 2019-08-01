const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const grid = document.getElementById("grid");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];

fetch(
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    });

    
    startGame();
  })
  .catch(err => {
    console.error(err);
  });
  

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  console.log(availableQuesions);
  getNewQuestion();
  //to make loader go away and the game page appear
  grid.classList.remove("hidden");
  loader.classList.add("hidden");
  
  
};

getNewQuestion = () => {
  //at the end of the question array it takes you to end.html
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //sets score to most recent score and saves in local storage
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  //increases by 1
  questionCounter++;
  //To set the question counter (used template strings)
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
 
  //update the progress bar
  //console.log((questionCounter / MAX_QUESTIONS) * 100); to get 1/3 and multiply by 100 for the percentage
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%` //width property is being set to the percentage above
  //picks from the array of questions randomly
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;
//picks the choices to the questions being selected
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });
//this splices out the question answered from the remaining available questions
  availableQuesions.splice(questionIndex, 1);
  console.log(availableQuesions);
  acceptingAnswers = true;
};
//this targets the click and uses it to target the data number
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    // const classToApply = 'incorrect';
    // if(selectedAnswer == currentQuestion.answer) {
    // classToApply = 'correct';
    // }
 
      //if selected answer is equal to answer to the current question, correct else incorrect
      const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
     //creates a class to check if correct or incorrect
     if (classToApply == "correct") {
       alert('correct');
    }else {alert('incorrect')}
     //if the class is correct increment score by 10
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    //sets time to remove answered question and get new question
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
//increments score function to be called when the class= correct
  incrementScore = num => {
  score += num;
  scoreText.innerText = score;
  };

//     console.log(selectedAnswer);
//     getNewQuestion();
//   });
// });
// console.log('I am here');

