import * as prjConstants from "./constants/project-constants.js";

import login from "./account/login.js";
import slugify from "./helpers/slugify.js";

import getGenres from "./genre/get-genres.js";
import createGenre from "./genre/create-genre.js";

import getMovie from "./movie/get-movie.js";
import createMovie from "./movie/create-movie.js";
import updateMovie from "./movie/update-movie.js";

import searchResultsToLookupMap from "./helpers/search-helpers.js";

const buttonInit = document.getElementById("init");
buttonInit.addEventListener("click", (evt) => {
    if (evt.cancelable) {
        evt.preventDefault();
    }
    init();
});

/**
 * Initialize
 *
 */
async function init() {
    let authToken = sessionStorage.getItem("token");

    if (!authToken) {
        authToken = await login(prjConstants.USERNAME, prjConstants.PASSWORD);
        if (authToken) {
            sessionStorage.setItem("token", authToken);
            console.log("Logged in...");
        } else {
            return;
        }
    }

    console.log("Sync started...");

    await sync(authToken);

    console.log("Sync ended...");
}

/**
 * Synchronize records
 *
 * @param {string} authToken
 */
async function sync(authToken) {
    // Load JSON data to synchronize
    const movies = await fetch("movie.json").then((data) => {
        return data.json();
    });

    // Check for valid data as required
    if (!movies || movies.length === 0) {
        throw new Error("Error retrieving data, make sure the source file exists and is not empty.");
    }

    // Give feedback to the console
    console.log(`${movies.length} movies found in source file`);

    //
    // First get all the lookups, in our example we only have Movie Genre.
    //
    // Get all genres
    const genreSearchResults = await getGenres(authToken);

    // Convert the genre search results to a lookup map
    const genres = searchResultsToLookupMap(genreSearchResults);

    // Loop all the movies to sync
    for (let index = 0; index < movies.length; index++) {
        // Assign movies[index] to movie
        const movie = movies[index];

        // Give feedback to the console
        console.log(`Synchronizing movie #${index + 1} out of ${movies.length} | ${movie.title}...`);

        //
        // Do this for all the lookups
        //
        // Check if the genre exists in the genre lookup map
        let genreId = genres.get(movie.genre);

        // If genre does not exist then create it
        if (!genreId) {
            console.log(`\tCreating Movie Genre ${movie.genre}...`);

            // Create new genre
            genreId = await createGenre(movie.genre, slugify(movie.genre), authToken);

            // Add it to the map
            genres.set(movie.genre, genreId);
        }

        //
        // Now that we have all the lookups we check if the movie already exists
        //
        // Search the movie by id
        const movieSearchResult = await getMovie(movie.id, authToken);

        // If the movie exists
        if (movieSearchResult && movieSearchResult.hasItems) {
            //
            // The getMovie search should have returned only 1 item
            //
            // We assign it to existingMovie
            const existingMovie = movieSearchResult.items[0];

            // Check if it needs to be updated as required
            if (
                movie.title !== existingMovie.title ||
                movie.plot !== existingMovie.identifiers.plot ||
                movie.releaseDate !== existingMovie.identifiers.releaseDate ||
                movie.genre !== existingMovie.identifiers.genre.description
            ) {
                console.log(`\tUpdating Movie ${movie.title}...`);

                // Update the existing movie
                await updateMovie(movie.id, movie.title, movie.slug, movie.plot, movie.releaseDate, genreId, authToken);
                continue;
            }
        } else {
            console.log(`\tCreating Movie ${movie.title}...`);

            // The movie was not found, create new movie
            await createMovie(movie.id, movie.title, movie.slug, movie.plot, movie.releaseDate, genreId, authToken);

            continue;
        }

        console.log(`\tSkipping Movie ${movie.title}...`);
    }
}
