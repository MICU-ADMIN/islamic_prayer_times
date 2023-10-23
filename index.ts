import {
	Edition,
	filterCollectionLanguages,
} from './util/languageFilter';
import { generateRandomNumber } from './util/maths';

const axios = require('axios');

type LanguageFilter = {
	language?: string;
};

type BaseParams = {
	editionName: string;
};

type EditionAndHadithNoParams =
	BaseParams & {
		hadithNo: number;
	};

type EditionAndSectionNoParams =
	BaseParams & {
		sectionNo: number;
	};

export async function hadithEditions(
	filter: LanguageFilter | null = null,
	minified = false
): Promise<any> {
	let url;

	if (minified) {
		url =
			'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.min.json';
	} else {
		url =
			'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json';
	}

	try {
		const response = await axios.get(
			url
		);

		if (response.status !== 200) {
			throw new Error(
				'Failed to fetch data'
			);
		}

		const data = response.data;
		if (filter?.language) {
			const { language } = filter;
			return filterCollectionLanguages(
				data,
				language
			);
		} else {
			return data;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Hadith editions:',
			error.message
		);
		throw error;
	}
}

// usage
// hadithEditions(
// 	{ language: 'english' },
// 	true
// );

export async function getHadithTranslation(
	params: BaseParams
): Promise<any> {
	const { editionName } = params;
	const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionName}.json`;

	try {
		const response = await axios.get(
			apiUrl
		);

		if (response.status !== 200) {
			throw new Error(
				'Failed to fetch data'
			);
		}

		const data = response.data;
		return data;
	} catch (error: any) {
		console.error(
			'Error fetching hadith:',
			error
		);
		throw error;
	}
}

// Usage example:
// const params = {
// 	editionName: 'eng-abudawud',
// };

export async function getHadithByNumber(
	params: EditionAndHadithNoParams,
	minified = false
): Promise<any> {
	const { editionName, hadithNo } =
		params;
	const extension = minified
		? '.min.json'
		: '.json';
	const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionName}/${hadithNo}${extension}`;

	try {
		const response = await axios.get(
			apiUrl
		);

		if (response.status !== 200) {
			throw new Error(
				'Failed to fetch data'
			);
		}

		const data = response.data;
		return data;
	} catch (error: any) {
		console.error(
			'Error fetching hadith:',
			error
		);
		throw error;
	}
}

// Usage example:
// const params = {
// 	editionName: 'eng-abudawud',
// 	hadithNo: 13,
// };

