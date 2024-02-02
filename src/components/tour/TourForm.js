import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import DateInput from "../common/DateInput";
import Form from "react-bootstrap/Form";
import { titleCase } from "../../helpers";
import { isEmpty } from "lodash";
import NumberInput from "../common/NumberInput";
import { useSelector } from "react-redux";
import Error from "../common/Error";
import { DIRECT_CLIENTS } from "../../constants/constants";
import SelectInputOptGroups from "../common/SelectInputOptGroups";
import SelectInput from "../common/SelectInput";
import COUNTRY_CODES from "../../constants/countryCodes";

const TourForm = ({ tour, onSave, onChange, saving, errors = {} }) => {
  const agentData = useSelector((state) => state.agents);

  return (
    <>
      <Form onSubmit={onSave}>
        {!isEmpty(errors) && (
          <Error errorMessage="Please correct the errors below" />
        )}
        <SelectInputOptGroups
          name="agent"
          label="Agent or Client"
          value={tour.agent?.code || ""}
          defaultOption="Select Agent or Client"
          options={[DIRECT_CLIENTS, ...agentData].map((agent) => ({
            value: agent.code,
            text: titleCase(agent.name),
          }))}
          onChange={onChange}
          error={errors.agent}
          requiredField
        />
        {tour.agent.code === "DIR" && (
          <SelectInput
            name="agent.nationCode"
            label="Agent Nationality"
            value={tour.agent.nationCode || ""}
            defaultOption="Select Nationality"
            options={COUNTRY_CODES.map((country) => ({
              value: country.code,
              text: titleCase(country.name),
            }))}
            onChange={onChange}
            error={errors.nationality}
            requiredField
          />
        )}
        <TextInput
          name="tourName"
          label="Tour Name"
          value={titleCase(tour.tourName) || ""}
          onChange={onChange}
          error={errors.tourName}
          requiredField
        />
        <TextInput
          name="groupFitName"
          label="Group/FIT Name"
          value={titleCase(tour.groupFitName) || ""}
          onChange={onChange}
          error={errors.groupFitName}
          requiredField
        />
        <NumberInput
          name="paxNum"
          label="Number of Passengers"
          value={tour.paxNum || ""}
          onChange={onChange}
          error={errors.paxNum}
          placeholder="Leave empty if not confirmed"
        />
        <DateInput
          name="dateFrom"
          label="Start Date"
          onChange={onChange}
          value={tour.dateFrom}
          error={errors.dateFrom}
        />
        <DateInput
          name="dateTo"
          label="End Date"
          onChange={onChange}
          value={tour.dateTo}
          error={errors.dateTo}
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
  tour: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default TourForm;
