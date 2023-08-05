import * as prjConstants from "./constants/project-constants.js";
import * as sysConstants from "./constants/system-constants.js";
import * as uiHelpers from "./helpers/ui-helpers.js";
import * as dateHelpers from "./helpers/date-helpers.js";
import * as templateHelpers from "./helpers/template-helpers.js";
import * as loginForm from "./templates/login-form-template.js";

import search from "./search/search.js";
import searchLabels from "./search/search-labels.js";
import searchAssetsByType from "./search/search-assets-by-type.js";
import VanillaTilt from "./lib/vanilla-tilt.js";

/**
 * Clear session
 */
// sessionStorage.clear();

/**
 * Global
 *
 */
let loginFormTemplate;
let loginButton;
let logoutButton;
let searchFilters;
let imageWrapper;
let imageContainer;
let fromDate;
let toDate;
let camerasSelect;
let personsSelect;
let searchButton;

let authToken;
let isInitialized = false;
let isSearching = false;
let personLabelId;

/**
 * Initialize
 *
 */
async function init() {
    if (!isInitialized) {
        // Give feedback to the console
        console.log("Initializing...");

        // Sections
        loginFormTemplate = await templateHelpers.loadTemplate("login-form-template.html");
        searchFilters = document.getElementById("nomad-search-filters");
        imageWrapper = document.getElementById("nomad-image-wrapper");
        imageContainer = document.getElementById("nomad-image-container");

        // Buttons
        loginButton = document.getElementById("nomad-login-button");
        loginButton.addEventListener("click", async (evt) => signIn(evt));
        logoutButton = document.getElementById("nomad-logout-button");
        logoutButton.addEventListener("click", async (evt) => signOut(evt));
        searchButton = document.getElementById("search-btn");
        searchButton.addEventListener("click", (evt) => searchButtonClicked(evt));

        // Dates
        fromDate = document.getElementById("from-date");
        fromDate.value = dateHelpers.yesterdayToInputDate();
        toDate = document.getElementById("to-date");
        toDate.value = dateHelpers.todayToInputDate();

        // Select Cameras
        camerasSelect = document.getElementById("cameras");
        const camerasSelectOptions = [...camerasSelect.options];
        camerasSelectOptions.forEach((option) => {
            if (option.value !== "_all") {
                option.remove();
            }
        });

        // Select Persons
        personsSelect = document.getElementById("persons");
        const personsSelectOptions = [...personsSelect.options];
        personsSelectOptions.forEach((option) => {
            if (!option.value.startsWith("_all")) {
                option.remove();
            }
        });

        // Empty the image container
        imageContainer.innerHTML = null;

        isInitialized = true;
    }

    authToken = sessionStorage.getItem("authToken");

    if (!authToken) {
        uiHelpers.hide(logoutButton);
        uiHelpers.hide(searchFilters);
        uiHelpers.hide(imageWrapper);
        uiHelpers.show(loginFormTemplate);
    } else {
        uiHelpers.hide(loginFormTemplate);
        uiHelpers.show(logoutButton);
        uiHelpers.show(searchFilters);
        uiHelpers.show(imageWrapper);

        getCameras();
        getPersons();
    }
}

/**
 *
 * @param {Event} evt
 */
async function searchButtonClicked(evt) {
    if (evt && evt.cancelable) {
        evt.stopPropagation();
        evt.preventDefault();
    }

    if (isSearching) return;

    isSearching = true;
    searchButton.disabled = true;

    await searchImages();

    isSearching = false;
    searchButton.disabled = false;
}

/**
 * Get Cameras and load cameras select options
 *
 */
