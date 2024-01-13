import React, { useState } from "react";
import TourCards from "./TourCards";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import _ from "lodash";
import { getYearsFromTours, sortNumbers } from "../../helpers";
import { Button } from "react-bootstrap";
import useTourFilter from "../../hooks/filterTours";
import Filters from "./filters/Filters";

function ToursByDropDown({ tours }) {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
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

  const yearsWithTours = sortNumbers(getYearsFromTours(tours));

  const showAllData =
    selectedYear === undefined || selectedYear === "all-tours";

  const toursForSelectedYear = showAllData
    ? filteredData
    : filteredData.filter((d) =>
        d.dateFrom === ""
          ? selectedYear === "UNDATED"
          : selectedYear === d.dateFrom.split("-")[0]
      );

  const handleYearChange = (event) =>
    setSelectedYear(event.target.value || "all-tours");

  return (
    <div className="cardsDropDownContainer">
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
      <div id="cardFilterContainer">
        <Form.Select
          id="cardFilterUserSelect"
          onChange={handleYearChange}
          value={selectedYear}
        >
          <option value="">All Tours</option>
          {[...yearsWithTours, "UNDATED"].map((year) => {
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </Form.Select>
        <Button
          className="filterButtonSmallScreen"
          onClick={() => setShowFilter(!showFilter)}
          style={{ minWidth: "10rem" }}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      <hr />
      <TourCards
        data={toursForSelectedYear}
        showUserName={showAllData}
        showFilter={showFilter}
      />
    </div>
  );
}

ToursByDropDown.propTypes = {
  tours: PropTypes.array.isRequired,
  cardholders: PropTypes.array.isRequired,
};

export default ToursByDropDown;
