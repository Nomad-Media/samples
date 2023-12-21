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
	res.sendFile(__dirname + '/public/content.html');
});

app.post('/get-content', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.getContent(req.body.getContentContentId, 
            req.body.getContentContentDefinitionId, req.body.isRevision);
        res.status(200).json(CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/create-content', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.createContent(req.body.createContentContentDefinitionId, 
            req.body.createContentLanguageId);
        res.status(200).json(CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/update-content', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.updateContent(req.body.updateContentContentId, 
            req.body.updateContentContentDefinitionId, req.body.updateContentProperties,
            req.body.updateContentLanguageId);
        res.status(200).json(CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/deactivate-content', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.deactivateContentUserTrack(req.body.sessionId,
            req.body.contentId, req.body.contentDefinitionId, 
            req.body.deactivate === "True");
        res.status(200).json(CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-content-user-track', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.getContentUserTrack(req.body.contentId,
            req.body.contentDefinitionId, req.body.sortColumn, 
            req.body.isDescending === "True", req.body.pageIndex, req.body.pageSize);
        res.status(200).json(CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-content-user-track-touch', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.getContentUserTrackTouch(req.body.contentId,
            req.body.contentDefinitionId);
        res.status(200).json(CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-content', upload.none(), async (req, res) => {
    try
    {
        const CONTENT = await NomadSDK.deleteContent(req.body.deleteContentContentId,
            req.body.deleteContentContentDefinitionId);
        res.status(200).json(CONTENT);
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