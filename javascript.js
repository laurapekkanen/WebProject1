//document ready

//pop up
$(function() {
$("#trump").click(function(e) {
        $("#content").load("pages/popup1.html");
    });
});
$(function() {
$("#trump2").click(function(e) {
        $("#content").load("pages/popup2.html");
    });
});
$(function() {
$("#trump3").click(function(e) {
        $("#content").load("pages/popup3.html");
    });
});

//map
function initMap() {
        var myLatLng = {lat: 62.242603, lng: 25.747257};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: myLatLng,
          gestureHandling: 'cooperative'
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      }

//quiz
var questions = [];		// all questions
var question; 			// current question asked
var correct = 0;		// correct answers count
var count;				// how many questions
var SPEED = 1000;		// break between questions

// document ready
$("document").ready(function() {
	// load json with jquery Ajax
	$.ajax({
		url: 'data/kysymykset.json',
		success: function(data) {
			// called when successful
			//console.log(data);
			// store questions to questions array
			questions = data.questions;
			count = questions.length;
			showQuestion();
			// console.log(questions.length);
		},
		error: function(request, status, error) {
			// called when serror
			console.log("request.status="+request.status+" status="+status+" error="+error);
		}
	});
});

function showQuestion() {
	// clear previous question
	$("#questionDiv").empty();
	// if all questions are asked -> end!
	if (questions.length == 0) {
		//alert("Correct answers : " + correct + "/" + count);
        $("#questionDiv").append("<p class='question'>Tulokset</p>");
        $("#questionDiv").append("<p class='result'>"+correct + "/" + count+"</p>");
		return;
	}

	// random index 0 <-> questions.length
	var questionIndex = Math.floor(Math.random()*(questions.length));
	var question = questions[questionIndex];
	// question
	$("#questionDiv").append("<p class='question'>"+question.question+"</p>");
	// answers
	for (var i=0;i<question.answers.length;i++) {
		var answer = $("<p>").text((i+1)+". "+question.answers[i].answer);
		answer.addClass("answer");
		answer.click(function() {
			// get index (element as child relative to parent), remember question p is here too!
			//console.log("pressed index:" + $(this).index());
			var answerIndex = $(this).index() - 1;
			// is it right or not
			if (question.answers[answerIndex].right == 1) {
				// add correct count
				correct++;
				$(this).css('background-color', 'green');
				$(this).css('color', 'black');
			} else {
				$(this).css('background-color', 'white');
				$(this).css('color', 'black');
			}
			// remove asked question from array
			questions.splice(questionIndex,1);
			// console.log("length = " + questions.length);
			// jump next question
			setTimeout(showQuestion, SPEED);
            body.css('background-image', 'url(img/Jyvaskyla_centrum.jpg)');
		});
		$("#questionDiv").append(answer);

	}



}

//sound
var audio = document.getElementByID("kohde");
$("#trump").mouseenter (function(){
                        audio.play();
                        });
audio.play();
