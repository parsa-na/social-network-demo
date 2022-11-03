const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const articleId = req.body.id;
  if (!articleId)
    return res.status(400).send({
      msg: "article id is not providded!!",
    });
  try {
    await prisma.article.update({
      where: {
        id: parseInt(articleId),
      },
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });
    res.status(200).send({
      msg: "article edited successfully!",
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({
        msg: "no article found!!!",
      });
    }
  }
};
