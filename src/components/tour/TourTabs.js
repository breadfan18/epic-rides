import React, { useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import TourTable from "./TourTable";
import TourCards from "./TourCards";
import { WindowWidthContext } from "../App";
import _ from "lodash";
import { YEARS } from "../../constants";

function TourTabs({ data }) {
  const windowWidth = useContext(WindowWidthContext);

  const filterWidth =
    windowWidth >= 750
      ? "32vw"
      : windowWidth < 750 && windowWidth >= 727
      ? "30vw"
      : windowWidth < 727 && windowWidth >= 680
      ? "25vw"
      : windowWidth < 680 && windowWidth >= 661
      ? "23vw"
      : "21vw";

  const yearlyTabs = YEARS.map((year) => {
    // const dataForYear = data.filter((d) => year === d.dateFrom.split("-")[0]);
    const dataForYear = data.filter((d) =>
      d.dateFrom === "" ? year === "UNDATED" : year === d.dateFrom.split("-")[0]
    );
    return (
      <Tab eventKey={year} title={year} key={year}>
        {windowWidth > 1000 ? (
          <TourTable
            data={dataForYear}
            showEditDelete={true}
            showUser={false}
            showCompactTable={false}
          />
        ) : (
          <TourCards data={dataForYear} showUserName={false} />
        )}
      </Tab>
    );
  });

  return (
    <>
      {/* <input
        type="search"
        value={cardsFilter.query}
        onChange={handleCardsFilter}
        placeholder="Filter by card name.."
        className="cardTabsFilterInput"
        style={{ width: filterWidth }}
      /> */}
      <Tabs
        defaultActiveKey={new Date().getFullYear()}
        className="mb-3"
        // onSelect={handleSelectTab}
      >
        <Tab eventKey="all-data" title="All Data">
          {windowWidth > 1000 ? (
            <TourTable
              data={data}
              showEditDelete={true}
              showUser={true}
              showCompactTable={false}
            />
          ) : (
            <TourCards
              data={data}
              windowWidth={windowWidth}
              showUserName={true}
            />
          )}
        </Tab>
        {yearlyTabs}
      </Tabs>
    </>
  );
}

TourTabs.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default TourTabs;
