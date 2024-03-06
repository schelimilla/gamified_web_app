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
    const data = sessionStorage.getItem('data_types_answered');
    const entries = JSON.parse(data) || [];
    var answered_counter = 0;
    entries.forEach(entry => {
      if (entry.answered === "true"){
        answered_counter += 1;
      }
    });
    // var display_answered_correctly = document.getElementById("answered_correctly");
    // display_answered_correctly.textContent = answered_counter;
    
    var percentCorrect = Math.floor((answered_counter/7)*100);
    var progressWidth = percentCorrect + '%';
    var progressBar = document.querySelector('.pb1');
    progressBar.style.width = progressWidth;
    progressBar.textContent = progressWidth;
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
