const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  console.log("fuck");
  const articleId = req.body.id;
  if (!articleId)
    return res.status(400).send({
      msg: "article id is not providded!!",
    });
  try {
    await prisma.article.delete({
      where: {
        id: parseInt(articleId),
      },
    });
    res.status(204).send({
      msg: "article deleted successfully!!!!",
    });
  } catch (err) {
    console.log(err);
    if (err instanceof NotFoundError) {
      return res.status(404).send({
        msg: "article not found!!!",
      });
    }
  }
};
