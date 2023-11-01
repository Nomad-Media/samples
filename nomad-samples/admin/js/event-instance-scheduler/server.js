import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadSDK from "../../../../nomad-sdk/js/sdk.min.js";

import express from 'express';
import multer from 'multer';

const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/event-instance-scheduler.html');
});

app.post('/create-event-instance', upload.none(), async (req, res) => {
    try
    {
        console.log(JSON.stringify(req.body, null, 4));
        const EVENT_INSTANCE = NomadSDK.createAndUpdateEventInstance(req.body.contentId,
            req.body.contentDefinitionId, req.body.instanceName, 
            req.body.isRecurring === "true", req.body.startDateTime + ":00.000Z", 
            req.body.endDateTime + ":00.000Z", req.body.recurringWeeks, 
            req.body.startTime + ":00.000Z", req.body.endTime + ":00.000Z", 
            req.body.daysOfTheWeek, req.body.isDisabled === "true",
            req.body.isExistingSeries === "yes", req.body.overrideSeriesDetails, 
            req.body.seriesName, req.body.seriesID, req.body.description, 
            req.body.slateVideoId, req.body.prerollVideoId, req.body.postrollVideoId, 
            req.body.isSecureOutput === "true", req.body.archiveFolder, 
            req.body.liveInputAId, req.body.liveInputBId, req.body.primaryLiveStreamUrl, 
            req.body.backupLiveStreamUrl);
        
        res.status(200).json(EVENT_INSTANCE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-event-instance', upload.none(), async (req, res) => {
    try
    {
        const EVENT_INSTANCE = NomadSDK.deleteEventInstance(req.body.deleteId, 
            req.body.deleteContentDefinitionId);
        
        res.status(200).json(EVENT_INSTANCE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});