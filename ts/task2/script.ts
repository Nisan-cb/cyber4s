import { exit } from "process";

const params = process.argv.slice(2);
const height: number = Number(params[0]);
const weight: number = Number(params[1]);
console.log(height, weight)
if (!height || !weight) {
    console.log("not valid parameters");
    exit();
}

function calculateBmi(height: number, weight: number): string {
    height /= 100;
    let result: number = weight / (height * height);
    if (result > 25)
        return "Overweight";
    else if (result < 18.5)
        return "Underweight";
    else
        return "Normal (healthy weight)";
}

console.log(calculateBmi(height, weight));