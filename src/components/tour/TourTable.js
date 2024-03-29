import React, { useState } from "react";
import PropTypes from "prop-types";
import EmptyList from "../common/EmptyList";
import Table from "react-bootstrap/Table";
import { FaSort } from "react-icons/fa";
import { useSortableData } from "../../hooks/sortData";
import { formatDate, setColorForTourStatus, titleCase } from "../../helpers";
import TourAddEditModal from "./TourAddEditModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ERN_DATA_KEYS } from "../../constants/constants";
import TourStatusIcon from "../common/TourStatusIcon";
import ConfirmTourModal from "./ConfirmTourModal";
import AgentImg from "../agents/AgentImg";
import { useSelector } from "react-redux";

export default function TourTable({ data }) {
  const { sortedData, requestSort } = useSortableData(data);
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const activeTour = useSelector((state) => state.activeTour);

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
      <Table size="sm" className="smaller-table">
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
              Agent | Client
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
              <th> Edit | Confirm</th>
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
                id={d.id === activeTour ? "activeTourTr" : null}
              >
                <td>
                  <TourStatusIcon tourStatus={d.status} iconSize="1.5rem" />
                </td>
                <td>{("000" + d.id).slice(-3)}</td>
                <td>{formatDate(d.fileOpenDate)}</td>
                <td>
                  <div className="agentImgContainer">
                    <AgentImg
                      img={`flags/${d.agent.nationCode}.svg`}
                      heightAndWidth="1.5rem"
                    />
                    <p style={{ margin: "0 0 0 5px" }}>{d.agent.name}</p>
                  </div>
                </td>
                <td>{titleCase(d.tourName)}</td>
                <td>{titleCase(d.groupFitName)}</td>
                <td>{d.paxNum}</td>
                <td>{formatDate(d.dateFrom)}</td>
                <td>{formatDate(d.dateTo)}</td>
                <td>{d.numOfDays === "" ? "N/A" : d.numOfDays}</td>
                <td className="editDeleteCard">
                  <TourAddEditModal data={d} setModalOpen={setModalOpen} />
                  <ConfirmTourModal
                    data={d}
                    setModalOpen={setModalOpen}
                    buttonStyle="round"
                  />
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
