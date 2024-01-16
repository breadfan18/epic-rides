import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveDataToFirebase } from "../../redux/actions/dataActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { EDIT_COLOR_GREEN } from "../../constants/constants";
import { FaCheck } from "react-icons/fa";

function ConfirmTourModal({
  data,
  setModalOpen,
  redirect,
  buttonStyle,
  buttonColor,
}) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const history = useHistory();
  const dispatch = useDispatch();

  const buttonDisabled =
    data.paxNum === "N/A" ||
    data.dateFrom === "" ||
    data.dateTo === "" ||
    data.status === "HK";

  function handleConfirm(data) {
    dispatch(saveDataToFirebase({ ...data, status: "HK" }, data.id));
    toast.success("Tour Confirmed");
    if (redirect) history.push("/tours");

    toggleModal();
  }

  function handleConfirmButtonClick(e) {
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
        onClick={handleConfirmButtonClick}
        className={buttonStyle === "round" ? "rounded-circle" : ""}
        disabled={buttonDisabled}
        style={{
          backgroundColor: buttonColor || EDIT_COLOR_GREEN,
          border: "none",
          height: buttonStyle === "round" ? null : "3.5rem",
        }}
      >
        {buttonStyle === "round" ? <FaCheck /> : "Confirm Tour"}
      </Button>
      <Modal show={show} onHide={toggleModal} centered>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Confirm Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to confirm this tour?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleShow}>
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirm(data)}
            style={{ backgroundColor: EDIT_COLOR_GREEN, border: "none" }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmTourModal.propTypes = {
  data: PropTypes.object.isRequired,
  setModalOpen: PropTypes.func || undefined,
  redirect: PropTypes.bool,
};

export default ConfirmTourModal;
