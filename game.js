buttonColours=["red","blue","green","yellow"];
gamePattern=[];
userClickedPattern=[];

let level=0;

let started=false;

$(document).keydown(function()
{
  if(!started)
  {
    level=0;
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").on("click",function(event)
{
    // let userChosenColour=event.target.id;
    // let userChosenColour=this.id;
    let userChosenColour=$(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name)
{
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}


function nextSequence()
{
  $("h1").text("Level "+level);
  let randomNumber= Math.floor(Math.random()*4);
  let randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  level++;
}


function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function()
  {
    $("#"+currentColour).removeClass("pressed");
  },100)
}

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
  {
    if(currentLevel==gamePattern.length-1)
    {
      setTimeout(nextSequence,1000);
      userClickedPattern=[];
    }
  }
  else {
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function()
    {
      $("body").removeClass("game-over");
    },200);
    // started=false;
    // gamePattern=[];
    // I had missed this one instruction: {userClickedPattern=[];} and was not able to get the right output
    $("h1").text("Game Over, Press Any Key to RESTART");
    startOver();

  }
}

function startOver()
{
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  started=false;
}
// var buttonColours=["red","blue","green","yellow"];
// var randomChosenColour= buttonColours[nextSequence];
// var gamePattern[];
// gamePattern.push(randomChosenCOlour);
//
// function nextSequence(){
//   var randomNumber= Math.floor(Math.random()*3);
//   return randomNumber;
// };
