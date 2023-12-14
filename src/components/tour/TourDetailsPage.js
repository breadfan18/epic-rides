import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadDataFromFirebase,
  saveDataToFirebase,
} from "../../redux/actions/dataActions";
import PropTypes from "prop-types";
import { Spinner } from "../common/Spinner";
import {
  NEW_DATA,
  APP_COLOR_EPIC_RED,
  APP_COLOR_LIGHT_BLUE,
  DELETE_MODAL_TYPES,
  STATUS_CODES,
} from "../../constants";
import { Card, Table } from "react-bootstrap";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
import {
  formatCurrency,
  formatDate,
  setColorForCardStatus,
  sortNotesByDate,
  titleCase,
} from "../../helpers";
// import CardNotes from "./CardNotes";
import { WindowWidthContext } from "../App";
import _ from "lodash";
import TourStatusIcon from "../common/TourStatusIcon";
// import { CardReminderContainer } from "./CardReminderContainer";
import { useUser } from "reactfire";
import TourAddEditModal from "./TourAddEditModal";

function TourDetailsPage({ tours, loadDataFromFirebase, loading, ...props }) {
  const [tour, setTour] = useState({ ...props.tour });
  const windowWidth = useContext(WindowWidthContext);
  const { status, data: user } = useUser();

  useEffect(() => {
    if (tours.length === 0 && status === "success") {
      loadDataFromFirebase(user?.uid);
    } else {
      // Need to understand this logic..
      setTour({ ...props.tour });
    }
  }, [props.tour, user]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="cardDetailsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Tour Details</h2>
        <div className="editDeleteCard">
          <TourAddEditModal data={props.tour} />
          {/* <ConfirmDeleteModal
            data={tour}
            dataType={DELETE_MODAL_TYPES.tour}
            redirect={true}
          /> */}
        </div>
      </section>
      <div className="cardDetailsBody">
        <Card
          style={{
            width: windowWidth > 800 ? "30rem" : windowWidth,
            backgroundColor: setColorForCardStatus("tourCard", tour.status),
            marginRight: windowWidth > 800 ? "15px" : null,
            marginBottom: windowWidth > 800 ? null : "15px",
            boxShadow:
              tour.status === "OP"
                ? "2px 0 10px gray"
                : `2px 0 15px ${setColorForCardStatus(
                    "tourCard",
                    tour.status
                  )}`,
          }}
        >
          <Card.Img
            variant="top"
            src="https://i.imgur.com/DKkCN78.png"
            style={{
              maxHeight: "10rem",
              objectFit: "contain",
            }}
          />
          <Card.Body>
            <article
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div>
                <Card.Title style={{ fontSize: "clamp(0.9rem, 5vw, 1.5rem)" }}>
                  {tour.tourName}
                </Card.Title>
                <Card.Title style={{ fontSize: "clamp(0.7rem, 4vw, 1rem)" }}>
                  {tour.agent.name}
                </Card.Title>
              </div>
              <div>
                <TourStatusIcon
                  tourStatus={tour.status}
                  iconSize="clamp(1.5rem, 10vw, 3rem)"
                />
              </div>
            </article>
            <Table className={setColorForCardStatus("tourTable", tour.status)}>
              <tbody className="align-middle">
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="cardDetailsFieldHeaders"
                  >
                    File Opened Date:
                  </td>
                  <td>{formatDate(props.tour.fileOpenDate)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="cardDetailsFieldHeaders"
                  >
                    Group Name:
                  </td>
                  <td>{tour.groupFitName}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="cardDetailsFieldHeaders"
                  >
                    Number of Passengers:
                  </td>
                  <td>{tour.paxNum}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="cardDetailsFieldHeaders"
                  >
                    Date From:
                  </td>
                  <td>
                    {props.tour.dateFrom !== ""
                      ? formatDate(props.tour.dateFrom)
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="cardDetailsFieldHeaders"
                  >
                    Date To:
                  </td>
                  <td>
                    {props.tour.dateTo !== ""
                      ? formatDate(props.tour.dateTo)
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="cardDetailsFieldHeaders"
                  >
                    Status:
                  </td>
                  <td>
                    {STATUS_CODES.find(
                      (status) => status.code === props.tour.status
                    ).name || ""}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        {/* <div id="cardDetailsSectionRight">
          <CardNotes
            cardId={tour.id}
            cardNotes={sortNotesByDate(_.values(tour.cardNotes))}
          />
          <CardReminderContainer card={tour} />
        </div> */}
      </div>
    </div>
  );
}

TourDetailsPage.propTypes = {
  card: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  loadCardsFromFirebase: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export function getTourById(tours, id) {
  return tours.find((tour) => tour.id.toString() === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;

  console.log(id);

  const tour =
    id && state.data.length > 0 ? getTourById(state.data, id) : NEW_DATA;

  console.log(tour);
  return {
    tour: tour,
    tours: state.data,
    loading: state.apiCallsInProgress > 0 || state.data.length === 0,
  };
}

const mapDispatchToProps = {
  loadDataFromFirebase,
  saveDataToFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailsPage);
