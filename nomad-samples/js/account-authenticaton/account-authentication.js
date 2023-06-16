import login from "./account/login.js";
import logout from "./account/logout.js";
import refreshToken from "./account/refresh-token.js";
import forgotPassword from "./account/forgot-password.js";
import resetPassword from "./account/reset-password.js";

const LOGIN_FORM = document.getElementById("loginForm");
const LOGOUT_FORM = document.getElementById("logoutForm");
const AUTH_FORM = document.getElementById("authForm");
const REFRESH_AUTH_FORM = document.getElementById("refreshAuthForm");
const FORGOT_PASS_FORM = document.getElementById("forgotPassForm");
const RESET_PASS_FORM = document.getElementById("resetPassForm");

const USERNAME_INPUT = document.getElementById("usernameInput");
const PASSWORD_INPUT = document.getElementById("passwordInput");
const TOKEN_INPUT = document.getElementById("authInput");
const FORGOT_PASSWORD_USERNAME_INPUT = document.getElementById("forgotPasswordUsernameInput");
const RESET_PASSWORD_INPUT = document.getElementById("resetPasswordInput");

sessionStorage.clear();

LOGIN_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let username = USERNAME_INPUT.value;
    let password = PASSWORD_INPUT.value;
    loginUser(username, password);
});

AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    sessionStorage.setItem("token", TOKEN_INPUT.value);
    console.log("Successfuly updated token");
});

REFRESH_AUTH_FORM.addEventListener("submit", function (event)
{
    event.preventDefault();
    refreshTokenMain();
});

FORGOT_PASS_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let username = FORGOT_PASSWORD_USERNAME_INPUT.value;
    forgotPass(username);
});

RESET_PASS_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    let username = USERNAME_INPUT.value;
    let code = RESET_PASSWORD_INPUT.value;
    resetPass(username, code);
});

LOGOUT_FORM.addEventListener("submit", function (event) 
{
    event.preventDefault();
    logoutUser();
});

async function loginUser(USERNAME, PASSWORD)
{
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

async function refreshTokenMain()
{
    if (!sessionStorage.getItem("token"))
    {
        throw new Error("Authentication token: The authentication token is empty");
    }

    try
    {
        console.log("Refreshing token");
        await refreshToken();
        console.log(`Token: ${sessionStorage.getItem("token")}`);
    }
    catch (error)
    {
        throw new Error(error)
    }
}

async function forgotPass(USERNAME)
{
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