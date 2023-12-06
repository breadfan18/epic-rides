import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDataFromFirebase } from "../../redux/actions/dataActions";
import { Spinner } from "../common/Spinner";
import CardTabs from "./CardTabs";
import { sortCardsByDate } from "../../helpers";
import CardsByUserDropDown from "./CardsByUserDropDown";
import CardAddEditModal from "./CardAddEditModal";
import { WindowWidthContext } from "../App";
import { useUser } from "reactfire";

const DataPage = () => {
  const windowWidth = useContext(WindowWidthContext);
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const cards = useSelector((state) => sortCardsByDate(state.data));
  const loading = useSelector((state) => state.apiCallsInProgress > 0);

  useEffect(() => {
    if (cards.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadDataFromFirebase(user.uid));
    }

  }, [status, user]);

  return (
    <div className="cardsContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Wallet</h2>
        <CardAddEditModal />
      </section>
      {loading ? (
        <Spinner />
      ) : windowWidth < 650 ? (
        <CardsByUserDropDown cards={cards} />
      ) : (
        <CardTabs cards={cards} />
      )}
    </div>
  );
};

export default DataPage;
