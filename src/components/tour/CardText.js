import React, { useContext } from "react";
import PropTypes from "prop-types";
import { formatDate } from "../../helpers";
import { ERN_DATA_KEYS } from "../../constants/constants";
import { WindowWidthContext } from "../App";

function CardText({ data, dataType }) {
  const windowWidth = useContext(WindowWidthContext);
  const tableValueColWidth =
    windowWidth > 650 ? "10rem" : windowWidth < 550 ? "12rem" : "25rem";

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
          value: data.numOfDays || "N/A",
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
      case ERN_DATA_KEYS.groupFitName:
        return {
          fieldName: "Group Name",
          value: data.groupFitName,
        };
      case ERN_DATA_KEYS.agent:
        return {
          fieldName: "Agent",
          value: data.agent.name,
        };
      default:
        break;
    }
  };

  const cardDataType = setCardDataType(data, dataType);
  return (
    <tr>
      <td style={{ fontWeight: "bold", padding: "1px" }}>
        {cardDataType.fieldName}
      </td>
      <td style={{ padding: "1px", width: tableValueColWidth }}>
        {cardDataType.value}
      </td>
    </tr>
  );
}

CardText.propTypes = {
  data: PropTypes.object.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default CardText;
