const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const chekLogin = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }
  try {
    const verifiedJwt = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await prisma.user.findUnique({
      where: {
        id: verifiedJwt.id,
      },
    });
    if (!user) return next();
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = chekLogin;
