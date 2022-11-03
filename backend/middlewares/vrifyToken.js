const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({
        msg: "login required!!!!",
      });
    }
   
    //   const br = token.split(" ");
    //    if (br[0] == "Bearer") {
    // const vrified = await jwt.verify(br[1], process.env.ACCESS_TOKEN_SECRET);
    const vrified = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await client.user.findUnique({
      where: {
        id: vrified.id,
      },
    });
    if (!user) throw new Error("invalid token");
    req.user = user;
    //  }
    return next();
  } catch (err) {
    return res.status(403).send({
      msg: err.message,
    });
  }
};

module.exports = isLoggedIn;
