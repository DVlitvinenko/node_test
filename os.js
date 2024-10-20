const os = require("os");
const cluster = require("cluster");

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < os.cpus().length - 2; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);

  setInterval(() => {
    console.log(`Worker ${process.pid} at work`);
  }, 5000);
}
