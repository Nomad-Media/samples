import createVideoTrackingJob from "./video-compare/create-video-tracking-job.js";
import deleteVideoTrackingJob from "./video-compare/delete-video-tracking-job.js";
import getManifestChannelGroup from "./video-compare/get-channel-frame-manifest.js";
import getListCurrentVideoTrackingJobs from "./video-compare/get-list-current-tracking-jobs.js";
import getSpecificVideoTrackingJobManifets from "./video-compare/get-specific-video-tracking-job-manifest.js";
import getSpecificVideoTrackingJob from "./video-compare/get-specific-video-tracking-job.js";
import getVideoTrackingAlert from "./video-compare/get-video-tracking-alert.js";
import stopVideoTrackingJob from "./video-compare/stop-video-tracking-job.js";

const AUTH_FORM = document.getElementById("authForm");
const GET_LIST_FORM = document.getElementById("getListForm");
const CREATE_VIDEO_TRACKING_JOB_FORM = document.getElementById("createVideoTrackingJobForm");
const GET_JOB_FORM = document.getElementById("getJobForm");
const GET_ALERT_FORM = document.getElementById("getAlertForm");
const GET_CHANNEL_FRAME_MANIFEST_FORM = document.getElementById("getChannelFrameManifestForm");
const STOP_JOB_FORM = document.getElementById("stopJobForm");
const DELETE_JOB_FORM = document.getElementById("deleteJobForm");
const GET_VIDEO_MANIFEST_FORM = document.getElementById("getVideoManifestForm");

const TOKEN_INPUT = document.getElementById("authInput");
const CREATE_JOB_EXTERNAL_ID_INPUT = document.getElementById("createJobExternalIdInput");
const CREATE_JOB_PROGRAM_START_DT_UTC_INPUT = document.getElementById("createJobProgramStartDtUtcInput");
const CREATE_JOB_PROGRAM_END_DT_UTC_INPUT = document.getElementById("createJobProgramEndDtUtcInput");
const CREATE_JOB_PROGRAM_NAME_INPUT = document.getElementById("createJobProgramNameInput");
const GET_SPECIFIC_VIDEO_EXTERNAL_ID_INPUT = document.getElementById("getSpecificVideoExternalIdInput");
const GET_ALERT_EXTERNAL_ID_INPUT = document.getElementById("getAlertExternalIdInput");
const GET_MANIFEST_TRACKING_ID_INPUT = document.getElementById("getManifestTrackingIdInput");
const GET_MANIFEST_FRAME_DT_UTC_INPUT = document.getElementById("getManifestFrameDtUtcInput");
const STOP_JOB_EXTERNAL_ID_INPUT = document.getElementById("stopJobExternalIdInput");
const DELETE_JOB_EXTERNAL_ID_INPUT = document.getElementById("deleteJobExternalIdInput");
const GET_VIDEO_MANIFEST_VIDEO_TRACKING_ID_INPUT = document.getElementById("getVideoManifestVideoTrackingIdInput");

const CREATE_JOB_CHANNEL_GROUP_DIV = document.getElementById("createJobChannelGroupDiv");
const CREATE_JOB_DEFAULT_THRESHOLD_INFOS_DIV = document.getElementById("createJobDefaultThresholdInfosDiv");


const CREATE_JOB_ADD_CHANNEL_GROUP_BUTTON = document.getElementById("createJobAddChannelGroupButton");
const CREATE_JOB_ADD_DEFAULT_THRESHOLD_INFOS_BUTTON = document.getElementById("createJobAddDefaultThresholdInfosButton");


AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

