//Color for H1
function randomRGB(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`
}

const letters = document.querySelectorAll('h1');

setInterval(function(){
    for(let letter of letters){
        letter.style.color = randomRGB()
    }
}, 1000);


const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
//lockboard so multiple cards can't be picked at same time
let lockBoard = false;
let firstCard;
let secondCard;

//this refers to which .card has been flipped. the .card div container
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this; //first click
    } else {
        secondCard = this; //second click
        //check for match
        checkForMatch();        
    }   
    };


function checkForMatch () {
    //do the cards match?
    if (firstCard.dataset.player === secondCard.dataset.player){
        //if its a match 
        firstCard.removeEventListener ('click', flipCard);
        secondCard.removeEventListener ('click', flipCard);
        reset();
    } else {
        lockBoard = true;
        //no match
        setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        reset();
        }, 1450);
    }
    };

// allows for no double clicking of same card 
function reset () {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}
//shuffle cards at screen load
(function shuffleCards () {
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 12);
        card.style.order = random;
    });
})();

//Add event listener for each card
cards.forEach(card => card.addEventListener ('click', flipCard));

if (hasFlippedCard === cards.length) alert ("You Win!");