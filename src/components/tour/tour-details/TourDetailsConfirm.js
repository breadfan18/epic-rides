import React from "react";
import { IoCheckmarkCircleSharp, IoRemoveCircle } from "react-icons/io5";
import {
  APP_COLOR_EPIC_RED,
  DELETE_COLOR_RED,
  EDIT_COLOR_GREEN,
} from "../../../constants/constants";
import ConfirmTourModal from "../ConfirmTourModal";

export default function TourDetailsConfirm({ tour }) {
  const tourNotReady =
    tour.paxNum === "N/A" ||
    tour.dateFrom === "" ||
    tour.dateTo === "" ||
    tour.status === "HK";

  return (
    <div className="tourDetailsConfirmCancel" style={{ marginRight: "10px" }}>
      <p>
        {tourNotReady
          ? "The following fields are REQUIRED before a tour can be confirmed. Please edit tour with the required data to enable tour confirmation"
          : "This tour has all required fields and is ready to be confirmed. "}
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          {tour.paxNum === "N/A" ? (
            <IoRemoveCircle style={{ color: DELETE_COLOR_RED }} />
          ) : (
            <IoCheckmarkCircleSharp style={{ color: EDIT_COLOR_GREEN }} />
          )}{" "}
          Pax Num
        </li>
        {[tour.dateFrom, tour.dateTo].map((date, i) => {
          return (
            <li>
              {date === "" ? (
                <IoRemoveCircle style={{ color: DELETE_COLOR_RED }} />
              ) : (
                <IoCheckmarkCircleSharp style={{ color: EDIT_COLOR_GREEN }} />
              )}{" "}
              {i === 0 ? "Tour Start Date" : "Tour End Date"}
            </li>
          );
        })}
      </ul>
      <ConfirmTourModal data={tour} buttonColor={APP_COLOR_EPIC_RED} />
    </div>
  );
}
