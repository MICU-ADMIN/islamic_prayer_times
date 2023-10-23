````markdown
# islamic_prayer_times NPM

The islamic prayer times NPM package
simplifies access to Islamic prayer
times data for developers. This package
extends the functionality of the Prayer
Times API repository to provide an
easy-to-use interface for retrieving
prayer times information.

## Installation

You can install the Sacred Texts NPM
package via npm:

```bash
npm i @mosqueicu/islamic_prayer_times
```
````

## importing the package

Import the package in your code:

```javascript
const islamic_prayer_times = require('@mosqueicu/islamic_prayer_times');
```

### Functions

# `getPrayerTimes` Function

## Description

The `getPrayerTimes` function is a
JavaScript function for fetching daily
prayer times based on various parameters
such as date, location coordinates,
calculation method, and other optional
settings. It utilizes the Aladhan API to
retrieve accurate prayer times.

## Usage

To use this function, you need to import
it into your JavaScript/TypeScript
project. Here's how you can import it:

```javascript
import { getPrayerTimes } from '@mosqueicu/islamic_prayer_times';
```

### Function Signature

```javascript
async function getPrayerTimes(options): Promise<any>
```

### Parameters

-  `options` (required): An object of
   type `PrayerTimeOptions` containing
   the following properties:
   -  `date` (string, required): The
      date for which you want to fetch
      prayer times in the format
      'DD-MM-YYYY'.
   -  `latitude` (number, required): The
      latitude of the location for which
      you want to fetch prayer times.
   -  `longitude` (number, required):
      The longitude of the location for
      which you want to fetch prayer
      times.
   -  `method` (number, optional): The
      calculation method for prayer
      times. Defaults to `null`.
   -  `shafaq` (number, optional): The
      shafaq method for prayer times.
      Defaults to `null`.
   -  `tune` (number, optional): The
      tune method for prayer times.
      Defaults to `null`.
   -  `school` (number, optional): The
      school of jurisprudence for prayer
      times. Defaults to `null`.
   -  `midnightMode` (number, optional):
      The midnight mode for prayer
      times. Defaults to `null`.
   -  `timezonestring` (string,
      optional): The time zone string
      for the location. Defaults to
      `null`.
   -  `latitudeAdjustmentMethod`
      (string, optional): The latitude
      adjustment method for prayer
      times. Defaults to `null`.
   -  `adjustment` (number, optional):
      The adjustment for prayer times.
      Defaults to `null`.
   -  `iso8601` (boolean, optional):
      Whether to return prayer times in
      ISO8601 format. Defaults to
      `null`.

### Returns

-  A Promise that resolves to an object
   containing the prayer times data or
   rejects with an error if the request
   fails.

## Example

Here's an example of how to use the
`getPrayerTimes` function:

```javascript
const options: PrayerTimeOptions = {
	date: '17-07-2007',
	latitude: 51.508515,
	longitude: -0.1254872,
	method: 2, // Calculation method (optional)
};

getPrayerTimes(options)
	.then((data) => {
		console.log(data); // Print the retrieved prayer times data
	})
	.catch((error) => {
		console.error(error); // Handle any errors that occur during the request
	});
```

In this example, you specify the date
and location coordinates in the
`options` object and, if needed,
additional parameters for calculation
methods. The function then makes an API
request to fetch the daily prayer times
and returns the data.

## Error Handling

The function handles errors by rejecting
the Promise if there is a failure in
fetching the data. You can catch these
errors and handle them as needed.

### Error Object

The error object thrown by the function
will include an error message indicating
the reason for the failure.

```javascript
Error: Failed to fetch prayer times: [error message]
```

## API Endpoint

The function uses the Aladhan API to
retrieve prayer times data. The API
endpoint is constructed based on the
provided date.

-  API Endpoint:
   `http://api.aladhan.com/v1/timings/[date]`

Please note that you need an internet
connection to access the API.

## License

This function is provided under [your
project's license].

## Credits

This function was developed by
MosqueICU. If you have any questions or
need support, please contact us on
https://discord.gg/WtKVyeeDrZ or visit
our website at https://mosque.icu.

## License

This package is released under the
[MIT](OPENSOURCE) license.

```

```
