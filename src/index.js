

//Variables

let searchCount = 0;

//Selectors

const trending = document.getElementById('trending');
const trailers = document.getElementById('trailers');
const trailerContent = document.getElementById('trailer-content');
const searchIcon = document.getElementById('navSearchIcon');
const searchBox = document.getElementById('searchBox');


// Functions

const trendingApiCall = async (media,time) => {

    let trendingData;
    let m = media;
    let t = time;

    //Finds info for trending scroll

    fetch(`/.netlify/functions/fetch-trending?media=${m}&time=${t}`)
        .then(res => {console.log(response.json())})
    
    await fetch(`/.netlify/functions/fetch-trending?media=${m}&time=${t}`)

    
    .then(res => res.json())
    .then(data => trendingData = data)

    //Adds trending scroll

    .then(() => trendingData.results.map((item) => {
        if(item.title === undefined) {

            trending.innerHTML += `<div class = "slide" id = ${item.id}>
            <img class = "slide-img" src = "https://image.tmdb.org/t/p/w300/${item.poster_path}"> 
            <a href = "http://localhost:8888/review/${item.id}" class = "slide-info-title">${item.name}</a>
            <div class = "date">${item.first_air_date}</div>
        </div>`


        } else {
            trending.innerHTML += `<div class = "slide" id = ${item.id}>
            <img class = "slide-img" src = "https://image.tmdb.org/t/p/w300/${item.poster_path}">
            <a href = "http://localhost:8888/review/${item.id}" class = "slide-info-title">${item.title}</a>
            <div class = "date">${item.release_date}</div>
        </div>`

        }
    }))

    // Adds background image 

    .then(
        () => 
        document.getElementById('homeSearchImg').style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${trendingData.results[0].backdrop_path})`
    )        

}

const trailerApiCall = async (i) => {
    
    fetch(`/.netlify/functions/fetch-trailers?id=${i}`)
        .then(res => {console.log(response.json())})

    await fetch(`/.netlify/functions/fetch-trailers?id=${i}`)


    .then(res => res.json())
    .then(data => trailer = data)
    const t = trailer.results[0];

    trailerContent.innerHTML += `<div class = "trailer-content-container">
        <div  class = "trailer-title"><div class="trailer-name">${t.name}</div><div class = "close-trailer"><i id = "close-trailer" class="fas fa-times trailer-icon-close"></i></div></div>
        <iframe class = "trailer-content-vid" src="https://www.youtube.com/embed/${t.key}"></iframe>
    </div>  
`
    trailerContent.style.display = "block";

}

const trailerAdd = async (array) => {  

        array.results.map((item) => {

            if(item.title === undefined) {

                trailers.innerHTML += `<div class = "trailer">
                    <div class = "trailer-size">
                        <div class = "trailer-img-container">
                            <button id = ${item.id} onclick = "getId(this)" class = "play-btn"><i class="fas fa-play play-icon"></i></button>
                            <img class = "slide-img" src = "https://image.tmdb.org/t/p/w500/${item.backdrop_path}" >
                        </div>
                        <a href = "#" class = "trailer-info-title">${item.name}</a>
                        <div class = "date">${item.first_air_date}</div>
                    </div>
                    
                </div>`

            } else if (item.backdrop_path === null) {
        

            } else {
                
                trailers.innerHTML += `<div class = "trailer">
                    <div class = "trailer-size">
                        <div class = "trailer-img-container">
                            <button id = ${item.id} onclick = "getId(this)" class = "play-btn"><i class="fas fa-play play-icon"></i></button>
                            <img class = "slide-img" src = "https://image.tmdb.org/t/p/w500/${item.backdrop_path}">
                        </div>
                        <a href = "#" class = "trailer-info-title">${item.title}</a>
                        <div class = "date">${item.release_date}</div>
                    </div>
                        
                </div>`
            }

        })
 
}

const upcomingMovieApiCall = async () => {

    let upcomingData;

    fetch(`/.netlify/functions/fetch-upcoming`)
        .then(res => {console.log(response.json())})
    
    await fetch(`/.netlify/functions/fetch-upcoming`)

    .then(res => res.json())
    .then(data => upcomingData = data)

    .then(() => trailerAdd(upcomingData))

}

const getId = (btn) => {
    console.log(btn.id);
    console.log(this)

    const id = btn.id;
    
    trailerApiCall(id);
}

const closeTrailer = (e) => {
    console.log('close clicked')

    const item = e.target;

    console.log(item);

    if(item.classList[2] === "trailer-icon-close") {
        trailerContent.innerHTML = "";
        trailerContent.style.display = "none";
    }


}

const addSearch  = (e) => {
    console.log('clicked')


    if(searchCount === 0) {

        searchIcon.innerHTML = `<i class="fas fa-times search-mobile-close"></i>`

        searchBox.innerHTML += `<div class = "nav-search-bar-mobile">
        <div class = "drop-down-search-icon">
            <i class="fas fa-search search-icon-mobile"></i>
        </div>
        
        <div class = "mobile-search-dropdown">
            <form>
                
                <input type ="text" tabindex="1" placeholder="Search for a film or tv show here...">
            </form>
        </div>
    </div>`

    searchCount = 1;

    } else {

        searchBox.innerHTML = " "

        searchIcon.innerHTML = `<i class="fas fa-search search-icon-mobile"></i>`

        searchCount = 0;

    }
        
    
}


//Event listeners 

trailerContent.addEventListener('click', closeTrailer);
searchIcon.addEventListener('click', addSearch);

trendingApiCall('movie', 'week');
upcomingMovieApiCall();
