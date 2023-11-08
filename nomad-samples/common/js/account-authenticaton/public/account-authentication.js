const LOGIN_FORM = document.getElementById("loginForm");
const REFRESH_TOKEN_FORM = document.getElementById("refreshTokenForm");
const FORGOT_PASS_FORM = document.getElementById("forgotPasswordForm");
const RESET_PASS_FORM = document.getElementById("resetPasswordForm");
const LOGOUT_FORM = document.getElementById("logoutForm");

LOGIN_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/login", "GET");
});

REFRESH_TOKEN_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    await sendRequest("/refresh-token", "GET");
});

FORGOT_PASS_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    
    const FORM_DATA = getElements(FORGOT_PASS_FORM);

    await sendRequest("/forgot-password", "POST", FORM_DATA);
});

RESET_PASS_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    
    const FORM_DATA = getElements(RESET_PASS_FORM);

    await sendRequest("/reset-password", "POST", FORM_DATA);
});

LOGOUT_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    
    const FORM_DATA = getElements(LOGOUT_FORM);

    await sendRequest("/logout", "POST", FORM_DATA);
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
            if (DATA) console.log(DATA);
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