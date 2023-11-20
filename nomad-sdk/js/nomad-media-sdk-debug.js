// account






// config
import config from "./config/config.js";

// admin














































































































// common











// portal




































// helpers




/**
 * @class NomadSDK
 * @classdesc This class is used to interact with the Nomad API.
 */
class NomadSDK {
    /**
     * @constructor
     * @param {Object} config - The configuration object.
     * @param {string} config.username - The username for authentication.
     * @param {string} config.password - The password for authentication.
     * @param {string} config.serviceApiUrl - The URL for the Nomad API.
     * @param {string} config.apiType - The API type to use (admin or portal).
     * @param {boolean} config.debugMode - Whether to enable debug mode.
     */
    constructor(config) {
        this.config = config;
        this.token = null;
        this.refreshTokenVal = null;
        this.expirationSeconds = null;
        this.userSessionId = null;
        this.id = null

        this.debugMode = config.debugMode || false;
    } 

    /**
     * @function init
     * @async
     * @private
     * @description Initializes the SDK. Logs in using the username and password from the config. 
     * Then schedules a token refresh for the duration set by the value returned in the login.
     * @returns {Promise<void>} - A promise that resolves when the SDK is initialized.
     * @throws {Error} - An error is thrown if the SDK fails to initialize.
     */
    async _init() 
    {
        await this.login();

        // Schedule token refresh
        this.__scheduleTokenRefresh();
    }
    
    // account functions
    /**
     * @function login
     * @async
     * @private
     * @description Logs in using the username and password from the config.
     * @returns {Promise<void>} - A promise that resolves when the login is successful.
     * Updates the token, refresh token, expiration seconds, and user session ID class varibles. 
     * @throws {Error} - An error is thrown if the login fails.
     */ 
    async login()
    {

        _printDatetime(`Logging in as ${this.config.username}`);

        try
        {
            const LOGIN_INFO = await _login(this.config.username, this.config.password, 
                                            this.config.serviceApiUrl, this.debugMode);
            this.token = LOGIN_INFO["token"];
            this.refreshTokenVal = LOGIN_INFO["refreshToken"];
            this.expirationSeconds = Date.now() + LOGIN_INFO["expirationSeconds"] * 1000;
            this.userSessionId = LOGIN_INFO["userSessionId"];
            this.id = LOGIN_INFO["id"];
            _printDatetime(`Login successful`);
        }
        catch (error) 
        {
            _printDatetime(`Login failed`);
            throw error;
        }
    }

