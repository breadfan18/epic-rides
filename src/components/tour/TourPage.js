import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDataFromFirebase } from "../../redux/actions/dataActions";
import { Spinner } from "../common/Spinner";
import TourTabs from "./TourTabs";
import { sortCardsByDate } from "../../helpers";
import ToursByDropDown from "./ToursByDropDown";
import DataAddEditModal from "./DataAddEditModal";
import { WindowWidthContext } from "../App";
import { useUser } from "reactfire";

/* 
TO DO:
- Update the data models and the data table to properly display data in the respective year tabs

*/

const TourPage = () => {
  const windowWidth = useContext(WindowWidthContext);
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const data = useSelector((state) => sortCardsByDate(state.data));
  const loading = useSelector((state) => state.apiCallsInProgress > 0);

  useEffect(() => {
    if (data.length === 0 && status !== "loading" && user !== null) {
      console.log(user.uid);
      dispatch(loadDataFromFirebase(user.uid));
    }
  }, [status, user]);

  return (
    <div className="cardsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Tours</h2>
        <DataAddEditModal />
      </section>
      {loading ? (
        <Spinner />
      ) : windowWidth < 650 ? (
        <ToursByDropDown cards={data} />
      ) : (
        <TourTabs data={data} />
      )}
    </div>
  );
};

export default TourPage;