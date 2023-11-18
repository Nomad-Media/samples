const CREATE_INTELLIGENT_PLAYLIST_FORM = document.getElementById("createIntelligentPlaylistForm");
const CREATE_INTELLIGENT_SCHEDULE_FORM = document.getElementById("createIntelligentScheduleForm");
const CREATE_PLAYLIST_FORM = document.getElementById("createPlaylistForm");
const CREATE_PLAYLIST_VIDEO_FORM = document.getElementById("createPlaylistVideoForm");
const CREATE_SCHEDULE_ITEM_ASSET_FORM = document.getElementById("createScheduleItemAssetForm");
const CREATE_SCHEDULE_ITEM_LIVE_CHANNEL_FORM = document.getElementById("createScheduleItemLiveChannelForm");
const CREATE_SCHEDULE_ITEM_SEARCH_FILTER_FORM = document.getElementById("createScheduleItemSearchFilterForm");
const CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_FORM = document.getElementById("createScheduleItemPlaylistScheduleForm");
const DELETE_INTELLIGENT_PLAYLIST_FORM = document.getElementById("deleteIntelligentPlaylistForm");
const DELETE_INTELLIGENT_SCHEDULE_FORM = document.getElementById("deleteIntelligentScheduleForm");
const DELETE_PLAYLIST_FORM = document.getElementById("deletePlaylistForm");
const DELETE_SCHEDULE_ITEM_FORM = document.getElementById("deleteScheduleItemForm");
const GET_INTELLIGENT_PLAYLIST_FORM = document.getElementById("getIntelligentPlaylistForm");
const GET_INTELLIGENT_SCHEDULE_FORM = document.getElementById("getIntelligentScheduleForm");
const GET_PLAYLIST_FORM = document.getElementById("getPlaylistForm");
const GET_SCHEDULE_ITEM_FORM = document.getElementById("getScheduleItemForm");
const GET_SCHEDULE_ITEMS_FORM = document.getElementById("getScheduleItemsForm");
const GET_SCHEDULE_PREVIEW_FORM = document.getElementById("getSchedulePreviewForm");
const MOVE_SCHEDULE_ITEM_FORM = document.getElementById("moveScheduleItemForm");
const PUBLISH_INTELLIGENT_SCHEDULE_FORM = document.getElementById("publishIntelligentScheduleForm");
const START_SCHEDULE_FORM = document.getElementById("startScheduleForm");
const STOP_SCHEDULE_FORM = document.getElementById("stopScheduleForm");
const UPDATE_INTELLIGENT_PLAYLIST_FORM = document.getElementById("updateIntelligentPlaylistForm");
const UPDATE_INTELLIGENT_SCHEDULE_FORM = document.getElementById("updateIntelligentScheduleForm");
const UPDATE_PLAYLIST_FORM = document.getElementById("updatePlaylistForm");
const UPDATE_SCHEDULE_ITEM_ASSET_FORM = document.getElementById("updateScheduleItemAssetForm");
const UPDATE_SCHEDULE_ITEM_LIVE_CHANNEL_FORM = document.getElementById("updateScheduleItemLiveChannelForm");
const UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_FORM = document.getElementById("updateScheduleItemSearchFilterForm");
const UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_FORM = document.getElementById("updateScheduleItemPlaylistScheduleForm");

