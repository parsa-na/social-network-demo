const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();

module.exports =  async (req, res) => {
    const { articleId, title, text } = req.body;
    if (!articleId || !title || !text ) {
      return res.status(400).json({ msg: "some thing missing" });
    }
    const article = prisma.article.findUniqueOrThrow({
      where: { id:parseInt(articleId)  },
    });
    if (!article) {
      return res.status(400).json({
        msg: "this article doesnt exists!",
      });
    }
    await prisma.comment.create({
      data: {
        title,
        text,
        articleId: parseInt(articleId),
        authorId: req.user.id,
      },
    });
    return res.status(201).json({
      msg: "comment created!!",
    });
  }