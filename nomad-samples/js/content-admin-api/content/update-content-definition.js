import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function updateContentDefinition(AUTH_TOKEN, CONTENT_DEFINITION_ID, CREATE_DATE, LAST_MODIFIED_DATE, EDITOR_TEMPLATE, SAMPLE_TEMPLATE, IS_SYSTEM_MODULE, USE_EDITOR_FORM_OVERRIDE, TEMPLATE_FOLDER_ASSET_ID, CONTENT_DEFINITION_GROUP, CONTENT_TYPE_GROUP) 
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
  	HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {};

    const ARGUMENTS = ["createDate", "lastModifiedDate", "editorTemplate", "sampleTemplate", "isSystemModule", "useEditorFormOverride", "templateFolderAssetId"]; 
    for (let argNum = 0; argNum < ARGUMENTS.length; ++argNum)
    {
        let argsNum = argNum + 2
        if (arguments[argsNum] != "")
        {
            BODY[ARGUMENTS[argNum]] = arguments[argsNum];
        }
    }

    BODY["properties"] = {};
    if (CONTENT_DEFINITION_GROUP != null)
    {
        BODY.properties["ContentDefinitionGroupId"] = CONTENT_DEFINITION_GROUP;
    }
    if (CONTENT_TYPE_GROUP != null)
    {
        BODY.properties["ContentTypeId"] = CONTENT_TYPE_GROUP;
    }

    // Post
    const RESPONSE = await fetch(`${prjConstants.ADMIN_API_URL}/contentDefinition/${CONTENT_DEFINITION_ID}`, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(BODY),
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        // Get the JSON from the response
        const INFO = await RESPONSE.json();

        return INFO;
    }
		
  	// There was an error
    await apiExceptionHandler(RESPONSE, "Update content definition failed");
}