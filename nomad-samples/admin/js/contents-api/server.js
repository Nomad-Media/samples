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