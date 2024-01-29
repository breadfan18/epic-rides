import React from "react";
import { MdOutlineContentCopy } from "react-icons/md";

export default function TourFileNameCopier({ copyFileNameFunc }) {
  return (
    <label className="fileInputLabel" onClick={() => copyFileNameFunc()}>
      <MdOutlineContentCopy
        size={20}
        style={{ color: "gray" }}
        title="Copy File Name to clipboard"
      />{" "}
      <small style={{ fontSize: "10px" }}>Copy</small>
    </label>
  );
}
