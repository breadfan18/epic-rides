import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import {
  ERN_DATA_KEYS,
  APP_COLOR_BLACK_OPACITY,
} from "../../constants/constants";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import TourAddEditModal from "./TourAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import CardText from "./CardText";
import { setColorForTourStatus } from "../../helpers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TourStatusIcon from "../common/TourStatusIcon";
export default function TourCards({ data, showEditDelete, showUserName }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
  const history = useHistory();

  const routeChange = (tour) => {
    let path = `/tour/${tour.id}`;
    history.push(path);
  };

  const allTours = data.map((d) => {
    return (
      <Card style={{ width: cardWidth }} key={d.id} className="cardCard">
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: APP_COLOR_BLACK_OPACITY,
            }}
          >
            <Card.Title
              style={{
                padding: "10px",
                fontSize: "15px",
                backgroundColor: setColorForTourStatus("tourCard", d.status),
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <p style={{ margin: 0 }}>{d.tourName}</p>
                <p style={{ margin: 0 }}>
                  <TourStatusIcon tourStatus={d.status} iconSize="1.5rem" />
                </p>
              </div>
            </Card.Title>
          </div>
          <section id="cardBody" onClick={() => routeChange(d)}>
            <div>
              <CardText data={d} dataType={ERN_DATA_KEYS.fileOpenDate} />
              <CardText data={d} dataType={ERN_DATA_KEYS.agent} />
              <CardText data={d} dataType={ERN_DATA_KEYS.groupFitName} />
              <CardText data={d} dataType={ERN_DATA_KEYS.paxNum} />
              {d.dateFrom !== "" &&
                d.dateFrom !== null &&
                d.dateFrom !== undefined && (
                  <>
                    <CardText data={d} dataType={ERN_DATA_KEYS.dateFrom} />
                    <CardText data={d} dataType={ERN_DATA_KEYS.dateTo} />
                    <CardText data={d} dataType={ERN_DATA_KEYS.numOfDays} />
                  </>
                )}
            </div>
          </section>
          <div className="editDeleteCard editDeleteOnCards">
            <TourAddEditModal data={d} />
            {/* <ConfirmDeleteModal data={d} dataType={DELETE_MODAL_TYPES.tour} /> */}
          </div>
        </Card.Body>
      </Card>
    );
  });
  return data.length === 0 ? (
    <EmptyList dataType={"tour"} />
  ) : (
    <div id="cardsContainer">{allTours}</div>
  );
}

TourCards.propTypes = {
  cards: PropTypes.array.isRequired,
  showEditDelete: PropTypes.bool,
  showUserName: PropTypes.bool,
};
