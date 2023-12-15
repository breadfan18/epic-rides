import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import { DELETE_MODAL_TYPES } from "../../constants/constants";
import AgentAddEditModal from "./AgentAddEditModal";
import AgentTourDataMiniTable from "./AgentTourDataMiniTable";
import AgentImg from "./AgentImg";
import EmptyList from "../common/EmptyList";

export default function AgentCards({ agents, toursByAgent }) {
  const windowWidth = useContext(WindowWidthContext);
  const cardWidth = windowWidth < 650 ? windowWidth : "18em";
  const allAgents = agents.map((agent) => {
    const toursForThisAgent = toursByAgent[agent.code];

    return (
      <Card
        style={{ width: cardWidth }}
        key={agent.code}
        className="cardCard cardholderCard"
      >
        <Card.Body style={{ padding: "0" }}>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Card.Title className="mb-0 cardholderCardTitle">
              <AgentImg
                img={`flags/${agent.nationCode}.svg`}
                heightAndWidth="6rem"
                imgOnCard={true}
              />
            </Card.Title>
          </div>
          <section id="cardholderCardBody">
            <h6 id="cardholderCardName">
              {agent.name} ({agent.code})
            </h6>
            <article style={{ textAlign: "center" }}>
              <b>Agent Tours</b>
              <div>
                <AgentTourDataMiniTable tours={toursForThisAgent} />
              </div>
            </article>
            <br />
          </section>

          <div className="editDeleteCard editDeleteOnCards cardholderFooter">
            <AgentAddEditModal agent={agent} />
            <ConfirmDeleteModal
              data={agent}
              dataType={DELETE_MODAL_TYPES.agent}
              disableBtn={agent.hasTours}
            />
          </div>
        </Card.Body>
      </Card>
    );
  });
  return agents.length === 0 ? (
    <EmptyList dataType={"agent"} />
  ) : (
    <div id="cardsContainer">{allAgents}</div>
  );
}

AgentCards.propTypes = {
  agents: PropTypes.array.isRequired,
  toursByAgent: PropTypes.object.isRequired,
};