    /**
     * @function logout
     * @async
     * @description Logs out the current user.
     * @returns {Promise<null>} - A promise that resolves when the logout is successful.
     * @throws {Error} - An error is thrown if the logout fails.
     */
    async logout()
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Logging out`);

        try
        {
            await _logout(this.token, this.userSessionId, this.config.serviceApiUrl, this.debugMode);
            this.token = null;
            this.refreshTokenVal = null;
            this.expirationSeconds = null;
            this.userSessionId = null;
            this.id = null;
            
            _printDatetime(`Logout successful`);
        }
        catch (error)
        {
            _printDatetime("Loggout failed");
            throw error;
        }
    }

    /**
     * @function refreshToken
     * @async
     * @private
     * @description Refreshes the current token.
     * @returns {Promise<void>} - A promise that resolves when the token is refreshed.
     * Updates the token class variable.
     * @throws {Error} - An error is thrown if the token refresh fails.
     */ 
    async refreshToken()
    {
        _printDatetime(`Refreshing token`);

        try
        {
            const TOKEN_INFO = await _refreshToken(this.refreshTokenVal, this.config.serviceApiUrl, 
                this.debugMode);
            this.token = TOKEN_INFO["token"];
            _printDatetime(`Token refresh successful`);
        }
        catch (error)
        {
            _printDatetime(`Token refresh failed`);
            throw error;
        }
    }

    /**
     * @function scheduleTokenRefresh
     * @private
     * @description Schedules a token refresh for the duration set by the value returned in the login.
     * @returns {Promise<void>} - A promise that resolves when the token is refreshed.
     * Updates the token class variable.
     * @throws {Error} - An error is thrown if the token refresh fails.
     */ 
    __scheduleTokenRefresh() {
        if (this.token && this.expirationSeconds) {
            const remainingTime = this.expirationSeconds - Date.now();
            if (remainingTime > 0) {
                // Clear existing timer (if any)
                if (this.refreshTimer) {
                    clearTimeout(this.refreshTimer);
                }
                // Schedule a refresh slightly before token expiration
                this.refreshTimer = setTimeout(async () => {
                    await this.refreshToken();
                    this.__scheduleTokenRefresh();
                }, remainingTime - 5000); // Refresh 5 seconds before expiration
            }
        }
    }

    /**
     * @function forgotPassword
     * @async
     * @description Sends a code to the email to the user to be used 
     * be used to reset the password.
     * @returns {Promise<void>}
     * Sends email with code to reset password.
     * @throws {Error} - An error is thrown if the code fails to send.
     */  
    async forgotPassword()
    {
        const USERNAME = this.config.username;

         _printDatetime(`Sending code to ${USERNAME}`);

        try
        {
            await _forgotPassword(this.config.serviceApiUrl, USERNAME, this.debugMode);
            _printDatetime(`Code sent to ${USERNAME}`);
        }
        catch (error)
        {
            _printDatetime(`Code failed to send to ${USERNAME}`);
            throw error;
        }
    }

    /**
     * @function resetPassword
     * @async
     * @description Resets the password for the specified username.
     * @param {string} CODE - The code to use to reset the password. Sent to the user's email
     * by calling forgotPassword().
     * @param {string} NEW_PASSWORD - The new password to set.
     * @returns {Promise<void>}
     * Resets the password for the specified username.
     * @throws {Error} - An error is thrown if the password fails to reset.
     */ 
    async resetPassword(CODE, NEW_PASSWORD)
    {
        const USERNAME = this.config.username;

        _printDatetime(`Resetting password for ${USERNAME}`);

        try
        {
            await _resetPassword(this.config.serviceApiUrl, USERNAME, CODE, NEW_PASSWORD,  
                this.debugMode);
            _printDatetime(`Password reset for ${USERNAME}`);
        }
        catch (error)
        {
            _printDatetime(`Password failed to reset for ${USERNAME}`);
            throw error;
        }
    }

    // admin
    // asset functions
    /**
     * @function getAssetDetails
     * @async
     * @description Gets the asset details for the specified asset ID.
     * @param {string} ASSET_ID - The ID of the asset to get the details for.
     * @returns {Promise<JSON>} - A promise that resolves when the asset details are retrieved.
     * Returns the asset details.
     * @throws {Error} - An error is thrown if the asset details fail to retrieve.
     */
    
    async getAssetDetails(ASSET_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Getting asset details for ${ASSET_ID}`);

        try
        {
            const ASSET_DETAILS = await _getAssetDetails(this.token, this.config.serviceApiUrl, 
                ASSET_ID, this.config.apiType, this.debugMode);
            _printDatetime(`Asset details retrieved for ${ASSET_ID}`);
            return ASSET_DETAILS;
        }
        catch (error)
        {
            _printDatetime(`Asset details failed to retrieve for ${ASSET_ID}`);
            throw error;
        }
    }

    // asset upload functions
    /**
     * @function uploadAsset
     * @async
     * @description Uploads an asset to the specified parent ID.
     * @param {string| null} NAME - The name of the asset.
     * @param {string | null} EXISTING_ASSET_ID - The Existing AssetId (file) that should be 
     * overwritten with this upload. Note that by specifying this attribute then the parentId, 
     * relativePath and displayName are all ignored.
     * @param {string | null} RELATED_ASSET_ID - The related asset ID of the existingAsset that 
     * we're replacing. If this is used, most of the other properties are not needed.
     * @param {boolean | null} CREATE_TRANSCRIBE_RELATED_ASSET - Indicates if the upload should 
     * create a related transcribe asset for a given ExistingAssetId. If specified, ExistingAssetId 
     * has to have a value defined.
     * @param {string | null} RELATED_CONTENT_ID - The Content ID of the related content record 
     * to associate this asset to. Note that by specifying this attribute then the parentId and 
     * relativePath attributes are both ignored.
     * @param {string | null} LANGUAGE_ID - The language of the asset to upload. 
     * If this is left blank then the default system language is used.
     * @param {string} UPLOAD_OVERWRITE_OPTION - The overwrite option for the upload. 
     * The option you want to use when uploading the asset. The options are continue, replace, 
     * and cancel. Continue continues the upload from where it left off. Replace replaces an 
     * existing asset. This is the one you want to use if you are starting a new upload. 
     * Cancel cancels an uploading asset.
     * @param {File} FILE - The FILE object to upload.
     * This is ignored if the ExistingAssetId or if the RelatedContentId has a value.
     * @param {string | null} PARENT_ID - The Parent AssetId (folder) to add the upload to. 
     * Note that if there is a full relativePath, then it is appended to this parent path. 
     * If this value is omitted then the file will be added to the predefined incoming folder.
     * This is ignored if the ExistingAssetId or if the RelatedContentId has a value.
     * @returns {Promise<string>} - A promise that resolves when the asset is uploaded.
     * Returns the content ID of the uploaded asset.
     * @throws {Error} - An error is thrown if the asset fails to upload.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */  
    async uploadAsset(NAME, EXISTING_ASSET_ID, RELATED_ASSET_ID, CREATE_TRANSCRIBE_RELATED_ASSET, 
        RELATED_CONTENT_ID, LANGUAGE_ID, UPLOAD_OVERWRITE_OPTION, FILE, PARENT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Uploading asset ${NAME}`);
        
        let START_UPLOAD_INFO = null
        try
        {
            _printDatetime("Starting upload");
            START_UPLOAD_INFO = await _startUpload(this.token, this.config.serviceApiUrl, NAME, 
                EXISTING_ASSET_ID, RELATED_ASSET_ID, CREATE_TRANSCRIBE_RELATED_ASSET, 
                RELATED_CONTENT_ID, LANGUAGE_ID, UPLOAD_OVERWRITE_OPTION, FILE, PARENT_ID, 
                this.debugMode);
            await _multiThreadUpload(this.token, this.config.serviceApiUrl, FILE, START_UPLOAD_INFO,
                this.debugMode);
            await _completeUpload(this.token, this.config.serviceApiUrl, 
                START_UPLOAD_INFO["id"], this.debugMode);
            const CONTENT_ID = START_UPLOAD_INFO["assetId"];
            _printDatetime("Upload successful");
            return CONTENT_ID;
        }
        catch (error)
        {
            if (START_UPLOAD_INFO !== null)
            {
                await _cancelUpload(this.token, this.config.serviceApiUrl, START_UPLOAD_INFO["id"],
                    this.debugMode);
            }
            _printDatetime("Upload failed");
            throw error;
        }
    }

    // content functions
    /**
     * @function createContent
     * @async
     * @description Creates content using the specified content definition.
     * @param {string} CONTENT_DEFINITION_ID - The content definition id where the content will be created.
     * @param {string | null} LANGUAGE_ID - The language id of the content. 
     * If this is left blank then the default system language is used.
     * @returns {Promise<JSON>} - A promise that resolves when the content is created.
     * Returns the content information of the created content.
     * @throws {Error} - An error is thrown if the content fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createContent(CONTENT_DEFINITION_ID, LANGUAGE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

         _printDatetime(`Creating content`);
        
        try
        {
            const CREATE_CONTENT_INFO = await _createContent(this.token, this.config.serviceApiUrl, 
                CONTENT_DEFINITION_ID, LANGUAGE_ID, this.debugMode);
            _printDatetime(`Content created: ${CREATE_CONTENT_INFO["contentId"]}`);
            return CREATE_CONTENT_INFO;
        } 
        catch (error)
        {
            _printDatetime(`Content failed to create`);
            throw error;
        }
    }

    /**
     * @function deleteContent
     * @async
     * @description Deletes the specified content.
     * @param {string} CONTENT_ID - The ID of the content to delete.
     * @param {string} CONTENT_DEFINITION_ID - The ID of the content definition to use.
     * @returns {Promise<void>}
     * @throws {Error} - An error is thrown if the content fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async deleteContent(CONTENT_ID, CONTENT_DEFINITION_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting content: ${CONTENT_ID}`);

        try
        {
            await _deleteContent(this.token, this.config.serviceApiUrl, CONTENT_ID, 
                CONTENT_DEFINITION_ID, this.debugMode);
            _printDatetime(`Content deleted: ${CONTENT_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Content failed to delete: ${CONTENT_ID}`);
            throw error;
        }
    }

    /**
     * @function getContent
     * @async
     * @description Gets the specified content.
     * 
     * @param {string} CONTENT_ID - The ID of the content to get.
     * @param {string} CONTENT_DEFINITION_ID - The ID of the content definition to use.
     * @param {boolean | null} IS_REVISION - Whether to get the revision of the content.
     * Defaults to false.
     * @returns {Promise<JSON>} - A promise that resolves when the content is retrieved.
     * Returns the content information of the retrieved content.
     * @throws {Error} - An error is thrown if the content fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async getContent(CONTENT_ID, CONTENT_DEFINITION_ID, IS_REVISION)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting content: ${CONTENT_ID}`);
        
        try
        {
            const GET_CONTENT_INFO = await _getContent(this.token, this.config.serviceApiUrl, 
                CONTENT_ID, CONTENT_DEFINITION_ID, IS_REVISION, this.debugMode);
            _printDatetime(`Content retrieved: ${CONTENT_ID}`);
            return GET_CONTENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content failed to retrieve: ${CONTENT_ID}`);
            throw error;
        }
    }

    /**
     * @function updateContent
     * @async
     * @description Updates the specified content.
     * @param {string} CONTENT_ID - The ID of the content to update.
     * @param {string} CONTENT_DEFINITION_ID - The ID of the content definition to use.
     * @param {JSON} PROPERTIES - The properties to update.
     * @param {string | null} LANGUAGE_ID - The language of the asset to upload.
     * @returns {Promise<JSON>} - A promise that resolves when the content is updated.
     * Returns the content id of the updated content.
     * @throws {Error} - An error is thrown if the content fails to update.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async updateContent(CONTENT_ID, CONTENT_DEFINITION_ID, PROPERTIES, LANGUAGE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Updating content: ${CONTENT_ID}`);

        try
        {
            const UPDATE_CONTENT_INFO = await _updateContent(this.token, this.config.serviceApiUrl, 
                CONTENT_ID, CONTENT_DEFINITION_ID, PROPERTIES, LANGUAGE_ID, this.debugMode);
            _printDatetime(`Content updated: ${CONTENT_ID}`);
            return UPDATE_CONTENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content failed to update: ${CONTENT_ID}`);
            throw error;
        }
    }


    // content admin functions
    /**
     * @function addCustomProperties
     * @async
     * @description Adds custom properties to the specified content.
     * @param {string} CONTENT_ID - The ID of the content to add the custom properties to.
     * @param {string | null} NAME - The name of the content to add the custom properties to.
     * @param {string | null} DATE - The display date of the content to add to the custom properties.
     * @param {JSON} CUSTOM_PROPERTIES - A list of custom properties that should be saved for the 
     * asset. To remove a property value, set the value to null
     * @returns {Promise<JSON>} - A promise that resolves when the custom properties are added.
     * Returns the information of the added custom properties.
     * @throws {Error} - An error is thrown if the custom properties fail to add.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async addCustomProperties(CONTENT_ID, NAME, DATE, CUSTOM_PROPERTIES)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

         _printDatetime(`Adding custom properties to content: ${CONTENT_ID}`);

        try
        {
            const ADD_CUSTOM_PROPERTIES_INFO = await _addCustomProperties(this.token, 
                this.config.serviceApiUrl, CONTENT_ID, NAME, DATE, CUSTOM_PROPERTIES, 
                this.debugMode);
            _printDatetime(`Custom properties added to content: ${CONTENT_ID}`);
            return ADD_CUSTOM_PROPERTIES_INFO;
        }
        catch (error)
        {
            _printDatetime(`Custom properties failed to add to content: ${CONTENT_ID}`);
            throw error;
        }
    }

    /**
     * @function addRelatedContent
     * @async
     * @description Adds related content to the specified content.
     * @param {string} CONTENT_ID - The ID of the content to add the related content to.
     * @param {string} RELATED_CONTENT_ID - The ID of the related content to add.
     * @param {string} CONTENT_DEFINITION - The content definition of the related content to add.
     * @returns {Promise<JSON>} - A promise that resolves when the related content is added.
     * Returns the information of the added related content.
     * @throws {Error} - An error is thrown if the related content fails to add.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async addRelatedContent(CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Adding related content to content: ${CONTENT_ID}`);

        try
        {
            const ADD_RELATED_CONTENT_INFO = await _addRelatedContent(this.token, 
                this.config.serviceApiUrl, CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION, 
                this.debugMode);
            _printDatetime(`Related content added to content: ${CONTENT_ID}`);
            return ADD_RELATED_CONTENT_INFO.items[0];
        }
        catch (error)
        {
            _printDatetime(`Related content failed to add to content: ${CONTENT_ID}`);
            throw error;
        }
    }

    /**
     * @function addTagOrCollection
     * @async
     * @description Adds a tag or collection to the specified content.
     * @param {string} TYPE - Specify if the content being managed is a tag or a collection.
     * @param {string} CONTENT_ID - The ID of the content to add the tag or collection to.
     * @param {string} CONTENT_DEFINITION - The content definition of the tag or collection to add.
     * @param {string} TAG_NAME - The name of the tag or collection to add.
     * @param {string | null} TAG_ID - The ID of the tag or collection to add.
     * @param {boolean} CREATE_NEW - Whether to create a new tag or collection if it does not exist.
     * @returns {Promise<JSON>} - A promise that resolves when the tag or collection is added.
     * Returns the information of the added tag or collection.
     * @throws {Error} - An error is thrown if the tag or collection fails to add.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async addTagOrCollection(TYPE, CONTENT_ID, CONTENT_DEFINITION, TAG_NAME, 
        TAG_ID, CREATE_NEW)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Adding ${TYPE} to content ${CONTENT_ID}`);

        try
        {
            const ADD_TAG_OR_COLLECTION_INFO = await _addTagOrCollection(this.token, 
                this.config.serviceApiUrl, TYPE, CONTENT_ID, CONTENT_DEFINITION, TAG_NAME, 
                TAG_ID, CREATE_NEW, this.debugMode);
            _printDatetime(`${TYPE} added to content: ${CONTENT_ID}`);
            return ADD_TAG_OR_COLLECTION_INFO.items[0];
        }
        catch (error)
        {
            _printDatetime(`Adding ${TYPE} to content: ${CONTENT_ID} failed`);
            throw error;
        }
    }

    /**
     * @function createTagOrCollection
     * @async
     * @description Creates a tag or collection.
     * @param {string} TYPE - Specify if the content being managed is a tag or a collection.
     * @param {string} TAG_NAME - The name of the tag or collection to create.
     * @returns {Promise<JSON>} - A promise that resolves when the tag or collection is created.
     * Returns the id of the created tag or collection.
     * @throws {Error} - An error is thrown if the tag or collection fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createTagOrCollection(TYPE, TAG_NAME)
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Creating ${TYPE}: ${TAG_NAME}`);

        try
        {
            const CREATE_TAG_OR_COLLECTION_INFO = await _createTagOrCollection(this.token, 
                this.config.serviceApiUrl, TYPE, TAG_NAME, this.debugMode);
            _printDatetime(`${TYPE} created: ${TAG_NAME}`);
            return CREATE_TAG_OR_COLLECTION_INFO;
        }
        catch (error)
        {
            _printDatetime(`${TYPE} failed to create: ${TAG_NAME}`);
            throw error;
        }
    }

    /**
     * @function deleteRelatedContent
     * @async
     * @description Deletes related content from the specified content.
     * @param {string} CONTENT_ID - The ID of the content to delete the related content from.
     * @param {string} RELATED_CONTENT_ID - The ID of the related content to delete.
     * @param {string} CONTENT_DEFINITION - The content definition of the related content to delete.
     * @returns {Promise<JSON>} - A promise that resolves when the related content is deleted.
     * Returns the information of the deleted related content.
     * @throws {Error} - An error is thrown if the related content fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteRelatedContent(CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Deleting related content from content: ${CONTENT_ID}`);

        try
        {
            const DELETE_RELATED_CONTENT_INFO = await _deleteRelatedContent(this.token, 
                this.config.serviceApiUrl, CONTENT_ID, RELATED_CONTENT_ID, CONTENT_DEFINITION, 
                this.debugMode);
            _printDatetime(`Related content deleted from content: ${CONTENT_ID}`);
            return DELETE_RELATED_CONTENT_INFO.items[0];
        }
        catch (error)
        {
            _printDatetime(`Related content failed to delete from content: ${CONTENT_ID}`);
            throw error;
        }
    }

    /**
     * @function deleteTagOrCollection
     * @async
     * @description Deletes a tag or collection from the specified content.
     * @param {string} TYPE - Specify if the content being managed is a tag or a collection.
     * @param {string} TAG_ID - The ID of the tag or collection to delete.
     * @returns {Promise<JSON>} - A promise that resolves when the tag or collection is deleted.
     * Returns the information of the deleted tag or collection.
     * @throws {Error} - An error is thrown if the tag or collection fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteTagOrCollection(TYPE, TAG_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting tag or collection: ${TAG_ID}`);

        try
        {
            const DELETE_TAG_OR_COLLECTION_INFO = await _deleteTagOrCollection(this.token, 
                this.config.serviceApiUrl, TYPE, TAG_ID, this.debugMode);
            _printDatetime(`Tag or collection deleted: ${TAG_ID}`);
            return DELETE_TAG_OR_COLLECTION_INFO;
        }
        catch (error)
        {
            _printDatetime(`Tag or collection failed to delete: ${TAG_ID}`);
            throw error;
        }
    }

    /**
     * @function getTagOrCollection
     * @async
     * @description Gets the specified tag or collection.
     * @param {string} TYPE - Specify if the content being managed is a tag or a collection.
     * @param {string} ID - The ID of the tag or collection to get.
     * @returns {Promise<JSON>} - A promise that resolves when the tag or collection is retrieved.
     * Returns the information of the retrieved tag or collection.
     * @throws {Error} - An error is thrown if the tag or collection fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getTagOrCollection(TYPE, ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Getting ${TYPE}: ${ID}`);

        try
        {
            const GET_TAG_OR_COLLECTION_INFO = await _getTagOrCollection(this.token, 
                this.config.serviceApiUrl, TYPE, ID, this.debugMode);
            _printDatetime(`${TYPE} retrieved: ${ID}`);
            return GET_TAG_OR_COLLECTION_INFO;
        }
        catch (error)
        {
            _printDatetime(`${TYPE} failed to retrieve: ${ID}`);
            throw error;
        }
    }

    /**
     * @function removeTagOrCollection  
     * @async
     * @description Removes a tag or collection from the specified content.
     * @param {string} TYPE - Specify if the content being managed is a tag or a collection.
     * @param {string} CONTENT_ID - The ID of the content to remove the tag or collection from.
     * @param {string} CONTENT_DEFINITION - The content definition of the tag or collection to add.
     * @param {string} TAG_ID - The ID of the tag or collection to remove.
     * @returns {Promise<JSON>} - A promise that resolves when the tag or collection is removed.
     * Returns the information of the removed tag or collection.
     * @throws {Error} - An error is thrown if the tag or collection fails to remove.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async removeTagOrCollection(TYPE, CONTENT_ID, CONTENT_DEFINITION, TAG_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Removing ${TYPE} from content: ${CONTENT_ID}`);

        try
        {
            const REMOVE_TAG_OR_COLLECTION_INFO = await _removeTagOrCollection(this.token, 
                this.config.serviceApiUrl, TYPE, CONTENT_ID, CONTENT_DEFINITION, TAG_ID,
                this.debugMode);
            _printDatetime(`${TYPE} removed from content: ${CONTENT_ID}`);
            return REMOVE_TAG_OR_COLLECTION_INFO.items[0];
        }
        catch (error)
        {
            _printDatetime(`${TYPE} failed to remove from content: ${CONTENT_ID}`);
            throw error;
        }
    }
    
    // event functions
    /**
    * Creates and updates an event.
    * @function createAndUpdateEvent
    * @async
    * @param {string | null} CONTENT_ID - The content id of the event to update. Null for create.
    * @param {string} CONTENT_DEFINITION_ID - The content definition id of the event.
    * @param {string} NAME - The name of the event.
    * @param {JSON | null} SERIES - The series of the event.
    * JSON format: { id: string, description: string }
    * @param {string} START_DATETIME - The start date and time of the event.
    * @param {string} END_DATETIME - The end date and time of the event.
    * @param {JSON | null} PRIMARY_PERFORMER - The name and id of the primary performer.
    * JSON format: { id: string, description: string }
    * @param {string | null} SHORT_DESCRIPTION - The short description of the event.
    * @param {string | null} LONG_DESCRIPTION - The long description of the event.
    * @param {JSON | null} THUMBNAIL_IMAGE - The thumbnail image name and id of the event.
    * JSON format: { id: string, description: string }
    * @param {JSON | null} HERO_IMAGE - The hero image name and id of the event.
    * JSON format: { id: string, description: string }
    * @param {JSON | null} LOGO_IMAGE - The logo image name and id of the event.
    * JSON format: { id: string, description: string }
    * @param {JSON | null} INTELLIGENT_PROGRAM - The intelligent program of the event.
    * JSON format: { id: string, description: string }
    * @param {string | null} EXTERNAL_URL - The external URL of the event.
    * @param {JSON | null} VENUE - The venue name and id of the event.
    * JSON format: { id: string, description: string }
    * @param {Array<JSON> | null} PERFORMERS - The performers of the event.
    * JSON format: [{ id: string, description: string },]
    * @param {Array<JSON> | null} GENRES - The genres of the event.
    * JSON format: [{ id: string, description: string },]
    * @param {Array<JSON> | null} MEDIA_ATTRIBUTES - The media attributes of the event.
    * JSON format: [{ id: string, description: string },]
    * @param {Array<JSON> | null} LANGUAGES - The languages of the event.
    * JSON format: [{ id: string, description: string },]
    * @param {Array<JSON> | null} PRODUCTS - The products of the event.
    * JSON format: [{ id: string, description: string },]
    * @param {Array<JSON> | null} FEATURED_GROUPS - The featured groups of the event.
    * JSON format: [{ id: string, description: string },]
    * @param {string | null} GROUP_SEQUENCE - The group sequence of the event.
    * @param {Array<JSON> | null} RELATED_MEDIA_ITEMS - The related media items of the event.
    * JSON format: [{ id: string, description: string },]
    * @param {Array<JSON> | null} RECOMMENDEDATION_SIMILAR_ITEMS - The recommended similar items of the
    * event. JSON format: [{ id: string, description: string },]
    * @param {Array<JSON> | null} CONTENT_RATINGS - The content ratings of the event.
    * JSON format: [{ id: string, description: string },]
    * @param {boolean | null} IS_DISABLED - Whether the event is disabled.
    * Set to false by default.
    * @param {JSON | null} LIVE_CHANNEL - The live channel of the event.
    * JSON format: { id: string, description: string }
    * @returns {Promise<JSON>} A promise that resolves when the event is created and updated.
    * Returns the information of the created and updated event.
    * @throws {Error} An error is thrown if the event fails to create and update.
    * @throws {Error} An error is thrown if the API type is not admin.
    */

    async createAndUpdateEvent(CONTENT_ID, CONTENT_DEFINITION_ID, NAME, SERIES, 
        START_DATETIME, END_DATETIME, PRIMARY_PERFORMER, SHORT_DESCRIPTION, LONG_DESCRIPTION, 
        THUMBNAIL_IMAGE, HERO_IMAGE, LOGO_IMAGE, INTELLIGENT_PROGRAM, EXTERNAL_URL, VENUE, 
        PERFORMERS, GENRES, MEDIA_ATTRIBUTES, LANGUAGES, PRODUCTS, FEATURED_GROUPS, 
        GROUP_SEQUENCE, RELATED_MEDIA_ITEMS, RECOMMENDED_SIMILAR_ITEMS, CONTENT_RATINGS, 
        IS_DISABLED, LIVE_CHANNEL)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Creating/Updating event: ${NAME}`);

        try
        {
            const CREATE_EVENT_INFO = await _createAndUpdateEvent(this.token, 
                this.config.serviceApiUrl, CONTENT_ID, CONTENT_DEFINITION_ID, NAME, SERIES,
                START_DATETIME, END_DATETIME, PRIMARY_PERFORMER, SHORT_DESCRIPTION, 
                LONG_DESCRIPTION, THUMBNAIL_IMAGE, HERO_IMAGE, LOGO_IMAGE, INTELLIGENT_PROGRAM, 
                EXTERNAL_URL, VENUE, PERFORMERS, GENRES, MEDIA_ATTRIBUTES, LANGUAGES, PRODUCTS, 
                FEATURED_GROUPS, GROUP_SEQUENCE, RELATED_MEDIA_ITEMS, RECOMMENDED_SIMILAR_ITEMS, 
                CONTENT_RATINGS, IS_DISABLED, LIVE_CHANNEL, this.debugMode);
            _printDatetime(`Event created/updated: ${CREATE_EVENT_INFO}`);
            return CREATE_EVENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Event failed to create/update: ${NAME}`);
            throw error;
        }
    }
    

    /**
     * @function deleteEvent
     * @async
     * @description Deletes an event.
     * @param {string} CONTENT_ID - The ID of the event to delete.
     * @param {string} CONTENT_DEFINITION_ID - The content definition ID of the event to
     * delete.
     * @returns {Promise<void>} - A promise that resolves when the event is deleted.
     * @throws {Error} - An error is thrown if the event fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteEvent(CONTENT_ID, CONTENT_DEFINITION_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting event: ${CONTENT_ID}`);

        try
        {
            await _deleteEvent(this.token, this.config.serviceApiUrl, 
                CONTENT_ID, CONTENT_DEFINITION_ID, this.debugMode);
            _printDatetime(`Event deleted: ${CONTENT_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Event failed to delete: ${CONTENT_ID}`);
            throw error;
        }
    }

    /**
     * @function addLiveScheduleToEvent
     * @async
     * @description Adds a live schedule to an event and updated live schedule attatched to event.
     * @param {string} EVENT_ID - The ID of the event to add the live schedule to.
     * @param {JSON | null} SLATE_VIDEO - The slate video ID of the event. 
     * JSON format: {"id": string, "description": string }
     * @param {JSON | null} PREROLL_VIDEO - The preroll video of the event. 
     * JSON format: {"id": string, "description": string }
     * @param {JSON | null} POSTROLL_VIDEO_ID - The postroll video of the event. 
     * JSON format: {"id": string, "description": string }
     * @param {boolean | null} IS_SECURE_OUTPUT - Whether the event is secure output. 
     * JSON format: { id: string, description: string }
     * @param {JSON | null} ARCHIVE_FOLDER - The archive folder of the event. 
     * JSON format: { id: string, description: string }
     * @param {JSON | null} PRIMARY_LIVE_INPUT - The live input A ID of the event. 
     * JSON format: { id: string, description: string }
     * @param {JSON | null} BACKUP_LIVE_INPUT - The live input B ID of the event. 
     * JSON format: { id: string, description: string }
     * @param {JSON | null} PRIMARY_LIVESTREAM_INPUT_URL - The primary live stream URL of the 
     * event. JSON format: { id: string, description: string }
     * @param {JSON | null} BACKUP_LIVESTREAM_INPUT_URL - The backup live stream URL of the event. 
     * @param {Array<JSON> | null} EXTERNAL_OUTPUT_PROFILES - The external output profiles of the event.
     * @returns {Promise<null>} - A promise that resolves when the live event schedule is created.
     * @throws {Error} - An error is thrown if the live event schedule fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async addLiveScheduleToEvent(EVENT_ID, SLATE_VIDEO, PREROLL_VIDEO, POSTROLL_VIDEO,
        IS_SECURE_OUTPUT, ARCHIVE_FOLDER, PRIMARY_LIVE_INPUT, BACKUP_LIVE_INPUT, 
        PRIMARY_LIVESTREAM_INPUT_URL, BACKUP_LIVESTREAM_INPUT_URL, EXTERNAL_OUTPUT_PROFILES)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Adding Live Schedule to Event: ${EVENT_ID}`);

        try
        {
            await _addLiveScheduleToEvent(this.token, this.config.serviceApiUrl, EVENT_ID, 
                SLATE_VIDEO, PREROLL_VIDEO, POSTROLL_VIDEO, IS_SECURE_OUTPUT, ARCHIVE_FOLDER, 
                PRIMARY_LIVE_INPUT, BACKUP_LIVE_INPUT, PRIMARY_LIVESTREAM_INPUT_URL, 
                BACKUP_LIVESTREAM_INPUT_URL, EXTERNAL_OUTPUT_PROFILES, this.debugMode);
            _printDatetime(`Live Schedule added to Event: ${EVENT_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Live Schedule failed to add to Event: ${EVENT_ID}`);
            throw error;
        }
    }

    /**
     * @function extendLiveSchedule
     * @async
     * @description Extends the live schedule of an event.
     * @param {string} EVENT_ID - The ID of the event to extend the live schedule of.
     * @param {Array<JSON>} RECURRING_DAYS - The days of the week to extend the live schedule of.
     * JSON format: [{ id: string, description: string },]
     * @param {integer} RECURRING_WEEKS - The number of weeks to extend the live schedule of.
     * @param {string | null} END_DATE - The end date to extend the live schedule of.
     * @param {string | null} TIME_ZONE_OFFSET_SECONDS - The time zone offset seconds to extend the
     * live schedule of.
     * @returns {Promise<null>} - A promise that resolves when the live schedule is extended.
     * @throws {Error} - An error is thrown if the live schedule fails to extend.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async extendLiveSchedule(EVENT_ID, RECURRING_DAYS, RECURRING_WEEKS, END_DATE, TIME_ZONE_OFFSET_SECONDS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error ("This function is only available for admin API type.");
        }

        _printDatetime(`Extending Live Schedule of Event: ${EVENT_ID}`);

        try
        {
            await _extendLiveSchedule(this.token, 
                this.config.serviceApiUrl, EVENT_ID, RECURRING_DAYS, RECURRING_WEEKS, END_DATE,
                TIME_ZONE_OFFSET_SECONDS, this.debugMode);
            _printDatetime(`Live Schedule extended of Event: ${EVENT_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Live Schedule failed to extend of Event: ${EVENT_ID}`);
            throw error;
        }
    }

    /**
     * @function getLiveSchedule
     * @async
     * @description Gets the live schedule of an event.
     * @param {string} EVENT_ID - The ID of the event to get the live schedule of.
     * @returns {Promise<JSON>} - A promise that resolves when the live schedule is retrieved.
     * Returns the information of the live schedule.
     * @throws {Error} - An error is thrown if the live schedule fails to retrieve.
     * @throws {Error} - An error is thrown if the API type is not admin.
     * @throws {Error} - An error is thrown if the event does not have a live schedule.
     * @throws {Error} - An error is thrown if the event does not exist.
     */
    async getLiveSchedule(EVENT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Getting Live Schedule of Event: ${EVENT_ID}`);

        try
        {
            const GET_LIVE_SCHEDULE_INFO = await _getLiveSchedule(this.token, 
                this.config.serviceApiUrl, EVENT_ID, this.debugMode);
            _printDatetime(`Live Schedule retrieved of Event: ${EVENT_ID}`);
            return GET_LIVE_SCHEDULE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live Schedule failed to retrieve of Event: ${EVENT_ID}`);
            throw error;
        }
    }
    
    /**
     * @function startLiveSchedule
     * @async
     * @description Starts the live schedule of an event.
     * @param {string} EVENT_ID - The ID of the event to start the live schedule of.
     * @returns {Promise<null>} - A promise that resolves when the live schedule is started.
     * @throws {Error} - An error is thrown if the live schedule fails to start.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async startLiveSchedule(EVENT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Starting Live Schedule of Event: ${EVENT_ID}`);

        try
        {
            await _startLiveSchedule(this.token, this.config.serviceApiUrl, EVENT_ID, 
                this.debugMode);
            _printDatetime(`Live Schedule started of Event: ${EVENT_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Live Schedule failed to start of Event: ${EVENT_ID}`);
            throw error;
        }
    }

    /**
     * @function stopLiveSchedule
     * @async
     * @description Stops the live schedule of an event.
     * @param {string} EVENT_ID - The ID of the event to stop the live schedule of.
     * @returns {Promise<null>} - A promise that resolves when the live schedule is stopped.
     * @throws {Error} - An error is thrown if the live schedule fails to stop.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async stopLiveSchedule(EVENT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        _printDatetime(`Stopping Live Schedule of Event: ${EVENT_ID}`);

        try
        {
            await _stopLiveSchedule(this.token, this.config.serviceApiUrl, EVENT_ID, 
                this.debugMode);
            _printDatetime(`Live Schedule stopped of Event: ${EVENT_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Live Schedule failed to stop of Event: ${EVENT_ID}`);
            throw error;
        }
    }


    // live channel functions
    /**
     * @function createLiveChannel
     * @async
     * @description Creates a live channel.
     * @param {string} NAME - The name of the live channel.
     * @param {string | null} THUMBNAIL_IMAGE_ID - The thumbnail image ID of the live channel.
     * @param {string | null} ARCHIVE_FOLDER_ASSET_ID - The archive folder asset ID of the live channel.
     * @param {boolean | null} ENABLE_HIGH_AVAILABILITY - Whether to enable high availability for the live
     * channel.
     * @param {boolean | null} ENABLE_LIVE_CLIPPING - Whether to enable live clipping for the live channel.
     * @param {boolean} IS_SECURE_OUTPUT - Whether the live channel is secure output.
     * @param {boolean} IS_OUTPUT_SCREENSHOTS - Whether the live channel outputs screenshots.
     * @param {string | null} TYPE - The type of the live channel. The types are External, IVS, Normal, and Realtime.
     * @param {string | null} EXTERNAL_SERVICE_API_URL - The external service API URL of the live channel.
     * Only required if the type is External.
     * @param {JSON | null} EXTERNAL_OUTPUT_PROFILES - The external output profiles of the live channel.
     * JSON format: [{ id: string, description: string },]
     * @param {Array<string> | null} SECURITY_GROUPS - The security groups of the live channel.
     * The security groups are: Content Manager, Everyone, and Guest.
     * @returns {Promise<JSON>} - A promise that resolves when the live channel is created.
     * Returns the information of the created live channel.
     * @throws {Error} - An error is thrown if the live channel fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createLiveChannel(NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID, 
        ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, IS_OUTPUT_SCREENSHOTS,
        TYPE, EXTERNAL_SERVICE_API_URL, EXTERNAL_OUTPUT_PROFILES, SECURITY_GROUPS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Creating Live Channel: ${NAME}`);

        try
        {
            const CREATE_LIVE_CHANNEL_INFO = await _createLiveChannel(this.token, 
                this.config.serviceApiUrl, NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID, 
                ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, 
                IS_OUTPUT_SCREENSHOTS, TYPE, EXTERNAL_SERVICE_API_URL, EXTERNAL_OUTPUT_PROFILES, 
                SECURITY_GROUPS, this.debugMode);
            _printDatetime(`Live Channel created: ${CREATE_LIVE_CHANNEL_INFO["id"]}`);
            return CREATE_LIVE_CHANNEL_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live Channel failed to create`);
            throw error;
        }
    }

    /**
     * @function deleteLiveChannel
     * @async
     * @description Deletes a live channel.
     * @param {string} LIVE_CHANNEL_ID - The ID of the live channel to delete.
     * @param {boolean} DELETE_LIVE_INPUTS - Whether to delete the live inputs.
     * @returns {Promise<void>} - A promise that resolves when the live channel is deleted.
     * @throws {Error} - An error is thrown if the live channel fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteLiveChannel(LIVE_CHANNEL_ID, DELETE_LIVE_INPUTS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Deleting Live Channel: ${LIVE_CHANNEL_ID}`);

        try
        {
            await _deleteLiveChannel(this.token, this.config.serviceApiUrl, LIVE_CHANNEL_ID, 
                DELETE_LIVE_INPUTS, this.debugMode);
            _printDatetime(`Live Channel deleted: ${LIVE_CHANNEL_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Live Channel failed to delete: ${LIVE_CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function getLiveChannel
     * @async
     * @description Gets a live channel.
     * @param {string} LIVE_CHANNEL_ID - The ID of the live channel to get.
     * @returns {Promise<JSON>} - A promise that resolves when the live channel is gotten.
     * Returns the information of the gotten live channel.
     * @throws {Error} - An error is thrown if the live channel fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getLiveChannel(LIVE_CHANNEL_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting Live Channel: ${LIVE_CHANNEL_ID}`);

        try
        {
            const GET_LIVE_CHANNEL_INFO = await _getLiveChannel(this.token, this.config.serviceApiUrl, 
                LIVE_CHANNEL_ID, this.debugMode);
            _printDatetime(`Live Channel gotten: ${LIVE_CHANNEL_ID}`);
            return GET_LIVE_CHANNEL_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live Channel failed to get: ${LIVE_CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function getLiveChannels
     * @async
     * @description Gets live channels.
     * @returns {Promise<JSON>} - A promise that resolves when the live channels are gotten.
     * Returns the information of the gotten live channels.
     * @throws {Error} - An error is thrown if the live channels fail to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async getLiveChannels()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Getting Live Channels`);

        try
        {
            const GET_LIVE_CHANNELS_INFO = await _getLiveChannels(this.token, 
                this.config.serviceApiUrl, this.debugMode);
            _printDatetime(`Live Channels gotten`);
            return GET_LIVE_CHANNELS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live Channels failed to get`);
            throw error;
        }
    }

    /**
     * @function liveChannelRefresh
     * @async
     * @description Refreshes live channels.
     * @returns {Promise<void>} - A promise that resolves when the live channels are refreshed.
     * @throws {Error} - An error is thrown if the live channels fail to refresh.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async liveChannelRefresh()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error ("This function is only available for admin API type.");
        }

        _printDatetime(`Refreshing Live Channels`);

        try
        {
            await _liveChannelRefresh(this.token, this.config.serviceApiUrl, this.debugMode);
            _printDatetime(`Live Channels refreshed`);
        }
        catch (error)
        {
            _printDatetime(`Live Channels failed to refresh`);
            throw error;
        }
    }

    /**
     * @function nextEvent
     * @async
     * @description Gets the next event of a live channel.
     * @param {string} LIVE_CHANNEL_ID - The ID of the live channel to get the next event of.
     * @returns {Promise<void>} - A promise that resolves when the next event is gotten.
     * @throws {Error} - An error is thrown if the next event fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async nextEvent(LIVE_CHANNEL_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin") 
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting Next Event of Live Channel: ${LIVE_CHANNEL_ID}`);

        try
        {
            const NEXT_EVENT_INFO = await _nextEvent(this.token, this.config.serviceApiUrl, 
                LIVE_CHANNEL_ID, this.debugMode);
            _printDatetime(`Next Event gotten of Live Channel: ${LIVE_CHANNEL_ID}`);
            return NEXT_EVENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Next Event failed to get of Live Channel: ${LIVE_CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function startLiveChannel
     * @async
     * @description Starts a live channel.
     * @param {string} LIVE_CHANNEL_ID - The ID of the live channel to start.
     * @returns {Promise<void>} - A promise that resolves when the live channel is started.
     * @throws {Error} - An error is thrown if the live channel fails to start.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async startLiveChannel(LIVE_CHANNEL_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Starting Live Channel: ${LIVE_CHANNEL_ID}`);

        try
        {
            await _startLiveChannel(this.token, this.config.serviceApiUrl, LIVE_CHANNEL_ID, 
                this.debugMode);
            _printDatetime(`Live Channel started: ${LIVE_CHANNEL_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Live Channel failed to start: ${LIVE_CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function startOutputTracking
     * @async
     * @description Starts output tracking for a live channel.
     * @param {string} LIVE_CHANNEL_ID - The ID of the live channel to start output tracking for.
     * @returns {Promise<null>} - A promise that resolves when the output tracking is started.
     * @throws {Error} - An error is thrown if the output tracking fails to start.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async startOutputTracking(LIVE_CHANNEL_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Starting Output Tracking for Live Channel: ${LIVE_CHANNEL_ID}`);

        try
        {
            await _startOutputTracking(this.token, this.config.serviceApiUrl, LIVE_CHANNEL_ID, 
                this.debugMode);
            _printDatetime(`Output Tracking started for Live Channel: ${LIVE_CHANNEL_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Output Tracking failed to start for Live Channel: ${LIVE_CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function stopLiveChannel
     * @async
     * @description Stops a live channel.
     * @param {string} LIVE_CHANNEL_ID - The ID of the live channel to stop.
     * @returns {Promise<void>} - A promise that resolves when the live channel is stopped.
     * @throws {Error} - An error is thrown if the live channel fails to stop.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async stopLiveChannel(LIVE_CHANNEL_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        if (this.debugMode)
        {
            console.log(`Stopping Live Channel: ${LIVE_CHANNEL_ID}`);
        }

        try
        {
            await _stopLiveChannel(this.token, this.config.serviceApiUrl, LIVE_CHANNEL_ID, 
                this.debugMode);
            _printDatetime(`Live Channel stopped: ${LIVE_CHANNEL_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Live Channel failed to stop: ${LIVE_CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function updateLiveChannel
     * @async
     * @description Updates a live channel.
     * @param {string} LIVE_CHANNEL_ID - The ID of the live channel to update.
     * @param {string | null} NAME - The name of the live channel.
     * @param {string | null} THUMBNAIL_IMAGE_ID - The thumbnail image ID of the live channel.
     * @param {string | null} ARCHIVE_FOLDER_ASSET_ID - The archive folder asset ID of the live channel.
     * @param {boolean | null} ENABLE_HIGH_AVAILABILITY - Whether to enable high availability for the live
     * channel.
     * @param {boolean | null} ENABLE_LIVE_CLIPPING - Whether to enable live clipping for the live channel.
     * @param {boolean | null} IS_SECURE_OUTPUT - Whether the live channel is secure output.
     * @param {boolean} IS_OUTPUT_SCREENSHOTS - Whether the live channel outputs screenshots.
     * @param {string | null} TYPE - The type of the live channel. The types are External, IVS, Normal, and Realtime.
     * @param {string | null} EXTERNAL_SERVICE_API_URL - The external service API URL of the live channel.
     * Only required for the External type.
     * @param {Array<JSON> | null} EXTERNAL_OUTPUT_PROFILES - The external output profiles of the live channel.
     * JSON format: [{ id: string, description: string },]
     * @param {Array<string> | null} SECURITY_GROUPS - The security groups of the live channel.
     * The security groups are: Content Manager, Everyone,and Guest.
     * @returns {Promise<JSON>} - A promise that resolves when the live channel is created.
     * Returns the information of the created live channel.
     * @throws {Error} - An error is thrown if the live channel fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async updateLiveChannel(LIVE_CHANNEL_ID, NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID, 
        ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, IS_OUTPUT_SCREENSHOTS, TYPE, 
        EXTERNAL_SERVICE_API_URL, EXTERNAL_OUTPUT_PROFILES, SECURITY_GROUPS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Updating Live Channel: ${LIVE_CHANNEL_ID}`);

        try
        {
            const UPDATE_LIVE_CHANNEL_INFO = await _updateLiveChannel(this.token, 
                this.config.serviceApiUrl, LIVE_CHANNEL_ID, NAME, THUMBNAIL_IMAGE_ID, 
                ARCHIVE_FOLDER_ASSET_ID, ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, 
                IS_OUTPUT_SCREENSHOTS, TYPE, EXTERNAL_SERVICE_API_URL, EXTERNAL_OUTPUT_PROFILES,
                SECURITY_GROUPS, this.debugMode);
            _printDatetime(`Live Channel updated: ${LIVE_CHANNEL_ID}`);
            return UPDATE_LIVE_CHANNEL_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live Channel failed to update`);
            throw error;
        }
    }

    // live input functions
    /**
     * @function createLiveInput
     * @async
     * @description Creates a live input.
     * @param {string} NAME - The name of the live input.
     * @param {string | null} SOURCE - The source of the live input.
     * @param {string} TYPE - The type of the live input. The types are RTMP_PULL, RTMP_PUSH, RTP_PUSH, UDP_PUSH, 
     * and URL_PULL.
     * @param {boolean | null} IS_STANDARD - Whether the live input is standard.
     * @param {string | null} VIDEO_ASSET_ID - The video asset id of the live input.
     * @param {Array<JSON> | null} DESTINATIONS - The destinations of the live input. Sources must be 
     * URLs and are only valid for input types: RTMP_PUSH, URL_PULL, MP4_FILE.
     * JSON format: {"ip": "string | null", "port": "string | null", "url": "string | null"}
     * @param {Array<JSON> | null} SOURCES - The sources of the live input. Sources must be URLs and are
     * only valid for input types: RTMP_PULL
     * JSON format: {"ip": "string | null", "port": "string | null", "url": "string | null"}
     * @returns {Promise<JSON>} - A promise that resolves when the live input is created.
     * Returns the information of the created live input.
     * @throws {Error} - An error is thrown if the live input fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin. 
     */ 
    async createLiveInput(NAME, SOURCE, TYPE, IS_STANDARD, VIDEO_ASSET_ID, DESTINATIONS, SOURCES)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Creating Live Input: ${NAME}`);

        try
        {
            const CREATE_LIVE_INPUT_INFO = await _createLiveInput(this.token, 
                this.config.serviceApiUrl, NAME, SOURCE, TYPE, IS_STANDARD, VIDEO_ASSET_ID, 
                DESTINATIONS, SOURCES, this.debugMode);
            _printDatetime(`Live Input created: ${CREATE_LIVE_INPUT_INFO["id"]}`);
            return CREATE_LIVE_INPUT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live Input failed to create`);
            throw error;
        }
    }

    /**
     * @function deleteLiveInput
     * @async
     * @description Deletes a live input.
     * @param {string} LIVE_INPUT_ID - The ID of the live input to delete.
     * @returns {Promise<void>} - A promise that resolves when the live input is deleted.
     * @throws {Error} - An error is thrown if the live input fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async deleteLiveInput(LIVE_INPUT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting Live Input: ${LIVE_INPUT_ID}`);

        try
        {
            await _deleteLiveInput(this.token, this.config.serviceApiUrl, LIVE_INPUT_ID, 
                this.debugMode);
            _printDatetime(`Live Input deleted: ${LIVE_INPUT_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Live Input failed to delete: ${LIVE_INPUT_ID}`);
            throw error;
        }
    }

    /**
     * @function getLiveInput
     * @async
     * @description Gets a live input.
     * @param {string} LIVE_INPUT_ID - The ID of the live input to get.
     * @returns {Promise<JSON>} - A promise that resolves when the live input is gotten.
     * Returns the information of the gotten live input.
     * @throws {Error} - An error is thrown if the live input fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async getLiveInput(LIVE_INPUT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting Live Input: ${LIVE_INPUT_ID}`);

        try
        {
            const GET_LIVE_INPUT_INFO = await _getLiveInput(this.token, this.config.serviceApiUrl, 
                LIVE_INPUT_ID, this.debugMode);
            _printDatetime(`Live Input gotten: ${LIVE_INPUT_ID}`);
            return GET_LIVE_INPUT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live Input failed to get: ${LIVE_INPUT_ID}`);
            throw error;
        }
    }

    /**
     * @function getLiveInputs
     * @async
     * @description Gets live inputs.
     * @returns {Promise<JSON>} - A promise that resolves when the live inputs are gotten.
     * Returns the information of the gotten live inputs.
     * @throws {Error} - An error is thrown if the live inputs fail to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getLiveInputs()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting Live Inputs`);

        try
        {
            const GET_LIVE_INPUTS_INFO = await _getLiveInputs(this.token, this.config.serviceApiUrl, 
                this.debugMode);
            _printDatetime(`Live Inputs gotten`);
            return GET_LIVE_INPUTS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live Inputs failed to get`);
            throw error;
        }
    }

    /**
     * @function updateLiveInput
     * @async
     * @description Updates a live input.
     * @param {string} LIVE_INPUT_ID - The ID of the live input to update.
     * @param {string | null} NAME - The name of the live input.
     * @param {string | null} SOURCE - The source of the live input.
     * @param {string | null} TYPE - The type of the live input. The types are RTMP_PULL, RTMP_PUSH, RTP_PUSH, UDP_PUSH, 
     * and URL_PULL.
     * @param {boolean | null} IS_STANDARD - Whether the live input is standard.
     * @param {string | null} VIDEO_ASSET_ID - The video asset id of the live input.
     * @param {Array<JSON>| null} DESTINATIONS - The destinations of the live input. Sources must be 
     * URLs and are only valid for input types: RTMP_PUSH, URL_PULL, MP4_FILE.
     * JSON format: {"ip": "string | null", "port": "string | null", "url": "string | null"}
     * @param {Array<JSON> | null} SOURCES - The sources of the live input. Sources must be URLs and are
     * only valid for input types: RTMP_PULL.
     * JSON format: {"ip": "string | null", "port": "string | null", "url": "string | null"}
     * @returns {Promise<JSON>} - A promise that resolves when the live input is created.
     * Returns the information of the created live input.
     * @throws {Error} - An error is thrown if the live input fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin. 
     */ 
    async updateLiveInput(LIVE_INPUT_ID, NAME, SOURCE, TYPE, IS_STANDARD, VIDEO_ASSET_ID, 
        DESTINATIONS, SOURCES)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Updating Live Input: ${LIVE_INPUT_ID}`);

        try
        {
            const UPDATE_LIVE_INPUT_INFO = await _updateLiveInput(this.token, 
                this.config.serviceApiUrl, LIVE_INPUT_ID, NAME, SOURCE, TYPE, IS_STANDARD, 
                VIDEO_ASSET_ID, DESTINATIONS, SOURCES, this.debugMode);
            _printDatetime(`Live Input updated: ${LIVE_INPUT_ID}`);
            return UPDATE_LIVE_INPUT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live Input failed to update`);
            throw error;
        }
    }

    // live operator functions
    /**
     * @function cancelBroadcast
     * @async
     * @description Cancels a broadcast.
     * @param {string} LIVE_OPERATOR_ID - The ID of the live operator.
     * @returns {Promise<void>} - A promise that resolves when the broadcast is cancelled.
     * @throws {Error} - An error is thrown if the broadcast fails to cancel.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async cancelBroadcast(LIVE_OPERATOR_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Cancelling broadcast: ${LIVE_OPERATOR_ID}`);

        try
        {
            await _cancelBroadcast(this.token, this.config.serviceApiUrl, LIVE_OPERATOR_ID, 
                this.debugMode);
            _printDatetime(`Broadcast cancelled: ${LIVE_OPERATOR_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Broadcast failed to cancel: ${LIVE_OPERATOR_ID}`);
            throw error;
        }
    }

    /**
     * @function cancelSegment
     * @async
     * @description Cancels a segment.
     * @param {string} LIVE_OPERATOR_ID - The ID of the live operator.
     * @returns {Promise<void>} - A promise that resolves when the segment is cancelled.
     * @throws {Error} - An error is thrown if the segment fails to cancel.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async cancelSegment(LIVE_OPERATOR_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Cancelling segment: ${LIVE_OPERATOR_ID}`);

        try
        {
            const CANCEL_SEGMENT_INFO = await _cancelSegment(this.token, this.config.serviceApiUrl,
                LIVE_OPERATOR_ID, this.debugMode);
            _printDatetime(`Segment cancelled: ${LIVE_OPERATOR_ID}`);
            return CANCEL_SEGMENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Segment failed to cancel: ${LIVE_OPERATOR_ID}`);
            throw error;
        }
    }

    /**
     * @function completeSegment
     * @async
     * @description Completes a segment.
     * @param {string} LIVE_OPERATOR_ID - The ID of the live operator.
     * @param {Array<string> | null} RELATED_CONTENT_IDS - The related content IDs of the segment.
     * @param {Array<string> | null} TAG_IDS - The tag IDs of the segment.
     * @returns {Promise<void>} - A promise that resolves when the segment is completed.
     * @throws {Error} - An error is thrown if the segment fails to complete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async completeSegment(LIVE_OPERATOR_ID, RELATED_CONTENT_IDS, TAG_IDS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Completing segment: ${LIVE_OPERATOR_ID}`);

        try
        {
            await _completeSegment(this.token, this.config.serviceApiUrl, LIVE_OPERATOR_ID, RELATED_CONTENT_IDS, 
                TAG_IDS, this.debugMode);
            _printDatetime(`Segment completed: ${LIVE_OPERATOR_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Segment failed to complete: ${LIVE_OPERATOR_ID}`);
            throw error;
        }
    }

    /**
     * @function getCompletedSegments
     * @async
     * @description Gets completed segments for given id.
     * @param {string} LIVE_OPERATOR_ID - The ID of the live operator.
     * @returns {Promise<JSON>} - A promise that resolves when the completed segments are gotten.
     * Returns the information of the gotten completed segments.
     * @throws {Error} - An error is thrown if the completed segments fail to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async getCompletedSegments(LIVE_OPERATOR_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting completed segments`);

        try
        {
            const GET_COMPLETED_SEGMENTS_INFO = await _getCompletedSegments(this.token,
                this.config.serviceApiUrl, LIVE_OPERATOR_ID, this.debugMode);
            _printDatetime(`Completed segments gotten`);
            return GET_COMPLETED_SEGMENTS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Completed segments failed to get`);
            throw error;
        }
    }

    /**
     * @function getLiveOperator
     * @async
     * @description Gets a live operator.
     * @param {string} LIVE_OPERATOR_ID - The ID of the live operator.
     * @returns {Promise<JSON>} - A promise that resolves when the live operator is gotten.
     * Returns the information of the gotten live operator.
     * @throws {Error} - An error is thrown if the live operator fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async getLiveOperator(LIVE_OPERATOR_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting live operator: ${LIVE_OPERATOR_ID}`);

        try
        {
            const GET_LIVE_OPERATOR_INFO = await _getLiveOperator(this.token, 
                this.config.serviceApiUrl, LIVE_OPERATOR_ID, this.debugMode);
            _printDatetime(`Live operator gotten: ${LIVE_OPERATOR_ID}`);
            return GET_LIVE_OPERATOR_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live operator failed to get: ${LIVE_OPERATOR_ID}`);
            throw error;
        }
    }

    /**
     * @function getLiveOperators
     * @async
     * @description Gets live operators.
     * @returns {Promise<JSON>} - A promise that resolves when the live operators are gotten.
     * Returns the information of the gotten live operators.
     * @throws {Error} - An error is thrown if the live operators fail to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async getLiveOperators()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting live operators`);

        try
        {
            const GET_LIVE_OPERATORS_INFO = await _getLiveOperators(this.token, 
                this.config.serviceApiUrl, this.debugMode);
            _printDatetime(`Live operators gotten`);
            return GET_LIVE_OPERATORS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Live operators failed to get`);
            throw error;
        }
    }

    /**
     * @function startBroadcast
     * @async
     * @description Starts a broadcast.
     * @param {string} LIVE_OPERATOR_ID - The ID of the live operator.
     * @param {string | null} PREROLL_ASSET_ID - The preroll asset ID of the live operator.
     * @param {string | null} POSTROLL_ASSET_ID - The postroll asset ID of the live operator.
     * @param {string | null} LIVE_INPUT_ID - The live input ID of the live operator.
     * @param {Array<string> | null} RELATED_CONTENT_IDS - The related content IDs of the live operator.
     * @param {Array<string> | null} TAG_IDS - The tag IDs of the live operator.
     * @returns {Promise<void>} - A promise that resolves when the status of the live operator is
     * gotten.
     * @throws {Error} - An error is thrown if the status of the live operator fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async startBroadcast(LIVE_OPERATOR_ID, PREROLL_ASSET_ID, POSTROLL_ASSET_ID, LIVE_INPUT_ID, 
        RELATED_CONTENT_IDS, TAG_IDS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Starting broadcast`);

        try
        {
            await _startBroadcast(this.token, this.config.serviceApiUrl, LIVE_OPERATOR_ID, 
                PREROLL_ASSET_ID, POSTROLL_ASSET_ID, LIVE_INPUT_ID, RELATED_CONTENT_IDS, TAG_IDS, 
                this.debugMode);
            _printDatetime(`Broadcast started`);
        }
        catch (error)
        {
            _printDatetime(`Broadcast failed to start`);
            throw error;
        }
    }

    /**
     * @function startSegment
     * @async
     * @description Starts a segment.
     * @param {string} LIVE_OPERATOR_ID - The ID of the live operator.
     * @returns {Promise<void>} - A promise that resolves when the segment is started.
     * @throws {Error} - An error is thrown if the segment fails to start.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async startSegment(LIVE_OPERATOR_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Starting segment: ${LIVE_OPERATOR_ID}`);

        try
        {
            await _startSegment(this.token, this.config.serviceApiUrl, LIVE_OPERATOR_ID,
                this.debugMode);
            _printDatetime(`Segment started: ${LIVE_OPERATOR_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Segment failed to start: ${LIVE_OPERATOR_ID}`);
            throw error;
        }
    }

    /**
     * @function stopBroadcast
     * @async
     * @description Stops a broadcast.
     * @param {string} LIVE_OPERATOR_ID - The ID of the live operator.
     * @returns {Promise<void>} - A promise that resolves when the broadcast is stopped.
     * @throws {Error} - An error is thrown if the broadcast fails to stop.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async stopBroadcast(LIVE_OPERATOR_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Stopping broadcast`);

        try
        {
            await _stopBroadcast(this.token, this.config.serviceApiUrl, LIVE_OPERATOR_ID, 
                this.debugMode);
            _printDatetime(`Broadcast stopped`);
        }
        catch (error)
        {
            _printDatetime(`Broadcast failed to stop`);
            throw error;
        }
    }

    // schedule event functions
    /**
     * @function addAssetScheduleEvent
     * @async
     * @description Adds an asset schedule event.
     * @param {string} CHANNEL_ID - The channel ID of the schedule event.
     * @param {JSON} ASSET - The asset of the schedule event.
     * JSON format: {"id": "string", "name": "string"}
     * @param {boolean} IS_LOOP - Whether the schedule event is loop.
     * @param {string | null} DURATION_TIME_CODE - The duration time code of the schedule event.
     * Please use the following format: hh:mm:ss;ff. Set to null if IS_LOOP is true.
     * @param {string | null} PREVIOUS_ID - The previous ID of the schedule event.
     * @returns {Promise<JSON>} - A promise that resolves when the asset schedule event is added.
     * Returns the information of the added asset schedule event.
     * @throws {Error} - An error is thrown if the asset schedule event fails to add.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async addAssetScheduleEvent(CHANNEL_ID, ASSET, IS_LOOP, DURATION_TIME_CODE, 
        PREVIOUS_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Adding asset schedule event to channel: ${CHANNEL_ID}`);

        try
        {
            const ADD_ASSET_SCHEDULE_EVENT_INFO = await _addAssetScheduleEvent(this.token, 
                this.config.serviceApiUrl, CHANNEL_ID, ASSET, IS_LOOP, 
                DURATION_TIME_CODE, PREVIOUS_ID, this.debugMode);
            _printDatetime(`Asset schedule event added to channel: ${CHANNEL_ID}`);
            return ADD_ASSET_SCHEDULE_EVENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Asset schedule event failed to add to channel: ${CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function addInputScheduleEvent
     * @async
     * @description Adds an input schedule event.
     * @param {string} CHANNEL_ID - The channel ID of the schedule event.
     * @param {JSON} INPUT - The input of the schedule event.
     * JSON format: {"id": "string", "name": "string"}
     * @param {JSON | null} BACKUP_INPUT - The backup input of the schedule event.
     * JSON format: {"id": "string", "name": "string"}
     * @param {string | null} FIXED_ON_AIR_TIME_UTC - The fixed on air time UTC of the schedule event.
     * Please use the following format: hh:mm:ss.
     * @param {string | null} PREVIOUS_ID - The previous ID of the schedule event.
     * @returns {Promise<JSON>} - A promise that resolves when the input schedule event is added.
     * Returns the information of the added input schedule event.
     * @throws {Error} - An error is thrown if the input schedule event fails to add.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async addInputScheduleEvent(CHANNEL_ID, INPUT, BACKUP_INPUT, FIXED_ON_AIR_TIME_UTC, 
        PREVIOUS_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Adding input schedule event to channel ${CHANNEL_ID}`);

        try
        {
            const ADD_INPUT_SCHEDULE_EVENT_INFO = await _addInputScheduleEvent(this.token, 
                this.config.serviceApiUrl, CHANNEL_ID, INPUT, BACKUP_INPUT, 
                FIXED_ON_AIR_TIME_UTC, PREVIOUS_ID, this.debugMode);
            _printDatetime(`Input schedule event added to channel ${CHANNEL_ID}`);
            return ADD_INPUT_SCHEDULE_EVENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Input schedule event failed to add to channel ${CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function getAssetScheduleEvent
     * @async
     * @description Gets an asset schedule event.
     * @param {string} CHANNEL_ID - The channel ID of the schedule event.
     * @param {string} SCHEDULE_EVENT_ID - The schedule event ID of the schedule event.
     * @returns {Promise<JSON>} - A promise that resolves when the asset schedule event is gotten.
     * Returns the information of the gotten asset schedule event.
     * @throws {Error} - An error is thrown if the asset schedule event fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getAssetScheduleEvent(CHANNEL_ID, SCHEDULE_EVENT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Getting asset schedule event: ${CHANNEL_ID}`);
        
        try
        {
            const GET_ASSET_SCHEDULE_EVENT_INFO = await _getAssetScheduleEvent(this.token, 
                this.config.serviceApiUrl, CHANNEL_ID, SCHEDULE_EVENT_ID, this.debugMode);
            _printDatetime(`Asset schedule event gotten: ${CHANNEL_ID}`);
            return GET_ASSET_SCHEDULE_EVENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Asset schedule event failed to get: ${CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function getInputScheduleEvent
     * @async
     * @description Gets an input schedule event.
     * @param {string} CHANNEL_ID - The channel ID of the schedule event.
     * @param {string} SCHEDULE_EVENT_ID - The schedule event ID of the schedule event.
     * @returns {Promise<JSON>} - A promise that resolves when the asset schedule event is gotten.
     * Returns the information of the gotten asset schedule event.
     * @throws {Error} - An error is thrown if the asset schedule event fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getInputScheduleEvent(CHANNEL_ID, SCHEDULE_EVENT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Getting asset schedule event: ${CHANNEL_ID}`);
        
        try
        {
            const GET_INPUT_SCHEDULE_EVENT_INFO = await _getInputScheduleEvent(this.token, 
                this.config.serviceApiUrl, CHANNEL_ID, SCHEDULE_EVENT_ID, this.debugMode);
            _printDatetime(`Asset schedule event gotten: ${CHANNEL_ID}`);
            return GET_INPUT_SCHEDULE_EVENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Input schedule event failed to get: ${CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function moveScheduleEvent
     * @async
     * @description Moves a schedule event.
     * @param {string} CHANNEL_ID - The channel ID of the schedule event.
     * @param {string} SCHEDULE_EVENT_ID - The schedule event ID of the schedule event.
     * @param {string} PREVIOUS_SCHEDULE_EVENT_ID - The previous schedule event ID of the schedule event.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule event is moved.
     * Returns the information of the moved schedule event.
     * @throws {Error} - An error is thrown if the schedule event fails to move.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async moveScheduleEvent(CHANNEL_ID, SCHEDULE_EVENT_ID, PREVIOUS_SCHEDULE_EVENT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Moving schedule event: ${CHANNEL_ID}`);
        
        try
        {
            const MOVE_SCHEDULE_EVENT_INFO = await _moveScheduleEvent(this.token, 
                this.config.serviceApiUrl, CHANNEL_ID, SCHEDULE_EVENT_ID, 
                PREVIOUS_SCHEDULE_EVENT_ID, this.debugMode);
            _printDatetime(`Schedule event moved: ${CHANNEL_ID}`);
            return MOVE_SCHEDULE_EVENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule event failed to move: ${CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function removeAssetScheduleEvent
     * @async
     * @description Removes an asset schedule event.
     * @param {string} CHANNEL_ID - The channel ID of the schedule event.
     * @param {string} SCHEDULE_EVENT_ID - The schedule event ID of the schedule event.
     * @returns {Promise<void>} - A promise that resolves when the asset schedule event is removed.
     * @throws {Error} - An error is thrown if the asset schedule event fails to remove.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async removeAssetScheduleEvent(CHANNEL_ID, SCHEDULE_EVENT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Removing asset schedule event: ${CHANNEL_ID}`);

        try
        {
            await _removeAssetScheduleEvent(this.token, 
                this.config.serviceApiUrl, CHANNEL_ID, SCHEDULE_EVENT_ID, this.debugMode);
            _printDatetime(`Asset schedule event removed: ${CHANNEL_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Asset schedule event failed to remove: ${CHANNEL_ID}`);
            throw error;
        }
    }

    /**
     * @function removeInputScheduleEvent
     * @async
     * @description Removes an input schedule event.
     * @param {string} CHANNEL_ID - The channel ID of the schedule event.
     * @param {string} INPUT_ID - The input ID of the schedule event.
     * @returns {Promise<void>} - A promise that resolves when the input schedule event is removed.
     * @throws {Error} - An error is thrown if the input schedule event fails to remove.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async removeInputScheduleEvent(CHANNEL_ID, INPUT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Removing input schedule event`);

        try
        {
            await _removeInputScheduleEvent(this.token, 
                this.config.serviceApiUrl, CHANNEL_ID, INPUT_ID, this.debugMode);
            _printDatetime(`Input schedule event removed`);
        }
        catch (error)
        {
            _printDatetime(`Input schedule event failed to remove`);
            throw error;
        }
    }

    /**
     * @function updateAssetScheduleEvent
     * @async
     * @description Adds an asset schedule event.
     * @param {string} ID - The ID of the schedule event.
     * @param {string} CHANNEL_ID - The channel ID of the schedule event.
     * @param {JSON} ASSET - The asset of the schedule event.
     * JSON format: {"id": "string", "name": "string"}
     * @param {boolean} IS_LOOP - Whether the schedule event is loop.
     * @param {string | null} DURATION_TIME_CODE - The duration time code of the schedule event.
     * Please use the following format: hh:mm:ss;ff. Set to null if IS_LOOP is true.
     * @returns {Promise<JSON>} - A promise that resolves when the asset schedule event is added.
     * Returns the information of the added asset schedule event.
     * @throws {Error} - An error is thrown if the asset schedule event fails to add.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */ 
    async updateAssetScheduleEvent(ID, CHANNEL_ID, ASSET, IS_LOOP, DURATION_TIME_CODE, 
        PREVIOUS_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Updating asset schedule event: ${ID}`);

        try
        {
            const ADD_ASSET_SCHEDULE_EVENT_INFO = await _updateAssetScheduleEvent(this.token, 
                this.config.serviceApiUrl, ID, CHANNEL_ID, ASSET, IS_LOOP, 
                DURATION_TIME_CODE, PREVIOUS_ID, this.debugMode);
            _printDatetime(`Asset schedule event updated: ${ID}`);
            return ADD_ASSET_SCHEDULE_EVENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Asset schedule event failed to update: ${ID}`);
            throw error;
        }
    }

    /**
     * @function updateInputScheduleEvent
        * @async
        * @description Adds an input schedule event.
        * @param {string} ID - The ID of the Input schedule event.
        * @param {string} CHANNEL_ID - The channel ID of the schedule event.
        * @param {JSON} INPUT - The input of the schedule event.
        * JSON format: {"id": "string", "name": "string"}
        * @param {JSON | null} BACKUP_INPUT - The backup input of the schedule event.
        * JSON format: {"id": "string", "name": "string"}
        * @param {string | null} FIXED_ON_AIR_TIME_UTC - The fixed on air time UTC of the schedule event.
        * Please use the following format: hh:mm:ss.
        * @returns {Promise<JSON>} - A promise that resolves when the input schedule event is added.
        * Returns the information of the added input schedule event.
        * @throws {Error} - An error is thrown if the input schedule event fails to add.
        * @throws {Error} - An error is thrown if the API type is not admin.
        */ 
    async updateInputScheduleEvent(ID, CHANNEL_ID, INPUT, BACKUP_INPUT, FIXED_ON_AIR_TIME_UTC, 
        PREVIOUS_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Updating input schedule event`);

        try
        {
            const ADD_INPUT_SCHEDULE_EVENT_INFO = await _updateInputScheduleEvent(this.token, 
                this.config.serviceApiUrl, ID, CHANNEL_ID, INPUT, BACKUP_INPUT, 
                FIXED_ON_AIR_TIME_UTC, PREVIOUS_ID, this.debugMode);
            _printDatetime(`Input schedule event updated`);
            return ADD_INPUT_SCHEDULE_EVENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Input schedule event failed to update`);
            throw error;
        }
    }

    // schedule functions
    /**
     * @function createIntelligentPlaylist
     * @async
     * @description Creates an intelligent playlist.
     * @param {Array<JSON> | null} COLLECTIONS - The collections of the intelligent playlist.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} END_SEARCH_DATE - The end search date of the intelligent playlist.
     * Only use when SEARCH_FILTER_TYPE = 2.
     * Please use the following format: yyyy-MM-dd.THH:MM:SS.FFFZ.
     * @param {integer} END_SEARCH_DURATION_IN_MINUTES - The end search duration in minutes of the
     * intelligent playlist.
     * @param {string} NAME - The name of the intelligent playlist.
     * @param {Array<JSON> | null} RELATED_CONTENTS - The related content of the intelligent playlist.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} SEARCH_DATE - The search date of the intelligent playlist.
     * Only use when SEARCH_FILTER_TYPE = 2.
     * Please use the following format: yyyy-MM-dd.THH:MM:SS.FFFZ.
     * @param {integer} SEARCH_DURATION_IN_MINUTES - The search duration in minutes of the
     * intelligent playlist.
     * @param {integer} SEARCH_FILTER_TYPE - The search filter type of the intelligent playlist.
     * Values: Random: 1, Random within a Date Range: 2, Newest: 3, Newest Not Played: 4
     * @param {Array<JSON>} TAGS - The tags of the intelligent playlist.
     * JSON format: {"id": "string", "description": "string"}
     * @param {JSON | null} THUMBNAIL_ASSET - The thumbnail asset of the intelligent playlist.
     * JSON format: {"id": "string", "description": "string"}
     * @returns {Promise<JSON>} - A promise that resolves when the intelligent playlist is created.
     * Returns the information of the created intelligent playlist.
     * @throws {Error} - An error is thrown if the intelligent playlist fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createIntelligentPlaylist(COLLECTIONS, END_SEARCH_DATE, END_SEARCH_DURATION_IN_MINUTES,
        NAME, RELATED_CONTENTS, SEARCH_DATE, SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS,
        THUMBNAIL_ASSET)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        if (COLLECTIONS === null) COLLECTIONS = [];
        if (RELATED_CONTENTS === null) RELATED_CONTENTS = [];
        if (TAGS === null) TAGS = [];

        _printDatetime(`Creating intelligent playlist`);

        try
        {
            const CREATE_INTELLIGENT_PLAYLIST_INFO = await _createIntelligentPlaylist(this.token, 
                this.config.serviceApiUrl, COLLECTIONS, END_SEARCH_DATE, END_SEARCH_DURATION_IN_MINUTES,
                NAME, RELATED_CONTENTS, SEARCH_DATE, SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS,
                THUMBNAIL_ASSET, this.debugMode);
            _printDatetime(`Intelligent playlist created`);
            return CREATE_INTELLIGENT_PLAYLIST_INFO;
        }
        catch (error)
        {
            _printDatetime(`Intelligent playlist failed to create`);
            throw error;
        }
    }

    /**
     * @function createIntelligentSchedule
     * @async
     * @description Creates an intelligent schedule.
     * @param {JSON} DEFAULT_VIDEO_ASSET - The default video asset of the intelligent schedule.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string} NAME - The name of the intelligent schedule.
     * @param {JSON | null} THUMBNAIL_ASSET - The thumbnail asset of the intelligent schedule.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string} TIME_ZONE_ID - The time zone ID of the intelligent schedule.
     * @returns {Promise<JSON>} - A promise that resolves when the intelligent schedule is created.
     * Returns the information of the created intelligent schedule.
     * @throws {Error} - An error is thrown if the intelligent schedule fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createIntelligentSchedule(DEFAULT_VIDEO_ASSET, NAME, THUMBNAIL_ASSET, TIME_ZONE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Creating intelligent schedule`);

        try
        {
            const CREATE_INTELLIGENT_SCHEDULE_INFO = await _createIntelligentSchedule(this.token, 
                this.config.serviceApiUrl, DEFAULT_VIDEO_ASSET, NAME, THUMBNAIL_ASSET, TIME_ZONE_ID,
                this.debugMode);
            _printDatetime(`Intelligent schedule created`);
            return CREATE_INTELLIGENT_SCHEDULE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Intelligent schedule failed to create`);
            throw error;
        }
    }

    /**
     * @function createPlaylist
     * @async
     * @description Creates a playlist..
     * @param {string} NAME - The name of the playlist.
     * @param {JSON | null} THUMBNAIL_ASSET - The thumbnail asset of the playlist.
     * JSON format: {"id": "string", "description": "string"}
     * @param {boolean} LOOP_PLAYLIST - Whether the playlist is looped
     * @param {JSON | null} DEFAULT_VIDEO_ASSET - The default video asset of the playlist.
     * JSON format: {"id": "string"}
     * Only needed if LOOP_PLAYLIST is false.
     * @returns {Promise<JSON>} - A promise that resolves when the playlist is created.
     * Returns the information of the created playlist.
     * @throws {Error} - An error is thrown if the playlist fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createPlaylist(NAME, THUMBNAIL_ASSET, LOOP_PLAYLIST, DEFAULT_VIDEO_ASSET)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Creating playlist`);

        try
        {
            const CREATE_PLAYLIST_INFO = await _createPlaylist(this.token, 
                this.config.serviceApiUrl, NAME, THUMBNAIL_ASSET, LOOP_PLAYLIST, 
                DEFAULT_VIDEO_ASSET, this.debugMode);
            _printDatetime(`Playlist created`);
            return CREATE_PLAYLIST_INFO;
        }
        catch (error)
        {
            _printDatetime(`Playlist failed to create`);
            throw error;
        }
    }

    /**
     * @function createPlaylistVideo
     * @async
     * @description Creates a playlist video.
     * @param {string} PLAYLIST_ID - The ID of the playlist.
     * @param {JSON} VIDEO_ASSET - The video asset of the playlist video.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} PREVIOUS_ITEM - The previous item of the playlist video.
     * @returns {Promise<JSON>} - A promise that resolves when the playlist video is created.
     * Returns the information of the created playlist video.
     * @throws {Error} - An error is thrown if the playlist video fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createPlaylistVideo(PLAYLIST_ID, VIDEO_ASSET, PREVIOUS_ITEM)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Creating playlist video`);

        try
        {
            const CREATE_PLAYLIST_VIDEO_INFO = await _createPlaylistVideo(this.token, 
                this.config.serviceApiUrl, PLAYLIST_ID, VIDEO_ASSET, PREVIOUS_ITEM, this.debugMode);
            _printDatetime(`Playlist video created`);
            return CREATE_PLAYLIST_VIDEO_INFO;
        }
        catch (error)
        {
            _printDatetime(`Playlist video failed to create`);
            throw error;
        }
    }

    /**
     * @function createScheduleItemAsset
     * @async
     * @description Creates a schedule item asset.
     * @param {string} SCHEDULE_ID - The id of the schedule the asset item is to be added to.
     * @param {JSON} ASSET - The asset of the schedule item asset.
     * JSON format: {"id": "string"}
     * @param {Array<JSON>} DAYS - The days of the schedule item asset.
     * JSON format: {"id": "string"}
     * @param {string} DURATION_TIME_CODE - The duration time between TIME_CODE and
     * END_TIME_CODE.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string} END_TIME_CODE - The end time code of the schedule item asset.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string | null} PREVIOUS_ITEM - The previous item of the schedule item asset.
     * @param {string} TIME_CODE - The time code of the schedule item asset.
     * Please use the following format: hh:mm:ss;ff.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule item asset is created.
     * Returns the information of the created schedule item asset.
     * @throws {Error} - An error is thrown if the schedule item asset fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createScheduleItemAsset(SCHEDULE_ID, ASSET, DAYS, DURATION_TIME_CODE, END_TIME_CODE,
        PREVIOUS_ITEM, TIME_CODE)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Creating schedule item asset`);

        try
        {
            const CREATE_SCHEDULE_ITEM_ASSET_INFO = await _createScheduleItemAsset(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, ASSET, DAYS, DURATION_TIME_CODE, END_TIME_CODE,
                PREVIOUS_ITEM, TIME_CODE, this.debugMode);
            _printDatetime(`Schedule item asset created`);
            return CREATE_SCHEDULE_ITEM_ASSET_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item asset failed to create`);
            throw error;
        }
    } 

    /**
     * @function createScheduleItemLiveChannel
     * @async
     * @description Creates a schedule item live channel.
     * @param {string} SCHEDULE_ID - The id of the schedule the live channel item is to 
     * be added to.
     * @param {Array<JSON>} DAYS - The days of the schedule item live channel.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string} DURATION_TIME_CODE - The duration time between TIME_CODE and
     * END_TIME_CODE.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string} END_TIME_CODE - The end time code of the schedule item live channel.
     * Please use the following format: hh:mm:ss;ff.
     * @param {JSON} LIVE_CHANNEL - The live channel of the schedule item live channel.
     * JSON format: {"id": "string", "description": "string"}
     * Note: The live channel must be non-secure output.
     * @param {string | null} PREVIOUS_ITEM - The previous item of the schedule item live channel.
     * @param {string} TIME_CODE - The time code of the schedule item live channel.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule item live channel
     * is created.
     * Returns the information of the created schedule item live channel.
     * @throws {Error} - An error is thrown if the schedule item live channel fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createScheduleItemLiveChannel(SCHEDULE_ID, DAYS, DURATION_TIME_CODE, END_TIME_CODE,
        LIVE_CHANNEL, PREVIOUS_ITEM, TIME_CODE)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Creating schedule item live channel`);

        try
        {
            const CREATE_SCHEDULE_ITEM_LIVE_CHANNEL_INFO = await _createScheduleItemLiveChannel(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, DAYS, DURATION_TIME_CODE, END_TIME_CODE,
                LIVE_CHANNEL, PREVIOUS_ITEM, TIME_CODE, this.debugMode);
            _printDatetime(`Schedule item live channel created`);
            return CREATE_SCHEDULE_ITEM_LIVE_CHANNEL_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item live channel failed to create`);
            throw error;
        }
    } 

    /**
     * @function createScheduleItemSearchFilter
     * @async
     * @description Creates a schedule item search filter.
     * @param {string} SCHEDULE_ID - The id of the schedule the search filter item is to
     * be added to.
     * @param {Array<JSON> | null} COLLECTIONS - The collections of the schedule item search filter.
     * JSON format: {"id": "string", "description": "string"}
     * @param {Array<JSON>} DAYS - The days of the schedule item search filter.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string} DURATION_TIME_CODE - The duration time between TIME_CODE and
     * END_TIME_CODE.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string | null} END_SEARCH_DATE - The end search date of the schedule item search filter.
     * Only use when SEARCH_FILTER_TYPE = 2.
     * Please use the following format: yyyy-MM-dd.THH:MM:SS.FFFZ.
     * @param {integer} END_SEARCH_DURATION_IN_MINUTES - The end search duration in minutes of the
     * schedule item search filter.
     * @param {string} END_TIME_CODE - The end time code of the schedule item search filter.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string | null} PREVIOUS_ITEM - The previous item of the schedule item search filter.
     * @param {Array<JSON> | null} RELATED_CONTENTS - The related contents of the schedule item search filter.
     * @param {string | null} SEARCH_DATE - The search date of the schedule item search filter.
     * Only use when SEARCH_FILTER_TYPE = 2.
     * Please use the following format: yyyy-MM-dd.THH:MM:SS.FFFZ.
     * @param {string} SEARCH_DURATION_IN_MINUTES - The search duration in minutes of the
     * schedule item search filter.
     * @param {string} SEARCH_FILTER_TYPE - The search filter type of the schedule item search
     * filter.
     * Values: Random: 1, Random within a Date Range: 2, Newest: 3, Newest Not Played: 4
     * @param {Array<JSON>} TAGS - The tags of the schedule item search filter.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string} TIME_CODE - The time code of the schedule item search filter.
     * Please use the following format: hh:mm:ss;ff.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule item search filter
     * is created.
     * Returns the information of the created schedule item search filter.
     * @throws {Error} - An error is thrown if the schedule item search filter fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createScheduleItemSearchFilter(SCHEDULE_ID, COLLECTIONS, DAYS, DURATION_TIME_CODE,
        END_SEARCH_DATE, END_SEARCH_DURATION_IN_MINUTES, END_TIME_CODE, PREVIOUS_ITEM,
        RELATED_CONTENTS, SEARCH_DATE, SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS, 
        TIME_CODE)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        if (COLLECTIONS === null) COLLECTIONS = [];
        if (RELATED_CONTENTS === null) RELATED_CONTENTS = [];

        _printDatetime(`Creating schedule item search filter`);

        try
        {
            const CREATE_SCHEDULE_ITEM_SEARCH_FILTER_INFO = await _createScheduleItemSearchFilter(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, COLLECTIONS, DAYS, DURATION_TIME_CODE,
                END_SEARCH_DATE, END_SEARCH_DURATION_IN_MINUTES, END_TIME_CODE, PREVIOUS_ITEM,
                RELATED_CONTENTS, SEARCH_DATE, SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS,
                TIME_CODE, this.debugMode);
            _printDatetime(`Schedule item search filter created`);
            return CREATE_SCHEDULE_ITEM_SEARCH_FILTER_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item search filter failed to create`);
            throw error;
        }
    }

    /**
     * @function createScheduleItemPlaylistSchedule
     * @async
     * @description Creates a schedule item playlist schedule.
     * @param {string} SCHEDULE_ID - The id of the schedule the playlist schedule item is to
     * @param {Array<JSON>} DAYS - The days of the schedule item playlist schedule.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string} DURATION_TIME_CODE - The duration time between TIME_CODE and
     * END_TIME_CODE.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string} END_TIME_CODE - The end time code of the schedule item playlist schedule.
     * Please use the following format: hh:mm:ss;ff.
     * @param {JSON} PLAYLIST_SCHEDULE - The playlist schedule of the schedule item 
     * playlist schedule.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} PREVIOUS_ITEM - The previous item of the schedule item playlist schedule.
     * @param {string} TIME_CODE - The time code of the schedule item playlist schedule.
     * Please use the following format: hh:mm:ss;ff.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule item playlist schedule
     * is created.
     * Returns the information of the created schedule item playlist schedule.
     * @throws {Error} - An error is thrown if the schedule item playlist schedule fails to create.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async createScheduleItemPlaylistSchedule(SCHEDULE_ID, DAYS, DURATION_TIME_CODE,
        END_TIME_CODE, PLAYLIST_SCHEDULE, PREVIOUS_ITEM, TIME_CODE)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Creating schedule item playlist schedule`);

        try
        {
            const CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_INFO = await _createScheduleItemPlaylistSchedule(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, DAYS, DURATION_TIME_CODE,
                END_TIME_CODE, PLAYLIST_SCHEDULE, PREVIOUS_ITEM, TIME_CODE, this.debugMode);
            _printDatetime(`Schedule item playlist schedule created`);
            return CREATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item playlist schedule failed to create`);
            throw error;
        }
    }

    /**
     * @function deleteIntelligentPlaylist
     * @async
     * @description Deletes an intelligent playlist.
     * @param {string} SCHEDULE_ID - The id of the intelligent playlist to be deleted.
     * @returns {Promise<void>} - A promise that resolves when the intelligent playlist is deleted.
     * @throws {Error} - An error is thrown if the intelligent playlist fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteIntelligentPlaylist(SCHEDULE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting intelligent playlist`);

        try
        {
            await _deleteIntelligentPlaylist(this.token, this.config.serviceApiUrl, 
                SCHEDULE_ID, this.debugMode);
            _printDatetime(`Intelligent playlist deleted`);
        }
        catch (error)
        {
            _printDatetime(`Intelligent playlist failed to delete`);
            throw error;
        }
    }
    
    /**
     * @function deleteIntelligentSchedule
     * @async
     * @description Deletes a schedule.
     * @param {string} SCHEDULE_ID - The id of the intelligent schedule to be deleted.
     * @returns {Promise<void>} - A promise that resolves when the intelligent 
     * schedule is deleted.
     * @throws {Error} - An error is thrown if the intelligent schedule fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteIntelligentSchedule(SCHEDULE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting intelligent schedule`);

        try
        {
            await _deleteIntelligentSchedule(this.token, this.config.serviceApiUrl, 
                SCHEDULE_ID, this.debugMode);
            _printDatetime(`Intelligent schedule deleted`);
        }
        catch (error)
        {
            _printDatetime(`Intelligent schedule failed to delete`);
            throw error;
        }
    }

    /**
     * @function deletePlaylist
     * @async
     * @description Deletes a playlist.
     * @param {string} SCHEDULE_ID - The id of the playlist to be deleted.
     * @returns {Promise<void>} - A promise that resolves when the playlist is deleted.
     * @throws {Error} - An error is thrown if the playlist fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deletePlaylist(SCHEDULE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Deleting playlist`);

        try
        {
            await _deletePlaylist(this.token, this.config.serviceApiUrl, 
                SCHEDULE_ID, this.debugMode);
            _printDatetime(`Playlist deleted`);
        }
        catch (error)
        {
            _printDatetime(`Playlist failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteScheduleItem
     * @async
     * @description Deletes a schedule item.
     * @param {string} SCHEDULE_ID - The id of the schedule the schedule item is to be deleted from.
     * @param {string} ITEM_ID - The id of the item to be deleted.
     * @returns {Promise<void>} - A promise that resolves when the schedule item is deleted.
     * @throws {Error} - An error is thrown if the schedule item fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteScheduleItem(SCHEDULE_ID, ITEM_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        _printDatetime(`Deleting schedule item`);

        try
        {
            await _deleteScheduleItem(this.token, this.config.serviceApiUrl, SCHEDULE_ID, 
                ITEM_ID, this.debugMode);
            _printDatetime(`Schedule item deleted`);
        }
        catch (error)
        {
            _printDatetime(`Schedule item failed to delete`);
            throw error;
        }
    }

    /**
     * @function generateSchedule
     * @async
     * @description Generates a schedule.
     * @param {string} SCHEDULE_ID - The id of the schedule to be generated.
     * @returns {Promise<void>} - A promise that resolves when the schedule is generated.
     * @throws {Error} - An error is thrown if the schedule fails to generate.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async generateSchedule(SCHEDULE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Generating schedule`);

        try
        {
            await _generateSchedule(this.token, this.config.serviceApiUrl, 
                SCHEDULE_ID, this.debugMode);
            _printDatetime(`Schedule generated`);
        }
        catch (error)
        {
            _printDatetime(`Schedule failed to generate`);
            throw error;
        }
    }

    /**
     * @function getIntelligentPlaylist
     * @async
     * @description Gets an intelligent playlist.
     * @param {string} SCHEDULE_ID - The id of the intelligent playlist to be gotten.
     * @returns {Promise<JSON>} - A promise that resolves when the intelligent playlist is gotten.
     * Returns the information of the gotten intelligent playlist.
     * @throws {Error} - An error is thrown if the intelligent playlist fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getIntelligentPlaylist(SCHEDULE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Getting intelligent playlist`);

        try
        {
            const GET_INTELLIGENT_PLAYLIST_INFO = await _getIntelligentPlaylist(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, this.debugMode);
            _printDatetime(`Intelligent playlist gotten`);
            return GET_INTELLIGENT_PLAYLIST_INFO;
        }
        catch (error)
        {
            _printDatetime(`Intelligent playlist failed to get`);
            throw error;
        }
    }

    /**
     * @function getIntelligentSchedule
     * @async
     * @description Gets an intelligent schedule.
     * @param {string} SCHEDULE_ID - The id of the intelligent schedule to be gotten.
     * @returns {Promise<JSON>} - A promise that resolves when the intelligent schedule is gotten.
     * Returns the information of the gotten intelligent schedule.
     * @throws {Error} - An error is thrown if the intelligent schedule fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getIntelligentSchedule(SCHEDULE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Getting intelligent schedule`);

        try
        {
            const GET_INTELLIGENT_SCHEDULE_INFO = await _getIntelligentSchedule(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, this.debugMode);
            _printDatetime(`Intelligent schedule gotten`);
            return GET_INTELLIGENT_SCHEDULE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Intelligent schedule failed to get`);
            throw error;
        }
    }

    /**
     * @function getPlaylist
     * @async
     * @description Gets a playlist.
     * @param {string} SCHEDULE_ID - The id of the schedule the playlist is to be gotten from.
     * @returns {Promise<JSON>} - A promise that resolves when the playlist is gotten.
     * Returns the information of the gotten playlist.
     * @throws {Error} - An error is thrown if the playlist fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getPlaylist(SCHEDULE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Getting playlist`);

        try
        {
            const GET_PLAYLIST_INFO = await _getPlaylist(this.token, this.config.serviceApiUrl, 
                SCHEDULE_ID, this.debugMode);
            _printDatetime(`Playlist gotten`);
            return GET_PLAYLIST_INFO;
        }
        catch (error)
        {
            _printDatetime(`Playlist failed to get`);
            throw error;
        }
    }

    /**
     * @function getScheduleItem
     * @async
     * @description Gets a schedule item.
     * @param {string} SCHEDULE_ID - The id of the schedule the schedule item is to be gotten from.
     * @param {string} ITEM_ID - The id of the item to be gotten.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule item is gotten.
     * Returns the information of the gotten schedule item.
     * @throws {Error} - An error is thrown if the schedule item fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getScheduleItem(SCHEDULE_ID, ITEM_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting schedule item`);

        try
        {
            const GET_SCHEDULE_ITEM_INFO = await _getScheduleItem(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, ITEM_ID, this.debugMode);
            _printDatetime(`Schedule item gotten`);
            return GET_SCHEDULE_ITEM_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item failed to get`);
            throw error;
        }
    }

    /**
     * @function getScheduleItems
     * @async
     * @description Gets the schedule items of a schedule.
     * @param {string} SCHEDULE_ID - The id of the schedule the schedule items are to be gotten from.
     * @returns {Promise<Array<JSON>>} - A promise that resolves when the schedule items are gotten.
     * Returns the information of the gotten schedule items.
     * @throws {Error} - An error is thrown if the schedule items fail to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getScheduleItems(SCHEDULE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Getting schedule items`);

        try
        {
            const GET_SCHEDULE_ITEMS_INFO = await _getScheduleItems(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, this.debugMode);
            _printDatetime(`Schedule items gotten`);
            return GET_SCHEDULE_ITEMS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule items failed to get`);
            throw error;
        }
    }

    /**
     * @function getSchedulePreview
     * @async
     * @description Gets a schedule preview.
     * @param {string} SCHEDULE_ID - The id of the schedule the schedule preview is to be gotten from.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule preview is gotten.
     * Returns the information of the gotten schedule preview.
     * @throws {Error} - An error is thrown if the schedule preview fails to get.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async getSchedulePreview(SCHEDULE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")

        _printDatetime(`Getting schedule preview`);

        try
        {
            const GET_SCHEDULE_PREVIEW_INFO = await _getSchedulePreview(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, this.debugMode);
            _printDatetime(`Schedule preview gotten`);
            return GET_SCHEDULE_PREVIEW_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule preview failed to get`);
            throw error;
        }
    }

    /**
     * @function moveScheduleItem
     * @async
     * @description Moves a schedule item.
     * @param {string} SCHEDULE_ID - The id of the schedule the schedule item is to be moved from.
     * @param {string} ITEM_ID - The id of the item to be moved.
     * @param {string} PREVIOUS_ITEM - The previous item of the schedule item.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule item is moved.
     * Returns the information of the moved schedule item.
     * @throws {Error} - An error is thrown if the schedule item fails to move.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async moveScheduleItem(SCHEDULE_ID, ITEM_ID, PREVIOUS_ITEM)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Moving schedule item`);

        try
        {
            const MOVE_SCHEDULE_ITEM_INFO = await _moveScheduleItem(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, ITEM_ID, PREVIOUS_ITEM, this.debugMode);
            _printDatetime(`Schedule item moved`);
            return MOVE_SCHEDULE_ITEM_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item failed to move`);
            throw error;
        }
    }

    /**
     * @function publishIntelligentSchedule
     * @async
     * @description Publishes an intelligent schedule.
     * @param {string} SCHEDULE_ID - The id of the schedule to be published.
     * @param {integer} NUMBER_OF_LOCKED_DAYS - The number of locked days of the 
     * intelligent schedule.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule is published.
     * Returns the information of the published schedule.
     * @throws {Error} - An error is thrown if the schedule fails to publish.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async publishIntelligentSchedule(SCHEDULE_ID, NUMBER_OF_LOCKED_DAYS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Publishing intelligent schedule`);

        try
        {
            const PUBLISH_INTELLIGENT_SCHEDULE_INFO = await _publishIntelligentSchedule(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, NUMBER_OF_LOCKED_DAYS, this.debugMode);
            _printDatetime(`Intelligent schedule published`);
            return PUBLISH_INTELLIGENT_SCHEDULE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Intelligent schedule failed to publish`);
            throw error;
        }
    }

    /**
     * @function startSchedule
     * @async
     * @description Starts a schedule.
     * @param {string} SCHEDULE_ID - The id of the schedule to be started.
     * @param {boolean | null} SKIP_CLEANUP_ON_FAILURE - Whether or not to skip cleanup on failure.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule is started.
     * Returns the information of the started schedule.
     * @throws {Error} - An error is thrown if the schedule fails to start.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async startSchedule(SCHEDULE_ID, SKIP_CLEANUP_ON_FAILURE)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Starting schedule`);

        try
        {
            const START_SCHEDULE_INFO = await _startSchedule(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, SKIP_CLEANUP_ON_FAILURE, this.debugMode);
            _printDatetime(`Schedule started`);
            return START_SCHEDULE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule failed to start`);
            throw error;
        }
    }

    /**
     * @function stopSchedule
     * @async
     * @description Stops a schedule.
     * @param {string} SCHEDULE_ID - The id of the schedule to be stopped.
     * @param {boolean | null} FORCE_STOP - Whether or not to force a stop.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule is stopped.
     * Returns the information of the stopped schedule.
     * @throws {Error} - An error is thrown if the schedule fails to stop.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async stopSchedule(SCHEDULE_ID, FORCE_STOP)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Stopping schedule`);

        try
        {
            const STOP_SCHEDULE_INFO = await _stopSchedule(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, FORCE_STOP, this.debugMode);
            _printDatetime(`Schedule stopped`);
            return STOP_SCHEDULE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule failed to stop`);
            throw error;
        }
    }
    
    /**
     * @function updateIntelligentPlaylist
     * @async
     * @description Updates an intelligent playlist.
     * @param {string} SCHEDULE_ID - The id of the schedule the intelligent playlist is 
     * to be updated.
     * @param {Array<JSON> | null} COLLECTIONS - The collections of the intelligent playlist.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} END_SEARCH_DATE - The end search date of the intelligent playlist.
     * Only use when SEARCH_FILTER_TYPE = 2.
     * Please use the following format: yyyy-MM-dd.THH:MM:SS.FFFZ.
     * @param {integer | null} END_SEARCH_DURATION_IN_MINUTES - The end search duration in minutes of the
     * intelligent playlist.
     * @param {string | null} NAME - The name of the intelligent playlist.
     * @param {Array<JSON> | null} RELATED_CONTENTS - The related content of the intelligent playlist.
     * @param {string | null} SEARCH_DATE - The search date of the intelligent playlist.
     * Only use when SEARCH_FILTER_TYPE = 2.
     * Please use the following format: yyyy-MM-dd.THH:MM:SS.FFFZ.
     * @param {integer | null} SEARCH_DURATION_IN_MINUTES - The search duration in minutes of the
     * intelligent playlist.
     * @param {string | null} SEARCH_FILTER_TYPE - The search filter type of the intelligent playlist.
     * Values: Random: 1, Random within a Date Range: 2, Newest: 3, Newest Not Played: 4
     * @param {Array<JSON> | null} TAGS - The tags of the intelligent playlist.
     * @param {JSON | null} THUMBNAIL_ASSET - The thumbnail asset of the intelligent playlist.
     * JSON format: {"id": "string", "description": "string"}
     * @returns {Promise<JSON>} - A promise that resolves when the intelligent playlist is updated.
     * Returns the information of the updated intelligent playlist.
     * @throws {Error} - An error is thrown if the intelligent playlist fails to update.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async updateIntelligentPlaylist(SCHEDULE_ID, COLLECTIONS, END_SEARCH_DATE,
        END_SEARCH_DURATION_IN_MINUTES, NAME, RELATED_CONTENTS, SEARCH_DATE,
        SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS, THUMBNAIL_ASSET)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        if (COLLECTIONS === null) COLLECTIONS = [];
        if (RELATED_CONTENTS === null) RELATED_CONTENTS = [];
        if (TAGS === null) TAGS = [];

        _printDatetime(`Updating intelligent playlist`);

        try
        {
            const UPDATE_INTELLIGENT_PLAYLIST_INFO = await _updateIntelligentPlaylist(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, COLLECTIONS, END_SEARCH_DATE,
                END_SEARCH_DURATION_IN_MINUTES, NAME, RELATED_CONTENTS, SEARCH_DATE,
                SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS, THUMBNAIL_ASSET, this.debugMode);
            _printDatetime(`Intelligent playlist updated`);
            return UPDATE_INTELLIGENT_PLAYLIST_INFO;
        }
        catch (error)
        {
            _printDatetime(`Intelligent playlist failed to update`);
            throw error;
        }
    } 

    /**
     * @function updateIntelligentSchedule
     * @async
     * @description Updates an intelligent schedule.
     * @param {string} SCHEDULE_ID - The id of the schedule the intelligent schedule is
     * to be updated.
     * @param {JSON | null} DEFAULT_VIDEO_ASSET - The default video asset of the intelligent schedule.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} NAME - The name of the intelligent schedule.
     * @param {JSON | null} THUMBNAIL_ASSET - The thumbnail asset of the intelligent schedule.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} TIME_ZONE_ID - The time zone id of the intelligent schedule.
     * @returns {Promise<JSON>} - A promise that resolves when the intelligent schedule is updated.
     * Returns the information of the updated intelligent schedule.
     * @throws {Error} - An error is thrown if the intelligent schedule fails to update.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async updateIntelligentSchedule(SCHEDULE_ID, DEFAULT_VIDEO_ASSET, NAME, THUMBNAIL_ASSET,
        TIME_ZONE_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Updating intelligent schedule`);

        try
        {
            const UPDATE_INTELLIGENT_SCHEDULE_INFO = await _updateIntelligentSchedule(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, DEFAULT_VIDEO_ASSET, NAME, THUMBNAIL_ASSET,
                TIME_ZONE_ID, this.debugMode);
            _printDatetime(`Intelligent schedule updated`);
            return UPDATE_INTELLIGENT_SCHEDULE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Intelligent schedule failed to update`);
            throw error;
        }
    }

    /**
     * @function updatePlaylist
     * @async
     * @description Updates a playlist.
     * @param {string} SCHEDULE_ID - The id of the schedule the playlist is to be updated from.
     * @param {Array<JSON> | null} DEFAULT_VIDEO_ASSET - The default video asset of the playlist.
     * JSON format: {"id": "string", "description": "string"}
     * @param {boolean | null} LOOP_PLAYLIST - Whether or not to loop the playlist.
     * @param {string | null} NAME - The name of the playlist.
     * @param {JSON | null} THUMBNAIL_ASSET - The thumbnail asset of the playlist.
     * JSON format: {"id": "string", "description": "string"}
     * @returns {Promise<JSON>} - A promise that resolves when the playlist is updated.
     * Returns the information of the updated playlist.
     * @throws {Error} - An error is thrown if the playlist fails to update.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async updatePlaylist(SCHEDULE_ID, DEFAULT_VIDEO_ASSET, LOOP_PLAYLIST, NAME, THUMBNAIL_ASSET)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (DEFAULT_VIDEO_ASSET === null) DEFAULT_VIDEO_ASSET = {};
        if (THUMBNAIL_ASSET === null) THUMBNAIL_ASSET = {};

        _printDatetime(`Updating playlist`);

        try
        {
            const UPDATE_PLAYLIST_INFO = await _updatePlaylist(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, DEFAULT_VIDEO_ASSET, LOOP_PLAYLIST, 
                NAME, THUMBNAIL_ASSET, this.debugMode);
            _printDatetime(`Playlist updated`);
            return UPDATE_PLAYLIST_INFO;
        }
        catch (error)
        {
            _printDatetime(`Playlist failed to update`);
            throw error;
        }
    }

    /**
     * @function updateScheduleItemAsset
     * @async
     * @description Updates a schedule item asset.
     * @param {string} SCHEDULE_ID - The id of the schedule the schedule item asset is to be updated from.
     * @param {string} ITEM_ID - The id of the item to be updated.
     * @param {JSON | null} ASSET - The asset of the schedule item asset.
     * JSON format: {"id": "string", "description": "string"}
     * @param {Array<JSON> | null} DAYS - The days of the schedule item asset.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} DURATION_TIME_CODE - The duration time between TIME_CODE and
     * END_TIME_CODE.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string | null} END_TIME_CODE - The end time code of the schedule item asset.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string | null} TIME_CODE - The time code of the schedule item asset.
     * Please use the following format: hh:mm:ss;ff.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule item asset is updated.
     * Returns the information of the updated schedule item asset.
     * @throws {Error} - An error is thrown if the schedule item asset fails to update.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async updateScheduleItemAsset(SCHEDULE_ID, ITEM_ID, ASSET, DAYS, DURATION_TIME_CODE,
        END_TIME_CODE, TIME_CODE)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Updating schedule item asset`);

        try
        {
            const UPDATE_SCHEDULE_ITEM_ASSET_INFO = await _updateScheduleItemAsset(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, ITEM_ID, ASSET, DAYS, DURATION_TIME_CODE,
                END_TIME_CODE, TIME_CODE, this.debugMode);
            _printDatetime(`Schedule item asset updated`);
            return UPDATE_SCHEDULE_ITEM_ASSET_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item asset failed to update`);
            throw error;
        }
    } 

    /**
     * @function updateScheduleItemLiveChannel
     * @async
     * @description Updates a schedule item live channel.
     * @param {string} SCHEDULE_ID - The id of the schedule the schedule item live channel is to be
     * updated from.
     * @param {string} ITEM_ID - The id of the item to be updated.
     * @param {Array<JSON> | null} DAYS - The days of the schedule item live channel.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} DURATION_TIME_CODE - The duration time between TIME_CODE and
     * END_TIME_CODE.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string | null} END_TIME_CODE - The end time code of the schedule item live channel.
     * Please use the following format: hh:mm:ss;ff.
     * @param {JSON | null} LIVE_CHANNEL - The live channel of the schedule item live channel.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} TIME_CODE - The time code of the schedule item live channel.
     * Please use the following format: hh:mm:ss;ff.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule item live channel is updated.
     * Returns the information of the updated schedule item live channel.
     * @throws {Error} - An error is thrown if the schedule item live channel fails to update.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async updateScheduleItemLiveChannel(SCHEDULE_ID, ITEM_ID, DAYS, DURATION_TIME_CODE,
        END_TIME_CODE, LIVE_CHANNEL, TIME_CODE)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Updating schedule item live channel`);

        try
        {
            const UPDATE_SCHEDULE_ITEM_LIVE_CHANNEL_INFO = await _updateScheduleItemLiveChannel(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, ITEM_ID, DAYS, DURATION_TIME_CODE,
                END_TIME_CODE, LIVE_CHANNEL, TIME_CODE, this.debugMode);
            _printDatetime(`Schedule item live channel updated`);
            return UPDATE_SCHEDULE_ITEM_LIVE_CHANNEL_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item live channel failed to update`);
            throw error;
        }
    } 

    /**
     * @function updateScheduleItemSearchFilter
     * @async
     * @description Updates a schedule item search filter.
     * @param {string} SCHEDULE_ID - The id of the schedule the schedule item search filter is to be
     * updated from.
     * @param {string} ITEM_ID - The id of the item to be updated.
     * @param {Array<JSON> | null} COLLECTIONS - The collections of the schedule item search filter.
     * JSON format: {"id": "string", "description": "string"}
     * @param {Array<JSON> | null} DAYS - The days of the schedule item search filter.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} DURATION_TIME_CODE - The duration time between TIME_CODE and
     * END_TIME_CODE.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string | null} END_SEARCH_DATE - The end search date of the schedule item search filter.
     * Only use when SEARCH_FILTER_TYPE = 2.
     * Please use the following format: yyyy-MM-dd.THH:MM:SS.FFFZ.
     * @param {integer | null} END_SEARCH_DURATION_IN_MINUTES - The end search duration in minutes of the
     * schedule item search filter.
     * @param {string | null} END_TIME_CODE - The end time code of the schedule item search filter.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string | null} PREVIOUS_ITEM - The previous item of the schedule item search filter.
     * @param {Array<JSON> | null} RELATED_CONTENTS - The related content of the schedule item search
     * filter.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} SEARCH_DATE - The search date of the schedule item search filter.
     * Only use when SEARCH_FILTER_TYPE = 2.
     * Please use the following format: yyyy-MM-dd.THH:MM:SS.FFFZ.
     * @param {integer | null} SEARCH_DURATION_IN_MINUTES - The search duration in minutes of the
     * schedule item search filter.
     * @param {string | null} SEARCH_FILTER_TYPE - The search filter type of the schedule item search
     * filter.
     * Values: Random: 1, Random within a Date Range: 2, Newest: 3, Newest Not Played: 4
     * @param {Array<JSON> | null} TAGS - The tags of the schedule item search filter.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} TIME_CODE - The time code of the schedule item search filter.
     * Please use the following format: hh:mm:ss;ff.
     * @return {Promise<JSON>} - A promise that resolves when the schedule item search filter is updated.
     * Returns the information of the updated schedule item search filter.
     * @throws {Error} - An error is thrown if the schedule item search filter fails to update.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async updateScheduleItemSearchFilter(SCHEDULE_ID, ITEM_ID, COLLECTIONS, DAYS,
        DURATION_TIME_CODE, END_SEARCH_DATE, END_SEARCH_DURATION_IN_MINUTES, END_TIME_CODE,
        PREVIOUS_ITEM, RELATED_CONTENTS, SEARCH_DATE, SEARCH_DURATION_IN_MINUTES,
        SEARCH_FILTER_TYPE, TAGS, TIME_CODE)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Updating schedule item search filter`);

        try
        {
            const UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_INFO = await _updateScheduleItemSearchFilter(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, ITEM_ID, COLLECTIONS, DAYS,
                DURATION_TIME_CODE, END_SEARCH_DATE, END_SEARCH_DURATION_IN_MINUTES, END_TIME_CODE,
                PREVIOUS_ITEM, RELATED_CONTENTS, SEARCH_DATE, SEARCH_DURATION_IN_MINUTES,
                SEARCH_FILTER_TYPE, TAGS, TIME_CODE, this.debugMode);
            _printDatetime(`Schedule item search filter updated`);
            return UPDATE_SCHEDULE_ITEM_SEARCH_FILTER_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item search filter failed to update`);
            throw error;
        }
    }

    /**
     * @function updateScheduleItemPlaylistSchedule
     * @async
     * @description Updates a schedule item playlist schedule.
     * @param {string} SCHEDULE_ID - The id of the schedule the schedule item playlist schedule is to be
     * updated from.
     * @param {string} ITEM_ID - The id of the item to be updated.
     * @param {Array<JSON> | null} DAYS - The days of the schedule item playlist schedule.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} DURATION_TIME_CODE - The duration time between TIME_CODE and
     * END_TIME_CODE.
     * Please use the following format: hh:mm:ss;ff.
     * @param {string | null} END_TIME_CODE - The end time code of the schedule item playlist schedule.
     * Please use the following format: hh:mm:ss;ff.
     * @param {JSON | null} PLAYLIST_SCHEDULE - The playlist schedule of the schedule item playlist
     * schedule.
     * JSON format: {"id": "string", "description": "string"}
     * @param {string | null} TIME_CODE - The time code of the schedule item playlist schedule.
     * Please use the following format: hh:mm:ss;ff.
     * @returns {Promise<JSON>} - A promise that resolves when the schedule item playlist schedule is updated.
     * Returns the information of the updated schedule item playlist schedule.
     * @throws {Error} - An error is thrown if the schedule item playlist schedule fails to update.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async updateScheduleItemPlaylistSchedule(SCHEDULE_ID, ITEM_ID, DAYS, DURATION_TIME_CODE,
        END_TIME_CODE, PLAYLIST_SCHEDULE, TIME_CODE)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Updating schedule item playlist schedule`);

        try
        {
            const UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_INFO = await _updateScheduleItemPlaylistSchedule(this.token, 
                this.config.serviceApiUrl, SCHEDULE_ID, ITEM_ID, DAYS, DURATION_TIME_CODE,
                END_TIME_CODE, PLAYLIST_SCHEDULE, TIME_CODE, this.debugMode);
            _printDatetime(`Schedule item playlist schedule updated`);
            return UPDATE_SCHEDULE_ITEM_PLAYLIST_SCHEDULE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Schedule item playlist schedule failed to update`);
            throw error;
        }
    } 

    // user functions
    /**
     * @function deleteUserContentAttributeData
     * @async
     * @description Deletes a user content attribute data.
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @returns {Promise<void>} - A promise that resolves when the user content attribute data is deleted.
     * @throws {Error} - An error is thrown if the user content attribute data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUserContentAttributeData(USER_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting user content attribute data`);

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserContentAttributeData(this.token, this.config.serviceApiUrl, 
                USER_ID, this.debugMode);
            _printDatetime(`User content attribute data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User content attribute data failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteUserContentGroupData
     * @async
     * @description Deletes a user content group data.
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @returns {Promise<void>} - A promise that resolves when the user content group data is deleted.
     * @throws {Error} - An error is thrown if the user content group data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUserContentGroupData(USER_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting user content group data`);

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserContentGroupData(this.token, this.config.serviceApiUrl, 
                USER_ID, this.debugMode);
            _printDatetime(`User content group data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User content group data failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteUserContentSecurityData
     * @async
     * @description Deletes a user content security data.
     * @param {string | null} CONTENT_ID - The content ID of the user content security data.
     * @param {string | null} CONTENT_DEFINITION_ID - The content definition ID of the user 
     * content security data.
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @param {string | null} EMAIL - The email of the user content security data.
     * @param {string | null} ID - The ID of the user content security data.
     * @param {string | null} KEY_NAME - The key name of the user content security data.
     * @param {string | null} EXPIRATION_DATE - The expiration date of the user content 
     * security data.
     * @returns {Promise<void>} - A promise that resolves when the user content security data 
     * is deleted.
     * @throws {Error} - An error is thrown if the user content security data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUserContentSecurityData(CONTENT_ID, CONTENT_DEFINITION_ID, EMAIL, USER_ID,
        ID, KEY_NAME, EXPIRATION_DATE)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting user content security data`);

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserContentSecurityData(this.token, this.config.serviceApiUrl, 
                CONTENT_ID, CONTENT_DEFINITION_ID, USER_ID, EMAIL, ID, KEY_NAME, 
                EXPIRATION_DATE, this.debugMode);
            _printDatetime(`User content security data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User content security data failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteUserData
     * @async
     * @description Deletes a user data.
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @returns {Promise<void>} - A promise that resolves when the user data is deleted.
     * @throws {Error} - An error is thrown if the user data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUserData(USER_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
         
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting user data`);

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserData(this.token, this.config.serviceApiUrl, 
                USER_ID, this.debugMode);
            _printDatetime(`User data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User data failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteUserDislikesData
     * @async
     * @description Deletes a user dislikes data.
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @returns {Promise<void>} - A promise that resolves when the user dislikes data is deleted.
     * @throws {Error} - An error is thrown if the user dislikes data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUserDislikesData(USER_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting user dislikes data`);

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserDislikesData(this.token, this.config.serviceApiUrl,
                USER_ID, this.debugMode);
            _printDatetime(`User dislikes data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User dislikes data failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteUserFavoritesData
     * @async
     * @description Deletes a user favorites data.
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @returns {Promise<void>} - A promise that resolves when the user favorites data is deleted.
     * @throws {Error} - An error is thrown if the user favorites data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */

    async deleteUserFavoritesData(USER_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
         
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting user favorites data`);

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserFavoritesData(this.token, this.config.serviceApiUrl,
                USER_ID, this.debugMode);
            _printDatetime(`User favorites data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User favorites data failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteUserLikesData
     * @async
     * @description Deletes a user likes data.
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @returns {Promise<void>} - A promise that resolves when the user likes data is deleted.
     * @throws {Error} - An error is thrown if the user likes data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUserLikesData(USER_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting user likes data`);

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserLikesData(this.token, this.config.serviceApiUrl,
                USER_ID, this.debugMode);
            _printDatetime(`User likes data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User likes data failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteUserSavedSearchData
     * @async
     * @description Deletes a user saved search data.
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @returns {Promise<void>} - A promise that resolves when the user saved search data is deleted.
     * @throws {Error} - An error is thrown if the user saved search data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUserSavedSearchData(USER_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
         
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        _printDatetime(`Deleting user saved search data`);

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserSavedSearchData(this.token, this.config.serviceApiUrl,
                USER_ID, this.debugMode);
            _printDatetime(`User saved search data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User saved search data failed to delete`);
            throw error;
        }
    }
    
    /**
     * @function deleteUserSessionData
     * @async
     * @description Deletes a user session data.
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @returns {Promise<void>} - A promise that resolves when the user session data is deleted.
     * @throws {Error} - An error is thrown if the user session data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUserSessionData(USER_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Deleting user session data`);

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserSessionData(this.token, this.config.serviceApiUrl,
                USER_ID, this.debugMode);
            _printDatetime(`User session data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User session data failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteUserVideoTrackingData
     * @async
     * @description Deletes a user video tracking data.
     * @param {string | null} ASSET_ID - The asset ID of the user video tracking data.
     * @param {string | null} CONTENT_ID - The content ID of the user video tracking data.
     * @param {string | null} VIDEO_TRACKING_ATTRIBUTE_ID - The video tracking attribute ID of the
     * user video tracking data. Possible values: "Undefined", "Watchlist", "LiveStream".
     * @param {string | null} USER_ID - The user ID of the user video tracking data.
     * If set to null, the user ID of the current user is used.
     * @param {string | null} ID - The ID of the user video tracking data.
     * @param {boolean | null} IS_FIRST_QUARTILE - The first quartile of the user video tracking data.
     * @param {boolean | null} IS_MIDPOINT - The midpoint of the user video tracking data.
     * @param {boolean | null} IS_THIRD_QUARTILE - The third quartile of the user video tracking data.
     * @param {boolean | null} IS_COMPLETE - The complete of the user video tracking data.
     * @param {boolean | null} IS_HIDDEN - The hidden of the user video tracking data.
     * @param {boolean | null} IS_LIVE_STREAM - The live stream of the user video tracking data.
     * @param {double | null} MAX_SECOND - The max second of the user video tracking data.
     * @param {double | null} LAST_SECOND - The last second of the user video tracking data.
     * @param {double | null} TOTAL_SECONDS - The total seconds of the user video tracking data.
     * @param {string | null} LAST_BEACON_DATE - The last beacon date of the user video tracking data.
     * @param {string | null} KEY_NAME - The key name of the user video tracking data.
     * @returns {Promise<void>} - A promise that resolves when the user video tracking data is deleted.
     * @throws {Error} - An error is thrown if the user video tracking data fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUserVideoTrackingData(ASSET_ID, CONTENT_ID, VIDEO_TRACKING_ATTRIBUTE_ID, 
        USER_ID, ID, IS_FIRST_QUARTILE, IS_MIDPOINT, IS_THIRD_QUARTILE, IS_COMPLETE, 
        IS_HIDDEN, IS_LIVE_STREAM, MAX_SECOND, LAST_SECOND, TOTAL_SECONDS, LAST_BEACON_DATE, 
        KEY_NAME)
    {
        if (this.token === null)
        {
            await this._init();
        }
         
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        try
        {
            if (USER_ID === null) USER_ID = this.id;

            await _deleteUserVideoTrackingData(this.token, this.config.serviceApiUrl,
                ASSET_ID, CONTENT_ID, VIDEO_TRACKING_ATTRIBUTE_ID, USER_ID, ID,
                IS_FIRST_QUARTILE, IS_MIDPOINT, IS_THIRD_QUARTILE, IS_COMPLETE, IS_HIDDEN, 
                IS_LIVE_STREAM, MAX_SECOND, LAST_SECOND, TOTAL_SECONDS, LAST_BEACON_DATE, KEY_NAME,
                this.debugMode);
            _printDatetime(`User video tracking data deleted`);
        }
        catch (error)
        {
            _printDatetime(`User video tracking data failed to delete`);
            throw error;
        }
    }

    /**
     * @function deleteUser
     * @async
     * @description Deletes a user.
     * @returns {Promise<void>} - A promise that resolves when the user is deleted.
     * @throws {Error} - An error is thrown if the user fails to delete.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async deleteUser()
    {
        if (this.token === null)
        {
            await this._init();
        }
         
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }

        try
        {
            await _deleteUser(this.token, this.config.serviceApiUrl,
                this.id, this.debugMode);
            _printDatetime(`User deleted`);
        }
        catch (error)
        {
            _printDatetime(`User failed to delete`);
            throw error;
        }
    }

    // user session functions
    /**
     * @function changeSessionStatus
     * @async
     * @description Changes the status of a user session.
     * @param {string} USER_SESSION_STATUS - The status of the user session.
     * @param {string | null} APPLICATION_ID - The application ID of the user session.
     * @returns {Promise<void>} - A promise that resolves when the status of the user session is changed.
     * @throws {Error} - An error is thrown if the status of the user session fails to change.
     * @throws {Error} - An error is thrown if the API type is not admin.
     */
    async changeSessionStatus(USER_SESSION_STATUS, APPLICATION_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Changing session status`);

        try
        {
            const SESSION_STATUS = await _changeSessionStatus(this.token, this.config.serviceApiUrl, 
                this.userSessionId, USER_SESSION_STATUS, APPLICATION_ID, this.debugMode);
            _printDatetime(`Session status changed`);
            return SESSION_STATUS;
        }
        catch (error)
        {
            _printDatetime(`Session status failed to change`);
            throw error;
        }
    }

    /**
     * @function getUserSession
     * @async
     * @description Gets a user session.
     * @returns {Promise<JSON>} - A promise that resolves when the user session is gotten.
     * Returns the information of the gotten user session.
     * @throws {Error} - An error is thrown if the user session fails to get.
     */
    async getUserSession()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "admin")
        {
            throw new Error("This function is only available for admin API type.");
        }
        
        _printDatetime(`Getting user session`);

        try
        {
            const GET_USER_SESSION_INFO = await _getUserSession(this.token, this.config.serviceApiUrl, 
                this.userSessionId, this.debugMode);
            _printDatetime(`User session gotten`);
            return GET_USER_SESSION_INFO;
        }
        catch (error)
        {
            _printDatetime(`User session failed to get`);
            throw error;
        }
    }

    // common
    // registration functions
    /**
     * @function register
     * @async
     * @description Registers a user.
     * @param {string} EMAIL - The email of the user.
     * @param {string | null} FIRST_NAME - The first name of the user.
     * @param {string | null} LAST_NAME - The last name of the user.
     * @param {string} PASSWORD - The password of the user.
     * @returns {Promise<JSON>} - A promise that resolves when the user is registered.
     * Returns the information of the registered user.
     * @throws {Error} - An error is thrown if the user fails to register.
     */
    async register(EMAIL, FIRST_NAME, LAST_NAME, PASSWORD)
    {   
        _printDatetime(`Registering user: ${EMAIL}`);

        try
        {
            const REGISTER_INFO = await _register(this.config.serviceApiUrl, EMAIL, 
                FIRST_NAME, LAST_NAME, PASSWORD, this.debugMode);
            _printDatetime(`User registered: ${EMAIL}`);
            return REGISTER_INFO;
        }
        catch (error)
        {
            _printDatetime(`User failed to register: ${EMAIL}`);
            throw error;
        }
    }

    /**
     * @function resendCode
     * @async
     * @description Resends a code.
     * @param {string} EMAIL - The email of the user.
     * @returns {Promise<void>} - A promise that resolves when the code is resent.
     * @throws {Error} - An error is thrown if the code fails to resend.
     */

    async resendCode(EMAIL)
    {
        _printDatetime(`Resending code: ${EMAIL}`);

        try
        {
            await _resendCode(this.config.serviceApiUrl, EMAIL, this.debugMode);
            _printDatetime(`Code resent: ${EMAIL}`);
        }
        catch (error)
        {
            _printDatetime(`Code failed to resend: ${EMAIL}`);
            throw error;
        }
    }

    /**
     * @function verify
     * @async
     * @description Verifies a user.
     * @param {string} EMAIL - The email of the user.
     * @param {string} CODE - The code of the user.
     * @returns {Promise<void>} - A promise that resolves when the user is verified.
     * @throws {Error} - An error is thrown if the user fails to verify.
     */

    async verify(EMAIL, CODE)
    {
        _printDatetime(`Verifying user: ${EMAIL}`);

        try
        {
            const VERIFY_INFO = await _verify(this.config.serviceApiUrl, EMAIL, CODE, this.debugMode);
            _printDatetime(`User verified: ${EMAIL}`);
            return VERIFY_INFO;
        }
        catch (error)
        {
            _printDatetime(`User failed to verify: ${EMAIL}`);
            throw error;
        }
    }

    // ping functions
    /**
     * @function ping
     * @async
     * @description Pings the user.
     * @returns {Promise<JSON>} - A promise that resolves when the user is pinged.
     * Returns the ping status of the user.
     * @throws {Error} - An error is thrown if the user fails to ping.
     */
    async ping()
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Pinging user`);

        try
        {
            const PING = await _ping(this.token, this.config.serviceApiUrl, null, this.userSessionId, this.debugMode);
            _printDatetime(`User pinged`);
            return PING;
        }
        catch (error)
        {
            _printDatetime(`User failed to ping`);
            throw error;
        }
    }

    /**
     * @function ping_auth
     * @async
     * @description Pings the user.
     * @returns {Promise<JSON>} - A promise that resolves when the user is pinged.
     * Returns the ping status of the user.
     * @throws {Error} - An error is thrown if the user fails to ping.
     */
    async pingAuth()
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Pinging user`);

        try
        {
            const PING = await _pingAuth(this.token, this.config.serviceApiUrl, null, this.userSessionId, this.debugMode);
            _printDatetime(`User pinged`);
            return PING;
        }
        catch (error)
        {
            _printDatetime(`User failed to ping`);
            throw error;
        }
    }

    // search functions
    /**
     * @function search
     * @async
     * @description Searches for assets.
     * @param {string | null} QUERY - The query of the search.
     * @param {int | null} OFFSET - The offset of the search.
     * @param {int | null} SIZE - The size of the search.
     * @param {Array<JSON> | null} FILTERS - The filters of the search.
     * Array format: [{"fieldName": "string", "operator": "string", "values" : 
     * "array<string>" | "string"} ...]
     * @param {Array<JSON> | null} SORT_FIELDS - The sort fields of the search.
     * Array format: [{"fieldName": "string", "sortType": ("Ascending" | "Descending")} ...]
     * @param {Array<JSON> | null} SEARCH_RESULT_FIELDS - The property fields you want to show
     * in the result. Array format: [{"name": "string"} ...]
     * @param {string | null} SIMILAR_ASSET_ID - When SimilarAssetId has a value, then the search 
     * results are a special type of results and bring back the items that are the most similar to 
     * the item represented here. This search is only enabled when Vector searching has been enabled.
     * When this has a value, the SearchQuery value and PageOffset values are ignored.
     * @param {number | null} MIN_SCORE - Specifies the minimum score to match when returning results. 
     * If omitted, the system default will be used - which is usually .65
     * @param {boolean | null} EXCLUDE_TOTAL_RECORD_COUNT - Normally, the total record count is 
     * returned but the query can be made faster if this value is excluded.
     * @param {string | null} FILTER_BINDER - The filter binder of the search. 0 = AND, 1 = OR.
     * @returns {Promise<JSON>} - A promise that resolves when the search is complete.
     * Returns the information of the search.
     * @throws {Error} - An error is thrown if the assets fail to search.
     */ 
    async search(QUERY, OFFSET, SIZE, FILTERS, SORT_FIELDS, SEARCH_RESULT_FIELDS, SIMILAR_ASSET_ID, 
        MIN_SCORE, EXCLUDE_TOTAL_RECORD_COUNT, FILTER_BINDER)
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Searching...`);

        try
        {
            const SEARCH_INFO = await _search(this.token, this.config.serviceApiUrl, QUERY, OFFSET, 
                SIZE, FILTERS, SORT_FIELDS, SEARCH_RESULT_FIELDS, SIMILAR_ASSET_ID, MIN_SCORE, 
                EXCLUDE_TOTAL_RECORD_COUNT, FILTER_BINDER, this.config.apiType, this.debugMode);
            _printDatetime(`Search complete`);
            return SEARCH_INFO.hasItems ? SEARCH_INFO : false
        }
        catch (error)
        {
            _printDatetime(`Search failed`);
            throw error;
        }
    }

    // portal
    // account updates
    /**
     * @function changeEmail
     * @async
     * @description Changes the email of a user.
     * @param {string} EMAIL - The new email of the user.
     * @param {string} PASSWORD - The password of the user.
     * @returns {Promise<void>} - A promise that resolves when the email is changed.
     * @throws {Error} - An error is thrown if the email fails to change.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    
    async changeEmail(EMAIL, PASSWORD)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Changing email: ${EMAIL}`);

        try
        {
            await _changeEmail(this.token, this.config.serviceApiUrl, EMAIL, PASSWORD, 
                this.debugMode);
            _printDatetime(`Email changed: ${EMAIL}`);
        }
        catch (error)
        {
            _printDatetime(`Email failed to change: ${EMAIL}`);
            throw error;
        }
    }

    /**
     * @function changePassword
     * @async
     * @description Changes the password of a user.
     * @param {string} CURRENT_PASSWORD - The current password of the user.
     * @param {string} NEW_PASSWORD - The new password of the user.
     * @returns {Promise<void>} - A promise that resolves when the password is changed.
     * @throws {Error} - An error is thrown if the password fails to change.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    
    async changePassword(CURRENT_PASSWORD, NEW_PASSWORD)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Changing password`);

        try
        {
            await _changePassword(this.token, this.config.serviceApiUrl, CURRENT_PASSWORD, 
                NEW_PASSWORD, this.debugMode);
            _printDatetime(`Password changed`);
        }
        catch (error)
        {
            _printDatetime(`Password failed to change`);
            throw error;
        }
    }

    /**
     * @function getUser
     * @async
     * @description Gets a user.
     * @returns {Promise<JSON>} - A promise that resolves when the user is gotten.
     * Returns the information of the gotten user.
     * @throws {Error} - An error is thrown if the user fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    
    async getUser()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Getting user`);

        try
        {
            const GET_USER_INFO = await _getUser(this.token, this.config.serviceApiUrl, 
                this.debugMode);
            _printDatetime(`User gotten`);
            return GET_USER_INFO;
        }
        catch (error)
        {
            _printDatetime(`User failed to get`);
            throw error;
        }
    }

    /**
     * @function updateUser
     * @async
     * @description Updates a user.
     * @param {string | null} ADDRESS - The address of the user.
     * @param {string | null} ADDRESS2 - The address2 of the user.
     * @param {string | null} CITY - The city of the user.
     * @param {JSON | null} COUNTRY - The country of the user.
     * JSON format: {"id": "string", "name": "string"}
     * @param {string | null} FIRST_NAME - The first name of the user.
     * @param {string | null} LAST_NAME - The last name of the user.
     * @param {string | null} ORGANIZATION - The organization of the user.
     * @param {string | null} PHONE_NUMBER - The phone number of the user.
     * @param {string | null} PHONE_EXT - The phone extension of the user.
     * @param {string | null} POSTAL_CODE - The postal code of the user.
     * @param {string | null} STATE - The state of the user.
     * @returns {Promise<JSON>} - A promise that resolves when the user is updated.
     * Returns the information of the updated user.
     * @throws {Error} - An error is thrown if the user fails to update.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */

    async updateUser(ADDRESS, ADDRESS2, CITY, COUNTRY, FIRST_NAME, LAST_NAME, ORGANIZATION,
        PHONE_NUMBER, PHONE_EXT, POSTAL_CODE, STATE)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Updating user`);

        try
        {
            const UPDATE_USER_INFO = await _updateUser(this.token, this.config.serviceApiUrl, 
                ADDRESS, ADDRESS2, CITY, COUNTRY, FIRST_NAME, LAST_NAME, ORGANIZATION, PHONE_NUMBER, 
                PHONE_EXT, POSTAL_CODE, STATE, this.debugMode);
            _printDatetime(`User updated`);
            return UPDATE_USER_INFO;
        }
        catch (error)
        {
            _printDatetime(`User failed to update`);
            throw error;
        }
    }

    // content groups functions
    /**
     * @function addContentsToContentGroup
     * @async
     * @description Adds contents to a content group.
     * @param {string} CONTENT_GROUP_ID - The ID of the content group.
     * @param {Array<string>} CONTENTS_IDS - The content ids of the contents to add to the content group.
     * @returns {Promise<void>} - A promise that resolves when the contents are added to the content
     * group.
     * @throws {Error} - An error is thrown if the contents fail to add to the content group.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async addContentsToContentGroup(CONTENT_GROUP_ID, CONTENT_IDS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Adding content to content group: ${CONTENT_GROUP_ID}`);

        try
        {
            const ADD_CONTENT_TO_CONTENT_GROUP_INFO = await _addContentsToContentGroup(this.token, 
                this.config.serviceApiUrl, CONTENT_GROUP_ID, CONTENT_IDS, this.debugMode);
            _printDatetime(`Content added to content group: ${CONTENT_GROUP_ID}`);
            return ADD_CONTENT_TO_CONTENT_GROUP_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content failed to add to content group: ${CONTENT_GROUP_ID}`);
            throw error;
        }
    }

    /**
     * @function createContentGroup
     * @async
     * @description Creates a content group.
     * @param {string | null} NAME - The name of the content group. If set to null, the default name
     * "My Collection" will be used.
     * @returns {Promise<JSON>} - A promise that resolves when the content group is created.
     * Returns the information of the created content group.
     * @throws {Error} - An error is thrown if the content group fails to create.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async createContentGroup(NAME)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Creating content group: ${NAME}`);

        try
        {
            const CREATE_CONTENT_GROUP_INFO = await _createContentGroup(this.token, 
                this.config.serviceApiUrl, NAME, this.debugMode);
            _printDatetime(`Content group created: ${NAME}`);
            return CREATE_CONTENT_GROUP_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content group failed to create: ${NAME}`);
            throw error;
        }
    }

    /**
     * @function deleteContentGroup
     * @async
     * @description Deletes a content group.
     * @param {string} CONTENT_GROUP_ID - The ID of the content group.
     * @returns {Promise<void>} - A promise that resolves when the content group is deleted.
     * @throws {Error} - An error is thrown if the content group fails to delete.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async deleteContentGroup(CONTENT_GROUP_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Deleting content group: ${CONTENT_GROUP_ID}`);

        try
        {
            const DELETE_CONTENT_GROUP_INFO = await _deleteContentGroup(this.token, 
                this.config.serviceApiUrl, CONTENT_GROUP_ID, this.debugMode);
            _printDatetime(`Content group deleted: ${CONTENT_GROUP_ID}`);
            return DELETE_CONTENT_GROUP_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content group failed to delete: ${CONTENT_GROUP_ID}`);
            throw error;
        }
    }

    /**
     * @function getContentGroup
     * @async
     * @description Gets a content group.
     * @param {string} CONTENT_GROUP_ID - The ID of the content group.
     * @returns {Promise<JSON>} - A promise that resolves when the content group is gotten.
     * Returns the information of the gotten content group. You can only see a content group if it
     * is shared with you, or if you are the owner of the content group.
     * @throws {Error} - An error is thrown if the content group fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async getContentGroup(CONTENT_GROUP_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Getting content group: ${CONTENT_GROUP_ID}`);

        try
        {
            const GET_CONTENT_GROUP_INFO = await _getContentGroup(this.token, 
                this.config.serviceApiUrl, CONTENT_GROUP_ID, this.debugMode);
            _printDatetime(`Content group gotten: ${CONTENT_GROUP_ID}`);
            return GET_CONTENT_GROUP_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content group failed to get: ${CONTENT_GROUP_ID}`);
            throw error;
        }
    }

    /**
     * @function getContentGroups
     * @async
     * @description Gets content groups.
     * @returns {Promise<JSON>} - A promise that resolves when the content groups are gotten.
     * Returns the information of the gotten content groups. You can only see a content group if it
     * is shared with you, or if you are the owner of the content group.
     * @throws {Error} - An error is thrown if the content groups fail to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async getContentGroups()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Getting content groups`);

        try
        {
            const GET_CONTENT_GROUPS_INFO = await _getContentGroups(this.token, 
                this.config.serviceApiUrl, this.debugMode);
            _printDatetime(`Content groups gotten`);
            return GET_CONTENT_GROUPS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content groups failed to get`);
            throw error;
        }
    }

    /**
     * @function getPortalGroups
     * @async
     * @description Gets portal groups.
     * @param {Array<string>} PORTAL_GROUPS - The portal groups to get. The portal groups are
     * contentGroups, sharedContentGroups, and savedSearches". You can only see a content group if it
     * is shared with you, or if you are the owner of the content group.
     * @returns {Promise<JSON>} - A promise that resolves when the portal groups are gotten.
     * Returns the information of the gotten portal groups.
     * @throws {Error} - An error is thrown if the portal groups fail to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async getPortalGroups(PORTAL_GROUPS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Getting portal groups`);

        try
        {
            const GET_PORTAL_GROUPS_INFO = await _getPortalGroups(this.token, 
                this.config.serviceApiUrl, PORTAL_GROUPS, this.debugMode);
            _printDatetime(`Portal groups gotten`);
            return GET_PORTAL_GROUPS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Portal groups failed to get`);
            throw error;
        }
    }

    /**
     * @function removeContentsFromContentGroup
     * @async
     * @description Removes contents from a content group.
     * @param {string} CONTENT_GROUP_ID - The ID of the content group.
     * @param {Array<string>} CONTENT_IDS - The content ids of the contents to remove from the
     * content group.
     * @returns {Promise<void>} - A promise that resolves when the contents are removed from the
     * content group.
     * @throws {Error} - An error is thrown if the contents fail to remove from the content group.
     * @throws {Error} - An error is thrown if the API type is not portal.s
     */
    async removeContentsFromContentGroup(CONTENT_GROUP_ID, CONTENTS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Removing content from content group: ${CONTENT_GROUP_ID}`);

        try
        {
            const REMOVE_CONTENT_FROM_CONTENT_GROUP_INFO = await _removeContentsFromContentGroup(
                this.token, this.config.serviceApiUrl, CONTENT_GROUP_ID, CONTENTS, this.debugMode);
            _printDatetime(`Content removed from content group: ${CONTENT_GROUP_ID}`);
            return REMOVE_CONTENT_FROM_CONTENT_GROUP_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content failed to remove from content group: ${CONTENT_GROUP_ID}`);
            throw error;
        }
    }

    /**
     * @function renameContentGroup
     * @async
     * @description Renames a content group.
     * @param {string} CONTENT_GROUP_ID - The ID of the content group.
     * @param {string} NAME - The name of the content group.
     * @returns {Promise<void>} - A promise that resolves when the content group is renamed.
     * @throws {Error} - An error is thrown if the content group fails to rename.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async renameContentGroup(CONTENT_GROUP_ID, NAME)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Renaming content group: ${CONTENT_GROUP_ID}`);

        try
        {
            const RENAME_CONTENT_GROUP_INFO = await _renameContentGroup(this.token, 
                this.config.serviceApiUrl, CONTENT_GROUP_ID, NAME, this.debugMode);
            _printDatetime(`Content group renamed: ${CONTENT_GROUP_ID}`);
            return RENAME_CONTENT_GROUP_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content group failed to rename: ${CONTENT_GROUP_ID}`);
            throw error;
        }
    }

    /**
     * @function shareContentGroupWithUsers
     * @async
     * @description Shares a content group with users. To share a content group with a user, the 
     * user must meet certain requirements. They must not be a guest user and their account must be 
     * in a normal state. Only the owner, the user who created the content group, can share the 
     * content group. The user the content group is being shared with cannot change the collection.
     * @param {string} CONTENT_GROUP_ID - The ID of the content group.
     * @param {Array<string>} USER_IDS - The user IDs to share the content group with.
     * @returns {Promise<void>} - A promise that resolves when the content group is shared with the
     * users.
     * @throws {Error} - An error is thrown if the content group fails to share with the users.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async shareContentGroupWithUsers(CONTENT_GROUP_ID, USER_IDS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Sharing content group with users: ${CONTENT_GROUP_ID}`);

        try
        {
            const SHARE_CONTENT_GROUP_WITH_USERS_INFO = await _shareContentGroupWithUsers(this.token, 
                this.config.serviceApiUrl, CONTENT_GROUP_ID, USER_IDS, this.debugMode);
            _printDatetime(`Content group shared with users: ${CONTENT_GROUP_ID}`);
            return SHARE_CONTENT_GROUP_WITH_USERS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content group failed to share with users: ${CONTENT_GROUP_ID}`);
            throw error;
        }
    }

    /**
     * @function stopSharingContentGroupWithUsers
     * @async
     * @description Stops sharing a content group with users.
     * @param {string} CONTENT_GROUP_ID - The ID of the content group.
     * @param {Array<string>} USER_IDS - The user IDs to stop sharing the content group with.
     * @returns {Promise<void>} - A promise that resolves when the content group is stopped sharing
     * with the users.
     * @throws {Error} - An error is thrown if the content group fails to stop sharing with the
     * users.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async stopSharingContentGroupWithUsers(CONTENT_GROUP_ID, USER_IDS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Stopping sharing content group with users: ${CONTENT_GROUP_ID}`);

        try
        {
            const STOP_SHARING_CONTENT_GROUP_WITH_USERS_INFO = await _stopSharingContentGroupWithUsers(
                this.token, this.config.serviceApiUrl, CONTENT_GROUP_ID, USER_IDS, this.debugMode);
            _printDatetime(`Content group stopped sharing with users: ${CONTENT_GROUP_ID}`);
            return STOP_SHARING_CONTENT_GROUP_WITH_USERS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content group failed to stop sharing with users: ${CONTENT_GROUP_ID}`);
            throw error;
        }
    }

    // media functions
    /**
     * @function clearWatchlist
     * @async
     * @description Clears the watchlist.
     * @returns {Promise<void>} - A promise that resolves when the watchlist is cleared.
     * @throws {Error} - An error is thrown if the watchlist fails to clear.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async clearWatchlist()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {   
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Clearing watchlist`);

        try
        {
            await _clearWatchlist(this.token, this.config.serviceApiUrl, this.id, this.debugMode);
            _printDatetime(`Watchlist cleared`);
        }
        catch (error)
        {
            _printDatetime(`Watchlist failed to clear`);
            throw error;
        }
    }

    /**
     * @function clearContinueWatching
     * @async
     * @description Delete continue watching markers.
     * @param {string | null} USER_ID - The user ID of the user to clear the continue watching list.
     * If not user Id is passed it clears the markers of the logged in user.
     * @param {string | null} ASSET_ID - The asset ID of the asset to clear the continue watching
     * list. If not asset Id is passed it clears the markers of all assets.
     * @returns {Promise<void>} - A promise that resolves when the continue watching list is cleared.
     * @throws {Error} - An error is thrown if the continue watching list fails to clear.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async clearContinueWatching(USER_ID, ASSET_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal") 
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Clearing continue watching`);

        try
        {
            await _clearContinueWatching(this.token, this.config.serviceApiUrl, USER_ID, ASSET_ID, 
                this.debugMode);
            _printDatetime(`Continue watching cleared`);
        }
        catch (error)
        {
            _printDatetime(`Continue watching failed to clear`);
            throw error;
        }
    }


    /**
     * @function createForm
     * @async
     * @description Gets media.
     * @param {string} CONTENT_DEFINITION_ID - The ID of the content definition the form
     * is going in.
     * @param {JSON} FORM_INFO - The information of the form.
     * JSON format: whatever key value pairs you want to add to the form.
     * @returns {Promise<JSON>} - A promise that resolves when the from is created.
     * Returns the id of the form.
     * @throws {Error} - An error is thrown if the media fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async createForm(CONTENT_DEFINITION_ID, FORM_INFO)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Creating form`);

        try
        {
            const GET_FORMS_INFO = await _createForm(this.token, this.config.serviceApiUrl, 
                CONTENT_DEFINITION_ID, FORM_INFO, this.debugMode);
            _printDatetime(`Form created`);
            return GET_FORMS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Form failed to create`);
            throw error;
        }
    }

    /**
     * @function getContentCookies
     * @async
     * @description Gets content cookies.
     * @param {string} CONTENT_ID - The Id of the content to retrieve the cookies for. 
     * This can be the ID for the content definition of the LiveChannel, or a folder asset 
     * ID or a specific Asset ID.
     * @returns {Promise<JSON>} - A promise that resolves when the content cookies are gotten.
     * Returns the information of the gotten content cookies.
     * @throws {Error} - An error is thrown if the content cookies fail to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async getContentCookies(CONTENT_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
              throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Getting content cookies`);

        try
        {
            const GET_CONTENT_COOKIES_INFO = await _getContentCookies(this.token, 
                this.config.serviceApiUrl, CONTENT_ID, this.debugMode);
            _printDatetime(`Content cookies gotten`);
            return GET_CONTENT_COOKIES_INFO;
        }
        catch (error)
        {
            _printDatetime(`Content cookies failed to get`);
            throw error;
        }
    }

    /**
     * @function getDefaultSiteConfig
     * @async
     * @description Gets default site config.
     * @returns {Promise<Array<JSON>>} - A promise that resolves when the default site config is gotten.
     * Returns the information of the gotten dynamic content.
     * @throws {Error} - An error is thrown if the dynamic content fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async getDefaultSiteConfig()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Getting default site config`);

        try
        {
            const GET_DYNAMIC_CONTENTS_INFO = await _getDefaultSiteConfig(this.token, 
                this.config.serviceApiUrl, this.debugMode);
            _printDatetime(`Default site config gotten`);
            return GET_DYNAMIC_CONTENTS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Default site config failed to get`);
            throw error;
        }
    }

    /**
     * @function getDynamicContent
     * @async
     * @description Gets dynamic content.
     * @param {string} DYNAMIC_CONTENT_RECORD_ID - The dynamic content record ID.
     * @returns {Promise<JSON>} - A promise that resolves when the dynamic content is gotten.
     * Returns the information of the gotten dynamic content.
     * @throws {Error} - An error is thrown if the dynamic content fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async getDynamicContent(DYNAMIC_CONTENT_RECORD_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Getting dynamic content: ${DYNAMIC_CONTENT_RECORD_ID}`);

        try
        {
            const GET_DYNAMIC_CONTENT_INFO = await _getDynamicContent(this.token, 
                this.config.serviceApiUrl, DYNAMIC_CONTENT_RECORD_ID, this.debugMode);
            _printDatetime(`Dynamic content gotten: ${DYNAMIC_CONTENT_RECORD_ID}`);
            return GET_DYNAMIC_CONTENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Dynamic content failed to get: ${DYNAMIC_CONTENT_RECORD_ID}`);
            throw error;
        }
    }

    /**
     * @function getDynamicContents
     * @async
     * @description Gets dynamic contents.
     * @returns {Promise<Array<JSON>>} - A promise that resolves when the dynamic contents is gotten.
     * Returns the information of the gotten dynamic content.
     * @throws {Error} - An error is thrown if the dynamic content fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async getDynamicContents()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Getting dynamic contents`);

        try
        {
            const GET_DYNAMIC_CONTENTS_INFO = await _getDynamicContents(this.token, 
                this.config.serviceApiUrl, this.debugMode);
            _printDatetime(`Dynamic contents gotten`);
            return GET_DYNAMIC_CONTENTS_INFO;
        }
        catch (error)
        {
            _printDatetime(`Dynamic contents failed to get`);
            throw error;
        }
    }

    /**
     * @function getMediaGroup
     * @async
     * @description Gets media.
     * @param {string} MEDIA_GROUP_ID - The ID of the media group.
     * @returns {Promise<JSON>} - A promise that resolves when the media group is gotten.
     * Returns the information of the gotten media group.
     * @throws {Error} - An error is thrown if the media group fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async getMediaGroup(MEDIA_GROUP_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Getting media group: ${MEDIA_GROUP_ID}`);

        try
        {
            const GET_MEDIA_GROUP_INFO = await _getMediaGroup(this.token, this.config.serviceApiUrl, 
                MEDIA_GROUP_ID, this.debugMode);
            _printDatetime(`Media group gotten: ${MEDIA_GROUP_ID}`);
            return GET_MEDIA_GROUP_INFO;
        }
        catch (error)
        {
            _printDatetime(`Media group failed to get: ${MEDIA_GROUP_ID}`);
            throw error;
        }
    }

    /**
     * @function getMediaItem
     * @async
     * @description Gets media.
     * @param {string} MEDIA_ITEM_ID - The ID of the media item.
     * @returns {Promise<JSON>} - A promise that resolves when the media item is gotten.
     * Returns the information of the gotten media item.
     * @throws {Error} - An error is thrown if the media item fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async getMediaItem(MEDIA_ITEM_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Getting media item: ${MEDIA_ITEM_ID}`);

        try
        {
            const GET_MEDIA_ITEM_INFO = await _getMediaItem(this.token, this.config.serviceApiUrl, 
                MEDIA_ITEM_ID, this.debugMode);
            _printDatetime(`Media item gotten: ${MEDIA_ITEM_ID}`);
            return GET_MEDIA_ITEM_INFO;
        }
        catch (error)
        {
            _printDatetime(`Media item failed to get: ${MEDIA_ITEM_ID}`);
            throw error;
        }
    }

    /**
     * @function getMyContent
     * @async
     * @description Gets favorites and continue watching lists of IDs for the logged in user.
     * @returns {Promise<JSON>} - A promise that resolves when the favorites and continue watching
     * lists of IDs are gotten.
     * Returns the information of the gotten favorites and continue watching lists of IDs.
     * @throws {Error} - An error is thrown if the favorites and continue watching lists of IDs fail
     * to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async getMyContent()
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is not available for portal API type.");
        }

        _printDatetime(`Getting my content`);

        try
        {
            const GET_MY_CONTENT_INFO = await _getMyContent(this.token, this.config.serviceApiUrl, 
                this.debugMode);
            _printDatetime(`My content gotten`);
            return GET_MY_CONTENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`My content failed to get`);
            throw error;
        }
    }

    /**
     * @function getMyGroup
     * @async
     * @description Gets user's group.
     * @param {string} GROUP_ID - The ID of the group.
     * @returns {Promise<JSON>} - A promise that resolves when the user's group is gotten.
     * Returns the information of the gotten user's group.
     * @throws {Error} - An error is thrown if the user's group fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async getMyGroup(GROUP_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Getting my group: ${GROUP_ID}`);

        try
        {
            const GET_MY_GROUP_INFO = await _getMyGroup(this.token, this.config.serviceApiUrl, 
                GROUP_ID, this.debugMode);
            _printDatetime(`My group gotten: ${GROUP_ID}`);
            return GET_MY_GROUP_INFO;
        }
        catch (error)
        {
            _printDatetime(`My group failed to get: ${GROUP_ID}`);
            throw error;
        }
    }

    /**
     * @function getSiteConfig
     * @async
     * @description Gets site config.
     * @param {string} SITE_CONFIG_RECORD_ID - The site config record ID.
     * @returns {Promise<JSON>} - A promise that resolves when the site config is gotten.
     * Returns the information of the gotten site config.
     * @throws {Error} - An error is thrown if the site config fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async getSiteConfig(SITE_CONFIG_RECORD_ID)
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Getting site config: ${SITE_CONFIG_RECORD_ID}`);

        try
        {
            const GET_DYNAMIC_CONTENT_INFO = await _getSiteConfig(this.token, 
                this.config.serviceApiUrl, SITE_CONFIG_RECORD_ID, this.debugMode);
            _printDatetime(`Site config gotten: ${SITE_CONFIG_RECORD_ID}`);
            return GET_DYNAMIC_CONTENT_INFO;
        }
        catch (error)
        {
            _printDatetime(`Site config failed to get: ${SITE_CONFIG_RECORD_ID}`);
            throw error;
        }
    }

    /**
     * @function mediaSearch
     * @async
     * @description Searches for media.
     * @param {string | null} QUERY - The query of the search.
     * @param {Array<string> | null} IDS - The IDs of the media to be searched.
     * @param {Array<JSON> | null} SORT_FIELDS - The sort fields of the search.
     * JSON format: [{"fieldName": "string", "sortType": ("Ascending" | "Descending")} ...]
     * @param {int | null} OFFSET - The page offset of the search.
     * @param {int | null} SIZE - The page size of the search.
     * @returns {Promise<JSON>} - A promise that resolves when the media are searched.
     * Returns the information of the searched media.
     * @throws {Error} - An error is thrown if the media fail to search.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async mediaSearch(QUERY, IDS, SORT_FIELDS, OFFSET, SIZE)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Searching media...`);

        try
        {
            const MEDIA_SEARCH_INFO = await _mediaSearch(this.token, this.config.serviceApiUrl, 
                QUERY, IDS, SORT_FIELDS, OFFSET, SIZE, this.debugMode);
            _printDatetime(`Media search complete`);
            return MEDIA_SEARCH_INFO;
        }
        catch (error)
        {
            _printDatetime(`Media search failed`);
            throw error;
        }
    }

    // guest registration function
    /**
     * @function guestInvite
     * @async
     * @description Invites a guest.
     * @param {string | null} CONTENT_ID - The ID of the content to be shared to the user.
     * @param {string | null} CONTENT_DEFINITION_ID - The ID of the content definition 
     * to be shared to the user.
     * @param {Array<string>} EMAILS - The email(s) of the guest.
     * @param {string} CONTENT_SECURITY_ATTRIBUTE - The content security attribute of the guest.
     * The content security attribute can be "Undefined", "Guest", or "Demo".
     * @returns {Promise<void>} - A promise that resolves when the guest is invited.
     * Returns the information of the invited guest.
     * @throws {Error} - An error is thrown if the guest fails to invite.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async guestInvite(CONTENT_ID, CONTENT_DEFINITION_ID, EMAILS, CONTENT_SECURITY_ATTRIBUTE)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Inviting guest`);

        try
        {
            const GUEST_INVITE_INFO = await _guestInvite(this.token, this.config.serviceApiUrl, 
                CONTENT_ID, CONTENT_DEFINITION_ID, this.id, EMAILS, CONTENT_SECURITY_ATTRIBUTE, 
                this.debugMode);
            _printDatetime(`Guest invited`);
            return GUEST_INVITE_INFO;
        }
        catch (error)
        {
            _printDatetime(`Guest failed to invite: ${CONTENT_ID}`);
            throw error;
        }
    }

    /**
     * @function participantPanelQuery
     * @async
     * @description Queries a participant panel.
     * @returns {Promise<JSON>} - A promise that resolves when the participant panel is queried.
     * Returns the information of the queried participant panel.
     * @throws {Error} - An error is thrown if the participant panel fails to query.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async participantPanelQuery()
    {
        if (this.token === null)
        {
            await this._init();
        }

        _printDatetime(`Querying participant panel`);

        try
        {
            const PARTICIPANT_PANEL_QUERY_INFO = await _participantPanelQuery(this.token, 
                this.config.serviceApiUrl, this.config.apiType, this.id, this.debugMode);
            _printDatetime(`Participant panel queried`);
            return PARTICIPANT_PANEL_QUERY_INFO;
        }
        catch (error)
        {
            _printDatetime(`Participant panel failed to query`);
            throw error;
        }
    }

    /**
     * @function registerGuest
     * @async
     * @description Registers a guest.
     * @param {string} EMAIL - The email of the guest.
     * @param {string} FIRST_NAME - The first name of the guest.
     * @param {string} LAST_NAME - The last name of the guest.
     * @param {string} PASSWORD - The password of the guest.
     * @returns {Promise<JSON>} - A promise that resolves when the guest is registered.
     * Returns the information of the registered guest.
     * @throws {Error} - An error is thrown if the guest fails to register.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async registerGuest(EMAIL, FIRST_NAME, LAST_NAME, PASSWORD)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Registering guest: ${EMAIL}`);

        try
        {
            const REGISTER_GUEST_INFO = await _registerGuest(this.token, this.config.serviceApiUrl, EMAIL, 
                FIRST_NAME, LAST_NAME, PASSWORD, this.debugMode);
            _printDatetime(`Guest registered: ${EMAIL}`);
            return REGISTER_GUEST_INFO;
        }
        catch (error)
        {
            _printDatetime(`Guest failed to register: ${EMAIL}`);
            throw error;
        }
    }

    /**
     * @function removeGuest
     * @async
     * @description Removes a guest.
     * @param {string | null} CONTENT_ID - The ID of the content.
     * @param {string | null} CONTENT_DEFINITION_ID - The ID of the content definition.
     * @param {Array<string>} EMAILS - The email(s) of the guest.
     * @param {string} CONTENT_SECURITY_ATTRIBUTE - The content security attribute of the guest.
     * @returns {Promise<void>} - A promise that resolves when the guest is removed.
     * Returns the information of the removed guest.
     * @throws {Error} - An error is thrown if the guest fails to remove.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */
    async removeGuest(CONTENT_ID, CONTENT_DEFINITION_ID, EMAILS, CONTENT_SECURITY_ATTRIBUTE)
    {
        if (this.token === null)
        {
            await this._init();
        }
        
        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }

        _printDatetime(`Removing guest`);

        try
        {
            const REMOVE_GUEST_INFO = await _removeGuest(this.token, this.config.serviceApiUrl, 
                CONTENT_ID, CONTENT_DEFINITION_ID, this.id, EMAILS, CONTENT_SECURITY_ATTRIBUTE, 
                this.debugMode);
            _printDatetime(`Guest removed`);
            return REMOVE_GUEST_INFO;
        }
        catch (error)
        {
            _printDatetime(`Guest failed to remove: ${CONTENT_ID}`);
            throw error;
        }
    }

    // video tracking functions
    /**
     * @function getVideoTracking
     * @async
     * @description Gets video tracking.
     * @param {string} ASSET_ID - The ID of the asset.
     * @param {string} TRACKING_EVENT - The tracking event of the asset. The value of tracking 
     * event's value can be 0-5 with 0 being no tracking event, 1-4 being the progress in quarters, 
     * i.e 3 meaning it is tracking 3 quarters of the video, and 5 meaning that the tracking is 
     * hidden.
     * @param {int | null} SECONDS - The seconds into the video being tracked.
     * @returns {Promise<JSON>} - A promise that resolves when the video tracking is gotten.
     * Returns the information of the gotten video tracking.
     * @throws {Error} - An error is thrown if the video tracking fails to get.
     * @throws {Error} - An error is thrown if the API type is not portal.
     */ 
    async getVideoTracking(ASSET_ID, TRACKING_EVENT, SECONDS)
    {
        if (this.token === null)
        {
            await this._init();
        }

        if (this.config.apiType !== "portal")
        {
            throw new Error("This function is only available for portal API type.");
        }
        
        _printDatetime(`Getting video tracking: ${ASSET_ID}`);

        try
        {
            await _getVideoTracking(this.token, 
                this.config.serviceApiUrl, ASSET_ID, TRACKING_EVENT, SECONDS, this.debugMode);
            _printDatetime(`Video tracking gotten: ${ASSET_ID}`);
        }
        catch (error)
        {
            _printDatetime(`Video tracking failed to get: ${ASSET_ID}`);
            throw error;
        }
    }

    // misc functions
    /**
     * @function miscFunctons
     * @async
     * @description Calls any nomad function given URL method and body.
     * @param {string} URL_PATH - The URL path of the function.
     * @param {string} METHOD - The method of the function.
     * @param {JSON | null} BODY - The body of the api call.
     * @param {boolean | null} NOT_API_PATH - If the path has /api.
     * @returns {Promise<JSON>} - A promise that resolves when the function is called.
     * Returns the information of the called function.
     * @throws {Error} - An error is thrown if the function fails to call.
     */

    async miscFunctions(URL_PATH, METHOD, BODY, NOT_API_PATH)
    {
        if (this.token === null)
        {
            await this._init();
        }

        try
        {
            let API_URL = `${this.config.serviceApiUrl}/${URL_PATH}`;
            if (NOT_API_PATH) {
                API_URL = API_URL.replace('/api', '');
                API_URL = API_URL.replace('app-api.', '');
                API_URL = API_URL.replace('admin-app', '');
            }

            const HEADERS = new Headers();
            HEADERS.append("Content-Type", "application/json");
            HEADERS.append("Authorization", `Bearer ${this.token}`);

            if (this.debugMode) 
            {
                console.log(`URL: ${API_URL}\nMETHOD: ${METHOD}`);
                if (BODY) console.log(`BODY: ${JSON.stringify(BODY, null, 4 )}`);
            }

            const REQUEST = {
                method: METHOD,
                headers: HEADERS
            };
            if (BODY) {
                REQUEST.body = JSON.stringify(BODY);
            }

            const RESPONSE = await fetch(API_URL, REQUEST);

            if (!RESPONSE.ok)
            {
                throw await RESPONSE.json();
            }

            return await RESPONSE.json();
        }
        catch (error)
        {
            _apiExceptionHandler(error, "API call failed");
        }
    }
}

