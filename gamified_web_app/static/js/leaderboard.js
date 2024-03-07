window.addEventListener('load', function() {
    function loadLeaderboardData() {
        const data = sessionStorage.getItem('leaderboardData');
        return JSON.parse(data) || [];
    }

    function renderLeaderboard() {
        const leaderboardData = loadLeaderboardData();
        const sortedLeaderboardData = leaderboardData.sort((a, b) => b.points - a.points);
        const container = document.getElementById('leaderboard-container');

        // console.log(sortedLeaderboardData);
        sortedLeaderboardData.forEach((entry, index) => {
            entry.rank = index + 1;
            const ul = document.createElement('ul');
            ul.className = 'list-group list-group-horizontal';
            ul.innerHTML = `
                <li class="list-group-item rank ${entry.name === 'YOU' ? 'highlight' : ''}">${entry.rank}</li>
                <li class="list-group-item name ${entry.name === 'YOU' ? 'highlight' : ''}">${entry.name}</li>
                <li class="list-group-item points ${entry.name === 'YOU' ? 'highlight' : ''}">${entry.points}</li>
            `;
            container.appendChild(ul);
        });

        checkUserRank(leaderboardData);
    }

    renderLeaderboard();
});


///////


window.addEventListener('load', function() {
    // data types progress
    const data = sessionStorage.getItem('data_types_answered');
    const entries = JSON.parse(data) || [];
    var data_types_answered_counter = 0;
    entries.forEach(entry => {
      if (entry.answered === "true"){
        data_types_answered_counter += 1;
      }
    });
    
    var percentCorrect = Math.floor((data_types_answered_counter/7)*100);
    var progressWidth = percentCorrect + '%';
    var progressBar = document.querySelector('.pb1');
    progressBar.style.width = progressWidth;
    progressBar.textContent = progressWidth;

    // data types progress
    const data_sm = sessionStorage.getItem('string_methods_answered');
    const entries_sm = JSON.parse(data_sm) || [];
    var string_methods_answered_counter = 0;
    entries_sm.forEach(entry => {
      if (entry.answered === "true"){
        string_methods_answered_counter += 1;
      }
    });
    
    var percentCorrect2 = Math.floor((string_methods_answered_counter/12)*100);
    var progressWidth2 = percentCorrect2 + '%';
    var progressBar2 = document.querySelector('.pb2');
    progressBar2.style.width = progressWidth2;
    progressBar2.textContent = progressWidth2;

    // check progress
    checkProgress(data_types_answered_counter);

  });

///////

var imageUrls = JSON.parse(sessionStorage.getItem('image_urls')) || [];


function displayImages() {
var container = document.getElementById("image-container");
container.innerHTML = ""; 

imageUrls.forEach(function(url) {
    var img = document.createElement("img");
    img.src = url;
    img.alt = "Image";
    container.appendChild(img);
});
}

displayImages();

/////

function checkUserRank(leaderboardData) {
    leaderboardData.forEach((entry) => {
        if (entry.name === "YOU"){
            if (entry.rank === 1){
                imageUrls[0] = "static/img/leaderboard_1.png";
                sessionStorage.setItem('image_urls', JSON.stringify(imageUrls));   
            }
            if (entry.rank === 2){
                imageUrls[1] = "static/img/leaderboard_2.png";
                sessionStorage.setItem('image_urls', JSON.stringify(imageUrls));   
            }
            if (entry.rank === 3){
                imageUrls[2] = "static/img/leaderboard_3.png";
                sessionStorage.setItem('image_urls', JSON.stringify(imageUrls));   
            }
        }
    });
    displayImages();
}

////

function checkProgress(data_types_answered_counter){
    console.log("counter: " + data_types_answered_counter);
    if (data_types_answered_counter === 7){
        imageUrls[3] = "static/img/mastery_1.png";
        sessionStorage.setItem('image_urls', JSON.stringify(imageUrls)); 
    }
    displayImages();
}

