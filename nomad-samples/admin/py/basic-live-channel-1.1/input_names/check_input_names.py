from input_names.get_input_names import *

def check_input_names(AUTH_TOKEN, INPUT_NAME):
    if AUTH_TOKEN == None or INPUT_NAME == None:
        raise Exception("Get Live Input: Invalid API call")
    
    INPUT_NAMES = get_input_names(AUTH_TOKEN)

    return not INPUT_NAME in INPUT_NAMES
    

    

   