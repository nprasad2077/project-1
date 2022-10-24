const cards = document.querySelectorAll('.memory-card');    //Select all card elements
let hasFlipped = false;
let firstCard;
let secondCard;

function flipCard() {
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
    setTimeout(() => {
        firstCard.classList.remove('flip')      //Not a match
        secondCard.classList.remove('flip')
    }, 1500);
}

cards.forEach(cards => cards.addEventListener('click', flipCard))   //Add Event listeners to card elements. When clicked, execute flip function.
