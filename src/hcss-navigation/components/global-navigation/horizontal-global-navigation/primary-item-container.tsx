import React, { ReactNode, useState, useCallback, ComponentType } from "react";
import styled from "styled-components";
import { useOverflowController } from "../../../controller/overflow-controller";
import { OverFlowStatusProvider } from "../../../context/overflow-status-context";

interface PrimaryItemsContainerProps {
  moreLabel: string;
  items: ReactNode;
  create?: ComponentType<any>;
}
export const PrimaryItemsContainer = ({
  moreLabel,
  items,
  create: Create
}: PrimaryItemsContainerProps) => {
  // prettier-ignore
  const { updateWidth, visibleItems, overflowItems } = useOverflowController(items);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const hiddenContent = useCallback(
    () => (
      <OverFlowStatusProvider isVisible={false}>
        {overflowItems}
      </OverFlowStatusProvider>
    ),
    [overflowItems]
  );

  return (
    <Wrapper>
      <OverFlowStatusProvider isVisible={true}>
        {visibleItems}
      </OverFlowStatusProvider>

      {overflowItems.length > 0 && (
        <div></div>
        // <Popup
        //   placement="bottom-start"
        //   content={content}
        //   isOpen={isMoreOpen}
        //   onClose={onMoreClose}
        //   trigger={trigger}
        // />
      )}

      {Create && <Create />}

      {/* <WidthDetector
        containerStyle={widthDetectorContainerStyle}
        onResize={updateWidth}
      >
        {() => null}
      </WidthDetector> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  height: 100%;
  overflow: hidden;
  position: relative;

  & > * {
    flex-shrink: 0;
    margin: 0 4px;
  }

  &::after {
    content: '""';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 24px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.7) 50%,
      rgb(255, 255, 255) 100%
    );
  }
`;
