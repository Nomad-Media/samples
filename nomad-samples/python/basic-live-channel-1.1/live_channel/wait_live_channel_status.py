from live_channel.get_live_channel_status import *
from live_channel.get_live_channel_status_message import *

from libraries import time
'''
 * Wait for a Live Channel to transition to specified status
 *
 * @param {string} AUTH_TOKEN                    | Authorization AUTH_TOKEN
 * @param {string} CHANNEL_ID                    | The channel ID for which to get the status
 * @param {LIVE_CHANNEL_STATUSES} STATUS_TO_WAIT_FOR | The live channel status to wait for
 * @param {number} timeout                      | Timeout in seconds
 * @param {number} POLL_INTERVAL                 | Poll interval in seconds
'''
async def wait_for_live_channel_status(AUTH_TOKEN, CHANNEL_ID, STATUS_TO_WAIT_FOR, TIMEOUT = 30, POLL_INTERVAL = 2):
    # Check for valid parameters
    if (not AUTH_TOKEN or not CHANNEL_ID or not STATUS_TO_WAIT_FOR):
        raise Exception("Wait for Live Channel Status: Invalid API call")


    # Set the starting time
    STARTING_TIME = time.time()

    # Elapsed time in seconds
    ELAPSED_TIME = 0

    while (ELAPSED_TIME < TIMEOUT):
        # Get the Live Channel status
        CHANNEL_STATUS = await get_live_channel_status(AUTH_TOKEN, CHANNEL_ID)

        # If channel is in STATUS_TO_WAIT_FOR return
        if (CHANNEL_STATUS == STATUS_TO_WAIT_FOR):
            # Give feedback to the console
            print("Live Channel [" + CHANNEL_ID + "] transitioned to status " + STATUS_TO_WAIT_FOR)
            return


        # Give feedback to the console
        print("Live Channel [" + CHANNEL_ID + "] current status is " + CHANNEL_STATUS)

        # Check for Error status
        if (CHANNEL_STATUS == "Error"):
            # Get the error message
            CHANNEL_STATUS_MESSAGE = await get_live_channel_status_message(AUTH_TOKEN, CHANNEL_ID)

            # Can't continue if Live Channel is in error status
            raise Exception("Live Channel [" + CHANNEL_ID + "] is in [Error] status: " + CHANNEL_STATUS_MESSAGE)


        # Calculate elapsed time in seconds
        ELAPSED_TIME = (time.time() - STARTING_TIME)

        # Give feedback to the console
        print("Waiting for Live Channel [" + CHANNEL_ID + "] to transition to status " + STATUS_TO_WAIT_FOR + "... " + str(round(ELAPSED_TIME)) + " " + str(TIMEOUT))

        # Check for timeout
        if (ELAPSED_TIME > TIMEOUT):
            break


        # Wait poll interval
        time.sleep(POLL_INTERVAL)


    raise Exception("Waiting for Live Channel [" + CHANNEL_ID + "] to transition to status " + STATUS_TO_WAIT_FOR + " timed out")

