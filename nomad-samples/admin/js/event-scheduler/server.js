const SERIES_CONTENT_DEFINITION_ID = "e6f25601-f527-4dee-9ed3-311715f14a8e";
const PERFORMER_CONTENT_DEFINITION_ID = "33cec5ca-6170-4237-842b-78bf1ef17932";
const VENUE_CONTENT_DEFINTION_ID = "7684c940-6532-44f9-bc7f-6d7d7da72c2f";
const GENRE_CONTENT_DEFINITION_ID = "dbbace1f-ddb1-462b-9cae-c9be7d5990ac";
const MEDIA_ATTRIBUTES_CONTENT_DEFINITION_ID = "ada6d0f1-98ba-4248-ba14-8386fa14e497";
const LANGUAGE_CONTENT_DEFINITION_ID = "e4b10c04-1878-4830-a115-e42d52705059";
const PRODUCT_CONTENT_DEFINITION_ID = "c39c0041-c9cc-4225-a058-c413819082a7";
const FEATURED_GROUPS_CONTENT_DEFINITION_ID = "a33d1db2-b3ec-478b-8b14-48c813e7153e";
const RELATED_MEDIA_ITEMS_CONTENT_DEFINITION_ID = "412a30e3-73ee-4eae-b739-e1fc87601c7d";
const RECOMMENDED_SIMILAR_ITEMS_CONTENT_DEFINITION_ID = "412a30e3-73ee-4eae-b739-e1fc87601c7d";
const RATING_CONTENT_DEFINITION_ID = "dd72aac1-a5a2-4b68-a59c-9f57e5858517";
const LIVE_CHANNEL_CONTENT_DEFINITION_ID = "bf8ac754-5b8b-4330-b1aa-76f15fb7f673";
const EVENT_CONTENT_DEFINITION_ID = "412a30e3-73ee-4eae-b739-e1fc87601c7d";
const INPUT_CONTENT_DEFINITION_ID = "5ce6e254-01e9-44b8-9f20-4691140db3ce";
const EXTERNAL_OUTPUT_PROFILES_PATH = "lookup/33?lookupKey=99e8767a-00ba-4758-b9c2-e07b52c47021";
const DAYS_CONTENT_DEFINITION_ID = "fc8042c1-1ade-400d-b0aa-02937e658ae6"

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
	res.sendFile(__dirname + '/public/event-scheduler.html');
});

