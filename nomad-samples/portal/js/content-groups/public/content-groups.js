const GET_GROUP_FORM = document.getElementById("getGroupForm");
const GET_GROUPS_FORM = document.getElementById("getGroupsForm");
const CREATE_FORM = document.getElementById("createForm");
const ADD_FORM = document.getElementById("addForm");
const REMOVE_FORM = document.getElementById("removeForm");
const RENAME_FORM = document.getElementById("renameForm");
const SHARE_FORM = document.getElementById("shareForm");
const STOP_SHARING_FORM = document.getElementById("stopSharingForm");
const PORTAL_FORM = document.getElementById("portalForm");
const DELETE_FORM = document.getElementById("deleteForm");

GET_GROUP_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_GROUP_FORM);

    console.log(await sendRequest("/get-group", "POST", FORM_DATA));
});

GET_GROUPS_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    console.log(await sendRequest("/get-groups", "GET"));
});

CREATE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_FORM);

    console.log(await sendRequest("/create-group", "POST", FORM_DATA));
});

ADD_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_FORM);

    console.log(await sendRequest("/add-content", "POST", FORM_DATA));
});

REMOVE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(REMOVE_FORM);

    console.log(await sendRequest("/remove-content", "POST", FORM_DATA));
});

RENAME_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(RENAME_FORM);

    console.log(await sendRequest("/rename-group", "POST", FORM_DATA));
});

SHARE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(SHARE_FORM);

    console.log(await sendRequest("/share-group", "POST", FORM_DATA));
});

STOP_SHARING_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(STOP_SHARING_FORM);

    console.log(await sendRequest("/stop-sharing-group", "POST", FORM_DATA));
});

PORTAL_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(PORTAL_FORM);

    console.log(await sendRequest("/portal", "POST", FORM_DATA));
});

DELETE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_FORM);

    console.log(await sendRequest("/delete-group", "POST", FORM_DATA));
});

function getElements(FORM)
{
    const FORM_DATA = new FormData();
    for (let input of FORM)
    {
        if (input.tagName === "SELECT") {
            const SELECTED_OPTIONS = []
            for (let element of input) {
                if (element.selected) {
                    if (element.value === element.label) {
                        if (input.id) {
                            FORM_DATA.append(input.id, element.value);
                        } else {
                            FORM_DATA.append(input.name, element.value);
                        }
                    } else {
                        SELECTED_OPTIONS.push({ id: element.value, description: element.label });
                    }
                }
            }
            if (SELECTED_OPTIONS.length > 1)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS));
            }
            else if (SELECTED_OPTIONS.length === 1)
            {
                FORM_DATA.append(input.id, JSON.stringify(SELECTED_OPTIONS[0]));
            }
        }
        else if (input.tagName === "INPUT")
        {
            if (input.type === "file") {
                FORM_DATA.append(input.id, input.files[0]);
            } else {
                if (input.id) {
                    FORM_DATA.append(input.id, input.value);
                } else {
                    FORM_DATA.append(input.name, input.value);
                }
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
            if (DATA) return DATA;
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
