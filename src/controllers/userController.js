const users = require("../json/users.json");
const User = require("../database/models/User");

const getUser = async (req, res) => {
  try {
    if (req.params.id) {
      const user = await User.findByPk(req.params.id);
      if (user) {
        return res.send(user);
      } else {
        return res.status(404).send({ message: "Пользователь не найден" });
      }
    }
    const users = await User.findAll();
    return res.send(users);
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error);
    return res.status(500).send({ message: "Ошибка сервера" });
  }
};

const createUser = async (req, res) => {
  const user = req.body;
  if (!user.username && !user.email && !user.password) {
    return res.status(401).send();
  }
  await User.create({
    username: user.username,
    email: user.email,
    password: user.password,
  })
    .then(() => res.send())
    .catch((e) => res.end(e.message));
};
module.exports = { getUser, createUser };
