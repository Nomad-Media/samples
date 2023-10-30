const CREATE_FORM = document.getElementById("createForm");
const SEARCH_MOVIES_FORM = document.getElementById("searchMoviesForm");
const DELETE_MOVIE_FORM = document.getElementById("deleteMovieForm");

const TYPE_SELECT = document.getElementById("typeSelect");
const GENRE_SELECT = document.getElementById("genreSelect");
const GENRE_INPUT = document.getElementById("genre");
const PERFORMER_SELECT = document.getElementById("performerSelect");
const PERFORMER_INPUT = document.getElementById("performer");
const TAG_SELECT = document.getElementById("tagSelect");
const TAG_INPUT = document.getElementById("tag");
const RATING_SELECT = document.getElementById("ratingSelect");
const FILTERS_DIV = document.getElementById("filtersDiv");
const ADD_FILTER_BUTTON = document.getElementById("addFilterButton");
const SORT_FIELDS_DIV = document.getElementById("sortFieldsDiv");
const ADD_SORT_FIELDS_BUTTON = document.getElementById("addSortFieldsButton");

const UPDATE_ID_DIV = document.getElementById("updateIdDiv");
const GENRE_DIV = document.getElementById("genreDiv");
const TAG_DIV = document.getElementById("tagDiv");
const PERFORMER_DIV = document.getElementById("performerDiv");
const RATING_DIV = document.getElementById("ratingDiv");

TYPE_SELECT.addEventListener("change", function (event)
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

CREATE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_FORM);

    sendRequest("/create-movie", "POST", FORM_DATA);
});

ADD_FILTER_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();

    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "fieldName");
    fieldNameLabel.textContent = "Field Name:";

    let fieldName = document.createElement("input");
    fieldName.setAttribute("type", "text");
    fieldName.setAttribute("name", "fieldName");
    fieldName.required = true;

    let operationLabel = document.createElement('label');
    operationLabel.setAttribute("for", "operator");
    operationLabel.textContent = "Operator:";

    let operator = document.createElement("input");
    operator.setAttribute("type", "text");
    operator.setAttribute("name", "operator");
    operator.required = true;

    let valueLabel = document.createElement('label');
    valueLabel.setAttribute("for", "value");
    valueLabel.textContent = "Value:";

    let value = document.createElement("input");
    value.setAttribute("type", "text");
    value.setAttribute("name", "value");
    value.required = true;

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Filter";
    removeButton.addEventListener("click", function(event) {
        event.preventDefault();
        FILTERS_DIV.removeChild(br1);
        FILTERS_DIV.removeChild(br2);
        FILTERS_DIV.removeChild(fieldNameLabel);
        FILTERS_DIV.removeChild(fieldName);
        FILTERS_DIV.removeChild(operationLabel);
        FILTERS_DIV.removeChild(operator);
        FILTERS_DIV.removeChild(valueLabel);
        FILTERS_DIV.removeChild(value);
        FILTERS_DIV.removeChild(removeButton);
    });

    FILTERS_DIV.appendChild(fieldNameLabel);
    FILTERS_DIV.appendChild(fieldName);
    FILTERS_DIV.appendChild(operationLabel);
    FILTERS_DIV.appendChild(operator);
    FILTERS_DIV.appendChild(valueLabel);
    FILTERS_DIV.appendChild(value);

    FILTERS_DIV.appendChild(br1);
    FILTERS_DIV.appendChild(br2);

    FILTERS_DIV.appendChild(removeButton);
});

ADD_SORT_FIELDS_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();

    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "sortFieldName");
    fieldNameLabel.textContent = "Field Name:";

    let fieldName = document.createElement("input");
    fieldName.setAttribute("type", "text");
    fieldName.setAttribute("name", "sortFieldName");
    fieldName.required = true;

    let sortTypeLabel = document.createElement('label');
    sortTypeLabel.setAttribute("for", "sortType");
    sortTypeLabel.textContent = "Sort Type:";

    let sortType = document.createElement("select");
    sortType.setAttribute("name", "sortType");
    sortType.required = true;

    let ascendingOption = document.createElement("option");
    ascendingOption.value = "Ascending";
    ascendingOption.text = "Ascending";
    sortType.appendChild(ascendingOption);

    let descendingOption = document.createElement("option");
    descendingOption.value = "Descending";
    descendingOption.text = "Descending";
    sortType.appendChild(descendingOption);

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Sort Field";
    removeButton.addEventListener("click", function(event) {
        event.preventDefault();
        SORT_FIELDS_DIV.removeChild(br1);
        SORT_FIELDS_DIV.removeChild(br2);
        SORT_FIELDS_DIV.removeChild(fieldNameLabel);
        SORT_FIELDS_DIV.removeChild(fieldName);
        SORT_FIELDS_DIV.removeChild(sortTypeLabel);
        SORT_FIELDS_DIV.removeChild(sortType);
        SORT_FIELDS_DIV.removeChild(removeButton);
    });

    SORT_FIELDS_DIV.appendChild(fieldNameLabel);
    SORT_FIELDS_DIV.appendChild(fieldName);
    SORT_FIELDS_DIV.appendChild(sortTypeLabel);
    SORT_FIELDS_DIV.appendChild(sortType);

    SORT_FIELDS_DIV.appendChild(br1);
    SORT_FIELDS_DIV.appendChild(br2);

    SORT_FIELDS_DIV.appendChild(removeButton);
});

SEARCH_MOVIES_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(SEARCH_MOVIES_FORM);

    sendRequest("/search-movies", "POST", FORM_DATA);
});

DELETE_MOVIE_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_MOVIE_FORM);

    sendRequest("/delete-movie", "POST", FORM_DATA);
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