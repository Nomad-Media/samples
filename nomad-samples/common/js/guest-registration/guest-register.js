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
const EMAIL = document.getElementById("emailInput");
const FIRST_NAME = document.getElementById("firstNameInput");
const LAST_NAME = document.getElementById("lastNameInput");
const USER_PASSWORD = document.getElementById("inviteUserPasswordInput");
const GUEST_EMAIL = document.getElementById("guestEmailInput");
const GUEST_FIRST_NAME = document.getElementById("guestFirstNameInput");
const GUEST_LAST_NAME = document.getElementById("guestLastNameInput");
const GUEST_PASSWORD = document.getElementById("guestPasswordInput");

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

    let email = EMAIL.value;
    let firstName = FIRST_NAME.value;
    let lastName = LAST_NAME.value;
    let password = USER_PASSWORD.value;

    inviteGuestUser(email, firstName, lastName, password);
});

REMOVE_INVITE_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();

    const contentDefinitionId = CONTENT_DEFINITION_ID_INPUT.value;

    removeGuestUser(CONTENT_DEFINITION_ID, USER_ID);
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
    pingUser(APPLICATION_ID, USER_SESSION_ID);
});

PPQ_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    ppq(ID);
});

async function inviteGuestUser(EMAIL, FIRST_NAME, LAST_NAME, PASSWORD)
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
        const INVITE_INFO = await guestInvite(AUTH_TOKEN, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD);
        console.log(JSON.stringify(INVITE_INFO, null, 4));
    }
    catch (error)
    {
        throw new Error("Invite guest failed");
    }
}

async function removeGuestUser(CONTENT_DEFINITION_ID, USER_ID)
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
        const REMOVE_RESPONSE = await removeGuest(AUTH_TOKEN, CONTENT_DEFINITION_ID, USER_ID);
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
    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    if (!APPLICATION_ID) 
    {
        throw new Error("Application id: The application id is empty");
    }

    if (!USER_SESSION_ID) 
    {
        throw new Error("User session id: The user session id is empty");
    }

    try
    {
        console.log("Pinging user");
        const PING_INFO = await ping(AUTH_TOKEN, APPLICATION_ID, USER_SESSION_ID);
        console.log(PING_INFO.text());
    }
    catch
    {
        throw new Error("Pinging user failed");
    }
}

async function ppq(ID)
{
    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    if (!ID) 
    {
        throw new Error("Id: Id is empty");
    }

    try
    {
        console.log("Participant panel query");
        PPQ_INFO = await participantPanelQuery(AUTH_TOKEN, ID);
        console.log(PPQ_INFO.text());
    }
    catch
    {
        throw new Error("Participant panel query failed");
    }
}