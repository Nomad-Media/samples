const CREATE_FORM = document.getElementById("createForm");
const ADD_FORM = document.getElementById("addForm");
const EXTEND_FORM = document.getElementById("extendForm");
const GET_FORM = document.getElementById("getForm");
const START_FORM = document.getElementById("startForm");
const STOP_FORM = document.getElementById("stopForm");
const DELETE_FORM = document.getElementById("deleteForm");

const CREATE_OR_UPDATE_EVENT = document.getElementById("createOrUpdateEvent");

const CREATE_OR_UPDATE_EVENT_DIV = document.getElementById("createOrUpdateEventDiv");

const SERIES_SELECT = document.getElementById("seriesSelect");
const PRIMARY_PERFORMER_SELECT = document.getElementById("primaryPerformerSelect");
const PERFORMERS_SELECT = document.getElementById("performersSelect");
const VENUE_SELECT = document.getElementById("venueSelect");
const GENRES_SELECT = document.getElementById("genresSelect");
const MEDIA_ATTRIBUTES_SELECT = document.getElementById("mediaAttributesSelect");
const LANGUAGES_SELECT = document.getElementById("languagesSelect");
const PRODUCTS_SELECT = document.getElementById("productsSelect");
const FEATURED_GROUPS_SELECT = document.getElementById("featuredGroupsSelect");
const RELATED_MEDIA_ITEMS_SELECT = document.getElementById("relatedMediaItemsSelect");
const RECOMMENDATION_SIMILAR_ITEMS_SELECT = document.getElementById("recommendationSimilarItemsSelect");
const RATING_SELECT = document.getElementById("ratingSelect");
const LIVE_CHANNEL_SELECT = document.getElementById("liveChannelSelect");
const PRIMARY_LIVESTREAM_INPUT_SELECT = document.getElementById("primaryLivestreamInputSelect");
const BACKUP_LIVESTREAM_INPUT_SELECT = document.getElementById("backupLivestreamInputSelect");
const EXTERNAL_OUTPUT_PROFILES_SELECT = document.getElementById("externalOutputProfilesSelect");

CREATE_OR_UPDATE_EVENT.addEventListener("change", async function (event)
{
    event.preventDefault();

    CREATE_OR_UPDATE_EVENT.value === "create" 
        ? CREATE_OR_UPDATE_EVENT_DIV.hidden = true 
        : CREATE_OR_UPDATE_EVENT_DIV.hidden = false;
});

await getSeriesList();

async function getSeriesList()
{
    const SERIES_LIST = await sendRequest("/get-series-list", "POST");

    for(let seriesIdx = 0; seriesIdx < SERIES_LIST.length; ++seriesIdx)
    {
        let option = document.createElement("option");
        option.value = SERIES_LIST[seriesIdx].id;
        option.text = SERIES_LIST[seriesIdx].title;
        SERIES_SELECT.appendChild(option);
    }

    $(SERIES_SELECT).select2();
}

await getPerformerList();

async function getPerformerList()
{
    const PERFORMER_LIST = await sendRequest("/get-performer-list", "POST");

    for(let performerIdx = 0; performerIdx < PERFORMER_LIST.length; ++performerIdx)
    {
        let option1 = document.createElement("option");
        option1.value = PERFORMER_LIST[performerIdx].id;
        option1.text = PERFORMER_LIST[performerIdx].title;
        PRIMARY_PERFORMER_SELECT.appendChild(option1);

        let option2 = document.createElement("option");
        option2.value = PERFORMER_LIST[performerIdx].id;
        option2.text = PERFORMER_LIST[performerIdx].title;
        PERFORMERS_SELECT.appendChild(option2);
    }

    $(PRIMARY_PERFORMER_SELECT).select2();
    $(PERFORMERS_SELECT).select2();
}

await getVenueList();

async function getVenueList()
{
    const VENUE_LIST = await sendRequest("/get-venue-list", "POST");

    for(let venueIdx = 0; venueIdx < VENUE_LIST.length; ++venueIdx)
    {
        let option = document.createElement("option");
        option.value = VENUE_LIST[venueIdx].id;
        option.text = VENUE_LIST[venueIdx].title;
        VENUE_SELECT.appendChild(option);
    }

    $(VENUE_SELECT).select2();
}

