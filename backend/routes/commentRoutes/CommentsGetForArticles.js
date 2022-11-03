const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const { articleId } = req.params;
  const commets = await prisma.comment.findMany({
    where: {
      article: {
        id: parseInt(articleId),
      },
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  if (!commets) {
    return res.status(204).json({ msg: "no commnets here for this article!" });
  }
  return res.status(200).send(commets);
};
