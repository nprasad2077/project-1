const cards = document.querySelectorAll('.memory-card');    //Select all card elements

function flipCard() {
    this.classList.toggle('flip')
    console.log('clicked');
    console.log(this);
}

cards.forEach(cards => cards.addEventListener('click', flipCard))   //Add Event listeners to card elements. When clicked, execute flip function.
