import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const DeleteComment = () => {
  const { commentId, articleId } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  useEffect(() => {
    axiosInstance
      .delete(`http://localhost:8000/comments`, { data: { id: commentId } })
      .then((res) => {
        //TODO error handling
        // if (res.status == 204) {
        console.log(res.data);
        navigate(`/articles/${articleId}`);
        // }
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  }, []);

  return <div className="text-danger">{error}</div>;
};
