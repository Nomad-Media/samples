import login from "./login/login.js";
import addCustomProperties from "./content/add-custom-properties.js";
import addRelatedContent from "./content/add-related-content.js";
import addTagOrCollection from "./content/add-tag-or-collection.js";
import deleteRelatedContent from "./content/delete-related-content.js";
import deleteTagOrCollection from "./content/delete-tag-or-collection.js";

const LOGIN_FORM = document.getElementById("loginForm");
const ADD_TAG_FORM = document.getElementById("addTagOrCollectionForm");
const DELETE_TAG_FORM = document.getElementById("deleteTagOrCollectionForm");
const ADD_RELATED_CONTENT_FORM = document.getElementById("addRelatedContentForm");
const DELETE_RELATED_CONTENT_FORM = document.getElementById("deleteRelatedContentForm");
//const ADD_CUSTOM_PROPERTIES_FORM = document.getElementById("customProperties");
const UPDATE_CONTENT_DEFINITIONS_FORM = document.getElementById("updateContentForm");

const USERNAME_INPUT = document.getElementById("usernameInput");
const PASSWORD_INPUT = document.getElementById("passwordInput");
const ADD_TAG_OR_COLLECTION_INPUT = document.getElementById("addTagOrCollectionInput");
const ADD_TAG_CONTENT_ID_INPUT = document.getElementById("addTagContentIdInput");
const ADD_TAG_TAG_ID_INPUT = document.getElementById("addTagTagIdInput");
const ADD_CONTENT_DEFINITION_INPUT = document.getElementById("addContentDefinitionInput");
const TAG_NAME_INPUT = document.getElementById("tagNameInput");
const CREATE_NEW_INPUT = document.getElementById("createNewInput");
const DELETE_TAG_OR_COLLECTION_INPUT = document.getElementById("deleteTagOrCollectionInput")
const DELETE_TAG_CONTENT_ID_INPUT = document.getElementById("deleteTagContentIdInput");
const DELETE_TAG_TAG_ID_INPUT = document.getElementById("deleteTagTagIdInput");
const DELETE_CONTENT_DEFINITION_INPUT = document.getElementById("deleteContentDefinitionInput");
const ADD_RELATED_CONTENT_ID_INPUT = document.getElementById("addRelatedContentIdInput");
const ADD_RELATED_RELATED_CONTENT_ID_INPUT = document.getElementById("addRelatedRelatedContentIdInput");
const ADD_RELATED_CONTENT_DEFINITION_INPUT = document.getElementById("deleteContentDefinitionInput");
const DELETE_RELATED_CONTENT_ID_INPUT = document.getElementById("deleteRelatedContentIdInput");
const DELETE_RELATED_RELATED_CONTENT_ID_INPUT = document.getElementById("deleteRelatedRelatedContentIdInput");
const DELETE_RELATED_CONTENT_DEFINITION_INPUT = document.getElementById("deleteContentDefinitionInput");
const ASSET_ID_INPUT = document.getElementById("assetIdInput");
const DISPLAY_NAME_INPUT = document.getElementById("nameInput");
const CUSTOM_PROPERTY_NAMES_INPUT = document.getElementById("customPropNameInput");
const CUSTOM_PROPERTIES_INPUT = document.getElementById("customPropInput");

sessionStorage.clear();

LOGIN_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    let username = USERNAME_INPUT.value;
    let password = PASSWORD_INPUT.value;

    loginMain(username, password);
});

ADD_TAG_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let tagOrCollection = ADD_TAG_OR_COLLECTION_INPUT.value
    let contentId = ADD_TAG_CONTENT_ID_INPUT.value;
    let tagId = ADD_TAG_TAG_ID_INPUT.value;
    let contentDefinition = ADD_CONTENT_DEFINITION_INPUT.value;
    let tagName = TAG_NAME_INPUT.value;
    let createNew = (CREATE_NEW_INPUT.value === "true" ? true : false);

    addTagOrCollectionMain(tagOrCollection, contentId, tagId, contentDefinition, tagName, createNew);
});

