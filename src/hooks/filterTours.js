import { useState } from "react";

export const useFilteredData = (toursData) => {
  const [toursFilter, setToursFilter] = useState({
    query: "",
    tourList: [],
  });

  const filterTours = (query) => {
    return toursData.filter((tour) =>
      tour.tourName.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleToursFilter = (e) => {
    const filteredTours =
      e.target.value === "" ? toursData : filterTours(e.target.value);
    setToursFilter({
      query: e.target.value,
      tourList: filteredTours,
    });
  };

  return {
    toursFilter,
    setToursFilter,
    handleToursFilter,
    filterTours,
  };
};
