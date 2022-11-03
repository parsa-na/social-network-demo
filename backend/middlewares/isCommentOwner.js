const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

const prisma = new PrismaClient();

const isCommentOwner = async (req, res, next) => {
  const commentId = req.body.id || req.params.id;

  if (!commentId) {
    return res.status(400).json({
      msg: "id is not provided!",
    });
  }
  try {
    const comment = await prisma.comment.findFirstOrThrow({
      where: {
        id: parseInt(commentId),
      },
    });

    if (comment.authorId == req.user.id || req.user.role == "ADMIN") {
      return next();
    } else {
      return res.status(403).json({
        msg: "you don't have permision!!!",
      });
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({
        msg: "no commnet found!!!",
      });
    }
  }
};

module.exports = isCommentOwner;