CREATE_JOB_ADD_CHANNEL_GROUP_BUTTON.addEventListener("click", function (event)
{
    event.preventDefault();

    let primaryUdpMulticastIpAddressLabel = document.createElement("label");
    primaryUdpMulticastIpAddressLabel.setAttribute("for", "primaryUdpMulticastIpAddressInput");
    primaryUdpMulticastIpAddressLabel.textContent = "Primary Udp Multicast Ip Address:";

    let primaryUdpMulticastIpAddressInput = document.createElement("input");
    primaryUdpMulticastIpAddressInput.setAttribute("type", "jobChannelGroup");
    primaryUdpMulticastIpAddressInput.setAttribute("name", "primaryUdpMulticastIpAddressInput");
    primaryUdpMulticastIpAddressInput.required = true;

    let primaryUdpPortLabel = document.createElement("label");
    primaryUdpPortLabel.setAttribute("for", "primaryUdpPortLabel");
    primaryUdpPortLabel.textContent = "Primary Udp Port:";
    
    let primaryUdpPortInput = document.createElement("input");
    primaryUdpPortInput.setAttribute("type", "jobChannelGroup");
    primaryUdpPortInput.setAttribute("name", "primaryUdpPortInput");
    primaryUdpPortInput.required = true;

    let backupUdpMulticastIpAddressLabel = document.createElement("label");
    backupUdpMulticastIpAddressLabel.setAttribute("for", "backupUdpMulticastIpAddressLabel");
    backupUdpMulticastIpAddressLabel.textContent = "Backup Udp Multicast Ip Address:";
    
    let backupUdpMulticastIpAddressInput = document.createElement("input");
    backupUdpMulticastIpAddressInput.setAttribute("type", "jobChannelGroup");
    backupUdpMulticastIpAddressInput.setAttribute("name", "backupUdpMulticastIpAddressInput");
    backupUdpMulticastIpAddressInput.required = true;

    let backupUdpPortLabel = document.createElement("label");
    backupUdpPortLabel.setAttribute("for", "backupUdpPortLabel");
    backupUdpPortLabel.textContent = "Backup Udp Port:";
    
    let backupUdpPortInput = document.createElement("input");
    backupUdpPortInput.setAttribute("type", "jobChannelGroup");
    backupUdpPortInput.setAttribute("name", "backupUdpPortInput");
    backupUdpPortInput.required = true;

    let channelNameLabel = document.createElement("label");
    channelNameLabel.setAttribute("for", "channelNameLabel");
    channelNameLabel.textContent = "Channel Name:";
    
    let channelNameInput = document.createElement("input");
    channelNameInput.setAttribute("type", "jobChannelGroup");
    channelNameInput.setAttribute("name", "channelNameInput");
    channelNameInput.required = true;

    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(primaryUdpMulticastIpAddressLabel);
    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(primaryUdpMulticastIpAddressInput);
    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(primaryUdpPortLabel);
    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(primaryUdpPortInput);
    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(backupUdpMulticastIpAddressLabel);
    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(backupUdpMulticastIpAddressInput);
    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(backupUdpPortLabel);
    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(backupUdpPortInput);
    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(channelNameLabel);
    CREATE_JOB_CHANNEL_GROUP_DIV.appendChild(channelNameInput);
});

CREATE_JOB_ADD_DEFAULT_THRESHOLD_INFOS_BUTTON.addEventListener("click", function (event)
{
    event.preventDefault();

    let thresholdKeyLabel = document.createElement("label");
    thresholdKeyLabel.setAttribute("for", "thresholdKeyLabel");
    thresholdKeyLabel.textContent = "Key:";
    
    let thresholdKeyInput = document.createElement("input");
    thresholdKeyInput.setAttribute("type", "jobThreshold");
    thresholdKeyInput.setAttribute("name", "thresholdKeyInput");
    thresholdKeyInput.required = true;

    CREATE_JOB_DEFAULT_THRESHOLD_INFOS_DIV.appendChild(thresholdKeyLabel);
    CREATE_JOB_DEFAULT_THRESHOLD_INFOS_DIV.appendChild(thresholdKeyInput);
});

GET_LIST_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    getListCurrentVideoTrackingJobsMain();
});

CREATE_VIDEO_TRACKING_JOB_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    let createJobExternalId = CREATE_JOB_EXTERNAL_ID_INPUT.value;
    let createJobProgramStartDtUtc = CREATE_JOB_PROGRAM_START_DT_UTC_INPUT.value;
    let createJobProgramEndDtUtc = CREATE_JOB_PROGRAM_END_DT_UTC_INPUT.value;
    let createJobProgramName = CREATE_JOB_PROGRAM_NAME_INPUT.value;

    createVideoTrackingJobMain(document.querySelectorAll('input[type="jobChannelGroup"]'), document.querySelectorAll('input[type="jobThreshold"]'), createJobExternalId, createJobProgramStartDtUtc, createJobProgramEndDtUtc, createJobProgramName);
});

GET_JOB_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    let getSpecificVideoExternalId = GET_SPECIFIC_VIDEO_EXTERNAL_ID_INPUT.value;

    getSpecificVideoTrackingJobMain(getSpecificVideoExternalId);
});

GET_ALERT_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    let getAlertExternalId = GET_ALERT_EXTERNAL_ID_INPUT.value;

    getVideoTrackingAlertMain(getAlertExternalId);
});

GET_CHANNEL_FRAME_MANIFEST_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    let getManifestTrackingId = GET_MANIFEST_TRACKING_ID_INPUT.value;
    let getManifestFrameDtUtc = GET_MANIFEST_FRAME_DT_UTC_INPUT.value;

    getManifestChannelGroupMain(getManifestTrackingId, getManifestFrameDtUtc);
});

STOP_JOB_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    let stopJobExternalId = STOP_JOB_EXTERNAL_ID_INPUT.value;

    stopVideoTrackingJobMain(stopJobExternalId);
});

