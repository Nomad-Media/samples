import login from "./login/login.js";
import addMovieToMovieGroup from "./movie-groups/add-movie-to-movie-group.js";
import createMovieGroup from "./movie-groups/create-movie-group.js";
import deleteMovieGroup from "./movie-groups/delete-movie-group.js";
import getMovieGroup from "./movie-groups/get-movie-group.js";
import getMovieGroups from "./movie-groups/get-movie-groups.js";
import removeMovieFromMovieGroup from "./movie-groups/remove-movie-from-movie-group.js";
import renameMovieGroup from "./movie-groups/rename-movie-group.js";
import shareMovieGroup from "./movie-groups/share-movie-group.js";
import stopSharingMovieGroup from "./movie-groups/stop-sharing-movie-group.js";

const LOGIN_FORM = document.getElementById("loginForm");
const GET_GROUP_FORM = document.getElementById("getGroupForm");
const GET_GROUPS_FORM = document.getElementById("getGroupsForm");
const CREATE_FORM = document.getElementById("createForm");
const ADD_FORM = document.getElementById("addForm");
const REMOVE_FORM = document.getElementById("removeForm");
const RENAME_FORM = document.getElementById("renameForm");
const SHARE_FORM = document.getElementById("shareForm");
const STOP_SHARE_FORM = document.getElementById("stopShareForm");
const DELETE_FORM = document.getElementById("deleteForm");

const USERNAME_INPUT = document.getElementById("usernameInput");
const PASSWORD_INPUT = document.getElementById("passwordInput");
const NAME_INPUT = document.getElementById("nameInput");
const GET_GROUP_ID_INPUT = document.getElementById("getGroupIdInput");
const ADD_INPUT = document.getElementById("addInput");
const ADD_MOVIE_INPUT = document.getElementById("addMovieInput");
const REMOVE_INPUT = document.getElementById("removeInput");
const REMOVE_MOVIE_INPUT = document.getElementById("removeMovieInput");
const RENAME_GROUP_ID_INPUT = document.getElementById("renameInput");
const RENAME_GROUP_INPUT = document.getElementById("renameGroupInput");
const SHARE_MOVIE_GROUP_ID_INPUT= document.getElementById("shareMovieGroupIdInput")
const SHARED_USER_ID_INPUT = document.getElementById("sharedUserIdInput");
const STOP_SHARING_MOVIE_GROUP_ID_INPUT= document.getElementById("stopSharingMovieGroupIdInput")
const REMOVE_SHARED_USER_ID_INPUT = document.getElementById("removeSharedUserIdInput");
const DELETE_INPUT = document.getElementById("deleteInput");

sessionStorage.clear();

LOGIN_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    let username = USERNAME_INPUT.value;
    let password = PASSWORD_INPUT.value;

    loginMain(username, password);
});

GET_GROUP_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let id = GET_GROUP_ID_INPUT.value;

    getMovieGroupMain(id);
});

GET_GROUPS_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    getMovieGroupsMain();
});

CREATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let name = NAME_INPUT.value;

    createMovieGroupMain(name);
});

ADD_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let movieGroup = ADD_INPUT.value;
    let movies = ADD_MOVIE_INPUT.value;

    addMovieToMovieGroupMain(movieGroup, movies);
});

REMOVE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let movieGroup = REMOVE_INPUT.value;
    let movies = REMOVE_MOVIE_INPUT.value

    removeMovieFromMovieGroupMain(movieGroup, movies);
});

RENAME_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let movieGroupId = RENAME_GROUP_ID_INPUT.value;
    let renameGroup = RENAME_GROUP_INPUT.value;

    renameMovieGroupMain(movieGroupId, renameGroup);
});

SHARE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let shareMovieGroupId = SHARE_MOVIE_GROUP_ID_INPUT.value;
    let sharedUserId = SHARED_USER_ID_INPUT.value;

    shareMovieGroupMain(shareMovieGroupId, sharedUserId.split(","));
});

STOP_SHARE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let stopSharingMovieGroupId = STOP_SHARING_MOVIE_GROUP_ID_INPUT.value;
    let removeUserId = REMOVE_SHARED_USER_ID_INPUT.value;

    stopShareMovieGroupMain(stopSharingMovieGroupId, removeUserId.split(","));
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let movieGroup = DELETE_INPUT.value

    deleteMovieGroupMain(movieGroup);
});

async function loginMain(USERNAME, PASSWORD)
{
    try
    {
        console.log("Logging in");
        const TOKEN = await login(USERNAME, PASSWORD);
        console.log("Successfully Logged in");
        sessionStorage.setItem("token", TOKEN);
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function getMovieGroupsMain()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Getting movie groups");
        const MOVIE_GROUPS = await getMovieGroups(sessionStorage.getItem("token"));
        console.log(JSON.stringify(MOVIE_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function getMovieGroupMain(ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Getting movie group");
        const INFO = await getMovieGroup(sessionStorage.getItem("token"), ID)
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function createMovieGroupMain(NAME)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Creating movie groups");
        const MOVIE_GROUPS = await createMovieGroup(sessionStorage.getItem("token"), NAME);
        console.log(JSON.stringify(MOVIE_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function addMovieToMovieGroupMain(MOVIE_GROUP, MOVIES)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Adding movies to movie group");
        const MOVIE_GROUPS = await addMovieToMovieGroup(sessionStorage.getItem("token"), MOVIE_GROUP, MOVIES.split(","));
        console.log(JSON.stringify(MOVIE_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function removeMovieFromMovieGroupMain(MOVIE_GROUP, MOVIES)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Removeing movie groups");
        const MOVIE_GROUPS = await removeMovieFromMovieGroup(sessionStorage.getItem("token"), MOVIE_GROUP, MOVIES.split(","));
        console.log(JSON.stringify(MOVIE_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function renameMovieGroupMain(MOVIE_GROUP, NAME)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Renaming movie groups");
        const MOVIE_GROUPS = await renameMovieGroup(sessionStorage.getItem("token"), MOVIE_GROUP, NAME);
        console.log(JSON.stringify(MOVIE_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function shareMovieGroupMain(GROUP_ID, USER_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Adding User");
        const ID = await shareMovieGroup(sessionStorage.getItem("token"), GROUP_ID, USER_ID);
        console.log(JSON.stringify(ID, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function stopShareMovieGroupMain(GROUP_ID, USER_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Removing User");
        const ID = await stopSharingMovieGroup(sessionStorage.getItem("token"), GROUP_ID, USER_ID);
        console.log(JSON.stringify(ID, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteMovieGroupMain(MOVIE_GROUP)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Deleting movie groups");
        const MOVIE_GROUPS = await deleteMovieGroup(sessionStorage.getItem("token"), MOVIE_GROUP);
        console.log(JSON.stringify(MOVIE_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

