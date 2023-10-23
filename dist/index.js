"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// index.ts
var scacred_texts_exports = {};
__export(scacred_texts_exports, {
  hadithEditions: () => hadithEditions
});
module.exports = __toCommonJS(scacred_texts_exports);

// util/orderLangauge.ts
function filterCollectionsByLanguage(language, hadithData) {
  return __async(this, null, function* () {
    const filteredCollections = {};
    for (const collectionName in hadithData) {
      const collectionData = hadithData[collectionName];
      const filteredBooks = [];
      for (const bookData of collectionData.collection) {
        if (bookData.language === language) {
          filteredBooks.push(
            bookData
          );
        }
      }
      if (filteredBooks.length > 0) {
        filteredCollections[collectionName] = {
          name: collectionData.name,
          collection: filteredBooks
        };
      }
    }
    return filteredCollections;
  });
}

// index.ts
var axios = require("axios");
function hadithEditions(minified = false, language = "English") {
  return __async(this, null, function* () {
    let url;
    if (minified) {
      url = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.min.json";
    } else {
      url = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json";
    }
    try {
      const response = yield axios.get(
        url
      );
      if (response.status !== 200) {
        throw new Error(
          "Failed to fetch data"
        );
      }
      const data = response.data;
      if (language) {
        return filterCollectionsByLanguage(
          language,
          data
        );
      } else {
        return data;
      }
    } catch (error) {
      console.error(
        "Error fetching Hadith editions:",
        error.message
      );
      throw error;
    }
  });
}
function fetchDataAndLog() {
  return __async(this, null, function* () {
    try {
      const data = yield hadithEditions();
      console.log(data);
    } catch (error) {
      console.error(
        "Error:",
        error.message
      );
    }
  });
}
fetchDataAndLog();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hadithEditions
});
