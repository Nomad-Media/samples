from assets.upload_thread import *

import asyncio, threading

def worker_upload_part(AUTH_TOKEN, FILE, PART, IDX, worker_count):
    upload_thread(AUTH_TOKEN, FILE, PART, worker_count)
