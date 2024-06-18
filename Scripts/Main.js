"use strict";

// [+] For High Performance
const $ = document;

// [+] Functions
function addZeroToNumber(number){
    number = number ?? 0;
    return (number <= 9) ? "0" + number : number;
}