
# Node.js File Processing Proof of Concept (POC)

This repository contains a proof of concept for a Node.js application that handles file uploads and processes the data in the file asynchronously using worker threads. The goal is to demonstrate the ability of the application to handle CPU-bound tasks without blocking the main event loop.

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:waynetheisinger/workerpoc.git
   cd workerpoc
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Ensure Redis is installed and running as it's required by the `bull` queuing package.

4. Start the server:
   ```bash
   node app.js
   ```
## Producing the test data
A quick and efficient way to generate a CSV with random numbers is to use a scripting language like Node.js itself. In the repository root is a simple script `generateCSV.js` that will generate a CSV file filled with random numbers suitable for our prime processing function:

When you run this script using Node.js, it will produce a file called `randomData.csv` with 10,000 rows, and each row contains 10 random numbers between 1 and 1,000,000.

You can adjust the `numRows`, `numbersPerRow`, and `maxNumber` variables as needed to create a CSV of the desired size and complexity.

Just run it with Node:

```
node generateCSV.js
```

After running the script, you should have the `randomData.csv` file ready for testing with your application.

## Testing Using Postman

To test the file upload endpoint using Postman:

1. **Open Postman**: Launch the Postman application.

2. **Set Request Type**: Choose `POST` as the request type.

3. **Enter URL**: Use `http://localhost:3000/upload`.

4. **Body Settings**: 
   - Go to the `Body` tab.
   - Select `form-data`.
   - Use key `sampleFile` and set the type to `File`.
   - Choose the CSV file you wish to upload.

5. **Send Request**: Click the `Send` button.

6. **View Response**: You should receive a response indicating the file was uploaded and processing has started.

## How It Works

When a file is uploaded, it gets saved temporarily and is added to a processing queue. The `bull` package handles the queuing mechanism, ensuring that even if multiple files are uploaded simultaneously, they're processed in an orderly manner.

The actual processing (simulated CPU-bound task) is offloaded to a worker thread, ensuring the main event loop is never blocked.

## Testing Event Loop Status

To demonstrate that the event loop isn't blocked during file processing:

1. **Using Postman or Browser**: 
   - After sending a CSV file for processing, immediately access the endpoint `http://localhost:3000/status`.
   - You should promptly receive a response: "Event loop is not blocked". This indicates that the event loop remains free even as the application processes CPU-bound tasks in the background.

## Feedback & Contribution

Your insights and feedback are invaluable. Please feel free to raise issues or submit pull requests for improvements.
