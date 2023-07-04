import multiThreadUpload from "./assets/multi-thread-upload.js";
import singleThreadUpload from "./assets/single-thread-upload.js";
import startUpload from "./assets/start-asset-upload.js";
import completeUpload from "./assets/upload-complete-asset.js";

const AUTH_FORM = document.getElementById("authForm");
const START_FORM = document.getElementById("startForm");

const TOKEN_INPUT = document.getElementById("authInput");
const NAME_INPUT = document.getElementById("nameInput");
const UPLOAD_OVERWRITE_OPTION_INPUT = document.getElementById("uploadOverwriteOptionInput");
const NOMAD_FILE_INPUT = document.getElementById("nomadFileInput");
const RELATED_CONTENT_ID_INPUT = document.getElementById("relatedContentIdInput");
const MULTI_THREAD = document.getElementById("nomadUploadType");

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

START_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    
    let name = NAME_INPUT.value;
    let uploadOverwriteOption = UPLOAD_OVERWRITE_OPTION_INPUT.value;
    let nomadFile = NOMAD_FILE_INPUT.files[0];
    let relatedContentId = RELATED_CONTENT_ID_INPUT.value;
    let multiThread = MULTI_THREAD.checked;

    uploadFile(name, uploadOverwriteOption, nomadFile, relatedContentId, multiThread);
});

async function uploadFile(NAME, UPLOAD_OVERWRITE_OPTION, FILE, RELATED_CONTENT_ID, MULTI_THREAD)
{
    const AUTH_TOKEN = sessionStorage.getItem("token")
    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    console.log("Starting asset upload");
    const RESPONSE = await startUpload(sessionStorage.getItem("token"), NAME, UPLOAD_OVERWRITE_OPTION, FILE, RELATED_CONTENT_ID);
    console.log(JSON.stringify(RESPONSE, null, 4));

    if (MULTI_THREAD === true) {
        await multiThreadUpload(AUTH_TOKEN, FILE, RESPONSE);
    } else {
        await singleThreadUpload(AUTH_TOKEN, FILE, RESPONSE);
    }

    completeUploadMain(RESPONSE.id);
}

async function completeUploadMain(ASSET_UPLOAD_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Uploading complete asset");
        const COMPLETE_INFO = await completeUpload(sessionStorage.getItem("token"), ASSET_UPLOAD_ID);
        console.log(JSON.stringify(COMPLETE_INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}