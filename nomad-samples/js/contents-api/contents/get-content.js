import * as prjConstants from "../constants/project-constants.js";
import apiExceptionHandler from "../exceptions/api-exception-handler.js";

export default async function getContent(AUTH_TOKEN, CONTENT_DEFINITION_ID, ID, SORT_COLUMN, IS_DESC, PAGE_INDEX, PAGE_SIZE, LANGUAGE_ID)
{
    const API_URL = `${prjConstants.ADMIN_API_URL}/content/${ID}?contentDefinitionId=${CONTENT_DEFINITION_ID}&isDesc=${IS_DESC}`

    if (SORT_COLUMN != "")
    {
        API_URL += `&sortColumn=${SORT_COLUMN}`
    }

    PAGE_INDEX != "" ? API_URL += `&pageIndex=${PAGE_INDEX}` : "&pageIndex=0";

    PAGE_SIZE != "" ? API_URL += `&pageSize=${PAGE_SIZE}` : "&pageSize=100";

    if (LANGUAGE_ID != "")
    {
        API_URL += `&language=${LANGUAGE_ID}`
    }

    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Send POST request
    const RESPONSE = await fetch(API_URL, {
        method: "GET",
        headers: HEADERS
    }).catch((exception) => {
        throw exception;
    });

    // Check for success
    if (RESPONSE.ok) {
        const INFO = RESPONSE.json();

        return INFO;
    } 

    apiExceptionHandler(RESPONSE, "Deleting movie failed");
}