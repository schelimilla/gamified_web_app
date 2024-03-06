
function saveLeaderboardData(data) {
    sessionStorage.setItem('leaderboardData', JSON.stringify(data));
}

const leaderboardData = [
    {'rank': 1, 'name': 'John', 'points': 92},
    {'rank': 2, 'name': 'Jane', 'points': 87},
    {'rank': 3, 'name': 'Alex', 'points': 60},
    {'rank': 4, 'name': 'Stacy', 'points': 45},
    {'rank': 5, 'name': 'Jolene', 'points':21},
    {'rank': 6, 'name': 'YOU', 'points': 0},
    {'rank': 7, 'name': 'Mark', 'points': 2}
];

const leaderboardDataFromStorage = sessionStorage.getItem('leaderboardData');
if (leaderboardDataFromStorage === null){
    saveLeaderboardData(leaderboardData);   
}

//////////////////

data_types_answered = [
    {"question_num": '1', "answered": "false"},
    {"question_num": '2', "answered": "false"},
    {"question_num": '3', "answered": "false"},
    {"question_num": '4', "answered": "false"},
    {"question_num": '5', "answered": "false"},
    {"question_num": '6', "answered": "false"},
    {"question_num": '7', "answered": "false"},
]


const dataTypesAnsweredFromStorage = sessionStorage.getItem('data_types_answered');
if (dataTypesAnsweredFromStorage === null){
    sessionStorage.setItem('data_types_answered', JSON.stringify(data_types_answered));
}


var image_urls = [
    "static/img/locked.png",
    "static/img/locked.png",
    "static/img/locked.png",
    "static/img/locked.png",
    "static/img/locked.png",
    "static/img/locked.png",
    "static/img/locked.png",
    "static/img/locked.png",
    "static/img/locked.png"
];

const imageUrlsFromStorage = sessionStorage.getItem('image_urls');
if (imageUrlsFromStorage === null){
    sessionStorage.setItem('image_urls', JSON.stringify(image_urls));
}