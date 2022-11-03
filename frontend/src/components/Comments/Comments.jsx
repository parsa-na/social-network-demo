import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Comment } from "./Comment";
import styles from "./Comments.module.css";

export const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const { toggleRender } = useSelector((state) => state.toggleRender);
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  useEffect(() => {
    axiosInstance
      .get(`http://localhost:8000/comments/${articleId}`)
      .then((res) => {
        if (res.status != 204) setComments(res.data);
        else setComments([]);
      });
  }, [toggleRender]);

  return (
    <div className={`container-flow ${styles.commentContainer}`}>
      <div className={` ${styles.commentTitle}`}>Comments</div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={`${comment.id}`} comment={comment} />
        ))
      ) : (
        <div className="p-4">no comments</div>
      )}
    </div>
  );
};
