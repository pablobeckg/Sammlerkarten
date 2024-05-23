type Card = {
  firstName: string;
  lastName: string;
  stageName: string;
  albums: number;
  topTen: number;
  netWorth: number;
  age: number;
  url: string;
};

const Cards: Card[] = [];

const cardWrapper = document.getElementById("cards-container");
const firstName = document.getElementById("firstName") as HTMLInputElement;
const lastName = document.getElementById("lastName") as HTMLInputElement;
const stageName = document.getElementById("stageName") as HTMLInputElement;
const albums = document.getElementById("albums") as HTMLInputElement;
const topTen = document.getElementById("topTen") as HTMLInputElement;
const netWorth = document.getElementById("netWorth") as HTMLInputElement;
const age = document.getElementById("age") as HTMLInputElement;
const url = document.getElementById("url") as HTMLInputElement;
const formularSubmit = document.getElementById("formular") as HTMLFormElement;
const cardErrorOutput = document.getElementById('error-text') as HTMLDivElement;

const saveAllButton = document.getElementById('save-all') as HTMLButtonElement;
const loadCardsButton = document.getElementById('load-cards') as HTMLButtonElement;

let isEditing = false;
let currentCardIndex: number | null = null;

formularSubmit?.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  cardErrorOutput.innerHTML = '';

  const newCard = createCard();
  const errorMessage = validateCard(newCard);

  if (errorMessage === '') {
    if (isEditing && currentCardIndex !== null) {
      updateCard(newCard, currentCardIndex);
    } else {
      addCardToArray(newCard);
      addCardToOutput(newCard);
    }
    formularSubmit.reset();
    document.getElementById('submit')!.innerText = 'Add';
    isEditing = false;
    currentCardIndex = null;
  } else {
    cardErrorOutput.innerHTML = errorMessage;
  }
});

saveAllButton.addEventListener('click', saveAllCards);
loadCardsButton.addEventListener('click', loadCards);

function createCard(): Card {
  return {
    firstName: firstName.value,
    lastName: lastName.value,
    stageName: stageName.value,
    albums: Number(albums.value),
    topTen: Number(topTen.value),
    netWorth: Number(netWorth.value),
    age: Number(age.value),
    url: url.value
  };
}

function addCardToArray(newCard: Card) {
  Cards.push(newCard);
  console.log(Cards);
}

function validateCard(card: Card): string {
  if (!card.firstName || !card.lastName || !card.stageName || !card.albums || !card.topTen || !card.netWorth || !card.age || !card.url) {
    return 'All fields are required';
  }
  if (!/^[\p{L}]+$/u.test(card.firstName)) {
    return 'First name must be made of letters';
  }
  if (!/^[\p{L}]+$/u.test(card.lastName)) {
    return 'Last name must be made of letters';
  }
  if (card.albums <= 0 || card.albums >= 50) {
    return 'Albums must be between 0 and 50';
  }
  if (card.topTen <= 0 || card.topTen >= 100) {
    return 'Top 10 must be between 0 and 100';
  }
  if (card.netWorth <= 0 || card.netWorth >= 1000000000) {
    return 'Net worth must be between 0 and 1000000000';
  }
  if (card.age <= 0 || card.age >= 125) {
    return 'Age must be between 0 and 125';
  }
  return '';
}

function addCardToOutput(newCard: Card) {
  const cardDivElement = document.createElement('div');
  cardDivElement.setAttribute('class', 'imageDiv');
  cardDivElement.style.backgroundImage = `url(${newCard.url})`;
  cardWrapper?.appendChild(cardDivElement);

  const infoDivElement = document.createElement('div');
  infoDivElement.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'
  infoDivElement.setAttribute('class', 'infoDiv');
  cardDivElement.appendChild(infoDivElement);

  const albumsElement = document.createElement('p');
  albumsElement.innerText = `Albums: ${newCard.albums}`;
  infoDivElement.appendChild(albumsElement);

  const hitsElement = document.createElement('p');
  hitsElement.innerText = `Hits: ${newCard.topTen}`;
  infoDivElement.appendChild(hitsElement);

  const netWorthElement = document.createElement('p');
  netWorthElement.innerText = `Net Worth: ${newCard.netWorth}`;
  infoDivElement.appendChild(netWorthElement);

  const ageElement = document.createElement('p');
  ageElement.innerText = `Age: ${newCard.age}`;
  infoDivElement.appendChild(ageElement);

  const nameElement = document.createElement('h3');
  nameElement.innerText = `${newCard.firstName} ${newCard.lastName} 
  (${newCard.stageName})`;
  cardDivElement.appendChild(nameElement);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'DELETE';
  deleteButton.style.marginTop = '20px'
  deleteButton.addEventListener('click', () => {
    const cardToDeleteIndex = Cards.findIndex(
      (card: Card) => card.firstName === newCard.firstName && card.lastName === newCard.lastName
    );
    if (cardToDeleteIndex >= 0) {
      Cards.splice(cardToDeleteIndex, 1);
    }
    cardDivElement.remove();
  });
  cardDivElement.appendChild(deleteButton);

  const editButton = document.createElement('button');
  editButton.textContent = 'EDIT';
  editButton.addEventListener('click', () => {
    loadCardIntoForm(newCard);
    document.getElementById('submit')!.innerText = 'Save';
    isEditing = true;
    currentCardIndex = Cards.findIndex(
      (card: Card) => card.firstName === newCard.firstName && card.lastName === newCard.lastName
    );
  });
  cardDivElement.appendChild(editButton);
}

function loadCardIntoForm(card: Card) {
  firstName.value = card.firstName;
  lastName.value = card.lastName;
  stageName.value = card.stageName;
  albums.value = String(card.albums);
  topTen.value = String(card.topTen);
  netWorth.value = String(card.netWorth);
  age.value = String(card.age);
  url.value = card.url;
}

function updateCard(updatedCard: Card, index: number) {
  Cards[index] = updatedCard;
  const cardElements = document.querySelectorAll('.imageDiv');
  cardElements[index].remove();
  addCardToOutput(updatedCard);
}

function saveAllCards() {
  localStorage.setItem('cards', JSON.stringify(Cards));
  alert('All cards have been saved!');
}

function loadCards() {
  const storedCards = localStorage.getItem('cards');
  if (storedCards) {
    const parsedCards: Card[] = JSON.parse(storedCards);
    Cards.length = 0;
    cardWrapper!.innerHTML = '';
    parsedCards.forEach(card => {
      Cards.push(card);
      addCardToOutput(card);
    });
    alert('Cards have been loaded!');
  } else {
    alert('No cards found in storage.');
  }
}
