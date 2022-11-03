const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const commentId = req.body.id;

  if (!commentId) {
    res.status(400).json({
      msg: "no comment id!!!",
    });
  }
  try {
    await prisma.comment.delete({
      where: {
        id: parseInt(commentId),
      },
    });
    return res.status(204).json({});
  } catch (err) {
    return res.send(err);
  }
};
