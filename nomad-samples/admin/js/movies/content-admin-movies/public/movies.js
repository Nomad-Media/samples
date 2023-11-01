const ADD_TAG_FORM = document.getElementById("addTagOrCollectionForm");
const REMOVE_TAG_FORM = document.getElementById("removeTagOrCollectionForm");
const DELETE_TAG_FORM = document.getElementById("deleteTagOrCollectionForm");
const ADD_RELATED_CONTENT_FORM = document.getElementById("addRelatedContentForm");
const DELETE_RELATED_CONTENT_FORM = document.getElementById("deleteRelatedContentForm");
const ADD_CUSTOM_PROPERTIES_FORM = document.getElementById("addCustomProperties");

const ADD_TAG_OR_COLLECTION = document.getElementById("addTagOrCollection");
const ADD_TAG_NAME_LABEL = document.getElementById("addTagNameLabel");
const CREATE_NEW = document.getElementById("createNew");
const ADD_TAG_ID_LABEL = document.getElementById("addTagIdLabel");
const REMOVE_TAG_OR_COLLECTION = document.getElementById("removeTagOrCollection");
const REMOVE_TAG_ID_LABEL = document.getElementById("removeTagIdLabel");
const DELETE_TAG_OR_COLLECTION = document.getElementById("deleteTagOrCollection");
const DELETE_TAG_ID_LABEL = document.getElementById("deleteTagIdLabel");

const TAG_ID_DIV = document.getElementById("tagIdDiv");

ADD_TAG_OR_COLLECTION.addEventListener("change", async function (event)
{
    event.preventDefault();
    
    ADD_TAG_OR_COLLECTION.value === "tag" ? ADD_TAG_NAME_LABEL.textContent = "Tag Name:" : ADD_TAG_NAME_LABEL.textContent = "Collection Name:";

    ADD_TAG_OR_COLLECTION.value === "tag" ? ADD_TAG_ID_LABEL.textContent = "Tag Id:" : ADD_TAG_ID_LABEL.textContent = "Collection Id:";
});

CREATE_NEW.addEventListener("change", async function (event)
{
    event.preventDefault();

    CREATE_NEW.value === "true" ? TAG_ID_DIV.hidden = true : TAG_ID_DIV.hidden = false; 
});

ADD_TAG_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_TAG_FORM);

    await sendRequest("/add-tag-or-collection", "POST", FORM_DATA);
});

REMOVE_TAG_OR_COLLECTION.addEventListener("change", async function (event)
{
    event.preventDefault();
    
    REMOVE_TAG_OR_COLLECTION.value === "tag" ? REMOVE_TAG_ID_LABEL.textContent = "Tag Id:" : REMOVE_TAG_ID_LABEL.textContent = "Collection Id:";
});

REMOVE_TAG_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(REMOVE_TAG_FORM);

    await sendRequest("/remove-tag-or-collection", "POST", FORM_DATA);
});

DELETE_TAG_OR_COLLECTION.addEventListener("change", async function (event)
{
    event.preventDefault();

    DELETE_TAG_OR_COLLECTION.value === "tag" ? DELETE_TAG_ID_LABEL.textContent = "Tag Id:" : DELETE_TAG_ID_LABEL.textContent = "Collection Id:";
});

DELETE_TAG_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    
    const FORM_DATA = getElements(DELETE_TAG_FORM);

    await sendRequest("/delete-tag-or-collection", "POST", FORM_DATA);
});

ADD_RELATED_CONTENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_RELATED_CONTENT_FORM);

    await sendRequest("/add-related-content", "POST", FORM_DATA);
});

DELETE_RELATED_CONTENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_RELATED_CONTENT_FORM);

    await sendRequest("/delete-related-content", "POST", FORM_DATA);
});

ADD_CUSTOM_PROPERTIES_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_CUSTOM_PROPERTIES_FORM);

    await sendRequest("/add-custom-properties", "POST", FORM_DATA);
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