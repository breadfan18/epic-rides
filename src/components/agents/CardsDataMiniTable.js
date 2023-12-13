import React from "react";
import { groupBy } from "lodash";
import { CARD_STATUS, STATUS_CODES } from "../../constants";
import { titleCase } from "../../helpers";

export default function AgentTourDataMiniTable({ tours, layout }) {
  console.log(tours);
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
          return (
            <div key={status.code}>
              <label htmlFor="">{titleCase(status.name)}</label>
              <p>{toursByStatus[status.code]?.length || 0}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