export async function getHadithSection(
	params: EditionAndSectionNoParams
): Promise<any> {
	const { editionName, sectionNo } =
		params;
	const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${editionName}/sections/${sectionNo}.json`;

	try {
		const response = await axios.get(
			apiUrl
		);

		if (response.status !== 200) {
			throw new Error(
				'Failed to fetch data'
			);
		}

		const data = response.data;
		return data;
	} catch (error: any) {
		console.error(
			'Error fetching section:',
			error
		);
		throw error;
	}
}

// Usage example to fetch Section 7:
// const params = {
// 	editionName: 'eng-abudawud',
// 	sectionNo: 7,
// };

export async function getEditions(
	filter?: LanguageFilter,
	minified = false
): Promise<any> {
	const editions =
		await hadithEditions({
			language: 'english',
		});

	if (editions) {
		// Generate random edition key
		console.log(editions);
		const editionKeys =
			Object.keys(editions);
		return editionKeys;
	}
}

export async function getRandomHadith(
	filter?: LanguageFilter,
	minified = false
): Promise<any> {
	const editions =
		await hadithEditions({
			language: filter?.language,
		});

	if (editions) {
		// Get an array of property names from the object
		const propertyNames =
			Object.keys(editions);

		// Generate a random index within the range of the propertyNames array
		const randomIndex = Math.floor(
			Math.random() *
				propertyNames.length
		);

		// Get the random property name using the random index
		const randomPropertyName =
			propertyNames[randomIndex];

		// Access the 'collection' property for the random property
		const collectionValue =
			editions[randomPropertyName]
				.collection;

		console.log(collectionValue); // Generate random edition key

		const collectionName =
			collectionValue[0].name;
		console.log(collectionName);

		async function randomHadith(
			index = generateRandomNumber(
				1,
				1000
			)
		) {
			let data =
				await getHadithByNumber(
					{
						editionName:
							collectionName,
						hadithNo: index,
					},
					minified
				);

			if (!data) {
				index = index / 2;
				randomHadith(index);
			} else {
				return data;
			}
		}
		return randomHadith();
	}
}

// Usage example to fetch Section 7:
// const params = {
// 	editionName: 'eng-abudawud',
// 	sectionNo: 7,
// };

export async function quranEditions(
	format = null,
	language = null,
	type = null
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/edition';

	// Build the query string with optional parameters
	const queryParams = [];
	if (format)
		queryParams.push(
			`format=${format}`
		);
	if (language)
		queryParams.push(
			`language=${language}`
		);
	if (type)
		queryParams.push(`type=${type}`);
	const queryString =
		queryParams.join('&');

	// Combine the base URL with the query string
	const endpointUrl = queryString
		? `${baseUrl}?${queryString}`
		: baseUrl;

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Parse the JSON response
			const data = response.data;

			// Return the list of editions
			return data;
		} else {
			console.error(
				'Failed to fetch editions.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching editions:',
			error.message
		);
		return null;
	}
}

export async function listLanguages() {
	const baseUrl =
		'http://api.alquran.cloud/v1/edition/language';

	try {
		const response = await axios.get(
			baseUrl
		);

		if (response.status === 200) {
			const data = response.data;
			return data;
		} else {
			console.error(
				'Failed to fetch languages.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching languages:',
			error.message
		);
		return null;
	}
}

// Example usage:
// listLanguages().then(languages => console.log(languages));

// Example usage:
// listAllEditions('audio', 'fr', 'versebyverse').then(editions => console.log(editions));

export async function listEditionsByLanguage(
	language: string
) {
	const baseUrl = `http://api.alquran.cloud/v1/edition/language/${language}`;

	try {
		const response = await axios.get(
			baseUrl
		);

		if (response.status === 200) {
			const data = response.data;
			return data;
		} else {
			console.error(
				`Failed to fetch editions for language '${language}'.`
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching editions:',
			error.message
		);
		return null;
	}
}

// Example usage:
// listEditionsByLanguage('en').then(editions => console.log(editions));

export async function listTypes() {
	const baseUrl =
		'http://api.alquran.cloud/v1/edition/type';

	try {
		const response = await axios.get(
			baseUrl
		);

		if (response.status === 200) {
			const data = response.data;
			return data;
		} else {
			console.error(
				'Failed to fetch types.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching types:',
			error.message
		);
		return null;
	}
}

// Example usage:
// listTypes().then(types => console.log(types));

async function listEditionsByType(
	type: string
) {
	const baseUrl = `http://api.alquran.cloud/v1/edition/type/${type}`;

	try {
		const response = await axios.get(
			baseUrl
		);

		if (response.status === 200) {
			const data = response.data;
			return data;
		} else {
			console.error(
				`Failed to fetch editions for type '${type}'.`
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching editions:',
			error.message
		);
		return null;
	}
}

// Example usage:
// listEditionsByType('translation').then(editions => console.log(editions));

export async function listFormats() {
	const baseUrl =
		'http://api.alquran.cloud/v1/edition/format';

	try {
		const response = await axios.get(
			baseUrl
		);

		if (response.status === 200) {
			const data = response.data;
			return data;
		} else {
			console.error(
				'Failed to fetch formats.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching formats:',
			error.message
		);
		return null;
	}
}

// Example usage:
// listFormats().then(formats => console.log(formats));

async function listEditionsByFormat(
	format: string
) {
	const baseUrl = `http://api.alquran.cloud/v1/edition/format/${format}`;

	try {
		const response = await axios.get(
			baseUrl
		);

		if (response.status === 200) {
			const data = response.data;
			return data;
		} else {
			console.error(
				`Failed to fetch editions for format '${format}'.`
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching editions:',
			error.message
		);
		return null;
	}
}

// Example usage:
// listEditionsByFormat('text').then(editions => console.log(editions));

export async function getQuranEdition(
	editionIdentifier: string
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/quran/';

	// Combine the base URL with the edition identifier
	const endpointUrl =
		baseUrl + editionIdentifier;

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Quran edition data
			return response.data;
		} else {
			console.error(
				'Failed to fetch Quran edition.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Quran edition:',
			error.message
		);
		return null;
	}
}

// Example usage:
// const editionIdentifier = 'en.asad'; // Replace with the desired edition identifier
// getQuranEdition(editionIdentifier).then(quranData => console.log(quranData));

export async function getJuzFromEdition(
	juzNumber: number,
	editionIdentifier: string,
	offset = null,
	limit = null
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/juz/';

	// Combine the base URL with the Juz number and edition identifier
	let endpointUrl =
		baseUrl +
		juzNumber +
		'/' +
		editionIdentifier;

	// Add optional parameters to the query string if provided
	if (
		offset !== null ||
		limit !== null
	) {
		const queryParams = [];
		if (offset !== null)
			queryParams.push(
				`offset=${offset}`
			);
		if (limit !== null)
			queryParams.push(
				`limit=${limit}`
			);
		const queryString =
			queryParams.join('&');
		endpointUrl += '?' + queryString;
	}

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Juz data
			return response.data;
		} else {
			console.error(
				'Failed to fetch Juz.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Juz:',
			error.message
		);
		return null;
	}
}

export async function listAllSurahs() {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/surah';

	try {
		// Make a GET request to the API
		const response = await axios.get(
			baseUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the list of Surahs
			return response.data;
		} else {
			console.error(
				'Failed to fetch Surahs.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Surahs:',
			error.message
		);
		return null;
	}
}

// Example usage:
// listAllSurahs().then(surahs => console.log(surahs));

export async function getSurahFromEdition(
	surahNumber: number,
	editionIdentifier: string,
	offset = null,
	limit = null
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/surah/';

	// Combine the base URL with the Surah number and edition identifier
	let endpointUrl =
		baseUrl +
		surahNumber +
		'/' +
		editionIdentifier;

	// Add optional parameters to the query string if provided
	if (
		offset !== null ||
		limit !== null
	) {
		const queryParams = [];
		if (offset !== null)
			queryParams.push(
				`offset=${offset}`
			);
		if (limit !== null)
			queryParams.push(
				`limit=${limit}`
			);
		const queryString =
			queryParams.join('&');
		endpointUrl += '?' + queryString;
	}

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Surah data
			return response.data;
		} else {
			console.error(
				'Failed to fetch Surah.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Surah:',
			error.message
		);
		return null;
	}
}

// Example usage:
// const surahNumber = 114; // Replace with the desired Surah number (1 to 114)
// const editionIdentifier = 'en.asad'; // Replace with the desired edition identifier
// const offset = 1; // Optional: Offset ayahs in the Surah by a given number
// const limit = 3; // Optional: Limit the number of ayahs in the response
// getSurahFromEdition(surahNumber, editionIdentifier, offset, limit).then(surahData => console.log(surahData));

export async function getSurahFromMultipleEditions(
	surahNumber: number,
	editionIdentifiers: any
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/surah/';

	// Combine the base URL with the Surah number and multiple edition identifiers
	const editionParams =
		editionIdentifiers.join(',');
	const endpointUrl = `${baseUrl}${surahNumber}/editions/${editionParams}`;

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Surah data from multiple editions
			return response.data;
		} else {
			console.error(
				'Failed to fetch Surah from multiple editions.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Surah from multiple editions:',
			error.message
		);
		return null;
	}
}

// Example usage:
// const surahNumber = 114; // Replace with the desired Surah number (1 to 114)
// const editionIdentifiers = ['quran-uthmani', 'en.asad', 'en.pickthall']; // Replace with desired edition identifiers
// getSurahFromMultipleEditions(surahNumber, editionIdentifiers).then(surahData => console.log(surahData));

export async function searchQuranText(
	keyword: string,
	surah: string,
	editionOrLanguage: string
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/search/';

	// Combine the base URL with the keyword, surah, and edition/language
	const endpointUrl =
		baseUrl +
		keyword +
		'/' +
		surah +
		'/' +
		editionOrLanguage;

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the search results
			return response.data;
		} else {
			console.error(
				'Failed to perform the Quran search.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error during Quran search:',
			error.message
		);
		return null;
	}
}

// Example usage:
// const keyword = 'Abraham'; // Replace with the desired keyword to search
// const surah = 'all'; // Replace with the desired surah number (between 1 and 114) or 'all' to search all text
// const editionOrLanguage = 'en.pickthall'; // Replace with the desired edition or language identifier
// searchQuranText(keyword, surah, editionOrLanguage).then(searchResults => console.log(searchResults));

export async function getManzilFromEdition(
	manzilNumber: number,
	editionIdentifier: string,
	offset = null,
	limit = null
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/manzil/';

	// Combine the base URL with the Manzil number and edition identifier
	let endpointUrl =
		baseUrl +
		manzilNumber +
		'/' +
		editionIdentifier;

	// Add optional parameters to the query string if provided
	if (
		offset !== null ||
		limit !== null
	) {
		const queryParams = [];
		if (offset !== null)
			queryParams.push(
				`offset=${offset}`
			);
		if (limit !== null)
			queryParams.push(
				`limit=${limit}`
			);
		const queryString =
			queryParams.join('&');
		endpointUrl += '?' + queryString;
	}

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Manzil data
			return response.data;
		} else {
			console.error(
				'Failed to fetch Manzil.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Manzil:',
			error.message
		);
		return null;
	}
}

