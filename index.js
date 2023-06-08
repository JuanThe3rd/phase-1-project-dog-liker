const dogAPI = 'http://localhost:3000/dogs';
const dogCollection = document.getElementById('dog-collection');
const addDogForm = document.getElementById('new-dog-form');

const headers = {
    Accepts: 'application/json',
    'Content-type': 'application/json',
}

let dogList = [];

addDogForm.addEventListener('submit', addNewDog)

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

// Filter Section
const filterBtn = document.getElementById('filter-btn');
const filterForm = document.getElementById('filter-container');
const filterBreedForm = document.getElementById('breed-filter');
const mostLikedBtn = document.getElementById('most-liked');
const leastLikedBtn = document.getElementById('least-liked');
let filteredDogs = [];

filterBtn.addEventListener('click', () => {
    filterForm.classList.remove('hidden')
});

filterBreedForm.addEventListener('submit', filterByBreed);
mostLikedBtn.addEventListener('click', filterByMostLiked);
leastLikedBtn.addEventListener('click', filterByLeastLiked);

function filterByBreed(event){
    event.preventDefault();

    dogList.forEach((dog) => {
        if(dog.breed == event.target.userBreed.value){
            filteredDogs.push(dog);
        }
    })

    event.target.userBreed.value = '';
    filterForm.classList.add('hidden');
    dogCollection.innerHTML = '';
    filteredDogs.forEach(renderDog);
}

function filterByMostLiked(event){
    event.preventDefault();

    dogList.forEach((dog) => {

    })
}

function filterByLeastLiked(){
    let leastLikedDog = dogList[0];
    let destructiveDogList = dogList;
    filteredDogs = [];

    for(let i = 0; i < dogList.length; i++){
        console.log(destructiveDogList);
        leastLikedDog = findLeastLikedDog(destructiveDogList, leastLikedDog);
        const index = destructiveDogList.indexOf(leastLikedDog);
        filteredDogs.push(leastLikedDog);
        destructiveDogList.splice(index,1);
        console.log(destructiveDogList);
    }

    console.log(filteredDogs);
    filterForm.classList.add('hidden')
    dogCollection.innerHTML = '';
    filteredDogs.forEach(renderDog);
}

function findLeastLikedDog(destructiveDogList, leastLikedDog){
    destructiveDogList.forEach(dog => {
        if (dog.likes < leastLikedDog.likes){
            leastLikedDog = dog;
        }
    })
    
    return leastLikedDog;
}