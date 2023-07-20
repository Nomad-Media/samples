from assets.upload_thread import *

import asyncio, threading

def worker_upload_part(AUTH_TOKEN, FILE, PART, IDX, worker_count):
    print(f"Initializing Worker Upload Part for Part ID {PART['id']} and Index {IDX}")
    upload_thread(AUTH_TOKEN, FILE, PART, worker_count)
    print(f"Uploaded part Pard ID ${PART['id']} and Index {IDX} successfully")
