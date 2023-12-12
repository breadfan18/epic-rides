import React, { useContext, useEffect } from "react";
// import CardHolderAddEditModal from "./CardHolderAddEditModal";
import { useDispatch, useSelector } from "react-redux";
import { loadAgentsFromFirebase } from "../../redux/actions/agentActions";
// import { loadCardsFromFirebase } from "../../redux/actions/cardsActions";
// import { loadloyaltyDataFromFirebase } from "../../redux/actions/loyaltyActions";
import { useUser } from "reactfire";
import AgentsList from "./AgentsList";
import { Spinner } from "../common/Spinner";
import _ from "lodash";
import { WindowWidthContext } from "../App";
// import CardholderCards from "./CardholderCards";
import { calculateCurrentInquiries } from "../../helpers";

const AgentsPage = () => {
  const windowWidth = useContext(WindowWidthContext);
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const agents = useSelector((state) => _.sortBy(state.agents));
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  // const cards = useSelector((state) => state.cards);
  // const loyaltyData = useSelector((state) => state.loyaltyData);

  useEffect(() => {
    if (agents.length === 0 && status !== "loading") {
      dispatch(loadAgentsFromFirebase(user.uid));
    }
    // if (cards.length === 0 && status !== "loading" && user !== null) {
    //   dispatch(loadCardsFromFirebase(user.uid));
    // }

    // if (loyaltyData.length === 0 && status !== "loading" && user !== null) {
    //   dispatch(loadloyaltyDataFromFirebase(user.uid));
    // }
  }, [user]);

  // const cardsByHolder = _.groupBy(cards, (o) => o.userId);
  // const loyaltyByHolder = _.groupBy(loyaltyData, (o) => o.userId);
  // const inquiriesByHolder = calculateCurrentInquiries(cardsByHolder);

  // const cardholdersFinal = agents.map((holder) => {
  //   return {
  //     ...holder,
  //     hasCards: cardsByHolder.hasOwnProperty(holder.id),
  //     hasLoyalty: loyaltyByHolder.hasOwnProperty(holder.id),
  //   };
  // });

  return (
    <div>TEST</div>
    // <div className="cardHoldersContainer">
    //   <section className="sectionHeaders">
    //     <h2 style={{ marginBottom: 0 }}>Card Holders</h2>
    //     <CardHolderAddEditModal />
    //   </section>
    //   <p
    //     style={{
    //       border: "1px solid gray",
    //       padding: "10px",
    //       borderRadius: "10px",
    //       color: "gray",
    //     }}
    //   >
    //     NOTE - Card Holders with existing cards or loyalty accounts cannot be
    //     deleted. Please delete all their cards and/or loyalty accounts first.
    //   </p>
    //   {loading ? (
    //     <Spinner />
    //   ) : windowWidth > 950 ? (
    //     <AgentsList
    //       cardholders={agents}
    //       // cardsByHolder={cardsByHolder}
    //       // loyaltyByHolder={loyaltyByHolder}
    //       // inquiriesByHolder={inquiriesByHolder}
    //     />
    //   ) : (
    //     <CardholderCards
    //       cardholders={agents}
    //       // cardsByHolder={cardsByHolder}
    //       // loyaltyByHolder={loyaltyByHolder}
    //       // inquiriesByHolder={inquiriesByHolder}
    //     />
    //   )}
    // </div>
  );
};

export default AgentsPage;
