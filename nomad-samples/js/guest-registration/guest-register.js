import guestInvite from "./guest/guest-invite";
import participantPanelQuery from "./guest/participant-panel-query";
import ping from "./guest/ping-user";
import registerGuest from "./guest/register-guest";
import removeGuest from "./guest/remove-guest";

const AUTH_FORM = document.getElementById("authForm");
const INVITE_FORM = document.getElementById("inviteForm");
const REMOVE_INVITE_FORM = document.getElementById("removeInviteForm");
const PASSWORD_FORM = document.getElementById("passwordForm");
const PING_FORM = document.getElementById("pingForm");
const PPQ_FORM = document.getElementById("ppqForm");

const AUTH_TOKEN = document.getElementById("authInput").value;
const EMAIL = document.getElementById("emailInput").value;
const PASSWORD = document.getElementById("passwordInput").value;

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
});

INVITE_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    sessionStorage.setItem("guestUserInfo", inviteGuestUser());
});

REMOVE_INVITE_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    removeGuestUser(CONTENT_DEFINITION_ID, USER_ID);
});

PASSWORD_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    sessionStorage.setItem("guestRegisterInfo", registerGuestUser());
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

async function inviteGuestUser()
{
    if (!AUTH_TOKEN)
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    if (!EMAIL) 
    {
        throw new Error("Email: The email is empty");
    }

    try
    {
        const EMAILS = [];
        EMAILS.push(EMAIL);
        console.log("Inviting Guest");
        const INVITE_INFO = await guestInvite(AUTH_TOKEN, EMAILS);
        console.log(INVITE_INFO.text());
        return(INVITE_INFO.text());
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
        throw new Error("Authorization token: The authorization token is empty");
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

async function registerGuestUser()
{
    if (!AUTH_TOKEN)
    {
        throw new Error("Authorization token: The authorization token is empty");
    }

    if (!EMAIL) 
    {
        throw new Error("Email: The email is empty");
    }

    if (!PASSWORD) 
    {
        throw new Error("Password: The password is empty");
    }

    try
    {
        console.log("Registering guest");
        const REGISTER_RESPONSE = await registerGuest(AUTH_TOKEN, EMAIL, PASSWORD);
        console.log(REGISTER_RESPONSE.text());
        return(REGISTER_RESPONSE.text());
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
        throw new Error("Authorization token: The authorization token is empty");
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
        throw new Error("Authorization token: The authorization token is empty");
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