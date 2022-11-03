import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Formik, ErrorMessage, Field } from "formik";
import styles from "../Comments/Comment.module.css";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import axios from "axios";
import { toggleRenderFunc } from "../../features/toggleRender/toggleRenderSlice";
export const EditCommentModal = (props) => {
  const { commentTitle, commnetText, commentId } = props;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  return (
    <>
      <Button className={` btn btn-light m-2`} onClick={handleShow}>
        {props.children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>your comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: commentTitle,
              text: commnetText,
            }}
            validationSchema={Yup.object({
              title: Yup.string()
                .required("title required!!")
                .max(200, "title must less than 200 characters"),
              text: Yup.string().required("text required!!!"),
            })}
            onSubmit={(values, action) => {
              axiosInstance
                .put(`http://localhost:8000/comments/`, {
                  title: values.title,
                  text: values.text,
                  id: commentId,
                })
                .then((res) => {
                  if (res.status == 201) {
                    action.setSubmitting = false;
                    dispatch(toggleRenderFunc());
                    handleClose();
                  }
                });
            }}
          >
            <Form>
              <div className="card-body p-4">
                <div className="row mb-2 ">
                  <div className={`container ${styles.inputs}`}>
                    <label htmlFor="title" className="col-form-label">
                      title
                    </label>
                    <div className="col">
                      <Field
                        placeholder="type your commnet title"
                        name="title"
                        as="input"
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
                  <div className={`  ${styles.inputs} container`}>
                    <div className="col">
                      <label htmlFor="text" className="col-form-label">
                        comment
                      </label>
                      <Field
                        placeholder="type your commnet..."
                        as="textarea"
                        rows="5"
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
                    Edit
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
