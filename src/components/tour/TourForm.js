import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import {
  AGENTS,
  APP_COLOR_BLACK_OPACITY,
  APP_COLOR_EPIC_RED,
  STATUS_CODES,
} from "../../constants";
import DateInput from "../common/DateInput";
import Form from "react-bootstrap/Form";
import { titleCase } from "../../helpers";
import { isEmpty } from "lodash";

const TourForm = ({ tour, onSave, onChange, saving, errors = {} }) => {
  return (
    <>
      <Form onSubmit={onSave}>
        {!isEmpty(errors) && (
          <div
            className="alert"
            role="alert"
            style={{
              backgroundColor: APP_COLOR_BLACK_OPACITY,
              color: APP_COLOR_EPIC_RED,
            }}
          >
            Please address the errors below
          </div>
        )}
        <SelectInput
          name="agent"
          label="Agent"
          value={tour.agent.name || ""}
          defaultOption="Select Agent"
          options={AGENTS.map((agent) => ({
            value: agent.name,
            text: titleCase(agent.name),
          }))}
          onChange={onChange}
          error={errors.agent}
        />
        <TextInput
          name="tourName"
          label="Tour Name"
          value={tour.tourName || ""}
          onChange={onChange}
          error={errors.tourName}
        />
        <TextInput
          name="groupFitName"
          label="Group/FIT Name"
          value={tour.groupFitName || ""}
          onChange={onChange}
          error={errors.groupFitName}
        />
        <TextInput
          name="paxNum"
          label="Number of Passengers"
          value={tour.paxNum || ""}
          onChange={onChange}
          error={errors.paxNum}
        />
        <DateInput
          name="dateFrom"
          label="Start Date"
          onChange={onChange}
          value={tour.dateFrom}
          // error={errors.dateFrom}
          // disabled={formDisabledCheck(card.annualFee)}
        />
        <DateInput
          name="dateTo"
          label="End Date"
          onChange={onChange}
          value={tour.dateTo}
          // error={errors.dateTo}
          // disabled={formDisabledCheck(card.annualFee)}
        />
        <SelectInput
          name="status"
          label="Status"
          value={tour.status || ""}
          defaultOption="Select Status"
          options={STATUS_CODES.map((status) => ({
            value: status.code,
            text: titleCase(status.name),
          }))}
          onChange={onChange}
          error={errors.status}
        />
        <hr />
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary addButton"
        >
          {tour.id === null ? "Add Data" : "Save Data"}
        </button>
      </Form>
    </>
  );
};

TourForm.propTypes = {
  card: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default TourForm;
