import React from "react";
import CancelTourModal from "../CancelTourModal";

export default function TourDetailsCancel({ tour }) {
  return (
    <div className="tourDetailsConfirmCancel">
      <p>
        If this tour record is obsolete, you can cancel it.
        <br />
        <br />
        Once the tour is cancelled, it cannot be modified or changed back into
        open status. If the client inquires about this tour again, please create
        a new tour record.
      </p>
      <CancelTourModal data={tour} />
    </div>
  );
}
