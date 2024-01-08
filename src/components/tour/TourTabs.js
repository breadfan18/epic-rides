import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import TourTable from "./TourTable";
import TourCards from "./TourCards";
import { WindowWidthContext } from "../App";
import _ from "lodash";
import { getYearsFromTours, sortNumbers } from "../../helpers";
import { useFilteredData } from "../../hooks/filterData";
import { ERN_DATA_KEYS } from "../../constants/constants";

/* 
- Make sure filter works in small screen (ToursByDropDown)
- Working on creating separate input fields for separate filters
*/

function TourTabs({ tours }) {
  const windowWidth = useContext(WindowWidthContext);
  const yearsWithTours = sortNumbers(getYearsFromTours(tours));
  const activeTab = yearsWithTours.includes(new Date().getFullYear().toString())
    ? new Date().getFullYear().toString()
    : yearsWithTours[0];
  const [selectedTab, setSelectedTab] = useState(activeTab);
  const handleSelectTab = (tabKey) => setSelectedTab(tabKey.toString());

  const toursForSelectedYear =
    selectedTab === "all-tours"
      ? tours
      : selectedTab === "UNDATED"
      ? tours.filter((tour) => !tour.dateFrom)
      : tours.filter((tour) => tour.dateFrom.split("-")[0] === selectedTab);

  const { filterData, handleDataFilter, setDataFilter, dataFilter } =
    useFilteredData(toursForSelectedYear, ERN_DATA_KEYS.tourName);

  useEffect(() => {
    if (dataFilter.query !== "") {
      const filteredTours = filterData(
        dataFilter.query,
        ERN_DATA_KEYS.tourName
      );
      setDataFilter({
        query: dataFilter.query,
        tourList: filteredTours,
      });
    } else {
      setDataFilter({
        query: "",
        tourList: [...toursForSelectedYear],
      });
    }
  }, [tours, selectedTab]);

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
            data={dataFilter.tourList}
            showEditDelete={true}
            showUser={false}
            showCompactTable={false}
          />
        ) : (
          <TourCards data={dataFilter.tourList} showUserName={false} />
        )}
      </Tab>
    );
  });

  return (
    <>
      <input
        type="search"
        value={dataFilter.query}
        onChange={(e) => handleDataFilter(e, ERN_DATA_KEYS.tourName)}
        placeholder="Filter by tour name.."
        className="tourTabsFilterInput"
        style={{ width: filterWidth }}
      />
      <Tabs
        defaultActiveKey={activeTab}
        className="mb-3"
        onSelect={handleSelectTab}
      >
        <Tab eventKey="all-tours" title="All Tours">
          {windowWidth > 1000 ? (
            <TourTable
              data={dataFilter.tourList}
              showEditDelete={true}
              showUser={true}
              showCompactTable={false}
            />
          ) : (
            <TourCards
              data={dataFilter.tourList}
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
