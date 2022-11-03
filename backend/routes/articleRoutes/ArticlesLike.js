
const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();

module.exports=async (req, res) => {
    const { articleId } = req.body;
    const userId=req.user.id;
    let article = await prisma.article.findUnique({
      where: {
        id: parseInt(articleId),
      },
      include: {
        usersLiked: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!article) {
      return res.status(404).json({
        msg: "article not found",
      });
    }
    if (article.usersLiked.length != 0) {
      const ids = article.usersLiked.map((el) => el.id);
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] == userId) {
          article = await prisma.article.update({
            where: { id: parseInt(articleId) },
            data: {
              usersLiked: {
                disconnect: { id: parseInt(userId) },
              },
            },
            include: {
              usersLiked: true,
            },
          });
          return res.status(200).json({
            likes: article.usersLiked.length,
            isLiked:false
          });
        }
      }
    }
    article = await prisma.article.update({
      where: { id: parseInt(articleId) },
      data: {
        usersLiked: {
          connect: {
            id: parseInt(userId),
          },
        },
      },
      include: {
        usersLiked: true,
      },
    });
    return res.status(200).json({
      likes: article.usersLiked.length,
      isLiked:true
    });
  }