app.get('/get-series-list', upload.none(), async (req, res) =>
{
    try
    {
        const RATING_LIST = await getGroups(SERIES_CONTENT_DEFINITION_ID);

        res.status(200).json(RATING_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-performer-list', upload.none(), async (req, res) =>
{
    try
    {
        const PERFORMER_LIST = await getGroups(PERFORMER_CONTENT_DEFINITION_ID);

        res.status(200).json(PERFORMER_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-venue-list', upload.none(), async (req, res) =>
{
    try
    {
        const VENUE_LIST = await getGroups(VENUE_CONTENT_DEFINTION_ID);

        res.status(200).json(VENUE_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-genre-list', upload.none(), async (req, res) =>
{
    try
    {
        const GENRE_LIST = await getGroups(GENRE_CONTENT_DEFINITION_ID);

        res.status(200).json(GENRE_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-media-attributes-list', upload.none(), async (req, res) =>
{
    try
    {
        const MEDIA_ATTRIBUTES_LIST = await getGroups(MEDIA_ATTRIBUTES_CONTENT_DEFINITION_ID);

        res.status(200).json(MEDIA_ATTRIBUTES_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-language-list', upload.none(), async (req, res) =>
{
    try
    {
        const LANGUAGE_LIST = await getGroups(LANGUAGE_CONTENT_DEFINITION_ID);

        res.status(200).json(LANGUAGE_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-product-list', upload.none(), async (req, res) =>
{
    try
    {
        const PRODUCT_LIST = await getGroups(PRODUCT_CONTENT_DEFINITION_ID);

        res.status(200).json(PRODUCT_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-featured-groups-list', upload.none(), async (req, res) =>
{
    try
    {
        const FEATURED_GROUPS_LIST = await getGroups(FEATURED_GROUPS_CONTENT_DEFINITION_ID);

        res.status(200).json(FEATURED_GROUPS_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-related-media-items-list', upload.none(), async (req, res) =>
{
    try
    {
        const RELATED_MEDIA_ITEMS_LIST = await getGroups(RELATED_MEDIA_ITEMS_CONTENT_DEFINITION_ID);

        res.status(200).json(RELATED_MEDIA_ITEMS_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-recommendation-similar-items-list', upload.none(), async (req, res) =>
{
    try
    {
        const RECOMMENDED_SIMILAR_ITEMS_LIST = await getGroups(RECOMMENDED_SIMILAR_ITEMS_CONTENT_DEFINITION_ID);

        res.status(200).json(RECOMMENDED_SIMILAR_ITEMS_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-rating-list', upload.none(), async (req, res) =>
{
    try
    {
        const RATING_LIST = await getGroups(RATING_CONTENT_DEFINITION_ID);

        res.status(200).json(RATING_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-days-list', upload.none(), async (req, res) =>
{
    try
    {
        const DAYS_LIST = await getGroups(DAYS_CONTENT_DEFINITION_ID);

        res.status(200).json(DAYS_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-live-channel-list', upload.none(), async (req, res) =>
{
    try
    {
        const LIVE_CHANNEL_LIST = await getGroups(LIVE_CHANNEL_CONTENT_DEFINITION_ID);

        res.status(200).json(LIVE_CHANNEL_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/create-event', upload.none(), async (req, res) => {
    try
    {
        console.log(req.body);
        const CONTENT_ID = req.body.contentId === "" ? null : req.body.contentId;
        const SERIES_SELECT = req.body.seriesSelect === undefined
            ? null : JSON.parse(req.body.seriesSelect);
        const PRIMARY_PERFORMER_SELECT = req.body.primaryPerformerSelect === undefined
            ? null : JSON.parse(req.body.primaryPerformerSelect);
        const THUMBNAIL = req.body.thumbnailImageId === ""
            ? undefined : { id: req.body.thumbnailImageId, description: req.body.thumbnailImageName };
        const HERO = req.body.heroImageId === ""
            ? null : { id: req.body.heroImageId, description: req.body.heroImageName };
        const LOGO = req.body.logoImageId === ""
            ? null : { id: req.body.logoImageId, description: req.body.logoImageName };
        const VENUE_SELECT = req.body.venueSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.venueSelect)) 
            ? JSON.parse(req.body.venueSelect) : [JSON.parse(req.body.venueSelect)];
        const PERFORMERS_SELECT = req.body.performersSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.performersSelect))
            ? JSON.parse(req.body.performersSelect) : [JSON.parse(req.body.performersSelect)];
        const GENRES_SELECT = req.body.genresSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.genresSelect))
            ? JSON.parse(req.body.genresSelect) : [JSON.parse(req.body.genresSelect)];
        const MEDIA_ATTRIBUTES_SELECT = req.body.mediaAttributesSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.mediaAttributesSelect))
            ? JSON.parse(req.body.mediaAttributesSelect) : [JSON.parse(req.body.mediaAttributesSelect)];
        const LANGUAGES_SELECT = req.body.languagesSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.languagesSelect))
            ? JSON.parse(req.body.languagesSelect) : [JSON.parse(req.body.languagesSelect)];
        const PRODUCTS_SELECT = req.body.productsSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.productsSelect))
            ? JSON.parse(req.body.productsSelect) : [JSON.parse(req.body.productsSelect)];
        const FEATURED_GROUPS_SELECT = req.body.featuredGroupsSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.featuredGroupsSelect))
            ? JSON.parse(req.body.featuredGroupsSelect) : [JSON.parse(req.body.featuredGroupsSelect)];
        const RELATED_MEDIA_ITEMS_SELECT = req.body.relatedMediaItemsSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.relatedMediaItemsSelect))
            ? JSON.parse(req.body.relatedMediaItemsSelect) : [JSON.parse(req.body.relatedMediaItemsSelect)];
        const RECOMMENDATION_SIMILAR_ITEMS_SELECT = req.body.recommendationSimilarItemsSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.recommendationSimilarItemsSelect))
            ? JSON.parse(req.body.recommendationSimilarItemsSelect) : [JSON.parse(req.body.recommendationSimilarItemsSelect)];
        const RATING_SELECT = req.body.ratingSelect === undefined
            ? null : JSON.parse(req.body.ratingSelect);
        const LIVE_CHANNEL_SELECT = req.body.liveChannelSelect === undefined
            ? null : JSON.parse(req.body.liveChannelSelect);

        const START_TIME = new Date(req.body.startDatetime)
        const START_TIME_GMT = START_TIME.toISOString();

        const END_TIME = new Date(req.body.endDatetime)
        const END_TIME_GMT = END_TIME.toISOString();

        const EVENT_ID = NomadSDK.createAndUpdateEvent(CONTENT_ID, 
            EVENT_CONTENT_DEFINITION_ID, req.body.name, SERIES_SELECT, 
            START_TIME_GMT, END_TIME_GMT, PRIMARY_PERFORMER_SELECT, 
            req.body.shortDescription, req.body.longDescription, THUMBNAIL, HERO, LOGO,
            null, req.body.externalUrl, VENUE_SELECT, PERFORMERS_SELECT, GENRES_SELECT,
            MEDIA_ATTRIBUTES_SELECT, LANGUAGES_SELECT, PRODUCTS_SELECT, FEATURED_GROUPS_SELECT,
            req.body.groupSequence, RELATED_MEDIA_ITEMS_SELECT, 
            RECOMMENDATION_SIMILAR_ITEMS_SELECT, RATING_SELECT, req.body.isDisabled === "true", 
            LIVE_CHANNEL_SELECT);
        
        res.status(200).json(EVENT_ID);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-livestream-input-list', upload.none(), async (req, res) =>
{
    try
    {
        const INPUT_LIST = await getGroups(INPUT_CONTENT_DEFINITION_ID);

        res.status(200).json(INPUT_LIST);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.get('/get-external-output-profiles-list', upload.none(), async (req, res) =>
{
    try
    {
        const EXTERNAL_OUTPUT_PROFILES_LIST = await NomadSDK.miscFunctions(
            EXTERNAL_OUTPUT_PROFILES_PATH, "GET");

        res.status(200).json(EXTERNAL_OUTPUT_PROFILES_LIST.items);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});
    
app.post('/add-event', upload.none(), async (req, res) => 
{
    try
    {
        const SLATE_VIDEO = req.body.slateVideoId === ""
            ? null : { id: req.body.slateVideoId, description: req.body.slateVideoName };
        const PREROLL_VIDEO = req.body.prerollVideoId === ""
            ? null : { id: req.body.prerollVideoId, description: req.body.prerollVideoName };
        const POSTROLL_VIDEO = req.body.postrollVideoId === ""
            ? null : { id: req.body.postrollVideoId, description: req.body.postrollVideoName };
        const ARCHIVE_FOLDER = req.body.archiveFolderId === ""
            ? null : { id: req.body.archiveFolderId, description: req.body.archiveFolderName };
        const PRIMARY_LIVESTREAM_INPUT = req.body.primaryLivestreamInputSelect === undefined
            ? null : JSON.parse(req.body.primaryLivestreamInputSelect);
        const BACKUP_LIVESTREAM_INPUT_SELECT = req.body.backupLivestreamInputSelect === undefined
            ? null : JSON.parse(req.body.backupLivestreamInputSelect);
        const EXTERNAL_OUTPUT_PROFILES = req.body.externalOutputProfilesSelect === undefined
            ? null : Array.isArray(JSON.parse(req.body.externalOutputProfilesSelect))
            ? JSON.parse(req.body.externalOutputProfilesSelect) : [JSON.parse(req.body.externalOutputProfilesSelect)];

        await NomadSDK.addLiveScheduleToEvent(req.body.addEventId, SLATE_VIDEO, PREROLL_VIDEO, 
            POSTROLL_VIDEO, req.body.isSecureOutput === "true", ARCHIVE_FOLDER, 
            PRIMARY_LIVESTREAM_INPUT, BACKUP_LIVESTREAM_INPUT_SELECT, 
            req.body.primaryLivesteamInputUrl, req.body.backupLivestreamInputUrl, 
            EXTERNAL_OUTPUT_PROFILES);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/extend-event', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.extendLiveSchedule(req.body.extendEventId, 
            JSON.parse(req.body.daysOfTheWeekSelect), 
            req.body.recurringWeeks, req.body.endDatetime, req.body.timeZoneOffsetSeconds);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/get-event', upload.none(), async (req, res) =>
{
    try
    {
        const EVENT_INFO = await NomadSDK.getLiveSchedule(req.body.getEventId);

        res.status(200).json(EVENT_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/start-event', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.startLiveSchedule(req.body.startEventId);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/stop-event', upload.none(), async (req, res) =>
{
    try
    {
        await NomadSDK.stopLiveSchedule(req.body.stopEventId);

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete-event', upload.none(), async (req, res) => 
{
    try
    {
        await NomadSDK.deleteEvent(req.body.deleteId, 
            req.body.deleteContentDefinitionId);
        
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

async function getGroups(GROUP_CONTENT_DEFINITION_ID)
{
    const GROUP_LIST = [];
    let offset = 0;
    while (true)
    {
        const SEARCH_INFO = await NomadSDK.search(null, offset, null, 
            [
                {
                    fieldName: "contentDefinitionId",
                    operator: "Equals",
                    values: GROUP_CONTENT_DEFINITION_ID,
                },
                {
                    fieldName: "languageId",
                    operator: "Equals",
                    values: "c66131cd-27fc-4f83-9b89-b57575ac0ed8"
                }
            ], null, null, null, null, true, null);

        if (!SEARCH_INFO) return [];
        GROUP_LIST.push(...SEARCH_INFO.items);

        ++offset;

        if (SEARCH_INFO.items.length < 100) break;
    }
    return GROUP_LIST;
}