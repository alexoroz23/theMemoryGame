const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClick = false;

const COLORS = [
  "#F44077",
  "#40F4F4",
  "#5FF334",
  "#F4C843",
  "#DB40F4",
  "#F44077",
  "#40F4F4",
  "#5FF334",
  "#F4C843",
  "#DB40F4"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}


function handleCardClick(event) {
  if (noClick) return;
  if (event.target.classList.contains('flipped')) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClick = true;
    let pic1 = card1.className;
    let pic2 = card2.className;

    if (pic1 === pic2) {
      cardsFlipped += 2;
      card1.removeEventListener('click',handleCardClick);
      card2.removeEventListener('click',handleCardClick);
      card1 = null;
      card2 = null;
      noClick = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        noClick = false;
      }, 1000);
    }
  }
 if (cardsFlipped === COLORS.length) alert('GAME OVER!');
}
createDivsForColors(shuffledColors);

// Couldn't figure it out on my own so I looked through the solution to understand what is going on.