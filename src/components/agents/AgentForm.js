import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import COUNTRY_CODES from "../../countryCodes";
import { titleCase } from "../../helpers";

const AgentForm = ({ agent, onSave, onChange, errors = {}, saving }) => {
  const buttonText = saving
    ? "Saving..."
    : agent.id === null
    ? "Add Agent"
    : "Save Changes";

  return (
    <form onSubmit={onSave} style={{ margin: 0 }}>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Agent Name"
        value={agent.name || ""}
        onChange={onChange}
        // error={errors.title}
      />
      <TextInput
        name="code"
        label="Agent Code"
        value={agent.code || ""}
        onChange={onChange}
        // error={errors.title}
      />
      <SelectInput
        name="nationality"
        label="Agent Nationality"
        value={agent.nationality || ""}
        defaultOption="Select Nationality"
        options={COUNTRY_CODES.map((country) => ({
          value: country.code,
          text: titleCase(country.name),
        }))}
        onChange={onChange}
        error={errors.agent}
      />
      <hr />
      <button
        type="submit"
        disabled={saving}
        className="btn btn-primary addButton"
        // onClick={() => setSaving(true)}
      >
        {buttonText}
      </button>
    </form>
  );
};

AgentForm.propTypes = {
  cardholder: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AgentForm;
