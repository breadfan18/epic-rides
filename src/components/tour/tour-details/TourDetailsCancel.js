import React from "react";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { saveDataToFirebase } from "../../../redux/actions/dataActions";

export default function TourDetailsCancel({ tour }) {
  const dispatch = useDispatch();
  return (
    <div className="tourDetailsConfirmCancel">
      <p>
        If the tour record is obsolete, you can cancel the tour.
        <br />
        <br />
        Once the tour is cancelled, it cannot be changed back into open status.
        If the client inquires about this tour again, please create a new tour
        record.
      </p>
      <Button
        onClick={() =>
          dispatch(saveDataToFirebase({ ...tour, status: "CA" }, tour.id))
        }
        style={{
          backgroundColor: "black",
          border: "none",
          height: "3.5rem",
        }}
      >
        Cancel Tour
      </Button>
    </div>
  );
}
