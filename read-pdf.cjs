const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('TEMPLATE-SPH.pdf');

pdf(dataBuffer).then(function(data) {
    console.log("--- SPH ---");
    console.log(data.text);
});

let dataBuffer2 = fs.readFileSync('TEMPLATE-INVOICE.pdf');

pdf(dataBuffer2).then(function(data) {
    console.log("--- INVOICE ---");
    console.log(data.text);
});
