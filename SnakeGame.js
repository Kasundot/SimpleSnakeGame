console.log("Snake game script is loaded!");

let snakeSize = 3;
let snakeX = new Array(snakeSize);
let snakeY = new Array(snakeSize);
let snakeXSpeed;
let snakeYSpeed;
let snakeWidth = 20;
let frameRateChanged = 5;
let isGameOver = false;
let meatX;
let meatY;
let score;
function setup() {
    frameRate(frameRateChanged);
    createCanvas(800, 520);
    score = 0;
    textSize(32);
    noStroke();
    for (let i = snakeSize - 1; i >= 0; i--) {
        snakeX[i] = width / 2 - snakeWidth * (i + 1);
        snakeY[i] = height / 2 - snakeWidth;
        snakeXSpeed = snakeWidth;
        snakeYSpeed = 0;
    }
    meatX = snakeWidth * floor(random(0, (width - snakeWidth) / snakeWidth));
    meatY = snakeWidth * floor(random(0, (height - snakeWidth) / snakeWidth));
}
function draw() {
    background(0, 0, 100);
    frameRate(frameRateChanged);
    fill(255, 250, 0);
    textSize(32);
    text("Score : " + score, 30, 30);
    fill(255, 0, 0);
    noStroke();
    rect(meatX, meatY, snakeWidth, snakeWidth);
    if (!isGameOver) {
        routeSnake(snakeX, snakeY, snakeXSpeed, snakeYSpeed);
        if (
            snakeX[snakeX.length - 1] == width ||
            snakeX[snakeX.length - 1] == -snakeWidth ||
            snakeY[snakeY.length - 1] == width ||
            snakeY[snakeY.length - 1] == -snakeWidth
        ) {
            fill(255, 250, 0);
            textSize(50);
            text("Game Over!", width / 2 - 100, height / 2);
            isGameOver = true;
        }
        if (snakeX[snakeSize - 1] == meatX && snakeY[snakeSize - 1] == meatY) {
            snakeSize += 1;
            let snakeXNew = new Array(snakeSize);
            let snakeYNew = new Array(snakeSize);
            snakeXNew[0] = snakeX[0] - snakeXSpeed;
            snakeYNew[0] = snakeY[0] - snakeYSpeed;
            for (let j = 0; j < snakeX.length; j++) {
                snakeXNew[j + 1] = snakeX[j];
                snakeYNew[j + 1] = snakeY[j];
            }
            snakeX = snakeXNew;
            snakeY = snakeYNew;
            frameRateChanged += 1;
            score += 5;
            console.log(frameRateChanged);
            meatX =
                snakeWidth *
                floor(random(0, (width - snakeWidth) / snakeWidth));
            meatY =
                snakeWidth *
                floor(random(0, (height - snakeWidth) / snakeWidth));
        }
        for (let i = 0; i < snakeX.length; i++) {
            drawSnake(snakeX[i], snakeY[i], snakeWidth);
        }
    } else {
        fill(255, 250, 0);
        textSize(50);
        text("Game Over!", width / 2 - 100, height / 2);
    }
}
function drawSnake(x, y, snakeWidth) {
    fill(255, 250, 0);
    rect(x, y, snakeWidth, snakeWidth);
    noStroke();
}
function routeSnake(x, y, speedX, speedY) {
    for (let i = 0; i < x.length - 1; i++) {
        x[i] = x[i + 1];
        y[i] = y[i + 1];
    }
    x[x.length - 1] += speedX;
    y[y.length - 1] += speedY; //for (int i=0;i<x.length-1;i++){
    //    if (x[x.length-1]==snakeX[i] && y[y.length-1]==y[i]){
    //      println(i);
    //      println(x.length-1);
    //      println(x[i]);
    //      println(y.length-1);
    //      println(y[i]);
    //      isGameOver=true;
    //      break;
    //    }
    //  }
}
function keyPressed() {
    if (keyCode == UP_ARROW && snakeYSpeed == 0) {
        snakeXSpeed = 0;
        snakeYSpeed = -snakeWidth;
    } else if (keyCode == DOWN_ARROW && snakeYSpeed == 0) {
        snakeXSpeed = 0;
        snakeYSpeed = snakeWidth;
    } else if (keyCode == LEFT_ARROW && snakeXSpeed == 0) {
        snakeYSpeed = 0;
        snakeXSpeed = -snakeWidth;
    } else if (keyCode == RIGHT_ARROW && snakeXSpeed == 0) {
        snakeYSpeed = 0;
        snakeXSpeed = snakeWidth;
    }
}
