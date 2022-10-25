const cards = document.querySelectorAll('.memory-card');    //Select all card elements
let hasFlipped = false;
let lockBoard = false;
let firstCard;
let secondCard;
let score = 6;
let scoreDisplay = document.querySelector('.scoreText')
let statusDisplay = document.querySelector('.status')
const modal = document.querySelector('.modal');
const trigger = document.querySelector('.trigger')
const closeButton = document.querySelector('.close-button')

scoreDisplay.innerText = `There are ${score} pairs remaining!`

function flipCard() {
    if (lockBoard) {return;}                //lock board to prevent revealing of other cards after 2 have been selected.
    if (this === firstCard) {return;}  //Prevents double-click on same card
    this.classList.toggle('flip')
    // console.log('clicked');
    // console.log(this);

    if (!hasFlipped) {      // First Click
        hasFlipped = true;
        firstCard = this;
        // console.log(hasFlipped, firstCard);
        return;
    }
    hasFlipped = false;
    secondCard = this;
    checkMatch();
}

function checkMatch () {            // Check for match
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCard() : unflipCard()
}

function disableCard () {
    firstCard.removeEventListener('click', flipCard)    //It's a match!
    secondCard.removeEventListener('click', flipCard)
    score -= 1;
    scoreDisplay.innerText = `There are ${score} pair(s) remaining!`
    // statusDisplay.innerText = 'Correct!'
    statusDisplay.innerHTML = '<p style="color: lime;">Correct!</p>'
    console.log(score);
}

function unflipCard () {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip')      //Not a match
        secondCard.classList.remove('flip')
        // statusDisplay.innerText = 'Try Again'
        statusDisplay.innerHTML = '<p style="color: red;">Try Again!</p>'
        resetBoard();
    }, 1500);
}

function resetBoard() {
    hasFlipped = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle () {                                  // Shuffle Cards - Immediately Invoked function - executes when declared. 
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random()* 12)
        card.style.order = randomPos;
    })
})();

cards.forEach(cards => cards.addEventListener('click', flipCard))   //Add Event listeners to card elements. When clicked, execute flip function.

// Modal 

function toggleModal () {
    modal.classList.toggle('show-modal')
}

function windowOnClick (event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener('click', toggleModal);
closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);