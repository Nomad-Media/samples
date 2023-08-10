/**
 *  Load Template
 *
 * @param templateFile  | The name of the template file
 */
export async function loadTemplate(templateFile) {
    // Check for valid parameter
    if (!templateFile) {
        throw new Error("Load Template called with invalid parameter");
    }

    // Read the template file
    return await fetch(`./templates/${templateFile}`)
        .then((template) => {
            // Return the template file content as text
            return template.text();
        })
        .then((text) => {
            // Create a DOM parser
            const parser = new DOMParser();

            // Parse the text into a document and get the template
            const template = parser.parseFromString(text, "text/html").querySelector("template");

            // Check for valid template
            if (!template) {
                throw new Error(`Load Template failed: File [./templates/${templateFile}] does not contain a template`);
            }
            // Get the id of the template
            const templateId = template.id;

            // Id attribute is required
            if (!templateId) {
                throw new Error(`Load Template failed: Template ${templateFile} is missing the required ID attribute`);
            }

            // Get document tags with the same name than the template id
            const templateTagCollection = document.getElementsByTagName(templateId);

            // Check if elements were found in the document
            if (!templateTagCollection || templateTagCollection.length === 0) {
                throw new Error(`Load Template failed: Template tag with name ${templateId} was not found`);
            }

            // Spread the collection into an array
            const templateTagArray = [...templateTagCollection];

            // Insert the template into each tag
            templateTagArray.forEach((tag) => {
                tag.innerHTML = template.innerHTML;
            });

            // Return the first tag element
            return templateTagCollection[0];
        })
        .catch((err) => {
            throw new Error(`Load Template ${templateFile} failed: ${err}`);
        });
}
