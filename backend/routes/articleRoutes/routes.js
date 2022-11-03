const expres = require("express");
const router = expres.Router();

const isLoggedIn = require("../../middlewares/vrifyToken");
const isAdmin = require("../../middlewares/isAdmin");
const isArticleOwner = require("../../middlewares/isArticleOwner");
const isTheUserTrusted = require("../../middlewares/isTheUserTrusted");
const chekLogin = require("../../middlewares/checkLogin");

//routes
const ArticlesLike = require("./ArticlesLike");
const ArticlesDelete = require("./ArticlesDelete");
const ArticlesCreate = require("./ArticlesCreate");
const ArticlesUpdate = require("./ArticlesUpdate");
const ArticlesDetail = require("./ArticlesDetail");
const ArticlesGetAll = require("./ArticlesGetAll");
const ArticlesGetUpdate = require("./ArticlesGetUpdate");

/*
 * show all artciles ordered by updatedAt
 */
router.get("/", ArticlesGetAll);

/**
 * get article details router
 */
router.get("/:id", ArticlesDetail);

/**
 *
 * get articles for edit
 */

router.get("/:id/edit", [isLoggedIn, isArticleOwner], ArticlesGetUpdate);

/**
 * updata spesific article
 */
router.put("/", [isLoggedIn, isArticleOwner], ArticlesUpdate);

/*
 *  create article by loggedIn user router
 */
router.post("/", [isLoggedIn], ArticlesCreate);

/**
 * delete article by its owner or admin router
 */
router.delete("/", [isLoggedIn, isArticleOwner], ArticlesDelete);

/**
 * like articles by usres
 */
router.post("/like", [isLoggedIn], ArticlesLike);

module.exports = router;
