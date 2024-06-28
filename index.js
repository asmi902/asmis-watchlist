import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let search = document.getElementById('search')
const watchlistArray = []

document.getElementById('input-field').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        search.click()
    }
})

search.addEventListener('click', function () {
    let input = document.getElementById('input-field')
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=1b4035a8&s=${input.value}`)
        .then(res => res.json())
        .then(data => renderAllFilms(data.Search))
    input.value = ''
})

function renderAllFilms(data) {
    document.querySelector('main').innerHTML = ''
    for (let items of data) {
        renderFilms(items)
    }
}


function renderFilms(items) {
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=1b4035a8&t=${items.Title}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('main').innerHTML += renderFilmsHTML(data)
        })
}

function renderFilmsHTML(data) {
    let { Title, Ratings, Runtime, Genre, Plot, Poster } = data
    let unique = uuidv4()
    return `
    <div class="film-container">
        <div class="film">
            <div class="poster-div">
                <img class="poster" src=${Poster}></img>
            </div>
            <div class="text-div">
                <div class="text-one-div">
                    <h3 class="title">${Title}</h3>
                    <div class="rating">
                        <i class="fa-solid fa-star" style="color: #fec654;"></i>
                        <p>${Ratings[0].Value.slice(0, 3)}</p>
                    </div>
                </div>
                <div class="text-two-div">
                    <p class="runtime">${Runtime}</p>
                    <p class="genre"><span>${Genre}</span></p>
                    <div
                    data-id="${unique}"
                    data-Title="${Title}" 
                    data-Ratings="${Ratings[0].Value.slice(0, 3)}" 
                    data-Runtime="${Runtime}" 
                    data-Genre="${Genre}" 
                    data-Plot="${Plot}" 
                    data-Poster="${Poster}"
                    class="watchlist">
                        <i 
                        data-id="${unique}"
                        data-Title="${Title}" 
                        data-Ratings="${Ratings[0].Value.slice(0, 3)}" 
                        data-Runtime="${Runtime}" 
                        data-Genre="${Genre}" 
                        data-Plot="${Plot}" 
                        data-Poster="${Poster}"
                        class="watchlist-icon fa-solid fa-plus"></i>
                        <p 
                        data-id="${unique}"
                        data-Title="${Title}" 
                        data-Ratings="${Ratings[0].Value.slice(0, 3)}" 
                        data-Runtime="${Runtime}" 
                        data-Genre="${Genre}" 
                        data-Plot="${Plot}" 
                        data-Poster="${Poster}">Watchlist</p>
                    </div>
                </div>
                <div class="plot-div">
                    <p class="plot">${Plot}</p>
                </div>
            </div>
        </div>
    </div>
    `
}

document.addEventListener('click', function (event) {
    if (event.target.dataset.id) {
        let details = event.target.dataset
        const temp = {
            id: details.id,
            title: details.title,
            ratings: details.ratings,
            runtime: details.runtime,
            genre: details.genre,
            plot: details.plot,
            poster: details.poster,
        }
        watchlistArray.push(temp)
        localStorage.setItem("watchListArray", JSON.stringify(watchlistArray))
    }
})
