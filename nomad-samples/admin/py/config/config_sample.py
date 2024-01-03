import sys, os
sys.path.append(os.path.realpath('...'))

from nomad_media_pip.nomad_sdk import Nomad_SDK
from config import config

nomad_sdk = Nomad_SDK(config)

import json

def clear_server_cache():
    try:
        nomad_sdk.clear_server_cache()
    except:
        raise Exception()
    
def get_config():
    try:
        config_types = {"Admin": 1, "Lambda": 2, "GroundTruth": 3}

        CONFIG_TYPE_NAME = input("Enter config type (Admin, Lambda, GroundTruth): ")
        CONFIG_TYPE = config_types.get(CONFIG_TYPE_NAME)

        if CONFIG_TYPE is not None:
            CONFIG = nomad_sdk.get_config(CONFIG_TYPE)
        else:
            print(f"Invalid config type: {CONFIG_TYPE_NAME}")

        print(json.dumps(CONFIG, indent=4))
    except:
        raise Exception()
    
def get_server_time():
    try:
        SERVER_TIME = nomad_sdk.get_server_time()

        print(json.dumps(SERVER_TIME, indent=4))
    except:
        raise Exception()
    
if __name__ == "__main__":
    while True:
        print("Do you want to clear the server cache, get the config, get the server time, or exit?")
        USER_INPUT = input("Enter clear, config, or time: ")

        if USER_INPUT == "clear":
            clear_server_cache()
        elif USER_INPUT == "config":
            get_config()
        elif USER_INPUT == "time":
            get_server_time()
        elif USER_INPUT == "exit":
            break
        else:
            print("Invalid input")
