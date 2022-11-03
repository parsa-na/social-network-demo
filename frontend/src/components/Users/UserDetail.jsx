import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserArticle } from "../Articles/UserArticle";
import styles from "./UserDetail.module.css";
import { useSelector } from "react-redux";

export const UserDetail = (props) => {
  const { userId } = useParams();
  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  }, []);

  return (
    <div className="container">
      <div className={`row align-items-center ${styles.info}`}>
        <h1 className={`${styles.user} col-3`}>{user.username}</h1>
        {auth.id === user.id ? (
          <Link className="btn btn-warning col-3" to={`/users/${user.id}/edit`}>
            Edit Profile
          </Link>
        ) : null}
      </div>
      <hr></hr>
      <div className={styles.bio_container}>
        <span className={styles.bio_span}>Bio</span>
        <p className={styles.bio}>{user.bio}</p>
      </div>
      <hr />
      <div className={"container "}>
        <div className={styles.article_span}>Articles</div>
        {articles.map((article) => (
          <UserArticle
            articleAuthor={user.username}
            key={article.id}
            article={article}
          />
        ))}
      </div>
    </div>
  );
};
