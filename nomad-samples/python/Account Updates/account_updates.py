from account.change_email import *
from account.change_password import *
from account.update_user import *

import json

def update_account(AUTH_TOKEN):
    if not AUTH_TOKEN:
        raise Exception("AUTH_TOKEN: Invalid authentication token")

    try:
        print("Changing email")
        change_email(AUTH_TOKEN)

        print("Changing password")
        change_password(AUTH_TOKEN)
    
        print("Updating user")
        print(json.dumps(update_user(AUTH_TOKEN)))
        
    except:
        raise Exception("Failed to update account")


if __name__ == "__main__":
    AUTH_TOKEN = ""
    update_account(AUTH_TOKEN)