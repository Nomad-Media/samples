import startUpload from "./assets/start-asset-upload.js";
import uploadAssetPart from "./assets/upload-asset-part.js";
import completeUpload from "./assets/upload-complete-asset.js";

const AUTH_FORM = document.getElementById("authForm");
const START_FORM = document.getElementById("startForm");
const PART_FORM = document.getElementById("partForm");
const COMPLETE_FORM = document.getElementById("completeForm");

const TOKEN_INPUT = document.getElementById("authInput");
const PARENT_ID_INPUT = document.getElementById("paraneIdInput");
const CONTENT_LENGTH_INPUT = document.getElementById("contentLengthInput");
const UPLOAD_OVERWRITE_OPTION_INPUT = document.getElementById("uploadOverwriteOptionInput");
const CHUNK_SIZE_INPUT = document.getElementById("chunkSizeInput");
const RELATIVE_PATH_INPUT = document.getElementById("relativePathInput");
const LANGUAGE_ID_INPUT = document.getElementById("languageIdInput");
const PART_ID_INPUT = document.getElementById("partIdInput");
const ETAG_INPUT = document.getElementById("etagInput");
const ASSET_UPLOAD_ID_INPUT = document.getElementById("assetUploadIdInput");

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
    
    let parentId = PARENT_ID_INPUT.value;
    let contentLength = CONTENT_LENGTH_INPUT.value;
    let uploadOverwriteOption = UPLOAD_OVERWRITE_OPTION_INPUT.value;
    let chunkSize = CHUNK_SIZE_INPUT.value;
    let relativePath = RELATIVE_PATH_INPUT.value;
    let languageId = LANGUAGE_ID_INPUT.value;

    startUploadMain(parentId, contentLength, uploadOverwriteOption, chunkSize, relativePath, languageId);
});

PART_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let partId = PART_ID_INPUT.value;
    let etag = ETAG_INPUT.value;
    
    uploadAssetPartMain(partId, etag);
});

COMPLETE_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();

    let assetUploadId = ASSET_UPLOAD_ID_INPUT.value;

    completeUploadMain(assetUploadId);
});

async function startUploadMain(PARENT_ID, CONTENT_LENGTH, UPLOAD_OVERWRITE_OPTION, CHUNK_SIZE, RELATIVE_PATH, LANGUAGE_ID)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Starting asset upload");
        const START_INFO = startUpload(sessionStorage.getItem("token"), PARENT_ID, CONTENT_LENGTH, UPLOAD_OVERWRITE_OPTION, CHUNK_SIZE, RELATIVE_PATH, LANGUAGE_ID);
        console.log(JSON.stringify(START_INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function uploadAssetPartMain(PART_ID, ETAG)
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Uploading asset part");
        uploadAssetPart(sessionStorage.getItem("token"), PART_ID, ETAG);
        console.log("Uploading asset part complete");
    }
    catch (error)
    {
        throw new Error(error);
    }
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
        COMPLETE_INFO = completeUpload(sessionStorage.getItem("token"), ASSET_UPLOAD_ID);
        console.log(JSON.stringify(COMPLETE_INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}