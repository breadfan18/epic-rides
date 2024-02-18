import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import {
  ERN_DATA_KEYS,
  APP_COLOR_BLACK_OPACITY,
} from "../../constants/constants";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import TourAddEditModal from "./TourAddEditModal";
import { WindowWidthContext } from "../App";
import CardText from "./CardText";
import { setColorForTourStatus } from "../../helpers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TourStatusIcon from "../common/TourStatusIcon";
import ConfirmTourModal from "./ConfirmTourModal";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
export default function TourCards({ data, showFilter }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
  const history = useHistory();
  const activeTour = useSelector((state) => state.activeTour);

  const routeChange = (tour) => {
    let path = `/tour/${tour.id}`;
    history.push(path);
  };

  const allTours = data.map((d) => {
    return (
      <Card
        style={{ width: cardWidth }}
        key={d.id}
        className="cardCard"
        id={d.id === activeTour ? "activeTourTr" : null}
      >
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: APP_COLOR_BLACK_OPACITY,
            }}
          >
            <Card.Title
              id="cardTitle"
              style={{
                backgroundColor: setColorForTourStatus("tourCard", d.status),
              }}
            >
              <p style={{ margin: 0 }}>{d.tourName}</p>
              <p style={{ margin: 0 }}>
                <TourStatusIcon tourStatus={d.status} iconSize="1.5rem" />
              </p>
            </Card.Title>
          </div>
          <section id="cardBody" onClick={() => routeChange(d)}>
            <div>
              <Table size="sm" style={{ fontSize: "14px", marginBottom: 0 }}>
                <tbody>
                  <CardText data={d} dataType={ERN_DATA_KEYS.fileOpenDate} />
                  <CardText data={d} dataType={ERN_DATA_KEYS.agent} />
                  <CardText data={d} dataType={ERN_DATA_KEYS.groupFitName} />
                  <CardText data={d} dataType={ERN_DATA_KEYS.paxNum} />
                  <CardText data={d} dataType={ERN_DATA_KEYS.dateFrom} />
                  <CardText data={d} dataType={ERN_DATA_KEYS.dateTo} />
                  <CardText data={d} dataType={ERN_DATA_KEYS.numOfDays} />
                </tbody>
              </Table>
            </div>
          </section>
          <div className="editDeleteCard editDeleteOnCards">
            <TourAddEditModal data={d} />
            <ConfirmTourModal data={d} buttonStyle="round" />
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
  data: PropTypes.array.isRequired,
};
