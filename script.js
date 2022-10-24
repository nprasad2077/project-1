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
    } else {                // Second Click
        hasFlipped = false;
        secondCard = this;
        // console.log(firstCard.dataset.framework);     // Check if first card matches the second card
        // console.log(secondCard.dataset.framework);
        if (firstCard.dataset.framework === secondCard.dataset.framework){
            firstCard.removeEventListener('click', flipCard)
            secondCard.removeEventListener('click', flipCard)
        } else {
            setTimeout(() => {
            firstCard.classList.remove('flip')
            secondCard.classList.remove('flip')
            }, 1500);
        }
    }
}

cards.forEach(cards => cards.addEventListener('click', flipCard))   //Add Event listeners to card elements. When clicked, execute flip function.
