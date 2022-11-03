import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styles from "./DetailArticle.module.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Comments } from "../Comments/Comments";
import * as Yup from "yup";
import { DeleteModal } from "../utils/DeleteModal";
import { toggleRenderFunc } from "../../features/toggleRender/toggleRenderSlice";
import { RegisterOrLoginModal } from "../utils/RegisterOrLoginModal";

export const DetailArticle = (props) => {
  const { id } = useSelector((state) => state.auth);
  const { toggleRender } = useSelector((state) => state.toggleRender);
  const dispatch = useDispatch();
  const { articleId } = useParams();
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showRegisterOrLoginModal, setShowRegisterOrLoginModal] = useState(
    false
  );
  const [article, setArticle] = useState({
    usersLiked: [],
    author: {
      username: "",
    },
  });
  const formikRef = useRef();
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  useEffect(() => {
    axiosInstance
      .get(`http://localhost:8000/articles/${articleId}`)
      .then((res) => {
        setArticle(res.data);
        setLikes(res.data.usersLiked.length);
        setIsLiked(res.data.userLiked);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          navigate("/content-not-found-error");
        }
      });
  }, []);
  //useEffect(() => {}, [toggleRender]);
  const style = {
    marginTop: "16px",
  };

  const clickLikeBtn = () => {
    axiosInstance
      .post("http://localhost:8000/articles/like", { articleId })
      .then((res) => {
        setLikes(res.data.likes);
        setIsLiked(res.data.isLiked);
      })
      .catch((err) => {
        if (
          err.response.status === 403 &&
          err.response.data.msg == "login required!!!!"
        ) {
          setShowRegisterOrLoginModal(true);
        }
      });
  };

  const ontrashBtnClick = () => {
    axiosInstance
      .delete(`http://localhost:8000/articles`, { data: { id: articleId } })
      .then((res) => {
        //TODO error handling
        // if (res.status == 204) {
        console.log(res.data);

        // }
      })
      .catch((err) => {
        setError(err.response.data.msg);
      });
  };

  return (
    <div className="container-lg " style={style}>
      <div className="row align-items-center">
        <div className="h1 text-primary col-4">{article.title} </div>
        <div className="col-3 col ">
          <span>
            <i className="bi bi-pencil" />{" "}
          </span>
          <Link className={styles.author} to={`/users/${article.authorId}`}>
            {article.author.username}
          </Link>
        </div>
        <div className="col-3 col">
          {id === article.author.id ? (
            <Link
              to={`/articles/${articleId}/edit`}
              className={` btn btn-light ${styles.btn}`}
            >
              <i
                className={`bi bi-pencil-square text-warning ${styles.icon}`}
              />
            </Link>
          ) : null}
          {id === article.author.id ? (
            <DeleteModal title="article" click={ontrashBtnClick}>
              <i className={`bi bi-trash text-danger ${styles.icon}`} />
            </DeleteModal>
          ) : null}
        </div>
      </div>

      <div className={`row align-items-center ${styles.dateLikeRow}`}>
        <div className={`col-4 ${styles.date}`}>
          updated: {moment(article.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
        <div className={`col-4 ${styles.date}`}>
          created: {moment(article.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
        <div className="col-4">
          <i
            className={
              isLiked
                ? `bi bi-heart-fill  text-danger ${styles.likeicon}`
                : `bi bi-heart text-danger ${styles.likeicon}`
            }
            onClick={clickLikeBtn}
          >
            {likes}
          </i>
        </div>
      </div>

      <div className={`container ${styles.description}`}>
        {article.description}
      </div>

      <Formik
        innerRef={formikRef}
        initialValues={{
          title: "",
          text: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .required("title required!!")
            .max(200, "title must less than 200 characters"),
          text: Yup.string().required("text required!!!"),
        })}
        onSubmit={(values, action) => {
          axiosInstance
            .post(`http://localhost:8000/comments/`, {
              title: values.title,
              text: values.text,
              articleId,
            })
            .then((res) => {
              if (res.status == 201) {
                action.setSubmitting = false;
                dispatch(toggleRenderFunc());
                action.resetForm();
              }
            })
            .catch((err) => {
              if (
                err.response.status === 403 &&
                err.response.data.msg == "login required!!!!"
              ) {
                action.resetForm();
                setShowRegisterOrLoginModal(true);
              }
            });
        }}
      >
        <div className={`card ${styles.typeCommentSction}`}>
          <div className="card-header">
            <h4>type your comment</h4>
          </div>

          <Form>
            <div className="card-body p-4">
              <div className="row mb-2 ">
                <div className={`row align-items-center ${styles.inputs}`}>
                  <div className="col">
                    <Field
                      placeholder="type your commnet title"
                      name="title"
                      type="text"
                      // placeholder="enter your article title..."
                      className="col form-control"
                    />
                    <ErrorMessage name="title">
                      {(msg) => (
                        <div className={`col ${styles.error}`}>
                          <div className="text-danger">{msg}</div>
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              </div>

              <div className="row mb-2">
                <div className={`row  ${styles.inputs} align-items-center`}>
                  <div className="col">
                    <Field
                      placeholder="type your commnet..."
                      as="textarea"
                      name="text"
                      className="col form-control"
                    />
                    <ErrorMessage name="text">
                      {(msg) => (
                        <div className={`col ${styles.error}`}>
                          <div className="text-danger">{msg}</div>
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className={`row ${styles.submit_buttom}`}>
                <button type="submit" className="btn btn-success col-5 ">
                  send
                </button>
              </div>
            </div>
          </Form>
        </div>
      </Formik>

      <div className={`container ${styles.commnetsContainer}`}>
        <Comments articleId={articleId} />
      </div>
      {showRegisterOrLoginModal ? (
        <RegisterOrLoginModal hide={setShowRegisterOrLoginModal} />
      ) : null}
    </div>
  );
};
