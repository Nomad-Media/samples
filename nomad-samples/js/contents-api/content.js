import createContent from "./contents/create-content.js";
import deleteContent from "./contents/delete-content.js";
import updateContent from "./contents/update-content.js";


const AUTH_FORM = document.getElementById("authForm");
const CREATE_FORM = document.getElementById("createForm");
const UPDATE_FORM = document.getElementById("updateForm");
const DELETE_FORM = document.getElementById("deleteForm");

const TOKEN_INPUT = document.getElementById("authInput");
const CREATE_CONTENT_DEFINITION_ID_INPUT = document.getElementById("createContentDefinitionIdInput");
const UPDATE_CONTENT_DEFINITION_ID_INPUT = document.getElementById("updateContentDefinitionIdInput");
const UPDATE_ID_INPUT = document.getElementById("updateIdInput");
const PROPERTIES_INPUT = document.getElementById("propertiesInput");
const DELETE_CONTENT_DEFINITION_ID_INPUT = document.getElementById("deleteContentDefinitionIdInput");
const DELETE_ID_INPUT = document.getElementById("deleteIdInput");

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

CREATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let contentDefinitionId = CREATE_CONTENT_DEFINITION_ID_INPUT.value;

    createContentMain(contentDefinitionId);
});

UPDATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let contentDefinitionId = UPDATE_CONTENT_DEFINITION_ID_INPUT.value;
    let id = UPDATE_ID_INPUT.value;
    let properties = PROPERTIES_INPUT.value;

    updateContentMain(contentDefinitionId, id, properties);
});

DELETE_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    let contentDefinitionId = DELETE_CONTENT_DEFINITION_ID_INPUT.value;
    let id = DELETE_ID_INPUT.value;

    deleteContentMain(contentDefinitionId, id);
});

async function createContentMain(CONTENT_DEFINITION_ID)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        console.log("Creating content");
        const INFO = await createContent(TOKEN, CONTENT_DEFINITION_ID);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function updateContentMain(CONTENT_DEFINITION_ID, ID, PROPERTIES)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        console.log("Updating Content");
        const INFO = await updateContent(TOKEN, CONTENT_DEFINITION_ID, ID, JSON.parse(PROPERTIES))
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteContentMain(CONTENT_DEFINITION_ID, ID)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        console.log("Deleting Movie");
        const SUCCESS = await deleteContent(TOKEN, CONTENT_DEFINITION_ID, ID);
        if (SUCCESS) console.log("Successfully deleted content");
    }
    catch (error)
    {
        throw new Error(error);
    }
}