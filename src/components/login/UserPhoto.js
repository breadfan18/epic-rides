import React from "react";
import { USER_STOCK_IMG } from "../../constants/constants";
// import { CARDHOLDER_STOCK_IMG } from "../../constants";

export default function UserPhoto({ img, heightAndWidth, imgOnCard }) {
  const baseStyles = {
    height: heightAndWidth,
    width: heightAndWidth,
    borderRadius: "50%",
    // border: "2px solid gray",
    objectFit: "cover",
  };

  const photoOnCardStyles = {
    alignSelf: "center",
    position: "absolute",
    marginTop: "100px",
    marginBottom: "50px",
    padding: "2px",
  };

  const finalStyles = imgOnCard
    ? { ...baseStyles, ...photoOnCardStyles }
    : baseStyles;
  return (
    <>
      <img
        src={img || USER_STOCK_IMG}
        onError={(e) => (e.target.src = USER_STOCK_IMG)}
        alt="AA"
        style={{ ...finalStyles }}
        className={imgOnCard && "cardholderCardImg"}
      />
    </>
  );
}
