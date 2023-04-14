const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=760c22fcfd8f24e3d9f1377d9c5749ec";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=760c22fcfd8f24e3d9f1377d9c5749ec&query=";

const UPCOMINGAPI=  "https://api.themoviedb.org/3/movie/upcoming?api_key=760c22fcfd8f24e3d9f1377d9c5749ec&language=en-US&page=1";

const NOW_PLAYINGAPI = "https://api.themoviedb.org/3/movie/now_playing?api_key=760c22fcfd8f24e3d9f1377d9c5749ec&language=en-US&page=1";

const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                    vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});