from constants.project_constants import *
from exceptions.api_exception_handler import *
from account.refresh_token import *

from libraries import requests, json, asyncio

'''
 * Login
 *
 * @param {string} username | The username
 * @param {string} password | The password
 *
 * @returns {string} Authentication token
'''
async def login(username, password):
    # Check for valid parameters
    if (not username or not password):
        print("Login: Invalid API call")
        raise Exception()


    # Create header for the request
    HEADERS = {
        'Content-Type': 'application/json'
    }

    # Build the payload BODY
    BODY = {
        "username": username,
        "password": password
    }


    try:
        # Send the request
        RESPONSE = requests.post(PUBLIC_URL + "/account/login", headers= HEADERS, data= json.dumps(BODY))
    
        # Get the response
        INFO = json.loads(RESPONSE.text)

        auth_token = INFO["token"]
        EXPIRATION_SECONDS = INFO["expirationSeconds"]

        async def refresh_token_task(): 
            nonlocal auth_token
            nonlocal EXPIRATION_SECONDS
            # Set refresh token interval
            while True:
                await asyncio.sleep(EXPIRATION_SECONDS)
                auth_token = await refresh_token(INFO["refreshToken"])

        asyncio.create_task(refresh_token_task())

        if not RESPONSE.ok:
            raise Exception()
        
        return {"token": auth_token, "userSessionId": INFO["userSessionId"], "expirationSeconds": EXPIRATION_SECONDS}
            

    except:
        await api_exception_handler(RESPONSE, "Login failed")

