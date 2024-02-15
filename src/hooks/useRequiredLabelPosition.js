import { useState, useContext, useEffect } from "react";
import { WindowWidthContext } from "../components/App";

export function useRequiredLabelPosition(isAgentField) {
  const windowWidth = useContext(WindowWidthContext);
  const [absoluteLeft, setAbsoluteLeft] = useState();

  useEffect(() => {
    if (!isAgentField) {
      setAbsoluteLeft(
        windowWidth > 991
          ? "690px"
          : windowWidth <= 991 && windowWidth > 500
          ? "384px"
          : windowWidth - 120
      );
    } else {
      setAbsoluteLeft(windowWidth > 505 ? "395px" : windowWidth - 120);
    }
  }, [windowWidth, isAgentField]);

  return absoluteLeft;
}
