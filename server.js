const cluster = require("node:cluster");
const os = require("node:os");

require("dotenv").config(); // import the dotenv module

const numCPUs = require("node:os").availableParallelism();

const numWorkers = numCPUs - 1;

// MAIN

const {
  HTTP_LISTEN_ADDRESS = "0.0.0.0",
  HTTP_LISTEN_PORT = "8080",
  WORKERS = numCPUs - 1,
} = process.env;

const address = HTTP_LISTEN_ADDRESS;
const port = parseInt(HTTP_LISTEN_PORT);

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < WORKERS; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} exited with code ${code} from signal ${signal}`
    );
  });
} else {
  const app = require("./app"); // import the app
  app.listen(port, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
