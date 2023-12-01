const ARCHIVE_ASSET_FORM = document.getElementById("archiveAssetForm");
const BATCH_ACTION_FORM = document.getElementById("batchActionForm");
const BUILD_MEDIA_FORM = document.getElementById("buildMediaForm");
const CLIP_ASSET_FORM = document.getElementById("clipAssetForm");
const COPY_ASSET_FORM = document.getElementById("copyAssetForm");
const CREATE_ANNOTATION_FORM = document.getElementById("createAnnotationForm");
const CREATE_ASSET_AD_BREAK_FORM = document.getElementById("createAssetAdBreakForm");
const CREATE_FOLDER_ASSET_FORM = document.getElementById("createFolderAssetForm");
const CREATE_PLACEHOLDER_ASSET_FORM = document.getElementById("createPlaceholderAssetForm");
const CREATE_SCREENSHOT_AT_TIMECODE_FORM = document.getElementById("createScreenshotAtTimecodeForm");
const DELETE_ANNOTATION_FORM = document.getElementById("deleteAnnotationForm");
const DELETE_ASSET_FORM = document.getElementById("deleteAssetForm");
const DELETE_ASSET_AD_BREAK_FORM = document.getElementById("deleteAssetAdBreakForm");
const DOWNLOAD_ARCHIVE_ASSET_FORM = document.getElementById("downloadArchiveAssetForm");
const DUPLICATE_ASSET_FORM = document.getElementById("duplicateAssetForm");
const GET_ANNOTATIONS_FORM = document.getElementById("getAnnotationsForm");
const GET_ASSET_FORM = document.getElementById("getAssetForm");
const GET_ASSET_AD_BREAKS_FORM = document.getElementById("getAssetAdBreaksForm");
const GET_ASSET_CHILD_NODES_FORM = document.getElementById("getAssetChildNodesForm");
const GET_ASSET_DETAILS_FORM = document.getElementById("getAssetDetailsForm");
const GET_ASSET_MANIFEST_WITH_COOKIES_FORM = document.getElementById("getAssetManifestWithCookiesForm");
const GET_ASSET_METADATA_SUMMARY_FORM = document.getElementById("getAssetMetadataSummaryForm");
const GET_ASSET_PARENT_FOLDERS_FORM = document.getElementById("getAssetParentFoldersForm");
const GET_ASSET_SCREENSHOT_DETAILS_FORM = document.getElementById("getAssetScreenshotDetailsForm");
const GET_ASSET_SEGMENT_DETAILS_FORM = document.getElementById("getAssetSegmentDetailsForm");
const GET_USER_UPLOAD_PARTS_FORM = document.getElementById("getUserUploadPartsForm");
const GET_USER_UPLOADS_FORM = document.getElementById("getUserUploadsForm");
const IMPORT_ANNOTATIONS_FORM = document.getElementById("importAnnotationsForm");
const INDEX_ASSET_FORM = document.getElementById("indexAssetForm");
const LOCAL_RESTORE_ASSET_FORM = document.getElementById("localRestoreAssetForm");
const MOVE_ASSET_FORM = document.getElementById("moveAssetForm");
const RECORDS_ASSET_TRACKING_BEACON_FORM = document.getElementById("recordsAssetTrackingBeaconForm");
const REGISTER_ASSET_FORM = document.getElementById("registerAssetForm");
const REPROCESS_ASSET_FORM = document.getElementById("reprocessAssetForm");
const RESTORE_ASSET_FORM = document.getElementById("restoreAssetForm");
const SHARE_ASSET_FORM = document.getElementById("shareAssetForm");
const START_WORKFLOW_FORM = document.getElementById("startWorkflowForm");
const TRANSCRIBE_ASSET_FORM = document.getElementById("transcribeAssetForm");
const UPDATE_ANNOTATION_FORM = document.getElementById("updateAnnotationForm");
const UPDATE_ASSET_FORM = document.getElementById("updateAssetForm");
const UPDATE_ASSET_AD_BREAK_FORM = document.getElementById("updateAssetAdBreakForm");
const UPDATE_ASSET_LANGUAGE_FORM = document.getElementById("updateAssetLanguageForm");