export default new NomadSDK(config);



async function _cancelUpload(AUTH_TOKEN, URL, ID, DEBUG_MODE)
{

    const API_URL = `${URL}/asset/upload/${ID}/cancel`

    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error,"Cancel asset upload failed");
    }
}





const MAX_CONCURRENT_PROMISES = 8;

async function _multiThreadUpload(AUTH_TOKEN, URL, FILE, UPLOAD_RESPONSE, DEBUG_MODE) {
    const PARTS = UPLOAD_RESPONSE.parts;
    const LENGTH = PARTS.length;

    for (let INDEX = 0; INDEX < LENGTH; INDEX += MAX_CONCURRENT_PROMISES) {
        const batch = PARTS.slice(INDEX, INDEX + MAX_CONCURRENT_PROMISES);
        const batchPromises = batch.map(async (PART, INDEX) => {
            console.log(`Uploading part ${INDEX + 1} of ${LENGTH}...`);
            const ETAG = await _uploadPart(FILE, PART, DEBUG_MODE);
            await _uploadPartComplete(AUTH_TOKEN, URL, PART.id, ETAG, DEBUG_MODE);
            console.log(`Uploaded part ${INDEX + 1} of ${LENGTH} successfully`);
        });

        await Promise.all(batchPromises);
    }
}




