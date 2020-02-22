import React from "react";
import { transitionTimingFunction, transitionDuration } from "./constants";

interface ShadowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  direction: "to left" | "to right";
  isBold?: boolean;
  isOverDarkBackground?: boolean;
}

export const Shadow = ({
  direction,
  isBold,
  isOverDarkBackground,
  ...props
}: ShadowProps) => {
  let width = isOverDarkBackground ? 6 : 3;
  if (isBold) width = isOverDarkBackground ? 12 : 6;

  const colorStops = `
      rgba(0, 0, 0, 0.2) 0px, 
      rgba(0, 0, 0, 0.2) 1px, 
      rgba(0, 0, 0, 0.1) 1px, 
      rgba(0, 0, 0, 0) 100%
    `;

  return (
    <div
      className="nav-shadow"
      style={{
        background: `linear-gradient(${direction}, ${colorStops})`,
        bottom: 0,
        left: direction === "to left" ? -width : -1,
        opacity: isBold ? 1 : 0.5,
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        transitionDuration,
        transitionProperty: "left, opacity, width",
        transitionTimingFunction,
        width
      }}
      {...props}
    />
  );
};
