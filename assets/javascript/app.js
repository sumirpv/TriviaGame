$(document).ready(function(){
  alert("I am working")




$.fn.trivia = function() {
  var obj = this;
  obj.userPick = null;
  obj.answers = {
      correct: 0,
      incorrect: 0
  };
  obj.images = null;
  obj.count = 30;
  obj.current = 0;
  obj.questions = [{
    question: "Name the school that Harry Potter attended?",
    choices: ["Hogwarts", "Chennai", "Rasipuram", "Miracat"],
    images: ["../images/Rajah.gif"],
    correct: 0
}, {
    question: "Which country is home to the kangaroo?",
    choices: ["India", "America","Australia","China"],
    correct: 2

}, {
    question: "Which river flows through London?",
    choices: ["Rocky Mountain", "The Thames", "The Ganges", "The Nile"],
    correct: 1

}, {
    question: "How many colours are in a rainbow?",
    choices: ["4 Colors", "6 Colors", "8 Colors", "7 Colors"],
    correct: 3

}, {
    question: "Which Italian city is famous for its leaning tower?",
    choices: ["Pisa", "Eiffel Tower", "Skylon Tower", "Space Needle"],
    correct: 0

}, {
    question: "What food do Giant Pandas normally eat?",
    choices: ["PineCone", "Turmuric", "Bamboo", "Cucumber"],
    correct: 2

}, {
    question: "What is the name of the fairy in Peter Pan?",
    choices: ["Sugar Plum Fairy", "Tooth Fairy", "Tinkerbell", "White Fairy"],
    correct: 2

}, {
    question: "How many days are there in a fortnight?",
    choices: ["12 Days", "21 Days", "9 Days", "14 Days"],
    correct: 3
}];
  obj.ask = function() {
      if (obj.questions[obj.current]) {
          $("#timer").html("Time remaining: " + "00:" + obj.count + " secs");
          $("#question_div").html(obj.questions[obj.current].question);
          var choicesArr = obj.questions[obj.current].choices;
          var buttonsArr = [];

          for (var i = 0; i < choicesArr.length; i++) {
              var button = $('<button class="btnsize">'+'</button> <br>');
              button.text(choicesArr[i]);
              button.attr('data-id', i);
              $('#choices_div').append(button);
          }
          window.triviaCounter = setInterval(obj.timer, 1000);
      } else {
          $('body').append($('<div>'+'</div>', {
            text: 'Correct Answers: ' + (
                obj.answers.correct  ),
            class: 'result'
        }));
        $('body').append($('<div>'+'</div>', {
          text: 'Incorrect Answers: ' + (
            obj.answers.incorrect ),
          class: 'result'
      }));
      $('body').append($('<div>'+'</div>', {
        text: 'Unanswered: ' + (
            obj.questions.length - (obj.answers.correct + obj.answers.incorrect)),
        class: 'result'
    }));
         
          $('#start_button').text('Restart').appendTo('body').show();
      }
  };
  obj.timer = function() {
      obj.count--;
      if (obj.count <= 0) {
          setTimeout(function() {
              obj.nextQ();
          });

      } else {
          $("#timer").html("Time remaining: " + "00:" + obj.count + " secs");
      }
  };
  obj.nextQ = function() {
      obj.current++;
      clearInterval(window.triviaCounter);
      obj.count = 30;
      $('#timer').html("");
      setTimeout(function() {
          obj.cleanUp();
          obj.ask();
      }, 1000)
  };
  obj.cleanUp = function() {
      $('div[id]').each(function(item) {
          $(this).html('');
      });
      $('.correct').html('Correct answers: ' + obj.answers.correct);
      $('.incorrect').html('Incorrect answers: ' + obj.answers.incorrect);
  };
  obj.answer = function(correct) {
      var string = correct ? 'correct' : 'incorrect';
      obj.answers[string]++;
      $('.' + string).html(string + ' answers: ' + obj.answers[string]);
  };
  return obj;
};
var Trivia;

$("#start_button").click(function() {
  $(this).hide();
  $('.result').remove();
  $('div').html('');
  Trivia = new $(window).trivia();
  Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
  console.log("I am clicked");
  var userPick = $(this).data("id"),
      obj = Trivia || $(window).trivia(),
      index = obj.questions[obj.current].correct,
      correct = obj.questions[obj.current].choices[index];

  if (userPick !== index) {
      $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
      obj.answer(false);
  } else {
      $('#choices_div').text("Correct!!! The correct answer was: " + correct);
      obj.answer(true);
  }
  obj.nextQ();
});



});


















// $(document).ready(function(){
   
// //variable declaration
// var questions;
// var answers=[];
// //object declaration
// var trivia = {
//    question1 : " Name the school that Harry Potter attended?",
//    ans1 : "Hogwarts",
//    answers1 :[ "Hogwarts", "Chennai", "Rasipuram"],
//    question2 : "Which country is home to the kangaroo?",
//    ans2 : "Australia",
//    answers2 : ["Australia","India", "America"],
//    Question3 : "How many colours are in a rainbow?",
//    ans3 : "7",
//    answer3 : ["4", "6", "8", "7"]

// }
// var arrofobject=[
//     { question :"Name the school that Harry Potter attended? ",
//         options:{
//            a :  "Hogwarts",
//            b : "Chennai",
//            c : "Rasipuram"
//                 },
//         answer : "a"
//      },
//     {
//         question : "Which country is home to the kangaroo? ",
//             options:{
//                 a : "Australia",
//                 b : "India",
//                 c :  "America"
//                  },
//             answer : "a"
//                 },
//    {
//        question :"How many colours are in a rainbow? ",
//             options :{
//                 a : "4",
//                 b : "6", 
//                 c : "7"
//              },
//              answer : "c"
//             }
//         ];


