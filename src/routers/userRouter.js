const Router = require("../../framework/Router");
const { getUser, createUser } = require("../controllers/userController");

const router = new Router();

router.get("/users", (req, res) => {
  getUser(req, res);
});

router.post("/users", (req, res) => {
  createUser(req, res);
});

module.exports = router;
