var slide1 = document.querySelector('.slide_1');
var slide2 = document.querySelector('.slide_2');
var slide3 = document.querySelector('.slide_3');

var teamAflag =  document.querySelector('.teamA_flag img');
var teamBflag =  document.querySelector('.teamB_flag img');
var teamAicon =  document.querySelector('.teamA_icon img');
var teamBicon =  document.querySelector('.teamB_icon img');

var teamA_prediction = document.querySelector('.predict_box1');
var teamB_prediction = document.querySelector('.predict_box2');

var linkTest = document.querySelector('.link_text');
var prediction1,prediction2;

var currDate='';



var vid = document.getElementById('vid');
var url = "https://ms.purplepatch.online/jarvis/berger/predict_video/images/";

var countryFlag = [ "1188.png", "1.png", "2.png", "5.png", "4.png", "3.png", "6.png", "7.png", "8.png", "9.png"];
var countryName = [  "AFG","AUS","BAN","ENG","IND","NZ","PAK","SA","SL","WI"];

countryFlag[1188] = "1188.png";
countryName[1188] = "AFG";

// var today = new Date();
// var currDate = today.getDate();


prediction1 = countryName[5];
prediction2 = countryName[3];
teamAflag.src = url + countryFlag[5];
teamBflag.src = url + countryFlag[3];
teamAicon.src = url + countryFlag[5];
teamBicon.src = url + countryFlag[3];
// our date time
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        currDate= JSON.parse(xhttp.responseText);
        console.log(currDate.day);
        switch(currDate.day){
            case 4:
                prediction1 = countryName[1188];
                prediction2 = countryName[9];
                teamAflag.src = url + countryFlag[1188];
                teamBflag.src = url + countryFlag[9];
                teamAicon.src = url + countryFlag[1188];
                teamBicon.src = url + countryFlag[9];
            break;
            case 5:
                prediction1 = countryName[6];
                prediction2 = countryName[2];
                teamAflag.src = url + countryFlag[6];
                teamBflag.src = url + countryFlag[2];
                teamAicon.src = url + countryFlag[6];
                teamBicon.src = url + countryFlag[2];
                break;
        }
    }
};
xhttp.open("get", 'https://ms.purplepatch.online/database/datetime/index.php', true);
xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhttp.send();
// end




teamAflag.addEventListener('click',takeFirst);
teamBflag.addEventListener('click',takeSecond);

slide3.addEventListener('click',landingPage);


function takeFirst() {
    secondSlide();
    vote(prediction1);
}

function takeSecond() {
    secondSlide();
    vote(prediction2);
}

function vote(data){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var teams =JSON.parse(xhttp.responseText);
            var team_one=teams[prediction1.toLowerCase()];
            var team_two=teams[prediction2.toLowerCase()];

            teamA_prediction.innerHTML= team_one+'%';
            teamB_prediction.innerHTML= team_two+'%';

            teamA_prediction.style.width=team_one+'%';
            teamB_prediction.style.width=team_two+'%';
            console.log(teams);
            //  console.log(team_one);
            //   console.log(team_two);
        }
    };
    xhttp.open("POST", '//ms.purplepatch.online/database/predict_video.php', true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send('info='+[data,window.top.location.href]);
}




    




function secondSlide() {
    slide1.className = slide1.className.replace('show', 'hidden');
    slide2.className = slide2.className.replace('hidden', 'show');
    setTimeout(function () {
        vid.play();
    },100)
    vid.addEventListener('ended',thirdSlide, false);
}

function landingPage() {
    window.open('https://www.youtube.com/watch?v=1U5HfeK2yBw');
}

function thirdSlide() {
    slide2.className = slide2.className.replace('show', 'hidden');
    slide3.className = slide3.className.replace('hidden', 'show');
}
