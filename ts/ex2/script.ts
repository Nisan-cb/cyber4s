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

console.log(calculateBmi(180, 74));