DELETE_JOB_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    let deleteJobExternalId = DELETE_JOB_EXTERNAL_ID_INPUT.value;

    deleteVideoTrackingJobMain(deleteJobExternalId);
});


GET_VIDEO_MANIFEST_FORM.addEventListener("submit", function(event)
{
    event.preventDefault();

    let getVideoManifestVideoTrackingId = GET_VIDEO_MANIFEST_VIDEO_TRACKING_ID_INPUT.value;

    getSpecificVideoTrackingJobManifetsMain(getVideoManifestVideoTrackingId);
});

async function getListCurrentVideoTrackingJobsMain()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    
    try
    {
        console.log("Getting list of current video tracking jobs");
        const INFO = await getListCurrentVideoTrackingJobs(sessionStorage.getItem("token"));
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }

}

async function createVideoTrackingJobMain(CHANNEL_GROUPS, DEFAULT_THRESHOLD_INFOS, EXTERNAL_ID, PROGRAM_START_DT_UTC, PROGRAM_END_DT_UTC, PROGRAM_NAME, CHANNEL_GROUP)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    
    try
    {
        const CHANNEL_GROUPS_ARR = [];
        let channelGroupMap = {};
        
        CHANNEL_GROUPS.forEach(function (channelGroup)
        {
            switch(channelGroup.name)
            {
                case "primaryUdpMulticastIpAddressInput":
                    channelGroupMap.primaryUdpMulticastIpAddress = channelGroup.value;
                    break;
                case "primaryUdpPortInput":
                    channelGroupMap.primaryUdpPort = channelGroup.value;
                    break;
                case "backupUdpMulticastIpAddressInput":
                    channelGroupMap.backupUdpMulticastIpAddress = channelGroup.value;
                    break;
                case "backupUdpPortInput":
                    channelGroupMap.backupUdpPort = channelGroup.value;
                    break;
                case "channelNameInput":
                    channelGroupMap.channelName = channelGroup.value;
                    CHANNEL_GROUPS_ARR.push(channelGroupMap);
                    channelGroupMap = {};
                    break;
                default:
                    console.log(channelGroup);
                    break;
            }
        });

        const DEFAULT_THRESHOLD_INFOS_MAP = {};
        let keyCount = 0;

        DEFAULT_THRESHOLD_INFOS.forEach(function (defaultThreshold)
        {
            ++keyCount;
            DEFAULT_THRESHOLD_INFOS_MAP[`thresholdKey${keyCount}`] = defaultThreshold.value;
        });
    
        console.log("Creating video tracking job");
        const INFO = await createVideoTrackingJob(sessionStorage.getItem("token"), CHANNEL_GROUPS_ARR, DEFAULT_THRESHOLD_INFOS_MAP, EXTERNAL_ID, PROGRAM_START_DT_UTC, PROGRAM_END_DT_UTC, PROGRAM_NAME);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }

}

async function getSpecificVideoTrackingJobMain(GET_SPECIFIC_VIDEO_EXTERNAL_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    
    try
    {
        console.log("Getting specific video tracking job");
        const INFO = await getSpecificVideoTrackingJob(sessionStorage.getItem("token"), GET_SPECIFIC_VIDEO_EXTERNAL_ID);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }

}

async function getVideoTrackingAlertMain(GET_ALERT_EXTERNAL_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    
    try
    {
        console.log("Get video tracking alert main");
        const INFO = await getVideoTrackingAlert(sessionStorage.getItem("token"), GET_ALERT_EXTERNAL_ID);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }

}

async function getManifestChannelGroupMain(GET_MANIFEST_TRACKING_ID, GET_MANIFEST_FRAME_DT_UTC);
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    
    try
    {
        console.log("Getting manifest channel group");
        const INFO = await getManifestChannelGroup(sessionStorage.getItem("token"), GET_MANIFEST_TRACKING_ID, GET_MANIFEST_FRAME_DT_UTC);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }

}

async function stopVideoTrackingJobMain(STOP_JOB_EXTERNAL_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    
    try
    {
        console.log("Stopping video tracking job");
        const INFO = await stopVideoTrackingJob(sessionStorage.getItem("token"), STOP_JOB_EXTERNAL_ID);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }

}

async function deleteVideoTrackingJobMain(DELETE_JOB_EXTERNAL_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    
    try
    {
        console.log("Deleting video tracking job");
        const INFO = await deleteVideoTrackingJob(sessionStorage.getItem("token"), DELETE_JOB_EXTERNAL_ID);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }

}

async function getSpecificVideoTrackingJobManifetsMain(GET_VIDEO_MANIFEST_VIDEO_TRACKING_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    
    try
    {
        console.log("Getting specific video tracking job's manifests");
        const INFO = await getSpecificVideoTrackingJob(sessionStorage.getItem("token"), GET_VIDEO_MANIFEST_VIDEO_TRACKING_ID);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }

}

