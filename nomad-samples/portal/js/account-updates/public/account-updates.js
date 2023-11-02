const UPDATE_FORM = document.getElementById("updateForm");
const EMAIL_FORM = document.getElementById("changeEmailForm");
const PASSWORD_FORM = document.getElementById("changePassForm");

const COUNTRY = document.getElementById("country");
const STATE = document.getElementById("state");

async function getOptions()
{
    const OPTIONS = await sendRequest("/get-info", "GET");

    const COUNTRIES = OPTIONS[5].children;
    const STATES = OPTIONS[6].children;
    
    for (let countryIdx = 0; countryIdx < COUNTRIES.length; ++countryIdx)
    {
        let option = document.createElement("option");
        option.value = COUNTRIES[countryIdx].label;
        option.text = COUNTRIES[countryIdx].label;
        COUNTRY.appendChild(option);
    }

    for (let stateIdx = 0; stateIdx < STATES.length; ++stateIdx)
    {
        let option = document.createElement("option");
        option.value = STATES[stateIdx].label;
        option.text = STATES[stateIdx].label;
        STATE.appendChild(option);
    }
}
await getOptions();

UPDATE_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    
    const FORM_DATA = getElements(UPDATE_FORM);

    console.log(await sendRequest("/update-user", "POST", FORM_DATA));
});

EMAIL_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    
    const FORM_DATA = getElements(EMAIL_FORM);

    console.log(await sendRequest("/change-email", "POST", FORM_DATA));
});

PASSWORD_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    
    const FORM_DATA = getElements(PASSWORD_FORM);

    console.log(await sendRequest("/change-password", "POST", FORM_DATA));
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