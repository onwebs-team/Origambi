var bird = document.getElementById('bird');
var logo = document.getElementById('logo');
var HBody = document.getElementsByTagName('body');
var moreText = document.getElementsByClassName('more-text');

var birdState = 1;
var transformed = false;
var wingsInterval = setInterval(function () {
    if (birdState==1) {
        bird.setAttribute("src", "Rcs/bird-2.png");
        birdState = 2;
    } else {
        bird.setAttribute("src", "Rcs/bird-1.png");
        birdState = 1;
    }
}, 500);

setTimeout(birdMove, 1000);
function birdMove () {
    var moveInv = setInterval(function() {
        var birdInfo = bird.getBoundingClientRect();
        var logoInfo = logo.getBoundingClientRect();
        if (birdInfo.left < logoInfo.left+logoInfo.width-47) {
            bird.style.left = (birdInfo.left+2) + "px"; 
        } else {
            if (!transformed) {
                bird.style.transform = "scaleX(-1)";
                clearInterval(wingsInterval);
                bird.setAttribute("src", "Rcs/bird-2.png");
                if (birdInfo.top >= logoInfo.top-26-$('#leadText').height()) {
                    clearInterval(moveInv);
                    birdState=3;
                    loadWebsite();
                }
            }
        }
        if (birdInfo.top < logoInfo.top-26-$('#leadText').height()) {
            bird.style.top = (birdInfo.top+0.48) + "px"; 
        }   
    }, 1);
}

function loadWebsite() {
    HBody[0].classList.add("addBgColor");
    logo.classList.add("text-white");
    $('.splitter').slideDown();
    $('#leadText').slideDown(1000);
    $("#plane").fadeIn(1000);
    for (var i=0; i<moreText.length; i++) {
        moreText[i].style.opacity = "1";
    }
}

window.onresize = correctBirdLoc;
HBody[0].onscroll = correctBirdLoc;
$('#navbarSupportedContent').on('shown.bs.collapse', correctBirdLoc);
$('#navbarSupportedContent').on('hidden.bs.collapse', correctBirdLoc);

function correctBirdLoc() {
    if (birdState==3) {
        var logoInfo = logo.getBoundingClientRect();
        bird.style.top = logoInfo.top-$('#leadText').height()+"px";
        bird.style.left = logoInfo.left+logoInfo.width-47+"px";
    }
}

var moreContainer = document.getElementsByClassName("f-more-container-1");
$('#seeMore').on('click', function() {
    moreContainer[0].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
});