// Example usage:
// const manzilNumber = 7; // Replace with the desired Manzil number (1 to 7)
// const editionIdentifier = 'en.asad'; // Replace with the desired edition identifier
// const offset = 3; // Optional: Offset ayahs in the Manzil by a given number
// const limit = 10; // Optional: Limit the number of ayahs in the response
// getManzilFromEdition(manzilNumber, editionIdentifier, offset, limit).then(manzilData => console.log(manzilData));

export async function getRukuFromEdition(
	rukuNumber: number,
	editionIdentifier: string,
	offset = null,
	limit = null
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/ruku/';

	// Combine the base URL with the Ruku number and edition identifier
	let endpointUrl =
		baseUrl +
		rukuNumber +
		'/' +
		editionIdentifier;

	// Add optional parameters to the query string if provided
	if (
		offset !== null ||
		limit !== null
	) {
		const queryParams = [];
		if (offset !== null)
			queryParams.push(
				`offset=${offset}`
			);
		if (limit !== null)
			queryParams.push(
				`limit=${limit}`
			);
		const queryString =
			queryParams.join('&');
		endpointUrl += '?' + queryString;
	}

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Ruku data
			return response.data;
		} else {
			console.error(
				'Failed to fetch Ruku.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Ruku:',
			error.message
		);
		return null;
	}
}

