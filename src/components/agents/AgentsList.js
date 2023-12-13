import React from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import CardHolderAddEditModal from "./AgentAddEditModal";
import { DELETE_MODAL_TYPES } from "../../constants";
import AgentTourDataMiniTable from "./AgentTourDataMiniTable";
import CardholderPhoto from "./CardholderPhoto";

const AgentsList = ({ toursByAgent, agents }) => {
  return agents.length === 0 ? (
    <EmptyList dataType={"card holders"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th className="tableHeader"></th>
          <th className="tableHeader">Agent Name</th>
          <th className="tableHeader">Agent Code</th>
          <th className="tableHeader">Nationality</th>
          <th className="tableHeader">Tours</th>
          <th className="tableHeader"></th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {agents.map((agent) => {
          const toursForThisAgent = toursByAgent[agent.code];
          return (
            <tr key={agent.id}>
              <td style={{ textAlign: "center", padding: "10px" }}>
                <CardholderPhoto
                  img={`flags/${agent.nationCode}.svg`}
                  heightAndWidth="4rem"
                />
              </td>
              <td>{agent.name}</td>
              <td>{agent.code}</td>
              <td>{agent.nationality}</td>
              <td className="dataTableTd">
                <AgentTourDataMiniTable
                  tours={toursForThisAgent}
                  layout="list"
                />
              </td>
              <td className="editDeleteCard">
                <CardHolderAddEditModal
                  agent={agent}
                  // disableBtn={agent.isPrimary}
                />
                <ConfirmDeleteModal
                  data={agent}
                  dataType={DELETE_MODAL_TYPES.agent}
                  disableBtn={
                    agent.hasCards || agent.hasLoyalty || agent.isPrimary
                  }
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

AgentsList.propTypes = {
  cardholders: PropTypes.array.isRequired,
};

export default AgentsList;
