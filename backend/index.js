const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const articleRoutes = require("./routes/articleRoutes/routes");
const userRoutes = require("./routes/userRoutes/routes");
const commentRoutes = require("./routes/commentRoutes/routes");
dotenv.config();
const app = express();

const port = process.env.PORT;

//permission middlewares
// const isLoggedIn = require("./middlewares/vrifyToken");
// const isAdmin = require("./middlewares/isAdmin");
// const isOwner = require("./middlewares/isOwner");
// const isTheUserTrusted = require("./middlewares/isTheUserTrusted");
const chekLogin = require("./middlewares/checkLogin");

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(chekLogin);

app.use("/articles", articleRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
  if (req.user) {
    res.status(200).send({
      id: req.user.id,
      isLoggedIn: true,
      username: req.user.username,
    });
  } else
    res.status(200).send({
      isLoggedIn: false,
    });
});

app.listen(port, async () => {
  console.log("listening........... " + "http://localhost:" + port);
});
