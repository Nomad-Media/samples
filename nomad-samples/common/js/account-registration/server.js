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

app.get('/', (req, res) => 
{
    res.sendFile(__dirname + '/public/account-register.html');
});

app.post('/register', upload.none(), async (req, res) => 
{
    try
    {
        const REGISTER_INFO = await NomadSDK.register(req.body.email, req.body.firstName,
            req.body.lastName, req.body.password);

        res.status(200).json(REGISTER_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/verify', upload.none(), async (req, res) =>
{
    try
    {
        const VERIFY_INFO = await NomadSDK.verify(req.body.email, req.body.code);

        res.status(200).json(VERIFY_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/resend', upload.none(), async (req, res) =>
{
    try
    {
        const RESEND_INFO = await NomadSDK.resend(req.body.email);

        res.status(200).json(RESEND_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});
    

app.listen(port, () => 
{
    console.log(`Server is running on port ${port}`);
});