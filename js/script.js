const gameFPS = 40;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const win = document.querySelector("#win")
const lose = document.querySelector("#lose")
const score = document.querySelector("#score");
const text = document.querySelector("#text");
const button = document.querySelector("#restart");
const pause = document.querySelector("#pause");
const resume = document.querySelector("#resume");
const mad = document.querySelector("#mad");
const solo = document.querySelector("#onePlayer");
const duo = document.querySelector("#twoPlayer");
const about = document.querySelector("#about");
const about2 = document.querySelector("#about2");
const paddleHeight = 10;
let paddleWidthTOP = 100;
let paddleWidthBOT = 100;
let pointsPlayer = 0;
let pointComputer = 0;
let computerScore = 0;
let playerScore = 0;
let leftArrowHit = false;
let rightArrowHit = false;
let oneplayer;
let twoplayer;
mad.hidden = true;
pause.hidden = true;
about.hidden = true;

let ball = {
    x: 160,
    y: 240,
    xSpeed: 2, //1
    ySpeed: 6, //3
    ballRadius: 10
};

let topPaddle = {
    x: canvas.width / 2 - paddleWidthTOP / 2,
    y: 10
};

let BottomPaddle = {
    x: canvas.width / 2 - paddleWidthBOT / 2,
    y: canvas.height - 20
};
button.addEventListener("click", clickHandler, false);
function clickHandler() {
    console.log("refreshing..");
    window.location.href='index.html';
}
about.addEventListener("click", clickHandler2, false);
function clickHandler2() {
    window.location.href='about.html';
}
about2.addEventListener("click", clickHandler3, false);
function clickHandler3() {
    window.location.href='about.html';
}
solo.addEventListener("click", one, false);
duo.addEventListener("click", two, false);
addEventListener("keydown", keydownHandler,false);
function keydownHandler(e){
    // console.log(e.keyCode);
    if(e.keyCode == 39){
        if(move == 1){
            rightArrowHit = true;
        }
    }
    if(e.keyCode == 37){
        if(move == 1){
            leftArrowHit = true;
        }
    }
}
addEventListener("keydown", secondPlayerControls,false);
function secondPlayerControls(e){
    if(e.keyCode == 65){
        if(move == 1){
            a = true;
        }
    }
    if(e.keyCode == 68){
        if(move == 1){
            d = true;
        }
    }
}

function keyboardEvents(){
    if(leftArrowHit){
        BottomPaddle.x -= 4;
        leftArrowHit =false;
    }
    if(rightArrowHit){
        BottomPaddle.x += 4;
        rightArrowHit =false;
    }
    if (BottomPaddle.x <= 0){
        BottomPaddle.x = 0;
    }
    if (BottomPaddle.x >= canvas.width - paddleWidthBOT){
        BottomPaddle.x = canvas.width - paddleWidthBOT;
    }
}
function secondPlayerKeyboardEvents(){
    if(a){
        topPaddle.x -= 4;
        a = false;
    }
    if(d){
        topPaddle.x += 4;
        d = false;
    }
    if (topPaddle.x <= 0){
        topPaddle.x = 0;
    }
    if (topPaddle.x >= canvas.width - paddleWidthTOP){
        topPaddle.x = canvas.width - paddleWidthTOP;
    }
}
//ctx.globalAlpha = 0.5;
function drawBackground() {
    ctx.fillStyle = "transparent";//rgb(255, 186, 137)
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTopPaddle() {
    ctx.fillStyle = "rgb(94, 36, 49)";
    ctx.fillRect(topPaddle.x, 15, paddleWidthTOP, 10); // ylälaidan maila
}

function drawBottomPaddle() {
    ctx.strokeStyle = "rgb(94, 36, 49)";
    ctx.fillRect(BottomPaddle.x, canvas.height - 25, paddleWidthBOT, 10);
}

function drawBall() {
    about.hidden = false;
    about2.hidden = true;
    ctx.fillStyle = "rgb(94, 36, 49)";
    ctx.beginPath();

    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;

    ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI*2, true);
    ctx.stroke();
    ctx.lineWidth = 0;
    ctx.fill();
    // if(ball.y >= canvas.height || ball.y <= 0) {
    //     ball.ySpeed *= -1;
    // }
}

