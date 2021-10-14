import emissions from '../public/emissions.json';

// ranges to calculate emissions
const distArr = [125, 250, 500, 750, 1000, 1500, 2000, 2500, 3000];

// find the closest integer from distArr to the distance -> to be able to calculate the emsisions more accurately
export const closest = (array, input) => {
	const value = array.reduce((prev, curr) => {
		return Math.abs(curr - input) < Math.abs(prev - input) ? curr : prev;
	});

	return value;
};

// get the co2 emissions for each trip i.e. berlin to meetingpoint, london to meetingpoint, etc.
export const getCO2Array = (array) => {
	const co2Array = [];
	array.map((item) => {
		// convert distance to Nautical Miles
		const itemDistInNauticalMiles = item * 0.539957;

		// find the closest integer from distArr to the distance -> to be able to calculate the emsisions more accurately
		const distVal = closest(distArr, itemDistInNauticalMiles);

		const co2for1NM = emissions.CCD.SMR[distVal].CO2 / distVal;

		let co2ForCCD = co2for1NM * itemDistInNauticalMiles;

		if (itemDistInNauticalMiles > 1) co2ForCCD = co2ForCCD + 3153.59;

		co2Array.push(co2ForCCD);
	});
	return co2Array;
};
