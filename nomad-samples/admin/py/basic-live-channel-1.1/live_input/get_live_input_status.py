from live_input.get_live_input import *

def get_live_input_status(AUTH_TOKEN, INPUT_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not INPUT_ID):
        raise Exception("Get Live Input Status: Invalid API call")


    # Get the live INPUT
    INPUT = get_live_input(AUTH_TOKEN, INPUT_ID)

    # Check if INPUT was found
    if (INPUT):
        # Return the status of the INPUT
        return INPUT["status"]["description"]


    # Input was not found
    return "Deleted"

