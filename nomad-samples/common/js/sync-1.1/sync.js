import slugify from "./helpers/slugify.js";

import getGenres from "./genre/get-genres.js";
import createGenre from "./genre/create-genre.js";

import getMovie from "./movie/get-movie.js";
import createMovie from "./movie/create-movie.js";
import deleteMovie from "./movie/delete-movie.js";
import updateMovie from "./movie/update-movie.js";

import searchResultsToLookupMap from "./helpers/search-helpers.js";

const AUTH_FORM = document.getElementById("authForm");
const CREATE_FORM = document.getElementById("createForm");
const SYNC_FORM = document.getElementById("syncForm");
const DELETE_FORM = document.getElementById("deleteForm");

const TOKEN_INPUT = document.getElementById("authInput");
const TYPE_SELECT = document.getElementById("typeSelect");
const UPDATE_ID_INPUT = document.getElementById("updateIdInput");
const TITLE_INPUT = document.getElementById("titleInput");
const PLOT_INPUT = document.getElementById("plotInput");
const DATE_INPUT = document.getElementById("dateInput");
const GENRE_LABEL = document.getElementById("genreLabel");
const GENRE_SELECT = document.getElementById("genreSelect");
const GENRE_INPUT = document.getElementById("genreInput");
const IMAGE_ID_INPUT = document.getElementById("imageIdInput");
const VIDEO_ID_INPUT = document.getElementById("videoIdInput");
const DELETE_ID_INPUT = document.getElementById("deleteIdInput");

const UPDATE_ID_DIV = document.getElementById("updateIdDiv");
const GENRE_DIV = document.getElementById("genreDiv");

sessionStorage.clear();
let genreList

AUTH_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");

    genreList = await getGenreList();
});

TYPE_SELECT.addEventListener("change", function (event)
{
    event.preventDefault();

    TYPE_SELECT.value === "create" ? UPDATE_ID_DIV.hidden = true : UPDATE_ID_DIV.hidden = false;
});

async function getGenreList()
{
    GENRE_DIV.hidden = false

    const GENRE_LIST_INFO = await getGenres(sessionStorage.getItem("token"));
    const GENRE_LIST = GENRE_LIST_INFO.items;

    for(let genreIdx = 0; genreIdx < GENRE_LIST.length; ++genreIdx)
    {
        let option = document.createElement("option");
        option.value = GENRE_LIST[genreIdx].id;
        option.text = GENRE_LIST[genreIdx].title;
        GENRE_SELECT.appendChild(option);
    }
    let option = document.createElement("option");
    option.value = "Other";
    option.text = "Other";
    GENRE_SELECT.appendChild(option);

    $(GENRE_SELECT).select2();
    return GENRE_LIST;
}

$(GENRE_SELECT).on("change", function (event) {
    event.preventDefault();

    const selectedGenres = Array.from(GENRE_SELECT.selectedOptions).map(option => option.value);

    if (selectedGenres.includes("Other")) {
        GENRE_INPUT.hidden = false;
        GENRE_LABEL.style.display = "block";
    } else {
        GENRE_INPUT.hidden = true;
        GENRE_LABEL.style.display = "none";
    }
});


CREATE_FORM.addEventListener("submit", function (event) {
    event.preventDefault();

    let type = TYPE_SELECT.value;
    let id = UPDATE_ID_INPUT.value;
    let title = TITLE_INPUT.value;
    let plot = PLOT_INPUT.value;
    let date = DATE_INPUT.value;
    
    let selectedGenres = Array.from(GENRE_SELECT.selectedOptions).map(option => option.value);
    
    if (selectedGenres.includes("Other")) {
        selectedGenres.pop();
        selectedGenres.push((GENRE_INPUT.value).split(","));
    }

    let imageId = IMAGE_ID_INPUT.value;
    let videoId = VIDEO_ID_INPUT.value;

    createMovieMain(type, id, title, plot, date, selectedGenres, imageId, videoId);
});


SYNC_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    sync();
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let id = DELETE_ID_INPUT.value;

    deleteMovieMain(id);
});

