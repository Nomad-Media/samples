from constants.system_constants import *

'''
 * Live Input Types
 *
 * "RTP Push"
 * "RTMP Push"
 * "RTMP Pull"
 * "URL Pull"
 *
'''
LIVE_INPUT_TYPES = {
    "RTMP_PULL": RTMP_PULL_INPUT_TYPE_LOOKUP_ID,
    "RTMP_PUSH": RTMP_PUSH_INPUT_TYPE_LOOKUP_ID,
    "RTP_PUSH": RTP_PUSH_INPUT_TYPE_LOOKUP_ID,
    "URL_PULL": URL_PULL_INPUT_TYPE_LOOKUP_ID
}
