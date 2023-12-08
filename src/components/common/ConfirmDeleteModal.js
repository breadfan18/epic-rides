import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteDataFromFirebase } from "../../redux/actions/dataActions";
import { toast } from "react-toastify";
import { DeleteButton } from "./DeleteButton";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useUser } from "reactfire";
import { APP_COLOR_EPIC_RED } from "../../constants";
function ConfirmDeleteModal({
  data,
  setModalOpen,
  redirect,
  disableBtn = false,
}) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const history = useHistory();
  const { data: user } = useUser();
  const dispatch = useDispatch();

  function handleDelete(data) {
    dispatch(deleteDataFromFirebase(data, user?.uid));
    toast.success("Record deleted");
    if (redirect) history.push("/main");

    toggleModal();
  }

  function handleDeleteButtonClick(e) {
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
      <DeleteButton onClick={handleDeleteButtonClick} disableBtn={disableBtn} />
      <Modal show={show} onHide={toggleModal} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete this data?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShow}>
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(data)}
            style={{
              backgroundColor: APP_COLOR_EPIC_RED,
              border: `1px solid ${APP_COLOR_EPIC_RED}`,
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmDeleteModal.propTypes = {
  data: PropTypes.object.isRequired,
  deleteCardFromFirebase: PropTypes.func.isRequired,
  deleteLoyaltyDataFromFirebase: PropTypes.func.isRequired,
  deleteCardholderFromFirebase: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func || undefined,
  redirect: PropTypes.bool,
};

export default ConfirmDeleteModal;
