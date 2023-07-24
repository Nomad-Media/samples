from account.guest_invite import *
from account.participant_panel_query import *
from account.ping_user import *
from account.register_guest import *
from account.remove_guest_invitation import *

import json

def registration(AUTH_TOKEN):
    print("Inviting Guest")
    print(json.dumps(guest_invite(AUTH_TOKEN), index=4))

    print("Registering Guest")
    GUEST_INFO = register_guest(AUTH_TOKEN)
    print(json.dumps(GUEST_INFO, indent=4))

    print("Removing guest invitation")
    print(json.dumps(remove_guest_invitation(AUTH_TOKEN, GUEST_INFO["contentDefinitionId"], GUEST_INFO["userId"]), indent=4))

    print("Pinging user")
    ping_user(AUTH_TOKEN, GUEST_INFO["applicatonID"], GUEST_INFO["userSessionId"])

    print("Getting participant panel query")
    print(json.dumps(participant_panel_query(AUTH_TOKEN, GUEST_INFO["userId"]), indent=4))

if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiZWY2MjQ5ODEtMzUyMS00ZTI4LTlkYzYtNDkyYWU4MjE3ZWQ3IiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6IjRmMGY4Y2MxLTc0MTEtNGZhNy05NjgzLTE0YTFiOGZlMDRjZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg1NTc0NTMzLCJleHAiOjE2ODU1NzgxMzMsImlhdCI6MTY4NTU3NDUzMywiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiI3OTY4YTJkNi1jNGQ4LTQwZWUtOTg0Ni1hYzhkMjg4N2FjN2YiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.LGkGKuUoYrFi2ssBnYxdkAYq8rdDvykw7ofzfe7djd1Dz8vfpq4QWB9qXqM6Ke5-e9SnVEzGNXyZdmurTt2LEpuZ1-cl7EcGrIjUQr9gxCl3E1RCO5abNCc2dgT25N82Yo3DK6VCAYd11r7PXEAtaavGuRsmXg8cWIyvT1-5w10oJekWxI6whdg_R4O3hIdH_pzQF7mznkPicED1O5kaqZrDPvylGWRq6K4FJPqj-3_eoMuFPNRv35OqAjKpLZNUuqpbWcjjXJYhzPA8b_ETwvCrrS9icEiapJxLQwmZs61sYNErEk0xzbMJ6LbV-bNUW4gy94lhVJC60f7m87GhtA"
    registration(AUTH_TOKEN)