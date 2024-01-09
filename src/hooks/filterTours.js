import { useState, useMemo, useEffect } from "react";

const useTourFilter = (initialData) => {
  const data = [...initialData];
  const [filters, setFilters] = useState({
    tourName: "",
    agent: "",
    status: "",
  });

  const applyFilters = (tour) => {
    return Object.entries(filters).every(([property, value]) => {
      const itemValue =
        property === "agent"
          ? tour.agent.name
          : property === "status"
          ? tour.status
          : tour[property];
      return itemValue.toLowerCase().includes(value.toLowerCase());
    });
  };

  const filteredData = useMemo(
    () => data.filter(applyFilters),
    [data, filters]
  );

  const setFilter = (property, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  const resetFilters = () => {
    setFilters({
      tourName: "",
      agent: "",
      status: "",
    });
  };

  return {
    filteredData,
    setTourNameFilter: (value) => setFilter("tourName", value),
    setAgentFilter: (value) => setFilter("agent", value),
    setStatusFilter: (value) => setFilter("status", value),
    resetFilters,
  };
};

export default useTourFilter;
