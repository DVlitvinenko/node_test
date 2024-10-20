const dotenv = require("dotenv");
const Application = require("./framework/Application");
const userRouter = require("./src/routers/userRouter");
const jsonParser = require("./framework/parsejson");
const bodyParser = require("./framework/parseBody");
const urlParser = require("./framework/parseUrl");
const sequelize = require("./src/database/database");
dotenv.config();

const PORT = process.env.PORT;

const app = new Application();

app.use(urlParser(`http://localhost:${PORT}`));
app.use(bodyParser);
app.use(jsonParser);

app.addRouter(userRouter);

const run = async () => {
  try {
    await sequelize.sync({ force: false });
    await app.listen(PORT, () =>
      console.log(`Server started on: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Ошибка при подключении к базе данных:", error);
  }
};

run();