const BATCH_ACTION_ACTION_ARGUMENTS_DIV = document.getElementById("batchActionActionArgumentsDiv");
const BUILD_MEDIA_SOURCES_DIV = document.getElementById("buildMediaSourcesDiv");
const COPY_ASSET_ACTION_ARGUMENTS_DIV = document.getElementById("copyAssetActionArgumentsDiv");
const CREATE_ANNOTATION_PROPERTIES_DIV = document.getElementById("createAnnotationPropertiesDiv");
const IMPORT_ANNOTATIONS_DIV = document.getElementById("importAnnotationsDiv");
const MOVE_ASSET_ACTION_ARGUMENTS_DIV = document.getElementById("moveAssetActionArgumentsDiv");
const START_WORKFLOW_ACTION_ARGUMENTS_DIV = document.getElementById("startWorkflowActionArgumentsDiv");
const TRANSCRIBE_ASSET_DIV = document.getElementById("transcribeAssetDiv");
const UPDATE_ANNOTATION_PROPERTIES_DIV = document.getElementById("updateAnnotationPropertiesDiv");
const UPDATE_ASSET_CUSTOM_PROPERTIES_DIV = document.getElementById("updateAssetCustomPropertiesDiv");

const BATCH_ACTION_ADD_ACTION_ARGUMENT_BUTTON = document.getElementById("batchActionAddActionArgumentButton");
const BUILD_MEDIA_ADD_SOURCE_BUTTON = document.getElementById("buildMediaAddSourceButton");
const COPY_ASSET_ADD_ACTION_ARGUMENT_BUTTON = document.getElementById("copyAssetAddActionArgumentButton");
const IMPORT_ANNOTATIONS_ADD_ANNOTATION_BUTTON = document.getElementById("importAnnotationsAddAnnotationButton");
const MOVE_ASSET_ADD_ACTION_ARGUMENT_BUTTON = document.getElementById("moveAssetAddActionArgumentButton");
const START_WORKFLOW_ADD_ACTION_ARGUMENT_BUTTON = document.getElementById("startWorkflowAddActionArgumentButton");
const TRANSCRIBE_ASSET_ADD_TRANSCRIPT_BUTTON = document.getElementById("transcribeAssetAddTranscriptButton");
const UPDATE_ASSET_ADD_CUSTOM_PROPERTY_BUTTON = document.getElementById("updateAssetAddCustomPropertyButton");

const BUILD_MEDIA_TAGS_SELECT = document.getElementById("buildMediaTagsSelect");
const BUILD_MEDIA_COLLECTIONS_SELECT = document.getElementById("buildMediaCollectionsSelect");
const BUILD_MEDIA_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT = document.getElementById("buildMediaRelatedContentsContentDefinitionsSelect");
const BUILD_MEDIA_RELATED_CONTENTS_SELECT = document.getElementById("buildMediaRelatedContentsSelect");
const CLIP_ASSET_TAGS_SELECT = document.getElementById("clipAssetTagsSelect");
const CLIP_ASSET_COLLECTIONS_SELECT = document.getElementById("clipAssetCollectionsSelect");
const CLIP_ASSET_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT = document.getElementById("clipAssetRelatedContentsContentDefinitionsSelect");
const CLIP_ASSET_RELATED_CONTENTS_SELECT = document.getElementById("clipAssetRelatedContentsSelect");
const CREATE_ANNOTATION_COUNTRY_SELECT = document.getElementById("createAnnotationCountrySelect");
const CREATE_ASSET_AD_BREAK_LABELS_SELECT = document.getElementById("createAssetAdBreakLabelsSelect");
const CREATE_ASSET_AD_BREAK_TAGS_SELECT = document.getElementById("createAssetAdBreakTagsSelect");
const RECORDS_ASSET_TRACKING_BEACON_LIVE_CHANNEL_SELECT = document.getElementById("recordsAssetTrackingBeaconLiveChannelSelect");
const REGISTER_ASSET_COLLECTIONS_SELECT = document.getElementById("registerAssetCollectionsSelect");
const REGISTER_ASSET_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT = document.getElementById("registerAssetRelatedContentsContentDefinitionsSelect");
const REGISTER_ASSET_RELATED_CONTENTS_SELECT = document.getElementById("registerAssetRelatedContentsSelect");
const REGISTER_ASSET_TAGS_SELECT = document.getElementById("registerAssetTagsSelect");
const UPDATE_ANNOTATION_COUNTRY_SELECT = document.getElementById("updateAnnotationCountrySelect");
const UPDATE_ASSET_AD_BREAK_LABELS_SELECT = document.getElementById("updateAssetAdBreakLabelsSelect");
const UPDATE_ASSET_AD_BREAK_TAGS_SELECT = document.getElementById("updateAssetAdBreakTagsSelect");
const UPDATE_ASSET_LANGUAGE_SELECT = document.getElementById("updateAssetLanguageSelect");

