import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserArticle } from "./UserArticle";

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const get = async () => {
      axios
        .get("http://localhost:8000/articles")
        .then((res) => {
          if (res.status == 204) {
            setArticles([]);
            console.log(articles);
          } else {
            setArticles(res.data);
          }
        })
        .catch((err) => {
          console.log(err.response.status);
        });
    };
    get();
  }, []);

  return (
    <div>
      {articles.length > 0 ? (
        articles.map((article) => (
          <UserArticle
            key={`${article.id}`}
            article={article}
            articleAuthor={article.author.username}
          />
        ))
      ) : (
        <div>no articles </div>
      )}
    </div>
  );
};
