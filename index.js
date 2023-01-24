

function playSound(name) {
    var sound;

    switch (name){
        case ("green"):
        sound = new Audio('sounds/green.mp3');
        sound.play();
        break;

        case ("red"):
        sound = new Audio('sounds/red.mp3');
        sound.play();
        break;

        case ("yellow"):
        sound = new Audio('sounds/yellow.mp3');
        sound.play();
        break;

        case ("blue"):
        sound = new Audio('sounds/blue.mp3');
        sound.play();
        break;
    }
}

//game buttons
var buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];


//generating random color sequence
function nextSequence(){
    userClickedPattern = []; //setting user click pattern to empty

    level++; //increasing level;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    console.log(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColor);
}

//user click pattern
var userClickedPattern = [];
var userChosenColor;
$(".btn").click(function(){
    userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);


    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

var level = 0;
//start game
$("body").keypress(function(event){
    var key = (event.key);
    if(key === 'a'){
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      gameOver();

    }

}

//game over
function gameOver(){
    sound = new Audio('sounds/wrong.mp3');
    sound.play();

    $("body").addClass("game-over");
    setInterval(function(){
        $("body").removeClass("game-over");
    } , 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    level = 0;
}

//add animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  






