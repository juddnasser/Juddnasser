const cardContainer = document.getElementById("cards");
let cards = [];
let score = 0;
let firstCard, secondCard;
let lockBoard = false;
let card1flipped;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];

    shuffle();
    generateCards();
    console.log(cards);
  });

const shuffle = () => {
  let temp;
  let currentIndex = cards.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random * currentIndex);
    currentIndex--;
    temp = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temp;
  }
}

const checkIfEqual = () =>
  cards[firstCard].dataset.name == cards[secondCard].dataset.name
    ? disableCards()
    : unflipCards();

function generateCards () {
  for (const card of cards) {
    const cardElement = document.createElement("div");

    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
            <div class = "front">
            <img class="front-image" src=${card.image}>
            </div>
            <div class="back"></div>
            `;
    // cardElement.parentElement = document.querySelector("#cards");
    cardContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard (){
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");
  card1flipped++;

  if (card1flipped === 1) {
    startRepeatingTimer();
  }
  if (!firstCard) {
    firstCard = this;
    return;
  }
  secondCard = this;
  lockBoard = true;
  checkIfEqual();
  document.getElementById('score').textContent=score;
}

// Function to start a repeating timer
const startRepeatingTimer = () => {
  let seconds = 0;

  // Display the initial time
  console.log("Timer started.");

  // Use setInterval to execute a function every second
  const intervalId = setInterval(function () {
    seconds++;
    console.log(`Timer: ${seconds} seconds elapsed.`);
  }, 1000); // 1000 milliseconds = 1 second

  // Stop the timer after a certain duration (e.g., 5 seconds in this example)
  setTimeout(function () {
    clearInterval(intervalId); // Stop the interval
    window.alert("the nuclear bomb took of");
  }, 180000); // 5000 milliseconds = 5 seconds
}

const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  score++;
  unlockBoard();
}

const unflipCards = () => {
  setTimeout(() => {
    firstCard.classList.remove("flipped")
    secondCard.classList.remove("flipped")
    unlockBoard()
  }, 2000);
}
const unlockBoard = () => {
  firstCard = null
  secondCard = null
  lockBoard = false;
}