// Example usage:
// const rukuNumber = 7; // Replace with the desired Ruku number (1 to 556)
// const editionIdentifier = 'en.asad'; // Replace with the desired edition identifier
// const offset = 3; // Optional: Offset ayahs in the Ruku by a given number
// const limit = 3; // Optional: Limit the number of ayahs in the response
// get

export async function getPageFromEdition(
	pageNumber: number,
	editionIdentifier: string,
	offset = null,
	limit = null
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/page/';

	// Combine the base URL with the page number and edition identifier
	let endpointUrl =
		baseUrl +
		pageNumber +
		'/' +
		editionIdentifier;

	// Add optional parameters to the query string if provided
	if (
		offset !== null ||
		limit !== null
	) {
		const queryParams = [];
		if (offset !== null)
			queryParams.push(
				`offset=${offset}`
			);
		if (limit !== null)
			queryParams.push(
				`limit=${limit}`
			);
		const queryString =
			queryParams.join('&');
		endpointUrl += '?' + queryString;
	}

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Page data
			return response.data;
		} else {
			console.error(
				'Failed to fetch Page.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Page:',
			error.message
		);
		return null;
	}
}

// Example usage:
// const pageNumber = 1; // Replace with the desired page number (1 to 604)
// const editionIdentifier = 'en.asad'; // Replace with the desired edition identifier
// const offset = 2; // Optional: Offset ayahs in the page by a given number
// const limit = 2; // Optional: Limit the number of ayahs in the response
// getPageFromEdition(pageNumber, editionIdentifier, offset, limit).then(pageData => console.log(pageData));

