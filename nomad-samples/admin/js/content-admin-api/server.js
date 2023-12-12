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
	res.sendFile(__dirname + '/public/content-admin-api.html');
});

app.post('/create-tag-or-collection', upload.none(), async (req, res) => {
    try
    {
        const TAG_OR_COLLECTION = await NomadSDK.createTagOrCollection(req.body.createTagOrCollection,
            req.body.createTagName);
        res.status(200).json(TAG_OR_COLLECTION);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/add-tag-or-collection', upload.none(), async (req, res) => {
    try
    {
        const TAG_OR_COLLECTION = await NomadSDK.addTagOrCollection(req.body.addTagOrCollection,
            req.body.addTagContentId, req.body.addTagContentDefinition, req.body.addTagName,
            req.body.addTagId, req.body.createNew);
        res.status(200).json(TAG_OR_COLLECTION);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-tag-or-collection', upload.none(), async (req, res) => {
    try
    {
        const TAG_OR_COLLECTION = await NomadSDK.getTagOrCollection(req.body.getTagOrCollection,
            req.body.getTagId);
        res.status(200).json(TAG_OR_COLLECTION);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/remove-tag-or-collection', upload.none(), async (req, res) => {
    try
    {
        const TAG_OR_COLLECTION = await NomadSDK.removeTagOrCollection(req.body.removeTagOrCollection,
            req.body.removeTagContentId, req.body.removeTagContentDefinition, req.body.removeTagId);
        res.status(200).json(TAG_OR_COLLECTION);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-tag-or-collection', upload.none(), async (req, res) => {
    try
    {
        const TAG_OR_COLLECTION = await NomadSDK.deleteTagOrCollection(req.body.deleteTagOrCollection,
            req.body.deleteTagId);
        res.status(200).json(TAG_OR_COLLECTION);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/add-related-content', upload.none(), async (req, res) => {
    try
    {
        const RELATED_CONTENT = await NomadSDK.addRelatedContent(req.body.addRelatedContentId, 
            req.body.addRelatedRelatedContentId, req.body.addRelatedContentDefinition);
        res.status(200).json(RELATED_CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-related-content', upload.none(), async (req, res) => {
    try
    {
        const RELATED_CONTENT = await NomadSDK.deleteRelatedContent(req.body.deleteRelatedContentId, 
            req.body.deleteRelatedRelatedContentId, req.body.deleteRelatedContentDefinition);
        res.status(200).json(RELATED_CONTENT);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/add-custom-properties', upload.none(), async (req, res) => {
    try
    {
        const CUSTOM_PROPERTIES = await NomadSDK.addCustomProperties(req.body.addCustomPropertiesAssetId, 
            req.body.addCustomPropertiesName, req.body.addCustomPropertiesNames.split(','),
            req.body.addCustomPropertiesValues.split(','));
        res.status(200).json(CUSTOM_PROPERTIES);
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