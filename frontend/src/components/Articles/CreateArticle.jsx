import axios from 'axios';
import { Formik,Form,Field, ErrorMessage } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UpsertArticle.module.css'
import * as Yup from 'yup';

export const CreateArticle = () => {
    const navigate = useNavigate();
    const axiosInstance = axios.create({
        withCredentials: true
    });
    
    return(           
    <Formik
    initialValues={{
      title: "",
      description: "",
    }}
    validationSchema={Yup.object({
      title: Yup.string().required("title is required!!!"),
      description: Yup.string().required("description required"),
    })}
    onSubmit={(values, actions) => {
        axiosInstance.post("http://localhost:8000/articles", values).then((res) => {
        actions.setSubmitting(false);
        navigate("/");
      });
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
                placeholder="enter your article title..."
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
  );
}
