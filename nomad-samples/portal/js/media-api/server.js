import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadSDK from "../../../../nomad-sdk/js/nomad-media-sdk-debug.js";
import express from 'express';
import multer from 'multer';


const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/media-api.html');
});

app.post('/search', upload.none(), async (req, res) =>
{
    try
    {
        const IDS = req.body.ids === "" ? [] : req.body.ids.split(',');

        const SORT_FIELDS = [];
        if (req.body.sortFieldName)
        {
            if (typeof req.body.sortFieldName === 'string') 
            {
                SORT_FIELDS.push({
                    fieldName: req.body.sortFieldName,
                    sortType: req.body.sortType,
                });
            }
            else
            {
                for (let idx = 0; idx < req.body.sortFieldName.length; ++idx)
                {
                    SORT_FIELDS.push({
                        fieldName: req.body.sortFieldName[idx],
                        sortType: req.body.sortType[idx],
                    });
                }
            }
        }

        const SEARCH_INFO = await NomadSDK.mediaSearch(req.body.searchQuery, 
            IDS, SORT_FIELDS, req.body.pageOffset, req.body.pageSize);

        res.status(200).json(SEARCH_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-media-group', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_GROUP = await NomadSDK.getMediaGroup(req.body.mediaGroupId);

        res.status(200).json(MEDIA_GROUP);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/form', upload.none(), async (req, res) =>
{
    try
    {
        const FORM = await NomadSDK.createForm(req.body.contentDefinitionId,
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                active: req.body.active,
                startDate: req.body.startDate,
                lookupId: req.body.lookupId,
                description: req.body.description,
            });

        res.status(200).json(FORM);
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