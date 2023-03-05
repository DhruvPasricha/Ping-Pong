const getRectangularCoordinates = (element) => {
    return element.getBoundingClientRect();
};

const handleBallMovement = () => {
    const TOP_BOUNDARY = 0;
    const BOTTOM_BOUNDARY = 94;
    const LEFT_BOUNDARY = -50;
    const RIGHT_BOUNDARY = 50;

    const ball = document.querySelector("#ball");
    const bats = document.querySelectorAll(".bat");
    let yPosition = 0,
        xPosition = -38,
        xDelta = 1,
        yDelta = -1;

    const updateNextPoint = () => {
        const isOverlapping = (element1, element2) => {
            element1 = getRectangularCoordinates(element1);
            element2 = getRectangularCoordinates(element2);
            return (
                Math.min(element1.right, element2.right) >
                    Math.max(element1.left, element2.left) &&
                Math.min(element1.bottom, element2.bottom) >
                    Math.max(element1.top, element2.top)
            );
        };

        const hasRebounded =
            isOverlapping(bats[0], ball) || isOverlapping(bats[1], ball);

        if (hasRebounded) {
            xDelta *= -1;
        }

        if (xPosition === LEFT_BOUNDARY) {
            alert("Player 2 wins");
            window.location.reload();
        } else if (xPosition === RIGHT_BOUNDARY) {
            alert("Player 1 wins");
            window.location.reload();
        }

        if (yPosition === TOP_BOUNDARY || yPosition === BOTTOM_BOUNDARY) {
            yDelta *= -1;
        }

        yPosition += yDelta;
        xPosition += xDelta;
    };

    const setNextPoint = () => {
        ball.style.top = `${yPosition}vh`;
        ball.style.left = `${xPosition}vw`;
    };

    ball.style.display = 'unset';
    setInterval(() => {
        updateNextPoint();
        setNextPoint();
    }, 20);
};

const handleBatsMovement = () => {
    const TOP_BOUNDARY = 0;
    const BOTTOM_BOUNDARY = 52;
    const DELTA = 2;

    const bats = document.querySelectorAll(".bat");
    const batsPosition = [25, 25];

    const moveDown = (id) => {
        batsPosition[id] = Math.min(BOTTOM_BOUNDARY, batsPosition[id] + DELTA);
        bats[id].style.top = `${batsPosition[id]}vh`;
    };

    const moveUp = (id) => {
        batsPosition[id] = Math.max(TOP_BOUNDARY, batsPosition[id] - DELTA);
        bats[id].style.top = `${batsPosition[id]}vh`;
    };

    document.body.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowDown":
                moveDown(1);
                break;
            case "ArrowUp":
                moveUp(1);
                break;
            case "w":
                moveUp(0);
                break;
            case "s":
                moveDown(0);
                break;
            case "W":
                moveUp(0);
                break;
            case "S":
                moveDown(0);
                break;
        }
    });
};

const startGameBtn = document.querySelector("#start-game-btn");
startGameBtn.addEventListener("click", () => {
    startGameBtn.style.display = 'none';
    handleBallMovement();
    handleBatsMovement();
});
