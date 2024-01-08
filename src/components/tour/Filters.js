import { useState } from "react";
import { ERN_DATA_KEYS } from "../../constants/constants";

function Filters({ dataFilter, handleDataFilter, dataType }) {
  return (
    <>
      <input
        type="search"
        value={dataFilter.query}
        onChange={(e) => handleDataFilter(e, dataType)}
        placeholder={`Filter by ${dataType}`}
        className="tourTabsFilterInput"
        // style={{ width: filterWidth }}
      />
      {/* <input type="text" />
      <input type="text" /> */}
    </>
  );
}

export default Filters;
