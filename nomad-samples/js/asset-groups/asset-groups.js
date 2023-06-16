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
const ADD_INPUT = document.getElementById("addInput");
const ADD_ASSET_INPUT = document.getElementById("addAssetInput");
const REMOVE_INPUT = document.getElementById("removeInput");
const REMOVE_ASSET_INPUT = document.getElementById("removeAssetInput");
const RENAME_INPUT = document.getElementById("renameInput");
const DELETE_INPUT = document.getElementById("deleteInput");

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

    let assetGroup = ADD_INPUT.value;
    let assets = ADD_ASSET_INPUT.value;

    addForm(assetGroup, assets);
});

REMOVE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let assetGroup = REMOVE_INPUT.value;
    let assets = REMOVE_ASSET_INPUT.value

    removeForm(assetGroup, assets);
});

RENAME_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let assetGroup = RENAME_INPUT.value;

    renameForm(assetGroup);
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let assetGroup = DELETE_INPUT.value

    deleteForm(assetGroup);
});

async function getForm()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
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
        throw new Error("Authentication token: The authentication token is empty");
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

async function addForm(ASSET_GROUP, ASSETS)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Adding assets to asset group");
        const ASSET_GROUPS = await addAssetToAssetGroup(sessionStorage.getItem("token"), ASSET_GROUP, ASSETS.split(","));
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function removeForm(ASSET_GROUP, ASSETS)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Removeing asset groups");
        const ASSET_GROUPS = await removeAssetFromAssetGroup(sessionStorage.getItem("token"), ASSET_GROUP, ASSETS.split(","));
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function renameForm(ASSET_GROUP)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Renaming asset groups");
        const ASSET_GROUPS = await renameAssetGroup(sessionStorage.getItem("token"), ASSET_GROUP);
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function deleteForm(ASSET_GROUP)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Deleting asset groups");
        const ASSET_GROUPS = await deleteAssetGroup(sessionStorage.getItem("token"), ASSET_GROUP);
        console.log(JSON.stringify(ASSET_GROUPS, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

