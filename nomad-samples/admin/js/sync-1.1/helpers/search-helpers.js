/**
 * Converts a list of search results items into a lookup dictionary (Map)
 *
 * @param {object} searchResults
 *
 * @returns {Map}
 */
export default function searchResultsToLookupMap(searchResults) {
    // Create a new map
    const lookupMap = new Map();

    // Check if we have search results items
    if (searchResults && searchResults.hasItems) {
        // Add each item title and id to the map
        searchResults.items.forEach((item) => {
            lookupMap.set(item.title, item.id);
        });
    }

    // Return the map
    return lookupMap;
}
