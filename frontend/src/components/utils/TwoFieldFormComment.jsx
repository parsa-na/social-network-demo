import React from "react";

//TODO
export const TwoFieldForm = ({ commentTitle, commnetText, click }) => {
  return (
    <>
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
    </>
  );
};