async function _startUpload(AUTH_TOKEN, URL, NAME, EXISTING_ASSET_ID, RELATED_ASSET_ID, 
    CREATE_TRANSCRIBE_RELATED_ASSET, RELATED_CONTENT_ID, LANGUAGE_ID, UPLOAD_OVERWRITE_OPTION, 
    FILE, PARENT_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/asset/upload/start`;

    const AWS_MIN_LIMIT = 5242880;
    let chunkSize = FILE.size / 10000;
    
    if (chunkSize < (AWS_MIN_LIMIT * 4))
    {
        chunkSize = 20971520;
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        displayName: NAME || FILE.originalname,
        contentLength: FILE.size,
        uploadOverwriteOption: UPLOAD_OVERWRITE_OPTION,
        relativePath: FILE.originalname,
        parentId: PARENT_ID,
        chunkSize: chunkSize,
        relatedContentId: RELATED_CONTENT_ID,
        languageId: LANGUAGE_ID,
        existingAssetId: EXISTING_ASSET_ID,
        relatedAssetId: RELATED_ASSET_ID,
        createTranscribeRelatedAsset: CREATE_TRANSCRIBE_RELATED_ASSET
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json();
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Start Upload Failed");
    }
}




async function _completeUpload(AUTH_TOKEN, URL, ASSET_UPLOAD_ID, DEBUG_MODE) 
{
	const API_URL = `${URL}/asset/upload/${ASSET_UPLOAD_ID}/complete`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
  	HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
      	const RESPONSE = await fetch(API_URL, {
      	    method: "POST",
      	    headers: HEADERS
      	});
	  
		if (!RESPONSE.ok)
		{
			throw await RESPONSE.json();
		}
		
		return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Complete Upload Failed");
    }
}




async function _uploadPartComplete(AUTH_TOKEN, URL, PART_ID, ETAG, DEBUG_MODE) 
{
    const API_URL = `${URL}/asset/upload/part/${PART_ID}/complete`;

    // Build the payload body
    const BODY = { etag: ETAG };

    // Create header for the request
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json();
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Upload Part Complete Failed");
    }
}




import { Buffer } from "buffer";

async function _uploadPart(FILE, PART, DEBUG_MODE, maxRetries = 3) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const BUFFER = Buffer.from(FILE.buffer, 'binary');
            const BODY = BUFFER.toString("binary").slice(PART.startingPostion, PART.endingPosition + 1);

            // Create header for the request
            const HEADERS = new Headers();
            HEADERS.append("Accept", "application/json, text/plain, */*");

            if (DEBUG_MODE) console.log(`URL: ${PART.url}\nMETHOD: POST`);

            const RESPONSE = await fetch(PART.url, {
                method: "PUT",
                headers: HEADERS,
                body: BODY
            });

            if (!RESPONSE.ok) {
                throw await RESPONSE.json();
            }

            return RESPONSE.headers.get("ETag");
            
        } catch (error) {
            if (attempt < maxRetries - 1) {
                // Retry if there are more attempts left
                console.error(`Upload attempt ${attempt + 1} failed. Retrying...`);
            } else {
                // No more retries left, handle the error
                _apiExceptionHandler(error, "Upload Part Failed");
                break;
            }
        }
    }
}





async function _addCustomProperties(AUTH_TOKEN, URL, ID, NAME, DATE, 
    CUSTOM_PROPERTIES, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/asset/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    // Payload
    const BODY = {
        displayName: NAME,
        displayDate: DATE,
        customProperties: CUSTOM_PROPERTIES
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PATCH\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Adding Custom Properties Failed");
    }
}




async function _addRelatedContent(AUTH_TOKEN, URL, CONTENT_ID, RELATED_CONTENT_ID, 
    CONTENT_DEFINITION, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/related`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    // Payload
    const BODY = {
        items: [
            {
                contentDefinition: CONTENT_DEFINITION,
                contentId: CONTENT_ID,
                relatedContentId: RELATED_CONTENT_ID
            }
        ]
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Adding Related Content Failed");
    }
}




