
$(document).ready(function(){

    //arrray with trivia 
var trivia_questions = [
    {question:"What is Rachel's bra size?",
     answerChoices: ["32c", "36b", "42a", "34c"],
     correctAnswer: "32c",
     imageUrl: "assets/images/rachel.jpg"
    },
    {question:"Which of the actors decides to whiten his teeth before going out on a first date with a girl he's had a crush on for some time?",
     answerChoices: ["Joey", "Chandler", "Gunther", "Ross"],
     correctAnswer: "Ross",
     imageUrl: "assets/images/ross.jpg"
    },
    {question:"What is Joey's rule on eating with other people?",
     answerChoices: ["Everyone shares", "Nobody touches his food", "Anything goes", "Pace yourself"],
     correctAnswer: "Nobody touches his food",
     imageUrl: "assets/images/joey.jpg"
    },
    {question:"Who does Phoebe end up getting married to?",
     answerChoices: ["Mike", "Sam", "Gunther", "Joey"],
     correctAnswer: "Mike",
     imageUrl: "assets/images/phoebe-mike.jpg"
    },
    {question:"Who really owns Monica's apartment?",
     answerChoices: ["Monica", "Monica's grandma", "Monica's parents", "Monica and Ross"],
     correctAnswer: "Monica's grandma",
     imageUrl: "assets/images/group_hug.jpg"
    },
    {question:"Who came up with the name of Rachel's baby?",
     answerChoices: ["Monica", "Rachel", "Ross", "Joey"],
     correctAnswer: "Monica",
     imageUrl: "assets/images/window.jpg"
    },
    {question:"Which holiday does Chandler not like?",
     answerChoices: ["Christmas", "Valentine's Day", "Easter", "Thanksgiving"],
     correctAnswer: "Thanksgiving",
     imageUrl: "assets/images/chandler.jpg"
    }

];

var timer = 10;
var timerCountDown;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var indexCount = 0;
var answeredRight;
var clockRunning=false;
var clicked = false;

//$("#time-remaining").text(timer);

$("#timer").hide();
$("#start").on("click", startGame);

//once start game button is clicked....hide button, clear feedback divs, set timer to begin countdown
function startGame(){
    $("#right, #wrong, #unanswered").empty();
    $("#start").hide();
    $("#time-remaining").text(timer);
    displayTrivia();
   
}
//function to display trivia questions and answers from trivia_questions array
function displayTrivia(){
    $("#feedback-wrapper").hide();
    $("#time-remaining").text(timer);
    startTimer();
    
    if (indexCount === trivia_questions.length){
        $("#right").html("<h2>Total Correct: "+ correct + "</h2>");
        $("#wrong").html("<h2>Total Incorrect: "+ incorrect + "</h2>");
        $("#unanswered").html("<h2>Total Unanswered: "+ unanswered + "</h2>");
        resetGame();
        return;
    }
    
    $("#trivia-question").html("<h3>" + trivia_questions[indexCount].question + "</h3>");
        //iterate through array of trivia and display question and answer as clickable event choices
        for (var j = 0; j < trivia_questions[indexCount].answerChoices.length; j++){
            var answerOption = $("<h2>");
            answerOption.addClass("selection");
            answerOption.text(trivia_questions[indexCount].answerChoices[j]);
            $("#trivia-choices").append(answerOption);
        }

    triviaGamePlay();
       

    //allow user to select and answer
    //if correct answer is selected, update screen to show correct!,image associated with that question, and increment correct variable
    //reset timer to start again 
    //if incorrect, update screen approptiately
    //if time over, update screen appropriately

}
function triviaGamePlay(){

    $(".selection").mouseenter(function(){
        $(this).css({"background-color": "#ffcc00"});
    });

    $(".selection").mouseleave(function(){
        $(this).css({"background-color": "white"});
    });

    $(".selection").on("click", function(){
        var selected = $(this).text();
        clicked = true;
        stopTimer();
        
       

        if (clicked && selected === trivia_questions[indexCount].correctAnswer){
            correct++;
            answeredRight = true;
            
        }
        else if(clicked && selected !== trivia_questions[indexCount].correctAnswer){
            incorrect++;
            answeredRight = false;
            
        }
        
        displayFeedback();
        setTimeout(displayTrivia, 5000);
        
    }); 
    
    clicked = false;
       
} 
    //once trivia anser is selected, show feedback to player for 5 seconds 
function displayFeedback(){
        
        $("#feedback-wrapper").show();
        $("#trivia-wrapper").hide();
        $("#time-remaining").empty();

        $("#correct-answer").text("The correct answer is: " + trivia_questions[indexCount].correctAnswer);
        $("#answer-img").html("<img src=" + trivia_questions[indexCount].imageUrl + ">");

       if(answeredRight && clicked === true){
        $("#feedback").text("You are correct!");
        
       }

       else if (!answeredRight && clicked === true){
        $("#feedback").text("You are Wrong!");
        
       }
       else  {
        $("#feedback").text("You are out of time!");
    }

       indexCount++;
       $("#trivia-question").html("");
        $(".selection").remove();
        $("#trivia-wrapper").show();    
        
}    
   


function resetGame(){
    indexCount = 0;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    stopTimer();
    $("#start").show();   
}

function startTimer() {
    $("#timer").show();

    if (!clockRunning) {
      timerCountDown = setInterval(decrement, 1000);
      clockRunning = true;
    }
}

function stopTimer() {
    $("#timer").hide();
    clearInterval(timerCountDown);
    clockRunning = false;
    timer = 10;
}

function decrement() {
    $("#time-remaining").text(timer);
    timer--;
   

    if (timer < 0) {
        unanswered++;
        stopTimer();
        displayFeedback();
        setTimeout(displayTrivia, 5000);
    }
     
}
});