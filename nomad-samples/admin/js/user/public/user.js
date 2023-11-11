const DELETE_USER_FORM = document.getElementById("deleteUserForm");
const DELETE_USER_DATA_FORM = document.getElementById("deleteUserDataForm");
const DELETE_USER_CONTENT_ATTRIBUTE_DATA_FORM = document.getElementById("deleteUserContentAttributeDataForm");
const DELETE_USER_CONTENT_GROUP_DATA_FORM = document.getElementById("deleteUserContentGroupDataForm");
const DELETE_USER_DISLIKES_DATA_FORM = document.getElementById("deleteUserDislikesDataForm");
const DELETE_USER_LIKES_DATA_FORM = document.getElementById("deleteUserLikesDataForm");
const DELETE_USER_FAVORITES_DATA_FORM = document.getElementById("deleteUserFavoritesDataForm");
const DELETE_USER_SAVED_SEARCH_DATA_FORM = document.getElementById("deleteUserSavedSearchDataForm");
const DELETE_USER_SESSION_DATA_FORM = document.getElementById("deleteUserSessionDataForm");
const DELETE_USER_CONTENT_SECURITY_DATA_FORM = document.getElementById("deleteUserContentSecurityDataForm");
const DELETE_USER_VIDEO_TRACKING_DATA_FORM = document.getElementById("deleteUserVideoTrackingDataForm");

DELETE_USER_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/delete-user", "DELETE");
});

DELETE_USER_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/delete-user-data", "DELETE");
});

DELETE_USER_CONTENT_ATTRIBUTE_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/delete-user-content-attribute-data", "DELETE");
});

DELETE_USER_CONTENT_GROUP_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/delete-user-content-group-data", "DELETE");
});

DELETE_USER_DISLIKES_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/delete-user-dislikes-data", "DELETE");
});

DELETE_USER_LIKES_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/delete-user-likes-data", "DELETE");
});

DELETE_USER_FAVORITES_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/delete-user-favorites-data", "DELETE");
});

DELETE_USER_SAVED_SEARCH_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/delete-user-saved-search-data", "DELETE");
});

DELETE_USER_SESSION_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/delete-user-session-data", "DELETE");
});

DELETE_USER_CONTENT_SECURITY_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const USER_DATA = getElements(DELETE_USER_CONTENT_SECURITY_DATA_FORM);

    await sendRequest("/delete-user-content-security-data", "POST", USER_DATA);
});

DELETE_USER_VIDEO_TRACKING_DATA_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const USER_DATA = getElements(DELETE_USER_VIDEO_TRACKING_DATA_FORM);

    await sendRequest("/delete-user-video-tracking-data", "POST", USER_DATA);
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