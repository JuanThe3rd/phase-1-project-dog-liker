const dogAPI = 'http://localhost:3000/dogs';
const dogCollection = document.getElementById('dog-collection')

fetch(dogAPI)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(renderDog);
    })

function renderDog(dog){
    const newDog = document.createElement('div');
    newDog.classList.add('dog-card');

    newDog.innerHTML = `
        <h2 class="dog-card-content">${dog.name}</h2>
        <img class ="dog-image" src="${dog.image}" alt="${dog.name}IMG">
        <p class="dog-card-content">${dog.breed}</p>
        <p class="dog-card-content">${dog.likes} Likes</p>
        <button>Like ❤️</button>
    `

    dogCollection.append(newDog);
}