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
	res.sendFile(__dirname + '/public/asset-upload.html');
});
	

app.post('/uploadAsset', upload.single('nomadFile'), async (req, res) => {
  	try {
		await NomadSDK.uploadAsset(req.body.name, req.body.existingAssetId, req.body.relatedAssetId, 
			req.body.createTranscribeRelatedAsset === "true", req.body.relatedContentId, req.body.languageId, 
			req.body.uploadOverwriteOption, req.file, req.body.parentId);

		res.status(200).json({ message: 'Asset uploaded successfully' });
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
