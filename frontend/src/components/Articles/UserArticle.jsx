import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./UserArticle.module.css";
import moment from "moment";
export const UserArticle = (props) => {
  const { article, articleAuthor } = props;
  const location = useLocation();

  return (
    <div className="container">
      <div className={`card ${styles.card_container}`}>
        <div className="card-header">
          <div className="row align-items-center mb-2">
            <div className="col-7">
              <Link
                to={`/articles/${article.id}`}
                className={` ${styles.title}`}
              >
                {article.title}
              </Link>
            </div>
            <div className="col-4 ">
              {location.pathname.startsWith("/users") ? (
                <div>by: {articleAuthor}</div>
              ) : (
                <div>
                  <span>by: </span>{" "}
                  <Link to={`/users/${article.authorId}`}>{articleAuthor}</Link>
                </div>
              )}
            </div>
          </div>
          <div className={`row ${styles.date_container}`}>
            <small className="col-4">
              updated:{" "}
              {moment(article.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
            </small>
            <small className="col-4">
              created:{" "}
              {moment(article.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};
