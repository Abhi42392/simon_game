var gamePattern=[];
var userChoosenPattern=[];
var colors=["blue","green","red","yellow"];
var started=false;
var level=0;
$(document).keypress(function(){
    if(started===false){
        nextSequence();
    }
    started=true;
});
function nextSequence(){
    userChoosenPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomColor=colors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    level++;
    $("h1").text("Level "+level);
}

$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    userChoosenPattern.push(userChoosenColor);
    $("#"+userChoosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+userChoosenColor).removeClass("pressed");
    },200);
    playSound(userChoosenColor);
    check(userChoosenPattern.length-1);
});

function playSound(color){
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
function check(ind){
    if(gamePattern[ind]===userChoosenPattern[ind]){
        if(ind===gamePattern.length-1){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass(".game-over");
        setTimeout(function(){
            $("body").removeClass(".game-over");
        },200);
        started=false;
        level=0;
        gamePattern=[];
        $("h1").text("Game over,Press any key to Restart");
    }
}