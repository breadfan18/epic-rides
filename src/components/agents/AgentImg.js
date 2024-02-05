import React from "react";
import {
  AGENT_STOCK_IMG,
  APP_COLOR_EPIC_RED,
  USER_STOCK_IMG,
} from "../../constants/constants";

export default function AgentImg({
  img,
  heightAndWidth,
  imgOnCard,
  showShadow,
  isOnAgentPage,
}) {
  const baseStyles = {
    height: heightAndWidth,
    width: heightAndWidth,
    borderRadius: "50%",
    boxShadow: showShadow && "0 0 15px " + APP_COLOR_EPIC_RED,
    objectFit: "cover",
    border: !isOnAgentPage && "1px solid gray",
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
        onError={(e) => (e.target.src = AGENT_STOCK_IMG)}
        alt="AA"
        style={{ ...finalStyles }}
        className={imgOnCard && "cardholderCardImg"}
        title="swaroop"
      />
    </>
  );
}
