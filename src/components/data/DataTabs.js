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

function DataTabs({ cards: data }) {
  const windowWidth = useContext(WindowWidthContext);
  // const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  // const [selectedUser, setSelectedUser] = useState(storedUser || "all-cards");
  // const handleSelectTab = (tabKey) => setSelectedUser(tabKey.toString());

  // const cardsForSelectedUser =
  //   selectedUser === "all-cards"
  //     ? data
  //     : data.filter((card) => card.userId === selectedUser);

  // const { cardsFilter, setCardsFilter, handleCardsFilter, filterCards } =
  //   useFilteredData(cardsForSelectedUser);

  // useEffect(() => {
  //   localStorage.setItem("selectedUser", JSON.stringify(selectedUser));

  //   if (cardsFilter.query !== "") {
  //     const filteredCards = filterCards(cardsFilter.query);
  //     setCardsFilter({
  //       query: cardsFilter.query,
  //       cardList: filteredCards,
  //     });
  //   } else {
  //     setCardsFilter({
  //       query: "",
  //       cardList: [...cardsForSelectedUser],
  //     });
  //   }
  // }, [selectedUser, data]);

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

  const yearlyTabs = ['2023', '2024', '2025', '2026'].map((year) => {
    return (
      <Tab eventKey={year} title={year} key={year}>
        {windowWidth > 1000 ? (
          <DataListTable
            cards={data}
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
        defaultActiveKey="all-data"
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
