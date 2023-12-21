const GENRE_CONTENT_DEFINITION_ID = "dbbace1f-ddb1-462b-9cae-c9be7d5990ac";
const PERFORMER_CONTENT_DEFINITION_ID = "33cec5ca-6170-4237-842b-78bf1ef17932";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";
const RATING_CONTENT_DEFINITION_ID = "dd72aac1-a5a2-4b68-a59c-9f57e5858517";
const MOVIE_CONTENT_DEFINITION_ID = "eb710e28-7c44-492e-91f9-8acd0cd9331c";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import NomadMediaSDK from "nomad-media-npm";
import config from "../../../config.mjs";
const NomadSDK = new NomadMediaSDK(config);

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import deepEqual from 'deep-equal';

const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/sync.html');
});

app.post('/get-genre-list', upload.none(), async (req, res) => 
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

app.post('/get-performer-list', upload.none(), async (req, res) =>
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

app.post('/get-tag-list', upload.none(), async (req, res) =>
{
    try
    {
        const TAG_LIST = [] = await getGroups(TAG_CONTENT_DEFINITION_ID);

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

app.post('/create-movie', upload.fields([{ name: "imageFile", maxCount: 1 }, 
    { name: "videoFile", maxCount: 1 }]), async (req, res) => 
{
    try
    {
        let contentId = null;
        if (req.body.typeSelect === "Create")
        {
            const CREATE_MOVIE_INFO = await NomadSDK.createContent(MOVIE_CONTENT_DEFINITION_ID);
            contentId = CREATE_MOVIE_INFO.contentId;
        }
        else
        {
            contentId = req.body.updateId;
        }

        let image = null;
        if (req.files.imageFile && req.body.imageId === "")
        {
            const IMAGE_ID = await NomadSDK.uploadAsset(null, null, null, null, null, null, 'replace',
                req.files.imageFile[0], null);

            image = { description: req.files.imageFile[0].originalname, id: IMAGE_ID }
        }
        else
        {
            const IMAGE_INFO = await NomadSDK.getAssetDetails(req.body.imageId);

            if (IMAGE_INFO)
            {
                image = { description: IMAGE_INFO.properties.displayName, id: req.body.imageId};
            }   
        }

        let video = null;
        if (req.files.movieFile && req.body.videoId === "")
        {
            const VIDEO_ID = await NomadSDK.uploadAsset(null, null, null, null, null, null, 'replace',
                req.files.videoFile[0], null);

            video = { description: req.files.videoFile[0].originalname, id: VIDEO_ID }
        }
        else
        {
            const VIDEO_INFO = await NomadSDK.getAssetDetails(req.body.videoId);
            if (VIDEO_INFO)
            {
                video = { description: VIDEO_INFO.properties.displayName, id: req.body.videoId, };
            }
        }

        let genres = null;
        if (req.body.genreSelect)
        {
            const GENRES_PARSED = JSON.parse(req.body.genreSelect);
            genres = Array.isArray(GENRES_PARSED) ? GENRES_PARSED : [GENRES_PARSED];
        }

        let performers = null;
        if (req.body.performerSelect)
        {
            const PERFORMERS_PARSED = JSON.parse(req.body.performerSelect);
            performers = Array.isArray(PERFORMERS_PARSED) ? PERFORMERS_PARSED : [PERFORMERS_PARSED];
        }

        let tags = null;
        if (req.body.tagSelect)
        {
            const TAGS_PARSED = JSON.parse(req.body.tagSelect);
            tags = Array.isArray(TAGS_PARSED) ? TAGS_PARSED : [TAGS_PARSED];
        }

        let ratings = null;
        if (req.body.ratingSelect)
        {
            ratings = JSON.parse(req.body.ratingSelect);
        }

        const MOVIE_INFO = await NomadSDK.updateContent(contentId, MOVIE_CONTENT_DEFINITION_ID, {
            ...(req.body.title && { title: req.body.title }),
            ...(req.body.plot && { plot: req.body.plot }),
            ...(req.body.date && { releaseDate: `${req.body.date}T00:00:00Z` }),
            ...(req.body.genreSelect && { genres: genres }),
            ...(req.body.performerSelect && { performers: performers }),
            ...(req.body.tagSelect && { tags: tags }),
            ...(req.body.ratingSelect && { ratings: ratings }),
            ...(image && { image: image }),
            ...(video && { movieFile: video }),
        });

        res.status(200).json(MOVIE_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/sync', upload.none(), async (req, res) =>
{
    try
    {
        console.log("Synchronizing...");

        console.log(`${__dirname}/movie.json`);
        const MOVIES = JSON.parse(fs.readFileSync(`${__dirname}/movie.json`, 'utf8'));

    
        if (!MOVIES || MOVIES.length === 0) {
            throw new Error("Error retrieving data, make sure the source file exists and is not empty.");
        }
    
        console.log(`${MOVIES.length} movies found in source file`);

        const NOMAD_MOVIES = await getGroups(MOVIE_CONTENT_DEFINITION_ID);
    
        
        for (let index = 0; index < MOVIES.length; index++) 
        {
            const MOVIE = MOVIES[index];
        
            console.log(`Synchronizing movie #${index + 1} out of ${MOVIES.length} | ${MOVIE.title}...`);
        
            const MOVIE_GENRE = await addUniqueContent(MOVIE.genres, GENRE_CONTENT_DEFINITION_ID);
            const MOVIE_PERFORMER = await addUniqueContent(MOVIE.performers, PERFORMER_CONTENT_DEFINITION_ID);
            const MOVIE_TAG = await addUniqueContent(MOVIE.tags, TAG_CONTENT_DEFINITION_ID, false);
            const RETURN = await addUniqueContent(MOVIE.rating, RATING_CONTENT_DEFINITION_ID);
            const MOVIE_RATING = RETURN[0];
            let CORRESPONDING_NOMAD_MOVIE = null;
            for (let index = 0; index < NOMAD_MOVIES.length; index++) {
                const NOMAD_MOVIE = NOMAD_MOVIES[index];
                if (NOMAD_MOVIE.title === MOVIE.title) {
                    CORRESPONDING_NOMAD_MOVIE = NOMAD_MOVIE;
                    break;
                }
            }
            
            if (CORRESPONDING_NOMAD_MOVIE) {
                if (CORRESPONDING_NOMAD_MOVIE.title === MOVIE.title && 
                    CORRESPONDING_NOMAD_MOVIE.identifiers.plot === MOVIE.plot && 
                    CORRESPONDING_NOMAD_MOVIE.identifiers.releaseDate === MOVIE.releaseDate && 
                    deepEqual(CORRESPONDING_NOMAD_MOVIE.identifiers.genres, MOVIE_GENRE) && 
                    deepEqual(CORRESPONDING_NOMAD_MOVIE.identifiers.performers, MOVIE_PERFORMER) && 
                    deepEqual(CORRESPONDING_NOMAD_MOVIE.identifiers.tags, MOVIE_TAG) && 
                    deepEqual(CORRESPONDING_NOMAD_MOVIE.identifiers.ratings, MOVIE_RATING) &&
                    deepEqual(CORRESPONDING_NOMAD_MOVIE.identifiers.image, MOVIE.image) &&
                    deepEqual(CORRESPONDING_NOMAD_MOVIE.identifiers.movieFile, MOVIE.movieFile)) 
                {
                    console.log(`\tSkipping Movie ${MOVIE.title}...`);
                }
                else
                {
                    console.log(`\tUpdating Movie ${MOVIE.title}...`);

                    await NomadSDK.updateContent(CORRESPONDING_NOMAD_MOVIE.id, MOVIE_CONTENT_DEFINITION_ID, 
                        {
                            title: MOVIE.title,
                            plot: MOVIE.plot,
                            releaseDate: MOVIE.releaseDate,
                            genres: MOVIE_GENRE,
                            performers: MOVIE_PERFORMER,
                            tags: MOVIE_TAG,
                            ratings: MOVIE_RATING,
                            image: MOVIE.image,
                            movieFile: MOVIE.movieFile
                        });
                }
                

            } 
            else 
            {
                console.log(`\tCreating Movie ${MOVIE.title}...`);
                
                const CREATE_CONTENT_INFO = await NomadSDK.createContent(MOVIE_CONTENT_DEFINITION_ID)

                await NomadSDK.updateContent(CREATE_CONTENT_INFO.contentId, MOVIE_CONTENT_DEFINITION_ID, 
                    {
                        title: MOVIE.title,
                        plot: MOVIE.plot,
                        releaseDate: MOVIE.releaseDate,
                        genres: MOVIE_GENRE,
                        performers: MOVIE_PERFORMER,
                        tags: MOVIE_TAG,
                        ratings: MOVIE_RATING,
                        image: MOVIE.image,
                        movieFile: MOVIE.movieFile
                    });
            }
        }
    
        console.log("Synchronization completed...");

        res.status(200);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json({error: error.message});
    }
});

app.post('/delete', upload.none(), async (req, res) =>
{
    try
    {
        const DELETE_INFO = await NomadSDK.deleteContent(req.body.deleteId, MOVIE_CONTENT_DEFINITION_ID);
        res.status(200).json(DELETE_INFO);
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

async function addUniqueContent(names, GROUP_CONTENT_DEFINITION_ID)
{
    const GROUP_LIST= await getGroups(GROUP_CONTENT_DEFINITION_ID);

    names = Array.isArray(names) ? names : [names];

    const GROUPS = [];

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const GROUP_FOUND = GROUP_LIST.find((group) => group.title === name);

        if (GROUP_FOUND) 
        {
            GROUPS.push({ description: GROUP_FOUND.title, id: GROUP_FOUND.id });
        } 
        else 
        {
            let updateGroup = null;
            if (TAG_CONTENT_DEFINITION_ID == GROUP_CONTENT_DEFINITION_ID)
            {

                updateGroup = await NomadSDK.createTagOrCollection("tag", name);
                updateGroup = updateGroup.id;
            }
            else
            {
                const CREATE_GROUP_INFO = await NomadSDK.createContent(
                    GROUP_CONTENT_DEFINITION_ID
                );

                const PROPERTIES = { 
                    name: name,
                    slug: slugify(name),
                };
            
                updateGroup = await NomadSDK.updateContent(CREATE_GROUP_INFO.contentId, 
                    GROUP_CONTENT_DEFINITION_ID, PROPERTIES);
            }
            GROUPS.push({ description: name, id: updateGroup });
        }
    }

    return GROUPS;
}

function slugify(text) {
    if (!text || text.trim().length === 0) return "";
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
}
        