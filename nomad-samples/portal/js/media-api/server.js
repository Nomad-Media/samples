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

app.post('/form', upload.none(), async (req, res) =>
{
    try
    {
        const FORM = await NomadSDK.getForm(req.body.id, req.body.firstName, 
            req.body.lastName, req.body.active, req.body.startDate, req.body.lookupId,
            req.body.description);

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