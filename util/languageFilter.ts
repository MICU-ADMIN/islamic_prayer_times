export type Edition = {
	name: string;
	book: string;
	author: string;
	language: string;
	has_sections: boolean;
	direction: string;
	source: string;
	comments: string;
	link: string;
	linkmin: string;
};

type CollectionData = {
	[key: string]: {
		name: string;
		collection: Edition[];
	};
};

export const filterCollectionLanguages =
	(
		collections: CollectionData,
		language: string
	): CollectionData => {
		const filteredCollections: CollectionData =
			{};

		for (const collectionName in collections) {
			const collection =
				collections[collectionName]
					.collection;
			const filteredCollection =
				collection.filter(
					(item) =>
						item.language
							.trim()
							.toLowerCase() ===
						language
							.trim()
							.toLowerCase()
				);

			filteredCollections[
				collectionName
			] = {
				name: collections[
					collectionName
				].name,
				collection:
					filteredCollection,
			};
		}

		return filteredCollections;
	};
