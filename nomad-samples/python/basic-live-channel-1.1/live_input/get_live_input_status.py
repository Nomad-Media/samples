from live_input.get_live_input import *

'''
 * Get Live Input Status
 *
 * @param {string} AUTH_TOKEN    | Authentication token
 * @param {string} INPUT_ID      | The INPUT ID for which to get the status
'''
async def get_live_input_status(AUTH_TOKEN, INPUT_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not INPUT_ID):
        raise Exception("Get Live Input Status: Invalid API call")


    # Get the live INPUT
    INPUT = await get_live_input(AUTH_TOKEN, INPUT_ID)

    # Check if INPUT was found
    if (INPUT):
        # Return the status of the INPUT
        return INPUT["status"]["description"]


    # Input was not found
    return "Deleted"