await getContentDefinitions();

async function getContentDefinitions()
{
    const CONTENT_DEFINITIONS = await sendRequest("/get-content-definition-list", "GET");

    if (CONTENT_DEFINITIONS)
    {
        for (let contentDefinition of CONTENT_DEFINITIONS)
        {
            const OPTION = document.createElement("option");
            OPTION.value = contentDefinition.contentDefinitionId;
            OPTION.textContent = contentDefinition.properties.title;
            BUILD_MEDIA_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT.appendChild(OPTION);
            CLIP_ASSET_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT.appendChild(OPTION.cloneNode(true));
            REGISTER_ASSET_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT.appendChild(OPTION.cloneNode(true));
        }

        $(BUILD_MEDIA_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT).select2();
        $(CLIP_ASSET_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT).select2();
        $(REGISTER_ASSET_RELATED_CONTENTS_CONTENT_DEFINITIONS_SELECT).select2();
    }
}

await getCollectionList();

async function getCollectionList()
{
    const COLLECTION_LIST = await sendRequest("/get-collection-list", "GET");

    if (COLLECTION_LIST)
    {
        for(let collectionIdx = 0; collectionIdx < COLLECTION_LIST.length; ++collectionIdx)
        {
            let option = document.createElement("option");
            option.value = COLLECTION_LIST[collectionIdx].id;
            option.text = COLLECTION_LIST[collectionIdx].title;
            BUILD_MEDIA_COLLECTIONS_SELECT.appendChild(option);
            CLIP_ASSET_COLLECTIONS_SELECT.appendChild(option.cloneNode(true));
            REGISTER_ASSET_COLLECTIONS_SELECT.appendChild(option.cloneNode(true));
        }

        $(BUILD_MEDIA_COLLECTIONS_SELECT).select2();
        $(CLIP_ASSET_COLLECTIONS_SELECT).select2();
        $(REGISTER_ASSET_COLLECTIONS_SELECT).select2();
    }
}

await getCountryList();

async function getCountryList()
{
    const COUNTRY_LIST = await sendRequest("/get-country-list", "GET");

    if (COUNTRY_LIST)
    {
        for(let countryIdx = 0; countryIdx < COUNTRY_LIST.length; ++countryIdx)
        {
            let option = document.createElement("option");
            option.value = COUNTRY_LIST[countryIdx].id;
            option.text = COUNTRY_LIST[countryIdx].label;
            CREATE_ANNOTATION_COUNTRY_SELECT.appendChild(option);
            UPDATE_ANNOTATION_COUNTRY_SELECT.appendChild(option.cloneNode(true));
        }

        $(CREATE_ANNOTATION_COUNTRY_SELECT).select2();
        $(UPDATE_ANNOTATION_COUNTRY_SELECT).select2();
    }
}

await getLabelList();

