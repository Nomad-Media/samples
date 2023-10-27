const GET_GROUP_FORM = document.getElementById("getGroupForm");
const GET_GROUPS_FORM = document.getElementById("getGroupsForm");
const CREATE_FORM = document.getElementById("createForm");
const ADD_FORM = document.getElementById("addForm");
const REMOVE_FORM = document.getElementById("removeForm");
const RENAME_FORM = document.getElementById("renameForm");
const SHARE_FORM = document.getElementById("shareForm");
const STOP_SHARE_FORM = document.getElementById("stopShareForm");
const DELETE_FORM = document.getElementById("deleteForm");

GET_GROUP_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_GROUP_FORM);

    await sendRequest("/get-movie-group", "POST", FORM_DATA);
});

GET_GROUPS_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    
    await sendRequest("/get-movie-groups", "GET");
});

CREATE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_FORM);

    await sendRequest("/create-movie-group", "POST", FORM_DATA);
});

ADD_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_FORM);

    await sendRequest("/add-movie-to-movie-group", "POST", FORM_DATA);
});

REMOVE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(REMOVE_FORM);

    await sendRequest("/remove-movie-from-movie-group", "POST", FORM_DATA);
});

RENAME_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(RENAME_FORM);

    await sendRequest("/rename-movie-group", "POST", FORM_DATA);
});

SHARE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(SHARE_FORM);

    await sendRequest("/share-movie-group", "POST", FORM_DATA);
});

STOP_SHARE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(STOP_SHARE_FORM);

    await sendRequest("/stop-sharing-movie-group", "POST", FORM_DATA);
});

DELETE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_FORM);

    await sendRequest("/delete-movie-group", "POST", FORM_DATA);
});

function getElements(FORM)
{
    const FORM_DATA = new FormData();
    for (let input of FORM)
    {
        if (input.tagName === "INPUT" || input.tagName === "SELECT")
        {
            if (input.type !== "checkbox" || input.type === "checkbox" && input.checked)
            {
                input.id ? FORM_DATA.append(input.id, input.value) : FORM_DATA.append(input.name, input.value);
            }
        }
    }
    return FORM_DATA;
}

async function sendRequest(PATH, METHOD, BODY)
{
    try
    {
        const REQUEST = { method: METHOD };
        if (BODY) REQUEST["body"] = BODY;
        const RESPONSE = await fetch(PATH, REQUEST);

        if (RESPONSE.ok)
        {
            const DATA = await RESPONSE.json();
            console.log(DATA);
        }
        else
        {
            const INFO = await RESPONSE.json();
            console.error(JSON.stringify(INFO, null, 4));
            console.error("HTTP-Error: " + RESPONSE.status);
        }
    }
    catch (error)
    {
        console.error(error);
    }
}