function hitDetect() {
    mad.hidden = true;
    if(ball.y + ball.ballRadius >= BottomPaddle.y) {
        if(BottomPaddle.x <= ball.x && ball.x <= BottomPaddle.x + paddleWidthBOT) {
            ball.ySpeed *= -1;
            ball.y = BottomPaddle.y - ball.ballRadius;
            return;
        }
    }
    if(ball.y - ball.ballRadius <= topPaddle.y + paddleHeight) {
        if(topPaddle.x <= ball.x && ball.x <= topPaddle.x + paddleWidthTOP) {
            ball.ySpeed *= -1;
            ball.y = topPaddle.y + ball.ballRadius + paddleHeight;
            return;
        }
    }

    if(ball.x + ball.ballRadius >= canvas.width || ball.x - ball.ballRadius <= 0) {
        ball.xSpeed *= -1;
    }

    if(ball.y > canvas.height + ball.ballRadius) {
        pointComputer++;
        if(computerScore >= 2){
            ball.xSpeed = 0
            ball.ySpeed = 0
            lose.hidden = false;
            mad.hidden = false;
            button.hidden = false;
            score.hidden = false;
            score2.hidden = true;
            text.hidden = false;
            about.hidden = true;
            about2.hidden = false;
            pause.hidden = true;
            drawBall = false;
        }
        initGameObjects();
        //console.log(pointComputer);
    }

    if(ball.y < 0 - ball.ballRadius) {
        pointsPlayer++;
        if(playerScore >= 2){
            ball.xSpeed = 0
            ball.ySpeed = 0
            win.hidden = false;
            mad.hidden = true;
            button.hidden = false;
            score.hidden = false;
            score2.hidden = true;
            text.hidden = false;
            about.hidden = true;
            about2.hidden = false;
            pause.hidden = true;
            drawBall = false;
            
        }
        initGameObjects();
        //console.log(pointsPlayer);
    }
}
resume.hidden = true;
pause.addEventListener("click", pauseTheGame, false);
resume.addEventListener("click", pauseTheGame, false);
let stop;
let move = 1;
function pauseTheGame() {


    if(stop == 0){
        ball.xSpeed = 2;
        ball.ySpeed = 5;
        stop = 1;
        move = 1;
        resume.hidden = true;
        pause.hidden = false;
    }
    else{
        ball.xSpeed = 0;
        ball.ySpeed = 0;
        move = 0;
        stop = 0;
        resume.hidden = false;
        pause.hidden = true;
    }
}

function initGameObjects() {
    let x = ("P1 " + playerScore + " : " + computerScore + " P2");
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    topPaddle.x = canvas.width / 2 - paddleWidthTOP / 2;
    BottomPaddle.x = canvas.width / 2 - paddleWidthBOT / 2;
    if(pointComputer > 0) {
        paddleWidthBOT = paddleWidthBOT - 15;
        pointComputer = 0;
        computerScore++;
        console.log(computerScore);
        let x = ("P1 " + playerScore + " : " + computerScore + " P2");
        document.getElementById("score").innerHTML = x;
        document.getElementById("score2").innerHTML = x;
    }
    if(pointsPlayer > 0) {
        paddleWidthTOP = paddleWidthTOP - 15;
        pointsPlayer = 0;
        playerScore++;
        console.log(playerScore);
        let x = ("P1 " + playerScore + " : " + computerScore + " P2");
        document.getElementById("score").innerHTML = x;
        document.getElementById("score2").innerHTML = x;
    }
    drawTopPaddle();
    drawBottomPaddle();
    drawBall();
}

function computerAI(){
    if(ball.ySpeed < 0){
        if(ball.x < topPaddle.x + paddleWidthTOP / 2){
            topPaddle.x -= 1.4;
        }else{
            topPaddle.x += 1.4;
        }
        if(topPaddle.x <=0){
            topPaddle.x=0;
        }
        if(topPaddle.x >= canvas.width - paddleWidthTOP){
            topPaddle.x = canvas.width - paddleWidthTOP;
        }
    }
}

function pongGame() {
    drawBackground();
    drawTopPaddle();
    drawBottomPaddle();
    drawBall();
    hitDetect();
    keyboardEvents();
    computerAI();
    about.hidden = false;
    about2.hidden = true;
}
function pongGame2() {
    drawBackground();
    drawTopPaddle();
    drawBottomPaddle();
    drawBall();
    hitDetect();
    keyboardEvents();
    secondPlayerKeyboardEvents();
    about.hidden = false;
    about2.hidden = true;

}

function one(){
    oneplayer = 1;
    console.log(oneplayer)
    startMenu();
    solo.hidden = true;
    duo.hidden = true;
    pause.hidden = false;
}

function two(){
    twoplayer = 1;
    console.log(twoplayer)
    startMenu();
    solo.hidden = true;
    duo.hidden = true;
    pause.hidden = false;
}

function startMenu() {
    // pause.hidden = false;
    // text.hidden = false;
    // name.hidden = true;
    // score.hidden = false;
    // text.hidden = false;
    // about.hidden = true;
    if(oneplayer == 1){
        window.setInterval(pongGame, 1000 / gameFPS);
    }
    else{
        window.setInterval(pongGame2, 1000 / gameFPS);
    }
}

// window.setInterval(pongGame, 1000 / gameFPS);