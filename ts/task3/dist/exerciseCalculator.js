"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const params = process.argv.slice(2).map(str => {
    let number_val = Number(str);
    if (number_val !== NaN)
        return Number(str);
    console.log("not valid parameters");
    (0, process_1.exit)();
});
console.log(params);
function calculateExercises(array, target) {
    const result = {
        periodLengh: array.length,
        traningDays: 0,
        success: true,
        rating: 0,
        ratingDescription: "",
        target: target,
        average: 0
    };
    for (const day of array) {
        result.average += day;
        if (day !== 0)
            result.traningDays++;
    }
    result.average /= result.periodLengh; // calc avg
    if (result.average < target) // checks if success
        result.success = false;
    if (result.average / target > 0.99) {
        result.rating = 3;
        result.ratingDescription = "Good job!";
    }
    else if (result.average / target > 0.8) {
        result.rating = 2;
        result.ratingDescription = "not too bad but could be better";
    }
    else {
        result.rating = 1;
        result.ratingDescription = "start to work asshole";
    }
    return result;
}
// let array: number[] = [3, 0, 2, 4.5, 0, 3, 1];
// let target: number = 2;
console.log(params[0]);
console.log(params.slice(1));
console.log(calculateExercises(params.slice(1), params[0]));
