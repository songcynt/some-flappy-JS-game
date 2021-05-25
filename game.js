document.addEventListener('DOMContentLoaded' , () => {

console.log('load game.js');
const MAXPIPES = 2; //min: 1
const PIPEDISTANCE = 250;
const SCREENDISTANCE = 500;

var isGameOver = false;

var displayPlayer = document.querySelector('.bird');
var displayGame = document.querySelector('.game-container');

var playerInfo = new Player();
var pipes = [];
var bottomPipes = [];
var topPipes = [];

var score = 0;

//Set xy locations of the pipes in style.css
function movePipe(){
    for(let i = 0; i < bottomPipes.length; i++){
        pipes[i].move();
        let xLocation = pipes[i].getX();
        bottomPipes[i].style.left = xLocation + 'px';
        topPipes[i].style.left = xLocation + 'px';
        bottomPipes[i].style.bottom = pipes[i].getY() + 'px';
        topPipes[i].style.bottom = pipes[i].getGapBottom() + 'px';
        
    }
}

//Make a new pipe object. Gets called a min of 1 time, and max of MAXPIPES times.
function makePipe(){
    console.log('performing pipe setup');
    let obstacle = document.createElement('div');
    let topObstacle = document.createElement('div');

    obstacle.classList.add('obstacle');
    topObstacle.classList.add('topObstacle');
    displayGame.appendChild(obstacle);
    displayGame.appendChild(topObstacle);

    pipe = new Pipe();
    pipes.push(pipe);
    bottomPipes.push(obstacle);
    topPipes.push(topObstacle);
    if (pipes.length > 1){
        let previousX = pipes[pipes.length - 2].getX();
        pipes[pipes.length-1].setX(previousX + PIPEDISTANCE);
    }

}
makePipe();

//Refresh objects' location on screen every 20 milliseconds (50fps)
function startGame() {
    if (pipes.length < MAXPIPES && pipes[pipes.length - 1].getX() + PIPEDISTANCE <= SCREENDISTANCE){
        makePipe();
    }

    playerInfo.fall();
    displayPlayer.style.left = playerInfo.getX() + 'px';
    displayPlayer.style.bottom = playerInfo.getY() + 'px';

    movePipe();

    if (pipes[0].checkOffMap()){
        console.log('reset pipe');
        score++;
        pipes.push(pipes.shift());
    }
    if (playerInfo.checkOnGround()){
        console.log('on ground');
        gameOver();
    }
    for (let i = 0; i < pipes.length; i++){
        if (pipes[i].checkCollision(playerInfo.getX(), playerInfo.getY())){
            console.log("pipe collision");
            gameOver();
        }
    }
}
var gameTimerId = setInterval(startGame, 20);

//press space bar to jump
function control(e) {
    if (e.keyCode === 32 && !isGameOver) {
        playerInfo.flap();
    }
}
document.addEventListener('keyup', control);

//pauses screen when game over. Currently no auto restart.
function gameOver() {
    console.log('game over called');
    clearInterval(gameTimerId);
    isGameOver = true;
    alert("Game Over! Your final score is: "+ score);
}

});