const CREATE_FORM = document.getElementById("createForm");
const SYNC_FORM = document.getElementById("syncForm");
const DELETE_FORM = document.getElementById("deleteForm");

const TYPE_SELECT = document.getElementById("typeSelect");
const GENRE_SELECT = document.getElementById("genreSelect");
const GENRE_INPUT = document.getElementById("genreInput");
const PERFORMER_SELECT = document.getElementById("performerSelect");
const PERFORMER_INPUT = document.getElementById("performer");
const TAG_SELECT = document.getElementById("tagSelect");
const TAG_INPUT = document.getElementById("tag");
const RATING_SELECT = document.getElementById("ratingSelect");

const UPDATE_ID_DIV = document.getElementById("updateIdDiv");
const GENRE_DIV = document.getElementById("genreDiv");
const TAG_DIV = document.getElementById("tagDiv");
const PERFORMER_DIV = document.getElementById("performerDiv");
const RATING_DIV = document.getElementById("ratingDiv");

TYPE_SELECT.addEventListener("change", async function (event)
{
    event.preventDefault();

    TYPE_SELECT.value === "create" ? UPDATE_ID_DIV.hidden = true : UPDATE_ID_DIV.hidden = false;
});

await getGenreList();

async function getGenreList()
{
    const GENRE_LIST = await sendRequest("/get-genre-list", "POST");

    for(let genreIdx = 0; genreIdx < GENRE_LIST.length; ++genreIdx)
    {
        let option = document.createElement("option");
        option.value = GENRE_LIST[genreIdx].id;
        option.text = GENRE_LIST[genreIdx].title;
        GENRE_SELECT.appendChild(option);
    }

    $(GENRE_SELECT).select2();
    return GENRE_LIST;
}

await getPerformerList();

async function getPerformerList()
{
    const PERFORMER_LIST = await sendRequest("/get-performer-list", "POST");

    for(let performerIdx = 0; performerIdx < PERFORMER_LIST.length; ++performerIdx)
    {
        let option = document.createElement("option");
        option.value = PERFORMER_LIST[performerIdx].id;
        option.text = PERFORMER_LIST[performerIdx].title;
        PERFORMER_SELECT.appendChild(option);
    }

    $(PERFORMER_SELECT).select2();
    return PERFORMER_LIST;
}

await getTagList();

async function getTagList()
{
    const TAG_LIST = await sendRequest("/get-tag-list", "POST");

    for(let tagIdx = 0; tagIdx < TAG_LIST.length; ++tagIdx)
    {
        let option = document.createElement("option");
        option.value = TAG_LIST[tagIdx].id;
        option.text = TAG_LIST[tagIdx].title;
        TAG_SELECT.appendChild(option);
    }

    $(TAG_SELECT).select2();
    return TAG_LIST;
}

await getRatingList();

async function getRatingList()
{
    const RATING_LIST = await sendRequest("/get-rating-list", "POST");
    for(let ratingIdx = 0; ratingIdx < RATING_LIST.length; ++ratingIdx)
    {
        let option = document.createElement("option");
        option.value = RATING_LIST[ratingIdx].id;
        option.text = RATING_LIST[ratingIdx].title;
        RATING_SELECT.appendChild(option);
    }

    $(RATING_SELECT).select2();
    return RATING_LIST;
}

CREATE_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_FORM);

    await sendRequest("/create-movie", "POST", FORM_DATA);
});


SYNC_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(SYNC_FORM);

    await sendRequest("/sync", "POST", FORM_DATA);
});

DELETE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_FORM);

    await sendRequest("/delete", "DELETE", FORM_DATA);
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
                        FORM_DATA.append(input.id, element.value);
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
                FORM_DATA.append(input.id, input.value);
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
