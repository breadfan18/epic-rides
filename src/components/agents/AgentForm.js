import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import COUNTRY_CODES from "../../countryCodes";
import { titleCase } from "../../helpers";
import { isEmpty } from "lodash";
import { APP_COLOR_BLACK_OPACITY, APP_COLOR_EPIC_RED } from "../../constants";

const AgentForm = ({ agent, onSave, onChange, errors = {}, saving }) => {
  const buttonText = saving
    ? "Saving..."
    : agent.id === null
    ? "Add Agent"
    : "Save Changes";

  return (
    <form onSubmit={onSave} style={{ margin: 0 }}>
      {!isEmpty(errors) && (
        <div
          className="alert"
          role="alert"
          style={{
            backgroundColor: APP_COLOR_BLACK_OPACITY,
            color: APP_COLOR_EPIC_RED,
            border: `2px solid ${APP_COLOR_EPIC_RED}`,
          }}
        >
          Please address the errors below
        </div>
      )}
      <TextInput
        name="name"
        label="Agent Name"
        value={agent.name || ""}
        onChange={onChange}
        error={errors.name}
      />
      <TextInput
        name="code"
        label="Agent Code"
        value={agent.code || ""}
        onChange={onChange}
        error={errors.code}
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
        error={errors.nationality}
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
