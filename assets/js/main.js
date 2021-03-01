const grid = document.querySelector("#content")
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560
const boardHeight = 320;
const ballDiameter = 15;

const playerStart = [270, 10]
const scoreDisplay = document.querySelector('#score')
let currentPosition = playerStart;

const ballStart = [250, 150];
let ballCurrentPosition = ballStart;

let timerId;
let xDirection = -2;
let yDirection = 2;

//* create block + constructor

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

//* all blocks
const blocks = [
    new Block(10, 10),
    new Block(120, 10),
    new Block(230, 10),
    new Block(340, 10),
    new Block(450, 10),

    new Block(10, 35),
    new Block(120, 35),
    new Block(230, 35),
    new Block(340, 35),
    new Block(450, 35),

    new Block(10, 60),
    new Block(120, 60),
    new Block(230, 60),
    new Block(340, 60),
    new Block(450, 60),
]


// * drow all block
function addBlocks() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement("div")
        block.classList.add("block")
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.top = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}
addBlocks()

//* add player

const player = document.createElement("div")

player.classList.add("player")
drawPlayer()
grid.appendChild(player)

//* draw player 

function drawPlayer() {
    player.style.left = currentPosition[0] + 'px'
    player.style.bottom = currentPosition[1] + 'px'
}

//* draw the ball
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + "px";
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}


// * move player

function movePlayer(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawPlayer()
            }
            break;

        case "ArrowRight":
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawPlayer()
            }
            break;



    }
}

document.addEventListener("keydown", movePlayer)

// * add Ball

const ball = document.createElement("div")
ball.classList.add("ball")
drawBall()
grid.appendChild(ball)

//* move Ball

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall()
    checkForCollision()
}

timerId = setInterval(moveBall, 30)

//* check for collision

function checkForCollision() {
    //* check for wall collisions
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        ballCurrentPosition[0] <= 0
    ) {
        changeDirection()
    }
    //* check for game over
    if(ballCurrentPosition[1] <= 0){
        console.log("lost")
        clearInterval(timerId)
        scoreDisplay.innerHTML = "You lose"
        document.removeEventListener("keydown", movePlayer)

    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection == 2 && yDirection === -2) {
        xDirection = -2;
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }

}