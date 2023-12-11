import React from "react";
import PropTypes from "prop-types";
import { formatCurrency, formatDate, titleCase } from "../../helpers";
import { ERN_DATA_KEYS } from "../../constants";

function CardText({ data, dataType }) {
  const setCardDataType = (data, dataType) => {
    switch (dataType) {
      case ERN_DATA_KEYS.fileOpenDate:
        return {
          fieldName: "File Opened",
          value: formatDate(data.fileOpenDate),
        };
      case ERN_DATA_KEYS.paxNum:
        return {
          fieldName: "Passengers",
          value: data.paxNum,
        };
      case ERN_DATA_KEYS.dateFrom:
        return {
          fieldName: "From",
          value: data.dateFrom === "" ? "N/A" : formatDate(data.dateFrom),
        };
      case ERN_DATA_KEYS.dateTo:
        return {
          fieldName: "To",
          value: data.dateTo === "" ? "N/A" : formatDate(data.dateTo),
        };
      case ERN_DATA_KEYS.numOfDays:
        return {
          fieldName: "Num of Days",
          value: data.numOfDays,
        };
      case ERN_DATA_KEYS.status:
        return {
          fieldName: "Status",
          value: data.status,
        };
      case ERN_DATA_KEYS.fileName:
        return {
          fieldName: "File",
          value: data.fileName,
        };
      default:
        break;
    }
  };

  const cardDataType = setCardDataType(data, dataType);
  return (
    <p className="mb-0 text-muted">
      <small>
        <b style={{ color: "black" }}>{cardDataType.fieldName}</b>
        {": "}
        {cardDataType.value}
      </small>
    </p>
  );
}

CardText.propTypes = {
  card: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default CardText;
