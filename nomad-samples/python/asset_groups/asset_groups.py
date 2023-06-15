from asset_group.add_asset_to_asset_group import *
from asset_group.create_asset_group import *
from asset_group.delete_asset_group import *
from asset_group.get_asset_groups import *
from asset_group.remove_asset_from_asset_group import *
from asset_group.rename_asset_group import *

def asset_groups(AUTH_TOKEN):
    try:
        print("Creating a new asset group") 
        NEW_ASSET_GROUP = create_asset_group(AUTH_TOKEN)
        print(json.dumps(NEW_ASSET_GROUP, indent=4))
        ASSET_GROUP_ID = NEW_ASSET_GROUP["id"]

        print("Printing asset groups")
        print(json.dumps(get_asset_groups(AUTH_TOKEN), indent=4))

        print("Adding asset to asset group")
        ASSET_GROUP = add_asset_to_asset_group(AUTH_TOKEN, ASSET_GROUP_ID)
        print(json.dumps(ASSET_GROUP, indent=4))
        
        print("Renaming asset group")
        ASSET_GROUP_INFO = rename_asset_group(AUTH_TOKEN, ASSET_GROUP_ID)
        print(json.dumps(ASSET_GROUP_INFO, indent=4))

        print("Removing asset from asset group")
        print(json.dumps(remove_asset_to_asset_group(AUTH_TOKEN, ASSET_GROUP_ID), indent=4))

        print("Deleting asset group")
        print(json.dumps(delete_asset_group(AUTH_TOKEN, ASSET_GROUP_ID), indent=4))

    except:
        raise Exception()
    


if __name__ == "__main__":
    AUTH_TOKEN = "eyJraWQiOiJkSkpRa3ZxdWxDekpqZEFmWTR0UGwrSytyWldVTE5OTkR1YitYVnljaFNRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJjdXN0b206Y29udGFjdF9pZCI6ImU5YWIxNDFmLWMxMjgtNDE5Yi04YTQ3LWIzNTg1MTQwMzZkNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX1ZHRXhveTY0aSIsImNvZ25pdG86dXNlcm5hbWUiOiJlYjc1MzI5OC0wODAzLTQyYWEtOTFkMi01NjE3OGE0OTI4NWQiLCJnaXZlbl9uYW1lIjoiU2NvdHQiLCJvcmlnaW5fanRpIjoiMzc2ZjUyOTItY2Q2MC00ZGZlLWFkNDQtYjg3MjhiNzI2ZDczIiwiYXVkIjoiNWUybm92MXAzYTZxNHM1MHZjamo1ZXNqYjciLCJldmVudF9pZCI6Ijk5NGQ2NzI4LWNjYTEtNDE3ZC1iMzJlLTRmYjIyNzUzODA5ZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjg1OTM4OTA3LCJleHAiOjE2ODU5NDI1MDcsImlhdCI6MTY4NTkzODkwNywiZmFtaWx5X25hbWUiOiJGYWx1ZGkiLCJqdGkiOiI1N2Q5MTBiMC1kNWVlLTRmYjMtYmU0Yy03N2VlMTU5YTcxOTQiLCJlbWFpbCI6InNmYWx1ZGlAbm9tYWQtY21zLmNvbSJ9.HvuMAa3y-3EiyRQH395-TnytvckwJLbOMw9AlgUIcn_IOivkYCJrBVt_gG7tsU-lIWb6o7FkNk2Hn4e0cTSOe9IQiAiJQHfobshaSSqlyS8v-wz0zFi-2K1EXGlfMyFanDoOCpoeTjxrWcad7dvyEXoxZYCqPFif9w8PjsOER8Bz-lCGOLGW1SOrJtnLPJhnHZtaEu-tT1FGzzQ-F7ipayFPrqgtJmA_tNcusKVdnj6qS7kN5AFVdptklOQStny2pPAHeUMSeGvLkIMIrVv5dGt8ncrfLa0sZjHbQoiD2ej1sgGd_bc98Nc_yXkUw_qkqt1YFr8yjBviDtT2Nn03gw"
    asset_groups(AUTH_TOKEN)