import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { useSortableData } from "../../hooks/sortData";
import {
  formatDate,
  titleCase,
  formatCurrency,
  setColorForCardStatus,
} from "../../helpers";
import DataAddEditModal from "./DataAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { CARD_DATA_KEYS, DELETE_MODAL_TYPES } from "../../constants";
import BonusEarnStatusIcon from "../common/BonusEarnStatusIcon";
import CreditBureauIcons from "../common/CreditBureauIcons";

export default function DataListTable({
  cards,
  showEditDelete,
  showUser,
  showCompactTable,
}) {
  const windowWidth = useContext(WindowWidthContext);
  const { data, requestSort } = useSortableData(cards);
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const routeChange = (card) => {
    let path = `/card/${card.id}`;
    if (!modalOpen) history.push(path);
  };

  function handleTrColorOnHover(e) {
    if (e.target.parentNode.tagName === "TR") {
      e.target.parentNode.className = "table-active";
    }
  }
  function handleTrColorReset(e, card) {
    if (e.target.parentNode.tagName === "TR") {
      e.target.parentNode.className = setColorForCardStatus(
        "cardTable",
        card.status
      );
    }
  }

  return cards.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <Table size="sm">
      <thead>
        <tr>
          <th className="tableHeader">
            File Open Date
            <FaSort
              onClick={() => requestSort(CARD_DATA_KEYS.appDate)}
              style={{ marginLeft: "5px" }}
            />
          </th>
          <th className="tableHeader">
            Agent Name
            <FaSort onClick={() => requestSort(CARD_DATA_KEYS.cardholder)} />
          </th>
          <th className="tableHeader">
            Agent Code{" "}
            <FaSort onClick={() => requestSort(CARD_DATA_KEYS.card)} />
          </th>
          <th className="tableHeader">
            Tour Name{" "}
            <FaSort onClick={() => requestSort(CARD_DATA_KEYS.cardType)} />
          </th>
          <th className="tableHeader">
            Pax Num{" "}
            <FaSort onClick={() => requestSort(CARD_DATA_KEYS.creditLine)} />
          </th>
          <th className="tableHeader">
            Date From{" "}
            <FaSort onClick={() => requestSort(CARD_DATA_KEYS.annualFee)} />
          </th>
          <th className="tableHeader">Date To</th>

          <th className="tableHeader">Number of Days</th>
          <th className="tableHeader">Status</th>
          <th className="tableHeader">File Num</th>
          <th className="tableHeader">File Name</th>
          {showEditDelete && (
            <>
              <th></th>
            </>
          )}
        </tr>
      </thead>
      <tbody className="align-middle">
        {data.map((d) => {
          return (
            <tr
              key={d.serialNum}
              // className={setColorForCardStatus("cardTable", d.status)}
              onMouseEnter={handleTrColorOnHover}
              onMouseLeave={(e) => handleTrColorReset(e, d)}
              style={{ cursor: "pointer" }}
              onClick={() => routeChange(d)}
            >
              <td>{d.fileOpenDate}</td>
              {/* {showUser && <td>{d.cardholder}</td>} */}
              <td>{d.agtName}</td>
              <td>{d.agtCode}</td>
              <td>{d.groupOrTourName}</td>
              <td>{d.paxNum}</td>
              <td>{d.dateFrm}</td>
              <td>{d.dateTo}</td>
              <td>{d.numOfDays}</td>
              <td>{d.status}</td>
              <td>{d.fileNo}</td>
              <td>{d.fileName}</td>
              <td>{d.signupBonus}</td>
              {showEditDelete && (
                <>
                  <td className="editDeleteCard">
                    <DataAddEditModal card={d} setModalOpen={setModalOpen} />
                    <ConfirmDeleteModal
                      data={d}
                      dataType={DELETE_MODAL_TYPES.card}
                      setModalOpen={setModalOpen}
                    />
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

DataListTable.propTypes = {
  cards: PropTypes.array.isRequired,
  history: PropTypes.object,
  showEditDelete: PropTypes.bool.isRequired,
  showUser: PropTypes.bool.isRequired,
  showCompactTable: PropTypes.bool.isRequired,
};