DELETE_TAG_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    
    let tagOrCollection = DELETE_TAG_OR_COLLECTION_INPUT.value
    let contentId = DELETE_TAG_CONTENT_ID_INPUT.value;
    let tagId = DELETE_TAG_TAG_ID_INPUT.value;
    let contentDefinition = DELETE_CONTENT_DEFINITION_INPUT.value;

    deleteTagOrCollectionMain(tagOrCollection, contentId, tagId, contentDefinition);
});

ADD_RELATED_CONTENT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let contentId = ADD_RELATED_CONTENT_ID_INPUT.value;
    let relatedContentId = ADD_RELATED_RELATED_CONTENT_ID_INPUT.value;
    let contentDefinition = ADD_RELATED_CONTENT_DEFINITION_INPUT.value;
    
    addRelatedContentMain(contentId, relatedContentId, contentDefinition);
});

DELETE_RELATED_CONTENT_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let contentId = DELETE_RELATED_CONTENT_ID_INPUT.value;
    let relatedContentId = DELETE_RELATED_RELATED_CONTENT_ID_INPUT.value;
    let contentDefinition = DELETE_RELATED_CONTENT_DEFINITION_INPUT.value;
    
    deleteRelatedContentMain(contentId, relatedContentId, contentDefinition);
});

/*ADD_CUSTOM_PROPERTIES_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let assetId = ASSET_ID_INPUT.value;
    let name = DISPLAY_NAME_INPUT.value;
    let customPropertyNames = CUSTOM_PROPERTY_NAMES_INPUT.value;
    let customProperties = CUSTOM_PROPERTIES_INPUT.value;

    customPropertiesMain(assetId, name, customPropertyNames, customProperties);
});*/

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

async function addTagOrCollectionMain(TAG_OR_COLLECTION, CONTENT_ID, TAG_ID, CONTENT_DEFINITION, TAG_NAME, CREATE_NEW)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log(`Adding ${TAG_OR_COLLECTION}`);
        const INFO = await addTagOrCollection(sessionStorage.getItem("token"), TAG_OR_COLLECTION, CONTENT_ID, TAG_ID, CONTENT_DEFINITION, TAG_NAME, CREATE_NEW);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteTagOrCollectionMain(TAG_OR_COLLECTION, CONTENT_ID, TAG_ID, CONTENT_DEFINITION)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log(`Deleting ${TAG_OR_COLLECTION}`);
        
        const INFO = await deleteTagOrCollection(sessionStorage.getItem("token"), TAG_OR_COLLECTION, CONTENT_ID, TAG_ID, CONTENT_DEFINITION);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function addRelatedContentMain(CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Adding related content");
        const INFO = await addRelatedContent(sessionStorage.getItem("token"), CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteRelatedContentMain(CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Deleting related content");
        const INFO = await deleteRelatedContent(sessionStorage.getItem("token"), CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

/*async function customPropertiesMain(ID, NAME, CUSTOM_PROPERTY_NAMES, CUSTOM_PROPERTIES)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    const CUSTOM_PROPERTY_NAMES_ARRAY = CUSTOM_PROPERTY_NAMES.split(",");
    const CUSTOM_PROPERTIES_ARRAY = CUSTOM_PROPERTIES.split(",");
    if (CUSTOM_PROPERTY_NAMES_ARRAY.length != CUSTOM_PROPERTIES_ARRAY.length)
    {
        throw new Error("Custom Properties: The number of custom property names and the number of custom properties do not match");
    }

    try
    {
        console.log("Adding custom properties");
        const INFO = await addCustomProperties(sessionStorage.getItem("token"), ID, NAME, CUSTOM_PROPERTY_NAMES_ARRAY, CUSTOM_PROPERTIES_ARRAY);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}*/

