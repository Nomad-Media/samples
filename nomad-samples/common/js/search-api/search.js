import postSearch from "./search-api/post-search.js";


const AUTH_FORM = document.getElementById("authForm");
const SEARCH_FORM = document.getElementById("searchForm");

const TOKEN_INPUT = document.getElementById("authInput");
const PAGE_OFFSET_INPUT = document.getElementById("pageOffsetInput");
const PAGE_SIZE_INPUT = document.getElementById("pageSizeInput");
const SEARCH_QUERY_INPUT = document.getElementById("searchQueryInput");
const FILTERS_CONTAINER = document.getElementById("filtersContainer");
const ADD_FILTER_BUTTON = document.getElementById("addFilterButton");
const RESULT_FIELDS_JSON_INPUT = document.getElementById("resultFieldsJsonInput");
const CONTENT_SORT_FIELD_NAME_INPUT = document.getElementById("contentSortFieldNameInput");
const CONTENT_SORT_TYPE = document.getElementById("contentSortType");
const IS_ADMIN = document.getElementById("isAdmin");


sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

ADD_FILTER_BUTTON.addEventListener('click', function(event)
{
    event.preventDefault();

    let fieldNameLabel = document.createElement('label');
    fieldNameLabel.setAttribute("for", "fieldNameInput");
    fieldNameLabel.textContent = "Field Name:";
    FILTERS_CONTAINER.appendChild(fieldNameLabel);

    let fieldNameInput = document.createElement("input");
    fieldNameInput.setAttribute("type", "filter");
    fieldNameInput.setAttribute("name", "fieldNameInput");
    fieldNameInput.required = true;
    FILTERS_CONTAINER.appendChild(fieldNameInput);

    let operationLabel = document.createElement('label');
    operationLabel.setAttribute("for", "operatorInput");
    operationLabel.textContent = "Operator:";
    FILTERS_CONTAINER.appendChild(operationLabel);

    let operatorInput = document.createElement("input");
    operatorInput.setAttribute("type", "filter");
    operatorInput.setAttribute("name", "operatorInput");
    operatorInput.required = true;
    FILTERS_CONTAINER.appendChild(operatorInput);

    let valueLabel = document.createElement('label');
    valueLabel.setAttribute("for", "valueInput");
    valueLabel.textContent = "Value:";
    FILTERS_CONTAINER.appendChild(valueLabel);

    let valueInput = document.createElement("input");
    valueInput.setAttribute("type", "filter");
    valueInput.setAttribute("name", "valueInput");
    valueInput.required = true;
    FILTERS_CONTAINER.appendChild(valueInput);
});

SEARCH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let pageOffset = PAGE_OFFSET_INPUT.value;
    let pageSize = PAGE_SIZE_INPUT.value;
    let searchQuery = SEARCH_QUERY_INPUT.value;
    let resultFields = RESULT_FIELDS_JSON_INPUT.value.replace(/\s+/g,'');
    let resultFieldsJson = JSON.parse(resultFields);
    let fieldName = CONTENT_SORT_FIELD_NAME_INPUT.value;
    let sortType = CONTENT_SORT_TYPE.value;
    let isAdmin;
    IS_ADMIN.value == "admin" ? isAdmin = true : isAdmin = false

    searchMain(document.querySelectorAll('input[type="filter"]'), pageOffset, pageSize, searchQuery, 
                     resultFieldsJson, fieldName, sortType, isAdmin);
});

async function searchMain(FILTER_INPUTS, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, RESULT_FIELDS_JSON, 
                          FIELD_NAME, SORT_TYPE, IS_ADMIN)
{
    const TOKEN = sessionStorage.getItem("token");

    if (!TOKEN)
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    try
    {
        const FILTERS = [];
        let filtersMap = {}

        FILTER_INPUTS.forEach(function (input)
        {
            if(input.name === "fieldNameInput")
            {
                filtersMap.fieldName = input.value;
            }
            else if(input.name === "operatorInput")
            {
                filtersMap.operator = input.value;
            }
            else
            {
                filtersMap.values = input.value;
                FILTERS.push(filtersMap);
                filtersMap = {};
            }
        });

        console.log("Getting search result");
        const INFO = await postSearch(TOKEN, PAGE_OFFSET, PAGE_SIZE, SEARCH_QUERY, FILTERS, 
                                      RESULT_FIELDS_JSON, FIELD_NAME, SORT_TYPE, IS_ADMIN);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}