// /* console.log(trivia);
// console.log(trivia.question1);
// console.log(trivia.answers1); */
// //console.log(arrofobject[0]);

// function check(var1, var2){
//     if ( var1 === var2){
//         console.log(" true");
//     }
//     else{
//         console.log("false");
//     }

// }
// var checkingAnswer;

// $(".btn").click(function () { 
//     $(".btn").hide();

//     $.each(arrofobject, function(index, val) {
//         $("#question").text(val.question1);
//         console.log(val.question);
//         $("#answer").html("<button class='answerBtn'>"+val.options.a +"</button> <br>");
//        // $("#answer").append("<button class='answerBtn'>"+val.options.b +"</button> <br>");
//        // $("#answer").append("<button class='answerBtn'>"+val.options.c +"</button> <br>");



//         console.log( val.options.a);
//         console.log( val.options.b);
//         console.log( val.options.c);

        
//     });




//     $("#question").text(trivia.question1);
//     var answer=trivia.answers1;


    // var txt="";

    
    // for (var x=0 in trivia){
    //     txt += trivia[x];
    //     setInterval(txt, 500);
    //     console.log(txt);


    // }



   
    //trying to print answer1 and checking with correct answer
    // for(var i=0; i< answer.length;i++){
        
    //     $("#answer").append("<button class='answerBtn'>"+answer[i] +"</button> <br>");
    //     console.log(answer[i]);
    //     $(".answerBtn").on("click", function(){

    //       checkingAnswer=  check(trivia.ans1, answer[i]);
            
    //     })
    //     console.log(" this is check" + checkingAnswer);

    // }

  
//  });

//  $.each(trivia, function(index, val) {
//     console.log(val.question1);
// });

// function
// $.each(obj, function(i,val){
//     $(".main").append(i + " =>" + val + " <br/>") ;
//     console.log(question);
// });



// // });

// $(document).ready(function() {
// var userPick =null ;

// var correctAnswer = 0;

// var incorrectAnswer = 0;

// var unAnswer = 0;

// var question = 0;

// var images;

// var count=10;
// var current =0;

// var disneyQuestion = [{
// question: "In Aladdin, what is the name of Jasmine's pet tiger?",
// choices: ["Rajah", "Bo", "Iago", "Jack" ],
// //images:  ["../images/Rajah.gif"],
// correct: 0
// }, {
// question:"In Peter Pan, Captain Hook had a hook on which part of his     body?",
// choices: ["Right Foot", "Left Hand", "Left Foot", "Right Hand"],
// correct: 1

// }, {
// question:"In the Lion King, where does Mufasa and his family live?",
// choices: ["Rocky Mountain", "Forest", "Desert", "Pride Rock"],
// correct: 3

// }, {
// question:"In Beauty and the Beast, how many eggs does Gaston eat for    breakfast?",
// choices: ["2 Dozen", "5 Dozen", "5000", "0"],
// correct: 1

// }, {
// question:"In Alice in Wonderland, what is the name of Alice’s kitten?",
// choices: ["Dinah", "Sammie", "Kat", "Luna"],
// correct: 0

//  }, {
// question:"After being on earth, where did Hercules first meet his   father Zeus?",
// choices: ["Mount Olympus", "Greece", "In the Temple of Zeus", "Elysian   Fields"],
// correct: 2

// }, {
// question:"During the ballroom scene of Beauty & the Beast, what color is Belle’s Gown?",
// choices: ["Yellow", "Blue", "Gold", "White"],
// correct: 2

// }, {
// question:"In Bambi, what word does the owl use to describe falling in love?",
// choices: ["Whimsical", "Miserable", "Joyful", "Twitterpatted"],
// correct: 3

// }

// ];

// $('body').on('click', '#reset',function (){

//     var userPick =null ;

//     var correctAnswer = 0;
    
//     var incorrectAnswer = 0;
    
//     var unAnswer = 0;
    
//     var question = 0;
    
//     var images;
    
//     timer();
//     displayTrivia();


// });
  

// $("#start_button").click(function(){
//   //  alert("i am pressed");
// $(this).hide();
// counter = setInterval(timer, 1000); 
// displayTrivia(0);

// }); 


// function timer(){
// count--;
// if (count <= 0) {
//  clearInterval(counter);
//  return;
// }


//  $("#timer").html("Time remaining: " + "00:" + count + " secs");
// }


// function displayTrivia(questionNum) {
// $("#question_div").html(disneyQuestion[questionNum].question);
// question++;

//   var choicesArr = disneyQuestion[questionNum].choices;
//   var buttonsArr = [];

//   for (let i = 0; i < choicesArr.length; i++) {
//     var newdiv = $("<div id='clickdiv'>"+"</div><br>");
//     newdiv.text(choicesArr[i]);
//     newdiv.attr('data-id', i);
//     $('#choices_div').append(newdiv);
//    }

//   } 

//  $('#choices_div').on('click', '#clickdiv', function(e){
//  userPick = $(this).data("id");
//  disneyQuestion[0].correct;
//  if(userPick != disneyQuestion[0].correct) {

//  $('#choices_div').text("Wrong Answer! The correct answer is Rajah.");
//  incorrectAnswer++;

// } else if (userPick === disneyQuestion[0].correct) {
// $('#choices_div').text("Correct!!! The pet tiger name is Rajah");
// correctAnswer++;

// }


// });

// });