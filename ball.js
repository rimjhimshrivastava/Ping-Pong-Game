const INITIAL_VELOCITY = 0.03;

// ball class
export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    }
    // to get and set the values of x and y position of the ball object
    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
    }
    set x(value) {
        this.ballElem.style.setProperty("--x", value);
    }
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
    }
    set y(value) {
        this.ballElem.style.setProperty("--y", value);
    }

    // return the coordinates of the ball
    rect() {
        return this.ballElem.getBoundingClientRect();
    }

    // to reset the coordinates of the ball
    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 }
        while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            const heading = randomNumebrBetween(0, 2 * Math.PI);
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
        }
        this.velocity = INITIAL_VELOCITY
    }

    // to update the position of ball and game's progress as time passes
    update(delta, paddlerect, player_score) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        const rect = this.rect();
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.x *= -1;
        };
        if (paddlerect.some(r => isCollision(r, rect))) {
            this.direction.y *= -1;
            player_score.textContent = parseInt(player_score.textContent) + 1;
        };
    }
}

//helping functions

//returns a random number
function randomNumebrBetween(min, max) {
    return Math.random() * (max - min) + min;
}

//check whether the ball collided with the pabble
function isCollision(rect1, rect2) {
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    )
}