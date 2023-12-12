import React from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import CardHolderAddEditModal from "./CardHolderAddEditModal";
import { DELETE_MODAL_TYPES } from "../../constants";
import CardsDataMiniTable from "./CardsDataMiniTable";
import LoyaltyDataMiniTable from "./LoyaltyDataMiniTable";
import CardholderPhoto from "./CardholderPhoto";
import InquiriesMiniTable from "./InquiriesMiniTable";

const AgentsList = ({ cardsByHolder, loyaltyByHolder, agents }) => {
  return agents.length === 0 ? (
    <EmptyList dataType={"card holders"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th className="tableHeader"></th>
          <th className="tableHeader">First Name</th>
          <th className="tableHeader">Last Name</th>
          <th className="tableHeader">Cards</th>
          <th className="tableHeader">Loyalty</th>
          <th className="tableHeader">Inquiries (24 mos)</th>
          <th className="tableHeader"></th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {agents.map((agent) => {
          // const cardsForThisHolder = cardsByHolder[holder.id];
          // const loyaltyForThisHolder = loyaltyByHolder[holder.id];
          // const inquiriesForThisHolder = inquiriesByHolder[holder.id];

          return (
            <tr key={agent.id}>
              <td style={{ textAlign: "center", padding: "10px" }}>
                <CardholderPhoto img={agent.img} heightAndWidth="4rem" />
              </td>
              <td>{agent.name.split(" ")[0]}</td>
              <td>{agent.name.split(" ")[1]}</td>
              {/* <td className="dataTableTd">
                <CardsDataMiniTable cards={cardsForThisHolder} layout="list" />
              </td>
              <td className="dataTableTd">
                <LoyaltyDataMiniTable
                  loyaltyData={loyaltyForThisHolder}
                  layout="list"
                />
              </td>
              <td className="dataTableTd">
                <InquiriesMiniTable
                  inquiries={inquiriesForThisHolder}
                  layout="list"
                />
              </td> */}
              <td className="editDeleteCard">
                <CardHolderAddEditModal
                  cardholder={agent}
                  disableBtn={agent.isPrimary}
                />
                <ConfirmDeleteModal
                  data={agent}
                  dataType={DELETE_MODAL_TYPES.cardholder}
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