await getGenresList();

async function getGenresList()
{
    const GENRE_LIST = await sendRequest("/get-genre-list", "POST");

    for(let genreIdx = 0; genreIdx < GENRE_LIST.length; ++genreIdx)
    {
        let option = document.createElement("option");
        option.value = GENRE_LIST[genreIdx].id;
        option.text = GENRE_LIST[genreIdx].title;
        GENRES_SELECT.appendChild(option);
    }

    $(GENRES_SELECT).select2();
}

await getMediaAttributesList();

async function getMediaAttributesList()
{
    const MEDIA_ATTRIBUTES_LIST = await sendRequest("/get-media-attributes-list", "POST");

    for(let mediaAttributesIdx = 0; mediaAttributesIdx < MEDIA_ATTRIBUTES_LIST.length; ++mediaAttributesIdx)
    {
        let option = document.createElement("option");
        option.value = MEDIA_ATTRIBUTES_LIST[mediaAttributesIdx].id;
        option.text = MEDIA_ATTRIBUTES_LIST[mediaAttributesIdx].title;
        MEDIA_ATTRIBUTES_SELECT.appendChild(option);
    }

    $(MEDIA_ATTRIBUTES_SELECT).select2();
}

await getLanguageList();

async function getLanguageList()
{
    const LANGUAGE_LIST = await sendRequest("/get-language-list", "POST");

    for(let languageIdx = 0; languageIdx < LANGUAGE_LIST.length; ++languageIdx)
    {
        let option = document.createElement("option");
        option.value = LANGUAGE_LIST[languageIdx].id;
        option.text = LANGUAGE_LIST[languageIdx].title;
        LANGUAGES_SELECT.appendChild(option);
    }

    $(LANGUAGES_SELECT).select2();
}

await getProductsList();

async function getProductsList()
{
    const PRODUCTS_LIST = await sendRequest("/get-product-list", "POST");

    for(let productsIdx = 0; productsIdx < PRODUCTS_LIST.length; ++productsIdx)
    {
        let option = document.createElement("option");
        option.value = PRODUCTS_LIST[productsIdx].id;
        option.text = PRODUCTS_LIST[productsIdx].title;
        PRODUCTS_SELECT.appendChild(option);
    }

    $(PRODUCTS_SELECT).select2();
}

await getFeaturedGroupsList();

async function getFeaturedGroupsList()
{
    const FEATURED_GROUPS_LIST = await sendRequest("/get-featured-groups-list", "POST");

    for(let featuredGroupsIdx = 0; featuredGroupsIdx < FEATURED_GROUPS_LIST.length; ++featuredGroupsIdx)
    {
        let option = document.createElement("option");
        option.value = FEATURED_GROUPS_LIST[featuredGroupsIdx].id;
        option.text = FEATURED_GROUPS_LIST[featuredGroupsIdx].title;
        FEATURED_GROUPS_SELECT.appendChild(option);
    }

    $(FEATURED_GROUPS_SELECT).select2();
}

await getRelatedMediaItemsList();

async function getRelatedMediaItemsList()
{
    const RELATED_MEDIA_ITEMS_LIST = await sendRequest("/get-related-media-items-list", "POST");

    for(let relatedMediaItemsIdx = 0; relatedMediaItemsIdx < RELATED_MEDIA_ITEMS_LIST.length; ++relatedMediaItemsIdx)
    {
        let option = document.createElement("option");
        option.value = RELATED_MEDIA_ITEMS_LIST[relatedMediaItemsIdx].id;
        option.text = RELATED_MEDIA_ITEMS_LIST[relatedMediaItemsIdx].title;
        RELATED_MEDIA_ITEMS_SELECT.appendChild(option);
    }

    $(RELATED_MEDIA_ITEMS_SELECT).select2();
}

await getRecommendationSimilarItemsList();

