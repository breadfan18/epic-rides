import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAgentsFromFirebase } from "../../redux/actions/agentActions";
import { loadDataFromFirebase } from "../../redux/actions/dataActions";
import { useUser } from "reactfire";
import AgentsList from "./AgentsList";
import { Spinner } from "../common/Spinner";
import _ from "lodash";
import { WindowWidthContext } from "../App";
// import CardholderCards from "./CardholderCards";
import AgentAddEditModal from "./AgentAddEditModal";

const AgentsPage = () => {
  const windowWidth = useContext(WindowWidthContext);
  const dispatch = useDispatch();
  const { status, data: user } = useUser();
  const agents = useSelector((state) => _.sortBy(state.agents));
  const loading = useSelector((state) => state.apiCallsInProgress > 0);
  const tours = useSelector((state) => state.data);
  // const loyaltyData = useSelector((state) => state.loyaltyData);

  useEffect(() => {
    if (agents.length === 0 && status !== "loading") {
      dispatch(loadAgentsFromFirebase(user.uid));
    }
    if (tours.length === 0 && status !== "loading" && user !== null) {
      dispatch(loadDataFromFirebase(user.uid));
    }
  }, [user]);

  const toursByAgent = _.groupBy(tours, (o) => o.agent.code);

  console.log({ toursByAgent });

  const agentsFinal = agents.map((agent) => {
    return {
      ...agent,
      hasTours: toursByAgent.hasOwnProperty(agent.code),
    };
  });

  console.log({ agentsFinal });

  return (
    <div className="cardHoldersContainer">
      <section className="sectionHeaders">
        <h2 style={{ marginBottom: 0 }}>Agents</h2>
        <AgentAddEditModal />
      </section>
      <p
        style={{
          border: "1px solid gray",
          padding: "10px",
          borderRadius: "10px",
          color: "gray",
        }}
      >
        NOTE - Agents with existing tours cannot be deleted.
      </p>
      {loading ? (
        <Spinner />
      ) : windowWidth > 700 ? (
        <AgentsList agents={agentsFinal} toursByAgent={toursByAgent} />
      ) : (
        <div>TEST</div>
        // <CardholderCards
        //   cardholders={agents}
        //   // cardsByHolder={cardsByHolder}
        //   // loyaltyByHolder={loyaltyByHolder}
        //   // inquiriesByHolder={inquiriesByHolder}
        // />
      )}
    </div>
  );
};

export default AgentsPage;
