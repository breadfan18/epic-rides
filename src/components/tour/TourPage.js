import React, { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDataFromFirebase } from "../../redux/actions/dataActions";
import { loadAgentsFromFirebase } from "../../redux/actions/agentActions";
import { Spinner } from "../common/Spinner";
import TourTabs from "./TourTabs";
import ToursByDropDown from "./ToursByDropDown";
import TourAddEditModal from "./TourAddEditModal";
import { WindowWidthContext } from "../App";
import { useUser } from "reactfire";
export const AgentsDataContext = createContext();
/* 
TO DO:
- Update the data models and the data table to properly display data in the respective year tabs

*/

const TourPage = () => {
  const windowWidth = useContext(WindowWidthContext);

  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const tours = useSelector((state) => state.data);
  const agents = useSelector((state) => state.agents);
  const loading = useSelector((state) => state.apiCallsInProgress > 0);

  useEffect(() => {
    if (tours.length === 0 && status !== "loading" && user !== null) {
      console.log(user.uid);
      dispatch(loadDataFromFirebase(user.uid));
    }

    if (agents.length === 0 && user) {
      dispatch(loadAgentsFromFirebase(user.uid));
    }
  }, [status, user]);

  return (
    <div className="cardsContainer">
      <AgentsDataContext.Provider value={agents}>
        <section className="sectionHeaders">
          <h2 style={{ marginBottom: 0 }}>Tours</h2>
          <TourAddEditModal />
        </section>

        {loading ? (
          <Spinner />
        ) : windowWidth < 650 ? (
          <ToursByDropDown tours={tours} />
        ) : (
          <TourTabs data={tours} />
        )}
      </AgentsDataContext.Provider>
    </div>
  );
};

export default TourPage;
