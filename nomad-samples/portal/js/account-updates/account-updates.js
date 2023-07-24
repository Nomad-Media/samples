import updateUser from "./account/update-user.js";
import changeEmail from "./account/change-email.js";
import changePassword from "./account/change-password.js";
import getCountries from "./helpers/get-countries.js";

const AUTH_FORM = document.getElementById("authForm");
const UPDATE_FORM = document.getElementById("updateForm");
const EMAIL_FORM = document.getElementById("changeEmailForm");
const PASSWORD_FORM = document.getElementById("changePassForm");

const ADDRESS1_INPUT = document.getElementById("address1Input");
const ADDRESS2_INPUT = document.getElementById("address2Input");
const CITY_INPUT = document.getElementById("cityInput");
const COUNTRY_SELECT = document.getElementById("countrySelect");
const FIRST_NAME_INPUT = document.getElementById("firstNameInput");
const LAST_NAME_INPUT = document.getElementById("lastNameInput");
const ORGANIZATION_INPUT = document.getElementById("organizationInput");
const PHONE_NUMBER_INPUT = document.getElementById("phoneNumberInput")
const PHONE_EXT_INPUT = document.getElementById("phoneExtInput");
const POSTAL_CODE_INPUT = document.getElementById("postalCodeInput");
const STATE_INPUT = document.getElementById("stateInput");
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

async function getCountryOptions()
{
    const COUNTRIES_INFO = await getCountries(sessionStorage.getItem("token"));
    const COUNTRIES = COUNTRIES_INFO.children;

    for (let countryIdx = 0; countryIdx < COUNTRIES.length; ++countryIdx)
    {
        let option = document.createElement("option");
        option.value = COUNTRIES[countryIdx].id;
        option.text = COUNTRIES[countryIdx].label;
        COUNTRY_SELECT.appendChild(option);
    }
    return COUNTRIES;
}
const COUNTRY_MAP = await getCountryOptions();

UPDATE_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let address1 = ADDRESS1_INPUT.value;
    let address2 = ADDRESS2_INPUT.value;
    let city = CITY_INPUT.value;
    let countryId = COUNTRY_SELECT.value;
    let firstName = FIRST_NAME_INPUT.value;
    let lastName = LAST_NAME_INPUT.value;
    let organization = ORGANIZATION_INPUT.value;
    let phoneNumber = PHONE_NUMBER_INPUT.value;
    let phoneExt = PHONE_EXT_INPUT.value;
    let postalCode = POSTAL_CODE_INPUT.value;
    let state = STATE_INPUT.value;
    updateUserMain(address1, address2, city, countryId, firstName, lastName, organization, 
                   phoneNumber, phoneExt, postalCode, state);
});

EMAIL_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    let email = CHANGE_EMAIL_INPUT.value;
    changeUserEmail(email);
});

PASSWORD_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    let auth_token = TOKEN_INPUT.value;
    let password = CHANGE_PASSWORD_INPUT.value;
    changeUserPassword(auth_token, password);
});

async function updateUserMain(ADDRESS1, ADDRESS2, CITY, COUNTRY_ID, FIRST_NAME, LAST_NAME, ORGANIZATION, 
                              PHONE_NUMBER, PHONE_EXT, POSTAL_CODE, STATE)
{
    const AUTH_TOKEN = sessionStorage.getItem("token");
    if (!AUTH_TOKEN)
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        let country = "";

        for (let countryIdx = 0; countryIdx < COUNTRY_MAP.length; ++countryIdx)
        {
            if (COUNTRY_MAP[countryIdx].id === COUNTRY_ID)
            {
                country = COUNTRY_MAP[countryIdx];
                break;
            }
        }

        console.log("Updating users");
        const INFO = await updateUser(AUTH_TOKEN, ADDRESS1, ADDRESS2, CITY, country, FIRST_NAME, LAST_NAME, 
                         ORGANIZATION, PHONE_NUMBER, PHONE_EXT, POSTAL_CODE, STATE);
        console.log(JSON.stringify(INFO, null, 4));
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function changeUserEmail(EMAIL)
{
    const AUTH_TOKEN = sessionStorage.getItem("token")
    if (!AUTH_TOKEN) 
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    if (!EMAIL) 
    {
        throw new Error("Email: The email is invalid");
    }

    try
    {
        console.log("Changing email");
        await changeEmail(AUTH_TOKEN, EMAIL);
        console.log("Email successfully changed");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function changeUserPassword(PASSWORD)
{
    const AUTH_TOKEN = sessionStorage.getItem("token")
    if (!AUTH_TOKEN) 
    {
        throw new Error("Authentication token: The authentication token is invalid");
    }

    if (!PASSWORD) 
    {
        throw new Error("Password: The password is invalid");
    }

    try
    {
        console.log("Changing password");
        await changePassword(AUTH_TOKEN, PASSWORD);
        console.log("Password successfully changed");
    }
    catch (error)
    {
        throw new Error(error);
    }
}