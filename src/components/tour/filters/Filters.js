import { Button } from "react-bootstrap";

function Filters({
  filters,
  setTourNameFilter,
  setAgentFilter,
  setStatusFilter,
  setGroupNameFilter,
  resetFilters,
}) {
  return (
    <div className="filtersContainer">
      <input
        type="text"
        value={filters.agent || ""}
        placeholder="Filter by agent name"
        onChange={(e) => setAgentFilter(e.target.value)}
        className="inputFilters"
      />
      <input
        type="text"
        value={filters?.tourName || ""}
        placeholder="Filter by tour name"
        onChange={(e) => setTourNameFilter(e.target.value)}
        className="inputFilters"
      />
      <input
        type="text"
        value={filters?.groupName || ""}
        placeholder="Filter by group name"
        onChange={(e) => setGroupNameFilter(e.target.value)}
        className="inputFilters"
      />
      <div className="statusFilters">
        <label>
          <input
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("")}
            // checked={filters.status === ""}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("OP")}
            checked={filters.status === "OP"}
          />
          Open
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("CA")}
            checked={filters.status === "CA"}
          />
          Cancelled
        </label>
        <label>
          <input
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("HK")}
            checked={filters.status === "HK"}
          />
          Confirmed
        </label>
      </div>

      <Button onClick={resetFilters} style={{ backgroundColor: "black" }}>
        Reset
      </Button>
    </div>
  );
}

export default Filters;
