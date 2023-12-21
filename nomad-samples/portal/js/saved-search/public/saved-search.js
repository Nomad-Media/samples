const ADD_SAVED_SEARCH_FORM = document.getElementById("addSavedSearchFrom");
const DELETE_SAVED_SEARCH_FORM = document.getElementById("deleteSavedSearchForm");
const GET_SAVED_SEARCH_FORM = document.getElementById("getSavedSearchForm");
const GET_SAVED_SEARCHES_FORM = document.getElementById("getSavedSearchesForm");
const PATCH_SAVED_SEARCH_FORM = document.getElementById("patchSavedSearchForm");
const UPDATE_SAVED_SEARCH_FORM = document.getElementById("updateSavedSearchForm");
const GET_SEARCH_SAVED_FORM = document.getElementById("getSearchSavedForm");
const GET_SEARCH_SAVED_BY_ID_FORM = document.getElementById("getSearchSavedByIdForm");

const ADD_FILTERS_DIV = document.getElementById("addFiltersDiv");
const ADD_SORT_FIELDS_DIV = document.getElementById("addSortFieldsDiv");
const ADD_SEARCH_RESULT_FIELDS_DIV = document.getElementById("addSearchResultFieldsDiv");
const UPDATE_FILTERS_DIV = document.getElementById("updateFiltersDiv");
const UPDATE_SORT_FIELDS_DIV = document.getElementById("updateSortFieldsDiv");
const UPDATE_SEARCH_RESULT_FIELDS_DIV = document.getElementById("updateSearchResultFieldsDiv");
const GET_FILTERS_DIV = document.getElementById("getFiltersDiv");
const GET_SORT_FIELDS_DIV = document.getElementById("getSortFieldsDiv");
const GET_SEARCH_RESULT_FIELDS_DIV = document.getElementById("getSearchResultFieldsDiv");

const ADD_ADD_FILTER_BUTTON = document.getElementById("addAddFilterButton");
const ADD_ADD_SORT_FIELD_BUTTON = document.getElementById("addAddSortFieldButton");
const ADD_ADD_SEARCH_RESULT_FIELDS_BUTTON = document.getElementById("addAddSearchResultFieldsButton");
const UPDATE_ADD_FILTER_BUTTON = document.getElementById("updateAddFilterButton");
const UPDATE_ADD_SORT_FIELD_BUTTON = document.getElementById("updateAddSortFieldButton");
const UPDATE_ADD_SEARCH_RESULT_FIELDS_BUTTON = document.getElementById("updateAddSearchResultFieldsButton");
const GET_ADD_FILTER_BUTTON = document.getElementById("getAddFilterButton");
const GET_ADD_SORT_FIELD_BUTTON = document.getElementById("getAddSortFieldButton");
const GET_ADD_SEARCH_RESULT_FIELDS_BUTTON = document.getElementById("getAddSearchResultFieldsButton");

ADD_ADD_FILTER_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();
    addFilterFields(ADD_FILTERS_DIV);
});

UPDATE_ADD_FILTER_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();
    addFilterFields(UPDATE_FILTERS_DIV);
});

GET_ADD_FILTER_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();
    addFilterFields(GET_FILTERS_DIV);
});

function addFilterFields(DIV) 
{
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
        DIV.removeChild(br1);
        DIV.removeChild(br2);
        DIV.removeChild(fieldNameLabel);
        DIV.removeChild(fieldName);
        DIV.removeChild(operationLabel);
        DIV.removeChild(operator);
        DIV.removeChild(valueLabel);
        DIV.removeChild(value);
        DIV.removeChild(removeButton);
    });

    DIV.appendChild(fieldNameLabel);
    DIV.appendChild(fieldName);
    DIV.appendChild(operationLabel);
    DIV.appendChild(operator);
    DIV.appendChild(valueLabel);
    DIV.appendChild(value);

    DIV.appendChild(br1);
    DIV.appendChild(br2);

    DIV.appendChild(removeButton);
}

ADD_ADD_SORT_FIELD_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();
    addSortFields(ADD_SORT_FIELDS_DIV);
});

UPDATE_ADD_SORT_FIELD_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();
    addSortFields(UPDATE_SORT_FIELDS_DIV);
});

