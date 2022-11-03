import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Users from "./components/Users/Users";
import { UserDetail } from "./components/Users/UserDetail";
import { DetailArticle } from "./components/Articles/DetailArticle";
import { Articles } from "./components/Articles/Articles";
import { UserRegister } from "./components/Users/UserRegister";
import { UserLogin } from "./components/Users/UserLogin";
import { CreateArticle } from "./components/Articles/CreateArticle";
import { UserLogout } from "./components/Users/UserLogout";
import { Provider } from "react-redux";
import store from "./store";
import { DeleteArticle } from "./components/Articles/DeleteArticle";
import { EditArticle } from "./components/Articles/EditArticle";
import { UserEdit } from "./components/Users/UserEdit";
import { DeleteComment } from "./components/Comments/DeleteComment";
import { ContentNotFound } from "./components/utils/ContentNotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="register" element={<UserRegister />} />
            {/* <Route path="login" element={<UserLogin />} /> */}
            <Route path="logout" element={<UserLogout />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:userId" element={<UserDetail />} />
            <Route path="users/:userId/edit" element={<UserEdit />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:articleId" element={<DetailArticle />} />
            <Route path="create_artilces" element={<CreateArticle />} />
            <Route
              path="articles/:articleId/delete"
              element={<DeleteArticle />}
            />
            <Route path="articles/:articleId/edit" element={<EditArticle />} />
            <Route
              path="articles/:articleId/comments/:commentId/delete"
              element={<DeleteComment />}
            />
          </Route>
          <Route path="content-not-found-error" element={<ContentNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
