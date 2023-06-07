const dogAPI = 'http://localhost:3000/dogs';
const dogCollection = document.getElementById('dog-collection')
const addDogForm = document.getElementById('new-dog-form');
const filterBtn = document.getElementById('filter-btn')

const headers = {
    Accepts: 'application/json',
    'Content-type': 'application/json',
}

let dogList = [];

addDogForm.addEventListener('submit', addNewDog);
filterBtn.addEventListener('click', () => {alert("It's Working!")});

//FETCH THE DOGSs
fetch(dogAPI)
    .then(resp => resp.json())
    .then(json => {
        dogList = json;
        renderDogs()
    });

function renderDogs() {
    dogCollection.innerHTML = '';
    dogList.forEach(renderDog);
}

function renderDog(dog){
    const newDog = document.createElement('div');
    newDog.classList.add('dog-card');
    const likeButtonId = `like-button-${dog.id}`
    newDog.innerHTML = `
        <h2 class="dog-card-content">${dog.name}</h2>
        <img class ="dog-image" src="${dog.image}" alt="${dog.name}IMG">
        <p class="dog-card-content">${dog.breed}</p>
        <p class="dog-card-content">${dog.likes} Likes</p>
        <button id="${likeButtonId}">Like ❤️</button>
    `;
    dogCollection.append(newDog);

    document.getElementById(likeButtonId).addEventListener('click', event => {
        incrementLikes(dog.id);
    })

}

function addNewDog(event) {
    event.preventDefault();

    const form = event.target;
    const newDog = {
        name: form.name.value,
        image: form.image.value,
        breed: form.breed.value,
        likes: 0
    };

    form.name.value = '';
    form.image.value = '';
    form.breed.value = '';

    fetch (dogAPI, {
        headers,
        method: 'POST',
        body: JSON.stringify(newDog),
    })
    .then(res => res.json())
    .then(json => {
        dogList.push(json);
        renderDogs()
    });
}

function incrementLikes(id) {
    const dog = dogList.find(dog => dog.id === id);
    //console.log(dog);

    fetch(`${dogAPI}/${id}`, {
        headers,
        method: 'PATCH',
        body: JSON.stringify({
            likes: dog.likes + 1
        })
    })
    .then(res => res.json())
    .then(json => {
        dog.likes = json.likes;
        renderDogs();
    });
}