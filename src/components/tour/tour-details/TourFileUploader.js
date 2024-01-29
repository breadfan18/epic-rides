import React from "react";
import { MdFileUpload } from "react-icons/md";
import { DELETE_COLOR_RED } from "../../../constants/constants";
import { getStorageFileUrl } from "../../../tools/firebase";
import { useDispatch } from "react-redux";
import { saveDataToFirebase } from "../../../redux/actions/dataActions";
import { toast } from "react-toastify";

const TourFileUploader = ({ tour }) => {
  const dispatch = useDispatch();

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    console.log(selectedFile);

    if (!selectedFile) {
      return;
    }

    try {
      const downloadURL = await getStorageFileUrl(
        "tour-files",
        tour.fileName,
        selectedFile
      );
      if (downloadURL) {
        try {
          dispatch(
            saveDataToFirebase({ ...tour, fileLocation: downloadURL }, tour.id)
          );
          toast.success("File Uploaded");
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
      <label htmlFor="fileInput" className="fileInputLabel">
        <MdFileUpload size={20} color={DELETE_COLOR_RED} />
        <small style={{ fontSize: "10px" }}>Upload</small>
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default TourFileUploader;
