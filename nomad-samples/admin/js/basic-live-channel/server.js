const COLLECTION_CONTENT_DEFINITION_ID = "20352932-05d2-4a7a-8821-06fcf4438ced";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadMediaSDK from "nomad-media-npm";
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
	res.sendFile(__dirname + '/public/basic-live-channel.html');
});

app.get('/get-collection-list', upload.none(), async (req, res) =>
{
    try
    {
        if (config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const COLLECTIONS = await getGroups(COLLECTION_CONTENT_DEFINITION_ID);

            res.status(200).json(COLLECTIONS);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-content-definition-list', upload.none(), async (req, res) =>
{
    try
    {
        if (config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const CONTENT_DEFINITIONS = await NomadSDK.miscFunctions("contentDefinition", "GET");

            res.status(200).json(CONTENT_DEFINITIONS.items);
        }
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
        if (config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const LIVE_CHANNELS = await NomadSDK.getLiveChannels();

            res.status(200).json(LIVE_CHANNELS);
        }
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
        if (config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const RELATED_CONTENT = await getGroups(req.body.contentDefinitionId);

            res.status(200).json(RELATED_CONTENT);
        }
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
        if (config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const TAGS = await getGroups(TAG_CONTENT_DEFINITION_ID);

            res.status(200).json(TAGS);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/getLiveChannels', async (req, res) => 
{
    try 
    {
        const LIVE_CHANNELS = await NomadSDK.getLiveChannels();
        res.status(200).json(LIVE_CHANNELS);
    } 
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getLiveChannel', upload.none(), async (req, res) => 
{
    try 
    {
        const LIVE_CHANNEL = await NomadSDK.getLiveChannel(req.body.channelId);
        res.status(200).json(LIVE_CHANNEL);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/createLiveChannel', upload.none(), async (req, res) => 
{
    try 
    {
        const SECURITY_GROUPS = req.body.createSecurityGroups === null ? "" : req.body.createSecurityGroups.split(',');

        const LIVE_CHANNEL = await NomadSDK.createLiveChannel(req.body.createChannelName, 
            req.body.createChannelThumbnailImage, req.body.createChannelArchiveFolderAssetId,
            req.body.createChannelEnableHighAvailability === "true", 
            req.body.createChannelEnableLiveClipping === "true",
            req.body.createChannelIsSecureOutput === "true", 
            req.body.createChannelIsOutputScreenshots === "true",
            req.body.createChannelType, req.body.createChannelUrl, SECURITY_GROUPS);
        res.status(200).json(LIVE_CHANNEL);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/updateLiveChannel', upload.none(), async (req, res) => 
{
    try 
    {
        const CHANNEL = JSON.parse(req.body.updateChannelSelect);

        const SECURITY_GROUPS = req.body.updateSecurityGroups === null ? "" : req.body.updateSecurityGroups.split(',');

        const LIVE_CHANNEL = await NomadSDK.updateLiveChannel(CHANNEL.id,
            req.body.updateChannelName, req.body.updateChannelThumbnailImage, 
            req.body.updateChannelArchiveFolderAssetId,
            req.body.updateChannelEnableHighAvailability === "true", 
            req.body.updateChannelEnableLiveClipping === "true",
            req.body.updateChannelIsSecureOutput === "true", 
            req.body.updateChannelIsOutputScreenshots === "true",
            req.body.updateChannelType, req.body.updateChannelUrl, 
            SECURITY_GROUPS);
        res.status(200).json(LIVE_CHANNEL);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/deleteLiveChannel', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_CHANNEL = await NomadSDK.deleteLiveChannel(req.body.deleteChannelId,
            req.body.deleteLiveInputs === "true");
        res.status(200).json(LIVE_CHANNEL);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/clipLiveChannel', upload.none(), async (req, res) =>
{
    try
    {
        console.log(JSON.stringify(req.body, null, 4));
        const LIVE_CHANNEL = JSON.parse(req.body.clipLiveChannelSelect);

        let collections = null;
        if (req.body.clipLiveChannelCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.clipLiveChannelCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }

        let relatedContent = null;
        if (req.body.clipLiveChannelRelatedContentSelect)
        {
            const PARSED_RELATED_CONTENT = JSON.parse(req.body.clipLiveChannelRelatedContentSelect);
            relatedContent = Array.isArray(PARSED_RELATED_CONTENT) ? PARSED_RELATED_CONTENT : [PARSED_RELATED_CONTENT];
        }

        let tags = null;
        if (req.body.clipLiveChannelTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.clipLiveChannelTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const CLIP = await NomadSDK.clipLiveChannel(LIVE_CHANNEL.id, 
            req.body.startTimeCode, req.body.endTimeCode, req.body.title,
            req.body.outputFolderAssetId, tags, collections, relatedContent, 
            req.body.videoBitrate, req.body.audioTracks);
        res.status(200).json(CLIP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/refreshLiveChannels', async (req, res) =>
{
    try
    {
        const LIVE_CHANNEL = await NomadSDK.liveChannelRefresh();
        res.status(200).json(LIVE_CHANNEL);
    }

    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/nextEvent', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_EVENT = await NomadSDK.nextEvent(req.body.channelId);
        res.status(200).json(SCHEDULE_EVENT);
    }

    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/startOutputTracking', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_EVENT = await NomadSDK.startOutputTracking(req.body.channelId);
        res.status(200).json(SCHEDULE_EVENT);
    }

    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/moveScheduleEvent', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_EVENT = await NomadSDK.moveScheduleEvent(req.body.channelId,
            req.body.scheduleEventId, req.body.previousScheduleEventId);
        res.status(200).json(SCHEDULE_EVENT);
    }

    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/getLiveInputs', async (req, res) => 
{
    try
    {
        const LIVE_INPUTS = await NomadSDK.getLiveInputs();

        res.status(200).json(LIVE_INPUTS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getLiveInput', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_INPUT = await NomadSDK.getLiveInput(req.body.getInputId);

        res.status(200).json(LIVE_INPUT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/createInput', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_INPUT = await NomadSDK.createLiveInput(req.body.createInputName, 
            req.body.createInputSource, req.body.createInputType, 
            req.body.createInputIsStandard === "true", req.body.createInputVideoAssetId,
            req.body.createInputDestinations.split(","), req.body.createInputSources.split(","));

        res.status(200).json(LIVE_INPUT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/updateInput', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_INPUT = await NomadSDK.updateLiveInput(req.body.updateInputId, 
            req.body.updateInputName, req.body.updateInputSource, req.body.updateInputType, 
            req.body.updateInputIsStandard === "true", req.body.updateInputVideoAssetId,
            req.body.updateInputDestinations.split(","), req.body.updateInputSources.split(","));

        res.status(200).json(LIVE_INPUT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/deleteInput', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_INPUT = await NomadSDK.deleteLiveInput(req.body.deleteInputId);

        res.status(200).json(LIVE_INPUT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/addAssetScheduleEvent', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_EVENT = await NomadSDK.addAssetScheduleEvent(
            req.body.addAssetScheduleEventChannelId, 
            { 
                id: req.body.addAssetScheduleEventAssetId,
                name: req.body.addAssetScheduleEventAssetName 
            }, 
            req.body.addAssetScheduleEventIsLoop === "true", 
            req.body.addAssetScheduleEventDurationTimeCode, 
            req.body.addAssetScheduleEventPreviousId);


        res.status(200).json(SCHEDULE_EVENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/addInputScheduleEvent', upload.none(), async (req, res) =>
{
    try
    {
        let backupInput = null;
        if (req.body.addInputScheduleEventBackupInputId === null)
        {
            backupInput = "";
        }
        else
        {
            backupInput = {
                id: req.body.addInputScheduleEventBackupInputId,
                name: req.body.addInputScheduleEventBackupInputName
            };
        }
        const SCHEDULE_EVENT = await NomadSDK.addInputScheduleEvent(
            req.body.addInputScheduleEventChannelId, 
            {
                id: req.body.addInputScheduleEventInputId,
                name: req.body.addInputScheduleEventInputName
            }, backupInput,
            req.body.addInputScheduleEventFixedOnAirTimeUTC, 
            req.body.addInputScheduleEventPreviousId);

        res.status(200).json(SCHEDULE_EVENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getAssetScheduleEvent', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_EVENT = await NomadSDK.getAssetScheduleEvent(req.body.channelId, 
            req.body.scheduleEventId);

        res.status(200).json(SCHEDULE_EVENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getInputScheduleEvent', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_EVENT = await NomadSDK.getInputScheduleEvent(req.body.channelId, 
            req.body.scheduleEventId);

        res.status(200).json(SCHEDULE_EVENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/updateAssetScheduleEvent', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_EVENT = await NomadSDK.updateAssetScheduleEvent(
            req.body.scheduleEventId, req.body.channelId, req.body.assetId, req.body.assetName, 
            req.body.IsLoop === "true", req.body.DurationTimeCode, req.body.previousId);

        res.status(200).json(SCHEDULE_EVENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/updateInputScheduleEvent', upload.none(), async (req, res) =>
{
    try
    {
        const INPUT = req.body.inputId === '' ? null : { id: req.body.inputId, name: req.body.inputName};
        const BACKUP_INPUT = req.body.backupInputId === '' ? null : { id: req.body.backupInputId, name: req.body.backupInputName};
        const FIXED_ON_AIR_TIME_UTC = req.body.fixedOnAirTimeUTC === '' ? null : req.body.fixedOnAirTimeUTC;

        const SCHEDULE_EVENT = await NomadSDK.updateInputScheduleEvent(
            req.body.scheduleEventId, req.body.channelId, INPUT, BACKUP_INPUT,
            FIXED_ON_AIR_TIME_UTC, );

        res.status(200).json(SCHEDULE_EVENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/removeAssetScheduleEvent', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_EVENT = await NomadSDK.removeAssetScheduleEvent(req.body.removeAssetScheduleEventId);

        res.status(200).json(SCHEDULE_EVENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/removeLiveInputScheduleEvent', upload.none(), async (req, res) =>
{
    try
    {
        const SCHEDULE_EVENT = await NomadSDK.removeLiveInputScheduleEvent(req.body.removeLiveInputScheduleEventId);

        res.status(200).json(SCHEDULE_EVENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/startLiveChannel', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_CHANNEL = await NomadSDK.startLiveChannel(req.body.startLiveChannelId);

        res.status(200).json(LIVE_CHANNEL);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/stopLiveChannel', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_CHANNEL = await NomadSDK.stopLiveChannel(req.body.stopLiveChannelId);

        res.status(200).json(LIVE_CHANNEL);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/getLiveOperators', async (req, res) =>
{
    try
    {
        const LIVE_OPERATORS = await NomadSDK.getLiveOperators();

        res.status(200).json(LIVE_OPERATORS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getLiveOperator', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_OPERATOR = await NomadSDK.getLiveOperator(req.body.getLiveOperatorId);

        res.status(200).json(LIVE_OPERATOR);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/startBroadcast', upload.none(), async (req, res) =>
{
    try
    {
        const BROADCAST = await NomadSDK.startBroadcast(req.body.startBroadcastChannelId,
            req.body.startBroadcastPrerollAssetId, req.body.startBroadcastPostrollAssetId,
            req.body.startBroadcastLiveInputId, req.body.startBroadcastRelatedAssetIds.split(","),
            req.body.startBroadcastTagIds.split(","));

        res.status(200).json(BROADCAST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/cancelBroadcast', upload.none(), async (req, res) =>
{
    try
    {
        const BROADCAST = await NomadSDK.cancelBroadcast(req.body.cancelBroadcastChannelId);

        res.status(200).json(BROADCAST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/stopBroadcast', upload.none(), async (req, res) =>
{
    try
    {
        const BROADCAST = await NomadSDK.stopBroadcast(req.body.stopBroadcastChannelId);

        res.status(200).json(BROADCAST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/getCompletedSegments', async (req, res) =>
{
    try
    {
        const COMPLETED_SEGMENTS = await NomadSDK.getCompletedSegments(req.body.getCompletedSegmentsChannelId);

        res.status(200).json(COMPLETED_SEGMENTS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/startSegment', upload.none(), async (req, res) =>
{
    try
    {
        const SEGMENTS = await NomadSDK.startSegments(req.body.startSegmentChannelId);

        res.status(200).json(SEGMENTS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/cancelSegment', upload.none(), async (req, res) =>
{
    try
    {
        const SEGMENTS = await NomadSDK.cancelSegments(req.body.cancelSegmentChannelId);

        res.status(200).json(SEGMENTS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/completeSegment', upload.none(), async (req, res) =>
{
    try
    {
        const SEGMENTS = await NomadSDK.completeSegments(req.body.completeSegmentChannelId,
            req.body.completeSegmentRelatedAssetIds.split(","), 
            req.body.completeSegmentTagIds.split(","));

        res.status(200).json(SEGMENTS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
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