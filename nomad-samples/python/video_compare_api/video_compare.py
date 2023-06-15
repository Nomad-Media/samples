from video_compare.create_video_tacking_job import *
from video_compare.delete_video_tracking_job import *
from video_compare.get_channel_frame_manifest import *
from video_compare.get_list_current_video_tracking_jobs import *
from video_compare.get_specific_video_tracking_job import *
from video_compare.get_specific_vido_tracking_job_manifest import *
from video_compare.get_video_tracking_alert import *
from video_compare.stop_video_tracking_job import *

import json

def video_compare(AUTH_TOKEN):
    print(json.dumps(get_list_current_video_tacking_jobs(AUTH_TOKEN), indent=4))
    
    CREATE_INFO = create_video_tracking_job(AUTH_TOKEN)
    print(json.dumps(CREATE_INFO, indent=4))
    CREATE_INFO_ID = CREATE_INFO["id"]

    SPECIFIC_INFO = get_specific_video_tracking_job(AUTH_TOKEN, CREATE_INFO_ID)
    print(json.dumps(SPECIFIC_INFO, indent=4))

    TRACKING_ALERT_INFO = get_video_tracking_alert(AUTH_TOKEN, CREATE_INFO_ID)
    print(json.dumps(TRACKING_ALERT_INFO, indent=4))

    print(json.dumps(get_channel_frame_manifest(AUTH_TOKEN), indent=4))

    STOP_INFO = stop_video_tracking_job(AUTH_TOKEN, CREATE_INFO_ID)
    print(json.dumps(STOP_INFO, indent=4))

    print(json.dumps(delete_video_tracking_job(AUTH_TOKEN, CREATE_INFO_ID)))

if __name__ == "__main__":
    AUTH_TOKEN = ""
    video_compare(AUTH_TOKEN)
    
    

