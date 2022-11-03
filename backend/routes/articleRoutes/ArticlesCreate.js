const expres = require("express");
const router = expres.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { NotFoundError } = require("@prisma/client/runtime");

//utils
const exclude = require("../../utils/excludeFunc");
const prisma = new PrismaClient();


module.exports=async (req, res) => {
    const { title, description } = req.body;
  
    if (!title || !description) {
      return res.status(400).send({
        msg: "please enter title and description",
      });
    }
    await prisma.article.create({
      data: {
        description: description,
        title: title,
        authorId: parseInt(req.user.id),
      },
    });
    res.status(201).send({
      msg: "articles created!!",
    });
  }