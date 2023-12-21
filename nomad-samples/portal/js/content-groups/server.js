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
	res.sendFile(__dirname + '/public/content-groups.html');
});

app.post('/get-group', upload.none(), async (req, res) =>
{
    try
    {
        const GROUP = await NomadSDK.getContentGroup(req.body.groupId);

        res.status(200).json(GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-groups', upload.none(), async (req, res) =>
{
    try
    {
        const GROUPS = await NomadSDK.getContentGroups();

        res.status(200).json(GROUPS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/create-group', upload.none(), async (req, res) =>
{
    try
    {
        const GROUP = await NomadSDK.createContentGroup(req.body.name);

        res.status(200).json(GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/add-content', upload.none(), async (req, res) =>
{
    try
    {
        const GROUP = await NomadSDK.addContentsToContentGroup(req.body.groupId, 
            req.body.contentIds.split(','));

        res.status(200).json(GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/remove-content', upload.none(), async (req, res) =>
{
    try
    {
        const GROUP = await NomadSDK.removeContentsFromContentGroup(req.body.groupId, 
            req.body.contentIds.split(','));

        res.status(200).json(GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/rename-group', upload.none(), async (req, res) =>
{
    try
    {
        const GROUP = await NomadSDK.renameContentGroup(req.body.groupId, 
            req.body.renameGroup);

        res.status(200).json(GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/share-group', upload.none(), async (req, res) =>
{
    try
    {
        const GROUP = await NomadSDK.shareContentGroupWithUsers(req.body.groupId, 
            req.body.userIds.split(','));

        res.status(200).json(GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/stop-sharing-group', upload.none(), async (req, res) =>
{
    try
    {
        const GROUP = await NomadSDK.stopSharingContentGroupWithUsers(req.body.groupId, 
            req.body.userIds.split(','));

        res.status(200).json(GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/portal', upload.none(), async (req, res) =>
{
    try
    {
        const GROUP = await NomadSDK.getPortalGroups(req.body.groupNames.split(','), 
            req.body.portalId);

        res.status(200).json(GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/delete-group', upload.none(), async (req, res) =>
{
    try
    {
        const GROUP = await NomadSDK.deleteContentGroup(req.body.groupId);

        res.status(200).json(GROUP);
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