from assets.upload_asset_part import *
from assets.upload_asset_part_complete import *

def upload_thread(AUTH_TOKEN, FILE, PART, worker_count):
    ETAG = upload_asset_part(FILE, PART["url"], PART)
    upload_asset_part_complete(AUTH_TOKEN, PART["id"], ETAG)

    worker_count["value"] -= 1
