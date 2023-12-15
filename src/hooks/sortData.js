import { useMemo, useState } from "react";
import { ERN_DATA_KEYS, PROGRAMS } from "../constants/constants";

export const useSortableData = (data) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const sortedData = useMemo(() => {
    let dataCopy = [...data];
    if (sortConfig.key !== null) {
      dataCopy.sort((a, b) => {
        const a_value = a[sortConfig.key];
        const b_value = b[sortConfig.key];

        if (a_value < b_value) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a_value > b_value) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { sortedData, requestSort };
};
