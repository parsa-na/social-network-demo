import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import styles from "./UpsertArticle.module.css";

export const EditArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const formikRef = useRef();
  const [forbidden, setForbidden] = useState(false);
  const [article, setArticle] = useState({
    title: "",
  });
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  useEffect(() => {
    // const get = async () => {
    axiosInstance
      .get(`http://localhost:8000/articles/${articleId}/edit`)
      .then((res) => {
        setArticle(res.data);

        formikRef.current.setFieldValue("title", res.data.title);
        formikRef.current.setFieldValue("description", res.data.description);
      })
      .catch((err) => {
        if (err.response.status === 403) setForbidden(true);
      });

    // };
    // get();
    console.log(article);
  }, []);

  return (
    <>
      {!forbidden ? (
        <Formik
          innerRef={formikRef}
          initialValues={{
            title: "",

            description: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("title required!!!!"),
            description: Yup.string().required("description required!!"),
          })}
          onSubmit={(values, action) => {
            axiosInstance
              .put("http://localhost:8000/articles", {
                id: articleId,
                title: values.title,
                description: values.description,
              })
              .then((res) => {
                if (res.status === 200) {
                  navigate(`/users/${article.author.id}`);
                }
              })
              .catch((err) => {
                // console.log(
                //   err
                //   //   status: err.response.status,
                // );
              });

            action.setSubmitting(false);
          }}
        >
          <div className="container ">
            <Form className="m-4">
              <div className="row mb-2">
                <div className={`row  ${styles.inputs}`}>
                  <label htmlFor="title" className="col-2 col-form-label">
                    title
                  </label>
                  <div className="col">
                    <Field
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
                <div className={`row  ${styles.inputs}`}>
                  <label htmlFor="description" className="col-2 col-form-label">
                    description
                  </label>
                  <div className="col">
                    <Field
                      as="textarea"
                      name="description"
                      className="col form-control"
                    />
                    <ErrorMessage name="description">
                      {(msg) => (
                        <div className={`col ${styles.error}`}>
                          <div className="text-danger">{msg}</div>
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
              </div>
              <hr />
              <div className={styles.submit_buttom}>
                <button type="submit" className="btn btn-success btn-sm ">
                  post
                </button>
              </div>
            </Form>
          </div>
        </Formik>
      ) : (
        <div className="container">
          <h1 className="text-danger">
            you dont have permission to edit this article
          </h1>
        </div>
      )}
    </>
  );
};