const CREATE_INTELLIGENT_PLAYLIST_COLLECTIONS_SELECT = document.getElementById("createIntelligentPlaylistCollectionsSelect");
const CREATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT = document.getElementById("createIntelligentPlaylistRelatedContentsContentDefinitionsSelect");
const CREATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_SELECT = document.getElementById("createIntelligentPlaylistRelatedContentsSelect");
const CREATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_SELECT = document.getElementById("createIntelligentPlaylistSearchFilterTypeSelect");
const CREATE_INTELLIGENT_PLAYLIST_TAGS_SELECT = document.getElementById("createIntelligentPlaylistTagsSelect");
const CREATE_INTELLIGENT_SCHEDULE_TIME_ZONE_SELECT = document.getElementById("createIntelligentScheduleTimeZoneSelect");
const CREATE_PLAYLIST_LOOP_PLAYLIST_SELECT = document.getElementById("createPlaylistLoopPlaylistSelect");
const CREATE_SCHEDULE_ITEM_ASSET_DAYS = document.getElementById("createScheduleItemAssetDays");
const CREATE_SCHEDULE_ITEM_LIVE_CHANNEL_DAYS = document.getElementById("createScheduleItemLiveChannelDays");
const CREATE_SCHEDULE_ITEM_LIVE_CHANNELS_SELECT = document.getElementById("createScheduleItemLiveChannelsSelect");
const CREATE_SCHEDULE_ITEM_SEARCH_FILTER_COLLECTIONS_SELECT = document.getElementById("createScheduleItemSearchFilterCollectionsSelect");
const CREATE_SCHEDULE_ITEM_SEARCH_FILTER_DAYS = document.getElementById("createScheduleItemSearchFilterDays");
const CREATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT = document.getElementById("createScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect");
const CREATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_SELECT = document.getElementById("createScheduleItemSearchFilterRelatedContentsSelect");
const CREATE_SCHEDULE_ITEM_SEARCH_FILTER_TYPE_SELECT = document.getElementById("createScheduleItemSearchFilterTypeSelect");
const CREATE_SCHEDULE_ITEM_SEARCH_FILTER_TAGS_SELECT = document.getElementById("createScheduleItemSearchFilterTagsSelect");
const CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_DAYS = document.getElementById("createScheduleItemPlaylistScheduleDays");
const CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULES_SELECT = document.getElementById("createScheduleItemPlaylistSchedulesSelect");
const UPDATE_INTELLIGENT_PLAYLIST_COLLECTIONS_SELECT = document.getElementById("updateIntelligentPlaylistCollectionsSelect");
const UPDATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT = document.getElementById("updateIntelligentPlaylistRelatedContentsContentDefinitionsSelect");
const UPDATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_SELECT = document.getElementById("updateIntelligentPlaylistRelatedContentsSelect");
const UPDATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_SELECT = document.getElementById("updateIntelligentPlaylistSearchFilterTypeSelect");
const UPDATE_INTELLIGENT_PLAYLIST_TAGS_SELECT = document.getElementById("updateIntelligentPlaylistTagsSelect");
const UPDATE_INTELLIGENT_SCHEDULE_TIME_ZONE_SELECT = document.getElementById("updateIntelligentScheduleTimeZoneSelect");
const UPDATE_PLAYLIST_LOOP_PLAYLIST_SELECT = document.getElementById("updatePlaylistLoopPlaylistSelect");
const UPDATE_SCHEDULE_ITEM_ASSET_DAYS = document.getElementById("updateScheduleItemAssetDays");
const UPDATE_SCHEDULE_ITEM_LIVE_CHANNEL_DAYS = document.getElementById("updateScheduleItemLiveChannelDays");
const UPDATE_SCHEDULE_ITEM_LIVE_CHANNELS_SELECT = document.getElementById("updateScheduleItemLiveChannelsSelect");
const UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_COLLECTIONS_SELECT = document.getElementById("updateScheduleItemSearchFilterCollectionsSelect");
const UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_DAYS = document.getElementById("updateScheduleItemSearchFilterDays");
const UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT = document.getElementById("updateScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect");
const UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_SELECT = document.getElementById("updateScheduleItemSearchFilterRelatedContentsSelect");
const UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_TYPE_SELECT = document.getElementById("updateScheduleItemSearchFilterTypeSelect");
const UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_TAGS_SELECT = document.getElementById("updateScheduleItemSearchFilterTagsSelect");
const UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_DAYS = document.getElementById("updateScheduleItemPlaylistScheduleDays");
const UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULES_SELECT = document.getElementById("updateScheduleItemPlaylistSchedulesSelect");

const CREATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_DIV = document.getElementById("createIntelligentPlaylistSearchFilterTypeDiv");
const CREATE_PLAYLIST_DEFAULT_VIDEO_ASSET_ID_DIV = document.getElementById("createPlaylistDefaultVideoAssetIdDiv");
const CREATE_SCHEDULE_ITEM_SEARCH_FILTER_SEARCH_FILTER_TYPE_DIV = document.getElementById("createScheduleItemSearchFilterSearchFilterTypeDiv");
const UPDATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_DIV = document.getElementById("updateIntelligentPlaylistSearchFilterTypeDiv");
const UPDATE_PLAYLIST_DEFAULT_VIDEO_ASSET_ID_DIV = document.getElementById("updatePlaylistDefaultVideoAssetIdDiv");
const UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_SEARCH_FILTER_TYPE_DIV = document.getElementById("updateScheduleItemSearchFilterSearchFilterTypeDiv");


CREATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_SELECT.addEventListener("change", async function (event)
{
    event.preventDefault();

    CREATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_DIV.hidden = (CREATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_SELECT.value !== "2")
});

CREATE_PLAYLIST_LOOP_PLAYLIST_SELECT.addEventListener("change", async function (event)
{
    event.preventDefault();

    CREATE_PLAYLIST_DEFAULT_VIDEO_ASSET_ID_DIV.hidden = (CREATE_PLAYLIST_LOOP_PLAYLIST_SELECT.value === "True")
});

CREATE_SCHEDULE_ITEM_SEARCH_FILTER_TYPE_SELECT.addEventListener("change", async function (event)
{
    event.preventDefault();

    CREATE_SCHEDULE_ITEM_SEARCH_FILTER_SEARCH_FILTER_TYPE_DIV.hidden = false;

    CREATE_SCHEDULE_ITEM_SEARCH_FILTER_SEARCH_FILTER_TYPE_DIV.hidden = (CREATE_SCHEDULE_ITEM_SEARCH_FILTER_TYPE_SELECT.value !== "2")
});

UPDATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_SELECT.addEventListener("change", async function (event)
{
    event.preventDefault();

    UPDATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_DIV.hidden = false;

    UPDATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_DIV.hidden = (UPDATE_INTELLIGENT_PLAYLIST_SEARCH_FILTER_TYPE_SELECT.value !== "2")
});

UPDATE_PLAYLIST_LOOP_PLAYLIST_SELECT.addEventListener("change", async function (event)
{
    event.preventDefault();

    UPDATE_PLAYLIST_DEFAULT_VIDEO_ASSET_ID_DIV.hidden = (UPDATE_PLAYLIST_LOOP_PLAYLIST_SELECT.value === "True")
});

UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_TYPE_SELECT.addEventListener("change", async function (event)
{
    event.preventDefault();

    UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_SEARCH_FILTER_TYPE_DIV.hidden = false;

    UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_SEARCH_FILTER_TYPE_DIV.hidden = (UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_TYPE_SELECT.value !== "2")
});

await getCollections();

async function getCollections()
{
    const COLLECTIONS = await sendRequest("/get-collection-list", "GET");

    for (let collection of COLLECTIONS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = collection.id;
        OPTION.textContent = collection.title;
        CREATE_INTELLIGENT_PLAYLIST_COLLECTIONS_SELECT.appendChild(OPTION);
        CREATE_SCHEDULE_ITEM_SEARCH_FILTER_COLLECTIONS_SELECT.appendChild(OPTION.cloneNode(true));
        UPDATE_INTELLIGENT_PLAYLIST_COLLECTIONS_SELECT.appendChild(OPTION.cloneNode(true));
        UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_COLLECTIONS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_INTELLIGENT_PLAYLIST_COLLECTIONS_SELECT).select2();
    $(CREATE_SCHEDULE_ITEM_SEARCH_FILTER_COLLECTIONS_SELECT).select2();
    $(UPDATE_INTELLIGENT_PLAYLIST_COLLECTIONS_SELECT).select2();
    $(UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_COLLECTIONS_SELECT).select2();
}

await getContentDefinitions();

async function getContentDefinitions()
{
    const CONTENT_DEFINITIONS = await sendRequest("/get-content-definition-list", "GET");

    for (let contentDefinition of CONTENT_DEFINITIONS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = contentDefinition.contentDefinitionId;
        OPTION.textContent = contentDefinition.properties.title;
        CREATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT.appendChild(OPTION);

        const OPTION_2 = document.createElement("option");
        OPTION_2.value = contentDefinition.contentDefinitionId;
        OPTION_2.textContent = contentDefinition.properties.title;
        CREATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT.appendChild(OPTION_2);

        const OPTION_3 = document.createElement("option");
        OPTION_3.value = contentDefinition.contentDefinitionId;
        OPTION_3.textContent = contentDefinition.properties.title;
        UPDATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT.appendChild(OPTION_3);

        const OPTION_4 = document.createElement("option");
        OPTION_4.value = contentDefinition.contentDefinitionId;
        OPTION_4.textContent = contentDefinition.properties.title;
        UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT.appendChild(OPTION_4);
    }

    $(CREATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT).select2();
    $(CREATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT).select2();
    $(UPDATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT).select2();
    $(UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT).select2();
}

