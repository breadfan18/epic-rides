import React from "react";
import { MdFileUpload } from "react-icons/md";
import { DELETE_COLOR_RED } from "../../../constants/constants";
import { getStorageFileUrl } from "../../../tools/firebase";
import { useDispatch } from "react-redux";
import { saveDataToFirebase } from "../../../redux/actions/dataActions";
import { toast } from "react-toastify";
import { getFileNameExtension } from "../../../helpers";

const TourFileUploader = ({ tour, disabled }) => {
  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      return;
    }

    try {
      const downloadURL = await getStorageFileUrl(
        "tour-files",
        tour.fileName + "." + getFileNameExtension(selectedFile.name),
        selectedFile
      );
      if (downloadURL) {
        try {
          dispatch(
            saveDataToFirebase({ ...tour, fileLocation: downloadURL }, tour.id)
          );
          toast.info("File Uploaded");
        } catch (error) {
          toast.error("Error saving tour.");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      toast.error("Error uploading file. Please try again.");
    }
  };

  return (
    <div>
      <label
        htmlFor="fileInput"
        className="fileInputLabel"
        style={{ cursor: disabled ? "default" : "pointer" }}
      >
        <MdFileUpload size={20} color={disabled ? "gray" : DELETE_COLOR_RED} />
        <small style={{ fontSize: "10px", color: disabled ? "gray" : "black" }}>
          Upload
        </small>
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
        disabled={disabled}
      />
    </div>
  );
};

export default TourFileUploader;