async function _addTagOrCollection(AUTH_TOKEN, URL, TYPE, CONTENT_ID, CONTENT_DEFINITION, 
    TAG_NAME, TAG_ID, CREATE_NEW, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/${TYPE}/content`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        items: [
            {
                contentDefinition: CONTENT_DEFINITION,
                contentId: CONTENT_ID,
                name: TAG_NAME,
                createNew: CREATE_NEW
            }
        ]
    };

    if (TAG_ID != null)
    {
        BODY.items[0][`${TYPE}Id`] = TAG_ID;
    }

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Adding Tag or Collection Failed");
    }
}




async function _createTagOrCollection(AUTH_TOKEN, URL, TYPE, TAG_NAME, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/${TYPE}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        name: TAG_NAME,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Adding Tag or Collection Failed");
    }
}




async function _deleteRelatedContent(AUTH_TOKEN, URL, CONTENT_ID, RELATED_CONTENT_ID, 
    CONTENT_DEFINITION, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/related/delete`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        items: [
            {
                contentDefinition: CONTENT_DEFINITION,
                contentId: CONTENT_ID,
                relatedContentId: RELATED_CONTENT_ID
            }
        ]
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Deleting Related Content Failed");
    }
}




async function _deleteTagOrCollection(AUTH_TOKEN, URL, TYPE, TAG_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/admin/${TYPE}/${TAG_ID}`;

    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    
    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete Tag or Collection Failed");
    }
}




async function _getTagOrCollection(AUTH_TOKEN, URL, TYPE, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/${TYPE}/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Getting Tag or Collection Failed");
    }
}




async function _removeTagOrCollection(AUTH_TOKEN, URL, TYPE, CONTENT_ID, 
    CONTENT_DEFINITION_ID, TAG_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/${TYPE}/content/delete`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        items: [
            {
                contentDefinition: CONTENT_DEFINITION_ID,
                contentId: CONTENT_ID
            }
        ]
    };

    BODY.items[0][`${TYPE}Id`] = TAG_ID;
    
    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Removing Tag or Collection Failed");
    }
}




