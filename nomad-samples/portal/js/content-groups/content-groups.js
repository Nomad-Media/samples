import addContentToContentGroup from "./content-groups/add-content-to-content-group.js";
import createContentGroup from "./content-groups/create-content-group.js";
import deleteContentGroup from "./content-groups/delete-content-group.js";
import getContentGroup from "./content-groups/get-content-group.js";
import getContentGroups from "./content-groups/get-content-groups.js";
import getPortalGroups from "./content-groups/get-potal-groups.js";
import removeContentFromContentGroup from "./content-groups/remove-contents-from-content-group.js";
import renameContentGroup from "./content-groups/rename-content-group.js";

const AUTH_FORM = document.getElementById("authForm");
const GET_GROUP_FORM = document.getElementById("getGroupForm");
const GET_GROUPS_FORM = document.getElementById("getGroupsForm");
const CREATE_FORM = document.getElementById("createForm");
const ADD_FORM = document.getElementById("addForm");
const REMOVE_FORM = document.getElementById("removeForm");
const RENAME_FORM = document.getElementById("renameForm");
const PORTAL_FORM = document.getElementById("portalForm");
const DELETE_FORM = document.getElementById("deleteForm");

const TOKEN_INPUT = document.getElementById("authInput");
const GET_GROUP_ID_INPUT = document.getElementById("getGroupIdInput");
const NAME_INPUT = document.getElementById("nameInput");
const ADD_INPUT = document.getElementById("addInput");
const ADD_CONTENT_INPUT = document.getElementById("addContentInput");
const REMOVE_INPUT = document.getElementById("removeInput");
const REMOVE_CONTENT_INPUT = document.getElementById("removeContentInput");
const RENAME_GROUP_ID_INPUT = document.getElementById("renameInput");
const RENAME_GROUP_INPUT = document.getElementById("renameGroupInput");
const PORTAL_GROUP_INPUT = document.getElementById("portalGroupInput");
const DELETE_INPUT = document.getElementById("deleteInput");

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

GET_GROUP_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let id = GET_GROUP_ID_INPUT.value;

    getContentGroupMain(id);
});

GET_GROUPS_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    getContentGroupsMain();
});

CREATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let name = NAME_INPUT.value;

    createContentGroupMain(name);
});

ADD_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let contentGroup = ADD_INPUT.value;
    let contents = ADD_CONTENT_INPUT.value;

    addContentToContentGroupMain(contentGroup, contents);
});

REMOVE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let contentGroup = REMOVE_INPUT.value;
    let contents = REMOVE_CONTENT_INPUT.value

    removeContentFromContentGroupMain(contentGroup, contents);
});

RENAME_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let contentGroupId = RENAME_GROUP_ID_INPUT.value;
    let renameGroup = RENAME_GROUP_INPUT.value;

    renameContentGroupMain(contentGroupId, renameGroup);
});

PORTAL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let portalGroups = PORTAL_GROUP_INPUT.value;

    getPortalGroupsMain(portalGroups);
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let contentGroup = DELETE_INPUT.value

    deleteContentGroupMain(contentGroup);
});

async function getContentGroupsMain()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Getting content groups");
        const CONTENT_GROUPS = await getContentGroups(sessionStorage.getItem("token"));
        console.log(JSON.stringify(CONTENT_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function getContentGroupMain(ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Getting content group");
        const INFO = await getContentGroup(sessionStorage.getItem("token"), ID)
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function createContentGroupMain(NAME)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Creating content groups");
        const CONTENT_GROUPS = await createContentGroup(sessionStorage.getItem("token"), NAME);
        console.log(JSON.stringify(CONTENT_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function addContentToContentGroupMain(CONTENT_GROUP, CONTENTS)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Adding contents to content group");
        const CONTENT_GROUPS = await addContentToContentGroup(sessionStorage.getItem("token"), CONTENT_GROUP, CONTENTS.split(","));
        console.log(JSON.stringify(CONTENT_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function removeContentFromContentGroupMain(CONTENT_GROUP, CONTENTS)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Removeing content groups");
        const CONTENT_GROUPS = await removeContentFromContentGroup(sessionStorage.getItem("token"), CONTENT_GROUP, CONTENTS.split(","));
        console.log(JSON.stringify(CONTENT_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function renameContentGroupMain(CONTENT_GROUP, NAME)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Renaming content groups");
        const CONTENT_GROUPS = await renameContentGroup(sessionStorage.getItem("token"), CONTENT_GROUP, NAME);
        console.log(JSON.stringify(CONTENT_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function getPortalGroupsMain(PORTAL_GROUPS)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Retrieving portal groups");
        const INFO = await getPortalGroups(sessionStorage.getItem("token"), PORTAL_GROUPS.split(","));
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteContentGroupMain(CONTENT_GROUP)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Deleting content groups");
        const CONTENT_GROUPS = await deleteContentGroup(sessionStorage.getItem("token"), CONTENT_GROUP);
        console.log(JSON.stringify(CONTENT_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

