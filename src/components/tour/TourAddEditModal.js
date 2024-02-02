import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveDataToFirebase } from "../../redux/actions/dataActions";
import TourForm from "./TourForm";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { DIRECT_CLIENTS, NEW_DATA } from "../../constants/constants";
import { useUser } from "reactfire";
import { fileNameGenerator, getDaysBetweenDates } from "../../helpers";
import COUNTRY_CODES from "../../constants/countryCodes";

function TourAddEditModal({ data, setModalOpen }) {
  const [dataForModal, setDataForModal] = useState(
    data ? { ...data } : NEW_DATA
  );

  const allData = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const agents = useSelector((state) => [DIRECT_CLIENTS, ...state.agents]);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const { data: user } = useUser();

  function handleChange(event) {
    const { name, value } = event.target;

    if (value !== "" || value !== null) {
      delete errors[name];
    }

    if (name.includes(".")) {
      setDataForModal((prevData) => {
        const [parentField, childField] = name.split(".");
        return {
          ...prevData,
          [parentField]: {
            ...prevData[parentField],
            [childField]: value,
            nationality: COUNTRY_CODES.find((country) => country.code === value)
              .name,
          },
        };
      });
    } else {
      setDataForModal((prevData) => ({
        ...prevData,
        [name]: name === "agent" ? agents.find((a) => a.code === value) : value,
      }));
    }
  }

  function handleMetadata(data) {
    if (data.id) {
      return {
        ...data.metadata,
        editedBy: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL || null,
        },
      };
    } else {
      return {
        createdBy: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL || null,
        },
      };
    }
  }

  function handleSaveForFirebase(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    const numOfDays = getDaysBetweenDates(
      dataForModal.dateFrom,
      dataForModal.dateTo
    );

    const id = dataForModal.id || allData.length + 1;
    const file = fileNameGenerator(id, dataForModal, numOfDays);
    const metadata = handleMetadata(dataForModal);
    const paxNum = dataForModal.paxNum || "N/A";

    const finalData = {
      ...dataForModal,
      numOfDays,
      paxNum,
      ...file,
      metadata,
    };

    dispatch(saveDataToFirebase(finalData, id));
    toast.success(
      dataForModal.id === null ? "Record Created" : "Record Updated"
    );
    toggleModal();
  }

  function clearDataState() {
    setDataForModal(NEW_DATA);
    setErrors({});
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
    setErrors({});
    try {
      setModalOpen(false);
    } catch (err) {
      console.log("setModalOpen func is not passed for this component");
    }
  }

  const [errors, setErrors] = useState({});

  function formIsValid() {
    const { agent, tourName, groupFitName, dateFrom, dateTo } = dataForModal;
    const errors = {};

    if (!agent.name) errors.agent = "Required";
    if (!tourName) errors.tourName = "Required";
    if (!groupFitName) errors.groupFitName = "Required";
    if (dateFrom && !dateTo) errors.dateTo = "End Date is Required";
    if (dateTo && !dateFrom) errors.dateFrom = "Start Date is Required";
    if (Date.parse(dateTo) < Date.parse(dateFrom))
      errors.dateTo = "End date must be AFTER Start Date";

    setErrors(errors);
    // Form is valid if the errors objects has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <>
      {dataForModal.id !== null ? (
        <Button
          style={{ border: "none", backgroundColor: "black" }}
          onClick={handleEditButtonClick}
          cp
          className="rounded-circle"
          disabled={data.status === "CA"}
          title="Edit Tour"
        >
          <MdModeEditOutline />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={clearDataState}
          className="addButton"
          title="Add New Tour"
        >
          Add Tour
        </Button>
      )}

      <Modal
        show={show}
        onHide={toggleModal}
        centered
        size="lg"
        backdrop="static"
        animation
      >
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{dataForModal.id ? "Edit" : "Add"} Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TourForm
            tour={dataForModal}
            onSave={handleSaveForFirebase}
            onChange={handleChange}
            // toggle={toggle}
            errors={errors}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

TourAddEditModal.propTypes = {
  data: PropTypes.object,
  saveDataToFirebase: PropTypes.func,
  setModalOpen: PropTypes.func,
};

export default TourAddEditModal;