await getDays();

async function getDays()
{
    const DAYS = await sendRequest("/get-day-list", "GET");

    const ORDERED_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    DAYS.sort((a, b) => ORDERED_DAYS.indexOf(a.title) - ORDERED_DAYS.indexOf(b.title));

    for (let day of DAYS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = day.id;
        OPTION.textContent = day.title;
        CREATE_SCHEDULE_ITEM_ASSET_DAYS.appendChild(OPTION);
        CREATE_SCHEDULE_ITEM_LIVE_CHANNEL_DAYS.appendChild(OPTION.cloneNode(true));
        CREATE_SCHEDULE_ITEM_SEARCH_FILTER_DAYS.appendChild(OPTION.cloneNode(true));
        CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_DAYS.appendChild(OPTION.cloneNode(true));
        UPDATE_SCHEDULE_ITEM_ASSET_DAYS.appendChild(OPTION.cloneNode(true));
        UPDATE_SCHEDULE_ITEM_LIVE_CHANNEL_DAYS.appendChild(OPTION.cloneNode(true));
        UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_DAYS.appendChild(OPTION.cloneNode(true));
        UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_DAYS.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_SCHEDULE_ITEM_ASSET_DAYS).select2();
    $(CREATE_SCHEDULE_ITEM_LIVE_CHANNEL_DAYS).select2();
    $(CREATE_SCHEDULE_ITEM_SEARCH_FILTER_DAYS).select2();
    $(CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_DAYS).select2();
    $(UPDATE_SCHEDULE_ITEM_ASSET_DAYS).select2();
    $(UPDATE_SCHEDULE_ITEM_LIVE_CHANNEL_DAYS).select2();
    $(UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_DAYS).select2();
    $(UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_DAYS).select2();
}

await getLiveChannels();

async function getLiveChannels()
{
    const LIVE_CHANNELS = await sendRequest("/get-live-channel-list", "GET");

    for (let liveChannel of LIVE_CHANNELS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = liveChannel.id;
        OPTION.textContent = liveChannel.name;
        CREATE_SCHEDULE_ITEM_LIVE_CHANNELS_SELECT.appendChild(OPTION);
        UPDATE_SCHEDULE_ITEM_LIVE_CHANNELS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_SCHEDULE_ITEM_LIVE_CHANNELS_SELECT).select2();
    $(UPDATE_SCHEDULE_ITEM_LIVE_CHANNELS_SELECT).select2();
}

await getPlaylistSchedules();

async function getPlaylistSchedules()
{
    const PLAYLIST_SCHEDULES = await sendRequest("/get-playlist-schedule-list", "GET");

    for (let playlistSchedule of PLAYLIST_SCHEDULES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = playlistSchedule.id;
        OPTION.textContent = playlistSchedule.title;
        CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULES_SELECT.appendChild(OPTION);
        UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULES_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULES_SELECT).select2();
    $(UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULES_SELECT).select2();
}

$("#createIntelligentPlaylistRelatedContentsContentDefinitionsSelect").on("select2:select", async function (event)
{
    $("#createIntelligentPlaylistRelatedContentsSelect").empty();

    event.preventDefault();

    const FORM_DATA = new FormData();
    FORM_DATA.append("contentDefinitionId", event.params.data.id);

    const RELATED_CONTENTS = await sendRequest("/get-related-content-list", "POST", FORM_DATA);

    for (let relatedContent of RELATED_CONTENTS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = relatedContent.id;
        OPTION.textContent = relatedContent.title;
        CREATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_SELECT.appendChild(OPTION);
    }

    $(CREATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_SELECT).select2();
});

$("#createScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect").on("select2:select", async function (event)
{
    $("#createScheduleItemSearchFilterRelatedContentsSelect").empty();

    event.preventDefault();

    const FORM_DATA = new FormData();
    FORM_DATA.append("contentDefinitionId", event.params.data.id);

    const RELATED_CONTENTS = await sendRequest("/get-related-content-list", "POST", FORM_DATA);

    for (let relatedContent of RELATED_CONTENTS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = relatedContent.id;
        OPTION.textContent = relatedContent.title;
        CREATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_SELECT.appendChild(OPTION);
    }

    $(CREATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_SELECT).select2();
});

