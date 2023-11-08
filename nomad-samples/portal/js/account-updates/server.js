import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadSDK from "../../../../nomad-sdk/js/nomad-media-sdk.min.js";
import express from 'express';
import multer from 'multer';


const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/account-updates.html');
});

app.get('/get-info', async (req, res) =>
{
    try
    {
        const PATH = `config/ea1d7060-6291-46b8-9468-135e7b94021b/lookups.json`
        const INFO = await NomadSDK.miscFunctions(PATH, "GET", null, true);

        res.status(200).json(INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/update-user', upload.none(), async (req, res) =>
{
    try
    {
        console.log(req.body);
        const USER_INFO = await NomadSDK.updateUser(req.body.address1, req.body.address2,
            req.body.city, req.body.country, req.body.firstName, req.body.lastName,
            req.body.organization, req.body.phoneNumber, req.body.phoneExt, 
            req.body.postalCode, req.body.state);

        res.status(200).json(USER_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/change-email', upload.none(), async (req, res) =>
{
    try
    {
        console.log(req.body);
        const USER_INFO = await NomadSDK.changeEmail(req.body.changeEmail, req.body.password);

        res.status(200).json(USER_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/change-password', upload.none(), async (req, res) =>
{
    try
    {
        console.log(req.body);
        const USER_INFO = await NomadSDK.changeEmail(req.body.currentPassword, req.body.newPassword);

        res.status(200).json(USER_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});