// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

const isTheUserTrusted = (req, res, next) => {
  const userId = req.body.id|| req.params.id;
  if (!userId) {
    return res.status(400).send({
      msg: "id is not provided",
    });
  }
  if (req.user.id == userId) next();
  else {
    res.status(403).send({
      msg: "forrbidden",
    });
  }
};

module.exports = isTheUserTrusted;
