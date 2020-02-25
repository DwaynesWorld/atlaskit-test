import React, { ReactNode, useCallback, ComponentType } from "react";
import styled from "styled-components";
import WidthDetector from "hcss-navigation/components/width-detector";
import { useOverflowController } from "../../../controllers/overflow-controller";
import { OverFlowStatusProvider } from "../../../contexts/overflow-status-context";
import { DropdownButton } from "react-bootstrap";

interface PrimaryItemsContainerProps {
  moreLabel?: string;
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

  const overflowContent = useCallback(
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
        <DropdownButton
          title={moreLabel || "..."}
          id="overflowItems-dropdown"
          style={{ fontSize: "14px" }}>
          {overflowContent}
        </DropdownButton>
      )}

      {Create && <Create />}

      <WidthDetector
        onResize={updateWidth}
        containerStyle={{
          flexShrink: 1,
          minWidth: 1,
          margin: 0
        }}>
        {() => null}
      </WidthDetector>
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
    content: "";
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
