
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
Certainly! Here's the section for your `README.md`:

---

## Redis Dependency

In our solution, we've introduced Redis as a backend for the message queue using the Bull library. Redis, a fast in-memory data structure store, offers persistence and can be used as a database, cache, or message broker. For our use-case, it functions as a message broker, enabling us to efficiently manage and process jobs in the background, ensuring the main event loop is non-blocking.

**Why Redis?**
- **Performance**: Redis's in-memory nature ensures fast read and write operations.
- **Persistence**: While being in-memory, Redis offers mechanisms to persist data on disk without compromising much on performance.
- **Atomic Operations**: Redis supports atomic operations on complex data types, ensuring data integrity.
- **Pub/Sub Capabilities**: Redis supports Publish/Subscribe (Pub/Sub) patterns, which are beneficial for real-time messaging.
- **Widespread Support**: Being one of the popular choices for in-memory stores, there's a lot of community support, tools, and libraries (like Bull) available.

### Installing and Running Redis using Docker

**Why Docker?**  
Docker enables developers to easily deploy applications inside containers, ensuring software will run the same regardless of where it's deployed. For our case, it allows us to run Redis without going through a complex setup process, and without interfering with other software that might be running on the developer's machine.

1. **Install Docker**:  
   To run Redis in a container, you first need to have Docker installed:
   - [Install Docker](https://docs.docker.com/get-docker/)

2. **Install Docker Compose**:  
   Docker Compose is a tool for defining and running multi-container Docker applications. In our setup, we are using it to manage the Redis container.
   - [Install Docker Compose](https://docs.docker.com/compose/install/)

3. **Running Redis**:  
   With Docker and Docker Compose installed, navigate to the project's root directory in your terminal and run:
   ```bash
   docker-compose up
   ```

This command will pull the Redis image (if not already pulled) and start a Redis instance. Your Node.js application will then be able to connect to this Redis instance as it processes jobs in the background.

---

Feel free to edit or restructure the information to better fit the overall structure and style of your `README.md`.
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
