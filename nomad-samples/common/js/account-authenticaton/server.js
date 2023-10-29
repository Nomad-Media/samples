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
    const response = await NomadSDK.forgotPassword(req.body.forgotPasswordUsername);
    console.log(response);
    res.send(response);
});

app.post('/reset-password', upload.none(), async (req, res) =>
{
    const response = await NomadSDK.resetPassword(req.body.resetPasswordUsername, 
        req.body.resetPasswordCide, req.body.resetPasswordNewPassword);
    console.log(response);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});