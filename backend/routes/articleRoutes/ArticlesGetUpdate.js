const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  console.log("first");
  const articleId = req.params.id;
  if (!articleId) {
    console.log("fuck");
    return res.status(400).send({
      msg: "article id is not provided!!!",
    });
  }
  const article = await prisma.article.findUnique({
    where: {
      id: parseInt(articleId),
    },
    select: {
      title: true,
      description: true,
      author: {
        select: {
          id: true,
        },
      },
    },
  });

  return res.status(200).json(article);
};