async function getRecommendationSimilarItemsList()
{
    const RECOMMENDATION_SIMILAR_ITEMS_LIST = await sendRequest("/get-recommendation-similar-items-list", "POST");

    for(let recommendationSimilarItemsIdx = 0; recommendationSimilarItemsIdx < RECOMMENDATION_SIMILAR_ITEMS_LIST.length; ++recommendationSimilarItemsIdx)
    {
        let option = document.createElement("option");
        option.value = RECOMMENDATION_SIMILAR_ITEMS_LIST[recommendationSimilarItemsIdx].id;
        option.text = RECOMMENDATION_SIMILAR_ITEMS_LIST[recommendationSimilarItemsIdx].title;
        RECOMMENDATION_SIMILAR_ITEMS_SELECT.appendChild(option);
    }

    $(RECOMMENDATION_SIMILAR_ITEMS_SELECT).select2();
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
}

await getLiveChannelList();

async function getLiveChannelList()
{
    const LIVE_CHANNEL_LIST = await sendRequest("/get-live-channel-list", "POST");

    for(let liveChannelIdx = 0; liveChannelIdx < LIVE_CHANNEL_LIST.length; ++liveChannelIdx)
    {
        let option = document.createElement("option");
        option.value = LIVE_CHANNEL_LIST[liveChannelIdx].id;
        option.text = LIVE_CHANNEL_LIST[liveChannelIdx].title;
        LIVE_CHANNEL_SELECT.appendChild(option);
    }

    $(LIVE_CHANNEL_SELECT).select2();
}

CREATE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_FORM);

    console.log(await sendRequest("/create-event", "POST", FORM_DATA));
});

await primaryLiveInputList();

async function primaryLiveInputList()
{
    const PRIMARY_LIVESTREAM_INPUT_LIST = await sendRequest("/get-livestream-input-list", "POST");

    for(let primaryLiveInputIdx = 0; primaryLiveInputIdx < PRIMARY_LIVESTREAM_INPUT_LIST.length; ++primaryLiveInputIdx)
    {
        let option = document.createElement("option");
        option.value = PRIMARY_LIVESTREAM_INPUT_LIST[primaryLiveInputIdx].id;
        option.text = PRIMARY_LIVESTREAM_INPUT_LIST[primaryLiveInputIdx].title;
        PRIMARY_LIVESTREAM_INPUT_SELECT.appendChild(option);

        let option2 = document.createElement("option");
        option2.value = PRIMARY_LIVESTREAM_INPUT_LIST[primaryLiveInputIdx].id;
        option2.text = PRIMARY_LIVESTREAM_INPUT_LIST[primaryLiveInputIdx].title;
        BACKUP_LIVESTREAM_INPUT_SELECT.appendChild(option2);
    }

    $(PRIMARY_LIVESTREAM_INPUT_SELECT).select2();
    $(BACKUP_LIVESTREAM_INPUT_SELECT).select2();
}

await externalOutputProfilesList();

async function externalOutputProfilesList()
{
    const EXTERNAL_OUTPUT_PROFILES_LIST = await sendRequest("/get-external-output-profiles-list", "POST");

    for(let externalOutputProfilesIdx = 0; externalOutputProfilesIdx < EXTERNAL_OUTPUT_PROFILES_LIST.length; ++externalOutputProfilesIdx)
    {
        let option = document.createElement("option");
        option.value = EXTERNAL_OUTPUT_PROFILES_LIST[externalOutputProfilesIdx].id;
        option.text = EXTERNAL_OUTPUT_PROFILES_LIST[externalOutputProfilesIdx].description;
        EXTERNAL_OUTPUT_PROFILES_SELECT.appendChild(option);
    }

    $(EXTERNAL_OUTPUT_PROFILES_SELECT).select2();
}

ADD_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_FORM);

    await sendRequest("/add-event", "POST", FORM_DATA);
});

EXTEND_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(EXTEND_FORM);

    await sendRequest("/extend-event", "POST", FORM_DATA);
});

GET_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_FORM);

    console.log(await sendRequest("/get-event", "POST", FORM_DATA));
});

START_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(START_FORM);

    await sendRequest("/start-event", "POST", FORM_DATA);
});

STOP_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(STOP_FORM);

    await sendRequest("/stop-event", "POST", FORM_DATA);
});

DELETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_FORM);

    sendRequest("/delete-event", "POST", FORM_DATA);
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
                    if (element.value.trim().toLowerCase() === element.label.trim().toLowerCase()) {
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
            if (input.id) {
                FORM_DATA.append(input.id, input.value);
            } else {
                FORM_DATA.append(input.name, input.value);
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