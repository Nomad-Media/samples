const GET_CONFIG_FORM = document.getElementById("getConfigForm");
const GET_SERVER_TIME_FORM = document.getElementById("getServerTimeForm");
const CLEAR_SERVER_CACHE_FORM = document.getElementById("clearServerCacheForm");

GET_CONFIG_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_CONFIG_FORM);

    console.log(await sendRequest("/get-config", "POST", FORM_DATA));
});

GET_SERVER_TIME_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    console.log(await sendRequest("/get-server-time", "GET"));
});

CLEAR_SERVER_CACHE_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    console.log(await sendRequest("/clear-server-cache", "GET"));
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