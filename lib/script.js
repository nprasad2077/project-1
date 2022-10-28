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
let totalClicks = null;
const flipCounter = document.querySelector('.flipCount');
const timer = document.querySelector('.timer');
let timePassed = 0;
let myInterval = 0;
// let date = new Date(timePassed * 1000).toISOString().substr(11, 8);
scoreDisplay.innerText = `There are ${score} pairs remaining!`
statusDisplay.innerText = 'Pick two cards to begin.'
const bestTimer = document.querySelector('.betterTimer')

function flipCard() {
    if (lockBoard) {return;}                //lock board to prevent revealing of other cards after 2 have been selected.
    if (this === firstCard) {return;}  //Prevents double-click on same card
    this.classList.toggle('flip')       //Flip-Card animation
    if (!hasFlipped) {                      //Allows for toggle between first card clicked and second card clicked. (has first card been clicked? true or false.)
        hasFlipped = true;
        firstCard = this;                   // First clicked card
        // console.log(hasFlipped, firstCard);
        totalClicks++
        flipCounter.innerText = `${totalClicks} card flips`;
        return;
    }
    hasFlipped = false;
    secondCard = this;                //Second clicked card
    totalClicks++;
    flipCounter.innerText = `${totalClicks} card flips`;
    checkMatch();
}

function checkMatch () {            // Check for match
    firstCard.dataset.framework === secondCard.dataset.framework ? disableCard() : unflipCard()      //If match, remove event listener so card cant be clicked again. If no match, then flip card back over.
}

function disableCard () {
    firstCard.removeEventListener('click', flipCard)    //It's a match!
    secondCard.removeEventListener('click', flipCard)
    score -= 1;
    scoreDisplay.innerText = `There are ${score} pair(s) remaining!`
    statusDisplay.innerHTML = '<p style="color: lime;">Correct!</p>'
    // console.log(score);
    if (score === 0){
        winnerCheck();
    }
}

function unflipCard () {
    lockBoard = true;                           //Lock the game board so that no other cards can be clicked while the cards are flipping back over. (lock cards during flip animation)
    statusDisplay.innerHTML = '<p style="color: rgb(254, 63, 5);">Incorrect. Try Again!</p>'
    setTimeout(() => {
        firstCard.classList.toggle('flip')      //Not a match
        secondCard.classList.toggle('flip')     //Remove or Toggle can be used here.
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
        let randomPos = Math.floor(Math.random()* 12)  //Equation used to return number values from 0-11.
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


//Winner Display

function winnerCheck() {
    statusDisplay.innerHTML = '<p style="color: rgb(255, 205, 5);">WINNER!</p>';
    setTimeout(() => {
        alert(`Congratulations! You completed the game board in ${totalClicks} turns. Press reset to play again!`);
    }, 1250);
}

// let startCountdown() {
// //     return setInterval(() => {
// //         timePassed++
// //         timer.innerText = `${timePassed} seconds`
// //     }, 1000);
// // }

function startCountdown() {
    timePassed++
    timer.innerText = `${timePassed} seconds`;
    return date ();
}


function startTimer() {
    myInterval = setInterval(startCountdown, 1000);
}

function stopTimer() {

}

function date () {
    let date = new Date(timePassed * 1000).toISOString().substr(11, 8);
    console.log(date);
    bestTimer.innerText = date;
}