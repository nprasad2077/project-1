const cards = document.querySelectorAll('.memory-card');

function flipCard() {
    console.log('clicked');
    console.log(this);
}

cards.forEach(cards => cards.addEventListener('click', flipCard))
