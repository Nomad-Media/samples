const PING_FORM = document.getElementById("pingForm");
const AUTH_PING_FORM = document.getElementById("authPingForm");

PING_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    console.log(await sendRequest("/ping", "GET"));
});

AUTH_PING_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    console.log(await sendRequest("/auth-ping", "GET"));
});

async function sendRequest(PATH, METHOD)
{
    try
    {
        const REQUEST = { method: METHOD };
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