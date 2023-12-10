import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { useSortableData } from "../../hooks/sortData";
import { formatDate, setColorForCardStatus } from "../../helpers";
import DataAddEditModal from "./DataAddEditModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import { WindowWidthContext } from "../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ERN_DATA_KEYS, DELETE_MODAL_TYPES } from "../../constants";

export default function DataListTable({ data }) {
  const windowWidth = useContext(WindowWidthContext);
  const { sortedData, requestSort } = useSortableData(data);
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

  return data.length === 0 ? (
    <EmptyList dataType={"card"} />
  ) : (
    <Table striped size="sm" className="smaller-table">
      <thead>
        <tr>
          <th className="tableHeader">Num</th>
          <th className="tableHeader">
            File Opened
            <FaSort
              onClick={() => requestSort(ERN_DATA_KEYS.appDate)}
              style={{ marginLeft: "5px" }}
            />
          </th>
          <th className="tableHeader">
            Agent
            <FaSort onClick={() => requestSort(ERN_DATA_KEYS.cardholder)} />
          </th>
          <th className="tableHeader">
            Tour Name{" "}
            <FaSort onClick={() => requestSort(ERN_DATA_KEYS.cardType)} />
          </th>
          <th className="tableHeader">
            Group Name{" "}
            <FaSort onClick={() => requestSort(ERN_DATA_KEYS.cardType)} />
          </th>
          <th className="tableHeader">
            Pax <FaSort onClick={() => requestSort(ERN_DATA_KEYS.creditLine)} />
          </th>
          <th className="tableHeader">
            From <FaSort onClick={() => requestSort(ERN_DATA_KEYS.annualFee)} />
          </th>
          <th className="tableHeader">To</th>
          <th className="tableHeader">Days</th>
          <th className="tableHeader">Status</th>
          <>
            <th></th>
          </>
        </tr>
      </thead>
      <tbody className="align-middle">
        {sortedData.map((d) => {
          return (
            <tr
              key={d.id}
              // className={setColorForCardStatus("cardTable", d.status)}
              onMouseEnter={handleTrColorOnHover}
              onMouseLeave={(e) => handleTrColorReset(e, d)}
              style={{ cursor: "pointer" }}
              onClick={() => routeChange(d)}
            >
              <td>{("000" + d.id).slice(-3)}</td>
              <td>{formatDate(d.fileOpenDate)}</td>
              <td>{d.agent.name}</td>
              <td>{d.tourName}</td>
              <td>{d.groupFitName}</td>
              <td>{d.paxNum}</td>
              <td>{formatDate(d.dateFrom)}</td>
              <td>{formatDate(d.dateTo)}</td>
              <td>{d.numOfDays}</td>
              <td>{d.status}</td>
              <td className="editDeleteCard">
                <DataAddEditModal data={d} setModalOpen={setModalOpen} />
                <ConfirmDeleteModal data={d} setModalOpen={setModalOpen} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

DataListTable.propTypes = {
  data: PropTypes.array.isRequired,
};
