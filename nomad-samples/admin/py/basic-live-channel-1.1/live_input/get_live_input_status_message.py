from live_input.get_live_input import *

def get_live_input_status_message(AUTH_TOKEN, INPUT_ID):
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

