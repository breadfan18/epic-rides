import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import TourTable from "./TourTable";
import TourCards from "./TourCards";
import { WindowWidthContext } from "../App";
import _ from "lodash";
import { getYearsFromTours, sortNumbers } from "../../helpers";
import { useFilteredData } from "../../hooks/filterTours";

function TourTabs({ data }) {
  const windowWidth = useContext(WindowWidthContext);
  const yearsWithTours = sortNumbers(getYearsFromTours(data));
  const activeTab = yearsWithTours.includes(new Date().getFullYear().toString())
    ? new Date().getFullYear().toString()
    : yearsWithTours[0];
  const [selectedTab, setSelectedTab] = useState(activeTab);
  const handleSelectTab = (tabKey) => setSelectedTab(tabKey.toString());

  const toursForSelectedYear =
    selectedTab === "all-data"
      ? data
      : selectedTab === "UNDATED"
      ? data.filter((tour) => !tour.dateFrom)
      : data.filter((tour) => tour.dateFrom.split("-")[0] === selectedTab);

  const { filterTours, handleToursFilter, setToursFilter, toursFilter } =
    useFilteredData(toursForSelectedYear);

  useEffect(() => {
    if (toursFilter.query !== "") {
      const filteredTours = filterTours(toursFilter.query);
      setToursFilter({
        query: toursFilter.query,
        tourList: filteredTours,
      });
    } else {
      setToursFilter({
        query: "",
        tourList: [...toursForSelectedYear],
      });
    }
  }, [data, selectedTab]);

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

  const yearlyTabs = [...yearsWithTours, "UNDATED"].map((year) => {
    return (
      <Tab eventKey={year} title={year} key={year}>
        {windowWidth > 1000 ? (
          <TourTable
            data={toursFilter.tourList}
            showEditDelete={true}
            showUser={false}
            showCompactTable={false}
          />
        ) : (
          <TourCards data={toursFilter.tourList} showUserName={false} />
        )}
      </Tab>
    );
  });

  return (
    <>
      <input
        type="search"
        value={toursFilter.query}
        onChange={handleToursFilter}
        placeholder="Filter by tour name.."
        className="tourTabsFilterInput"
        style={{ width: filterWidth }}
      />
      <Tabs
        defaultActiveKey={activeTab}
        className="mb-3"
        onSelect={handleSelectTab}
      >
        <Tab eventKey="all-data" title="All Tours">
          {windowWidth > 1000 ? (
            <TourTable
              data={toursFilter.tourList}
              showEditDelete={true}
              showUser={true}
              showCompactTable={false}
            />
          ) : (
            <TourCards
              data={toursFilter.tourList}
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
