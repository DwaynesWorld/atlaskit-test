import React from "react";
import { transitionTimingFunction, transitionDuration } from "./constants";
import styled from "styled-components";

interface ShadowProps extends React.HTMLAttributes<HTMLDivElement> {
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

  const left = direction === "to left" ? -width : -1;
  const background = `linear-gradient(${direction}, ${colorStops})`;

  return (
    <Container
      className="ShadowContainer"
      left={left}
      background={background}
      width={width}
      opacity={isBold ? 1 : 0.5}
      {...props}
    />
  );
};

const colorStops = `
    rgba(0, 0, 0, 0.2) 0px, 
    rgba(0, 0, 0, 0.2) 1px, 
    rgba(0, 0, 0, 0.1) 1px, 
    rgba(0, 0, 0, 0) 100%
  `;

interface ContainerProps {
  left: number;
  width: number;
  background: string;
  opacity: number;
}
const Container = styled.div<ContainerProps>`
  background: ${p => p.background};
  top: 0;
  bottom: 0;
  left: ${p => p.left}px;
  opacity: ${p => p.opacity};
  pointer-events: none;
  position: absolute;
  transition-duration: ${transitionDuration};
  transition-property: left, opacity, width;
  transition-timing-function: ${transitionTimingFunction};
  width: ${p => p.width}px;
`;
