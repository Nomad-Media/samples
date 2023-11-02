const INVITE_FORM = document.getElementById("inviteForm");
const REMOVE_INVITE_FORM = document.getElementById("removeInviteForm");
const REGISTER_FORM = document.getElementById("registerForm");
const PING_FORM = document.getElementById("pingForm");
const PPQ_FORM = document.getElementById("ppqForm");

INVITE_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();

    const FORM_DATA = getElements(INVITE_FORM);

    console.log(await sendRequest("/invite", "POST", FORM_DATA));
});

REMOVE_INVITE_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();

    const FORM_DATA = getElements(REMOVE_INVITE_FORM);

    console.log(await sendRequest("/remove-invite", "POST", FORM_DATA));
});

REGISTER_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    
    const FORM_DATA = getElements(REGISTER_FORM);

    console.log(await sendRequest("/register", "POST", FORM_DATA));
});

PING_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();

    console.log(await sendRequest("/ping", "GET",));
});

PPQ_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();

    console.log(await sendRequest("/ppq", "GET"));
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
            console.log(DATA);
            return DATA;
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