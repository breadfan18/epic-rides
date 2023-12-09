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
export default function CardListCards({ data, showEditDelete, showUserName }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18rem";
  const history = useHistory();

  const routeChange = (card) => {
    let path = `/card/${card.id}`;
    history.push(path);
  };

  const allCards = data.map((d) => {
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
                padding: "10px 0 0 10px",
                marginBottom: 0,
                borderRadius: "5px 5px 0 0 ",
              }}
            >
              {d.groupOrTourName}
            </Card.Title>
            <Card.Subtitle
              style={{
                padding: "10px",
                margin: "0",
                borderRadius: showUserName ? null : "5px 5px 0 0 ",
                color: showUserName ? "rgba(33, 37, 41, 0.75)" : "black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <p style={{ margin: 0 }}>{`${d.agent.name}`}</p>
                <p style={{ margin: 0 }}>
                  <BonusEarnStatusIcon
                    bonusEarned={d.bonusEarned}
                    iconSize="1.3rem"
                  />
                </p>
              </div>
            </Card.Subtitle>
          </div>
          <section id="cardBody" onClick={() => routeChange(d)}>
            <div>
              <CardText data={d} dataType={ERN_DATA_KEYS.fileOpenDate} />
              <CardText data={d} dataType={ERN_DATA_KEYS.paxNum} />
              <CardText data={d} dataType={ERN_DATA_KEYS.dateFrom} />
              <CardText data={d} dataType={ERN_DATA_KEYS.dateTo} />
              <CardText data={d} dataType={ERN_DATA_KEYS.numOfDays} />
              <CardText data={d} dataType={ERN_DATA_KEYS.status} />
              <CardText data={d} dataType={ERN_DATA_KEYS.fileName} />
            </div>
            {/* <div>
              <img src={d.issuer.img} alt="Issuer" className="issuerLogos" />
            </div> */}
          </section>
          {showEditDelete ?? (
            <div className="editDeleteCard editDeleteOnCards">
              <DataAddEditModal card={d} />
              <ConfirmDeleteModal data={d} dataType={DELETE_MODAL_TYPES.card} />
            </div>
          )}
        </Card.Body>
      </Card>
    );
  });
  return data.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <div id="cardCardContainer">{allCards}</div>
  );
}

CardListCards.propTypes = {
  cards: PropTypes.array.isRequired,
  showEditDelete: PropTypes.bool,
  showUserName: PropTypes.bool,
};
