import * as sysConstants from "../constants/system-constants.js";

/**
 * Live Input Types
 *
 * "RTP Push"
 * "RTMP Push"
 * "RTMP Pull"
 * "URL Pull"
 *
 */
const liveInputTypes = {
    RTMP_PULL: sysConstants.RTMP_PULL_INPUT_TYPE_LOOKUP_ID,
    RTMP_PUSH: sysConstants.RTMP_PUSH_INPUT_TYPE_LOOKUP_ID,
    RTP_PUSH: sysConstants.RTP_PUSH_INPUT_TYPE_LOOKUP_ID,
    URL_PULL: sysConstants.URL_PULL_INPUT_TYPE_LOOKUP_ID
};

export default liveInputTypes;
