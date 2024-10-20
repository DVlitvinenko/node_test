const Emitter = require("events");
const dotenv = require("dotenv");

const emitter = new Emitter();
dotenv.config();

emitter.on("message", (data, second, third) => {
  console.log(`Вы прислали ${data}`);
  console.log(`Второй аргемент ${second}`);
});

const MESSAGE = process.env.MESSAGE;

if (MESSAGE) {
  emitter.emit("message", MESSAGE);
} else {
  emitter.emit("message", "123");
}
