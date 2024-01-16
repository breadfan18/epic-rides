import React from "react";
import Card from "react-bootstrap/Card";
import TourDetailsConfirm from "./TourDetailsConfirm";
import TourDetailsCancel from "./TourDetailsCancel";

export default function TourDetailsConfirmCancel({ tour }) {
  return (
    <Card className="text-center" style={{ boxShadow: `2px 0 10px gray` }}>
      <Card.Header className="cardHeaders">Update Tour Status</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        {tour.status === "CA" ? (
          <>
            <b>TOUR CANCELLED</b>
            <p>
              A cancelled tour cannot be modified. If the client reaches out
              again regarding this tour, please create a new tour record.
            </p>
          </>
        ) : tour.status !== "HK" && tour.status !== "CA" ? (
          <>
            <TourDetailsConfirm tour={tour} />
            <hr />
            <TourDetailsCancel tour={tour} />
          </>
        ) : (
          <TourDetailsCancel />
        )}
      </Card.Body>
    </Card>
  );
}
