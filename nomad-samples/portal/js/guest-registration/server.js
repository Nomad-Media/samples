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
	res.sendFile(__dirname + '/public/guest-register.html');
});

app.post('/invite', upload.none(), async (req, res) =>
{
    try
    {
        const INVITE = await NomadSDK.guestInvite(req.body.contentId, 
            req.body.contentDefinitionId, req.body.emails.split(","), 
            req.body.contentSecurityAttribute);

        res.status(200).json(INVITE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/remove-invite', upload.none(), async (req, res) =>
{
    try
    {
        const REMOVE = await NomadSDK.removeGuestInvite(req.body.contentId, 
            req.body.contentDefinitionId, req.body.emails.split(","), 
            req.body.contentSecurityAttribute);

        res.status(200).json(REMOVE);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/register', upload.none(), async (req, res) =>
{
    try
    {
        const REGISTER = await NomadSDK.registerGuest(req.body.email, 
            req.body.firstName, req.body.lastName, req.body.password);

        res.status(200).json(REGISTER);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/ping', upload.none(), async (req, res) =>
{
    try
    {
        const PING = await NomadSDK.ping()

        res.status(200).json(PING);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/ppq', upload.none(), async (req, res) =>
{
    try
    {
        const PPQ = await NomadSDK.participantPanelQuery();

        res.status(200).json(PPQ);
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