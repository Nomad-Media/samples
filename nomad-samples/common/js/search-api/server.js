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
	res.sendFile(__dirname + '/public/search.html');
});

app.post('/search', upload.none(), async (req, res) =>
{
    try
    {
        const FILTERS = [];

        if (req.body.fieldName)
        {
            if (typeof req.body.fieldName === 'string') 
            {
                FILTERS.push({
                    fieldName: req.body.fieldName,
                    operator: req.body.operator,
                    values: req.body.value,
                });
            } 
            else 
            {
                for (let idx = 0; idx < req.body.value.length; ++idx)
                {
                    FILTERS.push({
                        fieldName: req.body.fieldName[idx],
                        operator: req.body.operator[idx],
                        values: req.body.value[idx],
                    });
                }
            }
        }

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

        const RESULT_FIELD_NAMES = req.body.resultFieldNames.split(",").map(elem => ({ "name": elem }));

        const SEARCH_MOVIE_INFO = await NomadSDK.search(req.body.searchQuery,
            req.body.pageOffset, req.body.pageSize, FILTERS, SORT_FIELDS,
            RESULT_FIELD_NAMES, req.body.similarAssetId, req.body.minScore, 
            req.body.excludeTotalRecordCount, req.body.filterBinder);

        res.status(200).json(SEARCH_MOVIE_INFO);
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