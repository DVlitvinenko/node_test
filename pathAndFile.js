const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");

console.log("start");
fs.mkdir(path.resolve(__dirname, "dir"), (err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Папка создана");
  }
});
console.log("END");

fs.rmdir(path.resolve(__dirname, "dir"), (err) => {
  if (err) {
    throw err;
  }
});

fs.writeFile(
  path.resolve(__dirname, "text.txt"),
  "4 fwsdf3 4 4deqwedqw3 3",
  (err) => {
    if (err) {
      throw err;
    }
    fs.appendFile(path.resolve(__dirname, "text.txt"), "\nконец", (err) => {
      if (err) {
        throw err;
      }
    });
  }
);

const writeFileAsync = async (path, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, data, (error) => {
      if (error) {
        rej(error.message);
      }
      res();
    });
  });
};

const readFileAsync = async (path) => {
  return new Promise((res, rej) => {
    fs.readFile(path, { encoding: "utf-8" }, (error, data) => {
      if (error) {
        rej(error.message);
      }
      res(data);
    });
  });
};

const removeFileAsync = async (path) => {
  return new Promise((res, rej) => {
    fs.rm(path, (error) => {
      if (error) {
        rej(error.message);
      }
      res();
    });
  });
};

const envData = process.env.TEXT_DATA || "";

const firstFilePath = path.resolve(__dirname, "first.txt");
const secondFilePath = path.resolve(__dirname, "second.txt");

writeFileAsync(firstFilePath, envData)
  .then(() => readFileAsync(firstFilePath))
  .then((data) => {
    data.split(" ").length;
  })
  .then((data) => writeFileAsync(secondFilePath, String(data)))
  .then(() => removeFileAsync(firstFilePath))
  .catch((error) => console.log(error));
