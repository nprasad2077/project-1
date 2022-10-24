const cards = document.querySelectorAll('.memory-card');    //Select all card elements
let hasFlipped = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.toggle('flip')
    // console.log('clicked');
    // console.log(this);

    if (!hasFlipped) {      // First Click
        hasFlipped = true;
        firstCard = this;
        // console.log(hasFlipped, firstCard);
    } else {                // Second Click
        hasFlipped = false;
        secondCard = this;
        // console.log(firstCard, secondCard);

    }
}

cards.forEach(cards => cards.addEventListener('click', flipCard))   //Add Event listeners to card elements. When clicked, execute flip function.