$("#updateIntelligentPlaylistRelatedContentsContentDefinitionsSelect").on("select2:select", async function (event)
{
    $("#updateIntelligentPlaylistRelatedContentsSelect").empty();

    event.preventDefault();

    const FORM_DATA = new FormData();
    FORM_DATA.append("contentDefinitionId", event.params.data.id);

    const RELATED_CONTENTS = await sendRequest("/get-related-content-list", "POST", FORM_DATA);

    for (let relatedContent of RELATED_CONTENTS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = relatedContent.id;
        OPTION.textContent = relatedContent.title;
        UPDATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_SELECT.appendChild(OPTION);
    }

    $(UPDATE_INTELLIGENT_PLAYLIST_RELATED_CONTENTS_SELECT).select2();
});

$("#updateScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect").on("select2:select", async function (event)
{
    $("#updateScheduleItemSearchFilterRelatedContentsSelect").empty();

    event.preventDefault();

    const FORM_DATA = new FormData();
    FORM_DATA.append("contentDefinitionId", event.params.data.id);

    const RELATED_CONTENTS = await sendRequest("/get-related-content-list", "POST", FORM_DATA);

    for (let relatedContent of RELATED_CONTENTS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = relatedContent.id;
        OPTION.textContent = relatedContent.title;
        UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_SELECT.appendChild(OPTION);
    }

    $(UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_RELATED_CONTENTS_SELECT).select2();
});

await getTags();

async function getTags()
{
    const TAGS = await sendRequest("/get-tag-list", "GET");

    for (let tag of TAGS)
    {
        const OPTION = document.createElement("option");
        OPTION.value = tag.id;
        OPTION.textContent = tag.title;
        CREATE_INTELLIGENT_PLAYLIST_TAGS_SELECT.appendChild(OPTION);
        CREATE_SCHEDULE_ITEM_SEARCH_FILTER_TAGS_SELECT.appendChild(OPTION.cloneNode(true));
        UPDATE_INTELLIGENT_PLAYLIST_TAGS_SELECT.appendChild(OPTION.cloneNode(true));
        UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_TAGS_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_INTELLIGENT_PLAYLIST_TAGS_SELECT).select2();
    $(CREATE_SCHEDULE_ITEM_SEARCH_FILTER_TAGS_SELECT).select2();
    $(UPDATE_INTELLIGENT_PLAYLIST_TAGS_SELECT).select2();
    $(UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_TAGS_SELECT).select2();
}

await getTimeZones();

async function getTimeZones()
{
    const TIME_ZONES = await sendRequest("/get-timezone-list", "GET");

    for (let timeZone of TIME_ZONES)
    {
        const OPTION = document.createElement("option");
        OPTION.value = timeZone.id;
        OPTION.textContent = timeZone.title;
        CREATE_INTELLIGENT_SCHEDULE_TIME_ZONE_SELECT.appendChild(OPTION);
        UPDATE_INTELLIGENT_SCHEDULE_TIME_ZONE_SELECT.appendChild(OPTION.cloneNode(true));
    }

    $(CREATE_INTELLIGENT_SCHEDULE_TIME_ZONE_SELECT).select2();
    $(UPDATE_INTELLIGENT_SCHEDULE_TIME_ZONE_SELECT).select2();
}

CREATE_INTELLIGENT_PLAYLIST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_INTELLIGENT_PLAYLIST_FORM);

    console.log(await sendRequest("/create-intelligent-playlist", "POST", FORM_DATA));
});

CREATE_INTELLIGENT_SCHEDULE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_INTELLIGENT_SCHEDULE_FORM);

    console.log(await sendRequest("/create-intelligent-schedule", "POST", FORM_DATA));
});

CREATE_PLAYLIST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_PLAYLIST_FORM);

    console.log(await sendRequest("/create-playlist", "POST", FORM_DATA));
});

CREATE_PLAYLIST_VIDEO_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_PLAYLIST_VIDEO_FORM);

    console.log(await sendRequest("/create-playlist-video", "POST", FORM_DATA));
});

CREATE_SCHEDULE_ITEM_ASSET_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_SCHEDULE_ITEM_ASSET_FORM);

    console.log(await sendRequest("/create-schedule-item-asset", "POST", FORM_DATA));
});

CREATE_SCHEDULE_ITEM_LIVE_CHANNEL_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_SCHEDULE_ITEM_LIVE_CHANNEL_FORM);

    console.log(await sendRequest("/create-schedule-item-live-channel", "POST", FORM_DATA));
});

