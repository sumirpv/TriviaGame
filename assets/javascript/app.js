$(document).ready(function(){

  jQuery.fn.triviaGame= function() {
  //assign this to the variable obj 
  var obj = this;
    //timer function
    obj.timer = function() {
        obj.count--;
        if (obj.count <= 0) {
            setTimeout(function() {
                obj.nextQuestion();
            });
  
        } else {
          //display time
            $("#timer").html("Time remaining: " + obj.count + " secs");
        }
    };
  //creating an array of objects
  obj.questions = [{
    question: "Name the school that Harry Potter attended?",
    options: ["Hogwarts", "Chennai", "Rasipuram", "Miracat"],
    correct: 0
}, {
    question: "Which country is home to the kangaroo?",
    options: ["India", "America","Australia","China"],
    correct: 2

}, {
    question: "Which river flows through London?",
    options: ["Rocky Mountain", "The Thames", "The Ganges", "The Nile"],
    correct: 1

}, {
    question: "How many colours are in a rainbow?",
    options: ["4 Colors", "6 Colors", "8 Colors", "7 Colors"],
    correct: 3

}, {
    question: "Which Italian city is famous for its leaning tower?",
    options: ["Pisa", "Eiffel Tower", "Skylon Tower", "Space Needle"],
    correct: 0

}, {
    question: "What food do Giant Pandas normally eat?",
    options: ["PineCone", "Turmuric", "Bamboo", "Cucumber"],
    correct: 2

}, {
    question: "What is the name of the fairy in Peter Pan?",
    options: ["Sugar Plum Fairy", "Tooth Fairy", "Tinkerbell", "White Fairy"],
    correct: 2

}, {
    question: "How many days are there in a fortnight?",
    options: ["12 Days", "21 Days", "9 Days", "14 Days"],
    correct: 3
}];
console.log(obj.questions);
console.log(obj.questions[3]);
console.log(obj.questions[3].correct);
obj.userPick = null;
//create an answers object 
obj.answers = {
    correct: 0,
    incorrect: 0
};
obj.count = 30;
obj.current = 0;
//displaying the question and anwer chocie
  obj.display = function() {

      if (obj.questions[obj.current]) {
        //display timer
          $("#timer").html("Time remaining: "  + obj.count + " secs");
          $("#question_div").html(obj.questions[obj.current].question);
          var choicesArr = obj.questions[obj.current]. options;
          var buttonsArr = [];

          for (var i = 0; i < choicesArr.length; i++) {
              var button = $('<button class="btnsize">'+'</button> <br>');
              button.text(choicesArr[i]);
              button.attr('data-id', i);
              $('#choices_div').append(button);
          }
          //setting the interval
          window.triviaCounter = setInterval(obj.timer, 1000);
          //display the answers in a button
      } else {
        // display the correct answer number
          $('#continer').append($('<div>'+'</div>', {
            text: 'Results are : ' ,
            class: 'result'
        }));
       // display the correct answer number
          $('#continer').append($('<div>'+'</div>', {
            text: 'Correct Answers: ' + (
                obj.answers.correct  ),
            class: 'result'
        }));
        //display the incorrect answer in the div
        $('#continer').append($('<div>'+'</div>', {
          text: 'Incorrect Answers: ' + (
            obj.answers.incorrect ),
          class: 'result'
      }));
      // this one is for un snsweered questions
      $('#continer').append($('<div>'+'</div>', {
        text: 'Unanswered: ' + (
            obj.questions.length - (obj.answers.correct + obj.answers.incorrect)),
        class: 'result'
    }));
         // add all the results next to start button
          $('#start_button').text('Restart').appendTo('#continer').show();
      }
  };

  //next question function to display the questions
  obj.nextQuestion = function() {
      obj.current++;
      clearInterval(window.triviaCounter);
      obj.count = 30;
      $('#timer').html("");
      setTimeout(function() {
          obj.update();
          obj.display();
      }, 1000)
  };
  // creating a update function
  obj.update = function() {
      $('div[id]').each(function(item) {
          $(this).html('');
      });
      $('.correct').html('Correct answers: ' + obj.answers.correct);
      $('.incorrect').html('Incorrect answers: ' + obj.answers.incorrect);
  };
  //creating a function to check if the answer is correct or not using itenary
  obj.answer = function(correct) {
      var string = correct ? 'correct' : 'incorrect';
      obj.answers[string]++;
      $('.' + string).html(string + ' answers: ' + obj.answers[string]);
  };
  return obj;
};
//creating a variable
var Trivia;
// if the button was clicked to do this action
$("#start_button").click(function() {
  $(this).hide();
  $('.result').remove();
  $('div').html('');
  Trivia = new $(window).triviaGame();
  Trivia.display();
});
//creating a function for clicking the choices
$('#choices_div').on('click', 'button', function(e) {
  console.log("I am clicked");
  var userPick = $(this).data("id"),
      obj = Trivia || $(window).triviaGame(),
      index = obj.questions[obj.current].correct,
      correct = obj.questions[obj.current]. options[index];
//checking if the user picked the correct answer or not
  if (userPick !== index) {
      $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
      obj.answer(false);
  } else {
      $('#choices_div').text("Correct!!! The correct answer was: " + correct);
      obj.answer(true);
  }
  obj.nextQuestion();
});



});









