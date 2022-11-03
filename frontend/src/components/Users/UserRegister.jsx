import React from "react";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import styles from "./UserRegister.module.css";
import { useNavigate } from "react-router-dom";

export const UserRegister = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        bio: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("username is required!!!"),
       
        email: Yup.string()
          .email("invalid email address!")
          .required("email required!"),
        // bio: Yup.string(),
        password: Yup.string()
          .required("password required")
          .min(4, "password must be more than 4 chars!"),
        confirm_password: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "passwords must match!!"
        ),
      })}
      onSubmit={(values, actions) => {
        delete values.confirm_password;
        console.log(JSON.stringify(values, null, 2));
        axios.post("http://localhost:8000/users/register", values).then((res) => {
          actions.setSubmitting(false);
          navigate("/");
        });
      }}
    >
      <div className="container ">
        <Form className="row m-4 p-4">
          <div className="row mb-3">
            <div className={`row  ${styles.inputs}`}>
              <label htmlFor="username" className="col-sm-2 col-form-label">
                User name
              </label>
              <Field
                name="username"
                type="text"
                placeholder="enter user name..."
                className="col form-control"
              />
            </div>
            <ErrorMessage name="username">
              {(msg) => (
                <div className={styles.error}>
                  <div className="text-danger">{msg}</div>
                </div>
              )}
            </ErrorMessage>
          </div>

          <div className={`row  ${styles.inputs}`}>
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email Address
            </label>
            <Field name="email" type="text" className="col form-control" />
            <ErrorMessage name="email">
              {(msg) => (
                <div className={styles.error}>
                  <div className="text-danger">{msg}</div>
                </div>
              )}
            </ErrorMessage>
          </div>
         
          <div className={`row  ${styles.inputs}`}>
            <label htmlFor="password" className="col-sm-2 col-form-label">
              password
            </label>
            <Field
              name="password"
              type="password"
              className="col form-control"
            />

            <ErrorMessage name="password">
              {(msg) => (
                <div className={styles.error}>
                  <div className="text-danger">{msg}</div>
                </div>
              )}
            </ErrorMessage>
          </div>
          <div className={`row  ${styles.inputs}`}>
            <label
              htmlFor="confirm_password"
              className="col-sm-2 col-form-label"
            >
              confirm password
            </label>
            <Field
              name="confirm_password"
              type="password"
              className="col form-control"
            />
            <ErrorMessage name="confirm_password">
              {(msg) => (
                <div className={styles.error}>
                  <div className="text-danger">{msg}</div>
                </div>
              )}
            </ErrorMessage>
          </div>
          <hr />
          <div className={styles.submit_buttom}>
            <button type="submit" className="btn btn-success btn-sm ">
              Register
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};
