import React, { useEffect, useRef, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from './UserDetail.module.css'
export const UserEdit = () => {
  const formikRef = useRef();
  const { userId } = useParams();

  const navigate=useNavigate();
  const axiosInstance = axios.create({
    withCredentials: true,
  });
  useEffect(() => {
    const get = async () => {
      axiosInstance
        .get(`http://localhost:8000/users/${userId}/edit`)
        .then((res) => {
          formikRef.current.setFieldValue('username',res.data.username);
          formikRef.current.setFieldValue('bio',res.data.bio)
        });
    };
    get();
  }, []);
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        username: "",
        bio: "",
      }}

      validationSchema={Yup.object({
        username:Yup.string().required('username required!!'),
        bio:Yup.string().max(500,'bio must be less than 500 characters!')
      })}

      onSubmit={(values,action)=>{
          axiosInstance.put(`http://localhost:8000/users`,{id:userId,bio:values.bio,username:values.username}).then(res=>{
            if(res.status==200){
              //TODO show modal
              navigate(`/users/${userId}`)
            }
          })
      }}
    >
        <div className="container ">
        <Form className="m-4">
          <div className="row mb-2">
            <div className={`row  ${styles.inputs}`}>
              <label htmlFor="username" className="col-2 col-form-label">
                username
              </label>
              <div className="col">
                <Field
                  name="username"
                  type="text"
                  // placeholder="enter your article username..."
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
              <label htmlFor="bio" className="col-2 col-form-label">
                bio
              </label>
              <div className="col">
                <Field
                  as="textarea"
                  name="bio"
                  className="col form-control"
                />
                <ErrorMessage name="bio">
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
              change
            </button>
          </div>
        </Form>
      </div>

    </Formik>
  );
};
