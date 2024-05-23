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
var cardErrorOutput = document.getElementById('error-text');
var saveAllButton = document.getElementById('save-all');
var loadCardsButton = document.getElementById('load-cards');
var isEditing = false;
var currentCardIndex = null;
formularSubmit === null || formularSubmit === void 0 ? void 0 : formularSubmit.addEventListener('submit', function (event) {
    event.preventDefault();
    cardErrorOutput.innerHTML = '';
    var newCard = createCard();
    var errorMessage = validateCard(newCard);
    if (errorMessage === '') {
        if (isEditing && currentCardIndex !== null) {
            updateCard(newCard, currentCardIndex);
        }
        else {
            addCardToArray(newCard);
            addCardToOutput(newCard);
        }
        formularSubmit.reset();
        document.getElementById('submit').innerText = 'Add';
        isEditing = false;
        currentCardIndex = null;
    }
    else {
        cardErrorOutput.innerHTML = errorMessage;
    }
});
saveAllButton.addEventListener('click', saveAllCards);
loadCardsButton.addEventListener('click', loadCards);
function createCard() {
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
function addCardToArray(newCard) {
    Cards.push(newCard);
    console.log(Cards);
}
function validateCard(card) {
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
function addCardToOutput(newCard) {
    var cardDivElement = document.createElement('div');
    cardDivElement.setAttribute('class', 'imageDiv');
    cardDivElement.style.backgroundImage = "url(".concat(newCard.url, ")");
    cardWrapper === null || cardWrapper === void 0 ? void 0 : cardWrapper.appendChild(cardDivElement);
    var infoDivElement = document.createElement('div');
    infoDivElement.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    infoDivElement.setAttribute('class', 'infoDiv');
    cardDivElement.appendChild(infoDivElement);
    var albumsElement = document.createElement('p');
    albumsElement.innerText = "Albums: ".concat(newCard.albums);
    infoDivElement.appendChild(albumsElement);
    var hitsElement = document.createElement('p');
    hitsElement.innerText = "Hits: ".concat(newCard.topTen);
    infoDivElement.appendChild(hitsElement);
    var netWorthElement = document.createElement('p');
    netWorthElement.innerText = "Net Worth: ".concat(newCard.netWorth);
    infoDivElement.appendChild(netWorthElement);
    var ageElement = document.createElement('p');
    ageElement.innerText = "Age: ".concat(newCard.age);
    infoDivElement.appendChild(ageElement);
    var nameElement = document.createElement('h3');
    nameElement.innerText = "".concat(newCard.firstName, " ").concat(newCard.lastName, " \n  (").concat(newCard.stageName, ")");
    cardDivElement.appendChild(nameElement);
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'DELETE';
    deleteButton.style.marginTop = '20px';
    deleteButton.addEventListener('click', function () {
        var cardToDeleteIndex = Cards.findIndex(function (card) { return card.firstName === newCard.firstName && card.lastName === newCard.lastName; });
        if (cardToDeleteIndex >= 0) {
            Cards.splice(cardToDeleteIndex, 1);
        }
        cardDivElement.remove();
    });
    cardDivElement.appendChild(deleteButton);
    var editButton = document.createElement('button');
    editButton.textContent = 'EDIT';
    editButton.addEventListener('click', function () {
        loadCardIntoForm(newCard);
        document.getElementById('submit').innerText = 'Save';
        isEditing = true;
        currentCardIndex = Cards.findIndex(function (card) { return card.firstName === newCard.firstName && card.lastName === newCard.lastName; });
    });
    cardDivElement.appendChild(editButton);
}
function loadCardIntoForm(card) {
    firstName.value = card.firstName;
    lastName.value = card.lastName;
    stageName.value = card.stageName;
    albums.value = String(card.albums);
    topTen.value = String(card.topTen);
    netWorth.value = String(card.netWorth);
    age.value = String(card.age);
    url.value = card.url;
}
function updateCard(updatedCard, index) {
    Cards[index] = updatedCard;
    var cardElements = document.querySelectorAll('.imageDiv');
    cardElements[index].remove();
    addCardToOutput(updatedCard);
}
function saveAllCards() {
    localStorage.setItem('cards', JSON.stringify(Cards));
    alert('All cards have been saved!');
}
function loadCards() {
    var storedCards = localStorage.getItem('cards');
    if (storedCards) {
        var parsedCards = JSON.parse(storedCards);
        Cards.length = 0;
        cardWrapper.innerHTML = '';
        parsedCards.forEach(function (card) {
            Cards.push(card);
            addCardToOutput(card);
        });
        alert('Cards have been loaded!');
    }
    else {
        alert('No cards found in storage.');
    }
}
