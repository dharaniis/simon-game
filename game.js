const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = []
let level=1;
let gameStarted=0;
let clickCount=0;
let gameOverExe=0;

function isEqual(a, b) {
    return a.join() == b.join();
}

function animatePress(color) {
    let selector = "." + color;
    $(selector).fadeOut(50);
    $(selector).fadeIn(50);
    $(selector).addClass("pressed");
    setTimeout(function () {
        $(selector).removeClass("pressed");
    }, 100);
}

function playSound(color) {
    let audiofile = "sounds/" + color + ".mp3";
    let beat = new Audio(audiofile);
    beat.play();
}


function nextSequence(){
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    gamePattern.push(randomChosenColor);
}

function gotClicked(clickColor){
    playSound(clickColor);
    animatePress(clickColor);
    userClickedPattern.push(clickColor);
}

function gameStart(){
    gameStarted=1;
    userClickedPattern=[];
    $("h1").text("Level "+level);
    console.log("starts");
    nextSequence();
    level+=1;
}

function nextLevel(){
    setTimeout(function(){
        $("h1").text("Level "+level);
        nextSequence();
        level+=1;
        userClickedPattern=[];
        clickCount=0;
    },1000);

}

function gameReset(){
    gamePattern = [];
    userClickedPattern = []
    level=1;
    clickCount=0;
    
}

function gameOver(){
    gameStarted=0;
    playSound("wrong");
    $("body").addClass("gameOver");
    setTimeout(function(){
        $("body").removeClass("gameOver");
    },100);
    $('body').keypress(function(event){
        $('body').off('keypress');
        if (!gameOverExe){
            gameReset();
            gameStart();
            gameOverExe=1;
        }
    })
}


function buttonClick(element){
        clickColor=element.id;
        gotClicked(clickColor);
        clickCount+=1
        if (gameStarted){
            if (userClickedPattern[clickCount-1]==gamePattern[clickCount-1]){
                
                if ((clickCount==gamePattern.length)&&(isEqual(userClickedPattern,gamePattern))){
                        nextLevel();
                }
            }
            else{
                $("h1").text("Game Over, Press Any Key to Restart");
                gameOver();
                gameOverExe=0;

            }
        }
        else{
            $("h1").text("Game Over, Press Any Key to Restart");
            gameOver();
            gameOverExe=0;
        }
}


$('body').keypress(function(event){
    if (event.key=="a"){
        $('body').off('keypress');
        gameStart();
    }
})




