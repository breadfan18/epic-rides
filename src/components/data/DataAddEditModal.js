import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveDataToFirebase } from "../../redux/actions/dataActions";
import CardForm from "./DataForm";
import CardFormResponsive from "./CardFormResponsive";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { AGENTS, NEW_DATA } from "../../constants";
import { WindowWidthContext } from "../App";
import { useUser } from "reactfire";
import { fileNameGenerator, getDaysBetweenDates } from "../../helpers";

function DataAddEditModal({ data, setModalOpen }) {
  const [dataForModal, setDataForModal] = useState(
    data ? { ...data } : NEW_DATA
  );

  const allData = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const windowWidth = useContext(WindowWidthContext);
  const { data: user } = useUser();

  function handleChange(event) {
    const { name, value } = event.target;

    setDataForModal((prevData) => ({
      ...prevData,
      [name]: name === "agent" ? AGENTS.find((a) => a.name === value) : value,
    }));
  }

  function handleSaveForFirebase(event) {
    event.preventDefault();

    const numOfDays = getDaysBetweenDates(
      dataForModal.dateFrom,
      dataForModal.dateTo
    );

    const file = fileNameGenerator(
      1,
      dataForModal.agent.code,
      dataForModal.dateFrom,
      numOfDays,
      dataForModal.groupOrTourName
    );

    const finalData = { ...dataForModal, numOfDays, ...file };
    dispatch(saveDataToFirebase(finalData, user?.uid));
    toast.success(dataForModal.id === null ? "Data Created" : "Data Updated");
    toggleModal();
  }

  function clearCardState() {
    setDataForModal(NEW_DATA);
    toggleShow();
  }

  function handleEditButtonClick(e) {
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
      {dataForModal.id !== null ? (
        <Button
          // variant="success"
          style={{ border: "none", backgroundColor: "black" }}
          onClick={handleEditButtonClick}
          className="rounded-circle"
        >
          <MdModeEditOutline />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={clearCardState}
          className="addButton"
        >
          Add Data
        </Button>
      )}

      <Modal
        show={show}
        onHide={toggleModal}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{dataForModal.id ? "Edit" : "Add"} Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {windowWidth > 980 ? (
            <CardForm
              data={dataForModal}
              onSave={handleSaveForFirebase}
              onChange={handleChange}
              // toggle={toggle}
              // errors={errors}
            />
          ) : (
            <CardFormResponsive
              card={dataForModal}
              onSave={handleSaveForFirebase}
              onChange={handleChange}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

DataAddEditModal.propTypes = {
  data: PropTypes.object,
  saveCardToFirebase: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func,
};

export default DataAddEditModal;
