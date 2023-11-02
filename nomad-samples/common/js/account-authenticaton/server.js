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
	res.sendFile(__dirname + '/public/account-authentication.html');
});

app.post('/forgot-password', upload.none(), async (req, res) => 
{
    try
    {
        await NomadSDK.forgotPassword(req.body.forgotPasswordUsername);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}); 

app.post('/reset-password', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.resetPassword(req.body.resetPasswordUsername, 
            req.body.resetPasswordCide, req.body.resetPasswordNewPassword);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/logout', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.logout();

        res.status(200);
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