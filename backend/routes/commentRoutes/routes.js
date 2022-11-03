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
const isCommentOwner = require("../../middlewares/isCommentOwner");
const isTheUserTrusted = require("../../middlewares/isTheUserTrusted");

//routes
const CommnetsCreate = require("./CommentsCreate");
const CommentsGetForArticles = require("./CommentsGetForArticles");
const CommentsDelete = require("./CommentsDelete");
const CommentsUpdate = require("./CommentsUpdate");
/**
 * route for get comments for specific article
 */

router.get("/:articleId", CommentsGetForArticles);

/**
 * route for create comment
 */
router.post("/", [isLoggedIn], CommnetsCreate);

/**
 * route for delete commnet
 */
router.delete("/", [isLoggedIn, isCommentOwner], CommentsDelete);

/**
 * route for update comment
 */
router.put("/", [isLoggedIn, isCommentOwner], CommentsUpdate);

// router.post('/like',[isLoggedIn],async(req,res)=>{
//     const {userId,commnetId}=req.body;
//     const user=await prisma.user.findUnique({
//         where:{id:userId,
//           likeCommnets:{
//             id:commnetId
//           }
//         },
//     });
//     if(!user){
//         const comment=await prisma.comment.update({
//           where:{
//             id:commnetId,
//           },
//           data:{
//             usersLiked:user
//           }
//         })
//         res.status(200).json({
//           msg:'comment liked!!'
//         })
//     }
//     //TODO continue

//     // const commentsArr =user.likedCommnets.map((el=>el.id));
//     // for(let i=0;i<commentsArr.length;i++){
//     //   if(commentsArr[i]==commnetId){

//     //   }
//     // }
//     const comment =await prisma.comment.findUnique({
//       where:{
//         id:commnetId
//       },

//     })
//     if(usersIdArr.length>0){
//      commentArr.forEach((el)=>{
//       if(el.===commnetId){
//         commentArr.filter((val)=>{
//           return val!=commnetId;
//         })
//       }
//      })
//     }
// })

module.exports = router;
