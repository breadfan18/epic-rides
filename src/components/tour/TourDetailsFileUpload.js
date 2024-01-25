import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import FileUploader from "../common/FileUploader";

export function TourDetailsFileUpload({ tour }) {

  return (
    <Card className="text-center" style={{ boxShadow: `2px 0 10px gray` }}>
      <Card.Header className="cardHeaders">File Upload</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        <FileUploader tour={tour}/>
      </Card.Body>
      <Card.Footer
        className="text-muted notesFooter"
        style={{ padding: "10px" }}
      ></Card.Footer>
    </Card>
  );
}

TourDetailsFileUpload.propTypes = {
  card: PropTypes.object.isRequired,
};
