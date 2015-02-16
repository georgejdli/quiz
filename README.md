# README #
Scope of the web app (quoted from http://javascriptissexy.com/how-to-learn-javascript-properly/)

###You are building a JavaScript quiz application (you will use HTML and CSS as well) that will function as follows:

- It is a simple quiz that has radio button choices, and it will show the user her score upon completion.
- The quiz can show any number of questions and any number of choices.
- Tally the user’s score and display the final score on the last page. The last page will only show the score, so remove the last question.
- Use an array to store all the questions. 
- Each question, along with its choices and correct answer, should be stored in an object. 
		The array of questions should look similar to this:

			// Only one question is in this array, but you will add all the questions.
			var allQuestions = [{question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0}];

- Dynamically (with document.getElementById or jQuery) add the next question and remove the current question from the screen, when the user clicks the “Next” button. 
		The Next button will be the only button to navigate this version of the quiz.