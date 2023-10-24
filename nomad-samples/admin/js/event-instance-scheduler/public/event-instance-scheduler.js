const CREATE_FORM = document.getElementById("createForm");
const DELETE_FORM = document.getElementById("deleteForm");

const IS_RECURRING = document.getElementById("isRecurring");
const IS_EXISTING_SERIES = document.getElementById("isExistingSeries");
const OVERRIDE_SERIES_DETAILS = document.getElementById("overrideSeriesDetails");

const IS_RECURRING_DIV = document.getElementById("isRecurringDiv");
const IS_NOT_RECURRING_DIV = document.getElementById("isNotRecurringDiv");
const IS_SERIES_DIV = document.getElementById("isSeriesDiv");
const IS_NOT_SERIES_DIV = document.getElementById("isNotSeriesDiv");

IS_RECURRING_DIV.hidden = true;
IS_NOT_RECURRING_DIV.hidden = false;

IS_RECURRING.addEventListener("change", function(event)
{
    event.preventDefault();

    const RECURRING = IS_RECURRING.value

    if (RECURRING === "true") 
    {
        IS_RECURRING_DIV.hidden = false;
        IS_NOT_RECURRING_DIV.hidden = true;
    }
    else
    {
        IS_RECURRING_DIV.hidden = true;
        IS_NOT_RECURRING_DIV.hidden = false;
    }
});

IS_SERIES_DIV.hidden = true;
IS_NOT_SERIES_DIV.hidden = false;

IS_EXISTING_SERIES.addEventListener("change", function(event)
{
    event.preventDefault();

    const SERIES = IS_EXISTING_SERIES.value;

    if (SERIES === "no") 
    {
        IS_SERIES_DIV.hidden = true;
        IS_NOT_SERIES_DIV.hidden = false;
    }
    else
    {
        IS_SERIES_DIV.hidden = false;
        IS_NOT_SERIES_DIV.hidden = true;
    }
});

IS_NOT_SERIES_DIV.hidden = false

OVERRIDE_SERIES_DETAILS.addEventListener("change", function(event)
{
    event.preventDefault();

    OVERRIDE_SERIES_DETAILS.value === "true" ? IS_NOT_SERIES_DIV.hidden = false : IS_NOT_SERIES_DIV.hidden = true;

});

CREATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_FORM);

    sendRequest("/create-event-instance", "POST", FORM_DATA);
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_FORM);

    sendRequest("/delete-event-instance", "POST", FORM_DATA);
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