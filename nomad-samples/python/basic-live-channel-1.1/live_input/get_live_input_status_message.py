from live_input.get_live_input import *

'''
 * Get Live Input Status Message
 *
 * @param {string} AUTH_TOKEN    | Authentication token
 * @param {string} INPUT_ID      | The input ID for which to get the status message
'''
async def get_live_input_status_message(AUTH_TOKEN, INPUT_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not INPUT_ID):
        raise Exception("Get Live Input Status: Invalid API call")


    # Get the live input
    INPUT = await get_live_input(AUTH_TOKEN, INPUT_ID)

    # Check if input was found
    if (INPUT):
        # Check if there is status message
        if (INPUT["statusMessage"] and INPUT["statusMessage"]):
            # Return input status message
            return INPUT["statusMessage"]

    # There is no status message
    return ""

