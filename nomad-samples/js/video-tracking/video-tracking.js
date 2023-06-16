import getVideoTrackingService from "./video-tracking/video-tracking.js";

const AUTH_FORM = document.getElementById("authForm");
const VIDEO_TRACKING_FORM = document.getElementById("videoTrackingForm");

const TOKEN_INPUT = document.getElementById("authInput");
const ASSET_ID_INPUT = document.getElementById("assetIdInput");
const TRACKING_EVENT_INPUT = document.getElementById("trackingEventInput");
const SECOND_INPUT = document.getElementById("secondInput");

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

VIDEO_TRACKING_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let assetId = ASSET_ID_INPUT.value;
    let trackingEvent = TRACKING_EVENT_INPUT.value;
    let second = SECOND_INPUT.value;

    getVideoTrackingServiceMain(assetId, trackingEvent, second);
});

async function getVideoTrackingServiceMain(ASSET_ID, TRACKING_EVENT, SECOND)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Getting video tracking service");
        await getVideoTrackingService(sessionStorage.getItem("token"), ASSET_ID, TRACKING_EVENT, SECOND);
        console.log("Success");
    }
    catch (error)
    {
        throw new Error(error);
    }
}