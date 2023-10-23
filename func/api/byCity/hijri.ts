import axios from "axios";
import { PrayerTimeOptions } from "../../../interface/api/prayerTimeOptions";

export async function getHijriPrayerTimesByCity(
	options: PrayerTimeOptions
) {
	const {
		city,
		country,
		state,
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

	const endpoint = `http://api.aladhan.com/v1/hijriCalendarByCity/${
		year || ''
	}/${month || ''}`;

	const params: Record<string, any> = {
		city,
		country,
	};

	if (state) params.state = state;
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
			`Failed to fetch Hijri calendar-based prayer times: ${error.message}`
		);
	}
}

// Example usage:
// const options: PrayerTimeOptions = {
// 	city: 'London',
// 	country: 'United Kingdom',
// 	year: 1437,
// 	month: 4,
// 	method: 2,
// };

// getHijriPrayerTimesByCity(options)
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});
