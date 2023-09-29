const { parentPort, workerData } = require('worker_threads');
const csv = require('csv-parser');
const { Readable } = require('stream');

function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

function processRow(row) {
    for (let i = 0; i < 1e7; i++) {} // Simulated delay

    if (isPrime(row.someNumericField)) {
        // Add more complex processing here if necessary
    }
}

const stream = Readable.from(workerData.toString());
stream.pipe(csv())
    .on('data', (row) => {
        processRow(row);
    })
    .on('end', () => {
        parentPort.postMessage('Processing complete');
    });