export async function getHizbQuarterFromEdition(
	hizbQuarterNumber: number,
	editionIdentifier: string,
	offset = null,
	limit = null
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/hizbQuarter/';

	// Combine the base URL with the Hizb Quarter number and edition identifier
	let endpointUrl =
		baseUrl +
		hizbQuarterNumber +
		'/' +
		editionIdentifier;

	// Add optional parameters to the query string if provided
	if (
		offset !== null ||
		limit !== null
	) {
		const queryParams = [];
		if (offset !== null)
			queryParams.push(
				`offset=${offset}`
			);
		if (limit !== null)
			queryParams.push(
				`limit=${limit}`
			);
		const queryString =
			queryParams.join('&');
		endpointUrl += '?' + queryString;
	}

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Hizb Quarter data
			return response.data;
		} else {
			console.error(
				'Failed to fetch Hizb Quarter.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Hizb Quarter:',
			error.message
		);
		return null;
	}
}

// Example usage:
// const hizbQuarterNumber = 1; // Replace with the desired Hizb Quarter number (1 to 240)
// const editionIdentifier = 'en.asad'; // Replace with the desired edition identifier
// const offset = 2; // Optional: Offset ayahs in the Hizb Quarter by a given number
// const limit = 2; // Optional: Limit the number of ayahs in the response
// getHizbQuarterFromEdition(hizbQuarterNumber, editionIdentifier, offset, limit).then(hizbQuarterData => console.log(hizbQuarterData));

export async function getSajdaVersesFromEdition(
	editionIdentifier: string
) {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/sajda/';

	// Combine the base URL with the edition identifier
	const endpointUrl =
		baseUrl + editionIdentifier;

	try {
		// Make a GET request to the API
		const response = await axios.get(
			endpointUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Sajda verses data
			return response.data;
		} else {
			console.error(
				'Failed to fetch Sajda verses.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Sajda verses:',
			error.message
		);
		return null;
	}
}

// Example usage:
// const editionIdentifier = 'en.asad'; // Replace with the desired edition identifier
// getSajdaVersesFromEdition(editionIdentifier).then(sajdaVersesData => console.log(sajdaVersesData));

export async function getQuranMetaData() {
	// Define the base API URL
	const baseUrl =
		'http://api.alquran.cloud/v1/meta';

	try {
		// Make a GET request to the API
		const response = await axios.get(
			baseUrl
		);

		// Check if the request was successful (status code 200)
		if (response.status === 200) {
			// Return the Quran meta data
			return response.data;
		} else {
			console.error(
				'Failed to fetch Quran meta data.'
			);
			return null;
		}
	} catch (error: any) {
		console.error(
			'Error fetching Quran meta data:',
			error.message
		);
		return null;
	}
}

// Example usage:
// getQuranMetaData().then(quranMetaData => console.log(quranMetaData));

//  async function fetchDataAndLog() {
// 	try {
// 		const data =
// 			await getRandomHadith({
// 				language: 'english',
// 			});
// 		// { language: 'english' },
// 		// true
// 		// await getHadithSection(params);
// 		console.log(JSON.stringify(data)); // Use the data here
// 		// filter
// 	} catch (error: any) {
// 		console.error(
// 			'Error:',
// 			error.message
// 		);
// 	}
// }

// fetchDataAndLog();
