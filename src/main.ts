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
const formularSubmit = document.getElementById("formular");

formularSubmit?.addEventListener('submit', (event: Event) => {
    event.preventDefault();
   // bookErrorOutput.innerHTML = '';
  
  
    const newCard = createCard();
    console.log(newCard);
    const errorMessage = validateCard(newCard);
    console.log(errorMessage);
    // if (errorMessage === '') {

    addCardToArray(newCard);
    addCardToOutput(newCard);
    //   bookForm.reset();
    // } else {
    //   bookErrorOutput.innerHTML = errorMessage;
    // }
  });

  function createCard(): Card {
    const newCard: Card = {
      firstName: firstName.value,
      lastName: lastName.value,
      stageName: stageName.value,
      albums: Number(albums.value),
      topTen: Number(topTen.value),
      netWorth: Number(netWorth.value),
      age: Number(age.value),
      url: url.value
    };
    return newCard;
  }

  function addCardToArray(newCard: Card) {
    Cards.push(newCard);
    console.log(Cards);
  }

  function validateCard(card: Card): string {
    if (!card.firstName || !card.lastName || !card.stageName || !card.albums || !card.topTen || !card.netWorth || !card.age || !card.url) {
      return 'All fields are required';
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
    cardDivElement.setAttribute('class', 'imageDiv')
    cardDivElement.style.backgroundImage = `url(${newCard.url})`
    cardWrapper?.appendChild(cardDivElement);

    const infoDivElement = document.createElement('div')
    infoDivElement.setAttribute('class', 'infoDiv')
    cardDivElement?.appendChild(infoDivElement);

    const albumsElement = document.createElement('p');
    albumsElement.innerText = `Albums: 
    ${albums.value}`
    infoDivElement.appendChild(albumsElement);

    const hitsElement = document.createElement('p');
    hitsElement.innerText = `Hits: 
    ${topTen.value}`
    infoDivElement.appendChild(hitsElement);

    const netWorthElement = document.createElement('p');
    netWorthElement.innerText = `NetWorth: 
    ${netWorth.value}`
    infoDivElement.appendChild(netWorthElement);

    const ageElement = document.createElement('p');
    ageElement.innerText = `Age: 
    ${age.value}`
    infoDivElement.appendChild(ageElement);
  }