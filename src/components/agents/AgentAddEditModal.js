import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { saveAgentToFirebase } from "../../redux/actions/agentActions";
import { saveDataToFirebase } from "../../redux/actions/dataActions";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { MdModeEditOutline } from "react-icons/md";
import { useUser } from "reactfire";
import AgentForm from "./AgentForm";
import _ from "lodash";
import COUNTRY_CODES from "../../countryCodes";

const newAgent = {
  id: null,
  name: null,
  code: null,
  nationality: null,
  nationCode: null,
};
function AgentAddEditModal({ agent, disableBtn }) {
  const [agentForModal, setAgentForModal] = useState(
    agent
      ? {
          id: agent.id,
          name: agent.name,
          code: agent.code,
          nationality: agent.nationality,
          nationCode: agent.nationCode,
        }
      : newAgent
  );
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [saving, setSaving] = useState(false);
  const { data: user } = useUser();
  const tours = useSelector((state) =>
    _.groupBy(state.data, (o) => o.agent.code)
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (value !== "" || value !== null) {
      delete errors[name];
    }

    if (name === "nationality") {
      setAgentForModal((prevValue) => ({
        ...prevValue,
        nationCode: value,
        nationality: COUNTRY_CODES.find((country) => country.code === value)
          .name,
      }));
    } else {
      setAgentForModal((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }
  };

  const handleSaveAgent = async (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    const finalAgent = {
      id: agentForModal.id,
      name: agentForModal.name,
      code: agentForModal.code,
      nationality: agentForModal.nationality,
      nationCode: agentForModal.nationCode,
    };

    dispatch(saveAgentToFirebase(finalAgent, user?.uid));

    // Need to revisit the following after using agent data in TourForm

    // const shouldUpdateTourData =
    //   (agentForModal?.id !== null && agent?.name !== agentForModal.name) ||
    //   agent?.code !== agentForModal.code ||
    //   agent?.nationality !== agentForModal.nationality;

    // if (shouldUpdateTourData) {
    //   const toursForThisAgent = tours[agentForModal.id];

    //   if (toursForThisAgent) {
    //     toursForThisAgent.forEach((tour) => {
    //       const updatedTour = {
    //         ...tour,
    //         cardholder: finalAgent.name,
    //       };
    //       dispatch(saveDataToFirebase(updatedTour, user?.uid));
    //     });
    //   }
    // }

    toast.success(
      agentForModal?.id === null ? "Agent Created" : "Agent Updated"
    );
    toggleShow();
    setSaving(false);
    delete agentForModal.imgFile;
  };

  function clearCardholderState() {
    setAgentForModal(newAgent);
    setErrors({});
    toggleShow();
    delete agentForModal.imgFile;
  }

  const [errors, setErrors] = useState({});

  function formIsValid() {
    const { name, code, nationality } = agentForModal;
    const errors = {};

    if (!name) errors.name = "Required";
    if (!code) errors.code = "Required";
    if (!nationality) errors.nationality = "Required";
    // if (!status) errors.dateFrom = "Status is required";

    setErrors(errors);
    // Form is valid if the errors objects has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <>
      {agentForModal.id !== null ? (
        <Button
          style={{ border: "none", backgroundColor: "black" }}
          onClick={toggleShow}
          className="rounded-circle"
          disabled={disableBtn}
        >
          <MdModeEditOutline />
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={clearCardholderState}
          className="addButton"
        >
          Add Agent
        </Button>
      )}

      <Modal show={show} onHide={toggleShow} centered size="sm">
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{agentForModal.id ? "Edit" : "Add"} Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AgentForm
              agent={agentForModal}
              onSave={handleSaveAgent}
              onChange={handleChange}
              saving={saving}
              errors={errors}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

AgentAddEditModal.propTypes = {
  cardholder: PropTypes.object,
  saveLoyaltyDataToFirebase: PropTypes.func,
};

export default AgentAddEditModal;