async function getLabelList()
{
    const LABEL_LIST = await sendRequest("/get-label-list", "GET");

    if (LABEL_LIST)
    {
        for(let labelIdx = 0; labelIdx < LABEL_LIST.length; ++labelIdx)
        {
            let option = document.createElement("option");
            option.value = LABEL_LIST[labelIdx].id;
            option.text = LABEL_LIST[labelIdx].title;
            CREATE_ASSET_AD_BREAK_LABELS_SELECT.appendChild(option);
            UPDATE_ASSET_AD_BREAK_LABELS_SELECT.appendChild(option.cloneNode(true));
        }

        $(CREATE_ASSET_AD_BREAK_LABELS_SELECT).select2();
        $(UPDATE_ASSET_AD_BREAK_LABELS_SELECT).select2();
    }
}

await getLanguageList();

async function getLanguageList()
{
    const LANGUAGE_LIST = await sendRequest("/get-language-list", "GET");

    if (LANGUAGE_LIST)
    {
        for(let languageIdx = 0; languageIdx < LANGUAGE_LIST.length; ++languageIdx)
        {
            let option = document.createElement("option");
            option.value = LANGUAGE_LIST[languageIdx].id;
            option.text = LANGUAGE_LIST[languageIdx].title;
            UPDATE_ASSET_LANGUAGE_SELECT.appendChild(option);
        }

        $(UPDATE_ASSET_LANGUAGE_SELECT).select2();
    }
}

await getLiveChannels();

async function getLiveChannels()
{
    const LIVE_CHANNELS = await sendRequest("/get-live-channel-list", "GET");

    if (LIVE_CHANNELS)
    {
        for (let liveChannel of LIVE_CHANNELS)
        {
            const OPTION = document.createElement("option");
            OPTION.value = liveChannel.id;
            OPTION.textContent = liveChannel.name;
            RECORDS_ASSET_TRACKING_BEACON_LIVE_CHANNEL_SELECT.appendChild(OPTION);
        }

        $(RECORDS_ASSET_TRACKING_BEACON_LIVE_CHANNEL_SELECT).select2();
    }
}

await getTagList();

async function getTagList()
{
    const TAG_LIST = await sendRequest("/get-tag-list", "GET");

    if (TAG_LIST)
    {
        for(let tagIdx = 0; tagIdx < TAG_LIST.length; ++tagIdx)
        {
            let option = document.createElement("option");
            option.value = TAG_LIST[tagIdx].id;
            option.text = TAG_LIST[tagIdx].title;
            BUILD_MEDIA_TAGS_SELECT.appendChild(option);
            CLIP_ASSET_TAGS_SELECT.appendChild(option.cloneNode(true));
            CREATE_ASSET_AD_BREAK_TAGS_SELECT.appendChild(option.cloneNode(true));
            REGISTER_ASSET_TAGS_SELECT.appendChild(option.cloneNode(true));
            UPDATE_ASSET_AD_BREAK_TAGS_SELECT.appendChild(option.cloneNode(true));
        }

        $(BUILD_MEDIA_TAGS_SELECT).select2();
        $(CLIP_ASSET_TAGS_SELECT).select2();
        $(CREATE_ASSET_AD_BREAK_TAGS_SELECT).select2();
        $(REGISTER_ASSET_TAGS_SELECT).select2();
        $(UPDATE_ASSET_AD_BREAK_TAGS_SELECT).select2();
    }
}

$("#buildMediaRelatedContentsContentDefinitionsSelect").on("select2:select", async function(event)
{
    await populateRelatedContentSelect(event.params.data.id, BUILD_MEDIA_RELATED_CONTENTS_SELECT);
});

$("#clipAssetRelatedContentsContentDefinitionsSelect").on("select2:select", async function(event)
{
    await populateRelatedContentSelect(event.params.data.id, CLIP_ASSET_RELATED_CONTENTS_SELECT);
});

ARCHIVE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(ARCHIVE_ASSET_FORM);

    console.log(await sendRequest("/archive-asset", "POST", FORM_DATA));
});

