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
	res.sendFile(__dirname + '/public/ping.html');
});

app.get('/ping', async (req, res) =>
{
    try
    {
        const PING_INFO = await NomadSDK.ping();
        res.status(200).json(PING_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/auth-ping', async (req, res) =>
{
    try
    {
        const PING_INFO = await NomadSDK.pingAuth();
        res.status(200).json(PING_INFO);
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