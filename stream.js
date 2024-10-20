const fs = require("fs");
const path = require("path");

// fs.readFile(path.resolve(__dirname, "test.txt"), (err, data) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log(data);
//   }
// });

// const stream = fs.createReadStream(path.resolve(__dirname, "test.txt"), {
//   encoding: "utf-8",
// });

// stream.on("data", (chunk) => {
//   console.log(chunk);
// });
// stream.on("error", (e) => {
//   console.log(e);
// });

const writeStream = fs.createWriteStream(path.resolve(__dirname, "test2.txt"));

writeStream.on("error", (e) => console.log(e));

for (let index = 0; index < 20; index++) {
  writeStream.write(`${index} \n`);
}
writeStream.end();
