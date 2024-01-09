import { Button } from "react-bootstrap";
import useTourFilter from "../../../hooks/filterTours";

function Filters({
  setTourNameFilter,
  setAgentFilter,
  setStatusFilter,
  resetFilters,
}) {
  return (
    <div className="filtersContainer">
      <input
        type="text"
        placeholder="Filter by tour name"
        onChange={(e) => setTourNameFilter(e.target.value)}
        className="inputFilters"
      />
      <input
        type="text"
        placeholder="Filter by agent name"
        onChange={(e) => setAgentFilter(e.target.value)}
        className="inputFilters"
      />

      <div className="statusFilters">
        <label>
          <input
            type="radio"
            name="status"
            value=""
            onChange={() => setStatusFilter("")}
            // checked={data.status === ""}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="OP"
            onChange={() => setStatusFilter("OP")}
            // checked={data.status === "OP"}
          />
          Open
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="CA"
            onChange={() => setStatusFilter("CA")}
            // checked={data.status === "CA"}
          />
          Cancelled
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value="HK"
            onChange={() => setStatusFilter("HK")}
            // checked={data.status === "HK"}
          />
          Confirmed
        </label>
      </div>

      <Button onClick={resetFilters}>Reset Filters</Button>
    </div>
  );
}

export default Filters;
