let watchlistArray = JSON.parse(localStorage.getItem("watchListArray"))

function renderAllFilms() {
    if (watchlistArray.length > 0) {
        document.querySelector('main').innerHTML = ''
    }

    let finalHTML = ''
    for (let item of watchlistArray) {
        finalHTML += renderFilmsHTML(item)
    }
    document.querySelector('main').innerHTML = finalHTML
    
    if (watchlistArray.length == 0) {
        document.querySelector('main').innerHTML = `
        <div id="start-exploring" class="start-exploring">
            <p>Your watchlist is looking a little empty...</p>
            <p><a href="index.html"><i class="watchlist-icon fa-solid fa-plus"></i> Let's add some movies!</a></p>
        </div>`
    }
}

function renderFilmsHTML(data) {
    let { id, title, ratings, runtime, genre, plot, poster } = data
    return `
    <div class="film-container">
        <div class="film">
            <div class="poster-div">
                <img class="poster" src=${poster}></img>
            </div>
            <div class="text-div">
                <div class="text-one-div">
                    <h3 class="title">${title}</h3>
                    <div class="rating">
                        <i class="fa-solid fa-star" style="color: #fec654;"></i>
                        <p>${ratings}</p>
                    </div>
                </div>
                <div class="text-two-div">
                    <p class="runtime">${runtime}</p>
                    <p class="genre"><span>${genre}</span></p>
                    <div 
                    data-id="${id}"
                    class="watchlist">
                        <i
                        data-id="${id}" 
                        class="watchlist-icon fa-solid fa-minus"></i>
                        <p
                        data-id="${id}" 
                        data-Poster="${poster}">Watchlist</p>
                    </div>
                </div>
                <div class="plot-div">
                    <p class="plot">${plot}</p>
                </div>
            </div>
        </div>
    </div>
    `
}

document.addEventListener('click', function (event) {
    let newWatchList = []
    if (event.target.dataset.id) {
        for (let i = 0; i < watchlistArray.length; i++) {
            if (watchlistArray[i].id === event.target.dataset.id) {
                for (let j = 0; j < watchlistArray.length; j++) {
                    if (i != j) {
                        newWatchList.push(watchlistArray[j])
                    }
                }
            }
        }
        watchlistArray = newWatchList
    }
    localStorage.setItem("watchListArray", JSON.stringify(watchlistArray))
    renderAllFilms()
})

renderAllFilms()

