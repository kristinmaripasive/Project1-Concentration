$(document).ready(function(){

var start = $("#start");
var pause = $("#pause");
var time = $("#time");
var points = 0;
var reset = $("#again");
var card = $(".card");
var timer = 20;
var i = 0;
var timerId;
var imageArray = ["nba-faces-steph.jpg", "nba-faces-kobe.jpg", "nba-faces-kevin.jpg", "nba-faces-james.jpg", "nba-faces-steph.jpg", "nba-faces-kobe.jpg", "nba-faces-kevin.jpg", "nba-faces-james.jpg"];
var imageValues = [];

//event listeners
start.on("click", function(){
  beginTimer();
  $(".overlay-container").remove();
});
pause.on("click", pauseTimer);
reset.on("click", playAgain);


// shuffles the images
Array.prototype.cardShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

imageArray.cardShuffle();


// places an image in the card container
for(var i=0; i < imageArray.length; i++){
  $(".back").eq(i).html("<img src='" + imageArray[i] + "' />");
}


// timer countdown in seconds
function startTimer(){
  if(timer == 0){
    timer = 0;
    alert ("Game over!");
    clearInterval(timerId);
  } else {
      timer-=1;
      time.html(timer);
      return;
  }
};

// timer calls increment and sets 1 second intervals
function beginTimer(){
  if(timer<20){
    return;
  } else {
    timerId = setInterval(startTimer, 1000);
  }
}

// timer gets paused
function pauseTimer(){
  clearInterval(timerId);
}

// timer gets cleared and resets to 0, reloads page
function playAgain(){
  clearInterval(timerId);
  timer=15;
  time.html("20");
  document.location.reload(true);
}

//main game function
$(".card").on("click", function(){

  var card = $(this);
  var value = card.find("img").attr("src");
  imageValues.push(value);
  card.toggleClass("flip");
  if(imageValues.length == 3){
    console.log(imageValues);
      if(imageValues[0] == imageValues[1]){
        console.log("DID MATCH");

        //adding points
        var pointsCount = $(".points")
        points+=1;
        pointsCount.html(points);

    } else {
      console.log("DID NOT MATCH");
        //removes cards that have a class of flip since did not match
        card.siblings(".flip").removeClass("flip");
    }
      imageValues = [imageValues[2]];
    }
      winGame();
  })

//checks if user has flipped all cards and won the game
function winGame(){
  var isFlipped = $(".card").filter(".flip").length;
  console.log(isFlipped);
  if(isFlipped === 8){
    alert("You won the game!");
    pauseTimer();
  } else {
    console.log("false");
  }

}


})
