/**
 * The worker_threads module provides a way to create multiple environments running
 * on independent threads, and to create worker threads to perform CPU-intensive
 * JavaScript operations. In this module, we use the workerData to receive input
 * data and the parentPort to communicate the results back to the parent thread.
 */
const { parentPort, workerData } = require('worker_threads');

/**
 * The csv-parser is a Node.js package that provides a fast CSV parsing and stringifying 
 * library for Node.js. It is stream-based, so it can handle large files without 
 * loading the entire CSV into memory.
 */
const csv = require('csv-parser');

/**
 * The Readable stream, part of Node.js's Stream module, provides a way to read data 
 * from a source. In this case, we're going to use it to read our CSV data.
 */
const { Readable } = require('stream');

/**
 * A simple function to check if a number is prime.
 */
function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

/**
 * Function to process each row of the CSV. It includes a simulated delay to 
 * mimic some complex processing on each row.
 */
function processRow(row) {
    // Simulated CPU-intensive task to introduce a delay
    for (let i = 0; i < 1e7; i++) {} 

    // Here we check if the 'someNumericField' from our CSV is a prime number.
    // More complex processing logic can be added here if necessary.
    if (isPrime(row.someNumericField)) {
        // Add more complex processing here if necessary
    }
}

/**
 * We create a readable stream from the CSV data passed to this worker thread.
 * Then we pipe this stream through the csv-parser to process each row.
 * After all rows are processed, we send a message back to the parent thread.
 */
const stream = Readable.from(workerData.toString());
stream.pipe(csv())
    .on('data', (row) => {
        processRow(row);
    })
    .on('end', () => {
        parentPort.postMessage('Processing complete');
    });
