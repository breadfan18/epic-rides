import React from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { APP_COLOR_EPIC_RED } from "../../../constants/constants";

export default function TourFileNameCopier({ copyFileNameFunc }) {
  return (
    <label className="fileInputLabel" onClick={() => copyFileNameFunc()}>
      <MdOutlineContentCopy
        size={20}
        style={{ color: APP_COLOR_EPIC_RED }}
        title="Copy File Name to clipboard"
      />{" "}
      <small style={{ fontSize: "10px" }}>Copy</small>
    </label>
  );
}
