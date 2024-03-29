import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  saveActiveTab,
  saveActiveTour,
  saveDataToFirebase,
  setTourDateFrom,
  setTourDateTo,
} from "../../redux/actions/dataActions";
import TourForm from "./TourForm";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { DIRECT_CLIENTS, NEW_DATA } from "../../constants/constants";
import { useUser } from "reactfire";
import _ from "lodash";
import { finalizeTourData, handleSetClient } from "../../helpers";

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
  const activeTab = useSelector((state) => state.activeTab);
  const dateFrom = useSelector((state) => state.tourDateFrom);
  const dateTo = useSelector((state) => state.tourDateTo);

  useEffect(() => {
    setDataForModal(data ? { ...data } : NEW_DATA);
  }, [data]);

  function handleChange(event) {
    const { name, value } = event.target;

    if (value !== "" || value !== null) {
      if (name === "agent.name") delete errors.clientName;
      else if (name === "agent.nationCode") delete errors.clientNationality;
      else delete errors[name];
    }

    if (name.includes(".")) {
      handleSetClient(setDataForModal, name, value);
    } else if (name.includes("date")) {
      dispatch(
        name === "dateFrom" ? setTourDateFrom(value) : setTourDateTo(value)
      );
    } else {
      setDataForModal((prevData) => ({
        ...prevData,
        [name]: name === "agent" ? agents.find((a) => a.code === value) : value,
      }));
    }
  }

  function handleSaveForFirebase(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    const id = dataForModal.id || allData.length + 1;
    const finalData = finalizeTourData(
      dataForModal,
      allData,
      user,
      dateFrom,
      dateTo,
      id
    );

    const shouldDispatchActiveTab =
      !dataForModal.id ||
      (dataForModal.id &&
        !_.isEqual(data, finalData) &&
        activeTab !== "all-tours");

    shouldDispatchActiveTab &&
      dispatch(
        saveActiveTab(
          finalData.dateFrom ? finalData.dateFrom.split("-")[0] : "UNDATED"
        )
      );

    dispatch(saveDataToFirebase(finalData, id));
    dispatch(saveActiveTour(id));

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
    const { agent, tourName, groupFitName } = dataForModal;
    const errors = {};
    const { nationality, name, code } = agent;

    if (!code) errors.agent = "Required";
    if (code === "DIR" && !nationality) errors.clientNationality = "Required";
    if (code === "DIR" && !name) errors.clientName = "Required";
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
