const COLLECTION_CONTENT_DEFINITION_ID = "20352932-05d2-4a7a-8821-06fcf4438ced";
const LABEL_CONTENT_DEFINITION_ID = "fc710473-d014-4b2a-b812-c98255e32046";
const LANGUAGE_CONTENT_DEFINITION_ID = "e4b10c04-1878-4830-a115-e42d52705059";
const TAG_CONTENT_DEFINITION_ID = "c806783c-f127-48ae-90c9-32175f4e1fff";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import NomadSDK from "../../../../nomad-sdk/js/nomad-media-sdk-debug.js";
import express from 'express';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer();
const port = 4200;

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/asset.html');
});

app.get('/get-collection-list', upload.none(), async (req, res) =>
{
    try
    {
        if (NomadSDK.config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const COLLECTIONS = await getGroups(COLLECTION_CONTENT_DEFINITION_ID);

            res.status(200).json(COLLECTIONS);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-content-definition-list', upload.none(), async (req, res) =>
{
    try
    {
        if (NomadSDK.config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const CONTENT_DEFINITIONS = await NomadSDK.miscFunctions("contentDefinition", "GET");

            res.status(200).json(CONTENT_DEFINITIONS.items);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-country-list', upload.none(), async (req, res) =>
{
    try
    {
        const COUNTRIES = await NomadSDK.miscFunctions("config/ea1d7060-6291-46b8-9468-135e7b94021b/lookups.json", "GET", null, true);

        res.status(200).json(COUNTRIES[5].children)
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.get('/get-label-list', upload.none(), async (req, res) =>
{
    try
    {
        if (NomadSDK.config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const LABELS = await getGroups(LABEL_CONTENT_DEFINITION_ID);

            res.status(200).json(LABELS);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-language-list', upload.none(), async (req, res) =>
{
    try
    {
        if (NomadSDK.config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const LANGUAGES = await getGroups(LANGUAGE_CONTENT_DEFINITION_ID);

            res.status(200).json(LANGUAGES);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-live-channel-list', upload.none(), async (req, res) =>
{
    try
    {
        if (NomadSDK.config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const LIVE_CHANNELS = await NomadSDK.getLiveChannels();

            res.status(200).json(LIVE_CHANNELS);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/get-related-content-list', upload.none(), async (req, res) =>
{
    try
    {
        if (NomadSDK.config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const RELATED_CONTENT = await getGroups(req.body.contentDefinitionId);

            res.status(200).json(RELATED_CONTENT);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.get('/get-tag-list', upload.none(), async (req, res) =>
{
    try
    {
        if (NomadSDK.config.apiType === "portal")
        {
            res.status(200).json(null)
        }
        else
        {
            const TAGS = await getGroups(TAG_CONTENT_DEFINITION_ID);

            res.status(200).json(TAGS);
        }
    }
    catch (error)
    {
        console.error(error);
        res.status(500).send(error);
    }
});

app.post('/archive-asset', upload.none(), async (req, res) => {
    try {
        const ARCHIVE_ASSET_INFO = await NomadSDK.archiveAsset(req.body.assetId);
        
        res.status(200).json(ARCHIVE_ASSET_INFO);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/batch-action', upload.none(), async (req, res) => {
    try 
    {
        let batchAction = null;
        if (req.body.batchActionId !== "") 
        {
            batchAction = { 
                id: req.body.batchActionId, 
                description: req.body.batchActionName 
            };
        }

        let targetIds = null;
        if (req.body.targetIds !== "")
        {
            targetIds = req.body.targetIds.split(",");
        }

        const ACTION_ARGUMENTS = {};
        if (typeof req.body.argumentKey !== 'undefined') 
        {
            for (let argumentActionIdx = 0; argumentActionIdx < req.body.argumentKey.length; ++argumentActionIdx) {
                ACTION_ARGUMENTS[req.body.argumentKey[argumentActionIdx]] = req.body.argumentValue[argumentActionIdx];
            }
        }
        
        const BATCH_ACTIONS_INFO = await NomadSDK.batchAction(req.body.actionName, batchAction,
            req.body.contentDefintionId, req.body.schemaName, targetIds, ACTION_ARGUMENTS,
            req.body.resolverExcempt === "True");
        
        res.status(200).json(BATCH_ACTIONS_INFO);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/build-media', upload.none(), async (req, res) => {
    try 
    {
        let collections = null;
        if (req.body.buildMediaCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.buildMediaCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }

        let relatedContents = null;
        if (req.body.buildMediaRelatedContentsSelect)
        {
            const PARSED_RELATED_CONTENTS = JSON.parse(req.body.buildMediaRelatedContentsSelect);
            relatedContents = Array.isArray(PARSED_RELATED_CONTENTS) ? PARSED_RELATED_CONTENTS : [PARSED_RELATED_CONTENTS];
            relatedContents.forEach(item => {
                item["type"] = req.body.buildMediaRelatedContentsContentDefinitionsSelect.description;
            });
        }

        let tags = null;
        if (req.body.buildMediaTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.buildMediaTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const BUILD_MEDIA_INFO = await NomadSDK.buildMedia(sources, req.body.title, tags,
            collections, relatedContents, req.body.destinationFolderId, req.body.videoBitrate,
            req.body.audioTracks);

        res.status(200).json(BUILD_MEDIA_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/clip-asset', upload.none(), async (req, res) => {
    try 
    {
        let collections = null;
        if (req.body.clipAssetCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.clipAssetCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }

        let relatedContents = null;
        if (req.body.clipAssetRelatedContentsSelect)
        {
            const PARSED_RELATED_CONTENTS = JSON.parse(req.body.clipAssetRelatedContentsSelect);
            relatedContents = Array.isArray(PARSED_RELATED_CONTENTS) ? PARSED_RELATED_CONTENTS : [PARSED_RELATED_CONTENTS];
            relatedContents.forEach(item => {
                item["type"] = req.body.clipAssetRelatedContentsContentDefinitionsSelect.description;
            });
        }

        let tags = null;
        if (req.body.clipAssetTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.clipAssetTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const CLIP_ASSET_INFO = await NomadSDK.clipAsset(req.body.assetId, 
            req.body.startTimeCode, req.body.endTimeCode, req.body.title, 
            req.body.outputFolderId, tags, collections, relatedContents, 
            req.body.videoBitrate, req.body.audioTracks);

        res.status(200).json(CLIP_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/copy-asset', upload.none(), async (req, res) => {
    try 
    {
        let batchAction = null;
        if (req.body.batchActionId !== "") 
        {
            batchAction = { 
                id: req.body.batchActionId, 
                description: req.body.batchActionName 
            };
        }

        let targetIds = null;
        if (req.body.targetIds !== "")
        {
            targetIds = req.body.targetIds.split(",");
        }

        const ACTION_ARGUMENTS = {};
        if (typeof req.body.argumentKey !== 'undefined') 
        {
            for (let argumentActionIdx = 0; argumentActionIdx < req.body.argumentKey.length; ++argumentActionIdx) {
                ACTION_ARGUMENTS[req.body.argumentKey[argumentActionIdx]] = req.body.argumentValue[argumentActionIdx];
            }
        }
        
        const BATCH_ACTIONS_INFO = await NomadSDK.copyAsset(req.body.assetId, batchAction,
            req.body.contentDefintionId, req.body.schemaName, targetIds, ACTION_ARGUMENTS,
            req.body.resolverExcempt === "True");
        
        res.status(200).json(BATCH_ACTIONS_INFO);
    } 
    catch (error) 
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/create-annotation', upload.none(), async (req, res) => {
    try 
    {
        const PROPERTIES = {
            country: req.body.updateAnnotationCountrySelect,
            description: req.body.description,
            firstKeyword: req.body.firstKeyword,
            secondKeyword: req.body.secondKeyword
        };
        

        const CREATE_ANNOTATION_INFO = await NomadSDK.createAnnotation(req.body.assetId,
            req.body.startTimeCode, req.body.endTimeCode, PROPERTIES, req.body.contentId,
            req.body.imageUrl);

        res.status(200).json(CREATE_ANNOTATION_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/create-asset-ad-break', upload.none(), async (req, res) => {
    try 
    {
        let tags = null;
        if (req.body.createAssetAdBreakTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.createAssetAdBreakTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        let labels = null;
        if (req.body.createAssetAdBreakLabelsSelect)
        {
            const PARSED_LABELS = JSON.parse(req.body.createAssetAdBreakLabelsSelect);
            labels = Array.isArray(PARSED_LABELS) ? PARSED_LABELS : [PARSED_LABELS];
        }

        const CREATE_ASSET_AD_BREAK_INFO = await NomadSDK.createAssetAdBreak(req.body.assetId,
            req.body.timeCode, tags, labels);

        res.status(200).json(CREATE_ASSET_AD_BREAK_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/create-folder-asset', upload.none(), async (req, res) => {
    try 
    {
        const CREATE_FOLDER_ASSET_INFO = await NomadSDK.createFolderAsset(req.body.parentId,
            req.body.displayName);

        res.status(200).json(CREATE_FOLDER_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/create-placeholder-asset', upload.none(), async (req, res) => {
    try 
    {
        const CREATE_PLACEHOLDER_ASSET_INFO = await NomadSDK.createPlaceholderAsset(req.body.parentId,
            req.body.assetName);

        res.status(200).json(CREATE_PLACEHOLDER_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/create-screenshot-at-timecode', upload.none(), async (req, res) => {
    try 
    {
        const CREATE_SCREENSHOT_AT_TIMECODE_INFO = await NomadSDK.createScreenshotAtTimecode(
            req.body.assetId, req.body.timeCode);

        res.status(200).json(CREATE_SCREENSHOT_AT_TIMECODE_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.delete('/delete-annotation', upload.none(), async (req, res) => {
    try 
    {
        const DELETE_ANNOTATION_INFO = await NomadSDK.deleteAnnotation(req.body.assetId,
            req.body.annotationId);

        res.status(200).json(DELETE_ANNOTATION_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.delete('/delete-asset', upload.none(), async (req, res) => {
    try 
    {
        const DELETE_ASSET_INFO = await NomadSDK.deleteAsset(req.body.assetId);

        res.status(200).json(DELETE_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.delete('/delete-asset-ad-break', upload.none(), async (req, res) => {
    try 
    {
        const DELETE_ASSET_AD_BREAK_INFO = await NomadSDK.deleteAssetAdBreak(req.body.assetId,
            req.body.adBreakId);

        res.status(200).json(DELETE_ASSET_AD_BREAK_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/download-archive-asset', upload.none(), async (req, res) => {
    try 
    {
        const DOWNLOAD_ARCHIVE_ASSET_INFO = await NomadSDK.downloadArchiveAsset(
            req.body.assetId.split(","), req.body.fileName, req.body.downloadProxy === "True");

        res.status(200).json(DOWNLOAD_ARCHIVE_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/duplicate-asset', upload.none(), async (req, res) => {
    try 
    {
        const DUPLICATE_ASSET_INFO = await NomadSDK.duplicateAsset(req.body.assetId);

        res.status(200).json(DUPLICATE_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-annotations', upload.none(), async (req, res) => {
    try 
    {
        const GET_ANNOTATIONS_INFO = await NomadSDK.getAnnotations(req.body.assetId);

        res.status(200).json(GET_ANNOTATIONS_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-asset', upload.none(), async (req, res) => {
    try 
    {
        const GET_ASSET_INFO = await NomadSDK.getAsset(req.body.assetId);

        res.status(200).json(GET_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-asset-ad-breaks', upload.none(), async (req, res) => {
    try 
    {
        const GET_ASSET_AD_BREAKS_INFO = await NomadSDK.getAssetAdBreaks(req.body.assetId);

        res.status(200).json(GET_ASSET_AD_BREAKS_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-asset-child-nodes', upload.none(), async (req, res) => {
    try 
    {
        const GET_ASSET_CHILDREN_NODES_INFO = await NomadSDK.getAssetChildNodes(
            req.body.assetId, req.body.folderId, req.body.sortColumn, 
            req.body.isDesc === "True", req.body.pageIndex, req.body.pageSize);

        res.status(200).json(GET_ASSET_CHILDREN_NODES_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-asset-details', upload.none(), async (req, res) => {
    try 
    {
        const GET_ASSET_DETAILS_INFO = await NomadSDK.getAssetDetails(req.body.assetId);

        res.status(200).json(GET_ASSET_DETAILS_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-asset-manifest-with-cookies', upload.none(), async (req, res) => {
    try 
    {
        const GET_ASSET_MANIFEST_WITH_COOKIES_INFO = await NomadSDK.getAssetManifestWithCookies(
            req.body.assetId, req.body.cookieId);

        res.status(200).json(GET_ASSET_MANIFEST_WITH_COOKIES_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-asset-metadata-summary', upload.none(), async (req, res) => {
    try 
    {
        const GET_ASSET_METADATA_SUMMARY_INFO = await NomadSDK.getAssetMetadataSummary(
            req.body.assetId);

        res.status(200).json(GET_ASSET_METADATA_SUMMARY_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-asset-parent-folders', upload.none(), async (req, res) => {
    try 
    {
        const GET_ASSET_PARENT_FOLDERS_INFO = await NomadSDK.getAssetParentFolders(
            req.body.assetId, req.body.pageSize);

        res.status(200).json(GET_ASSET_PARENT_FOLDERS_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-asset-screenshot-details', upload.none(), async (req, res) => {
    try 
    {
        const GET_ASSET_SCREENSHOT_DETAILS_INFO = await NomadSDK.getAssetScreenshotDetails(
            req.body.assetId, req.body.segmentId, req.body.screenshotId);

        res.status(200).json(GET_ASSET_SCREENSHOT_DETAILS_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-asset-segment-details', upload.none(), async (req, res) => {
    try 
    {
        const GET_ASSET_SEGMENT_DETAILS_INFO = await NomadSDK.getAssetSegmentDetails(
            req.body.assetId, req.body.segmentId);

        res.status(200).json(GET_ASSET_SEGMENT_DETAILS_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-user-upload-parts', upload.none(), async (req, res) => {
    try 
    {
        const GET_USER_UPLOAD_PARTS_INFO = await NomadSDK.getUserUploadParts(
            req.body.assetId);

        res.status(200).json(GET_USER_UPLOAD_PARTS_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/get-user-uploads', upload.none(), async (req, res) => {
    try 
    {
        const GET_USER_UPLOADS_INFO = await NomadSDK.getUserUploads(
            req.body.includeCompletedUploads === "True");

        res.status(200).json(GET_USER_UPLOADS_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/import-annotations', upload.none(), async (req, res) => {
    try 
    {
        const ANNOTATIONS = [];

        const START_TIME = typeof req.body.startTimeCode === 'string' ? [req.body.startTimeCode] : req.body.startTimeCode;
        const END_TIME = typeof req.body.endTimeCode === 'string' ? [req.body.endTimeCode] : req.body.endTimeCode;

        for (let annotationIdx = 0; annotationIdx < START_TIME.length; ++annotationIdx) {
            ANNOTATIONS.push(
                {
                    startTimeCode: START_TIME[annotationIdx],
                    endTimeCode: END_TIME[annotationIdx],
                }
            );
        }

        await NomadSDK.importAnnotations(
            req.body.assetId, ANNOTATIONS);

        res.status(200).json('');
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/index-asset', upload.none(), async (req, res) => {
    try 
    {
        const INDEX_ASSET_INFO = await NomadSDK.indexAsset(req.body.assetId);

        res.status(200).json(INDEX_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/local-restore-asset', upload.none(), async (req, res) => {
    try 
    {
        const LOCAL_RESTORE_ASSET_INFO = await NomadSDK.localRestoreAsset(req.body.assetId,
            req.body.profile);

        res.status(200).json(LOCAL_RESTORE_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/move-asset', upload.none(), async (req, res) => {
    try 
    {
        let batchAction = null;
        if (req.body.batchActionId !== "") 
        {
            batchAction = { 
                id: req.body.batchActionId, 
                description: req.body.batchActionName 
            };
        }

        let targetIds = null;
        if (req.body.targetIds !== "")
        {
            targetIds = req.body.targetIds.split(",");
        }

        const ACTION_ARGUMENTS = {};
        if (typeof req.body.argumentKey !== 'undefined') 
        {
            for (let argumentActionIdx = 0; argumentActionIdx < req.body.argumentKey.length; ++argumentActionIdx) {
                ACTION_ARGUMENTS[req.body.argumentKey[argumentActionIdx]] = req.body.argumentValue[argumentActionIdx];
            }
        }

        const MOVE_ASSET_INFO = await NomadSDK.moveAsset(req.body.assetId, batchAction,
            req.body.contentDefintionId, req.body.schemaName, targetIds, ACTION_ARGUMENTS,
            req.body.resolverExcempt === "True");

        res.status(200).json(MOVE_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/record-asset-tracking-beacon', upload.none(), async (req, res) => {
    try 
    {
        const RECORD_ASSET_TRACKING_BEACON_INFO = await NomadSDK.recordsAssetTrackingBeacon(
            req.body.assetId, req.body.trackingEvent, 
            JSON.parse(req.body.recordsAssetTrackingBeaconLiveChannelSelect), req.body.contentId,
            req.body.second);

        res.status(200).json(RECORD_ASSET_TRACKING_BEACON_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/register-asset', upload.none(), async (req, res) => {
    try 
    {
        let collections = null;
        if (req.body.registerAssetCollectionsSelect)
        {
            const PARSED_COLLECTIONS = JSON.parse(req.body.registerAssetCollectionsSelect);
            collections = Array.isArray(PARSED_COLLECTIONS) ? PARSED_COLLECTIONS : [PARSED_COLLECTIONS];
        }

        let relatedContents = null;
        if (req.body.registerAssetRelatedContentsSelect)
        {
            const PARSED_RELATED_CONTENTS = JSON.parse(req.body.registerAssetRelatedContentsSelect);
            relatedContents = Array.isArray(PARSED_RELATED_CONTENTS) ? PARSED_RELATED_CONTENTS : [PARSED_RELATED_CONTENTS];
            relatedContents.forEach(item => {
                item["type"] = req.body.registerAssetRelatedContentsContentDefinitionsSelect.description;
            });
        }

        let tags = null;
        if (req.body.registerAssetTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.registerAssetTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        const REGISTER_ASSET_INFO = await NomadSDK.registerAsset(req.body.assetId,
            req.body.parentId, req.body.displayObjectKey, req.body.bucketName,
            req.body.objectKey, req.body.eTag, tags, collections, relatedContents,
            req.body.sequencer, req.body.assetStatus, req.body.storageClass, 
            req.body.assetType, req.body.contentLength, req.body.storageEventName,
            req.body.createDate, req.body.storageSouceIpAddress, 
            req.body.startMediaProcessor === "True", req.body.deleteMissingAsset === "True");

        res.status(200).json(REGISTER_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/reprocess-asset', upload.none(), async (req, res) => {
    try 
    {
        const REPROCESS_ASSET_INFO = await NomadSDK.reprocessAsset(req.body.targetIds.split(","));

        res.status(200).json(REPROCESS_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/restore-asset', upload.none(), async (req, res) => {
    try 
    {
        const RESTORE_ASSET_INFO = await NomadSDK.restoreAsset(req.body.assetId);

        res.status(200).json(RESTORE_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/share-asset', upload.none(), async (req, res) => {
    try 
    {
        const NOMAD_USERS_VALS =  (req.body.nomadUsers === "") ? [] : req.body.nomadUsers.split(",");

        const NOMAD_USERS = [];
        for (let nomadUser in NOMAD_USERS_VALS) 
        {
            NOMAD_USERS[nomadUser] = { id: NOMAD_USERS_VALS[nomadUser] };
        }

        const EXTERNAL_USERS_VALS = (req.body.externalUsers === "") ? [] : req.body.externalUsers.split(",");

        const EXTERNAL_USERS = [];
        for (let externalUser in EXTERNAL_USERS_VALS)
        {
            EXTERNAL_USERS[externalUser] = { id: EXTERNAL_USERS_VALS[externalUser] };
        }

        const SHARE_ASSET_INFO = await NomadSDK.shareAsset(req.body.assetId, 
            NOMAD_USERS, EXTERNAL_USERS, req.body.shareDurationInHours);

        res.status(200).json(SHARE_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/start-workflow', upload.none(), async (req, res) => {
    try 
    {
        const ACTION_ARGUMENTS = {};
        if (typeof req.body.argumentKey !== 'undefined') 
        {
            for (let argumentActionIdx = 0; argumentActionIdx < req.body.argumentKey.length; ++argumentActionIdx) {
                ACTION_ARGUMENTS[req.body.argumentKey[argumentActionIdx]] = req.body.argumentValue[argumentActionIdx];
            }
        }

        const START_WORKFLOW_INFO = await NomadSDK.startWorkflow(
            ACTION_ARGUMENTS, req.body.targetIds.split(","));

        res.status(200).json(START_WORKFLOW_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/transcribe-asset', upload.none(), async (req, res) => {
    try 
    {
        const TRANSCRIPT = [];

        const START_TIME_CODE = typeof req.body.startTimeCode === 'string' ? [req.body.startTimeCode] : req.body.startTimeCode;
        const CONTENT = typeof req.body.content === 'string' ? [req.body.content] : req.body.content;

        for (let transcriptIdx = 0; transcriptIdx < START_TIME_CODE; ++transcriptIdx) {
            TRANSCRIPT.push(
                { 
                    startTimeCode: START_TIME_CODE[transcriptIdx],
                    content: CONTENT[transcriptIdx]
                }
            );
        }

        const TRANSCRIBE_ASSET_INFO = await NomadSDK.transcribeAsset(req.body.assetId,
            req.body.transcriptId, TRANSCRIPT);

        res.status(200).json(TRANSCRIBE_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.put('/update-annotation', upload.none(), async (req, res) => {
    try 
    {
        const UPDATE_ANNOTATION_INFO = await NomadSDK.updateAnnotation(req.body.assetId,
            req.body.annotationId, req.body.startTimeCode, req.body.endTimeCode, 
            req.body.firstKeyword, req.body.secondKeyword, req.body.description,
            JSON.parse(req.body.updateAnnotationCountrySelect), req.body.contentId, 
            req.body.imageUrl);

        res.status(200).json(UPDATE_ANNOTATION_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.patch('/update-asset', upload.none(), async (req, res) => {
    try 
    {
        const PROPERTIES = {};
        if (req.body.propertyKey)
        {
            for (let propertyIdx = 0; propertyIdx < req.body.propertyKey.length; ++propertyIdx) {
                PROPERTIES[req.body.propertyKey[propertyIdx]] = req.body.propertyValue[propertyIdx];
            }
        }

        const UPDATE_ASSET_INFO = await NomadSDK.updateAsset(req.body.assetId,
            req.body.displayName, req.body.displayDate, req.body.availableStartDate,
            req.body.availableEndDate, PROPERTIES);

        res.status(200).json(UPDATE_ASSET_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.put('/update-asset-ad-break', upload.none(), async (req, res) => {
    try 
    {
        let tags = null;
        if (req.body.updateAssetAdBreakTagsSelect)
        {
            const PARSED_TAGS = JSON.parse(req.body.updateAssetAdBreakTagsSelect);
            tags = Array.isArray(PARSED_TAGS) ? PARSED_TAGS : [PARSED_TAGS];
        }

        let labels = null;
        if (req.body.updateAssetAdBreakLabelsSelect)
        {
            const PARSED_LABELS = JSON.parse(req.body.updateAssetAdBreakLabelsSelect);
            labels = Array.isArray(PARSED_LABELS) ? PARSED_LABELS : [PARSED_LABELS];
        }

        const UPDATE_ASSET_AD_BREAK_INFO = await NomadSDK.updateAssetAdBreak(req.body.assetId,
            req.body.adBreakId, req.body.timeCode, tags, labels);

        res.status(200).json(UPDATE_ASSET_AD_BREAK_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
    }
});

app.put('/update-asset-language', upload.none(), async (req, res) => {
    try 
    {
        const LANGUAGE = JSON.parse(req.body.updateAssetLanguageSelect);
        const UPDATE_ASSET_LANGUAGE_INFO = await NomadSDK.updateAssetLanguage(
            req.body.assetId, LANGUAGE.id);

        res.status(200).json(UPDATE_ASSET_LANGUAGE_INFO);
    }
    catch (error)
    {
        console.error(error);
        res.status(500).json(error);
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