async function _createContent(AUTH_TOKEN, URL, CONTENT_DEFINITION_ID, LANGUAGE_ID, DEBUG_MODE) 
{
    let apiUrl = `${URL}/content/new?contentDefinitionId=${CONTENT_DEFINITION_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (LANGUAGE_ID) apiUrl += `&language=${LANGUAGE_ID}`;

    if (DEBUG_MODE) console.log(`URL: ${apiUrl}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(apiUrl, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json();
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Content Failed");
    }
}




async function _deleteContent(AUTH_TOKEN, URL, CONTENT_ID, 
    CONTENT_DEFINITION_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/content/${CONTENT_ID}?contentDefinitionId=${CONTENT_DEFINITION_ID}`;

    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    try
    {
        if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

        const RESPONSE = await fetch(API_URL, {
            method: "DELETE",
            headers: HEADERS
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete Content Failed");
    }
}




async function _getContent(AUTH_TOKEN, URL, CONTENT_ID, CONTENT_DEFINITION_ID, 
    IS_REVISION, DEBUG_MODE) 
{
    
    let API_URL = `${URL}/content/${CONTENT_ID}?contentDefinitionId=${CONTENT_DEFINITION_ID}`
    
    if (IS_REVISION)
    {
        API_URL += `&isRevision=${IS_REVISION}`
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Content Failed");
    }
}




import deepEqual from "deep-equal";

async function _updateContent(AUTH_TOKEN, URL, CONTENT_ID, CONTENT_DEFINITION_ID,
    PROPERTIES, LANGUAGE_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/content/${CONTENT_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    let body = null;
    try
    {
        body = await _getContent(AUTH_TOKEN, URL, CONTENT_ID, CONTENT_DEFINITION_ID, 
            null, DEBUG_MODE);

        
        if (body.contentDefinitionId !== CONTENT_DEFINITION_ID) body.contentDefinitionId = CONTENT_DEFINITION_ID;
        if (body.contentId !== CONTENT_ID) body.contentId = CONTENT_ID;
        if (body.languageId !== LANGUAGE_ID) body.languageId = LANGUAGE_ID;

        _updateProperties(body, PROPERTIES);
    }
    catch (error)
    {
        body = {
            contentDefinitionId: CONTENT_DEFINITION_ID,
            contentId: CONTENT_ID,
            languageId: LANGUAGE_ID,
            properties: PROPERTIES
        }
    }
    
    // Debug mode
    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(body, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(body),
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Update Content Failed");
    }
}

function _updateProperties(body, properties) {
    for (const property in properties) {
        if (Array.isArray(properties[property])) 
        {
            for (let i = 0; i < properties[property].length; ++i) 
            {
                if (!deepEqual(body.properties[property][i], properties[property][i])) 
                {
                    body.properties[property][i] = properties[property][i];
                }
            }
        } 
        else if (typeof properties[property] === 'object') 
        {
            if (!deepEqual(body.properties[property], properties[property])) 
            {
                body.properties[property] = properties[property];
            }
        }
        else if (body.properties[property] !== properties[property]) 
        {
            body.properties[property] = properties[property];
        }
    }
}





async function _addLiveScheduleToEvent(AUTH_TOKEN, URL, EVENT_ID, SLATE_VIDEO, 
    PREROLL_VIDEO, POSTROLL_VIDEO, IS_SECURE_OUTPUT, ARCHIVE_FOLDER_ASSET, 
    PRIMARY_LIVE_INPUT, BACKUP_LIVE_INPUT, PRIMARY_LIVESTREAM_INPUT_URL, 
    BACKUP_LIVESTREAM_INPUT_URL, EXTERNAL_OUTPUT_PROFILES, DEBUG_MODE)
{
    const API_URL = `${URL}/admin/liveSchedule`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        contentId: EVENT_ID,
        slateVideo: (SLATE_VIDEO !== null) ? SLATE_VIDEO : "",
        prerollVideo: (PREROLL_VIDEO !== null) ? PREROLL_VIDEO : "",
        postrollVideo: (POSTROLL_VIDEO !== null) ? POSTROLL_VIDEO : "",
        isSecureOutput: (IS_SECURE_OUTPUT !== null) ? IS_SECURE_OUTPUT : false,
        archiveFolderAsset: (ARCHIVE_FOLDER_ASSET !== null) ? ARCHIVE_FOLDER_ASSET : "",
        primaryLiveInput: (PRIMARY_LIVE_INPUT !== null) ? PRIMARY_LIVE_INPUT : "",
        backupLiveInputId: (BACKUP_LIVE_INPUT !== null) ? BACKUP_LIVE_INPUT : "",
        primaryLivestreamInputUrl: (PRIMARY_LIVESTREAM_INPUT_URL !== null) ? PRIMARY_LIVESTREAM_INPUT_URL : "",
        backupLivestreamInputUrl: (BACKUP_LIVESTREAM_INPUT_URL !== null) ? BACKUP_LIVESTREAM_INPUT_URL : "",
        externalOutputProfiles: (EXTERNAL_OUTPUT_PROFILES !== null) ? EXTERNAL_OUTPUT_PROFILES : ""
    }

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Adding Live Schedule to Event Failed");
    }
}





async function _createAndUpdateEvent(AUTH_TOKEN, URL, CONTENT_ID,
    CONTENT_DEFINITION_ID, NAME, SERIES, START_DATETIME, END_DATETIME, PRIMARY_PERFORMER, 
    SHORT_DESCRIPTION, LONG_DESCRIPTION, THUMBNAIL_IMAGE, HERO_IMAGE, LOGO_IMAGE, 
    INTELLIGENT_PROGRAM, EXTERNAL_URL, VENUE, PERFORMERS, GENRES, MEDIA_ATTRIBUTES, 
    LANGUAGES, PRODUCTS, FEATURED_GROUPS, GROUP_SEQUENCE, RELATED_MEDIA_ITEMS, 
    RECOMMENDED_SIMILAR_ITEMS, CONTENT_RATINGS, IS_DISABLED, LIVE_CHANNEL, DEBUG_MODE)
{
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (CONTENT_ID === null)
    {
        const GET_API_URL = `${URL}/content/new?contentDefinitionId=${CONTENT_DEFINITION_ID}`;

        if (DEBUG_MODE) console.log(`URL: ${GET_API_URL}\nMETHOD: GET`);

        try
        {
            const RESPONSE = await fetch(GET_API_URL, {
                method: "GET",
                headers: HEADERS
            });

            // Check for success
            if (!RESPONSE.ok) {
                throw await RESPONSE.json()
            }

            const INFO = await RESPONSE.json();
            CONTENT_ID = INFO.contentId
        }
        catch (error)
        {
            _apiExceptionHandler(error, "Get Content ID Failed");
        }
    }
    
    const API_URL = `${URL}/content/${CONTENT_ID}`;

    const BODY = {
        contentId: CONTENT_ID,
        contentDefinitionId : CONTENT_DEFINITION_ID,
        properties: {
            contentRatings: (CONTENT_RATINGS !== null) ? CONTENT_RATINGS : "",
            disabled: (IS_DISABLED !== null) ? IS_DISABLED : false,
            endDatetime: END_DATETIME,
            externalUrl: (EXTERNAL_URL !== null) ? EXTERNAL_URL : "",
            featuredGroups: (FEATURED_GROUPS !== null) ? FEATURED_GROUPS : [],
            genres: (GENRES !== null) ? GENRES : [],
            groupSequence: (GROUP_SEQUENCE !== null) ? GROUP_SEQUENCE : "",
            heroImage: (HERO_IMAGE !== null) ? HERO_IMAGE : "",
            intelligentProgram: (INTELLIGENT_PROGRAM !== null) ? INTELLIGENT_PROGRAM : "",
            languages: (LANGUAGES !== null) ? LANGUAGES : [],
            liveChannel: (LIVE_CHANNEL !== null) ? LIVE_CHANNEL : "",
            logoImage: (LOGO_IMAGE !== null) ? LOGO_IMAGE : "",
            longDescription: (LONG_DESCRIPTION !== null) ? LONG_DESCRIPTION : "",
            mediaAttributes: (MEDIA_ATTRIBUTES !== null) ? MEDIA_ATTRIBUTES : [],
            name: NAME,
            performers: (PERFORMERS !== null) ? PERFORMERS : [],
            primaryPerformer: (PRIMARY_PERFORMER !== null) ? PRIMARY_PERFORMER : "",
            products: (PRODUCTS !== null) ? PRODUCTS : [],
            recommendationSimilarItems: (RECOMMENDED_SIMILAR_ITEMS !== null) ? RECOMMENDED_SIMILAR_ITEMS : [],
            relatedMediaItems: (RELATED_MEDIA_ITEMS !== null) ? RELATED_MEDIA_ITEMS : [],
            routeName : _slugify(NAME),
            series: (SERIES !== null) ? SERIES : "",
            shortDescription: (SHORT_DESCRIPTION !== null) ? SHORT_DESCRIPTION : "",
            startDatetime: START_DATETIME,
            thumbnailImage: (THUMBNAIL_IMAGE !== null) ? THUMBNAIL_IMAGE : "",
            venue: (VENUE !== null) ? VENUE : ""
        }
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });
    
        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create and Update Event Instance Failed");
    }
}




async function _deleteEvent(AUTH_TOKEN, URL, ID, CONTENT_DEFINITION_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/content/${ID}?contentDefinitionId=${CONTENT_DEFINITION_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete Event Failed");
    }
}




async function _extendLiveSchedule(AUTH_TOKEN, URL, EVENT_ID, RECURRING_DAYS, RECURRING_WEEKS,
    END_DATE, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/liveSchedule/content/${EVENT_ID}/copy`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        endDate: (END_DATE !== null) ? END_DATE : "",
        recurringDays: RECURRING_DAYS,
        recurringWeeks: RECURRING_WEEKS,
        timeZoneOffsetSeconds: new Date().getTimezoneOffset() * -60
        
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Extending Live Schedule Failed");
    }
}




async function _getLiveSchedule(AUTH_TOKEN, URL, EVENT_ID, DEBUG_MODE) 
{
  	const API_URL = `${URL}/admin/liveSchedule/content/${EVENT_ID}`;

  	// Create header for the request
  	const HEADERS = new Headers();
  	HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

  	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

	try 
	{
		const RESPONSE = await fetch(API_URL, {
			method: "GET",
			headers: HEADERS
		});

		if (!RESPONSE.ok) {
			throw await RESPONSE.json();
		}

		try
		{
			return await RESPONSE.json();
		}
		catch (error)
		{
			return false;
		}
	}
	catch (error) 
	{
  	  	_apiExceptionHandler(error, "Get Live Schedule Failed");
  	}
}




async function _startLiveSchedule(AUTH_TOKEN, URL, EVENT_ID, DEBUG_MODE) 
{
  	const API_URL = `${URL}/admin/liveSchedule/content/${EVENT_ID}/start`;

  	// Create header for the request
  	const HEADERS = new Headers();
  	HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  	HEADERS.append("Content-Type", "application/json");

  	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

  	try {
  	  	const RESPONSE = await fetch(API_URL, {
  	  	  	method: "POST",
  	  	  	headers: HEADERS
  	  	});
      
  	  	if (!RESPONSE.ok) {
  	  	    throw await RESPONSE.json();
  	  	}
  	} 
    catch (error) 
    {
  	  	_apiExceptionHandler(error, "Start Live Schedule Failed");
  	}
}




async function _stopLiveSchedule(AUTH_TOKEN, URL, EVENT_ID, DEBUG_MODE) 
{
  	const API_URL = `${URL}/admin/liveSchedule/content/${EVENT_ID}/stop`;

  	// Create header for the request
  	const HEADERS = new Headers();
  	HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  	HEADERS.append("Content-Type", "application/json");

  	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

  	try {
  	  	const RESPONSE = await fetch(API_URL, {
  	  	  	method: "POST",
  	  	  	headers: HEADERS
  	  	});
      
  	  	if (!RESPONSE.ok) {
  	  	  throw await RESPONSE.json();
  	  	}
  	} 
    catch (error) 
    {
  	  	_apiExceptionHandler(error, "Stop Live Schedule Failed");
  	}
}









async function _createLiveChannel(AUTH_TOKEN, URL, NAME, THUMBNAIL_IMAGE_ID, ARCHIVE_FOLDER_ASSET_ID,
    ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, IS_OUTPUT_SCREENSHOTS, 
    TYPE, EXTERNAL_URL, EXTERNAL_OUTPUT_PROFILES, SECURITY_GROUPS, DEBUG_MODE) 
{
    const API_URL = `${URL}/liveChannel`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        name: NAME,
        routeName: _slugify(NAME),
        enableHighAvailability: ENABLE_HIGH_AVAILABILITY,
        enableLiveClipping: ENABLE_LIVE_CLIPPING,
        externalOutputProfiles: EXTERNAL_OUTPUT_PROFILES,
        isSecureOutput: IS_SECURE_OUTPUT,
        outputScreenshots: IS_OUTPUT_SCREENSHOTS,
        type: { 
            id: _LIVE_CHANNEL_TYPES[TYPE],
            descrption: TYPE
        }
    };

    
    if (THUMBNAIL_IMAGE_ID)
    {
        BODY.thumbnailImage = { id: THUMBNAIL_IMAGE_ID };
    }

    if (ARCHIVE_FOLDER_ASSET_ID)
    {
        BODY.archiveFolderAsset = { id: ARCHIVE_FOLDER_ASSET_ID };
    }

    // Set the appropriate fields based on the channel type
    if (TYPE === "External") 
    {
        BODY.externalUrl = EXTERNAL_URL;
    }

    if (SECURITY_GROUPS) {
        const NOMAD_SECURITY_GROUPS = await _getSecurityGroups(AUTH_TOKEN, URL, DEBUG_MODE);

        BODY.securityGroups = NOMAD_SECURITY_GROUPS
            .filter(group => SECURITY_GROUPS.includes(group.description))
            .map(group => ({
                description: group.description,
                id: group.id
            }));
    }

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        // Check for success
        if (!RESPONSE.ok) 
        {
            throw await RESPONSE.json()
        }
        // Parse JSON response
        const INFO = await RESPONSE.json();

        // Wait for Live Channel to be idle if it was just created
        await _waitForLiveChannelStatus(AUTH_TOKEN, URL, INFO.id, _LIVE_CHANNEL_STATUSES.Idle, 120, 2, DEBUG_MODE);

        return INFO;
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Live Channel Failed");
    }
}







async function _deleteLiveChannel(AUTH_TOKEN, URL, CHANNEL_ID, DELETE_INPUTS, DEBUG_MODE)
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}`

    let INPUT_IDS = null;
    // If delete Live Inputs then get their IDs
    if (DELETE_INPUTS === true) 
    {
        if (DEBUG_MODE) 
        {
            console.log(`Getting Live Channel Inputs IDs...`);
        }
        INPUT_IDS = await _getLiveChannelInputsIds(AUTH_TOKEN, CHANNEL_ID);
    }
    else 
    {
        INPUT_IDS = null;
    }

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "DELETE",
            headers: HEADERS
        });

        // Check for success
        if (!RESPONSE.ok) 
        {
            throw await RESPONSE.json()
        }

        // If the Live Channel had Live Inputs
        if (DELETE_INPUTS && INPUT_IDS && INPUT_IDS.length > 0) {
            if (DEBUG_MODE) 
            {
                console.log(`Deleting Live Channel Live Inputs...`);
            }
            // Loop deleted Live Channel Live Inputs
            for (let index = 0; index < INPUT_IDS.length; index++) 
            {
                // Delete Live Input
                await _deleteLiveInput(AUTH_TOKEN, INPUT_IDS[index]);
            }
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete Live Channel Failed");
    }
}




async function _getLiveChannelInputsIds(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE) 
{
    // Declare empty array for the IDs
    const INPUT_IDS = [];

    // Get all the schedule events for the channel
    if (DEBUG_MODE) console.log(`Getting Live Channel Schedule Events...`);
    
    const CHANNEL_EVENTS = await _getLiveChannelScheduleEvents(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE);

    // If there are schedule events
    if (CHANNEL_EVENTS && CHANNEL_EVENTS.length > 0) {
        // Loop schedule events
        CHANNEL_EVENTS.forEach((SCHEDULE_EVENT) => 
        {
            // Check if schedule event is input type
            if (SCHEDULE_EVENT && SCHEDULE_EVENT.liveInput && SCHEDULE_EVENT.liveInput != null) {
                // If it has a valid lookupId add it to the array
                if (SCHEDULE_EVENT.liveInput.lookupId) {
                    INPUT_IDS.push(SCHEDULE_EVENT.liveInput.lookupId);
                }
            }
        });
    }

    // Return the array of inputs IDs
    return INPUT_IDS;
}





async function _getLiveChannelScheduleEvents(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}/liveScheduleEvent`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Live Channel Schedule Events Failed");
    }
}




async function _getLiveChannelStatusMessage(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE) {
    // Get the live channel
    if (DEBUG_MODE) 
    {
        console.log(`Getting Live Channel...`);
    }
    const CHANNEL = await _getLiveChannel(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE);

    // Check if channel was found
    if (CHANNEL) {
        // Check if there are status messages
        if (CHANNEL.statusMessages && CHANNEL.statusMessages.length > 0) {
            // Return the first status message
            return CHANNEL.statusMessages[0];
        }
    }

    // There are no status messages
    return false;
}





async function _getLiveChannelStatus(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE) {
    // Get the live channel
    if (DEBUG_MODE) 
    {
        console.log(`Getting Live Channel...`);
    }
    const CHANNEL = await _getLiveChannel(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE);

    // Check if live channel was found
    if (CHANNEL) {
        // Return the status of the live channel
        return CHANNEL.status.description;
    }

    // Live channel was not found
    return "Deleted";
}





async function _getLiveChannel(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        // Check for valid response
        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Live Channel Failed");
    }
}





async function _getLiveChannels(AUTH_TOKEN, URL, DEBUG_MODE) 
{
    const API_URL = `${URL}/liveChannel`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        // Check for valid response
        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Live Channels Failed");
    }

}





async function _getSecurityGroups(AUTH_TOKEN, URL, DEBUG_MODE)
{
    const API_URL = `${URL}/lookup/22?lookupKey=99e8767a-00ba-4758-b9c2-e07b52c47016`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        const INFO = await RESPONSE.json();
        return INFO.items;
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Security Groups Failed");
    }
}




async function _liveChannelRefresh(AUTH_TOKEN, URL, DEBUG_MODE)
{
    const API_URL = `${URL}/liveChannel/refresh`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Refresh Live Channel Failed");
    }
}


const _SECURITY_GROUPS = {
    "Content Manager": "e81e25ba-b6ab-4676-980c-f51385008eb3",
    "Everyone": "740ea96a-9c15-4c2e-ba1a-050ea893514b",
    "Guest": "8354ce06-deeb-4da9-a190-af0eca8d9f56"
}


const _LIVE_CHANNEL_STATUSES = {
    CreateFailed: "Create Failed",
    Creating: "Creating",
    Deleted: "Deleted",
    Deleting: "Deleting",
    Error: "Error",
    Idle: "Idle",
    New: "New",
    Pause: "Pause",
    Recovering: "Recovering",
    Running: "Running",
    Starting: "Starting",
    Stopping: "Stopping",
    Unmanaged: "Unmanaged",
    UpdateFailed: "Update Failed",
    Updating: "Updating"
};



const _LIVE_CHANNEL_TYPES = {
    External: "2bf01dd4-0a9c-4168-a61b-27e135732103",
    IVS: "2bf01dd4-0a9c-4168-a61b-27e135732102",
    Normal: "2bf01dd4-0a9c-4168-a61b-27e135732100",
    Realtime: "2bf01dd4-0a9c-4168-a61b-27e135732104"
};




async function _nextEvent(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}/nextEvent`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Start Output Tracking Failed");
    }
}






async function _startLiveChannel(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}/start`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        await _waitForLiveChannelStatus(AUTH_TOKEN, URL, CHANNEL_ID, _LIVE_CHANNEL_STATUSES.Running, 1200, 20), DEBUG_MODE;
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Start Live Channel Failed");
    }

}




async function _startOutputTracking(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}/startOutputTracking`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Start Output Tracking Failed");
    }
}






async function _stopLiveChannel(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}/stop`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        await _waitForLiveChannelStatus(AUTH_TOKEN, URL, CHANNEL_ID, _LIVE_CHANNEL_STATUSES.Idle, 1200, 20, DEBUG_MODE);
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Stop Live Channel Failed");
    }
}











async function _updateLiveChannel(AUTH_TOKEN, URL, ID, NAME, THUMBNAIL_IMAGE_ID, 
    ARCHIVE_FOLDER_ASSET_ID, ENABLE_HIGH_AVAILABILITY, ENABLE_LIVE_CLIPPING, IS_SECURE_OUTPUT, 
    OUTPUT_SCREENSHOTS, TYPE, EXTERNAL_URL, EXTERNAL_OUTPUT_PROFILES, SECURITY_GROUPS, DEBUG_MODE) 
{
    const LIVE_CHANNEL_INFO = await _getLiveChannel(AUTH_TOKEN, URL, ID, DEBUG_MODE);

    const API_URL = `${URL}/liveChannel`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = LIVE_CHANNEL_INFO;

    if (NAME && NAME !== BODY.name)
    {
        BODY.name = NAME;
        BODY.routeName = _slugify(NAME);
    }
    if (THUMBNAIL_IMAGE_ID && THUMBNAIL_IMAGE_ID !== BODY.thumbnailImage) BODY.thumbnailImage = { id: THUMBNAIL_IMAGE_ID };
    if (ARCHIVE_FOLDER_ASSET_ID && ARCHIVE_FOLDER_ASSET_ID !== BODY.archiveFolderAsset.id) BODY.archiveFolderAsset = { id: ARCHIVE_FOLDER_ASSET_ID };
    if (ENABLE_HIGH_AVAILABILITY && ENABLE_HIGH_AVAILABILITY !== BODY.enableHighAvailability) BODY.enableHighAvailability = ENABLE_HIGH_AVAILABILITY;
    if (ENABLE_LIVE_CLIPPING && ENABLE_LIVE_CLIPPING !== BODY.enableLiveClipping) BODY.enableLiveClipping = ENABLE_LIVE_CLIPPING;
    if (IS_SECURE_OUTPUT && IS_SECURE_OUTPUT !== BODY.isSecureOutput) BODY.isSecureOutput = IS_SECURE_OUTPUT;
    if (OUTPUT_SCREENSHOTS && OUTPUT_SCREENSHOTS !== BODY.outputScreenshots) BODY.outputScreenshots = OUTPUT_SCREENSHOTS;
    if (TYPE && _LIVE_CHANNEL_STATUSES[TYPE] !== BODY.type.id) BODY.type = { id: _LIVE_CHANNEL_TYPES[TYPE] };
    if (EXTERNAL_OUTPUT_PROFILES && EXTERNAL_OUTPUT_PROFILES !== BODY.externalOutputProfiles) BODY.externalOutputProfiles = EXTERNAL_OUTPUT_PROFILES;


    // Set the appropriate fields based on the channel type
    if (TYPE === "External") {
        if (EXTERNAL_URL && EXTERNAL_URL !== BODY.externalUrl) BODY.externalUrl = EXTERNAL_URL;
    }
    else 
    {
        if (EXTERNAL_URL && BODY.externalUrl) delete BODY.externalUrl;
    }

    if (SECURITY_GROUPS) {
        const NOMAD_SECURITY_GROUPS = await _getSecurityGroups(AUTH_TOKEN, URL, DEBUG_MODE);

        const FILTERED_SECURITY_GROUPS = NOMAD_SECURITY_GROUPS
            .filter(group => SECURITY_GROUPS.includes(group.description))
            .map(group => ({
                description: group.description,
                id: group.id
            }));

        if (FILTERED_SECURITY_GROUPS !== BODY.securityGroups) BODY.securityGroups = FILTERED_SECURITY_GROUPS;
    }

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        const INFO = await RESPONSE.json();

        await _waitForLiveChannelStatus(AUTH_TOKEN, URL, INFO.id, _LIVE_CHANNEL_STATUSES.Idle, 120, 2, DEBUG_MODE);

        return INFO;
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Updating Live Channel Failed");
    }
}