BATCH_ACTION_ADD_ACTION_ARGUMENT_BUTTON.addEventListener('click', function() 
{
    createAddButtonElements(["Argument Key", "Argument Value"], 
        ["argumentKey", "argumentValue"], BATCH_ACTION_ACTION_ARGUMENTS_DIV);
});

BATCH_ACTION_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(BATCH_ACTION_FORM);

    console.log(await sendRequest("/batch-action", "POST", FORM_DATA));
});

BUILD_MEDIA_ADD_SOURCE_BUTTON.addEventListener('click', function()
{
    createAddButtonElements(["Source Asset Id", "Start Time Code", "End Time Code"], 
        ["sourceAssetId", "startTimeCode", "endTimeCode"], BUILD_MEDIA_SOURCES_DIV);
});

BUILD_MEDIA_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(BUILD_MEDIA_FORM);

    console.log(await sendRequest("/build-media", "POST", FORM_DATA));
});

CLIP_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(CLIP_ASSET_FORM);

    console.log(await sendRequest("/clip-asset", "POST", FORM_DATA));
});

COPY_ASSET_ADD_ACTION_ARGUMENT_BUTTON.addEventListener('click', function()
{
    createAddButtonElements(["Argument Key", "Argument Value"], 
        ["argumentKey", "argumentValue"], COPY_ASSET_ACTION_ARGUMENTS_DIV);
});

COPY_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(COPY_ASSET_FORM);

    console.log(await sendRequest("/copy-asset", "POST", FORM_DATA));
});

CREATE_ANNOTATION_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_ANNOTATION_FORM);

    console.log(await sendRequest("/create-annotation", "POST", FORM_DATA));
});

CREATE_ASSET_AD_BREAK_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_ASSET_AD_BREAK_FORM);

    console.log(await sendRequest("/create-asset-ad-break", "POST", FORM_DATA));
});

CREATE_FOLDER_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_FOLDER_ASSET_FORM);

    console.log(await sendRequest("/create-folder-asset", "POST", FORM_DATA));
});

CREATE_PLACEHOLDER_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_PLACEHOLDER_ASSET_FORM);

    console.log(await sendRequest("/create-placeholder-asset", "POST", FORM_DATA));
});

CREATE_SCREENSHOT_AT_TIMECODE_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_SCREENSHOT_AT_TIMECODE_FORM);

    console.log(await sendRequest("/create-screenshot-at-timecode", "POST", FORM_DATA));
});

DELETE_ANNOTATION_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_ANNOTATION_FORM);

    await sendRequest("/delete-annotation", "DELETE", FORM_DATA);
});

DELETE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_ASSET_FORM);

    await sendRequest("/delete-asset", "DELETE", FORM_DATA);
});

DELETE_ASSET_AD_BREAK_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_ASSET_AD_BREAK_FORM);

    await sendRequest("/delete-asset-ad-break", "DELETE", FORM_DATA);
});

DOWNLOAD_ARCHIVE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(DOWNLOAD_ARCHIVE_ASSET_FORM);

    console.log(await sendRequest("/download-archive-asset", "POST", FORM_DATA));
});

DUPLICATE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(DUPLICATE_ASSET_FORM);

    console.log(await sendRequest("/duplicate-asset", "POST", FORM_DATA));
});

GET_ANNOTATIONS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ANNOTATIONS_FORM);

    console.log(await sendRequest("/get-annotations", "POST", FORM_DATA));
});

GET_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ASSET_FORM);

    console.log(await sendRequest("/get-asset", "POST", FORM_DATA));
});

GET_ASSET_AD_BREAKS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ASSET_AD_BREAKS_FORM);

    console.log(await sendRequest("/get-asset-ad-breaks", "POST", FORM_DATA));
});

GET_ASSET_CHILD_NODES_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ASSET_CHILD_NODES_FORM);

    console.log(await sendRequest("/get-asset-child-nodes", "POST", FORM_DATA));
});

