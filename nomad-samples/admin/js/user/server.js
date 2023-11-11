import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadSDK from "../../../../nomad-sdk/js/nomad-media-sdk-debug.js";
import express from 'express';
import multer from 'multer';


const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/user.html');
});

app.delete('/delete-user', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUser();

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/delete-user-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserData();

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/delete-user-content-attribute-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserContentAttributeData();

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/delete-user-content-group-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserContentGroupData();

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/delete-user-dislikes-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserDislikesData();

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/delete-user-likes-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserLikesData();

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/delete-user-favorites-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserFavoritesData();

        res.status(200).json();
    }
    catch
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/delete-user-saved-search-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserSavedSearchData();

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.delete('/delete-user-session-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserSessionData();

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/delete-user-content-security-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserContentSecurityData(req.body.contentId, 
            req.body.contentDefinitionId, req.body.email, req.body.id, req.body.keyName, 
            `${req.body.expirationDate}Z`);

        res.status(200).json();
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/delete-user-video-tracking-data', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.deleteUserVideoTrackingData(req.body.assetId, req.body.contentId,
            req.body.videoTrackingAttribute, req.body.id, req.body.isFirstQuartile === "true",
            req.body.isMidpoint === "true", req.body.isThirdQuartile === "true",
            req.body.isComplete === "true", req.body.isHidden === "true", 
            req.body.isLiveStream === "true", req.body.maxSeconds, req.body.lastSeconds,
            req.body.totalSeconds, req.body.lastBeaconDate, req.body.keyName);

        res.status(200).json();
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