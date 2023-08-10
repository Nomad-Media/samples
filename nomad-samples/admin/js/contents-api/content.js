import createContent from "./contents/create-content.js";
import deleteContent from "./contents/delete-content.js";
import getContent from "./contents/get-content.js";
import getContents from "./contents/get-contents.js";
import updateContent from "./contents/update-content.js";


const AUTH_FORM = document.getElementById("authForm");
const GET_CONTENTS_FORM = document.getElementById("getContentsForm");
const GET_CONTENT_FORM = document.getElementById("getContentForm");
const CREATE_FORM = document.getElementById("createForm");
const UPDATE_FORM = document.getElementById("updateForm");
const DELETE_FORM = document.getElementById("deleteForm");

const TOKEN_INPUT = document.getElementById("authInput");
const GET_CONTENTS_CONTENT_DEFINITION_ID_INPUT = document.getElementById("getContentDefinitionIdInput");
const SORT_INPUT = document.getElementById("sortInput");
const SORT_COLUMN_INPUT = document.getElementById("sortColumnInput");
const IS_DESC_INPUT = document.getElementById("isDescInput");
const PAGE_INDEX_INPUT = document.getElementById("pageIndexInput");
const PAGE_SIZE_INPUT = document.getElementById("pageSizeInput");
const LANGUAGE_ID_INPUT = document.getElementById("languageIdInput");
const GET_CONTENT_CONTENT_DEFINITION_ID_INPUT = document.getElementById("getContentContentDefinitionIdInput");
const GET_CONTENT_ID_INPUT = document.getElementById("getContentIdInput");
const IS_REVISION_INPUT = document.getElementById("isRevisionInput");
const CREATE_CONTENT_DEFINITION_ID_INPUT = document.getElementById("createContentDefinitionIdInput");
const UPDATE_CONTENT_DEFINITION_ID_INPUT = document.getElementById("updateContentDefinitionIdInput");
const UPDATE_ID_INPUT = document.getElementById("updateIdInput");
const PROPERTIES_INPUT = document.getElementById("propertiesInput");
const DELETE_CONTENT_DEFINITION_ID_INPUT = document.getElementById("deleteContentDefinitionIdInput");
const DELETE_ID_INPUT = document.getElementById("deleteIdInput");

const SORT_DIV = document.getElementById("sortDiv");
SORT_DIV.hidden = true;

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

SORT_INPUT.addEventListener("change", function (event)
{
    event.preventDefault();

    const SORT = SORT_INPUT.value;

    SORT === "true" ? SORT_DIV.hidden = false : SORT_DIV.hidden = true;
});

GET_CONTENTS_FORM.addEventListener("submit", function (event)
{
    event.preventDefault()

    let contentDefinitionId = GET_CONTENTS_CONTENT_DEFINITION_ID_INPUT.value;
    let sortColumn = SORT_COLUMN_INPUT.value;
    let isDesc = true ? IS_DESC_INPUT.value === "true" : false;
    let pageIndex = PAGE_INDEX_INPUT.value;
    let pageSize = PAGE_SIZE_INPUT.value;
    let languageId = LANGUAGE_ID_INPUT.value;

    getContentsMain(contentDefinitionId, sortColumn, isDesc, pageIndex, pageSize, languageId);
});

GET_CONTENT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let contentDefinitionId = GET_CONTENT_CONTENT_DEFINITION_ID_INPUT.value;
    let id = GET_CONTENT_ID_INPUT.value;
    let isRevision = IS_REVISION_INPUT.value === "true";

    getContentMain(contentDefinitionId, id, isRevision);
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

async function getContentsMain(CONTENT_DEFINITION_ID, SORT_COLUMN, IS_DESC, PAGE_INDEX, PAGE_SIZE, LANGUAGE_ID)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        console.log("Getting content");
        const INFO = await getContents(TOKEN, CONTENT_DEFINITION_ID, SORT_COLUMN, IS_DESC, PAGE_INDEX, PAGE_SIZE, LANGUAGE_ID)
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function getContentMain(CONTENT_DEFINITION_ID, ID, IS_REVISION)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        console.log("Getting content");

        const INFO = await getContent(TOKEN, CONTENT_DEFINITION_ID, ID, IS_REVISION);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

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