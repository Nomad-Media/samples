import multiThreadUpload from "./assets/multi-thread-upload.js";
import startUpload from "./assets/start-asset-upload.js";
import completeUpload from "./assets/upload-complete-asset.js";
import createGenre from "./genre/create-genre.js";
import getGenres from "./genre/get-genres.js";
import getCheckboxedFields from "./helpers/get-checkboxed-fields.js";
import slugify from "./helpers/slugify.js";
import login from "./login/login.js";
import createMovie from "./movie/create-movie.js";
import deleteMovie from "./movie/delete-movie.js";
import searchMovies from "./movie/search-movies.js";
import updateMovie from "./movie/update-movie.js";


const LOGIN_FORM = document.getElementById("loginForm");
const CREATE_FORM = document.getElementById("createForm");
const SEARCH_MOVIES_FORM = document.getElementById("searchMoviesForm");
const DELETE_MOVIE_FORM = document.getElementById("deleteMovieForm");

const USERNAME_INPUT = document.getElementById("usernameInput");
const PASSWORD_INPUT = document.getElementById("passwordInput");
const TYPE_SELECT = document.getElementById("typeSelect");
const UPDATE_ID_DIV = document.getElementById("updateIdDiv");
const UPDATE_ID_INPUT = document.getElementById("updateIdInput");
const TITLE_INPUT = document.getElementById("titleInput");
const PLOT_INPUT = document.getElementById("plotInput");
const DATE_INPUT = document.getElementById("dateInput");
const GENRE_LABEL = document.getElementById("genreLabel");
const GENRE_SELECT = document.getElementById("genreSelect");
const GENRE_INPUT = document.getElementById("genreInput");
const IMAGE_FILE_INPUT = document.getElementById("imageFileInput");
const VIDEO_FILE_INPUT = document.getElementById("videoFileInput");
const PAGE_OFFSET_INPUT = document.getElementById("pageOffsetInput");
const PAGE_SIZE_INPUT = document.getElementById("pageSizeInput");
const SEARCH_QUERY_INPUT = document.getElementById("searchQueryInput");
const FILTERS_CONTAINER = document.getElementById("filtersContainer");
const ADD_BUTTON = document.getElementById("addButton");
const FIELD_CHECKBOX = document.getElementsByName("fieldCheckbox");
const CONTENT_SORT_FIELD_NAME_INPUT = document.getElementById("contentSortFieldNameInput");
const CONTENT_SORT_TYPE = document.getElementById("contentSortType");
const IS_ADMIN = document.getElementById("isAdmin");
const DELETE_ID_INPUT = document.getElementById("deleteIdInput");


sessionStorage.clear();

let genreList;

LOGIN_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    let username = USERNAME_INPUT.value;
    let password = PASSWORD_INPUT.value;

    loginMain(username, password);
});

TYPE_SELECT.addEventListener("change", function (event)
{
    event.preventDefault();

    TYPE_SELECT.value === "create" ? UPDATE_ID_DIV.hidden = true : UPDATE_ID_DIV.hidden = false;
});

async function getGenreList()
{
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

    return GENRE_LIST;
}

GENRE_SELECT.addEventListener("change", function (event)
{
    event.preventDefault();

    if (GENRE_SELECT.value === "Other")
    {
        GENRE_INPUT.hidden = false;
        GENRE_LABEL.style.display = "block";
    }
    else
    {
        GENRE_INPUT.hidden = true;
        GENRE_LABEL.style.display = "none";
    }

});

CREATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let type = TYPE_SELECT.value;
    let id = UPDATE_ID_INPUT.value;
    let title = TITLE_INPUT.value;
    let plot = PLOT_INPUT.value;
    let date = DATE_INPUT.value;
    let genreId;
    GENRE_SELECT.value === "Other" ? genreId = GENRE_INPUT.value : genreId = GENRE_SELECT.value;
    let imageFile = IMAGE_FILE_INPUT.files[0];
    let videoFile = VIDEO_FILE_INPUT.files[0];

    createMovieMain(type, id, title, plot, date, genreId, imageFile, videoFile);
});

ADD_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();

    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "fieldNameInput");
    fieldNameLabel.textContent = "Field Name:";

    let fieldNameInput = document.createElement("input");
    fieldNameInput.setAttribute("type", "field");
    fieldNameInput.setAttribute("name", "fieldNameInput");
    fieldNameInput.required = true;

    let operationLabel = document.createElement('label');
    operationLabel.setAttribute("for", "operatorInput");
    operationLabel.textContent = "Operator:";

    let operatorInput = document.createElement("input");
    operatorInput.setAttribute("type", "field");
    operatorInput.setAttribute("name", "operatorInput");
    operatorInput.required = true;

    let valueLabel = document.createElement('label');
    valueLabel.setAttribute("for", "valueInput");
    valueLabel.textContent = "Value:";

    let valueInput = document.createElement("input");
    valueInput.setAttribute("type", "field");
    valueInput.setAttribute("name", "valueInput");
    valueInput.required = true;

    FILTERS_CONTAINER.appendChild(fieldNameLabel);
    FILTERS_CONTAINER.appendChild(fieldNameInput);
    FILTERS_CONTAINER.appendChild(operationLabel);
    FILTERS_CONTAINER.appendChild(operatorInput);
    FILTERS_CONTAINER.appendChild(valueLabel);
    FILTERS_CONTAINER.appendChild(valueInput);
});

