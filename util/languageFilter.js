"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterCollectionLanguages = void 0;
const filterCollectionLanguages = (collections, language) => {
    const filteredCollections = {};
    for (const collectionName in collections) {
        const collection = collections[collectionName]
            .collection;
        const filteredCollection = collection.filter((item) => item.language
            .trim()
            .toLowerCase() ===
            language
                .trim()
                .toLowerCase());
        filteredCollections[collectionName] = {
            name: collections[collectionName].name,
            collection: filteredCollection,
        };
    }
    return filteredCollections;
};
exports.filterCollectionLanguages = filterCollectionLanguages;
