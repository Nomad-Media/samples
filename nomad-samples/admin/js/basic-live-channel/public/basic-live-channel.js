const GET_CHANNELS_FORM = document.getElementById("getChannelsForm");
const GET_CHANNEL_FORM = document.getElementById("getChannelForm");
const CREATE_CHANNEL_FORM = document.getElementById("createChannelForm");
const UPDATE_CHANNEL_FORM = document.getElementById("updateChannelForm");
const ADD_ASSET_SCHEDULE_EVENT_FORM = document.getElementById("addAssetScheduleEventForm");
const REMOVE_ASSET_SCHEDULE_EVENT_FORM = document.getElementById("removeAssetScheduleEventForm");
const GET_INPUTS_FORM = document.getElementById("getInputsForm");
const GET_INPUT_FORM = document.getElementById("getInputForm");
const CREATE_INPUT_FORM = document.getElementById("createInputForm");
const UPDATE_INPUT_FORM = document.getElementById("updateInputForm");
const ADD_INPUT_SCHEDULE_EVENT_FORM = document.getElementById("addInputScheduleEventForm");
const REMOVE_INPUT_SCHEDULE_EVENT_FORM = document.getElementById("removeInputScheduleEventForm");
const START_CHANNEL_FORM = document.getElementById("startChannelForm");
const STOP_CHANNEL_FORM = document.getElementById("stopChannelForm");
const DELETE_CHANNEL_FORM = document.getElementById("deleteChannelForm");
const DELETE_INPUT_FORM = document.getElementById("deleteInputForm");
const GET_OPERATORS_FORM = document.getElementById("getOperatorsForm");
const GET_OPERATOR_FORM = document.getElementById("getOperatorForm");
const START_BROADCAST_FORM = document.getElementById("startBroadcastForm");
const CANCEL_BROADCAST_FORM = document.getElementById("cancelBroadcastForm");
const STOP_BROADCAST_FORM = document.getElementById("stopBroadcastForm");
const GET_COMPLETED_SEGMENTS_FORM = document.getElementById("getCompletedSegmentsForm");
const START_SEGMENT_FORM = document.getElementById("startSegmentForm");
const CANCEL_SEGMENT_FORM = document.getElementById("cancelSegmentForm");
const COMPLETE_SEGMENT_FORM = document.getElementById("completeSegmentForm");

const CREATE_CHANNEL_TYPE = document.getElementById("createChannelType");
const UPDATE_CHANNEL_TYPE = document.getElementById("updateChannelType");
const CREATE_INPUT_SOURCE_TYPE = document.getElementById("createInputSourceType");
const UPDATE_INPUT_SOURCE_TYPE = document.getElementById("updateInputSourceType");

const CREATE_CHANNEL_URL_DIV = document.getElementById("createChannelUrlDiv");
const UPDATE_CHANNEL_URL_DIV = document.getElementById("updateChannelUrlDiv");
const CREATE_INPUT_SOURCE_URL_DIV = document.getElementById("createSourceUrlDiv");
const CREATE_INPUT_SOURCES_DIV = document.getElementById("createInputSourcesDiv");
const UPDATE_INPUT_SOURCE_URL_DIV = document.getElementById("updateSourceUrlDiv");

const CREATE_INPUT_SOURCE_URL_LABEL = document.getElementById("createSourceUrlLabel");
const UPDATE_INPUT_SOURCE_URL_LABEL = document.getElementById("updateSourceUrlLabel");

const CREATE_INPUT_ADD_SOURCES_BUTTON = document.getElementById("createInputAddSourcesButton");

sessionStorage.clear();

GET_CHANNELS_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    console.log(await sendRequest("/getLiveChannels", "GET"));
});

GET_CHANNEL_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    
    const FORM_DATA = getElements(GET_CHANNEL_FORM);

    console.log(await sendRequest("/getLiveChannel", "POST", FORM_DATA));
});

CREATE_CHANNEL_TYPE.addEventListener("change", async function (event)
{
    event.preventDefault();

    let createChannelType = CREATE_CHANNEL_TYPE.value;
    CREATE_CHANNEL_URL_DIV.hidden = !(createChannelType === "External");
});

CREATE_CHANNEL_FORM.addEventListener("submit", async function (event) 
{
    event.preventDefault();
    
    const FORM_DATA = getElements(CREATE_CHANNEL_FORM);

    console.log(await sendRequest("/createLiveChannel", "POST", FORM_DATA));
});


UPDATE_CHANNEL_TYPE.addEventListener("change", async function (event)
{
    event.preventDefault();

    let channelType = UPDATE_CHANNEL_TYPE.value;
    UPDATE_CHANNEL_URL_DIV.hidden = !(channelType === "External");
});

UPDATE_CHANNEL_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_CHANNEL_FORM);

    console.log(await sendRequest("/updateLiveChannel", "POST", FORM_DATA));

});

GET_INPUTS_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    console.log(await sendRequest("/getLiveInputs", "GET"));
});

GET_INPUT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_INPUT_FORM);

    console.log(await sendRequest("/getLiveInput", "POST", FORM_DATA));
});

CREATE_INPUT_SOURCE_TYPE.addEventListener("change", async function (event) 
{
    event.preventDefault();

    let sourceType = CREATE_INPUT_SOURCE_TYPE.value;
    CREATE_INPUT_SOURCE_URL_DIV.hidden = !(sourceType !== "UDP_PUSH");

    if (sourceType === "RTMP_PUSH")
    {
        CREATE_INPUT_SOURCE_URL_LABEL.innerHTML = "Enter Source Video IP/CIDR Address<br>\
                                                   Please use the following format: ###.###.###.###/##";
    }
    else if (sourceType !== "UDP_PUSH")
    {
        CREATE_INPUT_SOURCE_URL_LABEL.innerHTML = "Enter Source Video URL<br>\
                                                   Must start with http or rtmp";
        
        CREATE_INPUT_SOURCES_DIV.hidden = sourceType === "RTMP_PULL";
    }
});

