import React from "react";
import { APP_COLOR_EPIC_RED, USER_STOCK_IMG } from "../../constants/constants";

export default function CreatedOrEditedBy({ tour, user, action }) {
  return (
    <div className="tourDetailsCreatedOrEdited">
      <img
        src={tour.metadata[`${action}By`]?.photoURL || USER_STOCK_IMG}
        alt={user.displayName}
        style={{
          borderRadius: "50%",
          height: "2rem",
          boxShadow: "0 0 10px " + APP_COLOR_EPIC_RED,
        }}
        title={user.displayName}
      />
      <p style={{ margin: "0 0 0 15px" }}>
        {tour.metadata[`${action}By`]?.displayName || "Anonymous User"}
      </p>
    </div>
  );
}
