import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Comment.module.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { DeleteModal } from "../utils/DeleteModal";
import { EditCommentModal } from "./EditCommentModal";
export const Comment = ({ comment }) => {
  const { id } = useSelector((state) => state.auth);
  const { toggleRender } = useSelector((state) => state.toggleRender);
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {}, [toggleRender]);

  const axiosInstance = axios.create({
    withCredentials: true,
  });
  const onClickDeleteCommnet = () => {
    axiosInstance
      .delete(`http://localhost:8000/comments`, { data: { id: comment.id } })
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
    <div className={`card ${styles.cardContainer}`}>
      <div className="card-header">
        <div className="row align-content-center">
          <div className="col">
            <h4>{comment.title}</h4>
          </div>
          <div className="col-3 col">
            {id === comment.authorId ? (
              <EditCommentModal
                commentTitle={comment.title}
                commnetText={comment.text}
                commentId={comment.id}
              >
                <i
                  className={`bi bi-pencil-square text-warning ${styles.icon}`}
                />
              </EditCommentModal>
            ) : null}
            {id === comment.authorId ? (
              <DeleteModal title="comment" click={onClickDeleteCommnet}>
                <i className={`bi bi-trash text-danger ${styles.icon}`} />
              </DeleteModal>
            ) : null}
          </div>
        </div>
        <div className="row align-content-center">
          <div className="col-4">
            <p>
              created:{" "}
              {moment(comment.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
          <div className="col-4">
            <span>
              <i className="bi bi-pencil" />{" "}
            </span>
            <Link className={styles.author} to={`/users/${comment.authorId}`}>
              {comment.author.username}
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body p-4">{comment.text}</div>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>delete {comment.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onClickDeleteCommnet}>
            yes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};
