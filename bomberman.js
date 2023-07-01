const bombs = ["Blue", "Orange","Green", "Yellow", "Red", "Purple"];
const board = [];
const rows = 9;
const columns = 9;
let score = 0;
let moves = 30;
let flag = false;

let currTile;
let otherTile;

window.onload = function() {
    startGame();

    //1/110th of a second
    window.setInterval(function() {
        matchBombs();
        slideBombs();
        generateBombs();
    }, 100);
}

function randomBomb() {
    return bombs[Math.floor(Math.random() * bombs.length)]; // return index 0 - 5.99
}

function startGame() {

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // <img class="0-0" src="./images/Red.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./candy-crush-master/images/" + randomBomb() + ".png";

            //Drag Function
            tile.addEventListener("dragstart", dragStart); // click on candy, start drag function
            tile.addEventListener("dragover", dragOver); // click and holding candy with mouse
            tile.addEventListener("dragenter", dragEnter); // dragging candy onto another tile
            tile.addEventListener("dragleave", dragLeave); // leave candy over another candy
            tile.addEventListener("drop", dragDrop); // drop into spot
            tile.addEventListener("dragend", dragEnd); // swap candies

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    flag = true;
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //id = "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2
    let moveRight = c2 == c+1 && r == r2
    
    let moveUp = r2 == r-1 && c == c2
    let moveDown = r2 == r+1 && c == c2

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
        
        let validMove = checkValid();
        if (!validMove)  {
            let currImg = currTile.src;
            let otherImg = otherTile.src;
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }

    moves -= 1;
    displayMoves = `<h2>Moves: <span id='moves'>${moves}</span></h2>`;
}

function matchBombs() {
    matchFive();
    matchFour();
    matchThree();
    document.getElementById("score").innerText = score;
}

function matchThree() {
    //check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r][c+1];
            let bomb3 = board[r][c+2];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && !bomb1.src.includes("blank")) {
                bomb1.src = "./candy-crush-master/images/blank.png";
                bomb2.src = "./candy-crush-master/images/blank.png";
                bomb3.src = "./candy-crush-master/images/blank.png";
                if (flag) {
                    score += 30;
                }
            }
        }
    }

    //check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r+1][c];
            let bomb3 = board[r+2][c];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && !bomb1.src.includes("blank")) {
                bomb1.src = "./candy-crush-master/images/blank.png";
                bomb2.src = "./candy-crush-master/images/blank.png";
                bomb3.src = "./candy-crush-master/images/blank.png";
                if (flag) {
                    score += 30;
                }
            }
        }
    }
}

function matchFour() {
    // match 4 in a row
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r][c+1];
            let bomb3 = board[r][c+2];
            let bomb4 = board[r][c+3];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && !bomb1.src.includes("blank")) {
                bomb1.src = "./candy-crush-master/images/blank.png";
                bomb2.src = "./candy-crush-master/images/blank.png";
                bomb3.src = "./candy-crush-master/images/blank.png";
                bomb4.src = "./candy-crush-master/images/blank.png";
                if (flag) {
                    score += 50;
                }
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3; r++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r+1][c];
            let bomb3 = board[r+2][c];
            let bomb4 = board[r+3][c];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && bomb3.src == bomb4.src && !bomb1.src.includes("blank")) {
                bomb1.src = "./candy-crush-master/images/blank.png";
                bomb2.src = "./candy-crush-master/images/blank.png";
                bomb3.src = "./candy-crush-master/images/blank.png";
                bomb4.src = "./candy-crush-master/images/blank.png";
                if (flag) {
                    score += 50;
                }
            }
        }
    }
}

function matchFive() {
    // match 5 in a row
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-4; c++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r][c+1];
            let bomb3 = board[r][c+2];
            let bomb4 = board[r][c+3];
            let bomb5 = board[r][c+4];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && bomb3.src == bomb4.src && bomb4.src == bomb5.src && !bomb1.src.includes("blank")) {
                bomb1.src = "./candy-crush-master/images/blank.png";
                bomb2.src = "./candy-crush-master/images/blank.png";
                bomb3.src = "./candy-crush-master/images/blank.png";
                bomb4.src = "./candy-crush-master/images/blank.png";
                bomb5.src = "./candy-crush-master/images/blank.png";
                if (flag) {
                    score += 100;
                }
            }
        }
    }

    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-4; r++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r+1][c];
            let bomb3 = board[r+2][c];
            let bomb4 = board[r+3][c];
            let bomb5 = board[r+4][c];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && bomb3.src == bomb4.src && bomb4.src == bomb5.src && !bomb1.src.includes("blank")) {
                bomb1.src = "./candy-crush-master/images/blank.png";
                bomb2.src = "./candy-crush-master/images/blank.png";
                bomb3.src = "./candy-crush-master/images/blank.png";
                bomb4.src = "./candy-crush-master/images/blank.png";
                bomb5.src = "./candy-crush-master/images/blank.png";
                if (flag) {
                    score += 50;
                }
            }
        }
    }
}

function checkValid () {
    //checks 5 rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-4; c++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r][c+1];
            let bomb3 = board[r][c+2];
            let bomb4 = board[r][c+3];
            let bomb5 = board[r][c+4];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && bomb3.src == bomb4.src && bomb4.src == bomb5.src && !bomb1.src.includes("blank")) {
                return true;
            }
        }
    }

    //checks 5 columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-4; r++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r+1][c];
            let bomb3 = board[r+2][c];
            let bomb4 = board[r+3][c];
            let bomb5 = board[r+4][c];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && bomb3.src == bomb4.src && bomb4.src == bomb5.src && !bomb1.src.includes("blank")) {
                return true;
            }
        }
    }

    //checks 4 rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-3; c++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r][c+1];
            let bomb3 = board[r][c+2];
            let bomb4 = board[r][c+3];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && bomb3.src == bomb4.src && !bomb1.src.includes("blank")) {
                return true;
            }
        }
    }

    //checks 4 columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-3; r++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r+1][c];
            let bomb3 = board[r+2][c];
            let bomb4 = board[r+3][c];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && bomb3.src == bomb4.src && !bomb1.src.includes("blank")) {
                return true;
            }
        }
    }

    //checks 3 rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r][c+1];
            let bomb3 = board[r][c+2];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && !bomb1.src.includes("blank")) {
                return true;
            }
        }
    }

    //checks 3 columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let bomb1 = board[r][c];
            let bomb2 = board[r+1][c];
            let bomb3 = board[r+2][c];
            if (bomb1.src == bomb2.src && bomb2.src == bomb3.src && !bomb1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideBombs() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./candy-crush-master/images/blank.png";
        }
    }
}

function generateBombs() {
    for (let c = 0; c < columns; c++)  {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./candy-crush-master/images/" + randomBomb() + ".png";
        }
    }
}



















