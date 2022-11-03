import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleRenderFunc } from "../../features/toggleRender/toggleRenderSlice";
export function DeleteModal(props) {
  const { title, click } = props;
  const [show, setShow] = useState(false);
  const { toggleRender } = useSelector((state) => state.toggleRender);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const yesBtnClick = () => {
    click();
    handleClose();
    dispatch(toggleRenderFunc());
  };
  return (
    <>
      <Button className={` btn btn-light m-2`} onClick={handleShow}>
        {props.children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>delete {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={yesBtnClick}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
