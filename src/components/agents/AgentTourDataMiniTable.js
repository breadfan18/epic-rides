import React from "react";
import { groupBy } from "lodash";
import {
  APP_COLOR_EPIC_RED,
  DELETE_COLOR_RED,
  EDIT_COLOR_GREEN,
  STATUS_CODES,
} from "../../constants/constants";
import { titleCase } from "../../helpers";

export default function AgentTourDataMiniTable({ tours, layout }) {
  const toursByStatus = groupBy(tours, "status");
  const miniDataSectionMarginRight = layout === "list" && "1.5rem";
  return (
    <section
      className="cardholderDataSection"
      style={{ marginRight: miniDataSectionMarginRight }}
    >
      <p style={{ textAlign: "center" }}>{tours?.length || 0}</p>
      <hr />
      <div className="dataTableDataSection">
        {STATUS_CODES.map((status) => {
          const statusColor =
            status.code === "HK"
              ? EDIT_COLOR_GREEN
              : status.code === "OP"
              ? APP_COLOR_EPIC_RED
              : DELETE_COLOR_RED;
          return (
            <div key={status.code} style={{ color: statusColor }}>
              <label htmlFor="">{titleCase(status.name)}</label>
              <p>{toursByStatus[status.code]?.length || 0}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
