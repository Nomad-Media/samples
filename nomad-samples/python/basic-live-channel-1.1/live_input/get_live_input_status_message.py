from live_input.get_live_input import *

def get_live_input_status_message(AUTH_TOKEN, INPUT_ID):
    # Check for valid parameters
    if (not AUTH_TOKEN or not INPUT_ID):
        raise Exception("Get Live Input Status: Invalid API call")


    # Get the live input
    INPUT = get_live_input(AUTH_TOKEN, INPUT_ID)

    # Check if input was found
    if (INPUT):
        # Check if there is status message
        if (INPUT["statusMessage"] and INPUT["statusMessage"]):
            # Return input status message
            return INPUT["statusMessage"]

    # There is no status message
    return ""

