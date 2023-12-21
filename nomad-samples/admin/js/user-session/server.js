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
	res.sendFile(__dirname + '/public/user-session.html');
});

app.get('/get-user-session', async (req, res) =>
{
    try
    {
        const USER_SESSION = await NomadSDK.getUserSession();

        res.status(200).json(USER_SESSION);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/change-session-status', upload.none(), async (req, res) =>
{
    try
    {
        const USER_SESSION = await NomadSDK.changeSessionStatus(req.body.changeSessionStatus,
            req.body.applicationId);

        res.status(200).json(USER_SESSION);
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