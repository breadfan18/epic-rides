import React from "react";
import {
  APP_COLOR_EPIC_RED,
  CARDHOLDER_STOCK_IMG,
} from "../../constants/constants";

export default function AgentImg({ img, heightAndWidth, imgOnCard }) {
  const baseStyles = {
    height: heightAndWidth,
    width: heightAndWidth,
    borderRadius: "50%",
    boxShadow: "0 0 15px " + APP_COLOR_EPIC_RED,
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
        src={img || CARDHOLDER_STOCK_IMG}
        onError={(e) => (e.target.src = CARDHOLDER_STOCK_IMG)}
        alt="AA"
        style={{ ...finalStyles }}
        className={imgOnCard && "cardholderCardImg"}
      />
    </>
  );
}
