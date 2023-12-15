import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  loadDataFromFirebase,
  saveDataToFirebase,
} from "../../redux/actions/dataActions";
import { loadAgentsFromFirebase } from "../../redux/actions/agentActions";
import PropTypes from "prop-types";
import { Spinner } from "../common/Spinner";
import {
  NEW_DATA,
  APP_COLOR_EPIC_RED,
  STATUS_CODES,
  APP_COLOR_BLACK_OPACITY,
  TOUR_DETAILS_IMAGES,
} from "../../constants";
import { Card, Table } from "react-bootstrap";
import {
  formatDate,
  setColorForTourStatus,
  sortNotesByDate,
} from "../../helpers";
import TourNotes from "./TourNotes";
import { WindowWidthContext } from "../App";
import _ from "lodash";
import TourStatusIcon from "../common/TourStatusIcon";
// import { CardReminderContainer } from "./CardReminderContainer";
import { useUser } from "reactfire";
import TourAddEditModal from "./TourAddEditModal";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

function TourDetailsPage({ tours, loadDataFromFirebase, ...props }) {
  const dispatch = useDispatch();
  const [tour, setTour] = useState({ ...props.tour });
  const windowWidth = useContext(WindowWidthContext);
  const agents = useSelector((state) => _.sortBy(state.agents));
  const loading = useSelector(
    (state) => state.apiCallsInProgress > 0 || state.data.length === 0
  );
  const { status, data: user } = useUser();

  const [tourDetailsBannerImg, setImg] = useState(
    TOUR_DETAILS_IMAGES[Math.floor(Math.random() * TOUR_DETAILS_IMAGES.length)]
  );

  useEffect(() => {
    if (tours.length === 0 && status === "success") {
      loadDataFromFirebase(user?.uid);
    } else {
      // Need to understand this logic..
      setTour({ ...props.tour });
    }

    if (agents.length === 0 && status !== "loading") {
      dispatch(loadAgentsFromFirebase(user.uid));
    }
  }, [props.tour, user]);

  const copyFileNameToClipboard = () => {
    navigator.clipboard
      .writeText(tour.fileName)
      .then(() => toast.info("File Name copied to clipboard"))
      .catch((err) => toast.error("Error copying file name"));
  };

  const randomImg =
    TOUR_DETAILS_IMAGES[Math.floor(Math.random() * TOUR_DETAILS_IMAGES.length)];

  return loading ? (
    <Spinner />
  ) : (
    <div className="cardDetailsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Tour Details</h2>
        <div className="editDeleteCard">
          <TourAddEditModal data={tour} />
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
            backgroundColor: setColorForTourStatus("tourCard", tour.status),
            marginRight: windowWidth > 800 ? "15px" : null,
            marginBottom: windowWidth > 800 ? null : "15px",
            boxShadow:
              tour.status === "OP"
                ? "2px 0 10px gray"
                : `2px 0 15px ${setColorForTourStatus(
                    "tourCard",
                    tour.status
                  )}`,
          }}
        >
          <Card.Img
            variant="top"
            src={tourDetailsBannerImg}
            style={{
              height: "8rem",
              objectFit: "cover",
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
            <Table className={setColorForTourStatus("tourTable", tour.status)}>
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
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="cardDetailsFieldHeaders"
                  >
                    File Name:
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ margin: 0 }}>{tour.fileName}</p>
                      <MdOutlineContentCopy
                        style={{
                          fontSize: "2.4rem",
                          backgroundColor: APP_COLOR_BLACK_OPACITY,
                          padding: "5px",
                          borderRadius: "8px",
                          color: "gray",
                          cursor: "pointer",
                          margin: "5px",
                        }}
                        title="Copy File Name to clipboard"
                        onClick={() => copyFileNameToClipboard()}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <div id="cardDetailsSectionRight">
          <TourNotes
            tourId={tour.id}
            tourNotes={sortNotesByDate(_.values(tour.tourNotes))}
          />
          {/* <CardReminderContainer card={tour} /> */}
        </div>
      </div>
    </div>
  );
}

TourDetailsPage.propTypes = {
  tour: PropTypes.object.isRequired,
  tours: PropTypes.array.isRequired,
  loadDataFromFirebase: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export function getTourById(tours, id) {
  return tours.find((tour) => tour.id.toString() === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const tour =
    id && state.data.length > 0 ? getTourById(state.data, id) : NEW_DATA;

  return {
    tour: tour,
    tours: state.data,
  };
}

const mapDispatchToProps = {
  loadDataFromFirebase,
  saveDataToFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(TourDetailsPage);
