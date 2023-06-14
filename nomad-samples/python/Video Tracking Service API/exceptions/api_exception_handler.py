import json
import sys

'''
 * API Exception Handler
 *
 * @param {Stream RESPONSE
 * @param {string message
'''
def api_exception_handler(RESPONSE, MESSAGE):
    # Set a async default error message
    ERROR = "Unknown error occurred"

    # Check if we have a response object and error message
    if (RESPONSE == None):
        # If not response then throw async default error or message
        if (MESSAGE == None or len(MESSAGE.strip()) == 0):
            sys.exit(ERROR)
        else:
            sys.exit(MESSAGE)



    # Get the response content type to determine how to parse it
    CONTENT_TYPE = RESPONSE.headers.get("content-type")

    # If response BODY is JSON
    if (CONTENT_TYPE != None and CONTENT_TYPE == "application/json"):
        if RESPONSE.text != None:
            # Read response as JSON
            error = json.loads(RESPONSE.text)
            # If error JSON object has error messages then throw the first
            if (error != None):
                sys.exit(MESSAGE + ": " +  error["message"])

        else:
            # Throw message and response status
            sys.exit(MESSAGE + ": " +  str(RESPONSE.status_code))
    else:
        if RESPONSE.text != "":
            # Response BODY is text
            error = RESPONSE.text

            # Throw error if valid
            if (error and len(error.strip()) > 0):
                sys.exit(MESSAGE + ": " +  error)

        else:
            # Throw message and response status
            sys.exit(MESSAGE + ": " +  str(RESPONSE.status_code))


        # Throw message and response status
        sys.exit(MESSAGE + ": " +  str(RESPONSE.status_code))


