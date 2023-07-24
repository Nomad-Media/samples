from live_input.get_live_input_status import *
from live_input.get_live_input_status_message import *

import time

def wait_for_live_input_status(AUTH_TOKEN, INPUT_ID, STATUS_TO_WAIT_FOR, TIMEOUT = 30, POLL_INTERVAL = 2):
    # Check for valid parameters
    if (not AUTH_TOKEN or not INPUT_ID or not STATUS_TO_WAIT_FOR):
        raise Exception("Wait for Live Input Status: Invalid API call")


    # Set the starting time
    STARTING_TIME = time.time()

    # Elapsed time in seconds
    ELAPSED_TIME = 0

    while (ELAPSED_TIME < TIMEOUT):
        # Get the Live Input status
        INPUT_STATUS = get_live_input_status(AUTH_TOKEN, INPUT_ID)

        # If Live Input is in STATUS_TO_WAIT_FOR return
        if (INPUT_STATUS == STATUS_TO_WAIT_FOR):
            # Give feedback to the console
            print("Live Input " + str(INPUT_ID) + " transitioned to status " + STATUS_TO_WAIT_FOR)
            return


        # Give feedback to the console
        print("Live Input [" + INPUT_ID + "] is in status [" + INPUT_STATUS + "]")

        # Check for Error status
        if (INPUT_STATUS == "Error"):
            # Get the error message
            INPUT_STATUS_MESSAGE = get_live_input_status_message(AUTH_TOKEN, INPUT_ID)

            # Can't continue if Live Input is in error status
            raise Exception("Live Input " + str(INPUT_ID) + " is in Error status: " + INPUT_STATUS_MESSAGE)


        # Calculate elapsed time in seconds
        ELAPSED_TIME = (time.time() - STARTING_TIME)

        # Give feedback to the console
        print("Waiting for Live Input [" + str(INPUT_ID) + "] to transition to status [" + STATUS_TO_WAIT_FOR + "]... [" + str(round(ELAPSED_TIME)) + "] timeout:" + str(TIMEOUT) + "]")

        # Check for TIMEOUT
        if (ELAPSED_TIME > TIMEOUT):
            break


        # Wait poll interval
        time.sleep(POLL_INTERVAL)


    raise Exception("Waiting for Live Input [" + INPUT_ID + "] to transition to status [" + STATUS_TO_WAIT_FOR + "] timed out")
