import updateUser from "./account/update-user.js";
import changeEmail from "./account/change-email.js";
import changePassword from "./account/change-password.js";

const AUTH_FORM = document.getElementById("authForm");
const UPDATE_FORM = document.getElementById("updateForm");
const EMAIL_FORM = document.getElementById("changeEmailForm");
const PASSWORD_FORM = document.getElementById("changePassForm");

const UPDATE_EMAIL_INPUT = document.getElementById("emailInput");
const UPDATE_FIRST_NAME_INPUT = document.getElementById("firstNameInput");
const UPDATE_LAST_NAME_INPUT = document.getElementById("lastNameInput");
const UPDATE_PHONE_INPUT = document.getElementById("phoneNumberInput");
const CHANGE_EMAIL_INPUT = document.getElementById("changeEmailInput");
const CHANGE_PASSWORD_INPUT = document.getElementById("changePassInput");
const TOKEN_INPUT = document.getElementById("authInput");

sessionStorage.clear();

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

UPDATE_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let auth_token = TOKEN_INPUT.value;
    let email = UPDATE_EMAIL_INPUT.value;
    let firstName = UPDATE_FIRST_NAME_INPUT.value;
    let lastName = UPDATE_LAST_NAME_INPUT.value;
    let phoneNumber = UPDATE_PHONE_INPUT.value;
    updateUserVals(auth_token, email, firstName, lastName, phoneNumber);
});

EMAIL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    let auth_token = TOKEN_INPUT.value;
    let email = CHANGE_EMAIL_INPUT.value;
    changeUserEmail(auth_token, email);
});

PASSWORD_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    let auth_token = TOKEN_INPUT.value;
    let password = CHANGE_PASSWORD_INPUT.value;
    changeUserPassword(auth_token, password);
});

async function updateUserVals(AUTH_TOKEN, EMAIL, FIRST_NAME, LAST_NAME, PHONE_NUMBER)
{
    if (!AUTH_TOKEN) 
    {
        throw new Error("Authorization token: The authorization token is invalid");
    }

    try
    {
        console.log("Updating users");
        updateUser(AUTH_TOKEN, EMAIL, FIRST_NAME, LAST_NAME, PHONE_NUMBER);
        console.log("Successfully updated users");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function changeUserEmail(AUTH_TOKEN, EMAIL)
{
    if (!AUTH_TOKEN) 
    {
        throw new Error("Authorization token: The authorization token is invalid");
    }

    if (!EMAIL) 
    {
        throw new Error("Email: The email is invalid");
    }

    try
    {
        console.log("Changing email");
        changeEmail(AUTH_TOKEN, EMAIL);
        console.log("Email successfully changed");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function changeUserPassword(AUTH_TOKEN, PASSWORD)
{
    if (!AUTH_TOKEN) 
    {
        throw new Error("Authorization token: The authorization token is invalid");
    }

    if (!PASSWORD) 
    {
        throw new Error("Password: The password is invalid");
    }

    try
    {
        console.log("Changing password");
        changePassword(AUTH_TOKEN, PASSWORD);
        console.log("Password successfully changed");
    }
    catch (error)
    {
        throw new Error(error);
    }
}