from account.login import *
from account.refresh_token import *
from account.forgot_password import *
from account.reset_password import *
from account.logout import *
from constants.project_constants import*
from exceptions.api_exception_handler import *

import json

def account_authentication(USERNAME, PASSWORD):
    if not USERNAME:
        raise Exception("USENAME: The USENAME is invalid")
    if (not PASSWORD):
        raise Exception("Password: The password is invalid")
    
    try:
        print("Logging in")
        LOGIN_INFO = login(USERNAME, PASSWORD)  
        print(json.dumps(LOGIN_INFO, indent=4))
        token = LOGIN_INFO["token"]

        print("Refreshing token")
        REFRESH_INFO = refresh_token(LOGIN_INFO["refreshToken"])
        print(json.dumps(REFRESH_INFO, indent=4))
        token = REFRESH_INFO["token"]

        print("Forgot password")
        forgot_password(USERNAME, token)

        print("An email has been sent to you with a 6 digit code")
        while True:
            verification_input = input("Did you recieve the 6 digit code (y/n): ")
            if verification_input == "y":
                while True:
                    IS_INT = True
                    CODE = input("Enter 6 digit code: ")
                    try: 
                        int(CODE)
                    except:
                        IS_INT = False
                    if len(CODE) == 6 and IS_INT:
                        try:
                            print("Resetting password")
                            NEW_PASSWORD = "NewPassword123!"
                            reset_password(USERNAME, CODE, NEW_PASSWORD)
                            print("Password Reset")
                            break
                        except:
                            print("The 6 digit code you have provided is invalid")
                    else:
                        print("The 6 digit code you have provided is invalid")
                break
            else:
                print("Resending 6 digit code")
                forgot_password(USERNAME, token)
                print("An email has been sent to you with a 6 digit code")

        print("Logging out")
        LOGOUT_INFO = logout(LOGIN_INFO["userSessionId"], token, USERNAME)
        print(json.dumps(LOGIN_INFO, indent=4))
        

    except:
        raise Exception("Account authentification failed")

if __name__ == "__main__":
    USERNAME = "xxxxxxxx"
    PASSWORD = "N0madInternshipPassword!!"

    account_authentication(USERNAME, PASSWORD)

