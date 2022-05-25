"use strict";
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
console.log(calculateBmi(180, 74));
