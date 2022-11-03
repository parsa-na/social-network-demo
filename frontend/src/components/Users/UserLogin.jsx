import React from "react";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import axios from "axios";
import styles from "./UserLogin.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../features/auth/authSlice";

export const UserLogin = () => {
 // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("username is required!!!"),
        password: Yup.string().required("password required"),
      })}
      onSubmit={(values, actions) => {
        axiosInstance
          .post("http://localhost:8000/users/login", values)
          .then((res) => {
            if (res.status === 200) {
              dispatch(setLogin({ id: res.data.id, username: res.data.username }));
              actions.setSubmitting(false);
              navigate("/");
            }
          });
      }}
    >
      <div className="container ">
        <Form className="m-4">
          <div className="row mb-2">
            <div className={`row  ${styles.inputs}`}>
              <label htmlFor="username" className="col-2 col-form-label">
                User name
              </label>
              <div className="col">
                <Field
                  name="username"
                  type="text"
                  placeholder="enter user name..."
                  className="col form-control"
                />
                <ErrorMessage name="username">
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
              <label htmlFor="password" className="col-2 col-form-label">
                password
              </label>
              <div className="col">
                <Field
                  name="password"
                  type="password"
                  className="col form-control"
                />
                <ErrorMessage name="password">
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
              Login
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};
