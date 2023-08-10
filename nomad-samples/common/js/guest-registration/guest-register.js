import guestInvite from "./guest/guest-invite.js";
import participantPanelQuery from "./guest/participant-panel-query.js";
import ping from "./guest/ping-user.js";
import registerGuest from "./guest/register-guest.js";
import removeGuest from "./guest/remove-guest.js";

const AUTH_FORM = document.getElementById("authForm");
const INVITE_FORM = document.getElementById("inviteForm");
const REMOVE_INVITE_FORM = document.getElementById("removeInviteForm");
const REGISTER_FORM = document.getElementById("registerForm");
const PING_FORM = document.getElementById("pingForm");
const PPQ_FORM = document.getElementById("ppqForm");

const AUTH_TOKEN = document.getElementById("authInput");
const INVITE_CONTENT_ID_INPUT = document.getElementById("inviteContentIdInput");
const INVITE_CONTENT_DEFINITION_ID_INPUT = document.getElementById("inviteContentDefinitionIdInput");
const INVITE_USER_ID_INPUT = document.getElementById("inviteUserIdInput");
const INVITE_EMAIL_INPUT = document.getElementById("inviteEmailInput");
const INVITE_CONTENT_SECURITY_ATTRIBUTE_INPUT = document.getElementById("inviteContentSecurityAttributeInput");
const REMOVE_INVITE_CONTENT_ID = document.getElementById("removeInviteContentIdInput");
const REMOVE_INVITE_CONTENT_DEFINITION_ID = document.getElementById("removeInviteContentDefinitionIdInput");
const REMOVE_INVITE_USER_ID = document.getElementById("removeInviteUserIdInput");
const REMOVE_INVITE_EMAIL = document.getElementById("removeInviteEmailInput");
const REMOVE_INVITE_CONTENT_SECURITY_ATTRIBUTE = document.getElementById("removeInviteContentSecurityAttributeInput");
const GUEST_EMAIL = document.getElementById("guestEmailInput");
const GUEST_FIRST_NAME = document.getElementById("guestFirstNameInput");
const GUEST_LAST_NAME = document.getElementById("guestLastNameInput");
const GUEST_PASSWORD = document.getElementById("guestPasswordInput");
const APPLICATION_ID = document.getElementById("applicationIdInput");
const USER_SESSION_ID = document.getElementById("userSessionIdInput");
const PPQ_ID_INPUT = document.getElementById("ppqIdInput");
const API_INPUT = document.getElementById("apiInput");

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    sessionStorage.setItem("token", AUTH_TOKEN.value);
    console.log("Successfuly updated token");
});

INVITE_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    let contentId = INVITE_CONTENT_ID_INPUT.value;
    let contentDefinitionId = INVITE_CONTENT_DEFINITION_ID_INPUT.value;
    let userId = INVITE_USER_ID_INPUT.value;
    let emails = INVITE_EMAIL_INPUT.value;
    let contentSecurityAttribute = INVITE_CONTENT_SECURITY_ATTRIBUTE_INPUT.value;

    inviteGuestUser(contentId, contentDefinitionId, userId, emails.split(","), contentSecurityAttribute);
});

REMOVE_INVITE_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    let contentId = REMOVE_INVITE_CONTENT_ID.value;
    let contentDefinitionId = REMOVE_INVITE_CONTENT_DEFINITION_ID.value;
    let userId = REMOVE_INVITE_USER_ID.value;
    let emails = REMOVE_INVITE_EMAIL.value;
    let contentSecurityAttribute = REMOVE_INVITE_CONTENT_SECURITY_ATTRIBUTE.value;

    removeGuestUser(contentId, contentDefinitionId, userId, emails.split(","), contentSecurityAttribute);
});

REGISTER_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    
    let email = GUEST_EMAIL.value;
    let firstName = GUEST_FIRST_NAME.value;
    let lastName = GUEST_LAST_NAME.value;
    let password = GUEST_PASSWORD.value;

    registerGuestUser(email, firstName, lastName, password);
});

PING_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    let applicationId = APPLICATION_ID.value;
    let userSessionId = USER_SESSION_ID.value;

    pingUser(applicationId, userSessionId);
});

PPQ_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    let id = PPQ_ID_INPUT.value;
    let api = API_INPUT.value;

    ppq(id, api);
});

async function inviteGuestUser(CONTENT_ID, CONTENT_DEFINITION_ID, USER_ID, EMAILS, CONTENT_SECURITY_ATTRIBUTE)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    if (!EMAIL) 
    {
        throw new Error("Email: The email is empty");
    }

    try
    {
        console.log("Inviting Guest");
        const INVITE_INFO = await guestInvite(AUTH_TOKEN, CONTENT_ID, CONTENT_DEFINITION_ID, USER_ID, 
                                              EMAILS, CONTENT_SECURITY_ATTRIBUTE);
        console.log(JSON.stringify(INVITE_INFO, null, 4));
    }
    catch (error)
    {
        throw new Error("Invite guest failed");
    }
}

async function removeGuestUser(CONTENT_ID, CONTENT_DEFINITION_ID, USER_ID, EMAILS, CONTENT_SECURITY_ATTRIBUTE)
{
    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    if (!CONTENT_DEFINITION_ID)
    {
        throw new Error("CONTENT_DEFINITION_ID: The content definition id is empty");
    }

    if (!USER_ID)
    {
        throw new Error("USER_ID: The user id is empty");
    }

    try
    {
        console.log("Removing guest invitation/security");
        const REMOVE_RESPONSE = await removeGuest(AUTH_TOKEN, CONTENT_ID, CONTENT_DEFINITION_ID, USER_ID, 
                                                  EMAILS, CONTENT_SECURITY_ATTRIBUTE);
        console.log(REMOVE_RESPONSE.text());
    }
    catch
    {
        throw new Error("Removing guest invitation/security failed");
    }
}

async function registerGuestUser(EMAIL, FIRST_NAME, LAST_NAME, PASSWORD)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Registering guest");
        const REGISTER_RESPONSE = await registerGuest(AUTH_TOKEN, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD);
        console.log(JSON.stringify(REGISTER_RESPONSE, null, 4));
    }
    catch
    {
        throw new Error("Registering guest failed");
    }
}

async function pingUser(APPLICATION_ID, USER_SESSION_ID)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Pinging user");
        const PING_INFO = await ping(AUTH_TOKEN, APPLICATION_ID, USER_SESSION_ID);
        console.log(JSON.stringify(PING_INFO, null, 4));
    }
    catch
    {
        throw new Error("Pinging user failed");
    }
}

async function ppq(ID, API)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");

    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Participant panel query");
        const PPQ_INFO = await participantPanelQuery(AUTH_TOKEN, ID, API);
        console.log(JSON.stringify(PPQ_INFO, null, 4));
    }
    catch
    {
        throw new Error("Participant panel query failed");
    }
}