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

export default _apiExceptionHandler;