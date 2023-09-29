
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

## Feedback & Contribution

Your insights and feedback are invaluable. Please feel free to raise issues or submit pull requests for improvements.