async function createMovieMain(TYPE, ID, TITLE, PLOT, DATE, SELECTED_GENRES, IMAGE_ID, VIDEO_ID)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        const GENRE_MAP_LIST = [];
        let found = false;

        for(let GENRE_ID = 0; GENRE_ID < SELECTED_GENRES.length; ++GENRE_ID)
        {
            if (!Array.isArray(SELECTED_GENRES[GENRE_ID]))
            {
                let genreMap = {};
                for (let genreIdx = 0; genreIdx < genreList.length; ++genreIdx)
                {
                    if (genreList[genreIdx].id === SELECTED_GENRES[GENRE_ID])
                    {
                        genreMap["description"] = genreList[genreIdx].title 
                        genreMap["id"] = genreList[genreIdx].id;
                        found = true;
                        break;
                    }

                    if (genreList[genreIdx].title === GENRE_ID)
                    {
                        console.log("Genre already exists");
                        return 0;
                    }
                }
                GENRE_MAP_LIST.push(genreMap);
            }
            else
            {
                for (let createGenreIdx = 0; createGenreIdx < SELECTED_GENRES[GENRE_ID].length; ++createGenreIdx)
                {
                    let genreMap = {};
                    let genreName = SELECTED_GENRES[GENRE_ID][createGenreIdx];
                    let genreId = await createGenre(genreName, slugify(genreName), TOKEN);
                    genreMap["description"] = genreName;
                    genreMap["id"] = genreId;
                    GENRE_MAP_LIST.push(genreMap);
                }
            }
        }

        if (TYPE === "create")
        {
            console.log("Creating Movie");
            const ID = await createMovie(TOKEN, "", TITLE, slugify(TITLE), PLOT, DATE, GENRE_MAP_LIST, IMAGE_ID, VIDEO_ID);
            console.log(`ID: ${ID}`);
            console.log("Movie Created");
        }
        else
        {
            console.log("Updating Movie");
            const RESPONSE = await getMovie(ID, TOKEN);

            if (RESPONSE.items.length === 0)
            {
                console.log("Movie does not exist");
                return 0;
            }
            const MOVIE = RESPONSE.items[0]

            if (!TITLE && typeof MOVIE.title !== undefined) TITLE = MOVIE.title;
            if (!PLOT && typeof MOVIE.identifiers.plot !== undefined) PLOT = MOVIE.identifiers.plot;
            if (!DATE && typeof MOVIE.releaseDate !== undefined) DATE = MOVIE.releaseDate;
            if (GENRE_MAP_LIST === []) GENRE_MAP_LIST = MOVIE.identifiers.genre;
            if (!IMAGE_ID && typeof MOVIE.identifiers.image !== 'undefined') IMAGE_ID = MOVIE.identifiers.image.id;
            if (!VIDEO_ID && typeof MOVIE.identifiers.movieFile !== 'undefined') VIDEO_ID = MOVIE.identifiers.movieFile.id;

            await updateMovie(TOKEN, ID, TITLE, slugify(TITLE), PLOT, DATE, GENRE_MAP_LIST, IMAGE_ID, VIDEO_ID);
            console.log("Movie Updated");
        }

    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function sync() {
    
    const authToken = sessionStorage.getItem("token");

    
    if (!authToken) {
        throw new Error("No authorization token found, please authenticate first.");
    }

    console.log("Synchronizing...");

    
    const movies = await fetch("movie.json").then((data) => {
        return data.json();
    });

    
    if (!movies || movies.length === 0) {
        throw new Error("Error retrieving data, make sure the source file exists and is not empty.");
    }

    
    console.log(`${movies.length} movies found in source file`);

    const GENRE_SEARCH_RESULTS = await getGenres(authToken);
    const GENRES = searchResultsToLookupMap(GENRE_SEARCH_RESULTS);
    
    for (let index = 0; index < movies.length; index++) {
        const movie = movies[index];
        const GENRE_MAP_LIST = [];

        console.log(`Synchronizing movie #${index + 1} out of ${movies.length} | ${movie.title}...`);

        for(let genreIdx = 0; genreIdx < movie.genres.length; ++genreIdx)
        {
            const GENRE_MAP = {};
            let genreId = GENRES.get(movie.genres[genreIdx]);

            if (!genreId) {
                console.log(`\tCreating Movie Genre ${movie.genres}...`);

                genreId = await createGenre(movie.genres[genreIdx], slugify(movie.genre), authToken);
            }
            GENRE_MAP.description = movie.genres[genreIdx];
            GENRE_MAP.id = genreId;

            GENRE_MAP_LIST.push(GENRE_MAP);
        }

        const movieSearchResult = await getMovie(movie.id, authToken);

        
        if (movieSearchResult && movieSearchResult.hasItems) {
            
            const existingMovie = movieSearchResult.items[0];

            if (JSON.stringify(existingMovie) !== JSON.stringify(movie)) {
                console.log(`\tUpdating Movie ${movie.title}...`);

                
                await updateMovie(authToken, movie.id, movie.title, movie.slug, movie.plot, movie.releaseDate, GENRE_MAP_LIST);
                continue;
            }
        } else {
            console.log(`\tCreating Movie ${movie.title}...`);

            
            await createMovie(authToken, movie.id, movie.title, movie.slug, movie.plot, movie.releaseDate, GENRE_MAP_LIST, movie.image.id, movie.movieFile.id);

            continue;
        }

        console.log(`\tSkipping Movie ${movie.title}...`);
    }

    console.log("Synchronization completed...");
}

async function deleteMovieMain(movieId) {
    
    const authToken = sessionStorage.getItem("token");

    
    if (!authToken) {
        throw new Error("No authorization token found, please authenticate first.");
    }

    console.log("Deleting...");
    await deleteMovie(authToken, movieId);
    console.log("Deletion completed...");

    return 0;
}