CREATE_INPUT_ADD_SOURCES_BUTTON.addEventListener("click", async function (event)
{
    event.preventDefault();

    let ipLabel = document.createElement("label");
    ipLabel.setAttribute("for", "ipInput");
    ipLabel.textContent = "Ip:";
    CREATE_INPUT_SOURCES_DIV.appendChild(ipLabel);

    let ipInput = document.createElement("input");
    ipInput.setAttribute("type", "createInputSources");
    ipInput.setAttribute("name", "ipInputName");
    CREATE_INPUT_SOURCES_DIV.appendChild(ipInput);

    let portLabel = document.createElement("label");
    portLabel.setAttribute("for", "portInput");
    portLabel.textContent = "Port:";
    CREATE_INPUT_SOURCES_DIV.appendChild(portLabel);

    let portInput = document.createElement("label");
    portInput.setAttribute("type", "createInputSources");
    portInput.setAttribute("name", "portInputName");
    CREATE_INPUT_SOURCES_DIV.appendChild(portInput);

    let urlLabel = document.createElement("label");
    urlLabel.setAttribute("for", "urlInput");
    urlLabel.textContent = "Url:";
    CREATE_INPUT_SOURCES_DIV.appendChild(urlLabel);

    let urlInput = document.createElement("input");
    urlInput.setAttribute("type", "createInputSources");
    urlInput.setAttribute("name", "urlInputName");
    CREATE_INPUT_SOURCES_DIV.appendChild(urlInput);
});

CREATE_INPUT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CREATE_INPUT_FORM);

    console.log(await sendRequest("/createLiveInput", "POST", FORM_DATA));
});

UPDATE_INPUT_SOURCE_TYPE.addEventListener("change", async function (event)
{
    event.preventDefault();

    let sourceType = UPDATE_INPUT_SOURCE_TYPE.value;
    UPDATE_INPUT_SOURCE_URL_DIV.hidden = !(sourceType !== "UDP_PUSH");

    if (sourceType === "RTMP_PUSH")
    {
        UPDATE_INPUT_SOURCE_URL_LABEL.innerHTML = "Enter Source Video IP/CIDR Address<br>\
                                                   Please use the following format: ###.###.###.###/##";
    }
    else if (sourceType !== "UDP_PUSH")
    {
        UPDATE_INPUT_SOURCE_URL_LABEL.innerHTML = "Enter Source Video URL<br>\
                                                   Must start with http or rtmp";
    }
});

UPDATE_INPUT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(UPDATE_FORM);

    console.log(await sendRequest("/updateLiveInput", "POST", FORM_DATA));
});

ADD_ASSET_SCHEDULE_EVENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_ASSET_SCHEDULE_EVENT_FORM);

    console.log(await sendRequest("/addAssetScheduleEvent", "POST", FORM_DATA));
});

REMOVE_ASSET_SCHEDULE_EVENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(REMOVE_ASSET_SCHEDULE_EVENT_FORM);

    console.log(await sendRequest("/removeAssetScheduleEvent", "POST", FORM_DATA));
});

ADD_INPUT_SCHEDULE_EVENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(ADD_INPUT_SCHEDULE_EVENT_FORM);

    console.log(await sendRequest("/addInputScheduleEvent", "POST", FORM_DATA));
});

REMOVE_INPUT_SCHEDULE_EVENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(REMOVE_INPUT_SCHEDULE_EVENT_FORM);

    console.log(await sendRequest("/removeInputScheduleEvent", "POST", FORM_DATA));
});

START_CHANNEL_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(START_CHANNEL_FORM);

    await sendRequest("/startLiveChannel", "POST", FORM_DATA);
});

STOP_CHANNEL_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(STOP_CHANNEL_FORM);

    await sendRequest("/stopLiveChannel", "POST", FORM_DATA);
});

DELETE_CHANNEL_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_CHANNEL_FORM);

    await sendRequest("/deleteLiveChannel", "POST", FORM_DATA);
});

DELETE_INPUT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(DELETE_INPUT_FORM);

    await sendRequest("/deleteLiveInput", "POST", FORM_DATA);
});

GET_OPERATORS_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    console.log(await sendRequest("/getLiveOperators", "GET"));
});

GET_OPERATOR_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_OPERATOR_FORM);

    console.log(await sendRequest("/getLiveOperator", "POST", FORM_DATA));
});

START_BROADCAST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(START_BROADCAST_FORM);

    await sendRequest("/startBroadcast", "POST", FORM_DATA);
});

CANCEL_BROADCAST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    let liveOperatorId = CANCEL_BROADCAST_CHANNEL_ID.value;

    cancelBroadcastMain(liveOperatorId);
});

STOP_BROADCAST_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(STOP_BROADCAST_FORM);

    await sendRequest("/stopBroadcast", "POST", FORM_DATA);
});

GET_COMPLETED_SEGMENTS_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(GET_COMPLETED_SEGMENTS_FORM);

    console.log(await sendRequest("/getCompletedSegments", "POST", FORM_DATA));
});

START_SEGMENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(START_SEGMENT_FORM);

    await sendRequest("/startSegment", "POST", FORM_DATA);
});

CANCEL_SEGMENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(CANCEL_SEGMENT_FORM);

    console.log(await sendRequest("/cancelSegment", "POST", FORM_DATA));
});

COMPLETE_SEGMENT_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();

    const FORM_DATA = getElements(COMPLETE_SEGMENT_FORM);

    await sendRequest("/completeSegment", "POST", FORM_DATA);
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