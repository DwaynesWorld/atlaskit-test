import React from "react";
import styled from "styled-components";
import {
  RESIZE_CONTROL_HANDLE_OFFSET,
  RESIZE_CONTROL_OUTER_WIDTH,
  RESIZE_CONTROL_HANDLE_WIDTH
} from "hcss-navigation/common/constants";

interface GrabAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GrabArea = ({
  isBold,
  showHandle,
  ...props
}: GrabAreaProps & InnerGrabAreaProps) => {
  return (
    <OuterGrabArea className="outer-grab-area" {...props}>
      <InnerGrabArea
        className="inner-grab-area"
        isBold={isBold}
        showHandle={showHandle}
      />
    </OuterGrabArea>
  );
};

const OuterGrabArea = styled.div`
  cursor: ew-resize;
  position: relative;
  left: -${RESIZE_CONTROL_HANDLE_OFFSET}px;
  height: 100%;
  width: ${RESIZE_CONTROL_OUTER_WIDTH}px;
`;

interface InnerGrabAreaProps {
  isBold: boolean;
  showHandle: boolean;
}

const InnerGrabArea = styled.div<InnerGrabAreaProps>`
  position: absolute;
  left: ${RESIZE_CONTROL_HANDLE_OFFSET - RESIZE_CONTROL_HANDLE_WIDTH / 2}px;
  height: 100%;
  width: ${RESIZE_CONTROL_HANDLE_WIDTH}px;
  background-color: ${p => (p.isBold ? "#0747A6" : "#4C9AFF")};
  opacity: ${p => (p.showHandle ? 1 : 0)};

  transition: opacity 200ms;
`;
