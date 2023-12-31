import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import COUNTRY_CODES from "../../constants/countryCodes";
import { titleCase } from "../../helpers";
import { isEmpty } from "lodash";
import Error from "../common/Error";

const AgentForm = ({ agent, onSave, onChange, errors = {}, saving }) => {
  const buttonText = saving ? "Saving..." : agent.id === null ? "Add" : "Save";
  return (
    <form onSubmit={onSave} style={{ margin: 0 }}>
      {!isEmpty(errors) && (
        <Error errorMessage="Please fill out required fields" />
      )}
      <TextInput
        name="name"
        label="Agent Name"
        value={titleCase(agent.name) || ""}
        onChange={onChange}
        error={errors.name}
        requiredField
      />
      <TextInput
        name="code"
        label="Code (3 characters max)"
        value={agent.code || ""}
        onChange={onChange}
        error={errors.code}
        length={"3"}
        requiredField
      />
      <SelectInput
        name="nationality"
        label="Agent Nationality"
        value={agent.nationCode || ""}
        defaultOption="Select Nationality"
        options={COUNTRY_CODES.map((country) => ({
          value: country.code,
          text: titleCase(country.name),
        }))}
        onChange={onChange}
        error={errors.nationality}
        requiredField
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
  agent: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default AgentForm;