SEARCH_MOVIES_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let pageOffset = PAGE_OFFSET_INPUT.value;
    let pageSize = PAGE_SIZE_INPUT.value;
    let searchQuery = SEARCH_QUERY_INPUT.value;
    let resultFieldNames = getCheckboxedFields(FIELD_CHECKBOX);
    let fieldName = CONTENT_SORT_FIELD_NAME_INPUT.value;
    let sortType = CONTENT_SORT_TYPE.value;
    let isAdmin;
    IS_ADMIN.value == "admin" ? isAdmin = true : isAdmin = false

    searchMoviesMain(document.querySelectorAll('input[type="field"]'), pageOffset, pageSize, searchQuery, 
                     resultFieldNames, fieldName, sortType, isAdmin);
});

DELETE_MOVIE_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    let id = DELETE_ID_INPUT.value;

    deleteMovieMain(id);
});

async function loginMain(USERNAME, PASSWORD)
{
    try
    {
        console.log("Logging in");
        const TOKEN = await login(USERNAME, PASSWORD);
        console.log("Successfully Logged in");
        sessionStorage.setItem("token", TOKEN);

        genreList = await getGenreList();
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function createMovieMain(TYPE, ID, TITLE, PLOT, DATE, GENRE_ID, IMAGE_FILE, VIDEO_FILE)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        let genre_id;
        let genre_name;
        let found = false;

        for (let genreIdx = 0; genreIdx < genreList.length; ++genreIdx)
        {
            if (genreList[genreIdx].id === GENRE_ID)
            {
                genre_id = genreList[genreIdx].id;
                genre_name = genreList[genreIdx].title;
                found = true;
                break;
            }

            if (genreList[genreIdx].title === GENRE_ID)
            {
                console.log("Genre already exists");
                return 0;
            }
        }

        if (!found)
        {
            genre_id = await createGenre(GENRE_ID, slugify(GENRE_ID), TOKEN);
            genre_name = GENRE_ID;
        }

        let imageId;
        if (IMAGE_FILE)
        {
            console.log("Uploading image");
            const IMAGE_RESPONSE = await startUpload(TOKEN, TITLE + " image", "continue", IMAGE_FILE);
            await multiThreadUpload(TOKEN, IMAGE_FILE, IMAGE_RESPONSE);
            imageId = IMAGE_RESPONSE.id;
            completeUpload(TOKEN, imageId);
        }

        let videoId
        if (VIDEO_FILE)
        {
            console.log("Uploading video");
            const VIDEO_RESPONSE = await startUpload(TOKEN, TITLE + " video", "continue", VIDEO_FILE);
            await multiThreadUpload(TOKEN, VIDEO_FILE, VIDEO_RESPONSE);
            videoId = VIDEO_RESPONSE.id;
            completeUpload(TOKEN, videoId);
        }

        if (TYPE === "create")
        {
            console.log("Creating Movie");
            const ID = await createMovie(TOKEN, TITLE, slugify(TITLE), PLOT, DATE, genre_id, genre_name, imageId, videoId);
            console.log(`ID: ${ID}`);
            console.log("Movie Created");
        }
        else
        {
            console.log("Updating Movie");
            await updateMovie(TOKEN, ID, TITLE, slugify(TITLE), PLOT, DATE, genre_id, genre_name, imageId, videoId);
            console.log("Movie Updated");
        }

    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function searchMoviesMain(FILTER_INPUTS, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, RESULT_FIELD_NAMES, 
                                FIELD_NAME, SORT_TYPE, IS_ADMIN)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        const FILTERS = [];
        let filtersMap = {}

        FILTER_INPUTS.forEach(function (input)
        {
            if(input.name === "fieldNameInput")
            {
                filtersMap.fieldName = input.value;
            }
            else if(input.name === "operatorInput")
            {
                filtersMap.operator = input.value;
            }
            else
            {
                filtersMap.values = input.value;
                FILTERS.push(filtersMap);
                filtersMap = {};
            }
        });

        console.log("Getting search result");
        const INFO = await searchMovies(TOKEN, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, FILTERS, RESULT_FIELD_NAMES, 
                                        FIELD_NAME, SORT_TYPE, IS_ADMIN);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteMovieMain(ID)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        console.log("Deleting Movie");
        const SUCCESS = await deleteMovie(TOKEN, ID);
        if (SUCCESS) console.log("Successfully deleted movie");
    }
    catch (error)
    {
        throw new Error(error);
    }
}