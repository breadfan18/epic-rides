import { useState } from "react";

export const useFilteredData = (data) => {
  const [dataFilter, setDataFilter] = useState({
    query: "",
    tourList: [],
  });

  const filterData = (query, dataType) => {
    return data.filter((tour) => {
      return dataType === "agent"
        ? tour.agent.name.toLowerCase().includes(query.toLowerCase())
        : tour[dataType].toLowerCase().includes(query.toLowerCase());
    });
  };

  const handleDataFilter = (e, dataType) => {
    const filteredTours =
      e.target.value === "" ? data : filterData(e.target.value, dataType);
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
