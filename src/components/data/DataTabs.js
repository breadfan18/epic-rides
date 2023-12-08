import React, { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PropTypes from "prop-types";
import DataListTable from "./DataListTable";
import { useSelector } from "react-redux";
import CardListCards from "./CardListCards";
import { WindowWidthContext } from "../App";
import { useFilteredData } from "../../hooks/filterCards";
import _ from "lodash";
import { YEARS } from "../../constants";

function DataTabs({ data }) {
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
    const dataForYear = data.filter(
      (d) => year === d.fileOpenDate.split("-")[0]
    );
    return (
      <Tab eventKey={year} title={year} key={year}>
        {windowWidth > 1000 ? (
          <DataListTable
            cards={dataForYear}
            showEditDelete={true}
            showUser={false}
            showCompactTable={false}
          />
        ) : (
          <CardListCards cards={data} showUserName={false} />
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
            <DataListTable
              cards={data}
              showEditDelete={true}
              showUser={true}
              showCompactTable={false}
            />
          ) : (
            <CardListCards
              cards={data}
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

DataTabs.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default DataTabs;
