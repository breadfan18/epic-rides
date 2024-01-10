import { useState, useMemo } from "react";

const useTourFilter = (initialData) => {
  const data = [...initialData];
  const [filters, setFilters] = useState({
    tourName: "",
    agent: "",
    status: "",
    groupName: "",
  });

  const applyFilters = (tour) => {
    return Object.entries(filters).every(([property, value]) => {
      const itemValue =
        property === "agent"
          ? tour.agent.name
          : property === "status"
          ? tour.status
          : property === "groupName"
          ? tour.groupFitName
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
      groupName: "",
    });
  };

  return {
    filteredData,
    filters,
    setTourNameFilter: (value) => setFilter("tourName", value),
    setAgentFilter: (value) => setFilter("agent", value),
    setStatusFilter: (value) => setFilter("status", value),
    setGroupNameFilter: (value) => setFilter("groupName", value),
    resetFilters,
  };
};

export default useTourFilter;