async function _waitForLiveChannelStatus(AUTH_TOKEN, URL, CHANNEL_ID, STATUS_TO_WAIT_FOR, 
        TIMEOUT = 30, POLL_INTERVAL = 2, DEBUG_MODE) {

    const startingTime = new Date().getTime();

    // Elapsed time in seconds
    let elapsedTime = 0;

    while (elapsedTime < TIMEOUT) {
        // Get the Live Channel status
        const CHANNEL_STATUS = await _getLiveChannelStatus(AUTH_TOKEN, URL, CHANNEL_ID, DEBUG_MODE);

        // If channel is in statusToWaitFor return
        if (CHANNEL_STATUS === STATUS_TO_WAIT_FOR) {
            // Give feedback to the console
            if (DEBUG_MODE)
            {
                console.log(`Live Channel [${CHANNEL_ID}] transitioned to status [${STATUS_TO_WAIT_FOR}]`);
            }
            return;
        }

        // Give feedback to the console
        console.log(`Live Channel [${CHANNEL_ID}] current status is [${CHANNEL_STATUS}]`);

        // Check for Error status
        if (CHANNEL_STATUS === "Error") {
            // Get the error message
            const CHANNEL_STATUS_MESSAGE = await _getLiveChannelStatusMessage(AUTH_TOKEN, URL, 
                CHANNEL_ID, DEBUG_MODE);

            // Can't continue if Live Channel is in error status
            throw new Error(`Live Channel [${CHANNEL_ID}] is in [Error] status: ${CHANNEL_STATUS_MESSAGE}`);
        }

        // Calculate elapsed time in seconds
        elapsedTime = (new Date().getTime() - startingTime) / 1000;

        // Give feedback to the console
        if (DEBUG_MODE)
        {
            console.log(`Waiting for Live Channel [${CHANNEL_ID}] to transition to status [${STATUS_TO_WAIT_FOR}]... [${Math.round(elapsedTime)}/${TIMEOUT}]`);
        }

        // Check for timeout
        if (elapsedTime > TIMEOUT) {
            break;
        }

        // Wait poll interval
        await _sleep(POLL_INTERVAL);
    }

    throw new Error(`Waiting for Live Channel [${CHANNEL_ID}] to transition to status [${STATUS_TO_WAIT_FOR}] timed out`);
}








async function _createLiveInput(AUTH_TOKEN, URL, NAME, SOURCE, TYPE, IS_STANDARD, 
        VIDEO_ASSET_ID, DESTINATIONS, SOURCES, DEBUG_MODE)
{
    const API_URL = `${URL}/liveInput`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        name: NAME,
        internalName: _slugify(NAME),
        type: { 
            id: _LIVE_INPUT_TYPES[TYPE],
            description: TYPE
        }
    };

    // Set the appropriate fields based on the type
    if (TYPE == "RTMP_PUSH")
    {
        if (SOURCE) BODY["sourceCidr"] = SOURCE
    }
    else if (TYPE === "RTMP_PULL" || TYPE === "RTP_PUSH" || TYPE === "URL_PULL")
    {
        if (SOURCE) BODY["sources"] = [{ "url": SOURCE }]
    }

    if (IS_STANDARD) BODY["isStandard"] = IS_STANDARD;
    if (VIDEO_ASSET_ID) BODY["videoAsset"] = { id: VIDEO_ASSET_ID };
    if (DESTINATIONS) BODY["destinations"] = DESTINATIONS;
    if (SOURCES) BODY["sources"] = SOURCES;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        const JSON_RESPONSE = await RESPONSE.json();

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        // Wait for the Live Input to be detached if it was just created
        await _waitForLiveInputStatus(AUTH_TOKEN, URL, JSON_RESPONSE.id, _LIVE_INPUT_STATUSES.Detached, 15, 1, DEBUG_MODE);

        return JSON_RESPONSE;
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Creating Live Input Failed");
    }
}





async function _deleteLiveInput(AUTH_TOKEN, URL, INPUT_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/liveInput/${INPUT_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "DELETE",
            headers: HEADERS
        });


        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete Live Input Failed");
    }
}






async function _getLiveInputStatusMessage(AUTH_TOKEN, URL, INPUT_ID, DEBUG_MODE) {
    // Get the live input
    if (DEBUG_MODE) console.log(`Getting Live Input...`);
    const INPUT = await _getLiveInput(AUTH_TOKEN, URL, INPUT_ID, DEBUG_MODE);

    // Check if input was found
    if (INPUT) {
        // Check if there is status message
        if (INPUT.statusMessage && INPUT.statusMessage) {
            // Return input status message
            return INPUT.statusMessage;
        }
    }

    // There is no status message
    return "";
}





async function _getLiveInputStatus(AUTH_TOKEN, URL, INPUT_ID, DEBUG_MODE) {
    // Get the live input
    if (DEBUG_MODE) console.log(`Getting Live Input...`);
    const INPUT = await _getLiveInput(AUTH_TOKEN, URL, INPUT_ID, DEBUG_MODE);

    // Check if input was found
    if (INPUT) {
        // Return the status of the input
        return INPUT.status.description;
    }

    // Input was not found
    return "Deleted";
}




async function _getLiveInput(AUTH_TOKEN, URL, INPUT_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/liveInput/${INPUT_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Live Input Failed");
    }
}




async function _getLiveInputs(AUTH_TOKEN, URL, DEBUG_MODE)
{
    const API_URL = `${URL}/liveInput`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Live Inputs Failed");
    }
}


const _LIVE_INPUT_STATUSES = {
    Attached: "Attached",
    Attaching: "Attaching",
    CreateFailed: "Create Failed",
    Creating: "Creating",
    Deleted: "Deleted",
    Deleting: "Deleting",
    Detached: "Detached",
    Detaching: "Detaching",
    Error: "Error",
    Paused: "Paused",
    Updating: "Updating"
};



const _LIVE_INPUT_TYPES = {
    RTMP_PULL: "78acb07d-ba87-48fa-ad8f-c00e318a1254",
    RTMP_PUSH: "78acb07d-ba87-48fa-ad8f-c00e318a1253",
    RTP_PUSH: "78acb07d-ba87-48fa-ad8f-c00e318a1252",
    UDP_PUSH: "78acb07d-ba87-48fa-ad8f-c00e318a1251",
    URL_PULL: "78acb07d-ba87-48fa-ad8f-c00e318a1255"
};










async function _updateLiveInput(AUTH_TOKEN, URL, ID, NAME, SOURCE, TYPE, IS_STANDARD, 
    VIDEO_ASSET_ID, DESTINATIONS, SOURCES, DEBUG_MODE)
{
    const INPUT_INFO = await _getLiveInput(AUTH_TOKEN, URL, ID, DEBUG_MODE);

    const API_URL = `${URL}/liveInput`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = INPUT_INFO

    if (NAME && NAME !== BODY.name)
    {
        BODY.name = NAME;
        BODY.internalName = _slugify(NAME);
    }
    if (TYPE && _LIVE_INPUT_TYPES[TYPE] !== BODY.type.id) BODY.type = { id: _LIVE_INPUT_TYPES[TYPE] };

    // Set the appropriate fields based on the type
    if (TYPE == "RTMP_PUSH")
    {
        if (SOURCE && SOURCE !== BODY.sourceCidr) BODY["sourceCidr"] = SOURCE
        if (BODY.sources) delete BODY.sources;
    }
    else if (TYPE === "RTMP_PULL" || TYPE === "RTP_PUSH" || TYPE === "URL_PULL")
    {
        if (SOURCE && SOURCE !== BODY.sources) BODY["sources"] = [{ "url": SOURCE }]
        if (BODY.sourceCidr) delete BODY.sourceCidr;
    }
    else
    {
        if (BODY.sourceCidr) delete BODY.sourceCidr;
        if (BODY.sources) delete BODY.sources;
    }

    if (IS_STANDARD && IS_STANDARD !== BODY.isStandard) BODY.isStandard = IS_STANDARD;
    if (VIDEO_ASSET_ID && VIDEO_ASSET_ID !== BODY.videoAsset.id) BODY.videoAsset = { id: VIDEO_ASSET_ID };
    if (DESTINATIONS && DESTINATIONS !== BODY.destinations) BODY.destinations = DESTINATIONS;
    if (SOURCES && SOURCES !== BODY.SOURCES) BODY.sources = SOURCES;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        const INFO = await RESPONSE.json();

        // Wait for the Live Input to be detached if it was just created
        await _waitForLiveInputStatus(AUTH_TOKEN, URL, INFO.id, _LIVE_INPUT_STATUSES.Detached, 15, 1, DEBUG_MODE);

        return INFO;
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Updating Live Input Failed");
    }
}







async function _waitForLiveInputStatus(AUTH_TOKEN, URL, INPUT_ID, STATUS_TO_WAIT_FOR, TIMEOUT = 30, 
    POLL_INTERVAL = 2, DEBUG_MODE) 
{
    // Set the starting time
    const STARTING_TIME = new Date().getTime();

    // Elapsed time in seconds
    let elapsedTime = 0;

    while (elapsedTime < TIMEOUT) {
        // Get the Live Input status
        const INPUT_STATUS = await _getLiveInputStatus(AUTH_TOKEN, URL, INPUT_ID, DEBUG_MODE);

        // If Live Input is in statusToWaitFor return
        if (INPUT_STATUS === STATUS_TO_WAIT_FOR) {
            // Give feedback to the console
            if (DEBUG_MODE)
            {
                console.log(`Live Input ${INPUT_ID} transitioned to status ${STATUS_TO_WAIT_FOR}`);
            }
            return;
        }

        // Give feedback to the console
        console.log(`Live Input [${INPUT_ID}] is in status [${INPUT_STATUS}]`);

        // Check for Error status
        if (INPUT_STATUS === "Error") {
            // Get the error message
            const INPUT_STATUS_MESSAGE = await _getLiveInputStatusMessage(AUTH_TOKEN, INPUT_ID, 
                DEBUG_MODE);

            // Can't continue if Live Input is in error status
            throw new Error(`Live Input ${INPUT_ID} is in Error status: ${INPUT_STATUS_MESSAGE}`);
        }

        // Calculate elapsed time in seconds
        elapsedTime = (new Date().getTime() - STARTING_TIME) / 1000;

        // Give feedback to the console
        if (DEBUG_MODE)
        {
            console.log(`Waiting for Live Input [${INPUT_ID}] to transition to status [${STATUS_TO_WAIT_FOR}]... [${Math.round(elapsedTime)}/${TIMEOUT}]`);
        }

        // Check for timeout
        if (elapsedTime > TIMEOUT) {
            break;
        }

        // Wait poll interval
        await _sleep(POLL_INTERVAL);
    }

    throw new Error(`Waiting for Live Input [${INPUT_ID}] to transition to status [${STATUS_TO_WAIT_FOR}] timed out`);
}






async function _cancelBroadcast(AUTH_TOKEN, URL, ID, DEBUG_MODE)
{
    const API_URL = `${URL}/admin/liveOperator/${ID}/cancel`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        await _waitForLiveOperatorStatus(AUTH_TOKEN, URL, ID, "Idle", 1200, 20);
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Cancel Broadcast Failed");
    }
}




async function _cancelSegment(AUTH_TOKEN, URL, ID, DEBUG_MODE)
{
    const API_URL = `${URL}/admin/liveOperator/${ID}/cancelSegment`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Cancel Segment Failed");
    }
}




async function _completeSegment(AUTH_TOKEN, URL, ID, RELATED_CONTENT_IDS, TAG_IDS, DEBUG_MODE)
{
    const API_URL = `${URL}/admin/liveOperator/${ID}/completeSegment`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    // Create body for the request
    const BODY = {
        liveOperatorId: ID
    };

    if (RELATED_CONTENT_IDS && Array.isArray(RELATED_CONTENT_IDS) && RELATED_CONTENT_IDS.length > 0) {
        BODY.relatedContent = RELATED_CONTENT_IDS.map(id => ({ id }));
    }
    if (TAG_IDS && Array.isArray(TAG_IDS) && TAG_IDS.length > 0) {
        BODY.tags = TAG_IDS.map(id => ({ id }));
    }

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error) 
    {
        _apiExceptionHandler(error, "Complete Segment Failed");
    }
}




async function _getCompletedSegments(AUTH_TOKEN, URL, ID, DEBUG_MODE)
{
    const API_URL = `${URL}/admin/liveOperator/${ID}/segments`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error) 
    {
        _apiExceptionHandler(error, "Get Completed Segments Failed");
    }
}




async function _getLiveOperator(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/liveOperator/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Live Operator Failed");
    }
}




async function _getLiveOperators(AUTH_TOKEN, URL, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/liveOperator`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Live Operators Failed");
    }
}





async function _startBroadcast(AUTH_TOKEN, URL, ID, PREROLL_ASSET_ID, POSTROLL_ASSET_ID, LIVE_INPUT_ID, 
    RELATED_CONTENT_IDS, TAG_IDS, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/liveOperator/start`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    // Create body for the request
    const BODY = {
        id: ID
    };

    if (PREROLL_ASSET_ID) { BODY.prerollAsset = { id: PREROLL_ASSET_ID }; }
    if (POSTROLL_ASSET_ID) { BODY.postrollAsset = { id: POSTROLL_ASSET_ID }; }
    if (LIVE_INPUT_ID) { BODY.liveInput = { id: LIVE_INPUT_ID }; }

    if (RELATED_CONTENT_IDS && Array.isArray(RELATED_CONTENT_IDS) && RELATED_CONTENT_IDS.length > 0) {
        BODY.relatedContent = RELATED_CONTENT_IDS.map(id => ({ id }));
    }
    if (TAG_IDS && Array.isArray(TAG_IDS) && TAG_IDS.length > 0) {
        BODY.tags = TAG_IDS.map(id => ({ id }));
    }

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        await _waitForLiveOperatorStatus(AUTH_TOKEN, URL, ID, "Running", 1200, 20);
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Start Broadcast Failed");
    }
}




async function _startSegment(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/liveOperator/${ID}/startSegment`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Start Segment Failed");
    }
}





async function _stopBroadcast(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/liveOperator/${ID}/stop`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
    HEADERS.append("Content-Type", "application/json");

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        await _waitForLiveOperatorStatus(AUTH_TOKEN, URL, ID, "Idle", 1200, 20);
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Stop Broadcast Failed");
    }
}





async function _waitForLiveOperatorStatus(AUTH_TOKEN, URL, OPERATOR_ID, STATUS_TO_WAIT_FOR, TIMEOUT = 30, 
    POLL_INTERVAL = 2, DEBUG_MODE) 
{
    // Set the starting time
    const STARTING_TIME = new Date().getTime();

    // Elapsed time in seconds
    let elapsedTime = 0;

    while (elapsedTime < TIMEOUT) {
        const OPERATOR = await _getLiveOperator(AUTH_TOKEN, URL, OPERATOR_ID, DEBUG_MODE);
        // Get the Live Operator status
        const OPERATOR_STATUS = OPERATOR.liveChannelStatus.description;

        // If Live Operator is in statusToWaitFor return
        if (OPERATOR_STATUS === STATUS_TO_WAIT_FOR) {
            // Give feedback to the console
            if (DEBUG_MODE)
            {
                console.log(`Live Operator ${OPERATOR_ID} transitioned to status ${STATUS_TO_WAIT_FOR}`);
            }
            return;
        }

        // Give feedback to the console
        console.log(`Live Operator [${OPERATOR_ID}] is in status [${OPERATOR_STATUS}]`);

        // Check for Error status
        if (OPERATOR_STATUS === "Error") {
            // Can't continue if Live Operator is in error status
            throw new Error(`Live Operator ${OPERATOR_ID} is broken`);
        }

        // Calculate elapsed time in seconds
        elapsedTime = (new Date().getTime() - STARTING_TIME) / 1000;

        // Give feedback to the console
        if (DEBUG_MODE)
        {
            console.log(`Waiting for Live Operator [${OPERATOR_ID}] to transition to status [${STATUS_TO_WAIT_FOR}]... [${Math.round(elapsedTime)}/${TIMEOUT}]`);
        }

        // Check for timeout
        if (elapsedTime > TIMEOUT) {
            break;
        }

        // Wait poll interval
        await _sleep(POLL_INTERVAL);
    }

    throw new Error(`Waiting for Live Operator [${OPERATOR_ID}] to transition to status [${STATUS_TO_WAIT_FOR}] timed out`);
}






async function _addAssetScheduleEvent(AUTH_TOKEN, URL, CHANNEL_ID, ASSET, IS_LOOP, 
    DURATION_TIME_CODE, PREVIOUS_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/LiveChannel/${CHANNEL_ID}/liveScheduleEvent`;
    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        isLoop: IS_LOOP,
        channelId: CHANNEL_ID,
        durationTimeCode: DURATION_TIME_CODE,
        previousId: PREVIOUS_ID,
        type: {
            id: _eventType.videoAsset,
            description: "Video Asset"
        },
        asset: ASSET
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        const INFO = await RESPONSE.json();
        return INFO.changeList[0];
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Adding Asset Schedule Event Failed");
    }
}






async function _addInputScheduleEvent(AUTH_TOKEN, URL, CHANNEL_ID, INPUT, BACKUP_INPUT, 
    FIXED_ON_AIR_TIME_UTC, PREVIOUS_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/LiveChannel/${CHANNEL_ID}/liveScheduleEvent`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        channelId: CHANNEL_ID,
        fixedOnAirTimeUtc: FIXED_ON_AIR_TIME_UTC,
        type: {
            id: _eventType.liveInput,
            description: "Live Input"
        },
        liveInput: INPUT,
        previousId: PREVIOUS_ID
    };

    if (BACKUP_INPUT) 
    {
        BODY["liveInput2"] = BACKUP_INPUT;
    }


    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        const INFO = await RESPONSE.json();
        return INFO.changeList[0];
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Adding Input Schedule Event Failed");
    }
}


const _eventType = {
    liveInput: "eef7ef23-56dc-4f48-8c0e-1f4d52990405",
    videoAsset: "eef7ef23-56dc-4f48-8c0e-1f4d52990404"
};




async function _getAssetScheduleEvent(AUTH_TOKEN, URL, CHANNEL_ID, SCHEDULE_EVENT_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}/liveScheduleEvent/${SCHEDULE_EVENT_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }

        try
        {
            return await RESPONSE.json();
        }
        catch (error)
        {
            return false;
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Asset Schedule Event Failed");
    }
}




async function _getInputScheduleEvent(AUTH_TOKEN, URL, CHANNEL_ID, SCHEDULE_EVENT_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}/liveScheduleEvent/${SCHEDULE_EVENT_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }

        try
        {
            return await RESPONSE.json();
        }
        catch (error)
        {
            return false;
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Asset Schedule Event Failed");
    }
}




async function _moveScheduleEvent(AUTH_TOKEN, URL, CHANNEL_ID, SCHEDULE_EVENT_ID,
    PREVIOUS_SCHEDULE_EVENT_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}/liveScheduleEvent/${SCHEDULE_EVENT_ID}/move`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        previousScheduleEventId: PREVIOUS_SCHEDULE_EVENT_ID
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        // Check for success
        if (!RESPONSE.ok) 
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Move Live Schedule Event Failed");
    }
}




async function _removeAssetScheduleEvent(AUTH_TOKEN, URL, CHANNEL_ID, SCHEDULE_EVENT_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/LiveChannel/${CHANNEL_ID}/liveScheduleEvent/${SCHEDULE_EVENT_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Remove Asset Schedule Event Failed");
    }
}




async function _removeInputScheduleEvent(AUTH_TOKEN, URL, CHANNEL_ID, INPUT_ID, DEBUG_MODE)
{
    const API_URL = `${URL}/liveChannel/${CHANNEL_ID}/liveScheduleEvent/${INPUT_ID}`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "delete",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Remove Input Schedule Event Failed");
    }
}






async function _updateAssetScheduleEvent(AUTH_TOKEN, URL, ID, CHANNEL_ID, ASSET, IS_LOOP, 
    DURATION_TIME_CODE, DEBUG_MODE) 
{
    const SCHEDULE_EVENT_INFO = await _getAssetScheduleEvent(AUTH_TOKEN, URL, CHANNEL_ID, ID, DEBUG_MODE);

    const API_URL = `${URL}/LiveChannel/${CHANNEL_ID}/liveScheduleEvent`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        type: {
            id: _eventType.videoAsset,
            description: "Video Asset"
        }
    };

    BODY.id = ID && ID !== SCHEDULE_EVENT_INFO.id ? ID : SCHEDULE_EVENT_INFO.id;
    BODY.isLoop = IS_LOOP && IS_LOOP !== SCHEDULE_EVENT_INFO.isLoop ? IS_LOOP : SCHEDULE_EVENT_INFO.isLoop;
    BODY.channelId = CHANNEL_ID && CHANNEL_ID !== SCHEDULE_EVENT_INFO.channelId ? CHANNEL_ID : SCHEDULE_EVENT_INFO.channelId;
    BODY.durationTimeCode = DURATION_TIME_CODE && DURATION_TIME_CODE !== SCHEDULE_EVENT_INFO.durationTimeCode ? DURATION_TIME_CODE : SCHEDULE_EVENT_INFO.durationTimeCode;
    BODY.asset = ASSET && ASSET !== SCHEDULE_EVENT_INFO.asset ? ASSET : SCHEDULE_EVENT_INFO.asset;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Updating Asset Schedule Event Failed");
    }
}







async function _updateInputScheduleEvent(AUTH_TOKEN, URL, ID, CHANNEL_ID, INPUT, BACKUP_INPUT, 
    FIXED_ON_AIR_TIME_UTC, DEBUG_MODE) 
{
    const SCHEDULE_EVENT_INFO = await _getInputScheduleEvent(AUTH_TOKEN, URL, CHANNEL_ID, ID, DEBUG_MODE);

    const API_URL = `${URL}/LiveChannel/${CHANNEL_ID}/liveScheduleEvent`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the payload body
    const BODY = {
        type: {
            id: _eventType.liveInput,
            description: "Live Input"
        },
    };

    BODY.id = ID && ID !== SCHEDULE_EVENT_INFO.id ? ID : SCHEDULE_EVENT_INFO.id;
    BODY.channelId = CHANNEL_ID && CHANNEL_ID !== SCHEDULE_EVENT_INFO.channelId ? CHANNEL_ID : SCHEDULE_EVENT_INFO.channelId;
    BODY.fixedOnAirTimeUtc = FIXED_ON_AIR_TIME_UTC && FIXED_ON_AIR_TIME_UTC !== SCHEDULE_EVENT_INFO.fixedOnAirTimeUtc ? FIXED_ON_AIR_TIME_UTC : SCHEDULE_EVENT_INFO.fixedOnAirTimeUtc;
    BODY.liveInput = INPUT && INPUT !== SCHEDULE_EVENT_INFO.liveInput ? INPUT : SCHEDULE_EVENT_INFO.liveInput;
    BODY.liveInput2 = BACKUP_INPUT && BACKUP_INPUT !== SCHEDULE_EVENT_INFO.liveInput2 ? BACKUP_INPUT : SCHEDULE_EVENT_INFO.liveInput2;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Updating Input Schedule Event Failed");
    }
}





async function _createIntelligentPlaylist(AUTH_TOKEN, URL, COLLECTIONS, END_SEARCH_DATE,
    END_SEARCH_DURATION_IN_MINUTES, NAME, RELATED_CONENT, SEARCH_DATE, 
    SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS, THUMBNAIL_ASSET, DEBUG_MODE) 
{
    const SCHEDULE_API_URL = `${URL}/admin/schedule`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const SCHEUDLE_BODY = {
        name: NAME,
        scheduleType: "4",
        thumbnailAsset: THUMBNAIL_ASSET
    };

    if (DEBUG_MODE) console.log(`URL: ${SCHEDULE_API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(SCHEUDLE_BODY)}`);

    let SCHEDULE_INFO = null;
    try
    {
        const RESPONSE = await fetch(`${SCHEDULE_API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(SCHEUDLE_BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        SCHEDULE_INFO = await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Intelligent Playlist Failed");
    }

    const ITEM_API_URL = `${SCHEDULE_API_URL}/${SCHEDULE_INFO.id}/item`;

    const ITEM_BODY = {
        collections: COLLECTIONS,
        endSearchDate: END_SEARCH_DATE,
        endSearchDurationInMinutes: END_SEARCH_DURATION_IN_MINUTES,
        relatedContent: RELATED_CONENT,
        scheduleItemType: "2",
        searchDate: SEARCH_DATE,
        searchDurationInMinutes: SEARCH_DURATION_IN_MINUTES,
        searchFilterType: SEARCH_FILTER_TYPE,
        sourceType: "2",
        tags: TAGS
    };

    if (DEBUG_MODE) console.log(`URL: ${ITEM_API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(ITEM_BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${ITEM_API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(ITEM_BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        const ITEM_INFO = await RESPONSE.json();

        for (let param in SCHEDULE_INFO) {
            ITEM_INFO[param] = SCHEDULE_INFO[param];
        }

        return ITEM_INFO;
    }
    catch (error)
    {
        await _deleteIntelligentSchedule(AUTH_TOKEN, URL, SCHEDULE_INFO.id, DEBUG_MODE);
        _apiExceptionHandler(error, "Create Intelligent Playlist Failed");
    }
}




async function _createIntelligentSchedule(AUTH_TOKEN, URL, DEFAULT_VIDEO_ASSET, NAME, 
    THUMBNAIL_ASSET, TIME_ZONE_ID , DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        defaultVideoAsset: DEFAULT_VIDEO_ASSET,
        name: NAME,
        scheduleType: 3,
        thumbnailAsset: THUMBNAIL_ASSET,
        timeZoneId: TIME_ZONE_ID,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Intelligent Schedule Failed");
    }
}




async function _createPlaylistVideo(AUTH_TOKEN, URL, PLAYLIST_ID, ASSET,
    PREVIOUS_ITEM, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${PLAYLIST_ID}/item`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        asset: ASSET,
        previousItem: PREVIOUS_ITEM
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Schedule Item Failed");
    }
}




async function _createPlaylist(AUTH_TOKEN, URL, NAME, THUMBNAIL_ASSET, LOOP_PLAYLIST,
    DEFAULT_VIDEO_ASSET, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        defaultVideoAsset: DEFAULT_VIDEO_ASSET,
        loopPlaylist: LOOP_PLAYLIST,
        name: NAME,
        scheduleType: "1",
        thumbnailAsset: THUMBNAIL_ASSET
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Playlist Failed");
    }
}




async function _createScheduleItemAsset(AUTH_TOKEN, URL, SCHEDULE_ID, ASSET, DAYS, 
    DURATION_TIME_CODE, END_TIME_CODE, PREVIOUS_ITEM, TIME_CODE, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        asset: ASSET,
        days: DAYS,
        durationTimeCode: DURATION_TIME_CODE,
        endTimeCode: END_TIME_CODE,
        previousItem: PREVIOUS_ITEM,
        scheduleItemType: "1",
        sourceType: "3",
        timeCode: TIME_CODE,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Schedule Item Failed");
    }
}




async function _createScheduleItemLiveChannel(AUTH_TOKEN, URL, SCHEDULE_ID, DAYS, 
    DURATION_TIME_CODE, END_TIME_CODE, LIVE_CHANNEL, PREVIOUS_ITEM, TIME_CODE, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        days: DAYS,
        durationTimeCode: DURATION_TIME_CODE,
        endTimeCode: END_TIME_CODE,
        liveChannel: LIVE_CHANNEL,
        previousItem: PREVIOUS_ITEM,
        scheduleItemType: "1",
        sourceType: "4",
        timeCode: TIME_CODE,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Schedule Item Failed");
    }
}





async function _createScheduleItemSearchFilter(AUTH_TOKEN, URL, SCHEDULE_ID, COLLECTIONS, 
    DAYS, DURATION_TIME_CODE, END_SEARCH_DATE, END_SEARCH_DURATION_IN_MINUTES, 
    END_TIME_CODE, PREVIOUS_ITEM, RELATED_CONTENT, SEARCH_DATE, 
    SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS, TIME_CODE, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        collections: COLLECTIONS,
        days: DAYS,
        durationTimeCode: DURATION_TIME_CODE,
        endSearchDate: END_SEARCH_DATE,
        endSearchDuratonInMinutes: END_SEARCH_DURATION_IN_MINUTES,
        endTimeCode: END_TIME_CODE,
        previousItem: PREVIOUS_ITEM,
        relatedContent: RELATED_CONTENT,
        scheduleItemType: "1",
        searchDate: SEARCH_DATE,
        searchDurationInMinutes: SEARCH_DURATION_IN_MINUTES,
        searchFilterType: SEARCH_FILTER_TYPE,
        sourceType: "2",
        tags: TAGS,
        timeCode: TIME_CODE,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Schedule Item Failed");
    }
}




async function _createScheduleItemPlaylistSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, DAYS, 
    DURATION_TIME_CODE, END_TIME_CODE, PLAYLIST_SCHEDULE, PREVIOUS_ITEM, TIME_CODE, 
    DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        days: DAYS,
        durationTimeCode: DURATION_TIME_CODE,
        endTimeCode: END_TIME_CODE,
        playlistSchedule: PLAYLIST_SCHEDULE,
        previousItem: PREVIOUS_ITEM,
        scheduleItemType: "2",
        sourceType: "1",
        timeCode: TIME_CODE,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Create Schedule Item Failed");
    }
}




async function _deleteIntelligentPlaylist(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete Intelligent Playlist Failed");
    }
}




async function _deleteIntelligentSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete Intelligent Schedule Failed");
    }
}




async function _deletePlaylist(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete Playlist Failed");
    }
}




async function _deleteScheduleItem(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item/${ITEM_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete Schedule Item Failed");
    }
}




async function _generateSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/generate`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Generate Schedule Failed");
    }
}




async function _getIntelligentPlaylist(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Intelligent Playlist Failed");
    }
}




async function _getIntelligentSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Schedule Failed");
    }
}




async function _getPlaylist(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Playlist Failed");
    }
}




async function _getScheduleItem(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item/${ITEM_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Schedule Item Failed");
    }
}




async function _getScheduleItems(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/items`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Schedule Items Failed");
    }
}




async function _getSchedulePreview(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/preview`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Schedule Preview Failed");
    }
}




async function _moveScheduleItem(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, PREVIOUS_ITEM, 
    DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item/${ITEM_ID}/move`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        id: ITEM_ID,
        previousItem: PREVIOUS_ITEM
    }

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Move Schedule Items Failed");
    }
}




