const expres = require("express");
const router = expres.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");

const isLoggedIn = require("../../middlewares/vrifyToken");
const isAdmin = require("../../middlewares/isAdmin");
const isTheUserTrusted = require("../../middlewares/isTheUserTrusted");

const prisma = new PrismaClient();
/*
 * registration route
 */
router.post("/register", async (req, res) => {
  const user = req.body;

  const rawPassword = user.password;

  const hashed = await bcrypt.hash(rawPassword, 12);
  try {
    await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        password: hashed,
      },
    });
  } catch (err) {
    // username is already taken ERROR
    if (err.code == "P2002") {
      return res
        .status(400)
        .send({ message: "this username already exists!!!" });
    } else {
      console.log(err);
    }
  }
  res.status(201).send({
    massage: "you registered!!!",
  });
});

/*
 *login route
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      msg: "please inter both!!!",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        }
      );
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.MODE === "production",
          sameSite: "strict",
        })
        .status(200)
        .send({ username: user.username, id: user.id });
    } else {
      return res
        .status(400)
        .json({ msg: "username or password are incorrect!!!" });
    }
  } catch (err) {
    return res.status(400).send({
      msg: err.message,
    });
  }
});

/**
 *
 * logout user
 */
router.get("/logout", [isLoggedIn], (req, res) => {
  res.clearCookie("token").status(200).send({ msg: "your logged out!!!!" });
});

/**
 * list of all users route
 */
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      username: true,
      bio: true,
      id: true,
    },
  });

  res.status(200).send(users);
});

/**
 * get user details router
 */
router.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({
      msg: "user id is not provided!!!",
    });
  }
  try {
    const rawUser = await prisma.user.findFirstOrThrow({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        articles: {
          orderBy: { updatedAt: "desc" },
        },
      },
    });
    const userWithoutPassword = exclude(rawUser, "password", "role");

    res.status(200).send(userWithoutPassword);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({
        msg: "user not found!!!",
      });
    }
  }
});

/**
 *
 * get user detail for editting
 */
router.get("/:id/edit", [isLoggedIn, isTheUserTrusted], async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({
      msg: "user id is not provided!!!",
    });
  }
  try {
    const rawUser = await prisma.user.findFirstOrThrow({
      where: {
        id: parseInt(req.params.id),
      },
      select: {
        username: true,
        bio: true,
      },
    });
    // const userWithoutPassword = exclude(rawUser, "password", "role");

    res.status(200).send(rawUser);
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({
        msg: "user not found!!!",
      });
    }
  }
});

/*
 * user edit by him/her self router
 */
router.put("/", [isLoggedIn, isTheUserTrusted], async (req, res) => {
  const newUser = await prisma.user.update({
    where: {
      id: parseInt(req.body.id),
    },
    data: {
      username: req.body.username,
      bio: req.body.bio,
    },
  });
  res.status(200).send({
    msg: `${newUser.username} your infos changed succesfully`,
  });
});

/**
 * deleting users using admin route
 */
router.delete("/", [isLoggedIn, isAdmin], async (req, res) => {
  const delId = parseInt(req.body.id);
  if (!delId) {
    return res.status(400).send({
      msg: "user id is not providded!!",
    });
  }
  try {
    await prisma.user.delete({
      where: {
        id: delId,
      },
    });
    res.status(204).end();
  } catch (err) {
    if (err instanceof NotFoundError) {
      return res.status(404).send({
        msg: "no article found!!!",
      });
    }
  }
});

module.exports = router;
