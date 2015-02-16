//array of question objects
var allQuestions = [
    {question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Malcom Tucker", "Nicola Murray"], correctAnswer:0},
    {question: "Who is the President of Argentina?", choices: ["Nestor Kirchner", "Christina Fernandez", "Eduardo Dulhalde", "Reynaldo Bignone"], correctAnswer:1},
    {question: "What is the capitol of Australia?", choices: ["Sydney", "Auckland", "Canberra", "Darwin"], correctAnswer:2},
    {question: "Who is current chair of the Federal Reserve?", choices: ["Alan Greenspan", "Paul Volcker", "Ben Bernanke", "Timothy Geitner", "Janet Yellen"], correctAnswer:4}
];

//function to dynamically generate html for next question
function addNextQuestion (nextQuestion) {
    "use strict";
    var questionContent="";

    //display the question
    questionContent += "<form>" + "<p>" + nextQuestion.question + "</p>";

    //display the choices, value attribute lets us compare user response to correct answer
    for(var i = 0; i < nextQuestion.choices.length; i++) {
        questionContent += "<br>" + "<input type ='radio' name='radAnswer' value=" + i + ">"  + nextQuestion.choices[i];
    }

    //add the submit button
    questionContent += "<br><input id='submitAnswer' type ='submit' value='Submit Answer'></form>";

    //return the completed string to be used with .html()
    return questionContent;
}

//event handlers to listen for button press
$(document).ready(function() {
    "use strict";
    //initialize the score tally using data attribute in the div with the score class
    $("div.score").data('score', 0);

    //listen for startQuiz button click
    $("#startQuiz").click(function(){
        //remove startQuiz button
        $("div.start").html("");

        //display first question
        $("div.question").html(function() {
            return addNextQuestion(allQuestions[0]);
        }).data("q", 0);
        //set data attribute 'q' to keep track of current question number
        //question number starts at zero to make it easy to reference the allQuestions array
    });

    //listen for subsequent button click events
    //need to use $('body').on since the script is injecting new html to change questions
    //can't bind an event handler directly on #submitAnswer since it may not exist yet
    $('body').on('click', '#submitAnswer' ,function(){

        //get the answer that was selected
        var answer = $("input:radio[name='radAnswer']:checked").val();

        //get the question number that was just answered
        var getCurrQ = $("div.question").data("q");

        //check for a valid answer before continuing
        if(typeof answer === 'string') {
            //clear out the error div since last question was answered
            $('div.error').html("");

            if(answer == allQuestions[getCurrQ].correctAnswer) {
                //get current score so we can add 1 to it after a correct answer
                var getCurrScore = $('div.score').data('score');
                $('div.score').data('score', getCurrScore+1);
                alert('Correct! Your current score is ' + $('div.score').data('score'));
            }
            //generate next question if last question has not been loaded
            //remember that getCurrQ is 0 index based
            if(getCurrQ < allQuestions.length - 1) {
                $('div.question').html(function() {
                    return addNextQuestion(allQuestions[getCurrQ+1]);
                }).data("q", getCurrQ+1); //update data.q to reflect next question loaded
            }
            else {
                //end of quiz so remove last question
                $('div.question').html("");
                var scoreText = "<p>" + "You got " + $('div.score').data('score') + " question(s) out of " + allQuestions.length + " correct!" + "</p>";
                //generate final score
                $('div.score').html(function(){
                    return scoreText;
                });
            }
        } else {
            //alert('Please select an answer');
            $('div.error').html("<p>Please select an answer.</p>");
            $('div.question').html(function() {
                return addNextQuestion(allQuestions[getCurrQ]);
            });
        }
    });
});