GET_ASSET_DETAILS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ASSET_DETAILS_FORM);

    console.log(await sendRequest("/get-asset-details", "POST", FORM_DATA));
});

GET_ASSET_MANIFEST_WITH_COOKIES_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ASSET_MANIFEST_WITH_COOKIES_FORM);

    console.log(await sendRequest("/get-asset-manifest-with-cookies", "POST", FORM_DATA));
});

GET_ASSET_METADATA_SUMMARY_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ASSET_METADATA_SUMMARY_FORM);

    console.log(await sendRequest("/get-asset-metadata-summary", "POST", FORM_DATA));
});

GET_ASSET_PARENT_FOLDERS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ASSET_PARENT_FOLDERS_FORM);

    console.log(await sendRequest("/get-asset-parent-folders", "POST", FORM_DATA));
});

GET_ASSET_SCREENSHOT_DETAILS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ASSET_SCREENSHOT_DETAILS_FORM);

    console.log(await sendRequest("/get-asset-screenshot-details", "POST", FORM_DATA));
});

GET_ASSET_SEGMENT_DETAILS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_ASSET_SEGMENT_DETAILS_FORM);

    console.log(await sendRequest("/get-asset-segment-details", "POST", FORM_DATA));
});

GET_USER_UPLOAD_PARTS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_USER_UPLOAD_PARTS_FORM);

    console.log(await sendRequest("/get-user-upload-parts", "POST", FORM_DATA));
});

GET_USER_UPLOADS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_USER_UPLOADS_FORM);

    console.log(await sendRequest("/get-user-uploads", "POST", FORM_DATA));
});

IMPORT_ANNOTATIONS_ADD_ANNOTATION_BUTTON.addEventListener('click', function()
{
    createAddButtonElements(["Start Time Code", "End Time Code"], 
        ["startTimeCode", "endTimeCode"], IMPORT_ANNOTATIONS_DIV);
});

IMPORT_ANNOTATIONS_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(IMPORT_ANNOTATIONS_FORM);

    await sendRequest("/import-annotations", "POST", FORM_DATA);
});

INDEX_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(INDEX_ASSET_FORM);

    console.log(await sendRequest("/index-asset", "POST", FORM_DATA));
});

LOCAL_RESTORE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(LOCAL_RESTORE_ASSET_FORM);

    console.log(await sendRequest("/local-restore-asset", "POST", FORM_DATA));
});

MOVE_ASSET_ADD_ACTION_ARGUMENT_BUTTON.addEventListener('click', function()
{
    createAddButtonElements(["Argument Key", "Argument Value"], 
        ["argumentKey", "argumentValue"], MOVE_ASSET_ACTION_ARGUMENTS_DIV);
});

MOVE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(MOVE_ASSET_FORM);

    console.log(await sendRequest("/move-asset", "POST", FORM_DATA));
});

RECORDS_ASSET_TRACKING_BEACON_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(RECORDS_ASSET_TRACKING_BEACON_FORM);

    console.log(await sendRequest("/record-asset-tracking-beacon", "POST", FORM_DATA));
});

$("#registerAssetRelatedContentsContentDefinitionsSelect").on("select2:select", async function(event)
{
    await populateRelatedContentSelect(event.params.data.id, REGISTER_ASSET_RELATED_CONTENTS_SELECT);
});

REGISTER_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(REGISTER_ASSET_FORM);

    console.log(await sendRequest("/register-asset", "POST", FORM_DATA));
});

REPROCESS_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(REPROCESS_ASSET_FORM);

    console.log(await sendRequest("/reprocess-asset", "POST", FORM_DATA));
});

RESTORE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(RESTORE_ASSET_FORM);

    console.log(await sendRequest("/restore-asset", "POST", FORM_DATA));
});

SHARE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(SHARE_ASSET_FORM);

    console.log(await sendRequest("/share-asset", "POST", FORM_DATA));
});

