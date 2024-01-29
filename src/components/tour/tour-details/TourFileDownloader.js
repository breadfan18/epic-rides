import React from "react";
import { MdFileDownload } from "react-icons/md";
import { EDIT_COLOR_GREEN } from "../../../constants/constants";

export default function TourFileDownloader({ tour }) {
  return (
    <div>
      <a
        href={tour.fileLocation}
        style={{ textDecoration: "none", color: "black" }}
      >
        <label className="fileInputLabel">
          <MdFileDownload size={20} color={EDIT_COLOR_GREEN} />
          <small style={{ fontSize: "10px" }}>Download</small>
        </label>
      </a>
    </div>
  );
}
