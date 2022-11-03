

const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();


module.exports=async (req, res) => {
    const articles = await prisma.article.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    if (articles.length == 0) {
      return res.status(204).send({ msg: "no article found!!!" });
    }
    res.status(200).send(articles);
  }