const GET_CONTENT_FORM = document.getElementById("getContentForm");
const CREATE_FORM = document.getElementById("createForm");
const UPDATE_FORM = document.getElementById("updateForm");
const DEACTIVATE_FORM = document.getElementById("deactivateForm");
const GET_CONTENT_USER_TRACK_FORM = document.getElementById("getContentUserTrackForm");
const GET_CONTENT_USER_TRACK_TOUCH_FORM = document.getElementById("getContentUserTrackTouchForm");
const DELETE_FORM = document.getElementById("deleteForm");

GET_CONTENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_CONTENT_FORM);

    await sendRequest("/get-content", "POST", FORM_DATA);
});

CREATE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_FORM);

    await sendRequest("/create-content", "POST", FORM_DATA);
});

UPDATE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_FORM);

    await sendRequest("/update-content", "POST", FORM_DATA);
});

DEACTIVATE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DEACTIVATE_FORM);

    await sendRequest("/deactivate-content", "POST", FORM_DATA);
});

GET_CONTENT_USER_TRACK_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_CONTENT_USER_TRACK_FORM);

    await sendRequest("/get-content-user-track", "POST", FORM_DATA);
});

GET_CONTENT_USER_TRACK_TOUCH_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_CONTENT_USER_TRACK_TOUCH_FORM);

    await sendRequest("/get-content-user-track-touch", "POST", FORM_DATA);
});

DELETE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_FORM);

    await sendRequest("/delete-content", "POST", FORM_DATA);
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