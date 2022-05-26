"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const params = process.argv.slice(2);
const height = Number(params[0]);
const weight = Number(params[1]);
console.log(height, weight);
if (!height || !weight) {
    console.log("not valid parameters");
    (0, process_1.exit)();
}
function calculateBmi(height, weight) {
    height /= 100;
    let result = weight / (height * height);
    if (result > 25)
        return "Overweight";
    else if (result < 18.5)
        return "Underweight";
    else
        return "Normal (healthy weight)";
}
console.log(calculateBmi(height, weight));
