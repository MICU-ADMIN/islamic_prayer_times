import axios from "axios";

export async function getPrayerTimeMethods() {
	const endpoint =
		'http://api.aladhan.com/v1/methods';

	try {
		const response = await axios.get(
			endpoint
		);
		return response.data;
	} catch (error) {
		throw new Error(
			`Failed to fetch prayer time calculation methods: ${error.message}`
		);
	}
}

// Example usage:
// getPrayerTimeMethods()
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});
