import * as sysConstants from "../constants/system-constants.js";

/**
 * Live Channel Types
 *
 */
const LIVE_CHANNEL_TYPES = {
    External: sysConstants.EXTERNAL_CHANNEL_TYPE_LOOKUP_ID,
    IVS: sysConstants.IVS_CHANNEL_TYPE_LOOKUP_ID,
    Normal: sysConstants.NORMAL_CHANNEL_TYPE_LOOKUP_ID,
    Realtime: sysConstants.REALTIME_CHANNEL_TYPE_LOOKUP_ID
};

export default LIVE_CHANNEL_TYPES;
