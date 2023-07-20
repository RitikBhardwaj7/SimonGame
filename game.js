let gamePattern = [];
userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let rNum = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[rNum];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSoundAndAnimate(randomChosenColour);
}

$(".btn").on("click", function () {
  handler(this.id);
  playSoundAndAnimate(this.id);
  checkAnswer(userClickedPattern.length - 1);
});

function handler(userChosenColour) {
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
}

function playSoundAndAnimate(name) {
  $(`#${name}`).fadeOut(100).fadeIn(100);

  var audio = new Audio(`${name}.mp3`);
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
    startOver();
  }
}

function gameOver() {
  var audio = new Audio("wrong.mp3");
  audio.play();

  $("body").addClass("game-over");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 400);

  $("h1").text("Game Over, Press Any Key to Restart");
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
