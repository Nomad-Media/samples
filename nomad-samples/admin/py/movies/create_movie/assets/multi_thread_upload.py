from assets.worker_upload_part import *

import time, threading

def multi_thread_upload(AUTH_TOKEN, FILE, RESPONSE):
    PARTS = RESPONSE["parts"]
    TOTAL_PARTS = len(PARTS)
    MAX_ACTIVE_WORKERS = 8
    MAX_WORKERS = min(TOTAL_PARTS, MAX_ACTIVE_WORKERS)

    idx = 0
    worker_count = { "value": 0 }
    threads = []
    while idx < TOTAL_PARTS:
        # Loop while available workers
        while (worker_count["value"] < MAX_WORKERS):
            thread = threading.Thread(target=worker_upload_part, args=(AUTH_TOKEN, FILE, PARTS[idx], idx, worker_count))
            threads.append(thread)
            thread.start()

            idx += 1
            worker_count["value"] += 1

            if idx >= TOTAL_PARTS:
                break

        while (worker_count["value"] == MAX_WORKERS):
            time.sleep(0.5)

    for thread in threads:
        thread.join()

    while True:
        if worker_count["value"] == 0:
            break
        time.sleep(0.5)
    