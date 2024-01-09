import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { useSortableData } from "../../hooks/sortData";
import { formatDate, setColorForTourStatus, titleCase } from "../../helpers";
import TourAddEditModal from "./TourAddEditModal";
import { WindowWidthContext } from "../App";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ERN_DATA_KEYS } from "../../constants/constants";
import TourStatusIcon from "../common/TourStatusIcon";
import Filters from "./Filters";
import useTourFilter from "../../hooks/filterTours";

export default function TourTable({ data, showFilter }) {
  const windowWidth = useContext(WindowWidthContext);

  const {
    filteredData,
    setTourNameFilter,
    setAgentFilter,
    resetFilters,
    setStatusFilter,
  } = useTourFilter(data);

  const { sortedData, requestSort } = useSortableData(filteredData);
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const routeChange = (tour) => {
    let path = `/tour/${tour.id}`;
    if (!modalOpen) history.push(path);
  };

  function handleTrColorOnHover(e) {
    if (e.target.parentNode.tagName === "TR") {
      e.target.parentNode.className = "table-active";
    }
  }

  function handleTrColorReset(e, card) {
    if (e.target.parentNode.tagName === "TR") {
      e.target.parentNode.className = setColorForTourStatus(
        "tourTable",
        card.status
      );
    }
  }

  return data.length === 0 ? (
    <EmptyList dataType={"tour"} />
  ) : (
    <>
      {showFilter && (
        <div>
          <input
            type="text"
            placeholder="Filter by tour name"
            onChange={(e) => setTourNameFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by agent name"
            onChange={(e) => setAgentFilter(e.target.value)}
          />

          <div>
            <label>
              <input
                type="radio"
                name="status"
                value=""
                onChange={() => setStatusFilter("")}
                checked={data.status === ""}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="OP"
                onChange={() => setStatusFilter("OP")}
                checked={data.status === "OP"}
              />
              Open
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="CL"
                onChange={() => setStatusFilter("CA")}
                checked={data.status === "CA"}
              />
              Cancelled
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="CL"
                onChange={() => setStatusFilter("HK")}
                checked={data.status === "HK"}
              />
              Confirmed
            </label>
          </div>

          <button onClick={resetFilters}>Reset Filters</button>
        </div>
      )}
      <Table striped size="sm" className="smaller-table">
        <thead>
          <tr>
            <th className="tableHeader">
              Status
              <FaSort onClick={() => requestSort(ERN_DATA_KEYS.status)} />
            </th>
            <th className="tableHeader">
              Num
              <FaSort onClick={() => requestSort(ERN_DATA_KEYS.id)} />
            </th>
            <th className="tableHeader">
              File Opened
              <FaSort onClick={() => requestSort(ERN_DATA_KEYS.fileOpenDate)} />
            </th>
            <th className="tableHeader">
              Agent
              <FaSort onClick={() => requestSort(ERN_DATA_KEYS.agent)} />
            </th>
            <th className="tableHeader">
              Tour Name{" "}
              <FaSort onClick={() => requestSort(ERN_DATA_KEYS.tourName)} />
            </th>
            <th className="tableHeader">
              Group Name{" "}
              <FaSort onClick={() => requestSort(ERN_DATA_KEYS.groupFitName)} />
            </th>
            <th className="tableHeader">
              Pax <FaSort onClick={() => requestSort(ERN_DATA_KEYS.paxNum)} />
            </th>
            <th className="tableHeader">
              From{" "}
              <FaSort onClick={() => requestSort(ERN_DATA_KEYS.dateFrom)} />
            </th>
            <th className="tableHeader">
              To <FaSort onClick={() => requestSort(ERN_DATA_KEYS.dateTo)} />
            </th>
            <th className="tableHeader">
              Days{" "}
              <FaSort onClick={() => requestSort(ERN_DATA_KEYS.numOfDays)} />
            </th>
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
                className={setColorForTourStatus("tourTable", d.status)}
                onMouseEnter={handleTrColorOnHover}
                onMouseLeave={(e) => handleTrColorReset(e, d)}
                style={{ cursor: "pointer" }}
                onClick={() => routeChange(d)}
                // className={d.status === "CA" ? "table-danger" : ""}
              >
                <td>
                  <TourStatusIcon tourStatus={d.status} iconSize="1.5rem" />
                </td>
                <td>{("000" + d.id).slice(-3)}</td>
                <td>{formatDate(d.fileOpenDate)}</td>
                <td>{d.agent.name}</td>
                <td>{titleCase(d.tourName)}</td>
                <td>{titleCase(d.groupFitName)}</td>
                <td>{d.paxNum}</td>
                <td>{formatDate(d.dateFrom)}</td>
                <td>{formatDate(d.dateTo)}</td>
                <td>{d.numOfDays === "" ? "N/A" : d.numOfDays}</td>
                <td className="editDeleteCard">
                  <TourAddEditModal data={d} setModalOpen={setModalOpen} />
                  {/* <ConfirmDeleteModal
                  data={d}
                  dataType="tour"
                  setModalOpen={setModalOpen}
                /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

TourTable.propTypes = {
  data: PropTypes.array.isRequired,
};
