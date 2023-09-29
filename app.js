const express = require('express');
const fileUpload = require('express-fileupload');
const { Worker } = require('worker_threads');
const Queue = require('bull');
const os = require('os');

const app = express();

// Use express-fileupload middleware to parse file uploads
app.use(fileUpload());

// Initialize the processing queue
const processingQueue = new Queue('file-processing', 'redis://127.0.0.1:6379');

// Define the route for file upload and processing
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.sampleFile;

    // Add file data to the processing queue
    processingQueue.add({ fileData: sampleFile.data });

    res.send('File uploaded and processing started!');
});

// Define the status endpoint to check the event loop
app.get('/status', (req, res) => {
    res.send('Event loop is not blocked');
});

// Listen to processing events and start a new worker thread for each task
processingQueue.process(os.cpus().length, (job) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: job.data.fileData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

module.exports = app; // For testing purposes
