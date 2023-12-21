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

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/saved-search.html');
});

app.post('/add-saved-search', upload.none(), async (req, res) =>
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

        const SEARCH_RESULT_FILEDS = [];

        if (req.body.searchResultFieldName)
        {
            if (typeof req.body.searchResultFieldName === 'string') 
            {
                SEARCH_RESULT_FILEDS.push({
                    name: req.body.searchResultFieldName,
                });
            } 
            else 
            {
                for (let idx = 0; idx < req.body.searchResultFieldName.length; ++idx)
                {
                    SEARCH_RESULT_FILEDS.push({
                        name: req.body.searchResultFieldName[idx],
                    });
                }
            }
        }
        const SEARCH_INFO = await NomadSDK.addSavedSearch(req.body.name,
            req.body.featured === 'true', req.body.bookmarked === 'true',
            req.body.public === 'true', req.body.sequence, req.body.type, req.body.query,
            req.body.offset, req.body.size, FILTERS, SORT_FIELDS, SEARCH_RESULT_FILEDS,
            req.body.similarAssetId, req.body.minScore, 
            req.body.excludeTotalRecordCount === 'true', req.body.filterBinder);

        res.status(200).json(SEARCH_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/delete-saved-search', upload.none(), async (req, res) =>
{
    try
    {
        const SEARCH_INFO = await NomadSDK.deleteSavedSearch(req.body.id);

        res.status(200).json(SEARCH_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/get-saved-search', upload.none(), async (req, res) =>
{
    try
    {
        const SEARCH_INFO = await NomadSDK.getSavedSearch(req.body.id);

        res.status(200).json(SEARCH_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/get-saved-searches', async (req, res) =>
{
    try
    {
        const SEARCH_INFO = await NomadSDK.getSavedSearches();

        res.status(200).json(SEARCH_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/update-saved-search', upload.none(), async (req, res) =>
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

        const SEARCH_RESULT_FILEDS = [];

        if (req.body.searchResultFieldName)
        {
            if (typeof req.body.searchResultFieldName === 'string') 
            {
                SEARCH_RESULT_FILEDS.push({
                    name: req.body.searchResultFieldName,
                });
            } 
            else 
            {
                for (let idx = 0; idx < req.body.searchResultFieldName.length; ++idx)
                {
                    SEARCH_RESULT_FILEDS.push({
                        name: req.body.searchResultFieldName[idx],
                    });
                }
            }
        }

        const SEARCH_INFO = await NomadSDK.updateSavedSearch(req.body.id, req.body.name,
            req.body.featured === 'true', req.body.bookmarked === 'true',
            req.body.public === 'true', req.body.sequence, req.body.type, req.body.query,
            req.body.offset, req.body.size, FILTERS, SORT_FIELDS, SEARCH_RESULT_FILEDS,
            req.body.similarAssetId, req.body.minScore, 
            req.body.excludeTotalRecordCount === 'true', req.body.filterBinder);

        res.status(200).json(SEARCH_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/get-search-saved', upload.none(), async (req, res) =>
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

        const SEARCH_RESULT_FILEDS = [];

        if (req.body.searchResultFieldName)
        {
            if (typeof req.body.searchResultFieldName === 'string') 
            {
                SEARCH_RESULT_FILEDS.push({
                    name: req.body.searchResultFieldName,
                });
            } 
            else 
            {
                for (let idx = 0; idx < req.body.searchResultFieldName.length; ++idx)
                {
                    SEARCH_RESULT_FILEDS.push({
                        name: req.body.searchResultFieldName[idx],
                    });
                }
            }
        }
        const SEARCH_INFO = await NomadSDK.getSearchSaved(req.body.query,
            req.body.offset, req.body.size, FILTERS, SORT_FIELDS, SEARCH_RESULT_FILEDS,
            req.body.similarAssetId, req.body.minScore, 
            req.body.excludeTotalRecordCount === 'true', req.body.filterBinder);

        res.status(200).json(SEARCH_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/get-search-saved-by-id', upload.none(), async (req, res) =>
{
    try
    {
        const SEARCH_INFO = await NomadSDK.getSearchSavedById(req.body.id);

        res.status(200).json(SEARCH_INFO);
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