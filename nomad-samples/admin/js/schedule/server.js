const COLLECTION_CONTENT_DEFINITION_ID = "20352932-05d2-4a7a-8821-06fcf4438ced";
const DAY_CONTENT_DEFINITION_ID = "fc8042c1-1ade-400d-b0aa-02937e658ae6";
const INTELLIGENT_PROGRAMMING_CONTENT_DEFINITION_ID = "d77bf165-33e7-4002-9c58-3c9874acf187";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";
const TIMEZONE_CONTENT_DEFINITION_ID = "6ffc9376-af95-4f70-864e-1b00b8f8a283";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadMediaSDK from "nomad-media-sdk";
import config from "../../../config.mjs";
const NomadSDK = new NomadMediaSDK(config);

import express from 'express';
import multer from 'multer';


const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/schedule.html');
});

app.get('/get-content-definition-list', upload.none(), async (req, res) =>
{
    try
    {
        const CONTENT_DEFINITIONS = await NomadSDK.miscFunctions("contentDefinition", "GET");

        res.status(200).json(CONTENT_DEFINITIONS.items);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-collection-list', upload.none(), async (req, res) =>
{
    try
    {
        const COLLECTIONS = await getGroups(COLLECTION_CONTENT_DEFINITION_ID);

        res.status(200).json(COLLECTIONS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-day-list', upload.none(), async (req, res) =>
{
    try
    {
        const DAYS = await getGroups(DAY_CONTENT_DEFINITION_ID);

        res.status(200).json(DAYS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-live-channel-list', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_CHANNELS = await NomadSDK.getLiveChannels();

        res.status(200).json(LIVE_CHANNELS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-playlist-schedule-list', upload.none(), async (req, res) =>
{
    try
    {
        const PLAYLIST_SCHEDULES = await getGroups(INTELLIGENT_PROGRAMMING_CONTENT_DEFINITION_ID);
        const PLAYLISTS = [];

        PLAYLIST_SCHEDULES.forEach(item => {
            if (item.identifiers.scheduleType === 4) {
                PLAYLISTS.push(item);
            }
        });

        res.status(200).json(PLAYLISTS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-related-content-list', upload.none(), async (req, res) =>
{
    try
    {
        const RELATED_CONTENT = await getGroups(req.body.contentDefinitionId);

        res.status(200).json(RELATED_CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-tag-list', upload.none(), async (req, res) =>
{
    try
    {
        const TAGS = await getGroups(TAG_CONTENT_DEFINITION_ID);

        res.status(200).json(TAGS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-timezone-list', upload.none(), async (req, res) =>
{
    try
    {
        const TIMEZONES = await getGroups(TIMEZONE_CONTENT_DEFINITION_ID);

        res.status(200).json(TIMEZONES);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-intelligent-playlist', upload.none(), async (req, res) =>
{
    try
    {
        let collections = null;
        if (req.body.createIntelligentPlaylistCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.createIntelligentPlaylistCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }

        let relatedContents = null;
        if (req.body.createIntelligentPlaylistRelatedContentsSelect)
        {
            const PARSED_RELATED_CONTENTS = JSON.parse(req.body.createIntelligentPlaylistRelatedContentsSelect);
            relatedContents = Array.isArray(PARSED_RELATED_CONTENTS) ? PARSED_RELATED_CONTENTS : [PARSED_RELATED_CONTENTS];
            relatedContents.forEach(item => {
                item["type"] = req.body.createIntelligentPlaylistRelatedContentsContentDefinitionsSelect.description;
            });
        }

        let tags = null;
        if (req.body.createIntelligentPlaylistTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.createIntelligentPlaylistTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const THUMBNAIL_ASSET = (req.body.thumbnailAssetId) 
            ? { "id": req.body.thumbnailAssetId }
            : null;

        const INTELLIGENT_PLAYLIST = await NomadSDK.createIntelligentPlaylist(
            collections, req.body.endSearchDate, req.body.endSearchDurationInMinutes, 
            req.body.name, relatedContents, req.body.searchDate, req.body.searchDurationInMinutes,
            req.body.createIntelligentPlaylistSearchFilterTypeSelect.id,
            tags, THUMBNAIL_ASSET);

        res.status(200).json(INTELLIGENT_PLAYLIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-intelligent-schedule', upload.none(), async (req, res) =>
{
    try
    {
        const DEFAULT_VIDEO_ASSET = (req.body.defaultVideoAssetId) 
            ? { "id": req.body.defaultVideoAssetId }
            : null;

        const THUMBNAIL_ASSET = (req.body.thumbnailAssetId) 
            ? { "id": req.body.thumbnailAssetId }
            : null;

        const INTELLIGENT_SCHEDULE = await NomadSDK.createIntelligentSchedule(
            DEFAULT_VIDEO_ASSET, req.body.name, THUMBNAIL_ASSET, 
            req.body.createIntelligentScheduleTimeZoneSelect.id);

        res.status(200).json(INTELLIGENT_SCHEDULE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-playlist', upload.none(), async (req, res) =>
{
    try
    {
        const DEFAULT_VIDEO_ASSET = (req.body.defaultVideoAssetId && req.body.createPlaylistLoopPlaylistSelect === "False") 
            ? { "id": req.body.defaultVideoAssetId }
            : null;
        
        const THUMBNAIL_ASSET = (req.body.thumbnailAssetId) 
            ? { "id": req.body.thumbnailAssetId }
            : null;

        const PLAYLIST = await NomadSDK.createPlaylist(req.body.name,
            THUMBNAIL_ASSET, req.body.createPlaylistLoopPlaylistSelect === "True", 
            DEFAULT_VIDEO_ASSET)

        res.status(200).json(PLAYLIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-playlist-video', upload.none(), async (req, res) =>
{
    try
    {
        const VIDEO = await NomadSDK.createPlaylistVideo(req.body.playlistId, 
            {id: req.body.assetId}, req.body.previousItem);

        res.status(200).json(VIDEO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-schedule-item-asset', upload.none(), async (req, res) =>
{
    try
    {
        let days = null;
        if (req.body.createScheduleItemAssetDays)
        {
            const PARSED_DAYS = JSON.parse(req.body.createScheduleItemAssetDays);
            days = Array.isArray(PARSED_DAYS) ? PARSED_DAYS : [PARSED_DAYS];
        }

        const ASSETS = await NomadSDK.createScheduleItemAsset(req.body.scheduleId, 
            {id: req.body.assetId}, days, req.body.durationTimeCode, req.body.endTimeCode, 
            req.body.previousItem, req.body.timeCode);

        res.status(200).json(ASSETS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-schedule-item-live-channel', upload.none(), async (req, res) =>
{
    try
    {
        let days = null;
        if (req.body.createScheduleItemLiveChannelDays)
        {
            const PARSED_DAYS = JSON.parse(req.body.createScheduleItemLiveChannelDays);
            days = Array.isArray(PARSED_DAYS) ? PARSED_DAYS : [PARSED_DAYS];
        }

        const LIVE_CHANNEL = await NomadSDK.createScheduleItemLiveChannel(
            req.body.scheduleId, days, req.body.durationTimeCode, req.body.endTimeCode, 
            JSON.parse(req.body.createScheduleItemLiveChannelsSelect), 
            req.body.previousItem, req.body.timeCode);

        res.status(200).json(LIVE_CHANNEL);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-schedule-item-search-filter', upload.none(), async (req, res) =>
{
    try
    {
        let collections = null;
        if (req.body.createScheduleItemSearchFilterCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.createScheduleItemSearchFilterCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }
        
        let days = null;
        if (req.body.createScheduleItemSearchFilterDays)
        {
            const PARSED_DAYS = JSON.parse(req.body.createScheduleItemSearchFilterDays);
            days = Array.isArray(PARSED_DAYS) ? PARSED_DAYS : [PARSED_DAYS];
        }

        let relatedContents = null;
        if (req.body.createScheduleItemSearchFilterRelatedContentsSelect)
        {
            const PARSED_RELATED_CONTENTS = JSON.parse(req.body.createScheduleItemSearchFilterRelatedContentsSelect);
            relatedContents = Array.isArray(PARSED_RELATED_CONTENTS) ? PARSED_RELATED_CONTENTS : [PARSED_RELATED_CONTENTS];
            relatedContents.forEach(item => {
                item["type"] = req.body.createScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect.description;
            });
        }

        let tags = null;
        if (req.body.createScheduleItemSearchFilterTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.createScheduleItemSearchFilterTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const SEARCH_FILTER = await NomadSDK.createScheduleItemSearchFilter(
            req.body.scheduleId, collections, days, req.body.durationTimeCode, 
            req.body.endSearchDate, req.body.endSearchDurationInMinutes, req.body.endTimeCode, 
            req.body.previousItem, relatedContents, req.body.searchDate, 
            req.body.searchDurationInMinutes, 
            JSON.parse(req.body.createScheduleItemSearchFilterTypeSelect).id, tags, 
            req.body.timeCode);

        res.status(200).json(SEARCH_FILTER);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-schedule-item-playlist-schedule', upload.none(), async (req, res) =>
{
    try
    {
        let days = null;
        if (req.body.createScheduleItemPlaylistScheduleDays)
        {
            const PARSED_DAYS = JSON.parse(req.body.createScheduleItemPlaylistScheduleDays);
            days = Array.isArray(PARSED_DAYS) ? PARSED_DAYS : [PARSED_DAYS];
        }

        const PLAYLIST_SCHEDULE = await NomadSDK.createScheduleItemPlaylistSchedule(
            req.body.scheduleId, days, req.body.durationTimeCode, req.body.endTimeCode, 
            JSON.parse(req.body.createScheduleItemPlaylistSchedulesSelect), 
            req.body.previousItem, req.body.timeCode);

        res.status(200).json(PLAYLIST_SCHEDULE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/delete-intelligent-playlist', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteIntelligentPlaylist(req.body.scheduleId);

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/delete-intelligent-schedule', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteIntelligentSchedule(req.body.scheduleId);

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/delete-playlist', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deletePlaylist(req.body.scheduleId);

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/delete-schedule-item', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteScheduleItem(req.body.scheduleId,
            req.body.itemId);

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-intelligent-playlist', upload.none(), async (req, res) =>
{
    try
    {
        const INTELLIGENT_PLAYLIST = await NomadSDK.getIntelligentPlaylist(req.body.scheduleId);

        res.status(200).json(INTELLIGENT_PLAYLIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-intelligent-schedule', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE = await NomadSDK.getIntelligentSchedule(req.body.scheduleId);

        res.status(200).json(SCHEDULE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-playlist', upload.none(), async (req, res) =>
{
    try
    {
        const PLAYLIST = await NomadSDK.getPlaylist(req.body.scheduleId);

        res.status(200).json(PLAYLIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-schedule-item', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_ITEM = await NomadSDK.getScheduleItem(req.body.scheduleId,
            req.body.itemId);

        res.status(200).json(SCHEDULE_ITEM);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-schedule-items', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_ITEMS = await NomadSDK.getScheduleItems(req.body.scheduleId);

        res.status(200).json(SCHEDULE_ITEMS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-schedule-preview', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_PREVIEW = await NomadSDK.getSchedulePreview(req.body.scheduleId);

        res.status(200).json(SCHEDULE_PREVIEW);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/move-schedule-item', upload.none(), async (req, res) =>
{
    try
    {
        const MOVE_INFO = await NomadSDK.moveScheduleItem(req.body.scheduleId, req.body.itemId,
            req.body.previousItem);

        res.status(200).json(MOVE_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/publish-intelligent-schedule', upload.none(), async (req, res) =>
{
    try
    {
        const PUBLISH_INFO = await NomadSDK.publishIntelligentSchedule(req.body.scheduleId, 
            req.body.numberOfLockedDays);

        res.status(200).json(PUBLISH_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/start-schedule', upload.none(), async (req, res) =>
{
    try
    {
        const START_INFO = await NomadSDK.startSchedule(req.body.scheduleId, 
            req.body.skipCleanupOnFailure === "True");

        res.status(200).json(START_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/stop-schedule', upload.none(), async (req, res) =>
{
    try
    {
        const STOP_INFO = await NomadSDK.stopSchedule(req.body.scheduleId, req.body.forceStop === "True");

        res.status(200).json(STOP_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/update-intelligent-playlist', upload.none(), async (req, res) =>
{
    try
    {
        console.log(req.body);
        let collections = null;
        if (req.body.updateIntelligentPlaylistCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.updateIntelligentPlaylistCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }

        let relatedContents = null;
        if (req.body.updateIntelligentPlaylistRelatedContentsSelect)
        {
            const PARSED_RELATED_CONTENTS = JSON.parse(req.body.updateIntelligentPlaylistRelatedContentsSelect);
            relatedContents = Array.isArray(PARSED_RELATED_CONTENTS) ? PARSED_RELATED_CONTENTS : [PARSED_RELATED_CONTENTS];
            relatedContents.forEach(item => {
                item["type"] = req.body.updateIntelligentPlaylistRelatedContentsContentDefinitionsSelect.description;
            });
        }

        let tags = null;
        if (req.body.updateIntelligentPlaylistTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.updateIntelligentPlaylistTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const THUMBNAIL_ASSET = (req.body.thumbnailAssetId) 
            ? { "id": req.body.thumbnailAssetId }
            : null;

        const INTELLIGENT_PLAYLIST = await NomadSDK.updateIntelligentPlaylist(
            req.body.scheduleId, collections, req.body.endSearchDate,
            req.body.endSearchDurationInMinutes, req.body.name, relatedContents,
            req.body.searchDate, req.body.searchDurationInMinutes, req.body.searchFilterType, 
            tags, THUMBNAIL_ASSET);

        res.status(200).json(INTELLIGENT_PLAYLIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/update-intelligent-schedule', upload.none(), async (req, res) =>
{
    try
    {
        const DEFAULT_VIDEO_ASSET = (req.body.defaultVideoAssetId) 
            ? { "id": req.body.defaultVideoAssetId }
            : null;

        const THUMBNAIL_ASSET = (req.body.thumbnailAssetId) 
            ? { "id": req.body.thumbnailAssetId }
            : null;

        const INTELLIGENT_SCHEDULE = await NomadSDK.updateIntelligentSchedule(
            req.body.scheduleId, DEFAULT_VIDEO_ASSET, req.body.name, 
            THUMBNAIL_ASSET, req.body.updateIntelligentScheduleTimeZoneSelect.id);

        res.status(200).json(INTELLIGENT_SCHEDULE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/update-playlist', upload.none(), async (req, res) =>
{
    try
    {
        const DEFAULT_VIDEO_ASSET = (req.body.defaultVideoAssetId && req.body.updatePlaylistLoopPlaylistSelect === "False")
            ? { "id": req.body.defaultVideoAssetId }
            : null;

        const THUMBNAIL_ASSET = (req.body.thumbnailAssetId) 
            ? { "id": req.body.thumbnailAssetId }
            : null;

        const PLAYLIST = await NomadSDK.updatePlaylist(
            req.body.scheduleId, DEFAULT_VIDEO_ASSET, 
            req.body.updatePlaylistLoopPlaylistSelect === "True", 
            req.body.name, THUMBNAIL_ASSET);

        res.status(200).json(PLAYLIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/update-schedule-item-asset', upload.none(), async (req, res) =>
{
    try
    {
        let days = null;
        if (req.body.updateScheduleItemAssetDays)
        {
            const PARSED_DAYS = JSON.parse(req.body.updateScheduleItemAssetDays);
            days = Array.isArray(PARSED_DAYS) ? PARSED_DAYS : [PARSED_DAYS];
        }

        const ASSET = await NomadSDK.updateScheduleItemAsset(req.body.scheduleId, 
            req.body.itemId, {"id": req.body.assetId}, days, req.body.durationTimeCode, 
            req.body.endTimeCode, req.body.timeCode);

        res.status(200).json(ASSET);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/update-schedule-item-live-channel', upload.none(), async (req, res) =>
{
    try
    {
        let days = null;
        if (req.body.updateScheduleItemLiveChannelDays)
        {
            const PARSED_DAYS = JSON.parse(req.body.updateScheduleItemLiveChannelDays);
            days= Array.isArray(PARSED_DAYS) ? PARSED_DAYS : [PARSED_DAYS];
        }

        const LIVE_CHANNEL = await NomadSDK.updateScheduleItemLiveChannel(
            req.body.scheduleId, req.body.itemId, days, req.body.durationTimeCode, 
            req.body.endTimeCode, JSON.parse(req.body.updateScheduleItemLiveChannelsSelect), 
            req.body.timeCode);

        res.status(200).json(LIVE_CHANNEL);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/update-schedule-item-search-filter', upload.none(), async (req, res) =>
{
    try
    {
        let collections = null;
        if (req.body.updateScheduleItemSearchFilterCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.updateScheduleItemSearchFilterCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }
        
        let days = null;
        if (req.body.updateScheduleItemSearchFilterDays)
        {
            const PARSED_DAYS = JSON.parse(req.body.updateScheduleItemSearchFilterDays);
            days = Array.isArray(PARSED_DAYS) ? PARSED_DAYS : [PARSED_DAYS];
        }

        let relatedContents = null;
        if (req.body.updateScheduleItemSearchFilterRelatedContentsSelect)
        {
            const PARSED_RELATED_CONTENTS = JSON.parse(req.body.updateScheduleItemSearchFilterRelatedContentsSelect);
            relatedContents = Array.isArray(PARSED_RELATED_CONTENTS) ? PARSED_RELATED_CONTENTS : [PARSED_RELATED_CONTENTS];
            relatedContents.forEach(item => {
                item["type"] = req.body.updateScheduleItemSearchFilterRelatedContentsContentDefinitionsSelect.description;
            });
        }

        let tags = null;
        if (req.body.updateScheduleItemSearchFilterTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.updateScheduleItemSearchFilterTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const SEARCH_FILTER = await NomadSDK.updateScheduleItemSearchFilter(
            req.body.scheduleId, req.body.itemId, collections, days, 
            req.body.durationTimeCode, req.body.endSearchDate, 
            req.body.endSearchDurationInMinutes, req.body.endTimeCode, 
            relatedContents, req.body.searchDate, req.body.searchDurationInMinutes, 
            JSON.parse(req.body.updateScheduleItemSearchFilterTypeSelect).id, tags, 
            req.body.timeCode);

        res.status(200).json(SEARCH_FILTER);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/update-schedule-item-playlist-schedule', upload.none(), async (req, res) =>
{
    try
    {
        let days = null;
        if (req.body.updateScheduleItemPlaylistScheduleDays)
        {
            const PARSED_DAYS = JSON.parse(req.body.updateScheduleItemPlaylistScheduleDays);
            days = Array.isArray(PARSED_DAYS) ? PARSED_DAYS : [PARSED_DAYS];
        }

        const PLAYLIST_SCHEDULE = await NomadSDK.updateScheduleItemPlaylistSchedule(
            req.body.scheduleId, req.body.itemId, days, req.body.durationTimeCode, 
            req.body.endTimeCode, JSON.parse(req.body.updateScheduleItemPlaylistSchedulesSelect), 
            req.body.timeCode);

        res.status(200).json(PLAYLIST_SCHEDULE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

async function getGroups(GROUP_CONTENT_DEFINITION_ID)
{
    const GROUP_LIST = [];
    let offset = 0;
    while (true)
    {
        const SEARCH_INFO = await NomadSDK.search(null, offset, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: GROUP_CONTENT_DEFINITION_ID,
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8"
                }
            ], null, null, null, null, true, null);

        if (!SEARCH_INFO) return [];
        GROUP_LIST.push(...SEARCH_INFO.items);

        ++offset;

        if (SEARCH_INFO.items.length < 100) break;
    }
    return GROUP_LIST;
}