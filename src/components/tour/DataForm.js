import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import { AGENTS, STATUS_CODES } from "../../constants";
import DateInput from "../common/DateInput";
import Form from "react-bootstrap/Form";
import { titleCase } from "../../helpers";

const DataForm = ({ data, onSave, onChange, saving, errors = {} }) => {
  return (
    <>
      <Form onSubmit={onSave}>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <DateInput
          name="fileOpenDate"
          label="File Open Date"
          onChange={onChange}
          value={data.fileOpenDate}
        />
        <SelectInput
          name="agent"
          label="Agent"
          value={data.agent.name || ""}
          defaultOption="Select Agent"
          options={AGENTS.map((agent) => ({
            value: agent.name,
            text: titleCase(agent.name),
          }))}
          onChange={onChange}
          error={errors.author}
        />
        <TextInput
          name="tourName"
          label="Tour Name"
          value={data.tourName || ""}
          onChange={onChange}
          error={errors.title}
        />
        <TextInput
          name="groupFitName"
          label="Group/FIT Name"
          value={data.groupFitName || ""}
          onChange={onChange}
          error={errors.title}
        />
        <TextInput
          name="paxNum"
          label="Number of Passengers"
          value={data.paxNum || ""}
          onChange={onChange}
          error={errors.title}
        />
        <DateInput
          name="dateFrom"
          label="Start Date"
          onChange={onChange}
          value={data.dateFrom}
          // disabled={formDisabledCheck(card.annualFee)}
        />
        <DateInput
          name="dateTo"
          label="End Date"
          onChange={onChange}
          value={data.dateTo}
          // disabled={formDisabledCheck(card.annualFee)}
        />
        <SelectInput
          name="status"
          label="Status"
          value={data.status || ""}
          defaultOption="Select Status"
          options={STATUS_CODES.map((status) => ({
            value: status.code,
            text: titleCase(status.name),
          }))}
          onChange={onChange}
          error={errors.author}
        />
        <hr />
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary addButton"
        >
          {data.id === null ? "Add Data" : "Save Data"}
        </button>
      </Form>
    </>
  );
};

DataForm.propTypes = {
  card: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default DataForm;
