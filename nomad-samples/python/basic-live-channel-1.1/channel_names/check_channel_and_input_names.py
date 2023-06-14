from channel_names.get_channel_names import *

async def check_channel_and_input_names(AUTH_TOKEN, CHANNEL_NAME):
    if AUTH_TOKEN == None or CHANNEL_NAME == None:
        raise Exception("Get Live Channel: Invalid API call")
    
    CHANNEL_NAMES = await get_channel_names(AUTH_TOKEN)

    return not CHANNEL_NAME in CHANNEL_NAMES
    

    

   