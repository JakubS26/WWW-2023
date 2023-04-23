const words = ["orange", "apple", "strawberry", "dog", "cat", "paper", "house", "mouse", "chicken", "computer"];
var chosen_word = "";

var c = document.getElementById("my_canvas");
var ctx = c.getContext("2d");

const p = document.getElementById("prompt");
const quit = document.getElementById("quit-game-button"); 
const start = document.getElementById("new-game-button");
const letters = document.querySelectorAll(".letter-button");
const fail = document.getElementById("fail");
const win = document.getElementById("win");
const grid = document.getElementById("grid");

var blanks = "";
var wrong_guesses = 0;
var letters_to_guess = 0;

var clicked_buttons = [];

function checkLetter(l) {

    var is_present = false;
    var new_balnks = "";

    for(i=0; i<chosen_word.length; i++) {
        if(chosen_word.charAt(i).toUpperCase() == l) {
            console.log(i + "  " + chosen_word.charAt(i));
            is_present = true;
            new_balnks += l;
            new_balnks += " ";
            letters_to_guess--;
        } else {
            new_balnks += blanks.charAt(2*i);
            new_balnks += " ";
        }
    }

    blanks = new_balnks;
    p.innerText = "Word to guess: " + blanks;

    if(letters_to_guess == 0) {
        quit.style.display = "none";
        start.style.display = "flex";
        letters.forEach((button) => {
            button.style.display = "none";
        });
        win.style.display = "block";
        grid.style.display = "none";
    }

    if(!is_present) {

        wrong_guesses++;

        if(wrong_guesses == 1) {
            drawBase1();
        } else if(wrong_guesses == 2) {
            drawBase2();
        } else if(wrong_guesses == 3) {
            drawBase3();
        } else if(wrong_guesses == 4) {
            drawElem1();
        } else if(wrong_guesses == 5) {
            drawElem2();
        } else if(wrong_guesses == 6) {
            drawRope();
        } else if(wrong_guesses == 7) {
            drawHead();
        } else if(wrong_guesses == 8) {
            drawBody();
        } else if(wrong_guesses == 9) {
            drawLeftLeg();
        } else if(wrong_guesses == 10) {
            drawRightLeg();
        } else if(wrong_guesses == 11) {
            drawLeftHand();
        } else if(wrong_guesses == 12) {
            drawRightHand();
            quit.style.display = "none";
            start.style.display = "flex";
            letters.forEach((button) => {
                button.style.display = "none";
            });
            fail.style.display = "block";
            grid.style.display = "none";
        } 

    }

}

letters.forEach((button) => {
    button.addEventListener("click", function(e) {
        if(clicked_buttons.find((str) => {return str == e.target.innerText}) == undefined) {
            console.log(e.target.innerText);
            clicked_buttons.push(e.target.innerText);
            console.log(clicked_buttons);
            button.style.backgroundColor = "dodgerblue";
            button.style.color = "white";
            button.style.borderColor = "white";
            checkLetter(e.target.innerText);
        }
    });
});

function startGame() {

    chosen_word = words[Math.floor(Math.random() * words.length)];
    console.log(chosen_word);

    blanks = "";
    for(i=0; i<chosen_word.length; i++) {
        blanks += "_ ";
    }

    p.innerText = "Word to guess: " + blanks;

    ctx.clearRect(0, 0, c.width, c.height);

    p.style.display = "block";
    quit.style.display = "flex";
    start.style.display = "none";
    grid.style.display = "grid";
    fail.style.display = "none";
    win.style.display = "none";

    letters.forEach((button) => {
        button.style.display = "block";
        button.style.color = "dodgerblue";
        button.style.backgroundColor = "white";
    });

    clicked_buttons = [];
    wrong_guesses = 0;
    letters_to_guess = chosen_word.length;

}

start.addEventListener("click", startGame);

function endGame() {

    ctx.clearRect(0, 0, c.width, c.height);
    drawHangman();

    p.style.display = "none";
    quit.style.display = "none";
    start.style.display = "flex";
    grid.style.display = "none";
    fail.style.display = "none";

    letters.forEach((button) => {
        button.style.display = "none";
    });

}

quit.addEventListener("click", endGame);

function drawHead() {
    ctx.beginPath();
    ctx.arc(350, 90, 15, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawBody() {
    ctx.beginPath();
    ctx.moveTo(350, 105);
    ctx.lineTo(350, 170);
    ctx.stroke();
}

function drawLeftLeg() {
    ctx.beginPath();
    ctx.moveTo(350, 170);
    ctx.lineTo(330, 230);
    ctx.stroke();
}

function drawRightLeg() {
    ctx.beginPath();
    ctx.moveTo(350, 170);
    ctx.lineTo(370, 230);
    ctx.stroke();
}

function drawLeftHand() {
    ctx.beginPath();
    ctx.moveTo(350, 120);
    ctx.lineTo(330, 160);
    ctx.stroke();
}

function drawRightHand() {
    ctx.beginPath();
    ctx.moveTo(350, 120);
    ctx.lineTo(370, 160);
    ctx.stroke();
}

function drawRope() {
    ctx.beginPath();
    ctx.moveTo(350, 75);
    ctx.lineTo(350, 30);
    ctx.stroke();
}

function drawElem2() {
    ctx.beginPath();
    ctx.moveTo(360, 30);
    ctx.lineTo(170, 30);
    ctx.stroke();
}

function drawElem1() {
    ctx.beginPath();
    ctx.moveTo(170, 30);
    ctx.lineTo(170, 250);
    ctx.stroke();
}

function drawBase1() {
    ctx.beginPath();
    ctx.moveTo(170, 250);
    ctx.lineTo(100, 280);
    ctx.stroke();
}

function drawBase2() {
    ctx.beginPath();
    ctx.moveTo(170, 250);
    ctx.lineTo(170, 280);
    ctx.stroke();
}

function drawBase3() {
    ctx.beginPath();
    ctx.moveTo(170, 250);
    ctx.lineTo(240, 280);
    ctx.stroke();
}

function drawHangman() {
    drawHead();
    drawBody();
    drawLeftLeg();
    drawRightLeg();
    drawLeftHand();
    drawRightHand();
    drawRope();
    drawElem2();
    drawElem1();
    drawBase1();
    drawBase2();
    drawBase3();
}

drawHangman();