CREATE_SCHEDULE_ITEM_SEARCH_FILTER_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_SCHEDULE_ITEM_SEARCH_FILTER_FORM);

    console.log(await sendRequest("/create-schedule-item-search-filter", "POST", FORM_DATA));
});

CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_FORM);

    console.log(await sendRequest("/create-schedule-item-playlist-schedule", "POST", FORM_DATA));
});

DELETE_INTELLIGENT_PLAYLIST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_INTELLIGENT_PLAYLIST_FORM);

    await sendRequest("/delete-intelligent-playlist", "POST", FORM_DATA);
});

DELETE_INTELLIGENT_SCHEDULE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_INTELLIGENT_SCHEDULE_FORM);

    await sendRequest("/delete-intelligent-schedule", "POST", FORM_DATA);
});

DELETE_PLAYLIST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_PLAYLIST_FORM);

    await sendRequest("/delete-playlist", "POST", FORM_DATA);
});

DELETE_SCHEDULE_ITEM_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_SCHEDULE_ITEM_FORM);

    await sendRequest("/delete-schedule-item", "POST", FORM_DATA);
});

GET_PLAYLIST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_PLAYLIST_FORM);

    console.log(await sendRequest("/get-playlist", "POST", FORM_DATA));
});

GET_INTELLIGENT_PLAYLIST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_INTELLIGENT_PLAYLIST_FORM);

    console.log(await sendRequest("/get-intelligent-playlist", "POST", FORM_DATA));
});

GET_INTELLIGENT_SCHEDULE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_INTELLIGENT_SCHEDULE_FORM);

    console.log(await sendRequest("/get-intelligent-schedule", "POST", FORM_DATA));
});

GET_SCHEDULE_ITEM_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_SCHEDULE_ITEM_FORM);

    console.log(await sendRequest("/get-schedule-item", "POST", FORM_DATA));
});

GET_SCHEDULE_ITEMS_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_SCHEDULE_ITEMS_FORM);

    console.log(await sendRequest("/get-schedule-items", "POST", FORM_DATA));
});

GET_SCHEDULE_PREVIEW_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_SCHEDULE_PREVIEW_FORM);

    console.log(await sendRequest("/get-schedule-preview", "POST", FORM_DATA));
});

MOVE_SCHEDULE_ITEM_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(MOVE_SCHEDULE_ITEM_FORM);

    console.log(await sendRequest("/move-schedule-item", "POST", FORM_DATA));
});

PUBLISH_INTELLIGENT_SCHEDULE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(PUBLISH_INTELLIGENT_SCHEDULE_FORM);

    console.log(await sendRequest("/publish-intelligent-schedule", "POST", FORM_DATA));
});

START_SCHEDULE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(START_SCHEDULE_FORM);

    console.log(await sendRequest("/start-schedule", "POST", FORM_DATA));
});

STOP_SCHEDULE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(STOP_SCHEDULE_FORM);

    console.log(await sendRequest("/stop-schedule", "POST", FORM_DATA));
});

UPDATE_INTELLIGENT_PLAYLIST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_INTELLIGENT_PLAYLIST_FORM);

    console.log(await sendRequest("/update-intelligent-playlist", "POST", FORM_DATA));
});

UPDATE_INTELLIGENT_SCHEDULE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_INTELLIGENT_SCHEDULE_FORM);

    console.log(await sendRequest("/update-intelligent-schedule", "POST", FORM_DATA));
});

UPDATE_PLAYLIST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_PLAYLIST_FORM);

    console.log(await sendRequest("/update-playlist", "POST", FORM_DATA));
});

UPDATE_SCHEDULE_ITEM_ASSET_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_SCHEDULE_ITEM_ASSET_FORM);

    console.log(await sendRequest("/update-schedule-item-asset", "POST", FORM_DATA));
});

UPDATE_SCHEDULE_ITEM_LIVE_CHANNEL_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_SCHEDULE_ITEM_LIVE_CHANNEL_FORM);

    console.log(await sendRequest("/update-schedule-item-live-channel", "POST", FORM_DATA));
});

UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_FORM);

    console.log(await sendRequest("/update-schedule-item-search-filter", "POST", FORM_DATA));
});

UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_FORM);

    console.log(await sendRequest("/update-schedule-item-playlist-schedule", "POST", FORM_DATA));
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