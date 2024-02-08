import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  saveDataToFirebase,
  saveTourNoteToFirebase,
} from "../../redux/actions/dataActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useUser } from "reactfire";
import { EDIT_COLOR_GREEN } from "../../constants/constants";

function CancelTourModal({ data, setModalOpen, redirect }) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const history = useHistory();
  const dispatch = useDispatch();
  const { data: user } = useUser();

  function handleCancel(data) {
    const cancelNote = {
      note: "Tour Cancelled by " + user.displayName,
      date: new Date().toISOString().split("T")[0],
    };
    dispatch(saveDataToFirebase({ ...data, status: "CA" }, data.id));
    dispatch(saveTourNoteToFirebase(cancelNote, data.id));
    toast.error("Tour Cancelled");
    if (redirect) history.push("/tours");

    toggleModal();
  }

  function handleCancelButtonClick(e) {
    e.stopPropagation();
    toggleShow();
    try {
      setModalOpen(true);
    } catch (err) {
      console.log("setModalOpen func is not passed for this component");
    }
  }

  function toggleModal() {
    toggleShow();
    try {
      setModalOpen(false);
    } catch (err) {
      console.log("setModalOpen func is not passed for this component");
    }
  }

  return (
    <>
      <Button
        onClick={handleCancelButtonClick}
        style={{
          backgroundColor: "black",
          border: "none",
          height: "3.5rem",
        }}
        title="Cancel Tour"
      >
        Cancel Tour
      </Button>
      <Modal show={show} onHide={toggleModal} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Cancel Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If the client inquires about this tour again, you will have to create
          a new tour record.
          <br />
          <br />
          Are you sure you want to cancel this tour?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={toggleShow}
            style={{ border: "none" }}
          >
            No
          </Button>
          <Button
            onClick={() => handleCancel(data)}
            style={{ backgroundColor: EDIT_COLOR_GREEN, border: "none" }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

CancelTourModal.propTypes = {
  data: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func || undefined,
  redirect: PropTypes.bool,
};

export default CancelTourModal;
