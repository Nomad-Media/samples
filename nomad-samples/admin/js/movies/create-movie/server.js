import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadSDK from "../../../../../nomad-sdk/js/sdk-debug.js";

import express from 'express';
import multer from 'multer';


const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

const MOVIE_CONTENT_DEFINITION_ID = "eb710e28-7c44-492e-91f9-8acd0cd9331c";

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/movies.html');
});

app.post('/get-genre-list', upload.none(), async (req, res) => 
{
    const GENRE_CONTENT_DEFINITION_ID = "dbbace1f-ddb1-462b-9cae-c9be7d5990ac";

    try
    {
        const GENRE_LIST = await NomadSDK.search(null, null, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: GENRE_CONTENT_DEFINITION_ID,
                }
            ], null, null, null, null, true, null);

        res.status(200).json(GENRE_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-performer-list', upload.none(), async (req, res) =>
{
    const PERFORMER_CONTENT_DEFINITION_ID = "33cec5ca-6170-4237-842b-78bf1ef17932";

    try
    {
        const PERFORMER_LIST = await NomadSDK.search(null, null, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: PERFORMER_CONTENT_DEFINITION_ID,
                }
            ], null, null, null, null, true, null);
        res.status(200).json(PERFORMER_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-tag-list', upload.none(), async (req, res) =>
{
    const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";

    try
    {
        const TAG_LIST = await NomadSDK.search(null, null, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: TAG_CONTENT_DEFINITION_ID,
                }
            ], null, null, null, null, true, null);
        res.status(200).json(TAG_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-rating-list', upload.none(), async (req, res) =>
{
    const RATING_CONTENT_DEFINITION_ID = "dd72aac1-a5a2-4b68-a59c-9f57e5858517";

    try
    {
        const RATING_LIST = await NomadSDK.search(null, null, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: RATING_CONTENT_DEFINITION_ID,
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8"
                }
            ], null, null, null, null, true, null);
        res.status(200).json(RATING_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/create-movie', upload.fields([{ name: "imageFile", maxCount: 1 }, 
    { name: "videoFile", maxCount: 1 }]), async (req, res) => 
{
    try
    {
        let CONTENT_ID = null;
        if (req.body.typeSelect === "Create")
        {
            const CREATE_MOVIE_INFO = await NomadSDK.createContent(MOVIE_CONTENT_DEFINITION_ID);
            CONTENT_ID = CREATE_MOVIE_INFO.contentId;
        }
        else
        {
            CONTENT_ID = req.body.updateId;
        }

        const IMAGE_ID = await NomadSDK.uploadAsset(null, null, null, null, null, null, 'replace',
            req.files.imageFile[0], null);

        const VIDEO_ID = await NomadSDK.uploadAsset(null, null, null, null, null, null, 'replace',
            req.files.videoFile[0], null);

        const MOVIE_INFO = await NomadSDK.updateContent(CONTENT_ID, MOVIE_CONTENT_DEFINITION_ID, {
            ...(req.body.title && { title: req.body.title }),
            ...(req.body.plot && { plot: req.body.plot }),
            ...(req.body.date && { releaseDate: req.body.date }),
            ...(req.body.genreSelect && { genres: req.body.genreSelect }),
            ...(req.body.performerSelect && { performers: req.body.performerSelect }),
            ...(req.body.tagSelect && { tags: req.body.tagSelect }),
            ...(req.body.ratingSelect && { rating: req.body.ratingSelect }),
            ...(req.files["imageFile"] && { image: { id: IMAGE_ID,
                description: req.files.imageFile[0].originalname } }),
            ...(req.files["videoFile"] && { movieFile: { id: VIDEO_ID,
                description: req.files.videoFile[0].originalname } }),
        });

        res.status(200).json(MOVIE_INFO);
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