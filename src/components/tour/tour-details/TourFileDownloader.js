import React from "react";
import { MdFileDownload } from "react-icons/md";
import { EDIT_COLOR_GREEN } from "../../../constants/constants";

export default function TourFileDownloader({ tour, disabled }) {
  return (
    <div>
      <a
        href={tour.fileLocation}
        style={{ textDecoration: "none" }}
        className={disabled ? "downloadAnchor" : null}
      >
        <label
          className="fileInputLabel"
          style={{ cursor: disabled ? null : "pointer" }}
        >
          <MdFileDownload
            size={20}
            color={disabled ? "gray" : EDIT_COLOR_GREEN}
          />
          <small
            style={{ fontSize: "10px", color: disabled ? "gray" : "black" }}
          >
            Download
          </small>
        </label>
      </a>
    </div>
  );
}
