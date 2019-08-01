const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");


//sets this to get highscores already saved in the local storage or returns an empty array if empty. json parse converts this into an array in the local storage 
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//displays 5 high scores at a time
const MAX_HIGH_SCORES = 5;

//sets final score to show as most recent in the end.html page
finalScore.innerText = mostRecentScore;

//disables the save button till a username is keyed in
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

//saves highscore and prevents default button action with the save button
saveHighScore = (e) => {
  console.log("clicked the save button!");
  e.preventDefault();

//saves score along with username
  const score = {
    score: mostRecentScore,
    name: username.value
  };
 
  highScores.push(score);

  //if b.score is greater than a.score let b come first on the array 
  highScores.sort((a, b) => b.score - a.score);

  //at index 5 cut everything after that
  highScores.splice(5);

  //sets highscores in json string format in the local storage 
  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("index.html");

  console.log(highScores);
};
