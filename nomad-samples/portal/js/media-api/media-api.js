import mediaSearch from "./media/media-search.js";
import forms from "./media/forms.js";

const AUTH_FORM = document.getElementById("authForm");
const MEDIA_SEARCH_FORM= document.getElementById("mediaSearchForm");
const FORM_FORM= document.getElementById("formForm");

const TOKEN_INPUT = document.getElementById("authInput");
const SEARCH_QUERY_INPUT = document.getElementById("searchQueryInput");
const IDS_INPUT = document.getElementById("idsInput");
const MEDIA_SORT_FIELD_NAME_INPUT = document.getElementById("mediaSortFieldNameInput");
const MEDIA_SORT_TYPE = document.getElementById("mediaSortType");
const FIRST_NAME_INPUT = document.getElementById("firstNameInput");
const LAST_NAME_INPUT = document.getElementById("lastNameInput");
const ACTIVE = document.getElementById("active");
const START_DATE_INPUT = document.getElementById("startDateInput");
const LOOKUP_ID_INPUT = document.getElementById("lookupIdInput");
const DESCRIPTION_INPUT = document.getElementById("descriptionInput");
const ID_INPUT = document.getElementById("idInput");

const FILTERS_CONTAINER = document.getElementById("filtersContainer");
const ADD_BUTTON = document.getElementById("addButton");

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

ADD_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();

    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "fieldNameInput");
    fieldNameLabel.textContent = "Field Name:";

    let fieldNameInput = document.createElement("input");
    fieldNameInput.setAttribute("type", "field");
    fieldNameInput.setAttribute("name", "fieldNameInput");
    fieldNameInput.required = true;

    let operationLabel = document.createElement('label');
    operationLabel.setAttribute("for", "operatorInput");
    operationLabel.textContent = "Operator:";

    let operatorInput = document.createElement("input");
    operatorInput.setAttribute("type", "field");
    operatorInput.setAttribute("name", "operatorInput");
    operatorInput.required = true;

    let valueLabel = document.createElement('label');
    valueLabel.setAttribute("for", "valueInput");
    valueLabel.textContent = "Value:";

    let valueInput = document.createElement("input");
    valueInput.setAttribute("type", "field");
    valueInput.setAttribute("name", "valueInput");
    valueInput.required = true;

    FILTERS_CONTAINER.appendChild(fieldNameLabel);
    FILTERS_CONTAINER.appendChild(fieldNameInput);
    FILTERS_CONTAINER.appendChild(operationLabel);
    FILTERS_CONTAINER.appendChild(operatorInput);
    FILTERS_CONTAINER.appendChild(valueLabel);
    FILTERS_CONTAINER.appendChild(valueInput);
});

MEDIA_SEARCH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let searchQuery = SEARCH_QUERY_INPUT.value;
    let ids = IDS_INPUT.value;
    let fieldName = MEDIA_SORT_FIELD_NAME_INPUT.value;
    let sortType = (MEDIA_SORT_TYPE.value === "Ascending" ? "Ascending" : "Descending");

    mediaSearchMain(searchQuery, ids, fieldName, sortType);
});

FORM_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let firstName = FIRST_NAME_INPUT.value;
    let lastName = LAST_NAME_INPUT.value;
    let active = (ACTIVE.value === "true" ? true : false);
    let startDate = START_DATE_INPUT.value;
    let lookupId = LOOKUP_ID_INPUT.value;
    let description = DESCRIPTION_INPUT.value;
    let id = ID_INPUT.value;

    formsMain(firstName, lastName, active, startDate, lookupId, description, id);
});

async function mediaSearchMain(SEARCH_QUERY, IDS, FIELD_NAME, SORT_TYPE)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        const INFO = await mediaSearch(sessionStorage.getItem("token"), SEARCH_QUERY, IDS.split(','), FIELD_NAME, SORT_TYPE);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function formsMain(FIRST_NAME, LAST_NAME, ACTIVE, START_DATE, LOOKUP_ID, DESCRIPTION, ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        const INFO = await forms(sessionStorage.getItem("token"), FIRST_NAME, LAST_NAME, ACTIVE, START_DATE, LOOKUP_ID, DESCRIPTION, ID)
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}