const cards = document.querySelectorAll('.memory-card');    //Select all card elements
let hasFlipped = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
    if (lockBoard) {return;}                //lock board to prevent revealing of other cards after 2 have been selected.
    // if (this === firstCard) {return;}  //Prevents double-click on same card
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
}

function unflipCard () {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip')      //Not a match
        secondCard.classList.remove('flip')

        lockBoard = false;
    }, 1500);
}

cards.forEach(cards => cards.addEventListener('click', flipCard))   //Add Event listeners to card elements. When clicked, execute flip function.
