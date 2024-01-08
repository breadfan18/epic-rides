import React, { useEffect, useState } from "react";
import TourCards from "./TourCards";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { useFilteredData } from "../../hooks/filterData";
import { useSelector } from "react-redux";
import _ from "lodash";
import { getYearsFromTours, sortNumbers } from "../../helpers";

function ToursByDropDown({ tours }) {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const yearsWithTours = sortNumbers(getYearsFromTours(tours));

  const showAllData =
    selectedYear === undefined || selectedYear === "all-tours";

  const toursForSelectedYear = showAllData
    ? tours
    : tours.filter((d) =>
        d.dateFrom === ""
          ? selectedYear === "UNDATED"
          : selectedYear === d.dateFrom.split("-")[0]
      );

  const { filterData, handleDataFilter, setDataFilter, dataFilter } =
    useFilteredData(toursForSelectedYear);

  console.log(dataFilter);
  const handleYearChange = (event) =>
    setSelectedYear(event.target.value || "all-tours");

  useEffect(() => {
    if (dataFilter.query !== "") {
      const filteredTours = filterData(dataFilter.query, "tourName");
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
  }, [tours, selectedYear]);

  return (
    <div className="cardsDropDownContainer">
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
        <input
          type="search"
          value={dataFilter.query}
          onChange={(e) => handleDataFilter(e, "tourName")}
          placeholder="Filter by tour name.."
          id="dataFilterInput"
        />
      </div>
      <hr />
      <TourCards data={dataFilter.tourList} showUserName={showAllData} />
    </div>
  );
}

ToursByDropDown.propTypes = {
  tours: PropTypes.array.isRequired,
  cardholders: PropTypes.array.isRequired,
};

export default ToursByDropDown;
