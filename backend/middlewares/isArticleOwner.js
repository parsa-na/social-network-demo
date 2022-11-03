const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

const prisma = new PrismaClient();

const isArticleOwner = async (req, res, next) => {
  const articleId = req.body.id || req.params.id;

  if (!articleId) {
    return res.status(400).json({
      msg: "id is not provided!",
    });
  }
  try {
    const artcle = await prisma.article.findFirstOrThrow({
      where: {
        id: parseInt(articleId),
      },
      select: {
        authorId: true,
      },
    });

    if (artcle.authorId == req.user.id || req.user.role == "ADMIN") {
      return next();
    } else {
      return res.status(403).json({
        msg: "you don't have permision!!!",
      });
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({
        msg: "no article found!!!",
      });
    }
  }
};

module.exports = isArticleOwner;
