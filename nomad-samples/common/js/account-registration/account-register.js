import register from "./account/register.js";
import resendCode from "./account/resend-code.js";
import verify from "./account/verify.js";

const REGISTER_FORM = document.getElementById("registerForm");
const VERIFY_FORM = document.getElementById("tokenForm");
const RESEND_FORM = document.getElementById("resendForm");

const EMAIL_INPUT = document.getElementById("emailInput");
const FIRST_NAME_INPUT = document.getElementById("firstNameInput");
const LAST_NAME_INPUT = document.getElementById("lastNameInput");
const PASSWORD_INPUT = document.getElementById("passwordInput");
const TOKEN_INPUT = document.getElementById("tokenInput");

REGISTER_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let email = EMAIL_INPUT.value;
    let firstName = FIRST_NAME_INPUT.value;
    let lastName = LAST_NAME_INPUT.value;
    let password = PASSWORD_INPUT.value;
    registerUser(email, firstName, lastName, password);
});


VERIFY_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let email = EMAIL_INPUT.value;
    let token = TOKEN_INPUT.value;
    verifyUser(email, token);
});


RESEND_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let email = EMAIL_INPUT.value;
    resendCodeUser(email);
});

async function registerUser(EMAIL, FIRST_NAME, LAST_NAME, PASSWORD) 
{
    if (!EMAIL) 
    {
        throw new Error("Email: The email is invalid");
    }

    try {
        console.log("Starting Registration process");
        await register(EMAIL, FIRST_NAME, LAST_NAME, PASSWORD);
        console.log("An email has been sent to you with a 6 digit code");
    } catch (error) {
        throw new Error("Register user failed");
    }
}

async function verifyUser(EMAIL, CODE)
{
    while (true) 
    {
        if (CODE.length === 6 && !isNaN(parseInt(CODE))) {
            try {
                await verify(EMAIL, CODE);
                console.log("Account now verified");
                break;
            } catch (error) {
                console.log(`${error}`);
                break;
            }
        } 
        else 
        {
            console.log("The 6 digit code you have provided is invalid");
        }
    }
}

async function resendCodeUser(EMAIL)
{
    console.log("Resending 6 digit code");
    await resendCode(EMAIL);
    console.log("An email has been sent to you with a 6 digit code");
}

