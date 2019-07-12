var game = document.getElementById("game-container");
game.addEventListener("load", startGame());

var cardsNumbers;
var isAnyCardFlipped;
var flippedCard;
var waitForAnimation;
var score;


function startGame() {
    var cardsElement = document.getElementById("cards");
    cardsElement.innerHTML = "";
    cardsNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    shuffle(cardsNumbers);
    flippedCard = null;
    waitForAnimation = false;
    score = 0;

    //dynamically generating cards
    for (var i = 0; i < 16; i++) {
        var newCard = document.createElement("div");
        newCard.classList.add("card");
        newCard.setAttribute("cardNumber", cardsNumbers[i]);

        var newCardInner = document.createElement("div");
        newCardInner.classList.add("card-inner");

        var newCardBack = document.createElement("img");
        newCardBack.src = "images/cardback.jpg";
        newCardBack.classList.add("card-back");

        var newCardFront = document.createElement("img");
        newCardFront.src = "images/" + cardsNumbers[i] + ".jpg";
        newCardFront.classList.add("card-front");

        newCardInner.appendChild(newCardFront);
        newCardInner.appendChild(newCardBack);
        newCard.appendChild(newCardInner);
        cardsElement.appendChild(newCard);

        newCard.addEventListener("click", cardClicked);
    }
}

function cardClicked() {
    if (waitForAnimation)
        return;
    if (flippedCard == null) {
        flippedCard = this;
        this.classList.add("flipped");
    } else if (flippedCard != this) {
        this.classList.add("flipped");
        if (checkCardsEqual(this, flippedCard)) {
            waitForAnimation = true;
            setTimeout(removeCards, 500, this, flippedCard);
        }
        else {
            waitForAnimation = true;
            setTimeout(flipBackCards, 750, this, flippedCard);
        }
    }
}

function checkCardsEqual(card1, card2) {
    return card1.getAttribute("cardNumber") == card2.getAttribute("cardNumber")
}

function removeCards(card1, card2) {
    card1.classList.add("removed");
    card2.classList.add("removed");
    card1.removeEventListener("click", cardClicked);
    card2.removeEventListener("click", cardClicked);
    flippedCard = null;
    waitForAnimation = false;
    score++;
    if (score == 8){
        alert("Congratulations! You're a real human being! And a real hero!");
        location.reload(); //restart the game
    }
}

function flipBackCards(card1, card2) {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    flippedCard = null;
    waitForAnimation = false;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}