from assets.upload_asset_part_complete import *
from assets.upload_asset_part import *

async def single_thread_upload(AUTH_TOKEN, FILE, RESPONSE):
    TOTAL_PARTS = len(RESPONSE["parts"])

    for IDX, PART in enumerate(RESPONSE["parts"]):
        print(f"Uploading part {IDX + 1} of {TOTAL_PARTS}...")

        ETAG = await upload_asset_part(FILE, PART["url"], PART)

        await upload_asset_part_complete(AUTH_TOKEN, PART["id"], ETAG)

        print(f"Uploaded part {IDX + 1} of {TOTAL_PARTS} successfully")