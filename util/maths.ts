export function generateRandomNumber(
	minValue: number,
	maxValue: number
) {
	// Generate a random number between minValue (inclusive) and maxValue (inclusive)
	return (
		Math.floor(
			Math.random() *
				(maxValue - minValue + 1)
		) + minValue
	);
}
