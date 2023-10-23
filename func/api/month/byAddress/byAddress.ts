import axios from "axios";
import { PrayerTimeOptions } from "../../../../interface/api/prayerTimeOptions";

export async function getMonthPrayerTimesByAddress(
	options: PrayerTimeOptions
) {
	const {
		address,
		year,
		month,
		method,
		shafaq,
		tune,
		school,
		midnightMode,
		latitudeAdjustmentMethod,
		adjustment,
		iso8601,
	} = options;

	const endpoint = `http://api.aladhan.com/v1/calendarByAddress/${
		year || ''
	}/${month || ''}`;

	const params: Record<string, any> = {
		address,
	};

	if (year) params.year = year;
	if (month) params.month = month;
	if (method) params.method = method;
	if (shafaq) params.shafaq = shafaq;
	if (tune) params.tune = tune;
	if (school) params.school = school;
	if (midnightMode)
		params.midnightMode =
			midnightMode;
	if (latitudeAdjustmentMethod)
		params.latitudeAdjustmentMethod =
			latitudeAdjustmentMethod;
	if (adjustment)
		params.adjustment = adjustment;
	if (iso8601)
		params.iso8601 = iso8601;

	try {
		const response = await axios.get(
			endpoint,
			{
				params,
			}
		);
		return response.data;
	} catch (error) {
		throw new Error(
			`Failed to fetch prayer times: ${error.message}`
		);
	}
}

// Example usage:
// const options: PrayerTimeOptions = {
// 	address:
// 		'Sultanahmet Mosque, Istanbul, Turkey',
// 	year: 2017,
// 	month: 4,
// 	method: 2,
// };

// getPrayerTimesByAddress(options)
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});
