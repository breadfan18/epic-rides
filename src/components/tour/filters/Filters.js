import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Filters({
  filters,
  setTourNameFilter,
  setAgentFilter,
  setStatusFilter,
  setGroupNameFilter,
  resetFilters,
}) {
  console.log(filters.status);

  return (
    <>
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
          <Form.Check
            label="All"
            type="radio"
            name="status"
            value={filters.status}
            onChange={() => setStatusFilter("")}
            className="radioFilters"
            // checked={filters.status === ""}
          />
          <Form.Check
            label="Open"
            type="radio"
            name="status"
            // value={filters.status}
            onChange={() => setStatusFilter("OP")}
            checked={filters.status === "OP"}
            className="radioFilters"
          />
          <Form.Check
            label="Confirmed"
            type="radio"
            name="status"
            // value={filters.status}
            onChange={() => setStatusFilter("HK")}
            checked={filters.status === "HK"}
            className="radioFilters"
          />
          <Form.Check
            label="Cancelled"
            type="radio"
            name="status"
            // value={filters.status}
            onChange={() => setStatusFilter("CA")}
            checked={filters.status === "CA"}
            className="radioFilters"
          />
        </div>

        <Button
          onClick={resetFilters}
          style={{ backgroundColor: "black", fontSize: "12px" }}
        >
          Reset
        </Button>
      </div>
      <hr />
    </>
  );
}

export default Filters;
