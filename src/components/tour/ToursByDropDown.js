import React, { useEffect, useState } from "react";
import TourCards from "./TourCards";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { useFilteredData } from "../../hooks/filterData";
import { useSelector } from "react-redux";
import _ from "lodash";
import { getYearsFromTours, sortNumbers } from "../../helpers";

function ToursByDropDown({ tours }) {
  // const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const yearsWithTours = sortNumbers(getYearsFromTours(tours));

  const showAllData =
    selectedYear === undefined || selectedYear === "all-tours";

  const cardsForSelectedYear = showAllData
    ? tours
    : tours.filter((d) =>
        d.dateFrom === ""
          ? selectedYear === "UNDATED"
          : selectedYear === d.dateFrom.split("-")[0]
      );

  const handleUserChange = (event) =>
    setSelectedYear(event.target.value || "all-tours");

  return (
    <div className="cardsDropDownContainer">
      <div id="cardFilterContainer">
        <Form.Select
          id="cardFilterUserSelect"
          onChange={handleUserChange}
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
        <input
          type="search"
          value=""
          // onChange={handleCardsFilter}
          placeholder="Filter by tour name.."
          id="cardFilterInput"
        />
      </div>
      <hr />
      <TourCards data={cardsForSelectedYear} showUserName={showAllData} />
    </div>
  );
}

ToursByDropDown.propTypes = {
  tours: PropTypes.array.isRequired,
  cardholders: PropTypes.array.isRequired,
};

export default ToursByDropDown;
