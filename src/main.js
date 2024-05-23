var Cards = [];
var cardWrapper = document.getElementById("cards-container");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var stageName = document.getElementById("stageName");
var albums = document.getElementById("albums");
var topTen = document.getElementById("topTen");
var netWorth = document.getElementById("netWorth");
var age = document.getElementById("age");
var url = document.getElementById("url");
var formularSubmit = document.getElementById("formular");
formularSubmit === null || formularSubmit === void 0 ? void 0 : formularSubmit.addEventListener('submit', function (event) {
    event.preventDefault();
    // bookErrorOutput.innerHTML = '';
    var newCard = createCard();
    console.log(newCard);
    var errorMessage = validateCard(newCard);
    console.log(errorMessage);
    // if (errorMessage === '') {
    addCardToArray(newCard);
    addCardToOutput(newCard);
    //   bookForm.reset();
    // } else {
    //   bookErrorOutput.innerHTML = errorMessage;
    // }
});
function createCard() {
    var newCard = {
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
function addCardToArray(newCard) {
    Cards.push(newCard);
    console.log(Cards);
}
function validateCard(card) {
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
function addCardToOutput(newCard) {
    var cardDivElement = document.createElement('div');
    cardDivElement.setAttribute('class', 'imageDiv');
    cardDivElement.style.backgroundImage = "url(".concat(newCard.url, ")");
    cardWrapper === null || cardWrapper === void 0 ? void 0 : cardWrapper.appendChild(cardDivElement);
    var infoDivElement = document.createElement('div');
    infoDivElement.setAttribute('class', 'infoDiv');
    cardDivElement === null || cardDivElement === void 0 ? void 0 : cardDivElement.appendChild(infoDivElement);
    var albumsElement = document.createElement('p');
    albumsElement.innerText = "Albums: \n    ".concat(albums.value);
    infoDivElement.appendChild(albumsElement);
    var hitsElement = document.createElement('p');
    hitsElement.innerText = "Hits: \n    ".concat(topTen.value);
    infoDivElement.appendChild(hitsElement);
    var netWorthElement = document.createElement('p');
    netWorthElement.innerText = "NetWorth: \n    ".concat(netWorth.value);
    infoDivElement.appendChild(netWorthElement);
    var ageElement = document.createElement('p');
    ageElement.innerText = "Age: \n    ".concat(age.value);
    infoDivElement.appendChild(ageElement);
}
