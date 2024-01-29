import React, { useContext, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  loadDataFromFirebase,
  saveDataToFirebase,
} from "../../../redux/actions/dataActions";
import { loadAgentsFromFirebase } from "../../../redux/actions/agentActions";
import PropTypes from "prop-types";
import { Spinner } from "../../common/Spinner";
import {
  NEW_DATA,
  APP_COLOR_EPIC_RED,
  STATUS_CODES,
  TOUR_DETAILS_IMAGES,
} from "../../../constants/constants";
import { Card, Table } from "react-bootstrap";
import {
  formatDate,
  setColorForTourStatus,
  sortNotesByDate,
} from "../../../helpers";
import TourNotes from "../TourNotes";
import { WindowWidthContext } from "../../App";
import _ from "lodash";
import TourStatusIcon from "../../common/TourStatusIcon";
import { useUser } from "reactfire";
import TourAddEditModal from "../TourAddEditModal";
import { toast } from "react-toastify";
import CreatedOrEditedBy from "../CreatedOrEditedBy";
import TourDetailsConfirmCancel from "./TourDetailsConfirmCancel";
import TourFileUploader from "./TourFileUploader";
import TourFileDownloader from "./TourFileDownloader";
import TourFileNameCopier from "./TourFileNameCopier";

/* 

- Disable download button when file is not there - DONE
- Fix the issue with the file name extension on download.. 

*/

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

  return loading ? (
    <Spinner />
  ) : (
    <div className="tourDetailsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Tour Details</h2>
        <div className="editDeleteCard">
          <TourAddEditModal data={tour} />
        </div>
      </section>
      <div className="tourDetailsBody">
        <Card
          style={{
            alignSelf: "flex-start",
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
                    className="tourDetailsFieldHeaders"
                  >
                    File Opened:
                  </td>
                  <td>{formatDate(props.tour.fileOpenDate)}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="tourDetailsFieldHeaders"
                  >
                    Group Name:
                  </td>
                  <td>{tour.groupFitName}</td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="tourDetailsFieldHeaders"
                  >
                    Passengers:
                  </td>
                  <td>
                    {tour.paxNum === "N/A" ? "Not Confirmed" : tour.paxNum}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="tourDetailsFieldHeaders"
                  >
                    Date From:
                  </td>
                  <td>
                    {props.tour.dateFrom !== ""
                      ? formatDate(props.tour.dateFrom)
                      : "Not Confirmed"}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="tourDetailsFieldHeaders"
                  >
                    Date To:
                  </td>
                  <td>
                    {props.tour.dateTo !== ""
                      ? formatDate(props.tour.dateTo)
                      : "Not Confirmed"}
                  </td>
                </tr>
                {tour.numOfDays !== "" && (
                  <tr>
                    <td
                      style={{ color: APP_COLOR_EPIC_RED }}
                      className="tourDetailsFieldHeaders"
                    >
                      Number of Days:
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <p style={{ margin: 0 }}>{tour.numOfDays}</p>
                      </div>
                    </td>
                  </tr>
                )}
                <tr>
                  <td
                    style={{ color: APP_COLOR_EPIC_RED }}
                    className="tourDetailsFieldHeaders"
                  >
                    Status:
                  </td>
                  <td>
                    {STATUS_CODES.find(
                      (status) => status.code === props.tour.status
                    ).name || ""}
                  </td>
                </tr>
                {tour.dateFrom !== "" && (
                  <tr>
                    <td
                      style={{ color: APP_COLOR_EPIC_RED }}
                      className="tourDetailsFieldHeaders"
                    >
                      File Name:
                    </td>
                    <td>
                      <p style={{ margin: 0 }}>{tour.fileName}</p>
                      <hr style={{ margin: "5px" }} />
                      <div id="fileNameOptions">
                        <TourFileNameCopier
                          copyFileNameFunc={copyFileNameToClipboard}
                        />
                        <TourFileUploader tour={tour} />
                        <TourFileDownloader
                          tour={tour}
                          disabled={!tour.fileLocation}
                        />
                      </div>
                    </td>
                  </tr>
                )}
                {tour.metadata?.createdBy && (
                  <tr>
                    <td
                      style={{ color: APP_COLOR_EPIC_RED }}
                      className="tourDetailsFieldHeaders"
                    >
                      Created By:
                    </td>
                    <td>
                      <CreatedOrEditedBy
                        tour={tour}
                        user={user}
                        action="created"
                      />
                    </td>
                  </tr>
                )}
                {tour.metadata?.editedBy && (
                  <tr>
                    <td
                      style={{ color: APP_COLOR_EPIC_RED }}
                      className="tourDetailsFieldHeaders"
                    >
                      Last Edited By:
                    </td>
                    <td>
                      <CreatedOrEditedBy
                        tour={tour}
                        user={user}
                        action="edited"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <div id="tourDetailsSectionRight">
          <TourNotes
            tourId={tour.id}
            tourNotes={sortNotesByDate(_.values(tour.tourNotes))}
          />
          <TourDetailsConfirmCancel tour={props.tour} />
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
