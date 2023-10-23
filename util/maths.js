"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = void 0;
function generateRandomNumber(minValue, maxValue) {
    // Generate a random number between minValue (inclusive) and maxValue (inclusive)
    return (Math.floor(Math.random() *
        (maxValue - minValue + 1)) + minValue);
}
exports.generateRandomNumber = generateRandomNumber;
