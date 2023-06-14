import login from "./account/login.js";
import logout from "./account/logout.js";
import forgotPassword from "./account/forgot-password.js";
import resetPassword from "./account/reset-password.js";

const LOGIN_FORM = document.getElementById("loginForm");
const LOGOUT_FORM = document.getElementById("logoutForm");
const FORGOT_PASS_FORM = document.getElementById("forgotPassForm");
const RESET_PASS_FORM = document.getElementById("resetPassForm");

const USERNAME_INPUT = document.getElementById("usernameInput");
const PASSWORD_INPUT = document.getElementById("passwordInput");
const RESET_PASS_CODE_INPUT = document.getElementById("resetPassInput");

sessionStorage.clear();

LOGIN_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let username = USERNAME_INPUT.value;
    let password = PASSWORD_INPUT.value;
    loginUser(username, password);
});

FORGOT_PASS_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let username = USERNAME_INPUT.value;
    forgotPass(username);
});

RESET_PASS_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let username = USERNAME_INPUT.value;
    let code = RESET_PASS_CODE_INPUT.value;
    resetPass(username, code);
});

LOGOUT_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    logoutUser();
});

async function loginUser(USERNAME, PASSWORD)
{
    if (!USERNAME) 
    {
        throw new Error("Username: The username is empty");
    }

    if (!PASSWORD) 
    {
        throw new Error("Password: The password is empty");
    }

    try
    {
        console.log("Logging in");
        const TOKEN = await login(USERNAME, PASSWORD);
        console.log("Successfully Logged in");
        console.log(`Token: ${TOKEN}`);
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function forgotPass(USERNAME)
{
    if (!USERNAME) 
    {
        throw new Error("Username: The username is empty");
    }

    try
    {
        console.log("Sending code");
        await forgotPassword(USERNAME);
        console.log("An email has been sent to you with a 6 digit code");
    }
    catch (error)
    {
        throw new Error(error)
    }
}

async function resetPass(USERNAME, CODE)
{
    if (!USERNAME) 
    {
        throw new Error("Username: The username is empty");
    }

    if (!CODE)
    {
        throw new Error("Code: The code is empty");
    }

    try
    {
        console.log("Resetting password");
        await resetPassword(USERNAME, CODE);
        console.log("Password reset successfully");
    }
    catch (error)
    {
        throw new Error(error);
    }
}

async function logoutUser()
{
    if (!sessionStorage.getItem("intervalId"))
    {
        throw new Error("Interval id: The interval id is empty");
    }

    try
    {
        console.log("Logging out");
        logout();
    }
    catch (error)
    {
        throw new Error(error);
    }
}