const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const articleId = req.params.id;
  if (!articleId)
    return res.status(400).send({
      msg: "article id is not provided!!!",
    });
  try {
    const article = await prisma.article.findFirstOrThrow({
      where: {
        id: parseInt(articleId),
      },
      include: {
        author: {
          select: {
            username: true,
            id: true,
          },
        },
        usersLiked: {
          select: { id: true },
        },
      },
    });
    console.log(article);
    if (req.user) {
      if (article.usersLiked != null && article.usersLiked.length > 0) {
        const ids = article.usersLiked.filter((el) => el.id == req.user.id);
        if (ids.length == 0) article["userLiked"] = false;
        else article["userLiked"] = true;
      } else article["userLiked"] = false;
    }
    return res.status(200).send(article);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({
        msg: "content not found!",
      });
    }
  }
};
