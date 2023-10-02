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
const e = require('express');

/**
 * A simple function to check if a number is prime.
 */
function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function to process each row of the CSV. It includes a simulated delay to 
 * mimic some complex processing on each row.
 */
async function processRow(row) {
  for (const columnValue of Object.values(row)) {
      const number = parseInt(columnValue, 10);
      
      let startTime = Date.now();
      const duration = 10 * 60 * 1000; // 10 minutes in milliseconds

      while (Date.now() - startTime < duration) {
          if (isPrime(number)) {
              console.log(`Number ${number} is prime!`);
          }
          await sleep(1000); // Pause for 1 second
      }
  }
}

/**
 * We create a readable stream from the CSV data passed to this worker thread.
 * Then we pipe this stream through the csv-parser to process each row.
 * After all rows are processed, we send a message back to the parent thread.
 */
const stream = Readable.from(workerData);
stream.pipe(csv())
    .on('data', (row) => {
        console.log(row);
        processRow(row);
    })
    .on('error', (error) => {
      console.error('Error while processing CSV:', error);
      parentPort.postMessage('Error during processing.');
    })
    .on('end', () => {
      console.log('Worker finished processing.');
      parentPort.postMessage('Processing complete');
    });
