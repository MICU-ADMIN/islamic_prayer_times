````markdown
# sacred_texts NPM

The Sacred Texts NPM package simplifies
access to Hadiths and Quranic verses for
developers. This package builds upon the
Hadith API repository to provide an
easy-to-use interface for retrieving
sacred texts.

## Installation

You can install the Sacred Texts NPM
package via npm:

```bash
npm i sacred_texts
```
````

## Usage

Import the package in your code:

```javascript
const sacredTexts = require('sacred_texts');
```

### Functions

#### `listAvailableEditions(options)`

This function retrieves a list of
available Hadith editions.

-  `options.language` (optional): Filter
   editions by language.
-  `options.limit` (optional): Limit the
   number of editions returned.

Returns: An array of available Hadith
editions.

#### `getMinifiedEditions(options)`

This function retrieves a list of
minified Hadith editions.

-  `options.language` (optional): Filter
   editions by language.
-  `options.limit` (optional): Limit the
   number of editions returned.

Returns: An array of minified Hadith
editions.

#### `getHadithByEdition(options)`

This function retrieves Hadiths from a
specific edition.

-  `options.editionName`: The name of
   the edition.
-  `options.language` (optional): Filter
   Hadiths by language.
-  `options.limit` (optional): Limit the
   number of Hadiths returned.

Returns: An array of Hadiths from the
specified edition.

#### `getSpecificHadith(options)`

This function retrieves a specific
Hadith from a given edition.

-  `options.editionName`: The name of
   the edition.
-  `options.HadithNo`: The number of the
   specific Hadith.
-  `options.language` (optional): Filter
   Hadiths by language.
-  `options.limit` (optional): Limit the
   number of Hadiths returned.

Returns: An array containing the
specific Hadith.

#### `getMinifiedSpecificHadith(options)`

This function retrieves a minified
version of a specific Hadith from a
given edition.

-  `options.editionName`: The name of
   the edition.
-  `options.HadithNo`: The number of the
   specific Hadith.
-  `options.language` (optional): Filter
   Hadiths by language.
-  `options.limit` (optional): Limit the
   number of Hadiths returned.

Returns: An array containing the
minified version of the specific Hadith.

#### `getSectionByNumber(options)`

This function retrieves a section of
Hadiths from a specific edition based on
section number.

-  `options.editionName`: The name of
   the edition.
-  `options.sectionNo`: The number of
   the section.
-  `options.language` (optional): Filter
   Hadiths by language.
-  `options.limit` (optional): Limit the
   number of Hadiths returned.

Returns: An array of Hadiths from the
specified section.

#### `getHadithBookDetails(options)`

This function retrieves details about
the Hadith book.

-  `options.language` (optional): Filter
   book details by language.
-  `options.limit` (optional): Limit the
   number of book details returned.

Returns: An array containing details
about the Hadith book.

#### `randomHadith(options)`

This function retrieves random Hadiths.

-  `options.language` (optional): Filter
   random Hadiths by language.
-  `options.limit` (optional): Limit the
   number of random Hadiths returned.

Returns: An array of random Hadiths.

## License

This package is released under the
[LICENSE](LICENSE) license.

```

You can include additional sections or information as needed, and don't forget to replace `[LICENSE](LICENSE)` with a link to the actual license file if you have one.
```
