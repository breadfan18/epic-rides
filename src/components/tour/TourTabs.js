import React, { useContext, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import TourTable from "./TourTable";
import TourCards from "./TourCards";
import { WindowWidthContext } from "../App";
import _ from "lodash";
import { getYearsFromTours, sortNumbers } from "../../helpers";
import { Button } from "react-bootstrap";
import Filters from "./filters/Filters";
import useTourFilter from "../../hooks/filterTours";

function TourTabs({ tours }) {
  const windowWidth = useContext(WindowWidthContext);
  const yearsWithTours = sortNumbers(getYearsFromTours(tours));
  const activeTab = yearsWithTours.includes(new Date().getFullYear().toString())
    ? new Date().getFullYear().toString()
    : yearsWithTours[0];
  const [selectedTab, setSelectedTab] = useState(activeTab);
  const handleSelectTab = (tabKey) => setSelectedTab(tabKey.toString());
  const [showFilter, setShowFilter] = useState(false);

  const {
    filters,
    filteredData,
    setTourNameFilter,
    setAgentFilter,
    resetFilters,
    setStatusFilter,
    setGroupNameFilter,
  } = useTourFilter(tours);

  const toursForSelectedYear =
    selectedTab === "all-tours"
      ? filteredData
      : selectedTab === "UNDATED"
      ? filteredData.filter((tour) => !tour.dateFrom)
      : filteredData.filter(
          (tour) => tour.dateFrom.split("-")[0] === selectedTab
        );

  const yearlyTabs = [...yearsWithTours, "UNDATED"].map((year) => {
    return (
      <Tab eventKey={year} title={year} key={year}>
        {windowWidth > 1000 ? (
          <TourTable data={toursForSelectedYear} />
        ) : (
          <TourCards data={toursForSelectedYear} />
        )}
      </Tab>
    );
  });

  return (
    <>
      {showFilter && (
        <Filters
          filters={filters}
          setTourNameFilter={setTourNameFilter}
          setAgentFilter={setAgentFilter}
          setStatusFilter={setStatusFilter}
          setGroupNameFilter={setGroupNameFilter}
          resetFilters={resetFilters}
        />
      )}
      <Button
        className="filterButton"
        onClick={() => setShowFilter(!showFilter)}
        style={{ minWidth: "10rem" }}
      >
        {showFilter ? "Hide Filters" : "Show Filters"}
      </Button>
      <Tabs
        defaultActiveKey={activeTab}
        className="mb-3"
        onSelect={handleSelectTab}
      >
        <Tab eventKey="all-tours" title="All Tours">
          {windowWidth > 1000 ? (
            <TourTable data={toursForSelectedYear} />
          ) : (
            <TourCards data={toursForSelectedYear} />
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
