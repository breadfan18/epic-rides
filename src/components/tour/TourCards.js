import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import {
  ERN_DATA_KEYS,
  APP_COLOR_BLACK_OPACITY,
  DELETE_MODAL_TYPES,
  STATUS_CODES,
} from "../../constants";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import DataAddEditModal from "./DataAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import CardText from "./CardText";
import { setColorForCardStatus } from "../../helpers";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
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
                  <BonusEarnStatusIcon
                    bonusEarned={d.status === "HK"}
                    iconSize="1.5rem"
                  />
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
              <CardText data={d} dataType={ERN_DATA_KEYS.dateFrom} />
              <CardText data={d} dataType={ERN_DATA_KEYS.dateTo} />
              <CardText data={d} dataType={ERN_DATA_KEYS.numOfDays} />
            </div>
          </section>
          <div className="editDeleteCard editDeleteOnCards">
            <DataAddEditModal data={d} />
            <ConfirmDeleteModal data={d} dataType={DELETE_MODAL_TYPES.card} />
          </div>
        </Card.Body>
      </Card>
    );
  });
  return data.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <div id="cardCardContainer">{allTours}</div>
  );
}

TourCards.propTypes = {
  cards: PropTypes.array.isRequired,
  showEditDelete: PropTypes.bool,
  showUserName: PropTypes.bool,
};