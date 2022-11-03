import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./RegisterOrLoginModal.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { setLogin } from "../../features/auth/authSlice";
export const RegisterOrLoginModal = ({ hide }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    hide(false);
  };
  const handleShow = () => setShow(true);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string().required("username is required!!!"),
            password: Yup.string().required("password required"), //TODO max 8 chars
          })}
          onSubmit={(values, actions) => {
            axiosInstance
              .post("http://localhost:8000/users/login", values)
              .then((res) => {
                if (res.status === 200) {
                  dispatch(
                    setLogin({ id: res.data.id, username: res.data.username })
                  );
                  actions.setSubmitting(false);
                  handleClose();
                  navigate("/");
                }
              });
          }}
        >
          <div className="container ">
            <Form>
              <div className="row ">
                <div className={`row  ${styles.inputs}`}>
                  <div className="col">
                    <Field
                      name="username"
                      type="text"
                      placeholder="user name..."
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
                  <div className="col">
                    <Field
                      name="password"
                      type="password"
                      placeholder="password..."
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
              <div
                className={`d-flex align-items-center ${styles.submit_buttom} `}
              >
                <button
                  type="submit"
                  className={`btn btn-success ${styles.loginBtn} col-5`}
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
        </Formik>
      </Modal.Body>
      <Modal.Footer className="">
        <div>
          Not a memeber?
          <Link to={`/register`}> SignUp</Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
