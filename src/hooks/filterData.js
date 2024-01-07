import { useState } from "react";

export const useFilteredData = (data, dataType) => {
  const [dataFilter, setDataFilter] = useState({
    query: "",
    tourList: [],
  });

  const filterData = (query) => {
    return data.filter((tour) => {
      return dataType === "agent"
        ? tour.agent.name.toLowerCase().includes(query.toLowerCase())
        : tour[dataType].toLowerCase().includes(query.toLowerCase());
    });
  };

  const handleDataFilter = (e) => {
    const filteredTours =
      e.target.value === "" ? data : filterData(e.target.value);
    setDataFilter({
      query: e.target.value,
      tourList: filteredTours,
    });
  };

  return {
    dataFilter,
    setDataFilter,
    handleDataFilter,
    filterData,
  };
};
