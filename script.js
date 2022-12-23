//importing classes
import Ball from "./ball.js"        
import Paddle from "./paddle.js"

//elements from the document
const ball = new Ball(document.getElementById("ball"));
const paddle1 = new Paddle(document.getElementById("paddle1"));
const paddle2 = new Paddle(document.getElementById("paddle2"));
const player_score = document.getElementById("player_score");
const player_name = document.getElementById("player_name");
const high_name = document.getElementById("name");
const high_score = document.getElementById("high");

//required variables
let name;
let score;
let lastTime;

//the update function that goes on an infinite loop and gives smooth movement of the ball
function update(time) {
    if (lastTime == undefined) {
        lastTime = time;
        window.requestAnimationFrame(update)
    }
    else {
        const delta_time = time - lastTime;
        ball.update(delta_time, [paddle1.rect(), paddle2.rect()], player_score);     //to update the position of ball based on the time passed
        if (isLose()) {
            handleLose();
            lastTime = undefined;
            name = window.prompt("Your score: " + score +"\nHighest score: " + high_name.innerText +" "+ high_score.innerText + "\nEnter player name.");
            player_name.innerText = name;
        }
        else {
            lastTime = time;
            window.requestAnimationFrame(update)
        }
    }
}

//function that checks whether the ball jumped out of bounds of the play field
function isLose() {
    const rect = ball.rect();
    return (rect.right >= window.innerWidth || rect.left <= 0);
}

//if the ball went out of play field, resetting the game for a new game
function handleLose() {
    const rect = ball.rect();
    ball.reset();
    paddle1.reset();
    paddle2.reset();
    score = parseInt(player_score.innerText);
    player_score.innerText = 0;
    if(score>0)
    {
        if(high_name.innerText == "N/A")
        {
            high_name.innerText = name;
            high_score.innerText = parseInt(score);
        }
        else if(parseInt(high_score.innerText) < score)
        {
            high_name.innerText = name;
            high_score.innerText = parseInt(score);
        }
    }
}

// event for movement of the paddle
document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (key == 'ArrowUp' && paddle1.position > 5) {
        paddle1.position -= 2;
        paddle2.position -= 2;
    };
    if (key == 'ArrowDown' && paddle1.position < 95) {
        paddle1.position += 2;
        paddle2.position += 2;
    };

});

//the game will start with this main function
function main() {
    if(high_name.innerText == "N/A" )
    {
        window.alert("This is your first time playing. \nControls: Up and Down arrow keys. \nPress Enter to Start.");
    }
    name = prompt("Enter Player name.")
    player_name.innerText = name;
    document.addEventListener('keypress', function (event) {
        if (event.key == 'Enter') {
            window.requestAnimationFrame(update);
        }
    })
}
window.requestAnimationFrame(main)
