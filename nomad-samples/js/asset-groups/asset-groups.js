import addAssetToAssetGroup from "./asset-groups/add-asset-to-asset-group.js";
import createAssetGroup from "./asset-groups/create-asset-group.js";
import deleteAssetGroup from "./asset-groups/delete-asset-group.js";
import getAssetGroups from "./asset-groups/get-asset-groups.js";
import removeAssetFromAssetGroup from "./asset-groups/remove-assets-from-asset-group.js";
import renameAssetGroup from "./asset-groups/rename-asset-group.js";

const AUTH_FORM = document.getElementById("authForm");
const GET_FORM = document.getElementById("getForm");
const CREATE_FORM = document.getElementById("createForm");
const ADD_FORM = document.getElementById("addForm");
const REMOVE_FORM = document.getElementById("removeForm");
const RENAME_FORM = document.getElementById("renameForm");
const DELETE_FORM = document.getElementById("deleteForm");

const TOKEN_INPUT = document.getElementById("authInput");

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

GET_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    getForm();
});

CREATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    createForm();
});

ADD_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    addForm();
});

REMOVE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    removeForm();
});

RENAME_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    renameForm();
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    deleteForm();
});

async function getForm()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    try
    {
        console.log("Getting asset groups");
        const ASSET_GROUPS = await getAssetGroups(sessionStorage.getItem("token"));
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function createForm()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    try
    {
        console.log("Creating asset groups");
        const ASSET_GROUPS = await createAssetGroup(sessionStorage.getItem("token"));
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function addForm()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    try
    {
        console.log("Adding asset groups");
        const ASSET_GROUPS = await addAssetToAssetGroup(sessionStorage.getItem("token"));
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function removeForm()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    try
    {
        console.log("Removeing asset groups");
        const ASSET_GROUPS = await removeAssetFromAssetGroup(sessionStorage.getItem("token"));
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function renameForm()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    try
    {
        console.log("Renaming asset groups");
        const ASSET_GROUPS = await renameAssetGroup(sessionStorage.getItem("token"));
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteForm()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    try
    {
        console.log("Deleting asset groups");
        const ASSET_GROUPS = await deleteAssetGroup(sessionStorage.getItem("token"));
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

