import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadSDK from "../../../../nomad-sdk/js/sdk-debug.js";

import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/asset-upload.html');
});
	

// Define an API route for asset uploads
app.post('/uploadAsset', upload.single('NOMAD_FILE'), async (req, res) => {
  	try {
		console.log(JSON.stringify(req.body, null, 4));
		// Parse incoming data and perform the upload using NomadSDK
		const { NAME, EXISTING_ASSET_ID, RELATED_ASSET_ID, CREATE_TRANSCRIBE_RELATED_ASSET, 
				RELATED_CONTENT_ID, LANGUAGE_ID, UPLOAD_OVERWRITE_OPTION, PARENT_ID } = req.body;

		// Handle the file upload here
		await NomadSDK.uploadAsset(NAME, EXISTING_ASSET_ID, RELATED_ASSET_ID, 
			CREATE_TRANSCRIBE_RELATED_ASSET === "true", RELATED_CONTENT_ID, LANGUAGE_ID, 
			UPLOAD_OVERWRITE_OPTION, req.file, PARENT_ID);

		// Return a response
		res.status(200).json({ message: 'Asset uploaded successfully' });
  	} 
	catch (error) 
	{
		res.status(500).json({ error: 'Internal server error' });
 	}
});

app.listen(port, () => {
  	console.log(`Server is running on port ${port}`);
});