START_WORKFLOW_ADD_ACTION_ARGUMENT_BUTTON.addEventListener('click', function()
{
    createAddButtonElements(["Argument Key", "Argument Value"], 
        ["argumentKey", "argumentValue"], START_WORKFLOW_ACTION_ARGUMENTS_DIV);
});

START_WORKFLOW_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(START_WORKFLOW_FORM);

    console.log(await sendRequest("/start-workflow", "POST", FORM_DATA));
});

TRANSCRIBE_ASSET_ADD_TRANSCRIPT_BUTTON.addEventListener('click', function()
{
    createAddButtonElements(["Start Time Code", "Content"], 
        ["startTimeCode", "content"], TRANSCRIBE_ASSET_DIV, ["time", "text"]);
});

TRANSCRIBE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(TRANSCRIBE_ASSET_FORM);

    console.log(await sendRequest("/transcribe-asset", "POST", FORM_DATA));
});

UPDATE_ANNOTATION_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_ANNOTATION_FORM);

    console.log(await sendRequest("/update-annotation", "PUT", FORM_DATA));
});

UPDATE_ASSET_ADD_CUSTOM_PROPERTY_BUTTON.addEventListener('click', function()
{
    createAddButtonElements(["Property Key", "Property Value"],
        ["propertyKey", "propertyValue"], UPDATE_ASSET_CUSTOM_PROPERTIES_DIV);
});

UPDATE_ASSET_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_ASSET_FORM);

    console.log(await sendRequest("/update-asset", "PATCH", FORM_DATA));
});

UPDATE_ASSET_AD_BREAK_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_ASSET_AD_BREAK_FORM);

    console.log(await sendRequest("/update-asset-ad-break", "PUT", FORM_DATA));
});

UPDATE_ASSET_LANGUAGE_FORM.addEventListener("submit", async (event) =>
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_ASSET_LANGUAGE_FORM);

    console.log(await sendRequest("/update-asset-language", "PUT", FORM_DATA));
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

function createAddButtonElements(LABELS, INPUT_NAMES, DIV, TYPES) {
    const ELEMENTS = [];

    let types = (TYPES === undefined) ? new Array(LABELS.length).fill("text") : TYPES;

    for (let elementIdx = 0; elementIdx < LABELS.length; ++elementIdx) 
    {
        const label = document.createElement("label");
        label.textContent = LABELS[elementIdx];

        const input = document.createElement("input");
        input.type = types[elementIdx];
        input.name = INPUT_NAMES[elementIdx];

        const br = document.createElement('br');

        ELEMENTS.push(label, input, br);

        DIV.appendChild(label);
        DIV.appendChild(input);
        DIV.appendChild(br);
    }

    const REMOVE_BUTTON = document.createElement('button');
    REMOVE_BUTTON.textContent = 'Remove';

    const BR = document.createElement('br');

    REMOVE_BUTTON.addEventListener('click', function() {
        ELEMENTS.forEach(ELEMENT => DIV.removeChild(ELEMENT));
        DIV.removeChild(BR);
        DIV.removeChild(REMOVE_BUTTON);
    });

    DIV.appendChild(BR);
    DIV.appendChild(REMOVE_BUTTON);
}

async function populateRelatedContentSelect(CONTENT_DEFINITION_ID, RELATED_CONTENTS_SELECT)
{
    const FORM_DATA = new FormData();
    FORM_DATA.append("contentDefinitionId", CONTENT_DEFINITION_ID);
    const RELATED_CONTENT_LIST = await sendRequest("/get-related-content-list", "POST", FORM_DATA);

    RELATED_CONTENTS_SELECT.innerHTML = "";

    for(let relatedContentIdx = 0; relatedContentIdx < RELATED_CONTENT_LIST.length; ++relatedContentIdx)
    {
        let option = document.createElement("option");
        option.value = RELATED_CONTENT_LIST[relatedContentIdx].id;
        option.text = RELATED_CONTENT_LIST[relatedContentIdx].title;
        RELATED_CONTENTS_SELECT.appendChild(option);
    }

    $(RELATED_CONTENTS_SELECT).select2();
}