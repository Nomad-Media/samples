const START_FORM = document.getElementById("startForm");

const NAME_INPUT = document.getElementById("name");
const EXISTING_ASSET_ID_INPUT = document.getElementById("existingAssetId");
const RELATED_ASSET_ID = document.getElementById("relatedAssetId");
const CREATE_TRANSCRIBE_RELATED_ASSET = document.getElementById("createTranscribeRelatedAsset");
const RELATED_CONTENT_ID_INPUT = document.getElementById("relatedContentId");
const LANGUAGE__ID_INPUT = document.getElementById("languageId");
const UPLOAD_OVERWRITE_OPTION_INPUT = document.getElementById("uploadOverwriteOption");
const NOMAD_FILE_INPUT = document.getElementById("nomadFile");
const PARENT_ID = document.getElementById("parentId");

sessionStorage.clear();

START_FORM.addEventListener("submit", async function (event)
{
    event.preventDefault();
    const formData = new FormData();

    formData.append("NAME", NAME_INPUT.value);
    formData.append("EXISTING_ASSET_ID", EXISTING_ASSET_ID_INPUT.value);
    formData.append("RELATED_ASSET_ID", RELATED_ASSET_ID.value);
    formData.append("CREATE_TRANSCRIBE_RELATED_ASSET", CREATE_TRANSCRIBE_RELATED_ASSET.value);
    formData.append("RELATED_CONTENT_ID", RELATED_CONTENT_ID_INPUT.value);
    formData.append("LANGUAGE_ID", LANGUAGE__ID_INPUT.value);
    formData.append("UPLOAD_OVERWRITE_OPTION", UPLOAD_OVERWRITE_OPTION_INPUT.value);
    formData.append("NOMAD_FILE", NOMAD_FILE_INPUT.files[0]);
    formData.append("PARENT_ID", PARENT_ID.value);
    
    try
    {
        const RESPONSE = await fetch("/uploadAsset", { method: "POST", body: formData });

        if (RESPONSE.ok)
        {
            const DATA = await RESPONSE.json();
            console.log(DATA);
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
});