import React, { useEffect, useState } from "react";
import TourCards from "./TourCards";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { useFilteredData } from "../../hooks/filterCards";
import { useSelector } from "react-redux";
import _ from "lodash";
import { YEARS } from "../../constants";

function ToursByDropDown({ tours }) {
  // const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear() || "all-tours"
  );
  // const cardholders = useSelector((state) =>
  //   _.sortBy(state.cardholders, (o) => o.isPrimary)
  // );

  console.log(tours);

  const showAllData =
    selectedYear === undefined || selectedYear === "all-tours";

  const cardsForSelectedYear = showAllData
    ? tours
    : tours.filter((d) =>
        d.dateFrom === ""
          ? selectedYear === "UNDATED"
          : selectedYear === d.dateFrom.split("-")[0]
      );

  console.log({ cardsForSelectedYear });

  // const { cardsFilter, setCardsFilter, handleCardsFilter, filterCards } =
  //   useFilteredData(cardsForSelectedYear);

  // useEffect(() => {
  //   localStorage.setItem("selectedUser", JSON.stringify(selectedYear));

  //   if (cardsFilter.query !== "") {
  //     const filteredCards = filterCards(cardsFilter.query);
  //     setCardsFilter({
  //       query: cardsFilter.query,
  //       cardList: filteredCards,
  //     });
  //   } else {
  //     setCardsFilter({
  //       query: "",
  //       cardList: [...cardsForSelectedYear],
  //     });
  //   }
  // }, [selectedYear, tours]);

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
          {YEARS.map((year) => {
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