GET_ADD_SORT_FIELD_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();
    addSortFields(GET_SORT_FIELDS_DIV);
});

function addSortFields(DIV)
{
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
        DIV.removeChild(br1);
        DIV.removeChild(br2);
        DIV.removeChild(fieldNameLabel);
        DIV.removeChild(fieldName);
        DIV.removeChild(sortTypeLabel);
        DIV.removeChild(sortType);
        DIV.removeChild(removeButton);
    });

    DIV.appendChild(fieldNameLabel);
    DIV.appendChild(fieldName);
    DIV.appendChild(sortTypeLabel);
    DIV.appendChild(sortType);

    DIV.appendChild(br1);
    DIV.appendChild(br2);

    DIV.appendChild(removeButton);
}

ADD_ADD_SEARCH_RESULT_FIELDS_BUTTON.addEventListener('click', function(event) {
    event.preventDefault();
    addSearchResultFields(ADD_SEARCH_RESULT_FIELDS_DIV);
});

UPDATE_ADD_SEARCH_RESULT_FIELDS_BUTTON.addEventListener('click', function(event) {
    event.preventDefault();
    addSearchResultFields(UPDATE_SEARCH_RESULT_FIELDS_DIV);
});

GET_ADD_SEARCH_RESULT_FIELDS_BUTTON.addEventListener('click', function(event) {
    event.preventDefault();
    addSearchResultFields(GET_SEARCH_RESULT_FIELDS_DIV);
});

function addSearchResultFields() 
{
    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "fieldName");
    fieldNameLabel.textContent = "Field Name:";

    let fieldName = document.createElement("input");
    fieldName.setAttribute("type", "text");
    fieldName.setAttribute("name", "searchResultFieldName");

    let br1 = document.createElement("br");
    let br2 = document.createElement("br");

    let addButton = document.createElement("button");
    addButton.textContent = "Add Search Result Field";

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove Search Result Field";

    removeButton.addEventListener("click", function(event) {
        event.preventDefault();
        DIV.removeChild(br1);
        DIV.removeChild(br2);
        DIV.removeChild(fieldNameLabel);
        DIV.removeChild(fieldName);
        DIV.removeChild(removeButton);
        DIV.removeChild(addButton);
    });

    addButton.addEventListener("click", function(event) {
        event.preventDefault();
        addSearchResultFields(DIV);
    });

    DIV.appendChild(fieldNameLabel);
    DIV.appendChild(fieldName);

    DIV.appendChild(br1);
    DIV.appendChild(br2);

    DIV.appendChild(addButton);
    DIV.appendChild(removeButton);
}

ADD_SAVED_SEARCH_FORM.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_SAVED_SEARCH_FORM);

    console.log(await sendRequest("/add-saved-search", "POST", FORM_DATA));
});

DELETE_SAVED_SEARCH_FORM.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_SAVED_SEARCH_FORM);

    console.log(await sendRequest("/delete-saved-search", "POST", FORM_DATA));
});

GET_SAVED_SEARCH_FORM.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_SAVED_SEARCH_FORM);

    console.log(await sendRequest("/get-saved-search", "POST", FORM_DATA));
});

GET_SAVED_SEARCHES_FORM.addEventListener('submit', async function(event)
{
    event.preventDefault();

    console.log(await sendRequest("/get-saved-searches", "GET"));
});

PATCH_SAVED_SEARCH_FORM.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(PATCH_SAVED_SEARCH_FORM);

    console.log(await sendRequest("/patch-saved-search", "POST", FORM_DATA));
});

UPDATE_SAVED_SEARCH_FORM.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_SAVED_SEARCH_FORM);

    console.log(await sendRequest("/update-saved-search", "POST", FORM_DATA));
});

GET_SEARCH_SAVED_FORM.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_SEARCH_SAVED_FORM);

    console.log(await sendRequest("/get-search-saved", "POST", FORM_DATA));
});

GET_SEARCH_SAVED_BY_ID_FORM.addEventListener('submit', async function(event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_SEARCH_SAVED_BY_ID_FORM);

    console.log(await sendRequest("/get-search-saved-by-id", "POST", FORM_DATA));
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
                    if (input.id) {
                        FORM_DATA.append(input.id, element.value);
                    } else {
                        FORM_DATA.append(input.name, element.value);
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