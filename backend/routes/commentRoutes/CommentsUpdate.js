const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const { id, title, text } = req.body;
  const commentId = id;
  if (!commentId)
    return res.status(400).json({
      msg: "comment id is not provided!",
    });
  try {
    await prisma.comment.update({
      where: {
        id: parseInt(commentId),
      },
      data: {
        title,
        text,
      },
    });
    return res.status(201).json({
      msg: "comment updated!!!",
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({
        msg: "no comment found!!!",
      });
    }
  }
};
