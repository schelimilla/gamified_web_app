// import { leaderboardData } from './leaderboard_data.js';


var total_points = 0;

function updatePointsDisplay(points) {
    var pointsElement = document.getElementById('points');
    pointsElement.textContent = "My Points: " + points;
}

function saveLeaderboardData(data) {
    sessionStorage.setItem('leaderboardData', JSON.stringify(data));
}

function loadLeaderboardData() {
    const data = sessionStorage.getItem('leaderboardData');
    return JSON.parse(data) || [];
}

// let currentPoints = 0;
// let leaderboardData = [];
function updateLeaderboard(newScore) {
    const leaderboardData = loadLeaderboardData();
    const youEntryIndex = leaderboardData.findIndex(entry => entry.name === 'YOU');
    // console.log(youEntryIndex);
    const currentPoints = leaderboardData[youEntryIndex].points;
    // currentPoints = leaderboardData[youEntryIndex].points;
    if (youEntryIndex !== -1) {
        leaderboardData[youEntryIndex].points = currentPoints + newScore;
        saveLeaderboardData(leaderboardData);
    }
}

// var selectedCorrectAnswer = false;
// var selectedCorrectAnswerAgain = false;
// var selectedWrongAnswer = false;

const data = sessionStorage.getItem('data_types_answered');
const entries = JSON.parse(data) || [];

// Get all radio buttons
var radioButtons = document.querySelectorAll('input[type="radio"]');

// Add event listener to each radio button
radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', function() {

        var carouselItem = this.closest('.carousel-item');
        // console.log('carouselItem:', carouselItem);

        var messageDiv = carouselItem.querySelector('#message-' + carouselItem.getAttribute('question-num'));
        // console.log('messageDiv:', messageDiv);

        var form = carouselItem.querySelector('form');
        // console.log('form:', form);

        var pointsBadge = carouselItem.querySelector('.badge');


        var explanation = form.getAttribute('explanation');
        var selectedAnswer = form.querySelector('input[name="options"]:checked').value;
        var correctAnswer = form.getAttribute('correct-answer');
        // var points_earned = parseInt(form.getAttribute('point-value'));
        var points_earned = parseInt(form.getAttribute('point-value'));
        var point_value = parseInt(form.getAttribute('point-value'));
        // console.log("POINTS EARNED: " + points_earned);

        function updateQuestionAnswered(correct){
            entries.forEach(entry => {
                // console.log("entry question num: ", typeof entry.question_num);
                // console.log("passed in question num: ", typeof carouselItem.getAttribute('question-num'));
                if (entry.question_num === carouselItem.getAttribute('question-num')){
                    // console.log("question num matched!");
                    if (correct === 'true'){
                        entry.answered = 'true';
                    }
                    else {
                        entry.answered = 'false';
                    }
                    // console.log("entries: " + entries);
                    sessionStorage.setItem('data_types_answered', JSON.stringify(entries));                }
            });
        }


        // Check if the radio button is checked
        if (this.checked) {
            // Display different message based on the selected option
            updateQuestionAnswered('true');
            if (selectedAnswer === correctAnswer) {
                // console.log("correct answer selected");
                pointsBadge.style.backgroundColor = "#6AFF33";
                if (carouselItem.dataset.answeredIncorrectlyBefore === "true"){
                    // console.log("resetting");
                    carouselItem.dataset.answeredIncorrectlyBefore = "false";
                }
                if (carouselItem.dataset.answeredCorrectlyBefore === "false") {
                    // console.log("first time answering correctly");
                    carouselItem.dataset.answeredCorrectlyBefore = "true";
                    messageDiv.textContent = "Correct!";
                    // points_earned = parseInt(form.getAttribute('point-value'));
                }
            } else {
                updateQuestionAnswered('false');
                // console.log("wrong answer selected");
                // selectedWrongAnswer = true;
                messageDiv.textContent = explanation;
                pointsBadge.style.backgroundColor = "red";
                // points_earned = 0;
                if (carouselItem.dataset.answeredCorrectlyBefore === "true") {
                    // console.log("answered correctly first but then incorrectly");
                    points_earned = -1 * points_earned;
                }
                if (carouselItem.dataset.answeredIncorrectlyBefore === "true") {
                    // console.log("answered incorrectly again");
                    points_earned = 0;
                }
                if (points_earned === point_value){
                    points_earned = 0;
                }
                carouselItem.dataset.answeredIncorrectlyBefore = "true";
                
                
            }
        }
        // console.log("POINTS EARNED: " + points_earned);
        total_points += points_earned;
        // console.log("TOTAL POINTS: " + total_points);
        updatePointsDisplay(total_points);
        updateLeaderboard(points_earned);
    });

});