async function getCameras() {
    // Give feedback to the console
    console.log("Getting cameras...");

    try {
        uiHelpers.showWaitIndicator("Getting cameras...");

        const cameras = await searchAssetsByType(authToken, sysConstants.ASSET_TYPE_FOLDER_ENUM, null, 0, 50, prjConstants.CAMERAS_FOLDER_ASSET_ID, false);

        if (cameras && cameras.hasItems) {
            const options = [...camerasSelect.options];
            options.forEach((option) => {
                if (option.value !== "_all") {
                    option.remove();
                }
            });

            cameras.items.forEach((camera) => {
                const option = document.createElement("option");
                option.value = camera.id;
                option.innerText = camera.title.slice(0, 7);
                camerasSelect.appendChild(option);
            });
        }
    } catch (e) {
        await uiHelpers.errorAlert(e);
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}

/**
 * Get Persons and load persons select options
 *
 */
async function getPersons() {
    // Give feedback to the console
    console.log("Getting persons...");

    try {
        uiHelpers.showWaitIndicator("Getting persons...");

        // Build the payload body
        const body = {
            filters: [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: sysConstants.PERSON_CONTENT_DEFINITION_ID
                }
            ],
            pageOffset: 0,
            pageSize: 10000,
            SearchResultFields: [
                {
                    name: "persons",
                    searchResultFields: [
                        {
                            name: "id"
                        },
                        {
                            name: "name"
                        },
                        {
                            name: "confidence"
                        }
                    ]
                }
            ],
            sortFields: [{ fieldName: "name", sortType: "Ascending" }]
        };

        // const persons = await searchByAssetId(authToken, sysConstants.PERSON_CONTENT_DEFINITION_ID, 0, 500);
        const persons = await search(authToken, body);

        if (persons && persons.hasItems) {
            const options = [...personsSelect.options];
            options.forEach((option) => {
                if (!option.value.startsWith("_all")) {
                    option.remove();
                }
            });

            const existingOptions = new Map();

            persons.items.forEach((item) => {
                if (item.identifiers.persons && item.identifiers.persons.length > 0) {
                    const personId = item.identifiers.persons[0].id;
                    const personName = item.identifiers.persons[0].name;
                    if (!existingOptions.get(personId)) {
                        existingOptions.set(personId, personName);
                        const option = document.createElement("option");
                        option.value = personId;
                        option.innerText = personName;
                        personsSelect.appendChild(option);
                    }
                }
            });
        }
    } catch (e) {
        await uiHelpers.errorAlert(e);
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}

/**
 * Search Images
 *
 */
async function searchImages() {
    // Give feedback to the console
    console.log("Searching...");

    try {
        uiHelpers.showWaitIndicator("Searching...");

        // Empty the image container
        imageContainer.innerHTML = null;

        // Set dates
        const fromDateValue = dateHelpers.inputDateValueToDateTime(fromDate.value).toISOString();
        const toDateValue = dateHelpers.inputDateValueToDateTime(toDate.value, 23, 59, 59, 999).toISOString();

        // Build the payload body
        const body = {
            filters: [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: sysConstants.ASSET_CONTENT_DEFINITION_ID
                },
                {
                    fieldName: "assetType",
                    operator: "Equals",
                    values: sysConstants.ASSET_TYPE_FILE_ENUM
                },
                {
                    fieldName: "mediaType",
                    operator: "Equals",
                    values: sysConstants.MEDIA_TYPE_IMAGE_ENUM
                },
                {
                    fieldName: "lastModifiedDate",
                    operator: "GreaterThanEquals",
                    values: fromDateValue
                },
                {
                    fieldName: "lastModifiedDate",
                    operator: "LessThanEquals",
                    values: toDateValue
                }
            ],
            pageOffset: 0,
            pageSize: 500,
            SearchResultFields: [
                {
                    name: "fullUrl"
                },
                {
                    name: "previewImageFullUrl"
                },
                {
                    name: "thumbnailImageFullUrl"
                },
                {
                    name: "createdDate"
                },
                {
                    name: "lastModifiedDate"
                }
            ],
            sortFields: [{ fieldName: "createdDate", sortType: "Descending" }]
        };

        const allCameras = camerasSelect.value === "_all";

        const cameraFilter = {
            fieldName: allCameras ? "uuidSearchField" : "parentId",
            operator: "Equals",
            values: allCameras ? prjConstants.CAMERAS_FOLDER_ASSET_ID : camerasSelect.value
        };

        body.filters.push(cameraFilter);

        switch (personsSelect.value) {
            case "_allImages":
                break;
            case "_allPersons": {
                if (!personLabelId) {
                    const personLabel = await searchLabels(authToken, "Person");

                    if (!personLabel) {
                        throw new Error("A Label for Person was not found");
                    }

                    personLabelId = personLabel.items[0].id;
                }

                body.filters.push({
                    fieldName: "uuidSearchField",
                    operator: "Equals",
                    values: personLabelId
                });

                break;
            }
            default:
                body.filters.push({
                    fieldName: "uuidSearchField",
                    operator: "Equals",
                    values: personsSelect.value
                });
                break;
        }

        // Search images
        const images = await search(authToken, body);

        // Check if images were found
        if (images && images.hasItems) {
            console.log(`Images found: ${images.totalItemCount}`);

            // Limit matches to 1000
            if (images.totalItemCount > 500) {
                await uiHelpers.infoAlert("There are too many results. Please add more search criteria");
                return;
            }

            let thumbnail = "";

            // Loop all images
            images.items.forEach((image) => {
                // Get the image thumbnail image URL
                if (image.identifiers.previewImageFullUrl) {
                    thumbnail = image.identifiers.previewImageFullUrl;
                }

                // If image has no thumbnail use default image
                if (!thumbnail || thumbnail.trim().length === 0) {
                    thumbnail = "./images/no-thumbnail.jpg";
                }

                const createdDate = new Date(image.identifiers.createdDate);
                const createdDateTitle = dateHelpers.dateTotoLocaleDateTimeString(createdDate);

                // Build the image card element
                const card = `
                <div class="nomad-image-card" data-tilt data-tilt-max="15" data-tilt-speed="1000" data-tilt-perspective="1000" data-tilt-scale="1.22">
                    <button class="nomad-image-btn" id="${image.id}" nomad-title="${image.title}" nomad-full-url="${thumbnail}">
                        <div class="nomad-image-img" style="background-image: url('${thumbnail}')">
                        </div>
                        <div class="nomad-image-info">
                            <p class="nomad-image-name">${createdDateTitle}</p>
                        </div>
                    </button>
                </div>`;

                // Add the card to the container
                imageContainer.insertAdjacentHTML("beforeend", card);
            });

            // Get all the nomad image buttons
            const buttons = document.querySelectorAll(".nomad-image-btn");

            // Add play image event to each button
            buttons.forEach((button) => {
                button.addEventListener("click", (evt) => openImage(evt));
            });

            // Add Tilt effect
            VanillaTilt.init(document.querySelectorAll(".nomad-image-card"));
        } else {
            uiHelpers.infoAlert("No images found for the specified search filters");
        }
    } catch (error) {
        uiHelpers.errorAlert(error);
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}

/**
 * Open selected image in a new tab
 *
 * @param {event} evt
 */
function openImage(evt) {
    if (evt && evt.cancelable) {
        evt.preventDefault();
    }

    uiHelpers.hide(imageWrapper);
    const modal = document.getElementById("nomad-modal-image-wrapper");
    modal.style.display = "block";

    const image = document.getElementById("nomad-modal-image");
    image.src = evt.currentTarget.getAttribute("nomad-full-url");

    // const caption = document.getElementById("nomad-modal-image-caption");
    // caption.innerHTML = "";

    const span = document.getElementById("nomad-modal-image-close");
    span.onclick = function () {
        modal.style.display = "none";
        uiHelpers.show(imageWrapper);
    };
}

/**
 *  Login
 *
 * @param {event} evt
 */
async function signIn(evt) {
    if (evt && evt.cancellable) {
        evt.preventDefault();
    }

    try {
        uiHelpers.hide(loginFormTemplate);

        uiHelpers.showWaitIndicator("Logging in...");

        authToken = await loginForm.validateAndLogin();

        if (authToken) {
            // Give feedback to the console
            console.log("User logged in successfully");

            uiHelpers.show(logoutButton);
            uiHelpers.show(searchFilters);
            uiHelpers.show(imageWrapper);
            uiHelpers.hide(loginFormTemplate);
        } else {
            uiHelpers.show(loginFormTemplate);
        }
    } catch (error) {
        await uiHelpers.errorAlert(error);
        uiHelpers.show(loginFormTemplate);
    } finally {
        uiHelpers.hideWaitIndicator();
    }

    if (authToken) {
        await getCameras();
        await getPersons();
    }
}

/**
 * Logout
 *
 * @param {event} evt
 */
async function signOut(evt) {
    if (evt && evt.cancellable) {
        evt.preventDefault();
    }

    try {
        uiHelpers.showWaitIndicator("Logging out...");
        authToken = undefined;
        sessionStorage.clear();
        uiHelpers.hide(logoutButton);
        isInitialized = false;
        init();
    } catch (error) {
        throw new Error(`Logout failed: ${error}`);
    } finally {
        uiHelpers.hideWaitIndicator();
    }
}

/**
 * Wait for the DOM to load
 *
 */
window.addEventListener("DOMContentLoaded", async (event) => {
    console.log("DOM Ready...");
    init();
});
