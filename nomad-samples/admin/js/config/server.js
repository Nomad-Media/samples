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
	res.sendFile(__dirname + '/public/config.html');
});

app.post('/get-config', upload.none(), async (req, res) => {
    try
    {
        const CONFIG = await NomadSDK.getConfig(req.body.configType);
        res.status(200).json(CONFIG);
    } 
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/get-server-time', async (req, res) => {
    try
    {
        const SERVER_TIME = await NomadSDK.getServerTime();
        res.status(200).json(SERVER_TIME);
    } 
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/clear-server-cache', async (req, res) => {
    try
    {
        const CLEAR_CACHE = await NomadSDK.clearServerCache();
        res.status(200).json(CLEAR_CACHE);
    } 
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
