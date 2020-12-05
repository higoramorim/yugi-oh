const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

(function shuffle(){
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * cards.length)
    card.style.order = randomPosition;
  })
})();

function resetBoard(){
  [hasFlippedCard, lockBoard] = [false, false]
  [firstCard, secondCard] = [null, null]
}

function disableCards(){
  firstCard.removeEventListener('click', flipCard)
  secondCard.removeEventListener('click', flipCard)
  resetBoard()
}

function unflippedCard(){
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip')
    lockBoard = false;
  }, 1500)
}

function checkForMath(){
  if(firstCard.dataset.card === secondCard.dataset.card){
    disableCards()
    return;
  }
  unflippedCard()
}

function flipCard(){
  if(lockBoard) return;
  if(this === firstCard) return;
  this.classList.add('flip')
  if(!hasFlippedCard){
    hasFlippedCard = true
    firstCard = this;
    return;
  }
  secondCard = this;
  hasFlippedCard = false;
  checkForMath();
}


cards.forEach((card) => {
  card.addEventListener('click', flipCard)
})