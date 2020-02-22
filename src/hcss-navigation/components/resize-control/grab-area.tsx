import React from "react";
import styled from "styled-components";
import {
  RESIZE_CONTROL_HANDLE_OFFSET,
  RESIZE_CONTROL_OUTER_WIDTH,
  RESIZE_CONTROL_HANDLE_WIDTH
} from "hcss-navigation/common/constants";

interface InnerGrabAreaProps {
  isBold: boolean;
  showHandle: boolean;
}

interface GrabAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GrabArea = ({
  isBold,
  showHandle,
  ...props
}: GrabAreaProps & InnerGrabAreaProps) => {
  return (
    <OuterGrabArea {...props}>
      <InnerGrabArea isBold={isBold} showHandle={showHandle} />
    </OuterGrabArea>
  );
};

const OuterGrabArea = styled.div`
  cursor: ew-resize;
  position: relative;
  left: -${RESIZE_CONTROL_HANDLE_OFFSET};
  height: 100%;
  width: ${RESIZE_CONTROL_OUTER_WIDTH};
`;

const InnerGrabArea = styled.div<InnerGrabAreaProps>`
  position: absolute;
  left: ${RESIZE_CONTROL_HANDLE_OFFSET - RESIZE_CONTROL_HANDLE_WIDTH / 2}px;
  height: 100%;
  width: ${RESIZE_CONTROL_HANDLE_WIDTH}px;
  background-color: ${p => (p.isBold ? "#0747A6" : "#4C9AFF")};
  opacity: ${p => (p.showHandle ? 1 : 0)};

  transition: opacity 200ms;
`;
