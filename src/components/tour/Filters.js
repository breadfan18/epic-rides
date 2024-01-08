import { useState } from "react";
import { ERN_DATA_KEYS } from "../../constants/constants";

function Filters({ dataFilter, handleDataFilter }) {
  return (
    <>
      <input
        type="search"
        value={dataFilter.query}
        onChange={(e) => handleDataFilter(e, ERN_DATA_KEYS.tourName)}
        placeholder="Filter by tour name.."
        className="tourTabsFilterInput"
        // style={{ width: filterWidth }}
      />
      {/* <input type="text" />
      <input type="text" /> */}
    </>
  );
}

export default Filters;
