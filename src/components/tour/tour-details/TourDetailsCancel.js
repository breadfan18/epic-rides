import React from "react";
import CancelTourModal from "../CancelTourModal";

export default function TourDetailsCancel({ tour }) {
  return (
    <div className="tourDetailsConfirmCancel">
      <p>
        If this tour record is obsolete, you can cancel it. Please keep in mind
        that a canceled tour cannot be re-opened.
      </p>
      <CancelTourModal data={tour} />
    </div>
  );
}
