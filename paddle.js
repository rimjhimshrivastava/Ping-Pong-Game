//paddle class
export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem;
        this.reset();
    }

    //return the coordinates of the paddle
    rect() {
        return this.paddleElem.getBoundingClientRect();
    }
    //gets and set the position variables
    get position() {
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue("--position"));
    }
    set position(value) {
        this.paddleElem.style.setProperty("--position", value);
    }

    //to reset the position of the paddle
    reset() {
        this.position = 50;
    }
}