async function _publishIntelligentSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, NUMBER_OF_LOCKED_DAYS,
    DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/publish`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        numberOfLockedDays: NUMBER_OF_LOCKED_DAYS
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Publish Schedule Failed");
    }
}




async function _startSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, SKIP_CLEANUP_ON_FAILURE,
    DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/start${SKIP_CLEANUP_ON_FAILURE !== null ? `?skipCleanupOnFailure=${SKIP_CLEANUP_ON_FAILURE}` : ''}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Start Schedule Failed");
    }
}




async function _stopSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, FORCE_STOP,
    DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/stop${FORCE_STOP !== null ? `?forceStop=${FORCE_STOP}` : ''}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Stop Schedule Failed");
    }
}







async function _updateIntelligentPlaylist(AUTH_TOKEN, URL, SCHEDULE_ID, COLLECTIONS, 
    END_SEARCH_DATE, END_SEARCH_DURATION_IN_MINUTES, NAME, RELATED_CONENT, SEARCH_DATE, 
    SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS, THUMBNAIL_ASSET, DEBUG_MODE) 
{
    const SCHEDULE_API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const PLAYLIST_INFO = await _getIntelligentPlaylist(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE);

    const SCHEUDLE_BODY = {
        name: NAME || PLAYLIST_INFO.name,
        scheduleType: "4",
        thumbnailAsset: THUMBNAIL_ASSET || PLAYLIST_INFO.thumbnailAsset,
        scheduleStatus: PLAYLIST_INFO.scheduleStatus,
        status: PLAYLIST_INFO.status
    };

    if (DEBUG_MODE) console.log(`URL: ${SCHEDULE_API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(SCHEUDLE_BODY)}`);

    let SCHEDULE_INFO = null;
    try
    {
        const RESPONSE = await fetch(`${SCHEDULE_API_URL}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(SCHEUDLE_BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        SCHEDULE_INFO = await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Update Intelligent Playlist Failed");
    }

    const ITEM_INFO = await _getScheduleItems(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE);
    const ITEM = ITEM_INFO[0];

    const ITEM_API_URL = `${SCHEDULE_API_URL}/item/${ITEM.id}`;

    const ITEM_BODY = {
        id: ITEM.id,
        collections: (COLLECTIONS.length === 0) ? ITEM.collections : COLLECTIONS,
        endSearchDate: END_SEARCH_DATE || ITEM.endSearchDate,
        endSearchDurationInMinutes: END_SEARCH_DURATION_IN_MINUTES || ITEM.endSearchDurationInMinutes,
        relatedContent: (RELATED_CONENT === 0) ? ITEM.relatedContent : RELATED_CONENT,
        scheduleItemType: "2",
        searchDate: SEARCH_DATE || ITEM.searchDate,
        searchDurationInMinutes: SEARCH_DURATION_IN_MINUTES || ITEM.searchDurationInMinutes,
        searchFilterType: SEARCH_FILTER_TYPE || ITEM.searchFilterType,
        sourceType: "2",
        tags: (TAGS.length === 0) ? ITEM.tags : TAGS
    };

    if (DEBUG_MODE) console.log(`URL: ${ITEM_API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(ITEM_BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${ITEM_API_URL}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(ITEM_BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        const ITEM_INFO = await RESPONSE.json();

        for (let param in SCHEDULE_INFO) {
            ITEM_INFO[param] = SCHEDULE_INFO[param];
        }

        return ITEM_INFO;
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Update Intelligent Playlist Failed");
    }
}





async function _updateIntelligentSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, DEFAULT_VIDEO_ASSET, 
    NAME, THUMBNAIL_ASSET, TIME_ZONE_ID , DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const INTELLIGENT_SCHEDULE_INFO = await _getIntelligentSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE);

    const BODY = {
        defaultVideoAsset: DEFAULT_VIDEO_ASSET || INTELLIGENT_SCHEDULE_INFO.defaultVideoAsset,
        id: SCHEDULE_ID,
        name: NAME || INTELLIGENT_SCHEDULE_INFO.name,
        scheduleType: 3,
        thumbnailAsset: THUMBNAIL_ASSET || INTELLIGENT_SCHEDULE_INFO.thumbnailAsset,
        timeZoneId: TIME_ZONE_ID || INTELLIGENT_SCHEDULE_INFO.timeZoneId
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Update Intelligent Schedule Failed");
    }
}





async function _updatePlaylist(AUTH_TOKEN, URL, SCHEDULE_ID, DEFAULT_VIDEO_ASSET, 
    LOOP_PLAYLIST, NAME, THUMBNAIL_ASSET, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const PLAYLIST_INFO = await _getPlaylist(AUTH_TOKEN, URL, SCHEDULE_ID, DEBUG_MODE);

    const BODY = {
        defaultVideoAsset: DEFAULT_VIDEO_ASSET || PLAYLIST_INFO.defaultVideoAsset,
        id: SCHEDULE_ID,
        loopPlaylist: (LOOP_PLAYLIST === null) ? PLAYLIST_INFO.loopPlaylist : LOOP_PLAYLIST,
        name: NAME || PLAYLIST_INFO.name,
        scheduleType: "1",
        thumbnailAsset: THUMBNAIL_ASSET || PLAYLIST_INFO.thumbnailAsset
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Update Playlist Failed");
    }
}





async function _updateScheduleItemAsset(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, ASSET, DAYS, 
    DURATION_TIME_CODE, END_TIME_CODE, TIME_CODE, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item/${ITEM_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const ITEM_INFO = await _getScheduleItem(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, DEBUG_MODE);

    const BODY = {
        asset: ASSET || ITEM_INFO.asset,
        days: DAYS || ITEM_INFO.days,
        durationTimeCode: DURATION_TIME_CODE || ITEM_INFO.durationTimeCode,
        endTimeCode: END_TIME_CODE || ITEM_INFO.endTimeCode,
        id: ITEM_ID,
        scheduleItemType: "1",
        sourceType: "3",
        timeCode: TIME_CODE || ITEM_INFO.timeCode,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Update Schedule Item Failed");
    }
}





async function _updateScheduleItemLiveChannel(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, DAYS, 
    DURATION_TIME_CODE, END_TIME_CODE, LIVE_CHANNEL, TIME_CODE, DEBUG_MODE)
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item/${ITEM_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const ITEM_INFO = await _getScheduleItem(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, DEBUG_MODE);

    const BODY = {
        days: DAYS || ITEM_INFO.days,
        durationTimeCode: DURATION_TIME_CODE || ITEM_INFO.durationTimeCode,
        endTimeCode: END_TIME_CODE || ITEM_INFO.endTimeCode,
        id: ITEM_ID,
        liveChannel: LIVE_CHANNEL || ITEM_INFO.liveChannel,
        scheduleItemType: "1",
        sourceType: "4",
        timeCode: TIME_CODE || ITEM_INFO.timeCode,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Update Schedule Item Failed");
    }
}





async function _updateScheduleItemPlaylistSchedule(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, 
    DAYS, DURATION_TIME_CODE, END_TIME_CODE, PLAYLIST_SCHEDULE, TIME_CODE, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item/${ITEM_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const ITEM_INFO = await _getScheduleItem(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, DEBUG_MODE);

    const BODY = {
        days: DAYS || ITEM_INFO.days,
        durationTimeCode: DURATION_TIME_CODE || ITEM_INFO.durationTimeCode,
        endTimeCode: END_TIME_CODE || ITEM_INFO.endTimeCode,
        id: ITEM_ID,
        playlistSchedule: PLAYLIST_SCHEDULE || ITEM_INFO.playlistSchedule,
        scheduleItemType: "2",
        sourceType: "1",
        timeCode: TIME_CODE || ITEM_INFO.timeCode,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Update Schedule Item Failed");
    }
}





async function _updateScheduleItemSearchFilter(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, COLLECTIONS, 
    DAYS, DURATION_TIME_CODE, END_SEARCH_DATE, END_SEARCH_DURATION_IN_MINUTES, END_TIME_CODE, 
    RELATED_CONTENT, SEARCH_DATE, SEARCH_DURATION_IN_MINUTES, SEARCH_FILTER_TYPE, TAGS, TIME_CODE, 
    DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/schedule/${SCHEDULE_ID}/item/${ITEM_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const ITEM_INFO = await _getScheduleItem(AUTH_TOKEN, URL, SCHEDULE_ID, ITEM_ID, DEBUG_MODE);

    const BODY = {
        collections: COLLECTIONS || ITEM_INFO.collections,
        days: DAYS || ITEM_INFO.days,
        durationTimeCode: DURATION_TIME_CODE || ITEM_INFO.durationTimeCode,
        endSearchDate: END_SEARCH_DATE || ITEM_INFO.endSearchDate,
        endSearchDuratonInMinutes: END_SEARCH_DURATION_IN_MINUTES || ITEM_INFO.endSearchDuratonInMinutes,
        endTimeCode: END_TIME_CODE || ITEM_INFO.endTimeCode,
        id: ITEM_ID,
        relatedContent: RELATED_CONTENT || ITEM_INFO.relatedContent,
        scheduleItemType: "1",
        searchDate: SEARCH_DATE || ITEM_INFO.searchDate,
        searchDurationInMinutes: SEARCH_DURATION_IN_MINUTES || ITEM_INFO.searchDurationInMinutes,
        searchFilterType: SEARCH_FILTER_TYPE || ITEM_INFO.searchFilterType,
        sourceType: "2",
        tags: TAGS || ITEM_INFO.tags,
        timeCode: TIME_CODE || ITEM_INFO.timeCode,
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Update Schedule Item Failed");
    }
}




async function _changeSessionStatus(AUTH_TOKEN, URL, USER_SESSION_ID, USER_SESSION_STATUS,
    APPLICATION_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user-session`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Create body for the request
    const BODY = {
        "id": USER_SESSION_ID,
        "userSessionStatus": USER_SESSION_STATUS,
        "applicationId": APPLICATION_ID
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${BODY}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: BODY
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Change Session Status Failed");
    }
}




async function _getUserSession(AUTH_TOKEN, URL, USER_SESSION_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user-session/${USER_SESSION_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get User Session Failed");
    }
}




async function _deleteUserContentAttributeData(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/userContentAttribute/${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Content Attribute Data Failed");
    }
}




async function _deleteUserContentGroupData(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/contentGroup/${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Content Group Data Failed");
    }
}




async function _deleteUserContentSecurityData(AUTH_TOKEN, URL, CONTENT_ID, 
    CONTENT_DEFINITION_ID, USER_ID, EMAIL, ID, KEY_NAME, EXPIRATION_DATE, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/userContentSecurity/delete`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        contentId: CONTENT_ID,
        contentDefinitionId: CONTENT_DEFINITION_ID,
        userId: USER_ID,
        email: EMAIL,
        id: ID,
        keyName: KEY_NAME,
        expirationDate: EXPIRATION_DATE
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Content Security Data Failed");
    }
}




async function _deleteUserData(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/userData/${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Data Failed");
    }
}




async function _deleteUserDislikesData(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/dislike/${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Dislikes Data Failed");
    }
}




async function _deleteUserFavoritesData(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/favorite/${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Favorites Data Failed");
    }
}




async function _deleteUserLikesData(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/like/${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Likes Data Failed");
    }
}




async function _deleteUserSavedSearchData(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/savedSearch/${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Saved Search Data Failed");
    }
}




async function _deleteUserSessionData(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/userSession/${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Session Data Failed");
    }
}




async function _deleteUserVideoTrackingData(AUTH_TOKEN, URL, ASSET_ID, CONTENT_ID,
    VIDEO_TRACKING_ATTRIBUTE, USER_ID, ID, IS_FIRST_QUARTILE, IS_MIDPOINT, IS_THIRD_QUARTILE,
    IS_COMPLETE, IS_HIDDEN, IS_LIVE_STREAM, MAX_SECOND, LAST_SECOND, TOTAL_SECONDS, 
    LAST_BEACON_DATE, KEY_NAME ,DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/userVideoTracking/delete`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {
        assetId: ASSET_ID,
        contentId: CONTENT_ID,
        videoTrackingAttribute: VIDEO_TRACKING_ATTRIBUTE,
        userId: USER_ID,
        id: ID,
        isFirstQuartile: IS_FIRST_QUARTILE,
        isMidpoint: IS_MIDPOINT,
        isThirdQuartile: IS_THIRD_QUARTILE,
        isComplete: IS_COMPLETE,
        isHidden: IS_HIDDEN,
        isLiveStream: IS_LIVE_STREAM,
        maxSecond: MAX_SECOND,
        lastSecond: LAST_SECOND,
        totalSeconds: TOTAL_SECONDS,
        lastBeaconDate: LAST_BEACON_DATE,
        keyName: KEY_NAME
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Video Tracking Data Failed");
    }
}




async function _deleteUser(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/admin/user/${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "DELETE",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Delete User Failed");
    }
}




async function _register(URL, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, DEBUG_MODE) 
{
  	const API_URL = `${URL}/account/register`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    
  	const BODY = {
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        email: EMAIL,
        password: PASSWORD
    };

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});

    	// Check for success
    	if (!RESPONSE.ok) {
    	    throw await RESPONSE.json();
    	}

		return await RESPONSE.json();
	}
	catch (error)
	{
		_apiExceptionHandler(error, `Register user failed`);
	}
}






async function _resendCode(URL, EMAIL, DEBUG_MODE) 
{
	const API_URL = `${URL}/account/resend-code`

	// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
  
  	const BODY = {
        userName: EMAIL
    };

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});

    	// Check for success
    	if (!RESPONSE.ok) {
    	  	throw await RESPONSE.json();
    	}
	}
	catch (error)
	{
    	_apiExceptionHandler(error,`Resend code failed`);
	}
}




async function _verify(URL, EMAIL, CODE, DEBUG_MODE) 
{
	const API_URL = `${URL}/account/verify`

	// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
  
  	const BODY = {
        userName: EMAIL,
        token: CODE
    };

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
 	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});
	
    	// Check for success
    	if (!RESPONSE.ok) {
    	    throw await RESPONSE.json();
    	}
	}
	catch (error)
	{	
    	_apiExceptionHandler(error,`Verify user failed`);
	}
}




async function _forgotPassword(URL, USERNAME, DEBUG_MODE) 
{
	const API_URL = `${URL}/account/forgot-password`;

	const HEADERS = new Headers();
	HEADERS.append("Content-Type", "application/json");
	
	const BODY = {
		username: USERNAME
	};

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
	
	try 
	{
		const RESPONSE = await fetch(API_URL, {
			method: "POST",
			headers: HEADERS,
			body: JSON.stringify(BODY)
		}).catch((exception) => {
			throw exception;
		});

		
		if (!RESPONSE.ok) {
			throw await RESPONSE.json()
		}
	}
	catch (error)
	{
		_apiExceptionHandler(error, "Forgot Password Failed");
	}
}




async function _login(USERNAME, PASSWORD, URL, DEBUG_MODE)
{
    const API_URL = `${URL}/account/login`;

    const HEADERS = {
        "Content-Type": "application/json"
    };

    const BODY = {
        "userName": USERNAME,
        "password": PASSWORD
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {  
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        })

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Login Failed");
    }
}






async function _logout(AUTH_TOKEN, USER_SESSION_ID, URL, DEBUG_MODE)
{
    const API_URL = `${URL}/account/logout`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    // Build the POST payload body
    const BODY = {
       "userSessionId": USER_SESSION_ID
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Logout Failed");
    }

}






async function _refreshToken(REFRESH_TOKEN, URL, DEBUG_MODE) 
{
    const API_URL = `${URL}/account/refresh-token`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");

    // Build the payload body
    const BODY = {
        refreshToken: REFRESH_TOKEN
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Refreshing Token Failed");
    }
}





async function _resetPassword(URL, USERNAME, TOKEN, NEW_PASSWORD, DEBUG_MODE) 
{
	const API_URL = `${URL}/account/reset-password`;

	// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
  
  	const BODY = {
        userName: USERNAME,
        TOKEN: TOKEN,
        newPassword: NEW_PASSWORD
    };

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});

		
    	if (!RESPONSE.ok) {
			throw await RESPONSE.json();
    	}
	}
	catch (error)
	{
		_apiExceptionHandler(error, "Reset Password Failed");
	}
    
}




async function _getAssetDetails(AUTH_TOKEN, URL, ASSET_ID, API_TYPE, DEBUG_MODE)
{
    const API_URL = API_TYPE === "admin" ? `${URL}/admin/asset/${ASSET_ID}/detail` : `${URL}/asset/${ASSET_ID}/detail`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Asset Details Failed");
    }
}




async function _ping(AUTH_TOKEN, URL, APPLICATION_ID, USER_SESSION_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/account/ping`;
    
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        userId: USER_SESSION_ID
    }

    if (APPLICATION_ID) BODY.applicationId = APPLICATION_ID;
    
    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error,"Ping user failed");
    }
}




async function _pingAuth(AUTH_TOKEN, URL, APPLICATION_ID, USER_SESSION_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/account/ping/auth`;
    
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {
        userId: USER_SESSION_ID
    }

    if (APPLICATION_ID) BODY.applicationId = APPLICATION_ID;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY)}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error,"Ping user failed");
    }
}




async function _search(AUTH_TOKEN, URL, QUERY, OFFSET, SIZE , FILTERS, SORT_FIELDS, SEARCH_RESULT_FIELDS, 
    SIMILAR_ASSET_ID, MIN_SCORE, EXCLUDE_TOTAL_RECORD_COUNT, FILTER_BINDER, API_TYPE, DEBUG_MODE)
{
    const API_URL = `${URL}/${API_TYPE}/search`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {};

    if (QUERY) BODY["query"] = QUERY;
    OFFSET ? BODY["pageOffset"] = OFFSET : BODY["pageOffset"] = 0;
    SIZE? BODY["pageSize"] = SIZE : BODY["pageSize"] = 100;
    if (FILTERS) BODY["filters"] = FILTERS;
    if (SORT_FIELDS) BODY["sortFields"] = SORT_FIELDS;
    if (SEARCH_RESULT_FIELDS) BODY["searchResultFields"] = SEARCH_RESULT_FIELDS;
    if (SIMILAR_ASSET_ID) BODY["similarAssetId"] = SIMILAR_ASSET_ID;
    if (MIN_SCORE) BODY["minScore"] = MIN_SCORE;
    if (EXCLUDE_TOTAL_RECORD_COUNT) BODY["excludeTotalRecordCount"] = EXCLUDE_TOTAL_RECORD_COUNT;
    if (FILTER_BINDER) BODY["filterBinder"] = FILTER_BINDER;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok)
        {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();

    }
    catch (error)
    {
        _apiExceptionHandler(error, "Search Failed");
    }
}


function _apiExceptionHandler(error, message) {
    // Check if we have a response object and error message
    if (!error) {
        throw new Error(message);
    }

    // Check if error is a string
    if (typeof error === "string") {
        throw new Error(`${message}: ${error}`);
    }
    else if (error.errors)
    {
        if (Array.isArray(error.errors)) {
            let errorString = "";
            for (let errorIdx = 0; errorIdx < error.errors.length; errorIdx++) 
            {
                errorString += `${error.errors[errorIdx].code}: ${error.errors[errorIdx].field}: ${error.errors[errorIdx].message}\n`; 
            }
            throw new Error(`${message}: ${errorString}`);
        } 
        else if (typeof error.errors === "object") {
            let errorString = "";
            for (let key in error.errors) {
                if (Object.prototype.hasOwnProperty.call(error.errors, key)) {
                    errorString += `${key}: ${error.errors[key]}\n`;
                }
            }
            throw new Error(`${message}: ${errorString}`);
        }
    }
    else
    {
        throw new Error(`${message}: ${error.message}`);
    }
}


/**
 * New GUID
 *
 * @returns UUID v4 GUID
 */

import { getRandomValues } from 'crypto';

function _newGuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
}



function _printDatetime(msg)
{
    const NOW = new Date();
    const FORMATTED_TIME = NOW.toLocaleTimeString();
    console.log(`${FORMATTED_TIME}: ${msg}`);
}


async function _sleep(duration) {
    // Check for valid duration
    if (!duration || duration === 0) {
        // Ignore
        return;
    }

    // Sleep
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration * 1000);
    });
}



function _slugify(text) {
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





async function _changeEmail(AUTH_TOKEN, URL, EMAIL, PASSWORD, DEBUG_MODE) 
{
	const API_URL = `${URL}/account/change-email`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        password: PASSWORD,
        newEmail: EMAIL
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});

    	// Check for success
		if (!RESPONSE.ok) {
			throw await RESPONSE.json();
    	}
	}
	catch (error) {
		_apiExceptionHandler(error, "Change email failed");
	}
}




async function _changePassword(AUTH_TOKEN, URL, CURRENT_PASSWORD, NEW_PASSWORD, DEBUG_MODE)
{
    const API_URL = `${URL}/account/change-password`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        password: CURRENT_PASSWORD,
        newPassword: NEW_PASSWORD
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        // Check for success
        if (!RESPONSE.ok) {
            return await RESPONSE.json();
        }
    }
    catch (error) {
        _apiExceptionHandler(error, "Change password failed");
    }
}




async function _getCountries(AUTH_TOKEN, URL, DEBUG_MODE)
{
    const editedUrl = URL.replace(/https:\/\/(.+?)\./, 'https://').replace(/\/[^/]+$/, '');
    const API_URL = `${editedUrl}/config/ea1d7060-6291-46b8-9468-135e7b94021b/lookups.json`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }
        // Get the JSON from the response
        const INFO = await RESPONSE.json();
        return INFO[5]["children"];
    }
    catch (error) 
    {
        // There was an error
        _apiExceptionHandler(error, "Get countries failed");
    }
}   




async function _getStates(AUTH_TOKEN, URL, DEBUG_MODE)
{
    const editedUrl = URL.replace(/https:\/\/(.+?)\./, 'https://').replace(/\/[^/]+$/, '');
    const API_URL = `${editedUrl}/config/ea1d7060-6291-46b8-9468-135e7b94021b/lookups.json`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }
        // Get the JSON from the response
        const INFO = await RESPONSE.json();
        return INFO[6]["children"];
    }
    catch (error) 
    {
        // There was an error
        _apiExceptionHandler(error, "Get countries failed");
    }
}   




async function _getUser(AUTH_TOKEN, URL, DEBUG_MODE)
{
    const API_URL = `${URL}/account/user`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }

        return await RESPONSE.json();
    }
    catch (error) {
        _apiExceptionHandler(error, "Get user failed");
    }
}







async function _updateUser(AUTH_TOKEN, URL, ADDRESS, ADDRESS2, CITY, COUNTRY, 
    FIRST_NAME, LAST_NAME, ORGANIZATION, PHONE_NUMBER, PHONE_EXT, POSTAL_CODE, STATE, DEBUG_MODE) 
{
    const USER_INFO = await _getUser(AUTH_TOKEN, URL, DEBUG_MODE);

    const API_URL = `${URL}/account/user`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {};

    const COUNTRY_INFO = await _getCountries(AUTH_TOKEN, URL, DEBUG_MODE);
    const COUNTRY_SELECTED = COUNTRY_INFO.find(country => country["label"] === COUNTRY);

    const STATE_INFO = await _getStates(AUTH_TOKEN, URL, DEBUG_MODE);
    const STATE_SELECTED = STATE_INFO.find(state => state["label"] === STATE)["label"];

    const keyValues = {
        address: ADDRESS,
        address2: ADDRESS2,
        city: CITY,
        state: STATE_SELECTED,
        country: COUNTRY_SELECTED,
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        phone: PHONE_NUMBER,
        phoneExt: PHONE_EXT,
        postalCode: POSTAL_CODE,
        organization: ORGANIZATION,
    };  

    for (const key in keyValues) 
    {
        if (keyValues[key] !== null) 
        {
            BODY[key] = keyValues[key];
        } 
        else 
        {
            const userInfoValue = USER_INFO[key];
            if (userInfoValue !== null && userInfoValue !== undefined) 
            {
                BODY[key] = userInfoValue;
            }
    }
    }


    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: PUT\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        // Check for success
        if (!RESPONSE.ok) {
            await RESPONSE.json();
        }

        return await RESPONSE.json();
    }
    catch (error) {
        _apiExceptionHandler(error, "Update user failed");
    }
}




async function _addContentsToContentGroup(AUTH_TOKEN, URL, CONTENT_GROUP_ID, CONTENTS, DEBUG_MODE)
{
	const API_URL = `${URL}/contentgroup/add/${CONTENT_GROUP_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = CONTENTS;

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});
	
		if (!RESPONSE.ok) {
    	    throw await RESPONSE.json()
    	}
			
  		return await RESPONSE.json();
	}
	catch (error)
	{
		_apiExceptionHandler(error, "Adding Contents to Content Group Failed");
	}	
}




async function _createContentGroup(AUTH_TOKEN, URL, NAME, DEBUG_MODE) 
{
    const API_URL = `${URL}/contentGroup`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = {};
    if (NAME) BODY.name = NAME;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Creating Content Group Failed");
    }
}




async function _deleteContentGroup(AUTH_TOKEN, URL, CONTENT_GROUP_ID, DEBUG_MODE) 
{
	const API_URL = `${URL}/contentgroup/${CONTENT_GROUP_ID}`;

	// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: DELETE`);

  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "DELETE",
    	    headers: HEADERS
    	});

		if (!RESPONSE.ok) {
    	    throw await RESPONSE.json()
    	}

  		return await RESPONSE.json();
	}
	catch (error)
	{
		_apiExceptionHandler(error, "Delete Content Group Failed");
	}
}




async function _getContentGroup(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/contentgroup/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    
  	}
    catch (error)
    {
        _apiExceptionHandler(error, "Get Content Group Failed");
    }
}




async function _getContentGroups(AUTH_TOKEN, URL, DEBUG_MODE) 
{
    const API_URL = `${URL}/contentgroup`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Content Groups Failed");
    }
}




async function _getPortalGroups(AUTH_TOKEN, URL, PORTAL_GROUPS, DEBUG_MODE) 
{
	const API_URL = `${URL}/portal/groups`;

	// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        "returnedGroupNames": PORTAL_GROUPS
    }

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
    {
      	const RESPONSE = await fetch(API_URL, {
      	    method: "POST",
      	    headers: HEADERS,
      	    body: JSON.stringify(BODY)
      	});

      	if (!RESPONSE.ok) {
      	    throw await RESPONSE.json()
      	}
	  
  	  	return await RESPONSE.json();
	}
	catch (error)
	{
		_apiExceptionHandler(error, "Getting Portal Groups Failed");
	}
}




async function _removeContentsFromContentGroup(AUTH_TOKEN, URL, CONTENT_GROUP_ID, CONTENTS, DEBUG_MODE) 
{
	const API_URL = `${URL}/contentgroup/remove/${CONTENT_GROUP_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = CONTENTS;

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});

    	if (!RESPONSE.ok) {
    	    throw await RESPONSE.json()
    	}

		return await RESPONSE.json();
	}
	catch (error)
	{
		_apiExceptionHandler(error, "Removing Content From Content Group Failed");
	}
}




async function _renameContentGroup(AUTH_TOKEN, URL, CONTENT_GROUP_ID, NAME, DEBUG_MODE) 
{
    const API_URL = `${URL}/contentgroup/${CONTENT_GROUP_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        Name: NAME
    };

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Renaming Content Group Failed");
    }
}




async function _shareContentGroupWithUsers(AUTH_TOKEN, URL, CONTENT_GROUP_ID, USER_IDS, DEBUG_MODE)
{
    const API_URL = `${URL}/contentgroup/share/${CONTENT_GROUP_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = USER_IDS;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Sharing Content Group With Users Failed");
    }
}




async function _stopSharingContentGroupWithUsers(AUTH_TOKEN, URL, CONTENT_GROUP_ID, USER_IDS, DEBUG_MODE)
{
    const API_URL = `${URL}/contentgroup/stopshare/${CONTENT_GROUP_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    const BODY = USER_IDS;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Stop Sharing Content Group With Users Failed");
    }
}




async function _guestInvite(AUTH_TOKEN, URL, CONTENT_ID, CONTENT_DEFINITION_ID, USER_ID, 
	EMAILS, CONTENT_SECURITY_ATTRIBUTE, DEBUG_MODE) 
{
	const API_URL = `${URL}/account/invite-user`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        contentId: CONTENT_ID,
        contentDefinitionId: CONTENT_DEFINITION_ID,
        userId: USER_ID,
        emails: EMAILS,
        contentSecurityAttribute: CONTENT_SECURITY_ATTRIBUTE
    };

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});

    	// Check for success
    	if (!RESPONSE.ok) {
    	    throw await RESPONSE.json();
    	}

		return await RESPONSE.json();
	}
	catch (error)
	{
    	_apiExceptionHandler(error,"Guest Invite failed");
	}
}




async function _participantPanelQuery(AUTH_TOKEN, URL, API_TYPE, ID, DEBUG_MODE) 
{
    let API_URL = "";
    if (API_TYPE == "admin")
    {
        API_URL = `${URL}/admin/user-session/${ID}`;
    }
    else
    {
        API_URL = `${URL}/user-session/${ID}`;
    }

    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);
  
    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS
        });

        // Check for success
        if (!RESPONSE.ok) {
            throw await RESPONSE.json();
        }

        return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error,"Participant panel query failed");
    }
}




async function _registerGuest(AUTH_TOKEN, URL, EMAIL, FIRST_NAME, LAST_NAME, PASSWORD, 
  DEBUG_MODE) 
{
	const API_URL = `${URL}/account/register-guest`;

	// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        email: EMAIL,
        firstName: FIRST_NAME,
        lastName: LAST_NAME,
        password: PASSWORD
    };

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});

    	// Check for success
    	if (!RESPONSE.ok) {
    	    throw await RESPONSE.json();
    	}

		return await RESPONSE.json();
	}
	catch (error)
	{
		_apiExceptionHandler(error,"Register guest failed");
	}
}




async function _removeGuest(AUTH_TOKEN, URL, CONTENT_ID, CONTENT_DEFINITION_ID, USER_ID, 
	EMAILS, CONTENT_SECURITY_ATTRIBUTE, DEBUG_MODE) 
{
	const API_URL = `${URL}/account/remove-user`;

	// Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
  	const BODY = {
        contentId: CONTENT_ID,
        contentDefinitionId: CONTENT_DEFINITION_ID,
        userId: USER_ID,
        emails: EMAILS,
        contentSecurityAttribute: CONTENT_SECURITY_ATTRIBUTE
    };

	if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);
  
  	try
	{
    	const RESPONSE = await fetch(API_URL, {
    	    method: "POST",
    	    headers: HEADERS,
    	    body: JSON.stringify(BODY)
    	});

    	// Check for success
    	if (!RESPONSE.ok) {
			throw await RESPONSE.json();
    	}

		return await RESPONSE.json();
	}
	catch (error)
	{
		_apiExceptionHandler(error,"Remove guest failed");
	}
}




async function _clearContinueWatching(AUTH_TOKEN, URL, USER_ID, ASSET_ID, DEBUG_MODE) 
{
    let apiUrl = `${URL}/media/clear-watching`;

    let params = [];
    if (USER_ID) params.push(`userId=${USER_ID}`);
    if (ASSET_ID) params.push(`assetId=${ASSET_ID}`);
    apiUrl += params.length ? `?${params.join('&')}` : '';

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${apiUrl}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(`${apiUrl}`, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Clear Continue Watching Failed");
    }
}




async function _clearWatchlist(AUTH_TOKEN, URL, USER_ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/clear-watchlist?userId=${USER_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Clear Watchlist Failed");
    }
}




async function _createForm(AUTH_TOKEN, URL, CONTENT_DEFINITION_ID, FORM_INFO, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/form/${CONTENT_DEFINITION_ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = FORM_INFO;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(API_URL, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Creating Form Failed");
    }
}




async function _getContentCookies(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/set-cookies/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Content Cookies Failed");
    }
}




async function _getDefaultSiteConfig(AUTH_TOKEN, URL, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/config`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Default Site Config Failed");
    }
}




async function _getDynamicContent(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/content/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Dynamic Content Failed");
    }
}




async function _getDynamicContents(AUTH_TOKEN, URL, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/content`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Dynamic Contents Failed");
    }
}




async function _getMediaGroup(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/group/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Media Group Failed");
    }
}




async function _getMediaItem(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/item/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Media Item Failed");
    }
}




async function _getMyContent(AUTH_TOKEN, URL, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/my-content`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get My Content Failed");
    }
}




async function _getMyGroup(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/my-group/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get My Group Failed");
    }
}




async function _getSiteConfig(AUTH_TOKEN, URL, ID, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/config/${ID}`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Site Config Failed");
    }
}




async function _mediaSearch(AUTH_TOKEN, URL, SEARCH_QUERY, IDS, SORT_FIELDS, 
    PAGE_OFFSET, PAGE_SIZE, DEBUG_MODE) 
{
    const API_URL = `${URL}/media/search`;

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);
  
    const BODY = {  
        searchQuery: SEARCH_QUERY,
        ids: IDS,
        sortFields: SORT_FIELDS
    };

    PAGE_OFFSET ? BODY["pageOffset"] = PAGE_OFFSET : BODY["pageOffset"] = 0;
    PAGE_SIZE ? BODY["pageSize"] = PAGE_SIZE : BODY["pageSize"] = 100;

    if (DEBUG_MODE) console.log(`URL: ${API_URL}\nMETHOD: POST\nBODY: ${JSON.stringify(BODY, null, 4 )}`);

    try
    {
        const RESPONSE = await fetch(`${API_URL}`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(BODY)
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    
  	    return await RESPONSE.json();
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Media Search Failed");
    }
}




async function _getVideoTracking(AUTH_TOKEN, URL, ASSET_ID, TRACKING_EVENT, SECOND, DEBUG_MODE) 
{
    let apiUrl = `${URL}/asset/tracking?assetId=${ASSET_ID}`

    // Create header for the request
    const HEADERS = new Headers();
    HEADERS.append("Content-Type", "application/json");
    HEADERS.append("Authorization", `Bearer ${AUTH_TOKEN}`);

    if (TRACKING_EVENT)
    {
        apiUrl += `&trackingEvent=${TRACKING_EVENT}`
    }

    if (SECOND)
    {
        apiUrl += `&second=${SECOND}`
    }

    if (DEBUG_MODE) console.log(`URL: ${apiUrl}\nMETHOD: GET`);

    try
    {
        const RESPONSE = await fetch(apiUrl, {
            method: "GET",
            headers: HEADERS
        });

        if (!RESPONSE.ok) {
            throw await RESPONSE.json()
        }
    }
    catch (error)
    {
        _apiExceptionHandler(error, "Get Video Tracking Failed");
    }
}


