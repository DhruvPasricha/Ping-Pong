const handleBallMovement = () => {
    const TOP_BOUNDARY = 0;
    const BOTTOM_BOUNDARY = 94;
    const LEFT_BOUNDARY = -50;
    const RIGHT_BOUNDARY = 50;

    const ball = document.querySelector("#ball");
    const bats = document.querySelectorAll(".bat");
    let yPosition = 0,
        xPosition = 0,
        xDelta = 1,
        yDelta = -1;

    const updateNextPoint = () => {
        const getRectangularCoordinates = (element) => {
            return element.getBoundingClientRect();
        };

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
            console.log("gone out");
        } else if (xPosition === RIGHT_BOUNDARY) {
            console.log("gone out");
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

    setInterval(() => {
        updateNextPoint();
        setNextPoint();
    }, 20);
};

handleBallMovement();
