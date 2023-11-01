import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadSDK from "../../../../../nomad-sdk/js/sdk.min.js";

import express from 'express';
import multer from 'multer';

const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/movie-groups.html');
});

app.get('/get-movie-groups', async (req, res) => {
    try
    {
        const MOVIE_GROUPS = await NomadSDK.getContentGroups();
        res.status(200).json(MOVIE_GROUPS);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-movie-group', upload.none(), async (req, res) => {
    try
    {
        const MOVIE_GROUP = await NomadSDK.getContentGroup(req.body.getGroupId);
        res.status(200).json(MOVIE_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/create-movie-group', upload.none(), async (req, res) => {
    try
    {
        const MOVIE_GROUP = await NomadSDK.createContentGroup(req.body.createName);
        res.status(200).json(MOVIE_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/add-movie-to-movie-group', upload.none(), async (req, res) => {
    try
    {
        const MOVIE_GROUP = await NomadSDK.addContentsToContentGroup(req.body.addGroupId,
            req.body.addContentIds.split(","));
        res.status(200).json(MOVIE_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/remove-movie-from-movie-group', upload.none(), async (req, res) => {
    try
    {
        const MOVIE_GROUP = await NomadSDK.removeContentsFromContentGroup(req.body.removeGroupId,
            req.body.removeContentIds.split(","));
        res.status(200).json(MOVIE_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/rename-movie-group', upload.none(), async (req, res) => {
    try
    {
        const MOVIE_GROUP = await NomadSDK.renameContentGroup(req.body.renameGroupId,
            req.body.renameGroup);
        res.status(200).json(MOVIE_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/share-movie-group', upload.none(), async (req, res) => {
    try
    {
        const MOVIE_GROUP = await NomadSDK.shareContentGroup(req.body.shareGroupId,
            req.body.shareUserIds.split(","));
        res.status(200).json(MOVIE_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/unshare-movie-group', upload.none(), async (req, res) => {
    try
    {
        const MOVIE_GROUP = await NomadSDK.stopSharingContentGroupWithUsers(
            req.body.stopsSharingGroupId, req.body.removeSharedUserIds.split(","));
        res.status(200).json(MOVIE_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-movie-group', upload.none(), async (req, res) => {
    try
    {
        const MOVIE_GROUP = await NomadSDK.deleteContentGroup(req.body.deleteGroupId);
        res.status(200).json(MOVIE_GROUP);
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